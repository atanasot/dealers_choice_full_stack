import React, { Component } from "react";
import { connect } from "react-redux";
import { createDog } from "./store";

class Create extends Component {
  constructor() {
    super();
    this.state = {
      name: "", //see value = {name} in inpu; this name is dynamic
      typeId: "", //typeId is from dogs table
      error: "", //no error by default
    };
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  onChange(ev) {
    // need this onChange so we can type inside the form and change options from the dropdown
    const change = {};
    change[ev.target.name] = ev.target.value;
    change[ev.target.typeId] = ev.target.value
    this.setState(change); //set the new state to the change obj
  }

  // we want to see the errors from the database when the user intput doesnt pass the constraints
  async onSave(ev) {
    ev.preventDefault();
    const dog = {                        // this is how we add a new dog to the db with its name and typeId
        name: this.state.name,
        typeId: Number(this.state.typeId)
    }
    try {
      await this.props.create(dog);     // this create is coming from down below in mapDispatchProps
    } catch (err) {
      this.setState({ error: err.response.data.error });
    }
  }

  render() {
      console.log(this.state)
    const { name, error, typeId } = this.state;
    const { dogs, types, create } = this.props; //we get these from connecting to states store
    // if (error.errors) {
    //   console.log(error.errors[0])
    // }
    const { onChange, onSave } = this;
    return (
      <form onSubmit={onSave}>
        <pre>
          {!!error.errors && <h2>{error.errors[0].message}</h2>}
          {/* id like to make the message go away when user starts typing instead of refreshing the page*/}
        </pre>
        <input
          name="name"
          placeholder="dog's name"
          value={name}
          onChange={onChange}
        />
        <select value={typeId} name="typeId" onChange={ onChange}>
          <option value=''>-- select a doodle type --</option>
          {types.map((type) => (
            <option value={type.id} key={type.id}>
              {type.name}
            </option>
          ))}
        </select>
        <button disabled={!name || !typeId}>Save</button>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  //console.log(state)  //{dogs, types} //both are arrays
  return state;
};

// check database for duplicate names
const mapDispatchToProps = (dispatch, { history }) => {
  return {
    create: (dog) => dispatch(createDog(dog, history))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Create); //use mapState to get types
