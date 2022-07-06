import './App.css';

import Home from "./containers/home";

import NavigationBar from "./components/nav_bar";

import { Route, Redirect, HashRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <NavigationBar></NavigationBar>
        <Route
          exact
          path="/"
          render={() => <Redirect to="/home"></Redirect>}
        ></Route>
        <Route path="/home" component={Home}></Route>
      </HashRouter>
    </div>
  );
}

export default App;
