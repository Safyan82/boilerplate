"use client";
import './tablegrid.css';
import React, { useEffect, useRef, useState } from 'react';
import {DataTable} from '../table';
import { GridHeader } from './header';
import DraggableTabs from '../dragableTab';
import { GridFilter } from './gridFilter/gridFilter';
// import { Button, Input, Popover } from 'antd';
// // import { AdvanceFilter } from '../advanceFilter/advanceFilter';

export const TableGrid=()=>{

    const [filterModal, setFilterModal] = useState(false);

    return (
        <div className="tablegrid">
            <GridHeader title={"Exp"} record={0} />
           
            <DraggableTabs  />
            

            <GridFilter
                openAdvanceFilter={()=>setFilterModal(true)}
            />

            {/* <AdvanceFilter visible={filterModal} onClose={()=>setFilterModal(false)}/> */}

            <div className='tableView'>
                <DataTable   header={true}/>
            </div>

            
        </div>
    )
}