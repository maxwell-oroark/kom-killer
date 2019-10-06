import React from 'react';
import mapboxgl from 'mapbox-gl';
import * as turf from '@turf/turf';
import settings from './settings.js'
import strava from 'strava-v3'

mapboxgl.accessToken = settings.MAPBOX_TOKEN;

class Koms extends React.Component {

  state = {
    segments: []
  }

  async componentDidMount(){

    const accessToken = window.localStorage.getItem('accessToken');
    const location = [window.localStorage.getItem('longitude'), window.localStorage.getItem('latitude')]
    const api = new strava.client(accessToken)

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/dark-v9',
      center: location,
      zoom: 10,
    });

    const point = turf.point(location);
    const buffered = turf.buffer(point, 1, {units:'kilometers'});
    const bbox = turf.bbox(buffered);

    const result = await api.segments.explore({ bounds: `${bbox[1]},${bbox[0]},${bbox[3]},${bbox[2]}`, activity_type: 'riding' });
    this.setState({ segments: result.segments })

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

      map.fitBounds(bbox, { padding: { left: 0, top: 0, right: 500, bottom: 0 } })

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
