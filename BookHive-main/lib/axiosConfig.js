import axios from 'axios'

const instance = axios.create({
	baseURL: "https://bookhive.up.railway.app/api",
	headers: { 'Content-type': 'application/json' },
	timeout: 5000,
})

export default instance
