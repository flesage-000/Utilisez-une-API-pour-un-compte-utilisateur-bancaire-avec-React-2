// import React from "react";

function AddToLocal(data) {
  // For easy reading/scripting
  const ls = localStorage;
  // Get "employees" localStorage OR use new Array
  let employees =  ls.getItem("employees") || [];
  // In case of data come from localStorage
  if (typeof employees != "object") employees = JSON.parse(employees);
  // Add data to array
  employees.push(data);
  // Stringify data for localStorage
  employees = JSON.stringify(employees)
  // Add to localStorage
  ls.setItem("employees", employees);
}

export default AddToLocal;