import React from 'react';
import { Button, Dropdown,message, Menu,Row,Col } from 'antd';
import { Link } from 'react-router-dom';

const DefaultLayout = (props) => {
    const user = JSON.parse(localStorage.getItem('user')) || { username: 'Guest' ,userType:'User'};
    const handleAdminClick = () => {
        if (user.userType === 'Admin') {
            window.location.href = '/admin';
        } else {
          setTimeout(() => {
            message.error('You are not authorized to access the Admin panel.');
            window.location.href = '/login';
          }, 1000);
        }
    };
    const menu = (
        <Menu>
            <Menu.Item>
                <a

                    href="/"
                >
                    Home
                </a>
            </Menu.Item>
            <Menu.Item>
                <a

                    href="/userbookings"
                >
                    Bookings
                </a>
            </Menu.Item>
            <Menu.Item onClick={handleAdminClick}>
                <a
                    href="#"
                >
                    Admin
                </a>
            </Menu.Item>
            <Menu.Item onClick={() => {
                localStorage.removeItem('user');
                window.location.href = '/login'
            }}>
                <li style={{ color: 'slateblue' }}>Logout</li>
            </Menu.Item>
        </Menu>
    );
    return (
        <div>
            <div className='header bs1'>
                <Row gutter={16} justify={'center'}>
                    <Col lg={20} sm={24} xs={24}>
                    <div className="d-flex justify-content-between">
                    <h1><Link to='/' style={{textDecoration:'none'}}>BikeHub</Link></h1>
                    <Dropdown overlay={menu} placement="bottomCenter">
                        <Button>{user.username}</Button>
                    </Dropdown>
                </div>
                    </Col>
                </Row>
                
            </div>
            <div className='content'>
                {props.children}
            </div>
        </div>
    )
}

export default DefaultLayout
