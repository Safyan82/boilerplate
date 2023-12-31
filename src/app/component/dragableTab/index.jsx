import './draggableTab.css';
import { DndContext, PointerSensor, useSensor } from '@dnd-kit/core';
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React, { useEffect, useRef, useState } from 'react';
import { Tabs, Popover, Input, Button } from 'antd';
import dragimg from '../../assets/img/draggable.svg';
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { faAdd, faSearch } from '@fortawesome/free-solid-svg-icons';


const DraggableTabNode = ({ className, ...props }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: props['data-node-key'],
  });
  const style = {
    ...props.style,
    transform: CSS.Transform.toString(
      transform && {
        ...transform,
        scaleX: 1,
      },
    ),
    transition,
    cursor: 'pointer',
  };
  return React.cloneElement(props.children, {
    ref: setNodeRef,
    style,
    ...attributes,
    ...listeners,
  });
};
const DraggableTab = () => {

  const [items, setItems] = useState([
  {
    key: 1,
    label: 'General View',
  },
  {
    key: 2,
    label: 'Custom View',
  }
]);

  const popoverRef = useRef();
  const inputRef = useRef();


  const [activeKey, setActiveKey] = useState();
  const [createViewForm, setCreateViewForm] = useState(false);
  const [view, setView] = useState([]);
  const [viewSearch, setViewSearch] = useState();
  const [selectedView, setSelectedView] = useState('');
  const [viewPop, setViewPop] = useState();
  const [createdView, setCreatedView] = useState([]);
  

  const [pinView, setPinView] = useState();
  
  const handelSelectedView = async(prop)=>{
    const selectedSingleView = data?.branchViews?.find((view)=>view._id==prop.id);
    const isExist = items.find((item)=>item.label==prop.label);

    sessionStorage.setItem("selectedViewId", prop?._id)


    setSelectedView(prop.label);
    setPinView(prop.key);
    

    if(!isExist){
      setItems([...items, {key: (items.length+1).toString(), label: selectedSingleView.name, ...selectedSingleView}]);
      setActiveKey((items.length+1).toString());
    }else{
      setActiveKey(isExist.key.toString());
    }

  };
 





  const sensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 100,
    },
  });

  const onDragEnd = ({ active, over }) => {
    if (active.id !== over?.id) {
      setItems((prev) => {
        const activeIndex = prev.findIndex((i) => i.key === active.id);
        const overIndex = prev.findIndex((i) => i.key === over?.id);
        return arrayMove(prev, activeIndex, overIndex);
      });
    }
  };

  useEffect(() => {
    // Function to handle clicks outside the box
    const handleClickOutside = (event) => {
      if(event.target.name==="popoverSearch" || event.target.name==="popoverCheckboxes"){ return; }
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        // Perform your desired action here
        setViewPop(false);
      }
    };

    // Attach the event listener when the component mounts
    document.addEventListener('click', handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const removeView = async (rmItm) => {
    setItems(items?.filter(item=>item.key!=rmItm.key));
    
    handelActiveTab((Number(items?.length)-1).toString());
  };


  const handelActiveTab = (e)=>{
    setActiveKey(e);
    setPinView(e.toString());
    const selectedView = items?.find((view)=>view.key==e.toString());
    
    sessionStorage.setItem("selectedViewId", selectedView?._id);
    
   
  }

  return (
    <>
      <div
        className='setting-body-inner' style={{
          padding: '25px 48px 0px', 
          display: 'flex', alignItems:'center'
        }}
      >
        <Tabs       
          closeIcon={true}
          onChange={(e)=>handelActiveTab(e)}
          style={items?.length===3?{minWidth:'35%'}:null}
          renderTabBar={(tabBarProps, DefaultTabBar) => (
            <DndContext sensors={[sensor]} onDragEnd={onDragEnd}>
              <SortableContext items={items.map((i) => i.key)} strategy={horizontalListSortingStrategy}>
                <DefaultTabBar {...tabBarProps}>
                  {(node) => (
                    <DraggableTabNode {...node.props} key={node.key}>
                      {node}
                    </DraggableTabNode>
                  )}
                </DefaultTabBar>
              </SortableContext>
            </DndContext>
          )}
          activeKey={activeKey}
        >
          {items?.map((item)=>(

            <Tabs.TabPane  tab={
              <div className='dragContent'>
                {items?.length>1?
                <>
                  <Image src={dragimg} alt="" className='dragimg'/> 
                  <div>{item.label}</div> 
                  <FontAwesomeIcon 
                  style={{marginLeft:'15px',marginRight:'-15px'}} 
                  className={pinView==item.key?'':'dragimg'} icon={faClose} 
                  onClick={()=>removeView(item)}
                  />
                </> : 
                <>
                  <img src={dragimg} alt="" className='dragimg'/> 
                  <div>{item.label}</div>
                </>
                }
              </div>
            } key={item.key} tabKey={item.key} />

          ))}
        </Tabs>
        
        <div className='addView'>                    
            <Popover
                open={viewPop}
                overlayClassName='settingCustomPopover '
                afterOpenChange={()=>{inputRef.current.focus();}}
                style={{ width: 250 }}
                content={
                    viewPop?
                    <div ref={popoverRef}>
                        <div className="popover-search" ref={popoverRef}>
                            <Input type="text" 
                                ref={inputRef}
                                id="inputSearch"
                                name='popoverSearch'
                                style={{ width: '-webkit-fill-available', backgroundColor: 'white'  }} 
                                className='generic-input-control' 
                                placeholder="Search..."
                                autoFocus={viewSearch}
                                autoComplete="off"
                                value={viewSearch}
                                onChange={(e)=> {
                                    setView(data?.branchViews?.filter((date)=> (date.name)?.toLowerCase()?.includes(e.target.value?.toLowerCase())))
                                    setViewSearch(e.target.value);
                                }}
                                suffix={<FontAwesomeIcon style={{color:'#0091ae'}}  icon={faSearch}/>}
                            />
                        </div>
                        
                        <div style={{display:'flex'}}>

                            <div 
                                className="popover-data"  
                                style={{
                                    width: '275px',
                                    overflow: 'auto',
                                    height: '25vh',
                                }}          
                                ref={popoverRef}
                            >
                                <div
                                    style={{
                                        padding: '8px 20px',
                                        color: 'black',
                                        fontWeight: 600,
                                    }}
                                >Standard ({view?.length})</div>
                                {view && view?.map((datelist)=>(

                                    <div 
                                        style={{paddingLeft:'40px'}}
                                        className={selectedView==datelist.label? 
                                        "popoverdataitem popoverdataitem-active": "popoverdataitem"} 
                                        onClick={(e)=>{handelSelectedView(datelist);  setViewPop(false)}}>
                                        {datelist?.label}
                                    </div>
                                ))}
                            </div>
                            {createdView?.length>0?
                            <div      
                                className="popover-data"  
                                style={{
                                    width: '275px',
                                    overflow: 'auto',
                                    height: '25vh',
                                }}          
                                ref={popoverRef}
                            >
                                <div
                                    style={{
                                        padding: '8px 20px',
                                        color: 'black',
                                        fontWeight: 600,
                                    }}
                                >Created by me ({createdView?.length})</div>
                                {createdView && createdView?.map((datelist)=>(

                                    <div 
                                        style={{paddingLeft:'40px'}}
                                        className={selectedView==datelist.label? "popoverdataitem popoverdataitem-active": "popoverdataitem"} 
                                        onClick={(e)=>{handelSelectedView(datelist); setViewPop(false)}}>
                                        {datelist.label}
                                    </div>
                                ))}
                            </div>
                            : null
                            }
                        </div>

                        {/* footer */}
                        <div className="addViewfooter" ref={popoverRef} onClick={()=>setCreateViewForm(true)}>
                            <span>Create a new view</span>
                        </div>

                    </div>
                    : null
                    }
                    trigger="click"
                    placement='bottom'
                >
                  <Button type='text' ref={popoverRef}  onClick={()=>{setViewPop(!viewPop)}}> <FontAwesomeIcon icon={faAdd} color='#7c98b6' /> &nbsp; Add view ({items?.length}/5)</Button>
            </Popover>

            <Button type='text'>All views </Button>

        </div>
      </div>
      
      {/* <CreateView
            visible={createViewForm}
            onClose={()=>setCreateViewForm(false)}
            setcreatedView = {setCreatedView}
            createdView={createdView}
            branchViewRefetch={branchViewRefetch}
      /> */}
    </>
  );
};
export default DraggableTab;