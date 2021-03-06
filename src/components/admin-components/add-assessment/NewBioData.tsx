import React, { useState, useEffect } from "react";
import { getBioData } from "../../../api/AdministratorCalls";
import { toast } from "react-toastify";

import { toBase64 } from "./Functionality";

const BioData = (props: any) => {
  const { setInputs, inputs } = props;
  const [bioData, setBiodata] = useState([
    {
      matric: "",
      name: "",
      department: "",
      level: "",
      ca: 0,
    },
  ]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const toSpread: any = inputs.bioData.reduce(
      (acc: any, cur: any, i: number) => {
        if (acc.length >= 5 || i < (page - 1) * 5) {
          return acc;
        }
        return [...acc, cur];
      },
      []
    );
    setBiodata(toSpread);
  }, [inputs, setBiodata, page]);

  const handleFileUpload = async (ev: any) => {
    const { files } = ev.target;
    try {
      const file = await toBase64(files[0]);
      const obj = await getBioData(file);
      addRow(obj);
    } catch (error) {
      toast.error(`Error: ${error.message}`, {
        position: "top-center",
      });
    }
  };
  const addRow = (
    arr?: [
      {
        matric: string;
        name: string;
        department: string;
        level: number;
        ca: number;
      }
    ]
  ) => {
    if (!Array.isArray(arr)) {
      setInputs({
        ...inputs,
        bioData: [
          { matric: "", name: "", department: "", level: 100, ca: 0 },
          ...inputs.bioData,
        ],
      });
      return;
    }
    const t = Array.isArray(arr)
      ? arr.reduce((acc: any, cur: any) => {
          if (
            typeof cur.matric !== "string" ||
            typeof cur.name !== "string" ||
            typeof cur.department !== "string" ||
            isNaN(parseInt(cur.level)) ||
            isNaN(parseInt(cur.ca))
          ) {
            return acc;
          }
          return [...acc, cur];
        }, [])
      : [];
    setInputs({
      ...inputs,
      bioData: [...t, ...inputs.bioData],
    });
  };
  const handleBioData = (row: number, name: string, value: string | number) => {
    const arr = inputs.bioData;
    arr[row][name] = value;
    setInputs({ ...inputs, bioData: arr });
  };
  let pages = Math.floor(inputs.bioData.length / 5);
  pages +=
    parseInt((inputs.bioData.length / 5).toFixed(2).split(".")[1] + "") > 0
      ? 1
      : 0;
  const pageEnd =
    page * 5 > inputs.bioData.length ? inputs.bioData.length : page * 5;
  const pageStart =
    inputs.bioData.length === 0 ? 0 : page * 5 - 4 < 1 ? 1 : page * 5 - 4;
  return (
    <fieldset className="new-assessment__fieldset">
      <legend className="new-assessment__legend">Students information</legend>

      <div className="d-flex flex-column mb-5">
        <label style={{ lineHeight: "1" }}>
          Upload Students data: <br />
          <span className="new-assessment__label-hint">
            upload bulk data using excel spreadsheet (.xlsx)
          </span>
        </label>
        <input type="file" onChange={handleFileUpload} name="studentData" />
      </div>

      <div className="d-flex flex-column">
        <div className="d-flex justify-content-between">
          <label style={{ lineHeight: "1" }}>
            Upload Students data: <br />
            <span className="new-assessment__label-hint">
              upload single data individually
            </span>
          </label>

          <div>
            Add Data
            <button
              className="ml-2 new-assessment__add-data"
              onClick={(e) => {
                e.preventDefault();
                addRow();
              }}
            >
              +
            </button>
          </div>

          <div>
            <span
              className="btn btn-primary new-assessment__nav-ques"
              onClick={(ev) => {
                const prev = page - 1 < 1 ? 1 : page - 1;
                setPage(prev);
              }}
            >
              prev
            </span>
            <span className="ml-2 mr-2">{`${pageStart} - ${pageEnd} of ${inputs.bioData.length}`}</span>
            <span
              onClick={(ev) => {
                const next = page + 1 > pages ? pages : page + 1;
                setPage(next);
              }}
              className="btn btn-primary new-assessment__nav-ques"
            >
              next
            </span>
          </div>
        </div>

        <fieldset className="new-assessment__fieldset">
          {bioData.map((elem: any, index: number) => {
            return (
              <div
                className="d-flex justify-content-between"
                key={`biodata_row_${index}`}
              >
                {/* <span style={{ position: "absolute", left: "-10px", marginRight: "18px" }}>
                  {(page - 1) * 5 + index}.
                </span> */}
                <div className="d-flex flex-column new-assessment__student-data">
                  <div
                    className="new-assessment__student-data--label"
                    style={{ marginBottom: "45px" }}
                  ></div>
                  <div>{(page - 1) * 5 + index + 1}.</div>
                </div>
                <div className="d-flex flex-column new-assessment__student-data">
                  <label className="new-assessment__student-data--label">
                    Matric No:
                  </label>
                  <input
                    type="text"
                    value={bioData[index].matric}
                    name="matric"
                    style={{ width: 90 }}
                    onChange={(ev) =>
                      handleBioData(
                        (page - 1) * 5 + index,
                        ev.target.name,
                        ev.target.value
                      )
                    }
                    className="new-assessment__course-input"
                  />
                </div>
                <div className="d-flex flex-column new-assessment__student-data">
                  <label className="new-assessment__student-data--label">
                    Name:
                  </label>
                  <input
                    value={bioData[index].name}
                    type="text"
                    name="name"
                    style={{ width: 300 }}
                    onChange={(ev) =>
                      handleBioData(
                        (page - 1) * 5 + index,
                        ev.target.name,
                        ev.target.value
                      )
                    }
                    className="new-assessment__course-input"
                  />
                </div>
                <div className="d-flex flex-column new-assessment__student-data">
                  <label className="new-assessment__student-data--label">
                    Department:
                  </label>
                  <input
                    type="text"
                    value={bioData[index].department}
                    name="department"
                    onChange={(ev) =>
                      handleBioData(
                        (page - 1) * 5 + index,
                        ev.target.name,
                        ev.target.value
                      )
                    }
                    className="new-assessment__course-input"
                  />
                </div>

                <div className="d-flex flex-column new-assessment__student-data">
                  <label className="new-assessment__student-data--label">
                    Level:
                  </label>
                  <select
                    name="level"
                    onChange={(ev) =>
                      handleBioData(
                        (page - 1) * 5 + index,
                        ev.target.name,
                        ev.target.value
                      )
                    }
                    value={bioData[index].level}
                    className="new-assessment__course-input"
                  >
                    <option value="100">100</option>
                    <option value="200">200</option>
                    <option value="300">300</option>
                    <option value="400">400</option>
                    <option value="500">500</option>
                  </select>
                </div>

                <div className="d-flex flex-column new-assessment__student-data">
                  <label className="new-assessment__student-data--label">
                    CA:
                  </label>
                  <input
                    type="number"
                    onChange={(ev) =>
                      handleBioData(
                        (page - 1) * 5 + index,
                        ev.target.name,
                        ev.target.value
                      )
                    }
                    style={{ width: 60 }}
                    value={bioData[index].ca}
                    name="ca"
                    className="new-assessment__course-input"
                  />
                </div>
                <div className="d-flex" style={{ alignItems: "center" }}>
                  <span
                    className="btn btn-outline-danger"
                    style={{ borderRadius: 5, fontSize: 12 }}
                    onClick={() => {
                      const arr = inputs.bioData;
                      arr.splice((page - 1) * 5 + index, 1);
                      setInputs({ ...inputs, bioData: arr });
                    }}
                  >
                    delete
                  </span>
                </div>
              </div>
            );
          })}
        </fieldset>
      </div>
    </fieldset>
  );
};

export default BioData;
