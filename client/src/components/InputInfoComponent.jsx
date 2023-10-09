import { HiOutlineInformationCircle } from "react-icons/hi";
import PropTypes from "prop-types";

const InputInfoComponent = ({ message, type }) => {
  return (
    <>
      {type === "error" ? (
        <div className="text-redAccent font-medium text-sm">
          <p>
            <div className="flex items-center gap-4 w-full ">
              <div>
                <HiOutlineInformationCircle size={20} />
              </div>
              <p>{message}</p>
            </div>
          </p>
        </div>
      ) : (
        <div className="text-white/80 font-medium text-sm my-2">
          <p>
            <div className="flex items-center gap-4 w-full ">
              <div>
                <HiOutlineInformationCircle size={20} />
              </div>
              <p>{message}</p>
            </div>
          </p>
        </div>
      )}
    </>
  );
};

export default InputInfoComponent;

InputInfoComponent.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
