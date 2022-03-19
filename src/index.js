import React from "react";
import { render } from "react-dom";
import { Provider, connect } from "react-redux";
import store, { fetchDogs } from "./store";
import { HashRouter as Router, Route, Link } from "react-router-dom"; //rename HashRouter to just Router
import Dogs from './Dogs'
import Nav from './Nav'
import Dog from "./Dog";


const Home = () => <hr />

class _App extends React.Component {
  componentDidMount() {
    this.props.loadDogs();
  }

  render() {
    const { dogs } = this.props;
    return (
      <Router>
        <div>
          <h1>Cute Doggies</h1>
          <Route component={ Nav } />
          <Route component={ Home } path='/' exact/>
          <Route component={ Dogs} path='/dogs'/>
          <Route component= {Dog} path='/dogs/:id' />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => {
  return {
    loadDogs: () => dispatch(fetchDogs()),
  };
};

const App = connect(mapStateToProps, mapDispatchToProps)(_App);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
