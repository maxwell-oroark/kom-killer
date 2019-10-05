const settings = (env) => {
  const config = {
    development: {
      MAPBOX_TOKEN:'pk.eyJ1IjoibWF4d2VsbG8iLCJhIjoiY2ltc2Fma2UxMDFpb3ZsbTR2MjJvMmlwcCJ9.-czd-gCxko0qiczeOvUbig',
      AWS_BACKEND: 'https://cxwj5fkd00.execute-api.us-east-1.amazonaws.com/prod',
      STRAVA_CLIENT_ID: '39086',
      STRAVA_REDIRECT_URI: 'http://localhost:3000/token'
    },
    production: {
      MAPBOX_TOKEN:'pk.eyJ1IjoibWF4d2VsbG8iLCJhIjoiY2ltc2Fma2UxMDFpb3ZsbTR2MjJvMmlwcCJ9.-czd-gCxko0qiczeOvUbig',
      AWS_BACKEND: 'https://cxwj5fkd00.execute-api.us-east-1.amazonaws.com/prod',
      STRAVA_CLIENT_ID: '39086',
      STRAVA_REDIRECT_URI: 'lucid-mcnulty-6d1630.netlify.com/token'
    }
  }
  return config[env]
}

export default settings(process.ENV.REACT_APP_ENV)
