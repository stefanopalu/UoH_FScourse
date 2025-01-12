import axios from "axios";
const baseUrl = "http://localhost:3001/persons"

const getAll = () => {
    return axios.get(baseUrl)
}

const create = newObject => {
    return axios.post(baseUrl, newObject)
}

const deleteFrom = id => {
    return axios.delete(`${baseUrl}/${id}`)
}

const updateNumber = (url, newObject) => {
    return axios.put(url, newObject)
}

export default { getAll, create, deleteFrom, updateNumber}