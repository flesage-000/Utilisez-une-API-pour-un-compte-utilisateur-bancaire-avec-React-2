import React, {useState} from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "./FormCreateEmployee.css";

import constDepartments from "../../constants/departements.jsx"
import constStates from "../../constants/states.jsx";

import FormOptions from "../FormOptions/FormOptions.jsx";
import AddToLocal from "../Stores/AddToLocal.jsx";

function FormCreateEmployee() {
  const [startDate, setStartDate] = useState(new Date());
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

  function handleSubmit(event) {
    event.preventDefault();
    console.log("form", form);
    AddToLocal(form);
  }

  return(
    <form onSubmit={handleSubmit}>
      <div>
        <input  type="text" id="firstname" required
                onChange={
                  (e) => {
                    setForm({ ...form,
                              firstName: e.target.value })
                  }
                } />
        <label htmlFor="firstname">First Name<span className="required">*</span></label>
      </div>
      <div>
        <input  type="text" id="lastname" required
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
                              setStartDate(date);
                              setForm({ ...form,
                                        dateOfBirth: date.toLocaleDateString() });
                            }
                          }
                          selected={startDate} />
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
                          selected={startDate} />
        <label htmlFor="startdate">Start Date<span className="required">*</span></label>
      </div>
      <fieldset>
        <legend>Address</legend>
        <div>
          <input  type="text" id="street" required
                  onChange={
                    (e) => {
                      setForm({ ...form,
                                street: e.target.value  })
                    }
                  } />
          <label htmlFor="street">Street<span className="required">*</span></label>
        </div>
        <div>
          <input  type="text" id="city" required
                  onChange={
                    (e) => {
                      setForm({ ...form,
                                city: e.target.value  })
                    }
                  } />
          <label htmlFor="city">City<span className="required">*</span></label>
        </div>
        <div>
          <select id="state" required
                  onChange={
                    (e) => {
                      setForm({ ...form,
                                state: e.target.value })
                    }
                  }>
            <FormOptions options={constStates} />
          </select>
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
        <select id="department" required
                onChange={
                  (e) => {
                    setForm({ ...form,
                              department: e.target.value  })
                  }
                }>
            <FormOptions options={constDepartments} />
        </select>
        <label htmlFor="department">Department<span className="required">*</span></label>
      </div>
      <small className="required">* Required fields</small>
      <input  type="submit" value="Save" />
    </form>
  );
}

export default FormCreateEmployee;