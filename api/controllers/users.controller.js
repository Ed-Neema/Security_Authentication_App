import User from "../models/user.model.js";


export const getFacilitators = async (req,res)=>{
    try {
      // Find all users with the role "facilitator"
      const facilitators = await User.find({ role: "facilitator" });

      res.status(200).json(facilitators);
    } catch (error) {
      next(error);
    }
}
export const getAdmins = async (req,res)=>{
    try {
      // Find all users with the role "facilitator"
      const admins = await User.find({ role: "admin" });

      res.status(200).json(admins );
    } catch (error) {
      next(error);
    }
}

