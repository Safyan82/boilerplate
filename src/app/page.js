import './assets/css/input.css';
import './assets/css/generic.css';
import './assets/css/customCheckbox.css';
import './assets/css/setting.css';
import React from "react";
import Spinner from "./component/spinner/spinner";
import { FormDrawer } from "./component/drawer/drawer";
import { Navbar } from "./component/navbar/navbar";
import { ButtonGroup } from './component/button/button';
import { TableGrid } from './component/tablegrid';


export default function Home() {
  return (
    <div style={{display: 'flex', flexDirection: 'column', rowGap:'16px', alignItems: ''}}>
      <Navbar/> 
      <FormDrawer />
      <ButtonGroup/>
      <TableGrid/>
    </div>
  )
}
