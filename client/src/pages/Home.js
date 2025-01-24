import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import DefaultLayout from '../components/DefaultLayout'
import { getAllBikes } from '../redux/actions/bikeAction'
import { Col, Row, DatePicker } from 'antd'
import { Link } from 'react-router-dom'
import Spinner from '../components/Spinner';
import moment from 'moment'
const { RangePicker } = DatePicker
function Home() {
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


    function setFilter(values) {
        if (!values || values.length === 0) {
            setTotalbikes(bikes); // Reset the filter if no dates are selected
            return;
        }
    
        const selectedFrom = moment(values[0], 'MMM DD YYYY HH:mm');
        const selectedTo = moment(values[1], 'MMM DD YYYY HH:mm');
    
        const temp = bikes.filter(bike => {
            // If the bike has no bookings, include it
            if (bike.bookedTimeSlots.length === 0) {
                return true;
            }
    
            // Check for any overlap in bookings
            const hasOverlap = bike.bookedTimeSlots.some(booking => {
                const bookingFrom = moment(booking.from, 'MMM DD YYYY HH:mm');
                const bookingTo = moment(booking.to, 'MMM DD YYYY HH:mm');
    
                // Overlap condition
                return !(
                    selectedTo.isSameOrBefore(bookingFrom) || // Selected range ends before booking starts
                    selectedFrom.isSameOrAfter(bookingTo)    // Selected range starts after booking ends
                );
            });
    
            // Include the bike only if there is no overlap
            return !hasOverlap;
        });
    
        setTotalbikes(temp); // Update the filtered bike list
    }
    
    
    return (
        <DefaultLayout>

            <Row className='mt-3' justify='center'>

                <Col lg={20} sm={24} className='d-flex justify-content-left'>

                    <RangePicker showTime={{ format: 'HH:mm' }} format='MMM DD YYYY HH:mm' onChange={setFilter} />

                </Col>

            </Row>

            {loading == true && (<Spinner />)}



            <Row justify='center' gutter={16}>

                {totalBikes.map(bike => {
                    return  <Col lg={7} sm={24} xs={24}>
                    <div className="bike-card p-2 bs1">
                       <img src={bike.image} className="bikeimg"/>

                       <div className="bike-content d-flex align-items-center justify-content-between">

                            <div className='text-left pl-2'>
                                <p>{bike.name}</p>
                                <p> Rent Per Hour {bike.rentPerHour} /-</p>
                            </div>

                            <div>
                                <button className="btn1 mr-2"><Link to={`/booking/${bike._id}`}>Book Now</Link></button>
                            </div>

                       </div>
                    </div>
               </Col>
                })}

           </Row>

        </DefaultLayout >
    )
}

export default Home