import React from 'react'
import Map from './Map'

const MapContainer = (props: any) => {
    return (
        <Map updateCheckAbsolut={props.updateCheckAbsolut} checkAbsolut={props.checkAbsolut} data={props.data} />
    )
}

export default MapContainer