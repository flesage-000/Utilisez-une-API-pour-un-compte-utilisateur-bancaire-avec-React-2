// import React from "react";
import { useContext, useState } from "react";
import "./Tables.css";
import { Context } from "../../Utils/Context/Context";
import Select from "react-select";
import { EmployeesShowEntries } from "../../Utils/Constants/EmployeesShowEntries";

function Tables(data) {
  data = data.data;
  let showEntriesLength = 0;
  const [showEntries, setShowEntries] = useState(EmployeesShowEntries[0].value);
  const [indexStart, setIndexStart] = useState(0);
  const [indexEnd, setIndexEnd] = useState(showEntries);
  const [employees, setEmployees] = useState(useContext(Context));
  const [currentSort, setCurrentSort] = useState('');
  const dataHeader = data.header;
  const [currentPage, setCurrentPage] = useState(0);

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

  /**
   *
   * @param {object} event
   */
  function handleSortable(event) {
    event.preventDefault();
    setCurrentSort(event.target.dataset.sortType);
    handleSort(event.target.dataset.sortType);
  }

  /**
   * Set the data to sort.
   * @param {string} sortType
   */
  function handleSort(sortType) {
    let dataToSort = [...employees];
    dataToSort.sort((a, b) => {
      if (sortType === "firstNameASC") return a.firstName.localeCompare(b.firstName)
      else if (sortType === "firstNameDESC") return b.firstName.localeCompare(a.firstName)
      else if (sortType === "lastNameASC") return a.lastName.localeCompare(b.lastName)
      else if (sortType === "lastNameDESC") return b.lastName.localeCompare(a.lastName)
      else if (sortType === "startDateASC") return new Date(a.startDate) - new Date(b.startDate)
      else if (sortType === "startDateDESC") return new Date(b.startDate) - new Date(a.startDate)
      else if (sortType === "departmentASC") return b.department.localeCompare(a.department)
      else if (sortType === "departmentDESC")return a.department.localeCompare(b.department)
      else if (sortType === "dateOfBirthASC") return new Date(a.dateOfBirth) - new Date(b.dateOfBirth)
      else if (sortType === "dateOfBirthDESC") return new Date(b.dateOfBirth) - new Date(a.dateOfBirth)
      else if (sortType === "streetASC") return a.street.localeCompare(b.street)
      else if (sortType === "streetDESC") return b.street.localeCompare(a.street)
      else if (sortType === "cityASC") return a.city.localeCompare(b.city)
      else if (sortType === "cityDESC") return b.city.localeCompare(a.city)
      else if (sortType === "stateASC") return a.state.localeCompare(b.state)
      else if (sortType === "stateDESC") return b.state.localeCompare(a.state)
      else if (sortType === "zipCodeASC") return a.zipCode - b.zipCode
      else if (sortType === "zipCodeDESC") return b.zipCode - a.zipCode
    })
    setEmployees(dataToSort);
  }

  /**
   * Manage the search data.
   * @param {object} event
   */
  function handleSearch(event) {
    const value = event.target.value.trim().toLowerCase();
    let dataToSearch = [...employees];
    if (value.length >= 2) {
      let newObject = [];
      dataToSearch.filter((data) => {
        if (  data.firstName.toLowerCase().includes(value)
              || data.lastName.toLowerCase().includes(value)
              || data.startDate.toLowerCase().includes(value)
              || data.department.toLowerCase().includes(value)
              || data.dateOfBirth.toLowerCase().includes(value)
              || data.street.toLowerCase().includes(value)
              || data.city.toLowerCase().includes(value)
              || data.state.toLowerCase().includes(value)
              // || data.zipCode.includes(value)
            ) { newObject.push(data); }
      });
      setEmployees(newObject);
    } else setEmployees(employees);
  }

  function handleNext() {
    setCurrentPage(currentPage + 1);
    setIndexStart(indexStart + showEntries);
    setIndexEnd(indexEnd + showEntries);
  }

  function handlePrevious() {
    setCurrentPage(currentPage - 1);
    setIndexStart(indexStart - showEntries);
    setIndexEnd(indexEnd - showEntries);
  }

  function handlePage(event) {
    const { value } = event.target;
    setCurrentPage(value - 1);
    setIndexStart(showEntries * (value - 1));
    setIndexEnd(showEntries * value);
  }

  const Paginator = () => { // dans composant à part
    const employeesLength = employees.length;
    const pageTotal = Math.ceil(employeesLength / showEntries);
    const pageArray = [];
    for(let i = 1; i <= pageTotal; i++) { pageArray.push(i);  }
    return (
      <>
        {indexStart !== 0 ? <button className="previous" onClick={handlePrevious} type="button">Previous</button> : ''}
        {pageArray.map((number, index) => (
          <button disabled={currentPage === index ? true : false} value={number} key={index} onClick={handlePage} type="button">{number}</button>
        ))}
        {indexEnd < employees.length ? <button className="next" onClick={handleNext} type="button">Next</button> : ''}
      </>
    );
  }

  return(
    <>
      <form>
        <div>
          <label htmlFor="entries">Show</label>
          <Select className="react-select"
                  defaultValue={EmployeesShowEntries[0]}
                  onChange={
                    (newValue) => {
                      setShowEntries(newValue.value);
                      setIndexEnd(newValue.value);
                    }
                  }
                  options={EmployeesShowEntries}></Select>
          <label htmlFor="entries">entries</label>
        </div>
        <div>
          <label htmlFor="search">Search:</label>
          <input  id="search"
                  onChange={handleSearch}
                  type="text" />
        </div>
      </form>

      <table>
        <thead>
          <tr>
            {
              dataHeader.map((header, index) => {
                return (
                  <th className={CamelCaseConverter(null, header.name, null)}
                      key={header.name}>
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
                .slice(indexStart, indexEnd)
                .map(tr => {
                  showEntriesLength = showEntriesLength + 1;
                  return (<tr key={Math.random()}>
                    <td>{tr.firstName}</td>
                    <td>{tr.lastName}</td>
                    <td>{new Date(tr.startDate).toLocaleDateString()}</td>
                    <td>{tr.department}</td>
                    <td>{new Date(tr.dateOfBirth).toLocaleDateString()}</td>
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
              Showing {showEntriesLength} to {employees.length} entries
            </td>
            <td colSpan="4">
              <Paginator />
            </td>
          </tr>
        </tfoot>
      </table>
    </>
  );
}

export default Tables;