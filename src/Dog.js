import React from "react";
import {connect} from 'react-redux'

// look a
const Dog = (props) => {
    console.log(props) //look at props --- match - params - id
  return (
    <div>
        Dog details to follow
    </div>
  );
};

export default connect(state => state)(Dog)