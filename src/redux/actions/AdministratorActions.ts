import * as types from "./actionTypes";
import * as Api from "../../api/AdministratorCalls";
import { apiCallError, beginApiCall } from "./apiStatusActions";

export const AdministratorSigninSuccess = (administrator: any) => ({
  type: types.ADMINISTRATOR_SIGNIN_SUCCESS,
  administrator,
});

export const AdministratorVerifySuccess = (administrator: any) => ({
  type: types.VERIFY_ADMIN_SUCCESS,
  administrator,
});

export const getExamsSuccess = (exams: any) => ({
  type: types.GET_EXAMS_SUCCESS,
  exams,
});

export const updateExamStatusSuccess = (exams: any) => ({
  type: types.UPDATE_EXAMS_SUCCESS,
  exams,
});

export const createExamSuccess = (exams: any) => ({
  type: types.CREATE_EXAM_SUCCESS,
  exams,
});

export const getPinSuccess = (pin: any) => ({
  type: types.GET_PIN_SUCCESS,
  pin,
});

export const CreatePinSuccess = (pin: any) => ({
  type: types.GET_PIN_SUCCESS,
  pin,
});

export const getAdministratorsSuccess = (admin: any) => ({
  type: types.GET_ADMINISTRATOR_SUCCESS,
  admin,
});

export const createAdministratorsSuccess = (admin: any) => ({
  type: types.CREATE_ADMINISTRATOR_SUCCESS,
  admin,
});

export const deleteAdministratorOptimistic = (admin_id: string) => ({
  type: types.DELETE_ADMINISTRATOR_OPTIMISTIC,
  admin_id,
});

export const getResultSuccess = (result: any) => ({
  type: types.GET_RESULTS_SUCCESS,
  result,
});

export const getFacultySuccess = (faculties: any) => ({
  type: types.GET_FACULTY_SUCCESS,
  faculties,
});

export const createFacultySuccess = (faculty: any) => ({
  type: types.CREATE_FACULTY_SUCCESS,
  faculty,
});

export function SignInAdmin({ username, password }: any) {
  return async (dispatch: any) => {
    try {
      dispatch(beginApiCall());
      const administrator = await Api.loginAdministrator({
        username,
        password,
      });
      return dispatch(AdministratorSigninSuccess(administrator));
    } catch (error) {
      dispatch(apiCallError());
      throw error;
    }
  };
}

export function VerifyAdministrator() {
  return async (dispatch: any) => {
    try {
      dispatch(beginApiCall());
      const administrator = await Api.verifyAdministrator();
      return dispatch(AdministratorVerifySuccess(administrator));
    } catch (error) {
      dispatch(apiCallError());
      throw error;
    }
  };
}

export const loadUpExams = () => {
  return async (dispatch: any) => {
    try {
      dispatch(beginApiCall());
      const exam = await Api.getExams();
      return dispatch(getExamsSuccess(exam));
    } catch (error) {
      dispatch(apiCallError());
      throw error;
    }
  };
};

export const updateExamStatus = (exam_id:string, exam_status:any) => {
  return async (dispatch: any) => {
    try {
      // dispatch(beginApiCall());
      debugger;
      const exam = await Api.updateExamstatus(exam_id, exam_status);
      return dispatch(updateExamStatusSuccess(exam));
    } catch (error) {
      // dispatch(apiCallError());
      throw error;
    }
  };
};

export const createExam = (data: any) => {
  return async (dispatch: any) => {
    try {
      dispatch(beginApiCall());
      const exam = await Api.submitExam(data);
      return dispatch(createExamSuccess(exam));
    } catch (error) {
      dispatch(apiCallError());
      throw error;
    }
  };
};

export const loadUpResults = (exam_id: string) => {
  return async (dispatch: any) => {
    try {
      dispatch(beginApiCall());
      const results = await Api.getResults(exam_id);
      return dispatch(getResultSuccess(results));
    } catch (error) {
      dispatch(apiCallError());
      throw error;
    }
  };
};

export const loadPin = () => {
  return async (dispatch: any) => {
    try {
      dispatch(beginApiCall());
      const pin = await Api.getPin();
      return dispatch(getPinSuccess(pin));
    } catch (error) {
      dispatch(apiCallError());
      throw error;
    }
  };
};

export const createPin = (count: any) => {
  return async (dispatch: any) => {
    try {
      dispatch(beginApiCall());
      const pin = await Api.createPin(count);
      return dispatch(CreatePinSuccess(pin));
    } catch (error) {
      dispatch(apiCallError());
      throw error;
    }
  };
};

export const getAdministrators = () => {
  return async (dispatch: any) => {
    try {
      dispatch(beginApiCall());
      const admin = await Api.getAdministrators();
      return dispatch(getAdministratorsSuccess(admin));
    } catch (error) {
      dispatch(apiCallError());
      throw error;
    }
  };
};

export const createAdministrator = (newAdministrator: any) => {
  return async (dispatch: any) => {
    try {
      dispatch(beginApiCall());
      const admin = await Api.createAdministrators(newAdministrator);
      return dispatch(createAdministratorsSuccess(admin));
    } catch (error) {
      dispatch(apiCallError());
      throw error;
    }
  };
};

export function deleteAdministrator(admin_id: string) {
  return function (dispatch: any) {
    dispatch(deleteAdministratorOptimistic(admin_id));
    return Api.deleteAdministrator(admin_id);
  };
}

export const getFaculty = () => {
  return async (dispatch: any) => {
    try {
      dispatch(beginApiCall());
      const faculty = await Api.getFaculty();
      return dispatch(getFacultySuccess(faculty));
    } catch (error) {
      dispatch(apiCallError());
      throw error;
    }
  };
};

export const createFaculty = (faculty:string) => {
  return async (dispatch: any) => {
    try {
      dispatch(beginApiCall());
      const facultyDta = await Api.createFaculty(faculty);
      return dispatch(createFacultySuccess(facultyDta));
    } catch (error) {
      dispatch(apiCallError());
      throw error;
    }
  };
};