import AuthInput from "../../components/AuthInput";
import "./login.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "../../components/Button";
import { useState } from "react";
import PassInput from "../../components/PassInput";
import InputInfoComponent from "../../components/InputInfoComponent";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import { useDispatch, useSelector } from "react-redux";
import { signInFailure, signInStart, signInSuccess } from "../../redux/user/userSlice";
const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    onSubmit: async (values) => {
      // console.log("submit", values);
      console.log("Been clicked")
      try {
        dispatch(signInStart());
        const res = await fetch("/api/auth/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        const data = await res.json();
        if (data.success === false) {
          dispatch(signInFailure(data));
          return;
        }
        dispatch(signInSuccess(data));
        navigate(`/${data.role}/dashboard`);
      } catch (error) {
        dispatch(signInFailure(error));
      }
    },
  });

  return (
    <AuthLayout>
      {/* input form */}
      <div className="w-full">
        <form className="w-full h-full mt-4" onSubmit={formik.handleSubmit}>
          <div className="text-3xl text-primary flex justify-center font-semibold opacity-80 mb-8">
            Login
          </div>
          <div className="mb-2">
            <label htmlFor="email" className="text-lg opacity-70">
              Email Address
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
          <div>
            <label htmlFor="password" className="text-lg opacity-70">
              Password
            </label>
            <p>
              {formik.touched.password && formik.errors.password ? (
                <InputInfoComponent
                  message={formik.errors.password}
                  type="error"
                />
              ) : (
                ""
              )}
            </p>
            <PassInput
              passwordVisible={passwordVisible}
              name="password"
              placeholder="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              togglePasswordVisibility={togglePasswordVisibility}
            />
          </div>

          <div
            className="flex cursor-pointer justify-end text-primary/80 mb-2"
            onClick={() => {}}
          >
            Forgot Password?
          </div>

          <Button type="submit" text="Login" onClick={() => {}} />
          <div className="text-lg flex items-center justify-center gap-2 mt-2 opacity-80">
            Don&apos;t have an account?
            <Link to="/auth/signup">
              <span className="text-primary cursor-pointer">Get Started</span>
            </Link>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
