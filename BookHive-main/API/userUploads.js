import axios from '../lib/axiosConfig'

export const getUploads = async (query) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		}
		const { data } = await axios.get('https://bookhive.up.railway.app/api/users/uploads', { withCredentials: true }, config)
		return data
	} catch (error) {
		return error.response && error.response.data.message ? error.response.data.message : error.message
	}
}

export const createUpload = async (upload) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		}
		return (await axios.post(`https://bookhive.up.railway.app/api/users/uploads/`, upload, { withCredentials: true }, config)).data
	} catch (error) {
		return error.response?.data.message ? error.response.data.message : error.message
	}
}
