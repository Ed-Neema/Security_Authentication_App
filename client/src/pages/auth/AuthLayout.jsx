import PropTypes from "prop-types";
import Logo from "../../assets/images/Logo.png";
const AuthLayout = ({ children }) => {
  return (
    <div className="auth_bg">
      <div className="flex flex-col items-center w-full overflow-auto">
        {/* logo */}
        <div className="flex justify-center items-center h-24 gap-8">
          <img src={Logo} className="h-16" />
        </div>
        <div className="mx-6 w-1/2  mb-16">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
