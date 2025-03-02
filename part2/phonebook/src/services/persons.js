import axios from "axios";
const baseUrl = "/api/persons"

const getAll = () => {
    return axios.get(baseUrl)
}

const create = newObject => {
    return axios.post(baseUrl, newObject)
}

const deleteFrom = id => {
    return axios.delete(`${baseUrl}/${id}`)
}

const updateNumber = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject)
}

export default { getAll, create, deleteFrom, updateNumber}