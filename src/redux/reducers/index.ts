import { combineReducers } from "redux";
import student from "./studentReducer";
import apiCallsInProgress from "./apiStatusReducer";
import administrator from "./administratorReducer";
import exams from "./ExamsReducer";
import studentExamination from "./studentExamReducer";
import pin from "./pinReducer";
import otherAdministrator from "./otherAdministratorReducer";
import results from "./resultReducer";
import faculty from "./facultyReducer";
import department from "./departmentReducer";
import counts from "./countReducer";
import biodatas from "./biodataReducer";

export const rootReducer = combineReducers({
  student,
  administrator,
  apiCallsInProgress,
  exams,
  studentExamination,
  pin,
  results,
  otherAdministrator,
  faculty,
  department,
  counts,
  biodatas,
});

// export default rootReducer;
