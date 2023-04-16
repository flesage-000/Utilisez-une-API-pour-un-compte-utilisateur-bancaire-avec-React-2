import "./EmployeeList.css";

import Tables from "../../Components/Tables/Tables";

import WebsiteMenu from "../../Components/WebsiteMenu/WebsiteMenu.jsx";

function EmployeeList() {
  const link = {
    text: "Home",
    to: "/"
  }
  const dataTable = {
    header: [
      {
        "name": "First Name",
        "sortable": true,
      },
      {
        "name": "Last Name",
        "sortable": true,
      },
      {
        "name": "Start Date",
        "sortable": true,
      },
      {
        "name": "Department",
        "sortable": true,
      },
      {
        "name": "Date of Birth",
        "sortable": true,
      },
      {
        "name": "Street",
        "sortable": true,
      },
      {
        "name": "City",
        "sortable": true,
      },
      {
        "name": "State",
        "sortable": true,
      },
      {
        "name": "Zip Code",
        "sortable": true,
      },
    ]
  }
  return(
    <div className="employeeList">
      <h1>Current Employees</h1>

      <Tables data={dataTable} />

      <WebsiteMenu data={link} />
    </div>
  );
}

export default EmployeeList;