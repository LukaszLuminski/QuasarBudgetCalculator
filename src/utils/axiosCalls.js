import axios from 'axios'

const url = 'http://localhost:1337'

function unauth (action, suffix, data) {
  const call = axios({
    method: action,
    url: url + suffix,
    data: data
  })
  return call
}

function auth (action, suffix, token, data) {
  const call = axios({
    method: action,
    url: url + suffix,
    data: data,
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return call
}

const axiosCall = { unauth: unauth, auth: auth }

export default axiosCall
