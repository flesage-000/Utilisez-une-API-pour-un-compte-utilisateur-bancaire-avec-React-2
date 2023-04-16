import React from "react";

function FormOptions(data) {
  data = data.options;

  return (
    data.map(option => <option  key={option.value}
                                value={option.value}
                                >{option.name}</option>)
  );
}

export default FormOptions;