import * as turf from '@turf/turf';
import settings from './settings';
import _ from 'lodash';
import strava from 'strava-v3';
import { getAccessToken } from './bin/utilities';

const accessToken = getAccessToken()
const api = new strava.client(accessToken)


const parseSegments = allSegments => {
  const parsed = _.chain(allSegments).map(payload => payload.segments).flattenDeep().uniqBy('id').value()
  console.log(parsed)
  return parsed;
}

const scaledPoints = ( point ) => {
  let points = [];
  for( let i = 1; i <= settings.SEARCH_EXPONENT; i++ ) {
    let buffered = turf.buffer(point, i, { units: 'kilometers' }) 
    points.push(buffered)
  }
  return points;
}

export async function fetchSegments(location){
    const point = turf.point(location);
    const points = scaledPoints(point); 
    // take largest buffered search area for zoom purposes
    const area = turf.bbox(points[2]); 
    const promises = points.map(point => {
      const bbox = turf.bbox(point);
      return api.segments.explore({ bounds: `${bbox[1]},${bbox[0]},${bbox[3]},${bbox[2]}`, activity_type: 'riding' })
    })
    const allSegments = await Promise.all(promises);
    const processed = parseSegments(allSegments)
    return ({ segments: processed, area })
}
