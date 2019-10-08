import React from 'react';
import polyline from '@mapbox/polyline';

class SegmentRow extends React.Component {

  displaySegment = () => {
    const geojson = polyline.toGeoJSON(this.props.segment.map.polyline);
    this.props.displaySegment({
      id: this.props.segment.id,
      geojson
    })  
  }

  render(){
    const { segment } = this.props
    return (
        <tr onClick={this.displaySegment}>
          <td>
            {segment.name}
          </td>
          <td>
            {segment.distance}
          </td>
          <td>
            {segment.climb_category}
          </td>
        </tr>
    ) 
  }
}

export default SegmentRow;
