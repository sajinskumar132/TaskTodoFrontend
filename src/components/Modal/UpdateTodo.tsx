import { Button, Form, Input, Modal } from 'antd'
import React, { useState } from 'react'
import { ITodo, IUpdate } from '../../models/TodoModels'
import { useDispatch } from 'react-redux'
import { UpdateTodos } from '../../serviceApis/todoServiceApi'
interface Iprops {
    open: boolean,
    onchange: (visibility: boolean) => void
    item:IUpdate
  }
function UpdateTodo({open,onchange,item}:Iprops) {
    const { TextArea } = Input;
    const dispatch = useDispatch()
    const [form] = Form.useForm();
    const [Loading,SetLoading]=useState(false)
    const onFinish =  (values: ITodo) => {
    SetLoading(true)
    let response:Promise<boolean> = UpdateTodos(dispatch,item.userId,item.todoId,values)
    response.then((result) => {
        if (result) {
          onchange(false);
        } else {
          SetLoading(false);
        }
      })
      .catch((error) => {
        SetLoading(false);
      });
    }
  return (
    <div>
       <Modal title="Update" open={open} onCancel={()=>onchange(false)}  
       footer={
          <div>
            <Button form="myForm" htmlType="submit" type="primary" loading={Loading}>
              Save Changes
            </Button>
            <Button onClick={() => { onchange(false) }}>Cancel</Button>
          </div>
        }>
        <Form
          onFinish={onFinish}
          autoComplete="off"
          requiredMark={false}
          layout='vertical'
          id="myForm"
          initialValues={{
            title:item.title,
            content:item.Content
          }}
          form={form}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: 'Please input your Title' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Content"
            name="content"
            rules={[{ required: true, message: 'Please input your Content' }]}
          >
            <TextArea rows={10} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default UpdateTodo
