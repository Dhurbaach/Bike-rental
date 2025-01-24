import React from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { Row, Col, Form, Input } from 'antd';
import { useDispatch,useSelector } from 'react-redux';
import { addBike } from '../redux/actions/bikeAction';
import Spinner from '../components/Spinner';

export const AddBike = () => {
    const dispatch = useDispatch();
    const {loading}=useSelector(state=>state.alertReducer)

    function onFinish(values) {
        values.bookedTimeSlots=[]
        dispatch(addBike(values));
        console.log(values);
    }

    return (
        <DefaultLayout>
            {loading && <Spinner />}
            <Row justify={'center mt-5'}>
                <Col lg={12} sm={24}>
                    <Form className='bs1 p-2' layout='vertical' onFinish={onFinish}>
                        <h3>Add New Bike</h3>
                        <br />
                        <Form.Item name="name" label="Bike name" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="image" label="Image url" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="rentPerHour" label="Rent per hour" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="capacity" label="Capacity" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="fuelType" label="Fuel type" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <div className='text-center'>
                        <button className='btn1'>Add Bike</button>
                        </div>
                    </Form>
                </Col>
            </Row>

        </DefaultLayout>
    )
}
