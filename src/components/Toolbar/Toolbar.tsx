import { Button, Input } from 'antd';
import React, { useState } from 'react'
import { PlusOutlined } from '@ant-design/icons';
import './toolBar.css'
import CreateDrawer from '../Drawer/CreateDrawer';
import { useDispatch } from 'react-redux';
import { FilterTodos } from '../../store/todoStore';
function Toolbar() {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);
    const showDrawer = (visibility:boolean) => {
        setOpen(visibility);
      };
    return (
        <div>
            <div className='ToolbarContainer'>
                <Input className='SearchInput' placeholder="search todo" onChange={(e)=>{
                     dispatch(FilterTodos(e.target.value))
                }} allowClear />
                <Button icon={<PlusOutlined />} onClick={()=>{
                    showDrawer(true)
                }}>Add todo</Button>
            </div>
            {open?<CreateDrawer open={open} onchange={showDrawer}/>:<></>}
        </div>
    )
}

export default Toolbar
