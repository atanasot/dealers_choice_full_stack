import React from "react";
import { render } from "react-dom";
import { Provider, connect } from "react-redux";
import store, { fetchDogs, fetchTypes } from "./store";
import { HashRouter, Route, Link, Switch } from "react-router-dom";
import Dogs from "./Dogs";
import Nav from "./Nav";
import Dog from "./Dog";
import Create from "./Create";
import Update from "./Update";

const Home = () => (
  <picture>
    <img
      src="/pics/Eros1.jpg"
      alt="Eros is the cutest"
      width="400"
      height="500"
    />
  </picture>
);

class _App extends React.Component {
  componentDidMount() {
    this.props.loadDogs();
    this.props.loadTypes();
  }

  render() {
    const { dogs, types } = this.props;
    return (
      <HashRouter>
        <div>
          <h1>Eros And Doggie Friends</h1>
          <Route component={Nav} />
          <Route component={Home} path="/" exact />
          <Route component={Dogs} path="/dogs" exact />
          <Switch>
            {/* either load one or the other ** more specific route goes first  */}
            <Route component={Create} path="/dogs/create" />
            <Route component={Dog} path="/dogs/:id" exact />
          </Switch>
          <Route component={Update} path="/dogs/:id/update" />
        </div>
      </HashRouter>
    );
  }
}

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => {
  return {
    loadDogs: () => dispatch(fetchDogs()),
    loadTypes: () => dispatch(fetchTypes()),
  };
};

const App = connect(mapStateToProps, mapDispatchToProps)(_App);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
