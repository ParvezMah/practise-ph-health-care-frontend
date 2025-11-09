/* eslint-disable @typescript-eslint/no-explicit-any */
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
