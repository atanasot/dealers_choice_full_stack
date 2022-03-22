import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import faker from "faker";
import { createFakerDog } from "../store";

const createRandomTypeId = () => {
  return Math.ceil(Math.random() * 6);
};

const Nav = ({ createFaker, dogs, location: { pathname } }) => {
  return (
    <nav>
      <Link to="/" className={pathname === "/" ? "selected" : ""}>
        Home
      </Link>
      <Link to="/dogs" className={pathname === "/dogs" ? "selected" : ""}>
        Dogs ({dogs.length})
      </Link>
      <button
        onClick={() =>
          createFaker(faker.name.firstName(), createRandomTypeId())
        }
      >
        Create faker Dog
      </button>
      <Link
        to="/dogs/create"
        className={pathname === "/dogs/create" ? "selected" : ""}
      >
        Create Doggie
      </Link>
    </nav>
  );
};

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    createFaker: (name, typeId) =>
      dispatch(createFakerDog(name, typeId, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
