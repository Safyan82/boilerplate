"use client";
import React, { useEffect, useState } from 'react';
import { Layout, theme, Table, Input, Popover } from 'antd';
import {SearchOutlined} from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './table.css';
  
import { Resizable } from 'react-resizable';
// import { EditColumn } from './editColumn/editColumn.modal';
const { Header, Content, Footer } = Layout;

const tblData = [
  {
    title: 'Test',
    dataIndex: 'Name',
    key: 0
  }
];

export const DataTable = ({header, data, loading}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [sortedInfo, setSortedInfo] = useState({});
  const [dynamicColumn, setDynamicColumn]=useState([]);

 

  const handleResize = dataIndex => (e, { size }) => {
    setDynamicColumn(prevColumns => {
      const nextColumns = [...prevColumns];
      const index = nextColumns.findIndex(col => col.dataIndex === dataIndex);
      nextColumns[index] = {
        ...nextColumns[index],
        width: size.width,
      };
      return nextColumns;
    });
  };

  
  const [hoveredRow, setHoveredRow] = useState(null);

  const rowClassName = (record) => {
    return record.key === hoveredRow ? 'hovered-row' : '';
  };

  
  
  const handleRowMouseEnter = (record) => {
    setHoveredRow(record.key);
  };


  const handleRowMouseLeave = () => {
    setHoveredRow(null);
    // setMoreoption(false);
  };

  useEffect(()=>{

      const col = tblData.map((prop)=>{
        
          return {
            title: prop.title,
            dataIndex: prop.dataIndex,
            key: prop.key, // Initial width of the column
            width:200,
            onHeaderCell: (column) => ({
              width: column.width,
              onResize: handleResize(column.dataIndex),
            }),
            ellipsis:true,
            render: (_, record) => {

              const showActions = hoveredRow === record.key && prop.dataIndex=="test";
              console.log(showActions, "showActions");
              // return (          
              //   <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
              //     <div style={{display:'flex', flexDirection:'column'}} className='truncated-text' >
                  
              //        <div className={prop.dataIndex=="test"? 'prev-btn' : null}>{record[prop.propertyDetail.label.replaceAll(" ","").toLowerCase()]}</div>
                    
              //     </div>

              //   {showActions && selectedRowKeys?.length===0 &&
              //     <button className={"grid-sm-btn"} type="link" onClick={()=>history('/user/detailPage/'+record.key)}>
              //       Preview
              //     </button>
              //   }
              // </div>
              // );
            },
          }
        // }
      })||[];
      setDynamicColumn([...col]);
    
  }, [hoveredRow]);

  const [dataSource, setDataSource] = useState([{
    key: 1,
    test: "Hello world"
  }]);

  



  


  const {
    token: { colorBgContainer },
  } = theme.useToken();
  
  const handleChange = (pagination, filters, sorter) => {};


  const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
  };


  // normal row selection
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const [editColumnModal, setEditColumnModal] = useState(false);

  return (
    <Layout className='bg-white'>
      <Content className="site-layout" style={{ padding: '0 42px' }}>
        <div style={{ padding: 5, minHeight: 450, background: colorBgContainer }}>
           

            <Table  
              bordered
              rowSelection={rowSelection}
              columns={dynamicColumn} 
              components={{
                header: {
                  cell: ResizableTitle,
                },
              }}
              dataSource={dataSource} 
              pagination={{pageSize:5,}}
              title={!header? null : () => {
                if(header){
                return(
                  <div className='grid-table-search-input'>
                  
                    <Input type='search' style={{background: 'white', width:'250px', height:'33px'}} className='generic-input-control' placeholder='Search ...'  suffix={<FontAwesomeIcon style={{color:'#0091ae'}}  icon={faSearch}/>}/>
                    <div className="small-btn">
                      <button className='sm-btn'>Export</button> &emsp;
                      <button className='sm-btn' onClick={()=>setEditColumnModal(true)}>Edit columns</button>
                    </div>
                  </div>
                )}else{return null}
              }} 
              
          
              onRow={(record) => ({
                onMouseEnter: () => handleRowMouseEnter(record),
                onMouseLeave: () => handleRowMouseLeave(),
              })}
              rowClassName={rowClassName}
            />
            
            {/* {editColumnModal &&
              <EditColumn visible={editColumnModal} onClose={()=>setEditColumnModal(false)}/>
            } */}
        </div>
      </Content>
      
    </Layout>
  );
};

const ResizableTitle = (props) => {
  const { onResize, width, ...restProps } = props;

  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable
      width={width}
      height={0}
      handle={<span className="react-resizable-handle" />}
      onResize={onResize}
    >
      <th {...restProps} />
    </Resizable>
  );
};