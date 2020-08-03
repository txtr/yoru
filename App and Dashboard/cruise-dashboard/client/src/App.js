import React from "react";
import "./App.css";
// import logo from "./logo.svg";
// import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
import AppNavbar from "./components/AppNavbar";
import MainPage from "./pages/MainPage";
import EditPage from "./pages/EditPage";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <AppNavbar />
      <Router>
        <Route path="/" exact component={MainPage} />
        <Route path="/manage" exact component={EditPage} />
      </Router>
    </div>
  );
}

export default App;
