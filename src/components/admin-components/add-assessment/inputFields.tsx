import React from "react";

export const durationField = (props: any) => (
  <div className={"align-items-center " + props.col}>
    <label htmlFor="duration">{props.label}:</label>

    <div>
      <input
        className={props.class ? props.class : ""}
        type="number"
        name="dur1"
        onChange={props.onChange}
        value={props.dur1}
        placeholder="00"
      />
      <span className="new-assessment__time-label">mins</span>
      <input
        className={props.class ? props.class : ""}
        type="number"
        name="dur2"
        placeholder="00"
        onChange={props.onChange}
        value={props.dur2}
        // className="scnd"
      />
      <span className="new-assessment__time-label">secs</span>
    </div>
  </div>
);

export const regularInput = (props: any) => (
  <div
    className={
      `align-items-center ${
        props.className && props.className.indexOf("grid-group") !== -1
          ? ""
          : "grid-group"
      } ` + props.className
    }
  >
    <label htmlFor={props.htmlFor}>{props.label}</label>

    <div>
      <input
        style={{ width: "100%" }}
        {...props.input}
        className="new-assessment__course-input"
      />
    </div>
  </div>
);
