
import PropTypes from "prop-types";

const Button = ({text, ...others}) => {
  return (
    <button
      {...others}
      className="hover:bg-primary/60 w-full font-semibold rounded-lg px-4 py-1.5 bg-primary/80 text-white text-lg "
    >
      {text}
    </button>
  );
}

export default Button

Button.propTypes = {
    text: PropTypes.string.isRequired,
};