import * as Yup from "yup";

export const signUpSchema = Yup.object({
  username: Yup.string().min(2).max(25).required("Please enter username!"),
  email: Yup.string().email().required("Please enter email!"),
  password: Yup.string().min(8).required("Please enter password!"),
  confirm_password: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), null], "Password must match!")
});

export const loginSchema = Yup.object({
  username: Yup.string().min(2).max(25).required("Please enter username!"),
  password: Yup.string().min(8).required("Please enter password!")
});

export const postSchema = Yup.object({
  title: Yup.string().required("Please enter title!"),
  description: Yup.string().required("Please enter description!"),
  cat: Yup.string().required("Please select category!")
});

export const draftSchema = Yup.object({
  title: Yup.string().required("Please enter title!")
});
