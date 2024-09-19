import React, { useState } from 'react';
import { CCard, CCardBody, CCardHeader, CForm, CInputGroup, CButton, CRow, CCol, CCarousel, CCarouselItem, CImage} from '@coreui/react';
import '../../scss/formStyles.css';


const Vehicles = () => {
    const [formData, setFormData] = useState({
        manufacturer: '',
        model: '',
        licensePlate: '',
        vehicleType: '',
        image1: null,
        image2: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
    };

    const handleClear = () => {
        setFormData({
            manufacturer: '',
            model: '',
            licensePlate: '',
            vehicleType: '',
            image1: null,
            image2: null,
        });
    };

    return (
        <>
            <CCarousel>
                <CCarouselItem>
                    <CImage className="d-block w-100" src="src/assets/resources/driver.png" alt="slide 1" style={{ height: '580px' }} />
                </CCarouselItem>
            </CCarousel>

            <CCard className="form-container">
                <CCardHeader className="form-header">
                    <h3>Sign Up to Drive </h3>
                </CCardHeader>
                <CCardBody className="form-body">
                    <CForm onSubmit={handleSubmit}>
                        <CRow>
                            <CCol md="6">
                                <CInputGroup className="input-group mb-3">
                                    <label htmlFor="manufacturer" className="form-label">Manufacturer</label>
                                    <input
                                        type="text"
                                        id="manufacturer"
                                        name="manufacturer"
                                        className="form-control"
                                        placeholder="Enter manufacturer name"
                                        value={formData.manufacturer}
                                        onChange={handleChange}
                                        required
                                    />
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
                                </CInputGroup>
                                <CInputGroup className="input-group mb-3">
                                    <label htmlFor="licensePlate" className="form-label">License Plate</label>
                                    <input
                                        type="text"
                                        id="licensePlate"
                                        name="licensePlate"
                                        className="form-control"
                                        placeholder="Enter license plate"
                                        value={formData.licensePlate}
                                        onChange={handleChange}
                                        required
                                    />
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
                                        <option value="Car1">Car1</option>
                                        <option value="Car2">Car2</option>
                                        <option value="Car3">Car3</option>
                                    </select>
                                </CInputGroup>
                            </CCol>

                            <CCol md="6">
                                <CInputGroup className="input-group mb-3">
                                    <label htmlFor="image1" className="form-label">Front Image</label>
                                    <input
                                        type="file"
                                        id="image1"
                                        name="image1"
                                        className="form-control"
                                        onChange={handleChange}
                                        required
                                    />
                                </CInputGroup>
                                <CInputGroup className="input-group mb-3">
                                    <label htmlFor="image2" className="form-label">Back Image</label>
                                    <input
                                        type="file"
                                        id="image2"
                                        name="image2"
                                        className="form-control"
                                        onChange={handleChange}
                                        required
                                    />
                                </CInputGroup>
                            </CCol>
                        </CRow>

                        <div className="form-buttons" style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '1.5rem' }}>
                            <CButton type="submit" color="primary" className="btn-submit">
                                Submit
                            </CButton>
                            <CButton type="button" color="secondary" className="btn-clear" onClick={handleClear}>
                                Clear
                            </CButton>
                        </div>
                    </CForm>
                </CCardBody>
            </CCard>
            <div class="opportunity-container">
                <div class="opportunity-section">
                    <h3 style={{ margin: '20px', color: '#e0b506' }}>Opportunities are Endless with City Taxis</h3>
                    <ul>
                        <li>If you own Car, We got rides for you! Join the largest network in the country & make driving fun while you earn over 100,000 Rupees per month</li>
                        <li>Enjoy a Monthly Income of 100,000 Rupees & upwards</li>
                        <li>Get a Life Insurance Cover of 3,000,000 Rupees</li>
                        <li>Earn weekly and daily incentives</li>
                        <li>Pay Lesser Commission while receiving Higher Earnings</li>
                        <li>Immediate Earnings regardless of payment methods</li>
                    </ul>
                </div>
            </div>




        </>

    );
};

export default Vehicles;
