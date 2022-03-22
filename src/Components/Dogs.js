import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Dogs = ({ dogs }) => {
  return (
    <ul className="dogsList">
      {dogs.map((dog) => (
        <li key={dog.id}>
          <Link to={`/dogs/${dog.id}`}>{dog.name}</Link>
        </li>
      ))}
    </ul>
  );
};

export default connect((state) => state)(Dogs);
