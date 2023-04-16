// import React from "react";
import { useState } from "react";

import "./Tables.css";

import GetFromLocal from "../Stores/GetFromLocal.jsx";

function Tables(data) {
  data = data.data;
  const [showEntries, setShowEntries] = useState(10);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(showEntries);
  const [employees, setEmployees] = useState(GetFromLocal);
  const [currentSort, setCurrentSort] = useState('');
  const dataHeader = data.header;
  const entriesLength = employees.length;

  function handleEntries(event) {
    const { value } = event.target;
    setShowEntries(value);
    setEndIndex(value);
  }

  /**
   * Convert a string to camelCase then add prefix and/or suffix
   * @param {string} prefix can be NULL
   * @param {string} string
   * @param {string} suffix can be NULL
   * @returns {string}
   */
  function CamelCaseConverter(prefix, string, suffix) {
    let array = string.split(" ");
    let toReturn = array[0].toLowerCase();
    const arrayLength = array.length;
    const forStarter = prefix !== null ? 0 : 1;
    for (let i = forStarter; i <= arrayLength - 1; i++) {
      toReturn = toReturn + array[i].charAt(0).toUpperCase() + array[i].slice(1);
    }
    if (prefix !== null) toReturn = prefix.trim() + toReturn;
    if (suffix !== null) toReturn = toReturn + suffix.trim();
    return toReturn
  }

  function handleSortable(event) {
    event.preventDefault();
    setCurrentSort(event.target.dataset.sortType);
    handleSort(event.target.dataset.sortType);
  }

  function handleSort(sortType) {
    let dataToSort = [...employees];
    dataToSort.sort((a, b) => {
      if (sortType === "firstNameASC") return a.firstName.localeCompare(b.firstName)
      else if (sortType === "firstNameDESC") return b.firstName.localeCompare(a.firstName)
      else if (sortType === "lastNameASC") return a.lastName.localeCompare(b.lastName)
      else if (sortType === "lastNameDESC") return b.lastName.localeCompare(a.lastName)
      else if (sortType === "startDateASC") return new Date(a.startDate) - new Date(b.startDate)
      else if (sortType === "startDateDESC") return new Date(b.startDate) - new Date(a.startDate)
      else if (sortType === "departementASC") return b.departement.localeCompare(a.departement)
      else if (sortType === "departementDESC")return a.departement.localeCompare(b.departement)
      else if (sortType === "dateOfBirthASC") return new Date(a.dateOfBirth) - new Date(b.dateOfBirth)
      else if (sortType === "dateOfBirthDESC") return new Date(b.dateOfBirth) - new Date(a.dateOfBirth)
      else if (sortType === "streetASC") return a.street.localeCompare(b.street)
      else if (sortType === "streetDESC") return b.street.localeCompare(a.street)
      else if (sortType === "cityASC") return a.city.localeCompare(b.city)
      else if (sortType === "cityDESC") return b.city.localeCompare(a.city)
      else if (sortType === "stateASC") return a.state.localeCompare(b.state)
      else if (sortType === "stateDESC") return b.state.localeCompare(a.state)
      else if (sortType === "zipCodeASC") return a - b
      else if (sortType === "zipCodeDESC") return b - a
    })
    setEmployees(dataToSort);
  }

  return(
    <>
      <form>
        <div>
          <label htmlFor="entries">Show</label>
          <select defaultValue={showEntries}
                  id="entries"
                  onChange={handleEntries}>
            <option value="1">1</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          <label htmlFor="entries">entries</label>
        </div>
        <div>
          <label htmlFor="search">Search:</label>
          <input type="text" id="search" />
        </div>
      </form>

      <table>
        <thead>
          <tr>
            {
              dataHeader.map((header, index) => {
                return (
                  <th key={header.name}>
                    <div>
                      {header.name}
                      {header.sortable &&
                        <div className="sorter" >
                          <button className={currentSort === CamelCaseConverter(null, header.name, 'ASC') ? 'currentSort' : ''}
                                  data-sort-type={CamelCaseConverter(null, header.name, 'ASC')}
                                  key={CamelCaseConverter('index', header.name, 'ASC')}
                                  onClick={handleSortable}
                                  type="button">▲</button>
                          <button className={currentSort === CamelCaseConverter(null, header.name, 'DESC') ? 'currentSort' : ''}
                                  data-sort-type={CamelCaseConverter(null, header.name, 'DESC')}
                                  key={CamelCaseConverter('index', header.name, 'DESC')}
                                  onClick={handleSortable}
                                  type="button">▼</button>
                        </div>
                      }
                    </div>
                  </th>
                )
              })
            }
          </tr>
        </thead>
        <tbody>
            { employees ? employees
                .slice(startIndex, endIndex)
                .map(tr => {
                  return (<tr key={tr.firstName}>
                    <td>{tr.firstName}</td>
                    <td>{tr.lastName}</td>
                    <td>{tr.startDate}</td>
                    <td>{tr.department}</td>
                    <td>{tr.dateOfBirth}</td>
                    <td>{tr.street}</td>
                    <td>{tr.city}</td>
                    <td>{tr.state}</td>
                    <td>{tr.zipCode}</td>
                  </tr>)
                })
              : <tr><td colspan="9">Aucun employé à afficher.</td></tr>
            }
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="5">
              Showing 1 to {entriesLength} entries
            </td>
            <td colSpan="4">
            {startIndex !== 0 ? <a href="/">Previous</a> : ''} <button>1</button> <a href="/">Next</a>
            </td>
          </tr>
        </tfoot>
      </table>
    </>
  );
}

export default Tables;