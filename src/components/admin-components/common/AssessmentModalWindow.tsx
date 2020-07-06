import React, { useState, useEffect } from "react";
// import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TextField, SelectField } from "./InputField";
import { facultyAlphabeticalSortFn, departmentAlphabeticalSortFn } from "./sortHelperFn";

export const AddStudentModalWindow = ({ handleModalClose, faculty }: any) => {
  const [input, setInput] = useState({ faculty: null, department: "" });

  const handleInputs = (ev: any) => {
    const { name, value } = ev.target;
    setInput({ ...input, [name]: value });
  };

  const fac = faculty
    .sort(facultyAlphabeticalSortFn)
    .map((faculty: any) => faculty.faculty);

  let department = [];
  if (input.faculty !== null) {
    department = faculty.filter(
      (faculty: any) => faculty.faculty === input.faculty
    );

    department = department[0].departments
      .sort(departmentAlphabeticalSortFn)
      .map((dept: any) => dept.department);
  }
  useEffect(() => {
    const check = faculty.find((elem: any) => {
      return (
        elem.faculty === input.faculty &&
        elem.departments.find(
          (dept: any) => dept.department === input.department
        )
      );
    });
    if (input.department.length && !check)
      setInput((i) => ({ ...i, department: "" }));
  }, [input, faculty]);

  return (
    <div className="text-center profile">
      <h3>Add Student</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <TextField
          name="name"
          label="Name"
          placeholder="Enter Student's Name"
          handleInputs={handleInputs}
        />

        <div className="row">
          <TextField
            class="col-6"
            name="matric"
            label="Matric No."
            placeholder="Enter Matric No."
            handleInputs={handleInputs}
          />

          <SelectField
            class="col-6"
            label="Level"
            name="level"
            value="100"
            options={["100", "200", "300", "400", "500"]}
            handleInputs={handleInputs}
          />
        </div>

        <SelectField
          label="Faculty"
          name="faculty"
          value={input.faculty}
          options={fac}
          handleInputs={handleInputs}
        />

        {/**
         * TODO: fix bug partaining to sudden change of faculty
         */}

        <SelectField
          label="Department"
          name="department"
          isDisabled={input.faculty === null}
          value={input.department}
          options={department}
          handleInputs={handleInputs}
        />

        <div className="">
          <button className="btn btn-primary" onClick={handleModalClose}>
            Cancel
          </button>

          <button
            type="submit"
            className="btn btn-primary ml-2"
            onClick={() => {
              // history.push("/exam/submit");
            }}
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};
