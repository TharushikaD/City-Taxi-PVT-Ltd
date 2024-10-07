import React, { useState } from 'react';
import { CCard, CCardBody, CCardHeader, CForm, CInputGroup, CButton, CRow, CCol } from '@coreui/react';
import '../../scss/formStyles.css';
import Layout from '../../components/layoutNav/Layout';
import { CFooter } from '@coreui/react';
import instance from '../../components/service/Service';

const Vehicles = () => {
    const [formData, setFormData] = useState({
        registrationNumber: '',
        make: '',
        model: '',
        licensePlateNumber: '',
        vehicleType: '',
        year: '',
        image1: '',
        image2: '',
    });

    // const handleChange = (e) => {
    //     const { name, value, files } = e.target;
    //     setFormData({
    //         ...formData,
    //         [name]: files ? files[0] : value,
    //     });
    // };

    useEffect(() => {
        const storedData = localStorage.getItem('vehicleData');
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            setFormData(prevState => ({
                ...prevState,
                registrationNumber: parsedData.getItem('registrationNumber') || '',
                make: parsedData.getItem('make') || '',
                model: parsedData.getItem('model') || '',
                year: parsedData.getItem('year') || '',
                licensePlateNumber: parsedData.getItem('licensePlateNumber') || '',
                vehicleType: parsedData.getItem('vehicleType') || '',
                image1: parsedData.getItem('image1') || '',
                image2: parsedData.getItem('image2') || '',
            }));
        }
    }, []);

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);


    const [userID, setUserId] = useState(localStorage.getItem('userId'));
    const token = localStorage.getItem('authToken');
    const selectedVehicle = localStorage.getItem('selectedVehicle');
    console.log(selectedVehicle)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateForm = () => {
        let formErrors = {};
        if (!formData.registrationNumber.trim()) {
            formErrors.registrationNumber = 'Registration number is required';
        } else if (!/^[A-Z0-9]{6,10}$/.test(formData.registrationNumber)) {
            formErrors.registrationNumber = 'Registration number should be 6-10 characters long and contain only uppercase letters and numbers';
        }
        if (!formData.make.trim()) {
            formErrors.make = 'make is required';
        } else if (formData.make.length < 2) {
            formErrors.make = 'make name must be at least 2 characters long';
        }
        if (!formData.model.trim()) {
            formErrors.model = 'Model is required';
        } else if (formData.model.length < 2) {
            formErrors.model = 'Model name must be at least 2 characters long';
        }
        if (!formData.year.trim()) {
            formErrors.year = 'Year is required';
        } else if (formData.year.length < 4) {
            formErrors.year = 'Give the valid year';
        }

        if (!formData.licensePlateNumber.trim()) {
            formErrors.licensePlateNumber = 'License plate number is required';
        } else if (!/^[A-Z0-9]{4,10}$/.test(formData.licensePlateNumber)) {
            formErrors.licensePlateNumber = 'License plate number should be 6-10 characters long and contain only uppercase letters and numbers';
        }
        if (!formData.vehicleType) {
            formErrors.vehicleType = 'Vehicle type is required';
        }
        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await instance.post(`/vehicles/all?userId=${userID}`, vehicleData, {
            headers: {
                Authorization: `Bearer ${token}`,
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
                const response = await instance.post(`/vehicles/create?userId=${userID}`, vehicleData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
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
            registrationNumber: '',
            make: '',
            model: '',
            year: '',
            licensePlateNumber: '',
            vehicleType: '',
            image1: '',
            image2: '',
        });
        setErrors({});
    };

    return (
        <>
            <CCard className="form-container">
                {/* <CCardHeader className="form-header" style={{background:'linear-gradient(135deg, #FFD700, #322e2e)'}}>
                    <h3 className='text-white'>Register Vehicle</h3>
                </CCardHeader> */}
                <CCardBody className="form-body">
                    <CForm onSubmit={handleSubmit}>
                        <CRow>
                            <CCol md="6">
                                <CInputGroup className="input-group mb-3">
                                    <label htmlFor="registrationNumber" className="form-label">Registration Number</label>
                                    <input
                                        type="text"
                                        id="registrationNumber"
                                        name="registrationNumber"
                                        className="form-control"
                                        placeholder="Enter registration number"
                                        value={formData.registrationNumber}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors.registrationNumber && <span className="error-message">{errors.registrationNumber}</span>}
                                </CInputGroup>

                                <CInputGroup className="input-group mb-3">
                                    <label htmlFor="make" className="form-label">make</label>
                                    <input
                                        type="text"
                                        id="make"
                                        name="make"
                                        className="form-control"
                                        placeholder="Enter make name"
                                        value={formData.make}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors.make && <span className="error-message">{errors.make}</span>}
                                </CInputGroup>

                                <CInputGroup className="input-group mb-3">
                                    <label htmlFor="model" className="form-label">Model</label>
                                    <input
                                        type="text"
                                        id="model"
                                        name="model"
                                        className="form-control"
                                        placeholder="Enter vehicle model"
                                        value={formData.model}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors.model && <span className="error-message">{errors.model}</span>}
                                </CInputGroup>
                                <CInputGroup className="input-group mb-3">
                                    <label htmlFor="year" className="form-label">Year</label>
                                    <input
                                        type="number"
                                        id="year"
                                        name="year"
                                        className="form-control"
                                        placeholder="Enter year"
                                        value={formData.year}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors.year && <span className="error-message">{errors.year}</span>}
                                </CInputGroup>

                                <CInputGroup className="input-group mb-3">
                                    <label htmlFor="licensePlateNumber" className="form-label">License Plate</label>
                                    <input
                                        type="text"
                                        id="licensePlateNumber"
                                        name="licensePlateNumber"
                                        className="form-control"
                                        placeholder="Enter license plate"
                                        value={formData.licensePlateNumber}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors.licensePlateNumber && <span className="error-message">{errors.licensePlateNumber}</span>}
                                </CInputGroup>

                                <CInputGroup className="input-group mb-3">
                                    <label htmlFor="vehicleType" className="form-label">Vehicle Type</label>
                                    <select
                                        id="vehicleType"
                                        name="vehicleType"
                                        className="form-control"
                                        value={formData.vehicleType}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select vehicle type</option>
                                        <option value="Bike">Bike</option>
                                        <option value="Three Wheel">Three Wheel</option>
                                        <option value="Car">Car</option>
                                    </select>
                                    {errors.vehicleType && <span className="error-message">{errors.vehicleType}</span>}
                                </CInputGroup>
                            </CCol>

                            <CCol md="6">
                                <CInputGroup className="input-group mb-3">
                                    <label htmlFor="image1" className="form-label">Front Image</label>
                                    <input
                                        // type="file"
                                        id="image1"
                                        name="image1"
                                        className="form-control"
                                        onChange={handleChange}
                                        readOnly
                                    />
                                </CInputGroup>
                                <CInputGroup className="input-group mb-3">
                                    <label htmlFor="image2" className="form-label">Back Image</label>
                                    <input
                                        // type="file"
                                        id="image2"
                                        name="image2"
                                        className="form-control"
                                        onChange={handleChange}
                                        readOnly
                                    />
                                </CInputGroup>
                                <div className="form-buttons" style={{ display: 'flex', gap: '15px', marginTop: '3.5rem' }}>
                                    <CButton type="submit" color="primary" className="btn-submit">
                                        Submit
                                    </CButton>
                                    <CButton type="button" color="secondary" className="btn-clear" onClick={handleClear}>
                                        Clear
                                    </CButton>
                                </div>
                            </CCol>
                        </CRow>
                    </CForm>
                </CCardBody>
            </CCard>
        </>
    );
};

export default Vehicles;