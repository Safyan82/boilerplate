"use client";

import React,{ useState } from 'react';
import { Menu, Input, Space, Avatar, Layout, } from 'antd';
import {
  SearchOutlined,
} from '@ant-design/icons';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faBell, faComments, faGear } from '@fortawesome/free-solid-svg-icons';
import './navbar.css';


const { SubMenu } = Menu;

export function Navbar(){
    const [placeholder, setPlaceholder] = useState(false);
    return(
    <Layout>
        <Menu mode="horizontal" theme="dark" className='top-menu-layout' triggerSubMenuAction="click">
            <Menu.Item>
                <img  style={{width:'30px', height:'30px', borderRadius:'4px'}}  className='menu-icon' />
            </Menu.Item>

            <Menu.Item key="employee" className='menu-item'>Employee</Menu.Item>
            <Menu.Item key="site" className='menu-item'>Site</Menu.Item>
            <Menu.Item key="schedule" className='menu-item'>Schedule</Menu.Item>
            <Menu.Item key="timeline" className='menu-item'>Timeline</Menu.Item>
            <SubMenu title={<span>More <span className='caret-white'></span></span>} key="more" >

                <Menu.Item key="more" className='menu-item'>Branches</Menu.Item>
            
            </SubMenu>
            
            <Menu.Item className='search' key="search" style={{margin: 'auto', background:"none !important", backgroundColor: 'none !important',}}>
            <Space style={{background:"none", marginLeft: '-14%' }}>
                <Input
                    suffix={<SearchOutlined />}
                    placeholder={placeholder? "Employees, Sites, Schedule" : "Search"}
                    className='menu-searchbar'
                    onClick={()=>setPlaceholder(true)}
                    onBlur={()=>setPlaceholder(false)}
                />
            </Space>
            </Menu.Item>


            <Menu.Item className='menu-item '>
                <FontAwesomeIcon icon={faGear} className='menu-icon' />
            </Menu.Item>
            <Menu.Item className='menu-item '>
                <FontAwesomeIcon icon={faBell} className='menu-icon'  />
            </Menu.Item>

            <Menu.Item className='menu-item '>
                <FontAwesomeIcon icon={faComments}  className='menu-icon' />
            </Menu.Item>

            <Menu.Item>     
                <div className='vertical-separator'></div>
            </Menu.Item>

            <Menu.Item className='menu-item ' key="account">
                <Avatar> AJ </Avatar>
            </Menu.Item>


            
        </Menu>

    </Layout> 
    )
}