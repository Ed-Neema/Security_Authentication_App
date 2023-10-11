import toast, { Toaster } from "react-hot-toast";
import TableComponent from "../../components/TableComponent";
import DashboardLayout from "./DashboardLayout";
import { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [tableData, setTableData] = useState([]);
  const tableHeaders = ["sentBy", "name", "role", "createdAt"];
  const fetchRequests = async () => {
    try {
      const res = await fetch("/api/request/admin/requests");

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
        <h1 className="my-4 font-bold text-xl text-primary">All Requests</h1>

        <TableComponent
          tableHeaders={tableHeaders}
          tableData={tableData}
          actions={true}
        />
      </div>
      <Toaster />
    </DashboardLayout>
  );
};

export default AdminDashboard;
