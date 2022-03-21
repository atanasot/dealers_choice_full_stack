import React, { Component } from "react";
import { connect } from "react-redux";
import { createDog } from "./store";

class Create extends Component {
  constructor() {
    super();
    this.state = {
      //this is local state, only the state of the form
      name: "",
      error: "", //no error by default
    };
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }
  // need this onChange so we can type inside the form
  onChange(ev) {
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change); //set the new state to the change obj
  }

  // we want to see the errors from the database when the user intput doesnt pass the constraints
  async onSave(ev) {
    ev.preventDefault();
    try {
      await this.props.create(this.state.name);
    } catch (err) {
      this.setState({ error: err.response.data.error });
    }
  }

  render() {
    
    const { name, error } = this.state;
    if (error.errors) {
      console.log(error.errors[0])   
    }
    const { onChange, onSave } = this;
    return ( 
      <form onSubmit={onSave}>
        <pre>
          {!!error.errors && <h2 >{error.errors[0].message}</h2>}
        </pre>
        <input name="name" value={name} onChange={onChange} />
        <button>Save</button>
      </form>
    );
  }
}

// check database for duplicate names
const mapDispatchToProps = (dispatch, { history }) => {
  return {
    create: (name) => dispatch(createDog(name, history)),
  };
};

export default connect(null, mapDispatchToProps)(Create);
