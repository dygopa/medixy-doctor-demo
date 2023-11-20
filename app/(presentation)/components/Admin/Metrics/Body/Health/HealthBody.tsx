import React from 'react'
import Diabetes from './Graphs/Diabetes'
import MostCommonDiagnoses from './Graphs/MostCommonDiagnoses'

function HealthBody() {
  return (
    <div>
      <Diabetes/>
      <MostCommonDiagnoses/>
    </div>
  )
}

export default HealthBody