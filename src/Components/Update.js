import React, { Component } from "react";
import { connect } from "react-redux";
import { updateDog } from "../store";

class Update extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.dog.id ? this.props.dog.name : "",
      typeId: this.props.dog.id ? this.props.dog.typeId : "",
      error: "",
    };

    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.dog.id && this.props.dog.id) {
      this.setState({
        name: this.props.dog.name,
        typeId: this.props.dog.typeId,
      });
    }
  }

  onChange(ev) {
    const change = {};
    change[ev.target.name] = ev.target.value;
    change[ev.target.typeId] = ev.target.value;
    this.setState(change);
  }

  async onSave(ev) {
    ev.preventDefault();
    const dog = {
      name: this.state.name,
      typeId: Number(this.state.typeId),
    };
    try {
      await this.props.update(this.props.dog.id, dog);
    } catch (err) {
      this.setState({ error: err.response.data.error });
    }
  }

  render() {
    const { name, error, typeId } = this.state;
    const { dogs, types, update } = this.props;
    const { onChange, onSave } = this;

    return (
      <form onSubmit={onSave}>
        <pre>{!!error.errors && <h2>{error.errors[0].message}</h2>}</pre>
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
        <button className="saveUpdate" disabled={!name || !typeId}>
          Update
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state, otherProps) => {
  const types = state.types;
  const dog =
    state.dogs.find((dog) => dog.id === otherProps.match.params.id * 1) || {};
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

export default connect(mapStateToProps, mapDispatchToProps)(Update);
