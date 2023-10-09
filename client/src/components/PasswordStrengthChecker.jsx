import PropTypes from "prop-types";

const PasswordStrengthChecker = ({ password }) => {
    let score = -1;
    let regexPositive = [
      "[A-Z]",
      "[a-z]",
      "[0-9]",
      "[@$!%*?&'^#]",
    //   "/.{8,}/",
    ];

    regexPositive.forEach((regex, index) => {
      if (new RegExp(regex).test(password)) {
        score += 1;
      }
    });
    if (/.{8,}/.test(password)){
        score +=1
    }

    const createPassLabel = () => {
      switch (score) {
        case 0:
          return "Very weak";
        case 1:
          return "Weak";
        case 2:
          return "Fair";
        case 3:
          return "Good";
        case 4:
          return "Strong";
        default:
          return "";
      }
    };
     const funcProgressColor = () => {
       switch (score) {
         case 0:
           return "#828282";
         case 1:
           return "#EA1111";
         case 2:
           return "#FFAD00";
         case 3:
           return "#9bc158";
         case 4:
           return "#00b500";
         default:
           return "none";
       }
     };
     const num = (score * 100) / 4 + 1;
     const changePasswordColor = () => ({
       width: `${num}%`,
       background: funcProgressColor(),
       height: "7px",
     });
  return (
    <>
      <div className="progress h-2">
        <div
          className="progress-bar  rounded-lg"
          style={changePasswordColor()}
        ></div>
      </div>
      <p style={{ color: funcProgressColor() }}>{createPassLabel()}</p>
    </>
  );
};

export default PasswordStrengthChecker;

PasswordStrengthChecker.propTypes = {
  password: PropTypes.string.isRequired,
};
