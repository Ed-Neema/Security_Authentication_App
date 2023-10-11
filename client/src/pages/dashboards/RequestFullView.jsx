import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation } from "react-router";
import DashboardLayout from "./DashboardLayout";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputInfoComponent from "../../components/InputInfoComponent";
import Button from "../../components/Button";
import { useSelector } from "react-redux";

const RequestFullView = () => {
  const [requestData, setRequestData] = useState({ comments: [] });

  const location = useLocation();
  const id = location.pathname.split("/")[2];

  // fetch request with particular ID
  const fetchRequest = async () => {
    try {
      const res = await fetch(`/api/request/requests/${id}`);

      if (!res.ok) {
        console.log(`Request failed with status ${res.status}`);
      }

      const data = await res.json();

      if (data.success === false) {
        if (data.message === "Token not valid") {
          toast.error("Session Expired. Please log in");
          // navigate("/auth/login");
        } else {
          toast.error(data.message);
        }
        return;
      }

      // Update the tableData state with the fetched data
      setRequestData(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchRequest();
  }, [id]);
  const { currentUser } = useSelector((state) => state.user);
  const formik = useFormik({
    initialValues: {
      message: "",
    },
    //validate form
    validationSchema: Yup.object({
      message: Yup.string().required("Message is required"),
    }),
    onSubmit: async (values) => {
      const message = values.message;
      const name = currentUser?.name;
      const requestId = id;
      const payload = {
        message,
        name,
        requestId,
      };
      try {
        // Make the POST request
        const response = await fetch("/api/request/create-comment", {
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
        // Reload the page after a short delay (you can adjust the delay as needed)
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } catch (error) {
        console.log(error);
        toast.error("Error sending response");
      }
    },
  });
  return (
    <div>
      <DashboardLayout>
        {/* top */}
        <div className="flex px-16 mt-8 items-center justify-between border-b pb-8">
          <h1 className="text-2xl font-bold text-primary">Request Details</h1>
        </div>
        <div className="w-full flex justify-between px-16 mt-4 overflow-auto">
          {/* Request Details */}
          <div className="">
            <div className="mb-4 flex flex-col">
              <h1 className="font-bold text-lg mb-1">Sent By</h1>
              <p>{requestData?.sentBy}</p>
            </div>
            <div className="mb-4 flex flex-col">
              <h1 className="font-bold text-lg mb-1">Sent To</h1>
              <p>{requestData?.name}</p>
            </div>
            <div className="mb-4 flex flex-col">
              <h1 className="font-bold text-lg mb-1">Date Sent</h1>
              <p>{requestData?.createdAt}</p>
            </div>
            <div className="mb-4 flex flex-col">
              <h1 className="font-bold text-lg mb-1">Message</h1>
              <p>{requestData?.message}</p>
            </div>
            <div className="mb-4 flex flex-col">
              <h1 className="font-bold text-lg mb-1">Comments</h1>

              {requestData?.comments?.map((comment, index) => (
                <div className="mb-4" key={comment._id}>
                  <div className="flex gap-2">
                    <p className="font-semibold">Commenter Name: </p>
                    {requestData?.comments[index].name == currentUser.name ? (
                      <p>{`${requestData?.comments[index].name} : (${currentUser?.role})`}</p>
                    ) : (
                      <p>{`${requestData?.comments[index].name} : (${requestData?.role})`}</p>
                    )}
                  </div>
                  <div className="flex gap-2 pl-4">
                    <p className="font-semibold">Message: </p>
                    <p>{requestData?.comments[index].message}</p>
                  </div>
                </div>
              ))}
              {/* <p>{requestData.comments}</p> */}
            </div>
          </div>
          {/* Add comment section */}
          <div className="w-1/2">
            <h2 className="font-bold text-primary text-lg">Add Comment</h2>
            <form className="w-full h-full mt-4" onSubmit={formik.handleSubmit}>
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
                  className="w-full rounded-lg mt-2"
                  name="message"
                  placeholder="Enter Message Here"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.message}
                />
              </div>
              <div className="mt-8" />
              <Button type="submit" text="Submit Comment" onClick={() => {}} />
            </form>
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default RequestFullView;
