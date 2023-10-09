
const AuthInput = (props) => {
  return (
    <div className={"relative mb-2"}>
      <input      
        className=" px-2 py-2 w-full rounded-lg opacity-70 text-black mt-2 focus:ring-primary focus:border-primary"
        {...props}
      />
    
    </div>
  );
};

export default AuthInput;

AuthInput.propTypes = {
  // icon: PropTypes.element.isRequired,
};

