import toast, { Toaster } from "react-hot-toast";
import TableComponent from "../../components/TableComponent";
import DashboardLayout from "./DashboardLayout";
import { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [tableData, setTableData] = useState([]);
  const tableHeaders = ["sentBy", "name", "role", "createdAt"];
  const fetchRequests = async () => {
    console.log("111");
    try {
      const res = await fetch("/api/request/admin/requests");
      console.log("222");
      console.log(res);
      if (!res.ok) {
        console.log(`Request failed with status ${res.status}`);
      }

      console.log("333");

      const data = await res.json();
      console.log(data);
      console.log("444");

      if (data.success === false) {
        if (data.message === "Token not valid") {
          toast.error("Session Expired. Please log in");
          // navigate("/auth/login");
        } else {
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
      {/* top */}
      <div className="flex px-16 mt-8 items-center justify-between border-b pb-8">
        <h1 className="text-2xl font-bold text-primary">Admin Center</h1>
      </div>
      {/* request table */}
      <div className="px-16 w-full h-full">
        <h1 className="my-4 font-bold text-xl text-primary">
          All Requests
        </h1>

        <TableComponent
          tableHeaders={tableHeaders}
          tableData={tableData}
          actions={true}
        />
      </div>
      <Toaster />
    </DashboardLayout>
  );
}

export default AdminDashboard