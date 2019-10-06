const getLocation = () => ([window.localStorage.getItem('longitude'), window.localStorage.getItem('latitude')])
const getAccessToken = () => window.localStorage.getItem('accessToken');


export { getLocation, getAccessToken }
