import { Form, Input, Button, notification } from 'antd';
import Logo from '../../utils/images/Logo.png'
import { useDispatch } from 'react-redux';
import { SetDataLocalStorage, updateAccessSwitch } from '../../store/accessStore';
import { AccessApi } from '../../api/AccessApi';
import { ILogin } from '../../models/AccessModels';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function LoginPage() {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const [Loading,SetLoading]=useState(false)
    const onFinish = async (values: ILogin) => {
        try {
            SetLoading(true)
            await AccessApi.UserLogin(values).then((response)=>{
                dispatch(SetDataLocalStorage(response.data))
                navigate('/todo')
            }).catch((error)=>{
                notification.error({
                    message:error.data.message
                })
                SetLoading(false)
            })
        } catch (error) {
            console.log(error)
        }
       
    };


    type FieldType = {
        emailId?: string;
        password?: string;
    };
    return (
        <div className='Container'>
            <div className='LogoImgContainer'>
                <img src={Logo} alt="microsoft-to-do" className='ContainerLogo'/>
                <h2>Login</h2>
            </div>
            <Form
                onFinish={onFinish}
                autoComplete="off"
                requiredMark={false}
                layout='vertical'
            >
                <Form.Item<FieldType>
                    label="Email ID"
                    name="emailId"
                    rules={[{ required: true, message: 'Please input your Email ID' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password' }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item>
                    <Button className='FormButton' type="primary" htmlType="submit" loading={Loading}>
                        Login
                    </Button>
                </Form.Item>
            </Form>
            <p className='ContainerAccount'>Don`t have an account? <span className='ContainerSpan' onClick={()=>{
                dispatch(updateAccessSwitch(false))
            }}>SignUp</span></p>
        </div>
    )
}

export default LoginPage
