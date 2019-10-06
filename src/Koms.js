import React from 'react';
import { fetchSegments } from './strava';
import { getLocation } from './bin/utilities.js'
import mapboxgl from 'mapbox-gl';
import settings from './settings.js'

mapboxgl.accessToken = settings.MAPBOX_TOKEN;

class Koms extends React.Component {

  state = {
    segments: []
  }

  async componentDidMount(){

    const location = getLocation()

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/dark-v9',
      center: location,
      zoom: 10
    });

    const { segments, area } = await fetchSegments(location);

    this.setState({ segments })

    map.on('load', () => {
     // create a HTML element for each feature
      var el = document.createElement('img');
      el.className = 'marker';
      el.src = 'http://www.gravatar.com/avatar/?d=identicon'
      if ( this.props.athlete ) {
        el.src = this.props.athlete.profile_medium;
      }

      // make a marker for each feature and add to the map
      new mapboxgl.Marker(el)
        .setLngLat(location)
        .addTo(map);

      map.fitBounds(area, { padding: { left: 0, top: 0, right: 500, bottom: 0 } })

    })
  }

  render(){
    return (
      <div className="koms-container">
        <div 
          ref={el => (this.mapContainer = el)}
          className="map">
        </div>
        <table className="table-striped table-dark">
          <thead>
            <tr>
              <th>NAME</th>
              <th>DISTANCE</th>
              <th>CAT</th>
            </tr>
          </thead>
          <tbody>
            {this.state.segments && this.state.segments.map((segment, index) => (
              <tr key={`segment-${segment.name + index}`}>
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
            ))}
          </tbody>
        </table>
      </div>
    ) 
  }
}

export default Koms;
