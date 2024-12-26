import React from 'react'
import Chart from 'react-apexcharts'

const NewContacts = () => {
  const options = {
    chart: {
      id: 'daily-orders'
    },
    xaxis: {
      categories: ['2022-01-01', '2022-01-02', '2022-01-03', '2022-01-04', '2022-01-05']
    }
  }
  const series = [{
    name: 'orders',
    data: [10, 20, 30, 40, 50]
  }]

  return (
    <div>
      <Chart
        options={options}
        series={series}
        type="line"
        width="100%"
      />
    </div>
  )
}

export default NewContacts
