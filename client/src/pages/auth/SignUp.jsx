import { useState } from "react";
import AuthLayout from "./AuthLayout";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputInfoComponent from "../../components/InputInfoComponent";
import AuthInput from "../../components/AuthInput";
import PassInput from "../../components/PassInput";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { GoIssueClosed } from "react-icons/go";
import PasswordStrengthChecker from "../../components/PasswordStrengthChecker";

const SignUp = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      role: "Student",
      password: "",
      confirmPassword: "",
    },
    //validate form
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid Email Address")
        .required("Email is required"),
      name: Yup.string().required("Name is required"),
      role: Yup.string().required("Role is required"),

      password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&'^#])[A-Za-z\d@$!%*?&'^#]+$/,
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        ),
      confirmPassword: Yup.string()
        .required("Confirm Password is required")
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
    }),
    onSubmit: (values) => {
      console.log("submit", values);
    },
  });

  return (
    <AuthLayout>
      <div className="w-full ">
        <form className="w-full h-full mt-4" onSubmit={formik.handleSubmit}>
          <div className="text-4xl text-primary flex mt-12 justify-center font-bold opacity-80 mb-8">
            Sign Up
          </div>
          <div className="mb-2">
            <label htmlFor="name" className="text-lg opacity-70">
              Name
            </label>
            <p>
              {formik.touched.name && formik.errors.name ? (
                <InputInfoComponent message={formik.errors.name} type="error" />
              ) : (
                ""
              )}
            </p>
            <AuthInput
              type="text"
              name="name"
              placeholder="Jane Doe"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
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
          <div className="mb-2">
            <label htmlFor="role" className="text-lg opacity-70">
              Role
            </label>
            <p>
              {formik.touched.role && formik.errors.role ? (
                <InputInfoComponent message={formik.errors.role} type="error" />
              ) : (
                ""
              )}
            </p>
            <select
              className="p-1.5 text-black border w-full opacity-70 rounded-lg focus:ring-primary focus:border-primary"
              name="role"
              value={formik.values.role}
              onChange={formik.handleChange}
              id=""
            >
              <option>Student</option>
              <option>Facilitator</option>
            </select>
          </div>
          <div>
            <label htmlFor="password" className="text-lg opacity-70">
              Password
            </label>

            <PasswordStrengthChecker password={formik.values.password} />
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
          <div className="bg-white rounded-lg opacity-70 text-black px-2 py-4">
            Your password must meet the following requirements:
            {/* password length */}
            <div>
              {formik.touched.password &&
              /.{8,}/.test(formik.values.password) ? (
                <div className="flex gap-2 mt-2 items-center text-greenAccent">
                  <GoIssueClosed />
                  <p>Atleast 8 characters</p>
                </div>
              ) : (
                <div className="flex gap-2 mt-2 items-center text-primary">
                  <AiOutlineCloseCircle />
                  <p>Atleast 8 characters</p>
                </div>
              )}
            </div>
            {/* atleast one number */}
            <div className="flex gap-2 items-center">
              {formik.touched.password &&
              /[0-9]/.test(formik.values.password) ? (
                <div className="flex gap-2 mt-2 items-center text-greenAccent">
                  <GoIssueClosed />
                  <p>Atleast one number (0...9)</p>
                </div>
              ) : (
                <div className="flex gap-2 mt-2 items-center text-primary">
                  <AiOutlineCloseCircle />
                  <p>Atleast one number (0...9)</p>
                </div>
              )}
            </div>
            {/* atleast one uppercase */}
            {formik.touched.password && /[A-Z]/.test(formik.values.password) ? (
              <div className="flex gap-2 mt-2 items-center text-greenAccent">
                <GoIssueClosed />
                <p>Atleast one uppercase letter (A-Z)</p>
              </div>
            ) : (
              <div className="flex gap-2 mt-2 items-center text-primary">
                <AiOutlineCloseCircle />
                <p>Atleast one uppercase letter (A-Z)</p>
              </div>
            )}
            {/* atleast one lowercase */}
            {formik.touched.password && /[a-z]/.test(formik.values.password) ? (
              <div className="flex gap-2 mt-2 items-center text-greenAccent">
                <GoIssueClosed />
                <p>Atleast one lowercase letter (a-z)</p>
              </div>
            ) : (
              <div className="flex gap-2 mt-2 items-center text-primary">
                <AiOutlineCloseCircle />
                <p>Atleast one lowercase letter (a-z)</p>
              </div>
            )}
            {/* atleast one special symbol */}
            {formik.touched.password &&
            /[@$!%*?&'^#]/.test(formik.values.password) ? (
              <div className="flex gap-2 mt-2 items-center text-greenAccent">
                <GoIssueClosed />
                <p>Atleast one special symbol (!...$)</p>
              </div>
            ) : (
              <div className="flex gap-2 mt-2 items-center text-primary">
                <AiOutlineCloseCircle />
                <p>Atleast one special symbol (!...$)</p>
              </div>
            )}
          </div>
          <div>
            <label htmlFor="confirmPassword" className="text-lg opacity-70">
              Confirm Password
            </label>
            <p>
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <InputInfoComponent
                  message={formik.errors.confirmPassword}
                  type="error"
                />
              ) : (
                ""
              )}
            </p>
            <PassInput
              passwordVisible={passwordVisible}
              name="confirmPassword"
              placeholder="confirm password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              togglePasswordVisibility={togglePasswordVisibility}
            />
          </div>
          <div className="mt-8" />
          <Button type="submit" text="Sign Up" onClick={() => {}} />
          <div className="text-lg flex items-center justify-center gap-2 mt-2 opacity-80">
            Already have an account?
            <Link to="/auth/login">
              <span className="text-primary cursor-pointer">Login</span>
            </Link>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
