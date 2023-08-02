import { createAction } from "@reduxjs/toolkit";

const changeText = createAction("@text/change");
const changeChecks = createAction("@checks/change")

const inputActions = { changeText, changeChecks };
export default inputActions;
