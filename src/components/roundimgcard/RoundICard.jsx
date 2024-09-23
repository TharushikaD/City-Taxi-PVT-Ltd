import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

export default function RoundICard({ src, title, description }) {
    return (
        <Container className="text-center py-4">
            <Row className="justify-content-center">
                <Col xl={10} lg={8} md={10} sm={12} xs={12}>
                    <div className='round-icard'>
                        <Image src={src} roundedCircle fluid className='round-image mb-3' />
                        <h4 className="mt-2">{title}</h4>
                        <h6 className="text-muted">{description}</h6>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
