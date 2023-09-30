import { Avatar, Button, Popover } from 'antd'
import React from 'react'
import { LocalStorageService } from '../../Services/LocalStorageService';
import './userAvatar.css'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearTodoStore } from '../../store/todoStore';
function UserAvatar() {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const content = (
        <div className='AvatarPopContent'>
          <p className='AvatarPopUserName'>{LocalStorageService.LocalData?.userName}</p>
          <p className='AvatarPopUserEmail'>{LocalStorageService.LocalData?.emailId}</p>
          <Button className='AvatarPopUserButton' onClick={()=>{
            LocalStorageService.ClearLocalStorageData()
            dispatch(clearTodoStore())
            navigate('/')
          }}>Logout</Button>
        </div>
      );
  return (
    <div>
        <Popover content={content} trigger={'click'}>
           <Avatar className='avatar'>{LocalStorageService.LocalData?.userName.charAt(0).toUpperCase()}</Avatar>
        </Popover>
      
    </div>
  )
}

export default UserAvatar
