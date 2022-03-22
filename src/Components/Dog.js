import React from "react";
import { connect } from "react-redux";
import { deleteDog } from "../store";
import { Link } from "react-router-dom";

const Dog = ({ dog, destroy, type }) => {
  if (!dog.id) {
    return null;
  }
  return (
    <div className="doggy">
      {dog.typeId === 6 ? (
        <h2>{dog.name} is not a doodle</h2>
      ) : (
        <h2>
          {dog.name} is a {type.name}
        </h2>
      )}
      <br />
      <button className="delete" onClick={() => destroy(dog)}>
        Delete
      </button>
      <br />
      <Link to={`/dogs/${dog.id}/update`}>Update</Link>
    </div>
  );
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    destroy: (dog) => dispatch(deleteDog(dog, history)),
  };
};

export default connect((state, otherProps) => {
  const dog =
    state.dogs.find((dog) => dog.id === otherProps.match.params.id * 1) || {};
  const type = state.types.find((type) => type.id === dog.typeId) || {};
  return { dog, type };
}, mapDispatchToProps)(Dog);
