import React, { Component } from "react";
import { connect } from "react-redux";
import { updateDog } from "./store";

class Update extends Component {
  constructor(props) {
    //pass in props so we can get the props from the store and get the dog
    super(props);
    this.state = {
      name: this.props.dog.id ? this.props.dog.name : "",
      typeId: this.props.dog.id ? this.props.dog.typeId : "", //typeId is from dogs table
      error: "", //no error by default
    };
    //console.log(this.props)
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.dog.id && this.props.dog.id) {
      //if i didnt have that dog and now i have it
      this.setState({
        name: this.props.dog.name,
        typeId: this.props.dog.typeId,
      });
    }

    console.log(this.props);
  }

  onChange(ev) {
    // need this onChange so we can type inside the form and change options from the dropdown
    const change = {};
    change[ev.target.name] = ev.target.value;
    change[ev.target.typeId] = ev.target.value;
    this.setState(change); //set the new state to the change obj
  }

  // we want to see the errors from the database when the user intput doesnt pass the constraints
  async onSave(ev) {
    ev.preventDefault();
    const dog = {
      name: this.state.name,
      typeId: Number(this.state.typeId),
    };
    try {
      await this.props.update(this.props.dog.id, dog);
    } catch (err) {
        //console.log(err)
      this.setState({ error: err.response.data.error });
    }
  }

  render() {
    console.log(this.state);
    const { name, error, typeId } = this.state;
    const { dogs, types, update } = this.props; 
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
        <select value={typeId} name="typeId" onChange={onChange}>
          <option value="">-- select a doodle type --</option>
          {types.map((type) => (
            <option value={type.id} key={type.id}>
              {type.name}
            </option>
          ))}
        </select>
        <button disabled={!name || !typeId}>Update</button>
      </form>
    );
  }
}

const mapStateToProps = (state, otherProps) => {
  const types = state.types;
  const dog =
    state.dogs.find((dog) => dog.id === otherProps.match.params.id * 1) || {};
  //const type = state.types.find(type => type.id === dog.typeId) || {}
  return {
    dog,
    types,
  };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    update: (id, dog) => dispatch(updateDog(id, dog, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Update); //use mapState to get types
