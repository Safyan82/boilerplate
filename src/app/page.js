import './assets/css/input.css';
import './assets/css/generic.css';
import React from "react";
import Spinner from "./component/spinner/spinner";
import { FormDrawer } from "./component/drawer/drawer";
import { Navbar } from "./component/navbar/navbar";


export default function Home() {
  return (
    <React.Fragment>
      <FormDrawer />
      <Spinner color={"red"}/>
      <Navbar/>
    </React.Fragment>
  )
}
