import React, { useContext, useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Flmodale } from "fl-modale";
import 'fl-modale/dist/index.css'
import Select from "react-select";
import { Context } from "../../Utils/Context/Context";

import "./FormCreateEmployee.css";

import constDepartments from "../../constants/departements.jsx"
import constStates from "../../constants/states.jsx";

// import AddToLocal from "../Stores/AddToLocal.jsx";
// import AddToContext from "../../Utils/Context/AddToContext";

function FormCreateEmployee() {
  const context = useContext(Context);
  const [selectedDepartmentsOptions, setSelectedDepartmentsOptions] = useState(null);
  const [selectedStatesOptions, setSelectedStatesOptions] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState();
  const [startDate, setStartDate] = useState();
  const [form, setForm] = useState({
    firstName: null,
    lastName: null,
    dateOfBirth: null,
    startDate: null,
    street: null,
    city: null,
    state: null,
    zipCode: null,
    department: null,
  });
  const data = {
    style: {
      modalPosition: {
        type: "unknownWidthHeight",
      }
    },
    text: "Nouvel employé ajouté !"
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log("form", form);
    console.log("context BEFORE PUSH", context);
    context.push(form);
    console.log("context AFTER PUSH", context);
    // AddToLocal(form);
    setIsOpen(true);
  }

  return(
    <>
      <Flmodale data={data} isOpen={isOpen} setMdlOpen={setIsOpen}/>
      <form onSubmit={handleSubmit}>
        <div>
          <input  type="text" id="firstname" minLength="3" required
                  onChange={
                    (e) => {
                      setForm({ ...form,
                                firstName: e.target.value })
                    }
                  } />
          <label htmlFor="firstname">First Name<span className="required">*</span></label>
        </div>
        <div>
          <input  type="text" id="lastname" minLength="3" required
                  onChange={
                    (e) => {
                      setForm({ ...form,
                                lastName: e.target.value  })
                    }
                  } />
          <label htmlFor="lastname">Last Name<span className="required">*</span></label>
        </div>
        <div>
          <ReactDatePicker  dateFormat="dd/MM/yyyy"
                            onChange={
                              (date) => {
                                setDateOfBirth(date);
                                setForm({ ...form,
                                          dateOfBirth: date.toLocaleDateString() });
                              }
                            }
                            placeholderText="Select a date"
                            required
                            selected={dateOfBirth} />
          <label htmlFor="dateofbirth">Date of Birth<span className="required">*</span></label>
        </div>
        <div>
          <ReactDatePicker  dateFormat="dd/MM/yyyy"
                            onChange={
                              (date) => {
                                setStartDate(date)
                                setForm({ ...form,
                                          startDate: date.toLocaleDateString() })}
                            }
                            placeholderText="Select a date"
                            required
                            selected={startDate} />
          <label htmlFor="startdate">Start Date<span className="required">*</span></label>
        </div>
        <fieldset>
          <legend>Address</legend>
          <div>
            <input  type="text" id="street" minLength="3" required
                    onChange={
                      (e) => {
                        setForm({ ...form,
                                  street: e.target.value  })
                      }
                    } />
            <label htmlFor="street">Street<span className="required">*</span></label>
          </div>
          <div>
            <input  type="text" id="city" minLength="3" required
                    onChange={
                      (e) => {
                        setForm({ ...form,
                                  city: e.target.value  })
                      }
                    } />
            <label htmlFor="city">City<span className="required">*</span></label>
          </div>
          <div>
            <Select className="react-select"
                    defaultValue={selectedStatesOptions}
                    onChange={
                      (newValue) => {
                        setSelectedStatesOptions(newValue.label);
                        setForm({ ...form,
                                  state: newValue.label });
                      }
                    }
                    options={constStates}
                    required={true}></Select>
            <label htmlFor="state">State<span className="required">*</span></label>
          </div>
          <div>
            <input  type="number" id="zipcode" required max="99999" min="1"
                    onChange={
                      (e) => {
                        setForm({ ...form,
                                  zipCode: e.target.value })
                        }
                      } />
            <label htmlFor="zipcode">Zip Code<span className="required">*</span></label>
          </div>
        </fieldset>
        <div>
          <Select className="react-select"
                  defaultValue={selectedDepartmentsOptions}
                  onChange={
                    (newValue) => {
                      setSelectedDepartmentsOptions(newValue.value);
                      setForm({ ...form,
                                department: newValue.value })
                    }
                  }
                  options={constDepartments}
                  required={true}></Select>
          <label htmlFor="department">Department<span className="required">*</span></label>
        </div>
        <small className="required">* Required fields</small>
        <input  type="submit" value="Save" />
      </form>
    </>
  );
}

export default FormCreateEmployee;