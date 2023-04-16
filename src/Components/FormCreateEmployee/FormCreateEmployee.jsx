import React, {useState} from "react";

import constDepartments from "../../constants/departements.jsx"
import constStates from "../../constants/states.jsx";

import FormOptions from "../FormOptions/FormOptions.jsx";
import AddToLocal from "../Stores/AddToLocal.jsx";

function FormCreateEmployee() {
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
        <input  type="text" id="dateofbirth" required
                onChange={
                  (e) => {
                    setForm({ ...form,
                              dateOfBirth: e.target.value })
                  }
                } />
        <label htmlFor="dateofbirth">Date of Birth<span className="required">*</span></label>
      </div>
      <div>
        <input  type="text" id="startdate" required
                onChange={
                  (e) => {
                    setForm({ ...form,
                              startDate: e.target.value })
                  }
                } />
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
          <input  type="text" id="zipcode" required
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