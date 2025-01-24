import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import DefaultLayout from '../components/DefaultLayout'
import { getAllBikes,deleteBike } from '../redux/actions/bikeAction'
import { Col, Row } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { Button, message, Popconfirm } from 'antd';

function AdminHome() {
    const { bikes } = useSelector(state => state.bikeReducer)
    const { loading } = useSelector(state => state.alertReducer)
    const [totalBikes, setTotalbikes] = useState([])
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getAllBikes())
    }, [])

    useEffect(() => {

        setTotalbikes(bikes)

    }, [bikes])

    const handleDelete = (bikeid) => {
        console.log(bikeid);
        dispatch(deleteBike({ _id:bikeid }));
    };

    return (
        <DefaultLayout>
            <Row justify="center" gutter={16} className="mt-2">
                <Col lg={20} sm={24}>
                    <div className="d-flex justify-content-between align-items-center">
                        <h3 className="mt-1 mr-2">Admin Panel</h3>
                        <button className="btn1">
                            <a href="/addbike">ADD BIKE</a>
                        </button>
                    </div>
                </Col>
            </Row>

            {loading == true && (<Spinner />)}

            <Row justify='center' gutter={16}>

                {totalBikes.map(bike => {
                    return <Col key={bike._id} lg={7} sm={24} xs={24}>
                        <div className="bike-card p-2 bs1">
                            <img src={bike.image} className="bikeimg" />

                            <div className="bike-content d-flex align-items-center justify-content-between">

                                <div className='text-left pl-2'>
                                    <p>{bike.name}</p>
                                    <p> Rent Per Hour {bike.rentPerHour} /-</p>
                                </div>

                                <div className='mr-4'>
                                    <Link to={`/editbike/${bike._id}`}> <EditOutlined className='mr-3' style={{ color: 'green' }} /></Link>
                                    <Popconfirm
                                        title="Delete the bike"
                                        description="Are you sure to delete this bike?"
                                        onConfirm={() => handleDelete(bike._id)}
                                        okText="Yes"
                                        cancelText="No"
                                    >     
                                    <DeleteOutlined style={{ color: 'red' }} />
                                    </Popconfirm>
                                </div>

                            </div>
                        </div>
                    </Col>
                })}

            </Row>

        </DefaultLayout>
    )
}

export default AdminHome