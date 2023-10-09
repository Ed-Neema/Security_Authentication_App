import AuthLayout from "./AuthLayout";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputInfoComponent from "../../components/InputInfoComponent";
import AuthInput from "../../components/AuthInput";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
const ForgotPassword = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    // validate form
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid Email Address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values) => {
      console.log("submit", values);
    },
  });

  return (
    <AuthLayout>
      <div className="w-full">
        <form className="w-full h-full mt-4" onSubmit={formik.handleSubmit}>
          <div className="mb-2">
            <label htmlFor="email" className="text-lg opacity-70 mb-4">
              Enter your email address to receive reset instructions
            </label>
            
            <p>
              {formik.touched.email && formik.errors.email ? (
                <InputInfoComponent
                  message={formik.errors.email}
                  type="error"
                />
              ) : (
                ""
              )}
            </p>
            <AuthInput
              type="text"
              name="email"
              placeholder="example@email.com"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
          </div>
          <div className="h-10" />
          <Button type="submit" text="Reset" onClick={() => {}} />

          <div className="text-lg flex items-center justify-center gap-2 mt-2 opacity-80">
            Remember Password?
            <Link to="/auth/login">
              <span className="text-primary cursor-pointer">Login</span>
            </Link>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;
