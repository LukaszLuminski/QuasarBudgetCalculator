import axios from 'axios'

const url = 'http://localhost:1337'

function axiosCall (action, suffix, token, data) {
  const request = {
    method: action,
    url: url + suffix,
    data: data
  }
  if (token !== null) {
    request.headers = {
      Authorization: `Bearer ${token}`
    }
  }

  return axios(request)
}

export default axiosCall
