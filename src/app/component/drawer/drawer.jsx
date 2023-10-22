"use client";
import './drawer.css';
import React,{ useState } from 'react';
import { Form, Input, Drawer } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';


export const FormDrawer = () => {


    const [visible, setVisible] = useState(false);

    
    
      return (
        <div>
          <button className='drawer-filled-btn' onClick={()=>setVisible(true)}> Show Form Drawer</button>

          <Drawer
            title="Drawer"
            placement="right"
            closable={true}
            onClose={()=>setVisible(false)}
            closeIcon={<FontAwesomeIcon icon={faClose} onClick={()=>setVisible(false)} className='close-icon'/>}
            visible={visible}
            width={600}
            
            maskClosable={false}
            mask={true}
            footer={
              <div className='drawer-footer'>
                  <button  className={'disabled-btn drawer-filled-btn'} >
                    Create 
                  </button>
                  <button  onClick={()=>handelSubmit(false)} className={'drawer-outlined-btn'} >
                    Create and add another
                  </button>
                  <button className='drawer-outlined-btn' onClick={()=>setVisible(false)}>Cancel</button>
              </div>
            }
          >
            
            <form id="branchForm" className='form'>

                    <Form.Item>
                     <Input 
                        className='generic-input-control'
                        type={"text"}
                      />
                    </Form.Item>  
                   
                   
            </form>
            
          </Drawer>
        </div>
      );
      
}