import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'
let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getBlog = async blogId => {
  const response = await axios.get(`${baseUrl}/${blogId}`)
  return response.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const remove = async (blogId) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.delete(`${baseUrl}/${blogId}`, config)
  return response.data
}

const like = async blogId => {
  const response = await axios.put(`${baseUrl}/${blogId}`)
  return response.data
}

const comment = async (blogId, newComment) => {
  const response = await axios.post(`${baseUrl}/${blogId}/comments`, newComment)
  return response.data
}

const blogService = {
  setToken, getAll, getBlog, create, remove, like, comment
}

export default blogService