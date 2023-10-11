import Button from "../../components/Button";
import DashboardLayout from "./DashboardLayout";
import TableComponent from "../../components/TableComponent";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
const StudentDashboard = () => {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([]);
  const tableHeaders = ["name", "role", "createdAt"];

  const handleNewRequest = () => {
    navigate("/create/request");
  };

  const fetchRequests = async () => {
    console.log("111");
    try {
      const res = await fetch("/api/request/requests",);
      console.log("222");
      console.log(res)
      if (!res.ok) {
        console.log(`Request failed with status ${res.status}`);
      }

      console.log("333");

      const data = await res.json();
      console.log(data);
      console.log("444");

      if (data.success === false) {
        if (data.message === "Token not valid"){
          toast.error("Session Expired. Please log in");
          // navigate("/auth/login");
        } else{
          toast.error(data.message);          
        }
        return;
      }
      console.log("555");
      // Update the tableData state with the fetched data
      setTableData(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchRequests();
  }, []);
  return (
    <DashboardLayout>
      <div>
        {/* top */}
        <div className="flex px-16 mt-8 items-center justify-between border-b pb-8">
          <h1 className="text-2xl font-bold text-primary">Student Center</h1>
          <div className="w-1/2">
            <Button text="Send Request" onClick={handleNewRequest} />
          </div>
        </div>
        {/* request table */}
        <div className="px-16 w-full h-full">
          <h1 className="my-4 font-bold text-xl text-primary">Requests Sent</h1>

          <TableComponent
            tableHeaders={tableHeaders}
            tableData={tableData}
            actions={true}
            // pass the id
          />
        </div>
      </div>
      <Toaster />
    </DashboardLayout>
  );
};

export default StudentDashboard;
