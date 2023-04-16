import React from "react";

import "./Homepage.css";

import WebsiteHeader from "../../Components/WebsiteHeader/WebsiteHeader.jsx";
import WebsiteMenu from "../../Components/WebsiteMenu/WebsiteMenu.jsx";

import FormCreateEmployee from "../../Components/FormCreateEmployee/FormCreateEmployee.jsx";

function Homepage() {
  const link = {
    text: "View Current Employees",
    to: "/Employee-list"
  }

  return(
    <>
      <WebsiteHeader />

      <div className="createEmployee">
        <WebsiteMenu data={link} />

        <h2>Create Employee</h2>

        <FormCreateEmployee />

      </div>
    </>
  );
}

export default Homepage;