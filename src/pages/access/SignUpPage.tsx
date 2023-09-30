import React, { useState } from 'react'
import Logo from '../../utils/images/Logo.png'
import { Form, Input, Button, notification } from 'antd';
import { useDispatch } from 'react-redux';
import { SetDataLocalStorage, updateAccessSwitch } from '../../store/accessStore';
import { AccessApi } from '../../api/AccessApi';
import { ISignUp } from '../../models/AccessModels';
import { useNavigate } from 'react-router-dom';
function SignUppage() {
    const dispatch = useDispatch()
    const navigate=useNavigate()
    const [Loading, SetLoading] = useState(false)

    const onFinish = async (values: ISignUp) => {
        try {
            SetLoading(true)
            await AccessApi.UserSignUp(values).then((response) => {
                dispatch(SetDataLocalStorage(response.data))
                navigate('/todo')
            }).catch((error) => {
                notification.error({
                    message: error.data.message
                })
                SetLoading(false)
            })
        } catch (error) {
            console.log(error)
        }
    };

    type FieldType = {
        userName?: string;
        emailId?: string;
        password?: string;
    };
    return (
        <div className='Container'>
            <div className='LogoImgContainer'>
                <img src={Logo} alt="microsoft-to-do" className='ContainerLogo' />
                <h2>Sign up</h2>
            </div>
            <Form
                onFinish={onFinish}
                autoComplete="off"
                requiredMark={false}
                layout='vertical'
            >
                <Form.Item<FieldType>
                    label="Username"
                    name="userName"
                    rules={[{ required: true, message: 'Please input your Username' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item<FieldType>
                    label="Email ID"
                    name="emailId"
                    rules={[{ required: true, message: 'Please input your Email ID' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="Password"
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Confirm Password"
                    dependencies={['Password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('Password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The new password that you entered do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item>
                    <Button className='FormButton' type="primary" htmlType="submit" loading={Loading}>
                        Sign up
                    </Button>
                </Form.Item>
            </Form>
            <p className='ContainerAccount'>Already have an account? <span className='ContainerSpan' onClick={() => {
                dispatch(updateAccessSwitch(true))
            }}>Login</span></p>
        </div>
    )
}

export default SignUppage