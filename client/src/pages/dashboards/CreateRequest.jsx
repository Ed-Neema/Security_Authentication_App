import DashboardLayout from "./DashboardLayout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import InputInfoComponent from "../../components/InputInfoComponent";
import Button from "../../components/Button";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
const CreateRequest = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  // fetch the admins and facilitators
  const [facilitators, setFacilitatorData] = useState([]);
  const [admins, setAdminsData] = useState([]);
  const fetchFacilitators = async () => {
    const facilitators = await fetch("/api/users/facilitators");
    if (!facilitators.ok) {
      console.log(`Request failed with status ${facilitators.status}`);
    }
    const facilitatorsData = await facilitators.json();
    if (facilitatorsData.success === false) {
      if (facilitatorsData.message === "Token not valid") {
        toast.error("Session Expired. Please log in");
        navigate("/auth/login");
      } else {
        toast.error(facilitatorsData.message);
      }
      return;
    }
    setFacilitatorData(facilitatorsData);
  };
  const fetchAdmin = async () => {
    const admins = await fetch("/api/users/admins");
    if (!admins.ok) {
      console.log(`Request failed with status ${admins.status}`);
    }
    const adminsData = await admins.json();
    if (adminsData.success === false) {
      if (adminsData.message === "Token not valid") {
        toast.error("Session Expired. Please log in");
        navigate("/auth/login");
      } else {
        toast.error(adminsData.message);
      }
      return;
    }
    setAdminsData(adminsData);
  };

  useEffect(() => {
    fetchFacilitators();
    fetchAdmin();
  }, []);

  const formik = useFormik({
    initialValues: {
      role: "facilitator",
      name: "",
      message: "",
    },
    //validate form
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      message: Yup.string().required("Message is required"),
      role: Yup.string().required("Role is required"),
    }),
    onSubmit: async (values) => {
      try {
        // Extract relevant data
        const { role, name, message } = values;
        // Prepare the request payload
        // Use the selected role to determine the receiverId
        let receiverId;
        if (role === "facilitator") {
          // Assuming each facilitator object has an _id property
          const selectedFacilitator = facilitators.find(
            (fac) => fac.name === name
          );
          receiverId = selectedFacilitator ? selectedFacilitator._id : "";
        } else {
          // Assuming each admin object has an _id property
          const selectedAdmin = admins.find((admin) => admin.name === name);
          receiverId = selectedAdmin ? selectedAdmin._id : "";
        }
        const payload = {
          userId: currentUser._id, // Replace with the actual user ID
          sentBy: currentUser.name,
          receiverId: receiverId, // Replace with the actual receiver ID based on the role
          name,
          role,
          message,
          comments: [], // You can add comments logic here if needed
        };
        // Make the POST request
        const response = await fetch("/api/request/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        // Check if the request was successful
        if (!response.ok) {
          toast.error("Error sending response");
          console.log(`Request failed with status ${response.status}`);
        }

        // Assuming the response contains JSON data, you can handle it here if needed
        const responseData = await response.json();

        // Optionally, you can dispatch any action or handle the response as needed
        toast.success(responseData.message);

        navigate(`/${currentUser.role}/dashboard`);
      } catch (error) {
        console.log(error);
        toast.error("Error sending response");
      }
    },
  });
  return (
    <DashboardLayout>
      <div className="w-full ">
        <p className="text-red-700 my-4">
          {/* {error ? error.message || "Something went wrong!" : ""} */}
        </p>
        <div className="px-16">
          <form className="w-full h-full mt-4" onSubmit={formik.handleSubmit}>
            <div className="text-4xl text-primary flex mt-12 justify-center font-bold opacity-80 mb-8">
              Create Request
            </div>
            <div className="mb-2">
              <label htmlFor="role" className="text-lg opacity-70">
                Role
              </label>
              <p>
                {formik.touched.role && formik.errors.role ? (
                  <InputInfoComponent
                    message={formik.errors.role}
                    type="error"
                  />
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
                <option>admin</option>
                <option>facilitator</option>
              </select>
            </div>
            <div className="mb-2">
              <label htmlFor="name" className="text-lg opacity-70">
                Name
              </label>
              <p>
                {formik.touched.name && formik.errors.name ? (
                  <InputInfoComponent
                    message={formik.errors.name}
                    type="error"
                  />
                ) : (
                  ""
                )}
              </p>
              <select
                className="p-1.5 text-black border w-full opacity-70 rounded-lg focus:ring-primary focus:border-primary"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                id=""
              >
                {formik.values.role == "facilitator" ? (
                  <>
                    <option>Select facilitator</option>
                    {facilitators.map((fac, index) => {
                      return <option key={fac._id}>{fac.name}</option>;
                    })}
                  </>
                ) : (
                  <>
                    <option>Select Admin</option>
                    {admins.map((admin, index) => {
                      return <option key={admin._id}>{admin.name}</option>;
                    })}
                  </>
                )}
              </select>
            </div>
            <div className="mb-2">
              <label htmlFor="message" className="text-lg opacity-70">
                Message
              </label>
              <p>
                {formik.touched.message && formik.errors.message ? (
                  <InputInfoComponent
                    message={formik.errors.message}
                    type="error"
                  />
                ) : (
                  ""
                )}
              </p>
              <textarea
                className="w-full rounded-lg"
                name="message"
                placeholder="Enter Request Here"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.message}
              />
            </div>
            <div className="mt-8" />
            <Button type="submit" text="Submit Request" onClick={() => {}} />
          </form>
        </div>
      </div>
      <Toaster />
    </DashboardLayout>
  );
};

export default CreateRequest;
