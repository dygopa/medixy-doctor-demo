import React from 'react'
import RequestedByDoctors from './Graphs/RequestedByDoctors'
import RequestedMadeInClinic from './Graphs/RequestedMadeInClinic'

function ServicesBody() {
  return (
    <div>
      <RequestedByDoctors/>
      <RequestedMadeInClinic/>
    </div>
  )
}

export default ServicesBody