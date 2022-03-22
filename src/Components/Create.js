import React, { Component } from "react";
import { connect } from "react-redux";
import { createDog } from "../store";

class Create extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      typeId: "",
      error: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
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
      await this.props.create(dog);
    } catch (err) {
      this.setState({ error: err.response.data.error });
    }
  }

  render() {
    const { name, error, typeId } = this.state;
    const { types } = this.props;
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
          Save
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    create: (dog) => dispatch(createDog(dog, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Create);
