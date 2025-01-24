import React from 'react';
import { Row, Col, Form, Input, Radio, message } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userRegister } from '../redux/actions/userActions';
import Spinner from '../components/Spinner';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles

AOS.init();

const Register = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alertReducer);

  function onFinish(values) {
    const { userType, secretKey } = values; // Retrieve values from form
    if (userType === "Admin" && secretKey !== "mykey123") {
      message.error("Invalid Admin Key");
    } else {
      dispatch(userRegister(values));
      console.log("Success:", values);
    }
  }

  return (
    <div className='login'>
      {loading && <Spinner />}
      <Row gutter={16} className='d-flex align-items-center'>
        <Col lg={16} style={{ position: 'relative' }}>
          <img
            className='w-100'
            data-aos='slide-left'
            data-aos-duration='1500'
            src="https://images.unsplash.com/photo-1584936684506-c3a7086e8212?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1694&q=80"
            alt=''
          />
          <h1 className='login-logo'>BIKEHUB</h1>
        </Col>
        <Col lg={8} className='text-left p-5'>
          <Form
            layout='vertical'
            className='login-form p-5'
            onFinish={onFinish}
          >
            <h1>Register</h1>
            <hr />
            <Form.Item
              name="userType"
              label="Register as"
              rules={[{ required: true, message: "Please select an option!" }]}
            >
              <Radio.Group>
                <Radio value="User">User</Radio>
                <Radio value="Admin">Admin</Radio>
              </Radio.Group>
            </Form.Item>

            {/* Dynamically render the secret key field for Admin */}
            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) =>
                prevValues.userType !== currentValues.userType
              }
            >
              {({ getFieldValue }) =>
                getFieldValue('userType') === 'Admin' && (
                  <Form.Item
                    name="secretKey"
                    label="Secret Key"
                    rules={[{ required: true, message: "Secret key is required for Admin!" }]}
                  >
                    <Input />
                  </Form.Item>
                )
              }
            </Form.Item>

            <Form.Item
              name='username'
              label='Username'
              rules={[{ required: true, message: "Please enter your username!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name='password'
              label='Password'
              rules={[{ required: true, message: "Please enter your password!" }]}
            >
              <Input.Password className='passfield' />
            </Form.Item>
            <Form.Item
              name='cpassword'
              label='Confirm Password'
              dependencies={['password']}
              rules={[
                { required: true, message: "Please confirm your password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Passwords do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password className='passfield' />
            </Form.Item>
            <button className='btn1 mt-2 mb-3'>Register</button>
            <br />
            <Link to='/login'>Already have an account? Login</Link>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Register;
