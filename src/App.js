import React, { Component } from "react";
import './App.scss';
import NavBar from "./components/navbar";
import Login from './components/login';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <main className="container h-100">
          <Login />
        </main>
      </div>
    );
  }
}

export default App;
