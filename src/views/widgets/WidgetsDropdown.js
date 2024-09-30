import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import {
  CRow,
  CCol,
  CWidgetStatsA,
} from '@coreui/react'
import { getStyle } from '@coreui/utils'
import { CChartLine, CChartBar } from '@coreui/react-chartjs'
import instance from '../../components/service/Service'

const WidgetsDropdown = (props) => {
  const widgetChartRef1 = useRef(null)
  const widgetChartRef2 = useRef(null)

  const [customerCount, setCustomerCount] = useState(0)
  const [driverCount, setDriverCount] = useState(0)
  const [vehicleCount, setVehicleCount] = useState(0)

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const customerResponse = await instance.get('/users/all?userType=Customer')
        setCustomerCount(customerResponse.data.length)

        const driverResponse = await instance.get('/users/all?userType=Driver')
        setDriverCount(driverResponse.data.length)

        const vehicleResponse = await instance.get('/vehicles/all')
        setVehicleCount(vehicleResponse.data.length)
      } catch (err) {
        console.error('Error fetching counts:', err)
      }
    }

    fetchCounts()

    document.documentElement.addEventListener('ColorSchemeChange', () => {
      if (widgetChartRef1.current) {
        setTimeout(() => {
          widgetChartRef1.current.data.datasets[0].pointBackgroundColor = getStyle('--cui-primary')
          widgetChartRef1.current.update()
        })
      }

      if (widgetChartRef2.current) {
        setTimeout(() => {
          widgetChartRef2.current.data.datasets[0].pointBackgroundColor = getStyle('--cui-info')
          widgetChartRef2.current.update()
        })
      }
    })
  }, [widgetChartRef1, widgetChartRef2])

  return (
    <CRow className={`justify-content-center ${props.className}`} xs={{ gutter: 4 }} style={{ color: 'white' }}>
      <CCol sm={12} md={6} xl={4} className="mb-3">
        <CWidgetStatsA
          color="primary"
          // value={`${customerCount} Customers`}
          value = {"40 Customers"}
          title="Customers"
          chart={
            <CChartLine
              ref={widgetChartRef1}
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              data={{
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                  {
                    label: 'Dataset',
                    backgroundColor: 'transparent',
                    borderColor: 'rgba(255,255,255,.55)',
                    pointBackgroundColor: getStyle('--cui-primary'),
                    data: [65, 59, 84, 84, 51, 55, 40],
                  },
                ],
              }}
              options={{
                plugins: { legend: { display: false } },
                maintainAspectRatio: false,
                scales: {
                  x: { display: false },
                  y: { display: false },
                },
                elements: {
                  line: { borderWidth: 1 },
                  point: { radius: 4 },
                },
              }}
            />
          }
        />
      </CCol>

      <CCol sm={12} md={6} xl={4} className="mb-3">
        <CWidgetStatsA
          color="info"
          // value={`${driverCount} Drivers`}
          value = {"25 Drivers"}
          title="Drivers"
          chart={
            <CChartLine
              ref={widgetChartRef2}
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              data={{
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                  {
                    label: 'Dataset',
                    backgroundColor: 'transparent',
                    borderColor: 'rgba(255,255,255,.55)',
                    pointBackgroundColor: getStyle('--cui-info'),
                    data: [1, 18, 9, 17, 34, 22, 11],
                  },
                ],
              }}
              options={{
                plugins: { legend: { display: false } },
                maintainAspectRatio: false,
                scales: {
                  x: { display: false },
                  y: { display: false },
                },
                elements: { line: { borderWidth: 1 }, point: { radius: 4 } },
              }}
            />
          }
        />
      </CCol>

      <CCol sm={12} md={6} xl={4} className="mb-3">
        <CWidgetStatsA
          color="warning"
          // value={`${vehicleCount} Vehicles`}
          value = {"30 Vehicles"}
          title="Vehicles"
          chart={
            <CChartBar
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              data={{
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                  {
                    label: 'Dataset',
                    backgroundColor: 'rgba(255,255,255,.2)',
                    borderColor: 'rgba(255,255,255,.55)',
                    data: [78, 81, 80, 45, 34, 12, 40],
                    barPercentage: 0.6,
                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                  x: { display: false },
                  y: { display: false },
                },
              }}
            />
          }
        />
      </CCol>
    </CRow>
  )
}

WidgetsDropdown.propTypes = {
  className: PropTypes.string,
  withCharts: PropTypes.bool,
}

export default WidgetsDropdown
