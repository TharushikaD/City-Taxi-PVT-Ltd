import React, { useEffect, useState } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CInputGroup,
  CButton,
  CRow,
  CCol
} from '@coreui/react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet/dist/leaflet.css';
import AppFooter from '../../components/AppFooter';
import AppHeader from '../../components/AppHeader';
import AppSidebar from '../../components/AppSidebar';
import '../../scss/formStyles.css';
import RoutingMachine from '../routeMachine/RoutingMachine';
import instance from '../../components/service/Service';
import Alert from '../../components/alert/Alert';


// Leaflet icon fix
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const Trip = () => {
  const [pickupCoords, setpickupCoords] = useState(null);
  const [destinationCoords, setdestinationCoords] = useState(null);
  const [clickCount, setClickCount] = useState(0);
  const [pickupLocationName, setPickupLocationName] = useState(''); // State for pickup location name
  const [destinationLocationName, setDestinationLocationName] = useState(''); // State for destination location name
  const [distance, setDistance] = useState(0); // State to hold distance
  const [fare, setFare] = useState(0); // State to hold the fare


  const [formData, setFormData] = useState({
    driverId: '',
    startLatitude: '',
    startLongitude: '',
    endLatitude: '',
    endLongitude: '',
    bookingTime: '',
    startTime: '',
    endTime: '',
    passengerId: localStorage.getItem('userId'),
    destination: '',
    fare: ''
  });

  // Calculate distance whenever pickup or destination coords change
  useEffect(() => {
    if (pickupCoords && destinationCoords) {
      const pickupLatLng = L.latLng(pickupCoords.lat, pickupCoords.lng);
      const dropoffLatLng = L.latLng(destinationCoords.lat, destinationCoords.lng);
      const calculatedDistance = pickupLatLng.distanceTo(dropoffLatLng); // Distance in meters
      setDistance(calculatedDistance.toFixed(2)); // Round to 2 decimal places
      const totalFare = ((calculatedDistance / 1000) * 200).toFixed(2); // Calculate fare as ₹200 per km
      setFare(totalFare); // Store the calculated fare
      formData.fare = totalFare;

    }
  }, [pickupCoords, destinationCoords]);


  const LocationSelector = () => {
    useMapEvents({
      click: async (e) => {
        const { lat, lng } = e.latlng; // Define lat and lng here
        if (clickCount === 0) {
          setpickupCoords(e.latlng);
          formData.pickupLocation = e.latlng;

          setFormData(prev => ({
            ...prev,
            pickupLocation: { lat, lng },
            startLatitude: lat,
            startLongitude: lng,

          }));
          // Fetch pickup location name
          const locationName = await fetchLocationName(lat, lng);
          setPickupLocationName(locationName); // Set the fetched pickup location name
          console.log(locationName)

          setClickCount(1);
        } else if (clickCount === 1) {
          setdestinationCoords(e.latlng); // Second click for dropoff location
          formData.destination = e.latlng;
          setFormData(prev => ({
            ...prev,
            destination: { lat, lng },
            endLatitude: lat,
            endLongitude: lng,

          }));
          // Fetch destination location name
          const locationName = await fetchLocationName(lat, lng);
          setDestinationLocationName(locationName); // Set the fetched destination location name
          console.log(locationName)
          setClickCount(0);
        }
      },
    });
    console.log('pickupCoords', pickupCoords)

    return null;
  };

  const fetchLocationName = async (lat, lng) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`);
      const data = await response.json();
      return data.display_name; // This contains the location name
    } catch (error) {
      console.error("Error fetching location name:", error);
      return null;
    }
  };

  const clearSelection = () => {
    setClickCount(0);
    setpickupCoords(null);
    setdestinationCoords(null);
  };

  const drivers = [
    { id: 1, name: 'Harendra P' },
    { id: 2, name: 'Sasindu Kumara' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    Alert({
      title: 'Processing Trip',
      message: 'Trip request processed.',
      icon: 'info',
      allowOutsideClick: false,
      showConfirmButton: false,
      timer: 3000,
    });
    const response = await instance.post('/vehicles/all?userId=${userID}', vehicleData, {
      headers: {
        Authorization: 'Bearer ${token}',
      },
    });

    if (validateForm()) {
      setLoading(true);

      const vehicleData = {
        registrationNumber: formData.registrationNumber,
        make: formData.make,
        model: formData.model,
        year: formData.year,
        licensePlateNumber: formData.licensePlateNumber,
        vehicleType: formData.vehicleType,
        image1: "C:/Users/94752/Downloads/ai-generated-8045101_1280.webp",
        image2: "C:/Users/94752/Downloads/ai-generated-8045101_1280.webp",
        userID: userID
      };

      console.log('User ID:', userID);
      console.log('Vehicle Data:', vehicleData);

      try {
        const response = await instance.post('/vehicles/create?userId=${userID}', vehicleData, {
          headers: {
            Authorization: 'Bearer ${token}',
          },
        });
        console.log('Vehicle created:', response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error creating vehicle:', error);
        setLoading(false);
      }
    }
  };


  const handleClear = () => {
    setFormData({
      pickupLocation: { lat: 7.8731, lng: 80.7718 },
      destination: { lat: 0, lng: 0 },
      startLatitude: '',
      startLongitude: '',
      destinationLatitude: '',
      destinationLongitude: '',
      scheduledTime: '',
      selectedDriver: ''
    });
  };

  // const pickupCoords = [formData.pickupLocation.lat, formData.pickupLocation.lng];
  // const destinationCoords = [formData.destination.lat, formData.destination.lng];

  return (
    <div className="app-container">
      <AppHeader />
      <div className="main-content">
        <AppSidebar className="app-sidebar" />
        <div className="content-wrap">
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '60px', width: '100%' }}>
            <div style={{ width: '50%', height: '450px', display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
              {/* <MapContainer
                center={pickupCoords}
                zoom={12} 
                style={{ minHeight: '450px', width: '90%', border: '1px solid #ccc' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={pickupCoords}>
                  <Popup>Pickup Location</Popup>
                </Marker>
                <Marker position={destinationCoords}>
                  <Popup>Destination</Popup>
                </Marker>
                <RoutingMachine
                pickupCoords={pickupCoords}
                destinationCoords={destinationCoords}
              />
              </MapContainer> */}
              <MapContainer
                center={[7.8731, 80.7718]} // Sri Lanka coordinates
                zoom={8}
                style={{ height: "400px", width: "100%" }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                {pickupCoords && <Marker position={pickupCoords} />}
                {destinationCoords && <Marker position={destinationCoords} />}

                <LocationSelector />
                <RoutingMachine
                  pickupCoords={pickupCoords}
                  destinationCoords={destinationCoords}
                />
              </MapContainer>
            </div>
            <div style={{ width: '50%', padding: '0 15px' }}>
              <CCard className="form-container" style={{ width: '100%' }}>
                <CCardHeader className="form-header" style={{ background: 'linear-gradient(135deg, #FFD700, #322e2e)' }}>
                  <h3 className="text-white">Book Your Trip</h3>
                </CCardHeader>
                <CCardBody className="form-body">
                  <CForm onSubmit={handleSubmit}>
                    <CRow>
                      <CCol md="6">
                        <CInputGroup className="input-group mb-3">
                          <label htmlFor="pickupLocationName" className="form-label">Pickup Location Name</label>
                          <input
                            type="text"
                            id="pickupLocationName"
                            name="pickupLocationName"
                            className="form-control"
                            value={pickupLocationName}
                            readOnly
                          />
                        </CInputGroup>
                        <CInputGroup className="input-group mb-3">
                          <label htmlFor="startLatitude" className="form-label">Start Latitude</label>
                          <input
                            type="number"
                            id="startLatitude"
                            name="startLatitude"
                            className="form-control"
                            placeholder="Enter Start Latitude"
                            value={formData.startLatitude}
                            required
                          />
                        </CInputGroup>

                        <CInputGroup className="input-group mb-3">
                          <label htmlFor="startLongitude" className="form-label">Start Longitude</label>
                          <input
                            type="number"
                            id="startLongitude"
                            name="startLongitude"
                            className="form-control"
                            placeholder="Enter Start Longitude"
                            value={formData.startLongitude}
                            required
                          />
                        </CInputGroup>
                        <CInputGroup className="input-group mb-3">
                          <label htmlFor="fare" className="form-label">Fee</label>
                          <input
                            type="number"
                            id="fare"
                            name="fare"
                            className="form-control"
                            value={fare}
                            readOnly
                          />
                        </CInputGroup>
                      </CCol>

                      <CCol md="6">
                        <CInputGroup className="input-group mb-3">
                          <label htmlFor="destinationLocationName" className="form-label">Destination Location Name</label>
                          <input
                            type="text"
                            id="destinationLocationName"
                            name="destinationLocationName"
                            className="form-control"
                            value={destinationLocationName}
                            readOnly
                          />
                        </CInputGroup>
                        <CInputGroup className="input-group mb-3">
                          <label htmlFor="endLatitude" className="form-label">Destination Latitude</label>
                          <input
                            type="number"
                            id="endLatitude"
                            name="endLatitude"
                            className="form-control"
                            placeholder="Enter Destination Latitude"
                            value={formData.endLatitude}
                            required
                          />
                        </CInputGroup>
                        <CInputGroup className="input-group mb-3">
                          <label htmlFor="endLongitude" className="form-label">Destination Longitude</label>
                          <input
                            type="number"
                            id="endLongitude"
                            name="endLongitude"
                            className="form-control"
                            placeholder="Enter Destination Longitude"
                            value={formData.endLongitude}
                            required
                          />
                        </CInputGroup>
                        <CInputGroup className="input-group mb-3">
                          <label htmlFor="selectedDriver" className="form-label">Select Driver</label>
                          <select
                            id="selectedDriver"
                            name="selectedDriver"
                            className="form-select"
                            onChange={handleChange}
                            required
                            style={{ width: '100%' }}
                          >
                            <option value="">Select a driver</option>
                            {drivers.map(driver => (
                              <option key={driver.id} value={driver.id}>{driver.name}</option>
                            ))}
                          </select>
                        </CInputGroup>
                      </CCol>
                    </CRow>
                    <div style={{ display: 'flex', justifyContent: 'right', gap: '10px' }}>
                      <CButton className='btn-submit' type="submit">Book Trip</CButton>
                      <CButton className='btn-clear' type="button" onClick={handleClear}>Clear</CButton>
                    </div>
                  </CForm>
                </CCardBody>
              </CCard>
            </div>
          </div>
        </div>
      </div>
      <AppFooter />
    </div>
  );
};

export default Trip;