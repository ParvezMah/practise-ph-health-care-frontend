/* eslint-disable @typescript-eslint/no-explicit-any */

import z from "zod";

const registerValidationZodSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required" }),
    address: z.string().optional(),
    email: z.email({ message: "Valid email is required" }),
    password: z
      .string()
      .min(6, {
        error: "Password is required and must be at least 6 characters long",
      })
      .max(100, {
        error: "Password must be at most 100 characters long",
      }),
    confirmPassword: z.string().min(6, {
      error:
        "Confirm Password is required and must be at least 6 characters long",
    }),
  })
  .refine((data: any) => data.password === data.confirmPassword, {
    error: "Passwords do not match",
    path: ["confirmPassword"],
  });

const registerPatient = async (
  currentState: any,
  formData: any
): Promise<any> => {
  //   password: z.string(),
  // patient: z.object({
  //     name: z.string().nonempty("Name is required"),
  //     email: z.string().nonempty("Email is required"),
  //     address: z.string().optional()
  // })

  try {
    const validationData = {
      name: formData.get("name"),
      address: formData.get("address"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    };

    const validatedFields =
      registerValidationZodSchema.safeParse(validationData);

    console.log("validatedFields : ", validatedFields);

    if (!validatedFields.success) {
      return {
        success: false,
        errors: validatedFields.error.issues.map((issue) => {
          return {
            field: issue.path[0],
            message: issue.message,
          };
        }),
      };
    }

    const registerData = {
      password: formData.get("password"),
      patient: {
        name: formData.get("name"),
        email: formData.get("email"),
        address: formData.get("address"),
      },
    };

    console.log("Register Data to be sent:", registerData);

    const newFormData = new FormData();
    newFormData.append("data", JSON.stringify(registerData));

    console.log("New Form Data:", newFormData);

    const res = await fetch(
      "http://localhost:5000/api/v1/user/create-patient",
      {
        method: "POST",
        body: newFormData,
      }
    ).then((res) => res.json());

    console.log("Response from server:", res);
    return res;
  } catch (error) {
    console.log(error);
    return { error: "Registration failed" };
  }
};

export default registerPatient;
