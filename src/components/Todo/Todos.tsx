import React, { useEffect, useState } from 'react'
import { LocalStorageService } from '../../Services/LocalStorageService'
import { useDispatch, useSelector } from 'react-redux'
import { IUTodo, IUpdate } from '../../models/TodoModels'
import { Button, Card, Spin, Tag } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { GetTodo, DeleteTodo } from '../../serviceApis/todoServiceApi'
import UpdateTodo from '../Modal/UpdateTodo'
import './todos.css'
function Todos() {
    const dispatch = useDispatch()
    const Todos = useSelector((state: any) => state.todo.todos)
    const Loading = useSelector((state: any) => state.todo.todoLoading)
    const [IsEdit, SetIsEdit] = useState(false)
    const [EditDetails, SetEditDetails] = useState<IUpdate>({
        userId: '',
        todoId: '',
        title: '',
        Content: ''
    })
    const[DeleteLoading,SetDeleteLoading]=useState(false)
    const [DeleteId,SetDeleteId]=useState('')
    useEffect(() => {
        if (LocalStorageService.LocalData) {
            GetTodo(dispatch)
        }
    }, [LocalStorageService.LocalData])

    const showUpdateModal = (visibility: boolean) => {
        SetIsEdit(visibility);
    };

    return (
        <Spin spinning={Loading}>
            <div className='todoList'>
                {Todos && Todos.map((item: IUTodo) => {
                    return (
                        <Card
                           key={item._id}
                            className='cardStyle'
                            headStyle={{ 'padding': "0px" }}
                            bodyStyle={{ 'padding': "0px" }}
                            title={
                                <div className='cardHead'>
                                    <p className='cardTitle'>{item.title}</p>
                                    <Tag className='cardTag' color="#2db7f5">{item.updatedAt.replace('T', ' ').replace('Z', ' ')}</Tag>
                                </div>}
                            actions={[
                                <Button key="edit" icon={<EditOutlined />} onClick={() => {
                                    SetEditDetails({
                                        userId: item.userId,
                                        todoId: item._id,
                                        title: item.title,
                                        Content: item.content
                                    })
                                    showUpdateModal(true)
                                }} />,
                                <Button key="Delete" icon={<DeleteOutlined />} loading={item._id===DeleteId?DeleteLoading:false} onClick={() => {
                                    SetDeleteId(item._id)
                                    SetDeleteLoading(true)
                                    let response=DeleteTodo(dispatch, item.userId, item._id)
                                    response.then(() => {
                                        SetDeleteLoading(false)
                                    }).catch(()=>{
                                        SetDeleteLoading(false)
                                    })
                                }} />
                            ]}
                        >
                            <p className='cardContent'>{item.content}</p>
                        </Card>
                    )
                })}
                {IsEdit ? <UpdateTodo open={IsEdit} onchange={showUpdateModal} item={EditDetails} /> : <></>}
            </div>
        </Spin>
    )
}

export default Todos