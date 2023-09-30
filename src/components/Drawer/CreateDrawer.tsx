import React, { useState } from 'react'
import { Button, Drawer, Form, Input } from 'antd';
import './createDrawer.css'
import { ITodo } from '../../models/TodoModels';
import { CreateTodo } from '../../serviceApis/todoServiceApi';
import { useDispatch } from 'react-redux';
interface Iprops {
  open: boolean,
  onchange: (visibility: boolean) => void
}

function CreateDrawer({ open, onchange }: Iprops) {
  const { TextArea } = Input;
  const dispatch = useDispatch()
  const [form] = Form.useForm();
  const [Loading, SetLoading] = useState(false)
  const onFinish = (values: ITodo) => {
    SetLoading(true)
    const response: Promise<boolean> = CreateTodo(dispatch, values)
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
      <Drawer className='DrawerMainContainer' title="Create New Todo" placement="right" onClose={() => { onchange(false) }} open={open}
        size={'large'}
        footer={
          <div className='DrawerActions'>
            <Button form="myForm" htmlType="submit" type="primary" loading={Loading}>
              Create
            </Button>
            <Button onClick={() => { onchange(false) }}>Cancel</Button>
          </div>
        }
      >
        <Form
          onFinish={onFinish}
          autoComplete="off"
          requiredMark={false}
          layout='vertical'
          id="myForm"
          form={form}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: 'Please input your title' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Content"
            name="content"
            rules={[{ required: true, message: 'Please input your content' }]}
          >
            <TextArea rows={15} />
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  )
}

export default CreateDrawer
