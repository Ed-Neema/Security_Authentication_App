import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyToken = (req,res,next) => {
    const token = req.cookies.access_token;
    if(!token){
        return(next(errorHandler(403, "Token not valid")))
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return next(errorHandler(403, "Token not valid"));
      //   creating a variable called user in our response and setting it equal to payload
    //   has everything apart from password
      req.user = user;
      next();
    });
}

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.user.role === "admin") {
      next();
    } else {
      return next(errorHandler(403, "Not Authorized"));
    }
  });
};