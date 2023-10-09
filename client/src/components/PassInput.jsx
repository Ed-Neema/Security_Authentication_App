import PropTypes from "prop-types";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
const PassInput = ({
  togglePasswordVisibility,
  passwordVisible,
  ...others
}) => {
  return (
    <div className={"relative mb-2"}>
      <input
        type={passwordVisible ? "text" : "password"}
        className="w-full rounded-lg px-2 py-2 opacity-70 text-black mt-2 focus:ring-primary focus:border-primary"
        {...others}
      />

      <button
        type="button"
        onClick={togglePasswordVisibility}
        className="cursor-pointer absolute inset-y-0 right-0 flex justify-center items-center pr-2 z-10 mt-2 text-gray-500"
      >
        {passwordVisible ? (
          <BsEyeSlashFill size={20} />
        ) : (
          <BsEyeFill size={20} />
        )}
      </button>
    </div>
  );
};

export default PassInput;
PassInput.propTypes = {
  //   name: PropTypes.string.isRequired,
  //   type: PropTypes.string.isRequired,
  togglePasswordVisibility: PropTypes.func.isRequired,
  passwordVisible: PropTypes.bool.isRequired,
  //   placeholder: PropTypes.string.isRequired,
  //   onChange: PropTypes.func.isRequired,
  //   onBlur: PropTypes.func.isRequired,
  //   value: PropTypes.string.isRequired,
};
