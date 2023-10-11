import { FaEye } from "react-icons/fa";

import { Table } from "flowbite-react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const TableComponent = ({ tableHeaders, tableData, actions }) => {
  console.log(tableData)
  return (
    <>
      <Table hoverable>
        <Table.Head className="relative divide-y mb-4 border-b border-b-gray-700">
          {tableHeaders.map((header, index) => {
            return (
              <Table.HeadCell className="text-left" key={index}>
                {header}
              </Table.HeadCell>
            );
          })}
          {actions && <Table.HeadCell>Actions</Table.HeadCell>}
        </Table.Head>

        <Table.Body className="relative divide-y">
          {tableData.length !== 0 ? (
            tableData.map((data, index) => {
              return (
                <Table.Row
                  key={index}
                  className="relative bg-white items-center"
                >
                  {tableHeaders.map((header, index) => (
                    <Table.Cell
                      key={index}
                      className="whitespace-nowrap justify-center font-medium text-black dark:text-white"
                    >
                      {data[header]}
                    </Table.Cell>
                  ))}

                  {actions && (
                    <Table.Cell>
                      <div className="flex space-x-1 ">
                        <Link
                          className="font-medium text-greenAccent hover:underline hover:scale-110 duration-150"
                          to={`/request/${data._id}`}
                        >
                          <FaEye />
                        </Link>
                      </div>
                    </Table.Cell>
                  )}
                </Table.Row>
              );
            })
          ) : (
            <div className=" rounded-md flex items-center justify-center py-4 text-xl font-bold">
              No Requests to Display
            </div>
          )}
        </Table.Body>
      </Table>

      {/* <PaginationButton className="my-5" /> */}
    </>
  );
};

export default TableComponent;
TableComponent.propTypes = {
  tableHeaders: PropTypes.array.isRequired,
  tableData: PropTypes.array.isRequired,
  actions: PropTypes.bool.isRequired,
};
