import React from "react";

const Display = ({ students }) => {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>First name</th>
            <th>Last name</th>
            <th>Check in time</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.first_name}</td>
              <td>{student.last_name}</td>
              <td>{new Date(student.check_in_time).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Display;
