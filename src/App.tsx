import React, {useEffect} from "react";
import "./App.scss";
import {Outlet} from "react-router-dom";
import {useAppSelector, useAppDispatch} from "./MyRedux";
import Header from "./Components/Header";
import HeaderBottom from "./Components/HeaderBottom";
import Footer from "./Components/Footer";

function App() {
  const dispatch = useAppDispatch();

  return (
    <div id="App">
      <Header />

      <div id="app-content">
        <Outlet />

        <Footer />
      </div>

      <HeaderBottom />
    </div>
  );
}

export default App;
