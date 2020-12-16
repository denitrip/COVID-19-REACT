import React from 'react'
import Map from './Map'

const MapContainer = (props:any) => {
    return (
        <Map data={props.data} className={props.className}/>
    )
}

export default MapContainer