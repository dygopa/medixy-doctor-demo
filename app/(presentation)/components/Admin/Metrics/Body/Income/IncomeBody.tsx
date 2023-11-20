import React from 'react'
import DistributionLastMonths from './Graphs/DistributionLastMonths'
import RevenueServices from './Graphs/RevenueServices'

function IncomeBody() {
  return (
    <div>
      <DistributionLastMonths/>
      <RevenueServices/>
    </div>
  )
}

export default IncomeBody