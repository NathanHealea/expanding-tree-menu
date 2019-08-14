// --- Imports --- //
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

// --- Custom Componets Imports --- //
import { Navbar, Sidebar } from "./components";

// --- Store --- //
import store from "./store";

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Sidebar />
    </React.Fragment>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
