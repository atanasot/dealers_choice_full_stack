import React from "react";
import { connect } from "react-redux";
import { deleteDog } from "./store";
import { Link } from "react-router-dom";

const Dog = ({ dog, destroy, type }) => {
  if (!dog.id) {
    //error without this on a hard reload
    return null;
  }
  return (
    <div>
      Dog details for {dog.name} 
      <br />
      <button className='delete' onClick={() => destroy(dog)}>Delete</button>
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
  //const type = state.types.find(type => type.id === dog.typeId)
  //console.log(state.types)
  console.log(dog)
  return { dog };
}, mapDispatchToProps)(Dog);
