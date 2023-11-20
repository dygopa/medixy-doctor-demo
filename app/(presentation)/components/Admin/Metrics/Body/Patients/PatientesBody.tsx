import React from 'react'
import Age from './Graphs/Age'
import ByInsurance from './Graphs/ByInsurance'
import BySex from './Graphs/BySex'
import DistributionPerMonth from './Graphs/DistributionPerMonth'

function PatientesBody() {
  return (
    <div>
      <Age/>
      <ByInsurance/>
      <BySex/>
      <DistributionPerMonth/>
    </div>
  )
}

export default PatientesBody