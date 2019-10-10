import React from 'react';
import SegmentRow from './SegmentRow';
import { fetchSegments } from './strava';
import { getLocation } from './bin/utilities.js'
import mapboxgl from 'mapbox-gl';
import settings from './settings.js'

mapboxgl.accessToken = settings.MAPBOX_TOKEN;

class Koms extends React.Component {

  state = {
    segments: [],
    pending: true,
    error: null
  }

  async componentDidMount(){

    const location = getLocation()

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/dark-v9',
      center: location,
      zoom: 10
    });

    this._map = map;

    try {
      this.setState({ pending: true })
      var { segments, area } = await fetchSegments(location);
      this.setState({ pending: false, segments })
    } catch( error ) {
      this.setState({ error }) 
    }

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

  displaySegment = (segment) => {
    const id = '' + segment.id
    const random_color = "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});

    if ( this._map.getLayer( id ) ) {
      this._map.removeLayer(id)
      this._map.removeSource(id)
      return;
    }

    this._map.addLayer({
      id,
      type: 'line',
      source: {
        type: "geojson",
        data: segment.geojson
      },
      layout: {
        "line-join": "round",
        "line-cap": "round"
      },
      paint: {
        "line-color": random_color,
        "line-width": 8,
        "line-opacity": .85
      }
    })
  }

  render(){
    console.log(this.state.segments)
    return (
      <div className="koms-container">
        <div 
          ref={el => (this.mapContainer = el)}
          className="map">
        </div>
        {
          this.state.pending ? "loading segments..." :
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
                <SegmentRow 
                  key={`segment-${index}-${segment.id}`}
                  displaySegment={this.displaySegment}
                  segment={segment} 
                />
              ))}
            </tbody>
          </table>
        }
      </div>
    ) 
  }
}

export default Koms;
