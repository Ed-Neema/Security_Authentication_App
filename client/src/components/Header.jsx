import { Link } from "react-router-dom";
import Logo from "../assets/images/Logo.png";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../redux/user/userSlice";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSignOut = async () => {
    try {
      await fetch("/api/auth/signout");
      dispatch(signOut());
      toast.success("Signed out successfully!");
      navigate("/auth/login");
    } catch (error) {
      console.log(error);
    }
  };
  const {currentUser} = useSelector((state)=> state.user)
  return (
    <div className="bg-white border-b border-b-gray-300">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to={`/${currentUser.role}/dashboard`}>
          <img className="h-8" src={Logo} />
        </Link>

        <div>
          <Button text="Sign Out" onClick={handleSignOut} />
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Header;
