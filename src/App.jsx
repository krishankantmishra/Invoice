
import React from "react";
import AppContent from "./component/AppContent";
import { Provider } from "react-redux";
import { store } from "./store/store";
import "./index.css"; // Assuming you have a CSS file for styles


function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;