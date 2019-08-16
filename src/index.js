// --- Imports --- //
import React , {useState} from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

// --- Custom Componets Imports --- //
import { Navbar, Sidebar } from "./components";

// --- Store --- //
import store from "./store";

function App() {
  const [sidebar, setSidebar] = useState(false)
  return (
    <React.Fragment>
      <Navbar openDrawer={()=> setSidebar(true)}/>
      <Sidebar open={sidebar} closeDrawer={() => {setSidebar(false)}}/>
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
