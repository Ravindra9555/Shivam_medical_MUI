import { orange } from '@mui/material/colors'
import React from 'react'
import Chart from 'react-apexcharts'

const NewContacts = ({data}) => {

    const date = data?.map((item) => item._id)
    const count = data?.map((item) => item.count);

  const options = {
    chart: {
      id: 'daily-orders'
    },
    xaxis: {
      categories: date
    }
  }
  const series = [{
    name: 'orders',
    data: count
  }]

  return (
    <div>
      <Chart
        style={{backgroundColor:orange[50]}}
        options={options}
        series={series}
        type="line"
        width="100%"
      />
    </div>
  )
}

export default NewContacts
