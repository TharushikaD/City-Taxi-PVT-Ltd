import {
    CAvatar,
    CButton,
    CButtonGroup,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CDropdownMenu,
    CDropdownItem,
    CCol,
    CRow,
    CDropdown,
    CFormLabel,
    CFormInput,
    CDropdownToggle,
    CForm,
    CInputGroup
} from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet/dist/leaflet.css';
import '../../scss/operatorDash.css';
import RoutingMachine from '../routeMachine/RoutingMachine';
import instance from '../../components/service/Service';

// Leaflet icon fix
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const getFormattedDateRange = () => {
    const today = new Date();
    const startMonth = 'January';
    const endMonth = today.toLocaleString('default', { month: 'long' });
    const year = today.getFullYear();
    return `${startMonth} - ${endMonth} ${year}`;
};

const OperatorDashboard = () => {
    const [pickupCoords, setPickupCoords] = useState(null);
    const [destinationCoords, setDestinationCoords] = useState(null);
    const [clickCount, setClickCount] = useState(0);
    const [distance, setDistance] = useState(0);
    const [fare, setFare] = useState(0);

    const [formData, setFormData] = useState({
        driverId: '',
        startLatitude: '',
        startLongitude: '',
        destinationLatitude: '',
        destinationLongitude: '',
        bookingTime: '',
        startTime: '',
        endTime: '',
        destination: '',
        fare: '',
        customerName: '',
        customerContact: '',
        customerEmail: '',
    });

    useEffect(() => {
        if (pickupCoords && destinationCoords) {
            const pickupLatLng = L.latLng(pickupCoords.lat, pickupCoords.lng);
            const dropoffLatLng = L.latLng(destinationCoords.lat, destinationCoords.lng);
            const calculatedDistance = pickupLatLng.distanceTo(dropoffLatLng);
            setDistance(calculatedDistance.toFixed(2));
            const totalFare = ((calculatedDistance / 1000) * 200).toFixed(2);
            setFare(totalFare);
            setFormData(prev => ({ ...prev, fare: totalFare }));
        }
    }, [pickupCoords, destinationCoords]);

    const LocationSelector = () => {
        useMapEvents({
            click: (e) => {
                const { lat, lng } = e.latlng;
                if (clickCount === 0) {
                    setPickupCoords(e.latlng);
                    setFormData(prev => ({
                        ...prev,
                        startLatitude: lat,
                        startLongitude: lng,
                    }));
                    setClickCount(1);
                } else {
                    setDestinationCoords(e.latlng);
                    setFormData(prev => ({
                        ...prev,
                        destinationLatitude: lat, 
                        destinationLongitude: lng, 
                    }));
                    setClickCount(0);
                }
            },
        });
        return null;
    };

    const handleClear = () => {
        setFormData({
            driverId: '',
            startLatitude: '',
            startLongitude: '',
            destinationLatitude: '',
            destinationLongitude: '',
            bookingTime: '',
            startTime: '',
            endTime: '',
            destination: '',
            fare: '',
            customerName: '',
            customerContact: '',
            customerEmail: '',
        });
        setClickCount(0);
        setPickupCoords(null);
        setDestinationCoords(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await instance.post(formData);


            if (response.status === 200) {

                alert('Trip booked successfully!');
                handleClear();
            }
        } catch (error) {
            console.error('Error while booking the trip:', error);
            alert('Failed to book the trip. Please try again.');
        }
    };

    const drivers = [
        { id: 1, name: 'Harendra P' },
        { id: 2, name: 'Sasindu Kumara' },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <CCard className="mode-card mb-4">
            <CCardHeader className="mode-card-header">
                <h4>Book a Trip</h4>
                <div className="small text-muted">{getFormattedDateRange()}</div>
            </CCardHeader>
            <CCardBody>
                <CRow>
                    <CCol md={6}>
                        <MapContainer center={[7.8731, 80.7718]} zoom={8} style={{ height: '400px', width: '100%', marginTop: '50px' }}>
                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                            {pickupCoords && <Marker position={pickupCoords} />}
                            {destinationCoords && <Marker position={destinationCoords} />}
                            <LocationSelector />
                            <RoutingMachine pickupCoords={pickupCoords} destinationCoords={destinationCoords} />
                        </MapContainer>
                    </CCol>
                    <CCol md={6}>
                        <CForm onSubmit={handleSubmit} className="form">
                            <CRow className="form-row">
                                <h6
                                    className='mb-2 mt-3 '

                                >Passenger Information</h6>
                                <CCol md={6}>
                                    <CFormLabel htmlFor="customerName">Name</CFormLabel>
                                    <CInputGroup>
                                        <CFormInput
                                            name="customerName"
                                            id="customerName"
                                            placeholder="Enter Passenger Name"
                                            className='mb-3'
                                            value={formData.customerName}
                                            onChange={handleChange}
                                        />
                                    </CInputGroup>
                                </CCol>
                                <CCol md={6}>
                                    <CFormLabel htmlFor="customerContact">Contact Number</CFormLabel>
                                    <CInputGroup>
                                        <CFormInput
                                            name="customerContact"
                                            id="customerContact"
                                            placeholder="Enter Contact Number"
                                            className='mb-3'
                                            value={formData.customerContact}
                                            onChange={handleChange}
                                        />
                                    </CInputGroup>
                                </CCol>
                            </CRow>

                            <CRow className="form-row">
                                <CCol md={12}>
                                    <CFormLabel htmlFor="customerEmail">Email</CFormLabel>
                                    <CInputGroup>
                                        <CFormInput
                                            name="customerEmail"
                                            id="customerEmail"
                                            placeholder="Enter Passenger Email"
                                            className='mb-3'
                                            value={formData.customerEmail}
                                            onChange={handleChange}
                                        />
                                    </CInputGroup>
                                </CCol>
                            </CRow>

                            <CRow className="form-row">
                                <h6
                                    className='mb-2 mt-3'

                                >Ride Information</h6>
                                <CCol md={6}>
                                    <CFormLabel htmlFor="startLat">Start Latitude</CFormLabel>
                                    <CInputGroup>
                                        <CFormInput
                                            className='mb-3'
                                            name="startLatitude"
                                            id="startLat"
                                            placeholder="Enter Start Latitude"
                                            value={formData.startLatitude}
                                            onChange={handleChange}
                                        />
                                    </CInputGroup>
                                </CCol>
                                <CCol md={6}>
                                    <CFormLabel htmlFor="startLon">Start Longitude</CFormLabel>
                                    <CInputGroup>
                                        <CFormInput
                                            className='mb-3'
                                            name="startLongitude"
                                            id="startLongitude"
                                            placeholder="Enter Start Longitude"
                                            value={formData.startLongitude}
                                            onChange={handleChange}
                                        />
                                    </CInputGroup>
                                </CCol>
                            </CRow>

                            <CRow className="form-row">
                                <CCol md={6}>
                                    <CFormLabel htmlFor="destinationLatitude">Destination Latitude</CFormLabel>
                                    <CInputGroup>
                                        <CFormInput
                                            className='mb-3'
                                            name="destinationLatitude"
                                            id="destinationLatitude"
                                            placeholder="Enter Destination Latitude"
                                            value={formData.destinationLatitude}
                                            onChange={handleChange}
                                        />
                                    </CInputGroup>
                                </CCol>
                                <CCol md={6}>
                                    <CFormLabel htmlFor="destinationLongitude">Destination Longitude</CFormLabel>
                                    <CInputGroup>
                                        <CFormInput
                                            className='mb-3'
                                            name="destinationLongitude"
                                            id="destinationLongitude"
                                            placeholder="Enter Destination Longitude"
                                            value={formData.destinationLongitude}
                                            onChange={handleChange}
                                        />
                                    </CInputGroup>
                                </CCol>
                            </CRow>

                            <CRow className="form-row">
                                <CCol md={6}>
                                    <CFormLabel htmlFor="fare">Fare</CFormLabel>
                                    <CInputGroup>
                                        <CFormInput
                                            className='mb-3'
                                            type="number"
                                            name="fare"
                                            id="fare"
                                            placeholder="Enter Fare"
                                            value={formData.fare}
                                            onChange={handleChange}
                                        />
                                    </CInputGroup>
                                </CCol>
                                <CCol md={6}>
                                    <CFormLabel htmlFor="selectedDriver">Select Driver</CFormLabel>
                                    <CInputGroup
                                        className='mb-3'
                                    >

                                        <select
                                            id="selectedDriver"
                                            name="selectedDriver"
                                            className="form-select"
                                            onChange={handleChange}
                                        >
                                            <option value="">Select Driver</option>
                                            {drivers.map((driver) => (
                                                <option key={driver.id} value={driver.id}>
                                                    {driver.name}
                                                </option>
                                            ))}
                                        </select>
                                    </CInputGroup>
                                </CCol>
                            </CRow>

                            <div className="mt-3 d-flex justify-content-end">
                                <CButton
                                    className='buttonO'
                                    onClick={handleClear}>
                                    Clear
                                </CButton>
                                <CButton
                                    className='buttonO'
                                    type="submit">
                                    Submit
                                </CButton>
                            </div>
                        </CForm>
                    </CCol>
                </CRow>
            </CCardBody>

            <CCardFooter>
                <div className="footer-text">Start Point and Destination can be selected on the map above</div>
            </CCardFooter>
        </CCard>
    );
};

export default OperatorDashboard;
