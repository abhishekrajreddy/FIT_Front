import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <Router>
      <Header />
      <Route exact path={"/"} replace component={Home} />
      <Route exact path={"/login"} replace component={Login} />
      <Route exact path={"/register"} replace component={Register} />
      <Route exact path={"/dashboard"} replace component={Dashboard} />
    </Router>
  );
}

export default App;
