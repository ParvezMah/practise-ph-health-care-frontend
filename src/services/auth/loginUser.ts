/* eslint-disable @typescript-eslint/no-explicit-any */
import z, { success } from "zod";

const loginvalidationZodSchema = z.object({
  email: z.email({
    message: "Email is required",
  }),
  password: z
    .string("Password is required")
    .min(6, {
      error: "Password is required and must be at least 6 characters long",
    })
    .max(100, {
      error: "Password must be at most 100 characters long",
    }),
});

const loginUser = async (_currentState: any, formData: any): Promise<any> => {
  try {
    const loginData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    // Validating loginData befor sending to DB
    const validatedData = loginvalidationZodSchema.safeParse(loginData)
    console.log("validatedData : ", validatedData)

    if(!validatedData.success){
        return {
            success: false,
            errors: validatedData.error.issues.map((issue)=>{
                return {
                    field: issue.path[0],
                    message: issue.message,
                }
            })
        }
    }


    const res = await fetch("http://localhost:5000/api/v1/auth/login", {
      method: "POST",
      body: JSON.stringify(loginData),
      headers: {
        "content-Type": "application/json",
      },
    }).then((res) => res.json());

    console.log("login res : ", res);

    return res;
  } catch (error) {
    console.log(error);
    return { error: "Login failed" };
  }
};

export default loginUser;
