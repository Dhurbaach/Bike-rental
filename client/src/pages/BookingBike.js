import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import DefaultLayout from '../components/DefaultLayout';
import { getAllBikes } from '../redux/actions/bikeAction';
import Spinner from '../components/Spinner';
import { Row, Col, Divider, DatePicker, Modal } from 'antd';
import { bookBike } from '../redux/actions/bookingActions';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init();
const { RangePicker } = DatePicker;

const BookingBike = () => {
  const { bikeid } = useParams();
  const { bikes } = useSelector((state) => state.bikeReducer);
  const { loading } = useSelector((state) => state.alertReducer);
  const [bike, setBike] = useState(null);
  const dispatch = useDispatch();
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [totalhrs, setTotalhrs] = useState();
  const [totalcost, setTotalcost] = useState(0);
  const[showModal,setShowModal] = useState(false)

  useEffect(() => {
    if (bikes.length === 0) {
      console.log("Dispatching getAllBikes");
      dispatch(getAllBikes());
    } else {
      const foundBike = bikes.find((bike) => bike._id === bikeid);
      console.log("Found Bike:", foundBike);
      setBike(foundBike);
    }
  }, [bikes]);

  useEffect(() => {
    if (bike && totalhrs) {
      setTotalcost(totalhrs * bike.rentPerHour);
    }
  }, [totalhrs, bike]);

  function selectTimeSlots(values) {
    if (values && values.length === 2) {
      const [start, end] = values;
      setFrom(start.format("MMM DD YYYY HH:mm"));
      setTo(end.format("MMM DD YYYY HH:mm"));
      setTotalhrs(end.diff(start, "hours"));
    } else {
      setFrom(null);
      setTo(null);
      setTotalhrs(null);
    }
  }
  

  function bookNow() {
    console.log("Booking Details:", {
      from,
      to,
      totalhrs,
      totalcost,
    });
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("Please log in to book a bike.");
      return;
    }

    const reqobj = {
      user: user._id,
      bike: bike._id,
      totalhrs,
      totalcost,
      bookedTimeSlots: { from, to },
    };
    dispatch(bookBike(reqobj));
  }

  if (loading) return <Spinner />;

  if (!bike) {
    return (
      <DefaultLayout>
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h2>Bike not found</h2>
          <p>Please check the URL or try again later.</p>
        </div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <Row justify="center" className="d-flex align-items-center justify-content-center" style={{ minHeight: '90vh' }}>
        <Col lg={11} sm={24} xs={24}>
          <img src={bike.image} className="bikeimg2 bs1 w-100" data-aos='flip-left' data-aos-duration='1500' />
        </Col>
        <Col lg={11} sm={24} xs={24}>
          <Divider type="horizontal" dashed style={{color: 'black !important'}}>
            Bike Details
          </Divider>
          <div className="text-right">
            <p>{bike.name}</p>
            <p>Rent Per Hour:{bike.rentPerHour}</p>
            <p>Fuel Type: {bike.fuelType}</p>
            <p>Capacity: {bike.capacity}</p>
          </div>
          <Divider type="horizontal" dashed>
            Select Time Slots
          </Divider>
          <RangePicker
            showTime={{ format: 'HH:mm' }}
            format="MMM DD YYYY HH:mm"
            onChange={selectTimeSlots}
          />
          <br/>
          <button className='btn1 mt-2' onClick={()=>{setShowModal(true)}}>See Booked Slots</button>
          {from && to && (<div>
            <p>Total Hours: <b>{totalhrs || 0}</b></p>
            <h3>Total Cost: <b>{totalcost || 0}</b></h3>
            <button className="btn1" onClick={bookNow}>Book Now</button>
          </div>)}
        </Col>
      </Row>
      {bikes.length && (<Modal visible={showModal} closable={false} footer={false} title='Booked Time Slots'>
            {
              bikes.length && (<div className='p-2'>
                {
                  bike.bookedTimeSlots.map(slot=>{
                    return <button className='btn1 mt-2'>{slot.from} - {slot.to}</button>
                  })
                }
                <div className='text-right mt-5'>
                  <button className='btn1' onClick={()=>{setShowModal(false)}}>Close</button>
                </div>
              </div>)}
      </Modal>)}

    </DefaultLayout>
  );
};

export default BookingBike;
