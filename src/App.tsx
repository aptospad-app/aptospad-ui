import React, {useEffect} from "react";
import "./App.scss";
import {Outlet} from "react-router-dom";
import {useAppSelector, useAppDispatch} from "./MyRedux";
import HeaderComponent from "./Components/Header";
import HeaderBottomComponent from "./Components/HeaderBottom";

function App() {
  const dispatch = useAppDispatch();

  return (
    <div id="App">
      <HeaderComponent />

      <div id="app-content">
        <Outlet />
      </div>

      <HeaderBottomComponent />
    </div>
  );
}

export default App;
