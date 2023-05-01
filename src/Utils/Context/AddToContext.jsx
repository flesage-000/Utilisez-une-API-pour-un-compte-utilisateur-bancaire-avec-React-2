import React, { useContext } from "react";
import { Context } from "./Context";

function AddToContext(data) {
let context = useContext(Context);
console.log("context", data);
// context.push(data);
}
export default AddToContext;