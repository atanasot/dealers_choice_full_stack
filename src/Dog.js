import React from "react";
import { connect } from "react-redux";
import { deleteDog } from "./store";

const Dog = ({ dog, destroy }) => {
  if (!dog.id) {  //error without this on a hard reload
    return null
  }
  return (<div>
    Dog details for {dog.name}
    <button onClick={() => destroy(dog)}>Delete</button>
    </div>);
};

const mapDispatchToProps = (dispatch, {history}) => {
  return {
    destroy: (dog) => dispatch(deleteDog(dog, history))
  }
}

// mapState takes in 2 args: state and otherProps. We can get the match obj from otherProps because its a component inside a Router.
// we get dog from the state (first arg) which we get from mapState
export default connect((state, otherProps) => {
  const dog =
    state.dogs.find((dog) => dog.id === otherProps.match.params.id * 1) || {};
  return { dog };
}, mapDispatchToProps)(Dog);
