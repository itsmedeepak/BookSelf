import axios from '../lib/axiosConfig'

export const login = async (email, password) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			mode: 'same-origin',
			redirect: 'follow',
		}

		const res = await axios.post(
			'/users/profile/login/',
			{ email, password },
			{
				withCredentials: true,
			},
			config
		)
		return res.data
	} catch (error) {
		return error.response?.data.message ? error.response.data.message : error.message
	}
}

export const signup = async (name, email, password, passwordConfirm) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		}
		// mode: 'same-origin',
		// redirect: 'follow',
		const { data } = await axios.post(
			'/users/profile/signup/',
			{
				name,
				email,
				password,
				passwordConfirm,
			},
			{ withCredentials: true },
			config
		)
		return data
	} catch (error) {
		return error.response?.data.message ? error.response.data.message : error.message
	}
}

export const logout = async () => {
	localStorage.removeItem('userInfo')
}

//To get user profile based on :id or 'profile' passed as argument
export const getUserProfile = async () => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		}
		const { data } = await axios.get(`/users/profile/getMe`, { withCredentials: true }, config)
		return data
	} catch (error) {
		return error.response?.data.message ? error.response.data.message : error.message
	}
}

//To update user profile based on user object
export const updateUserProfile = async (user) => {
	try {
		var formData = new FormData()
		for (var key in user) {
			formData.append(key, user[key])
		}

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		}

		const { data } = await axios.patch(
			`https://bookhive.up.railway.app/api/users/profile/updateMe`,
			formData,
			{
				withCredentials: true,
			},
			config
		)
		return data
	} catch (error) {
		return error.response?.data.message ? error.response.data.message : error.message
	}
}

export const updateUserEmail = async (userData) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		}
		const { data } = await axios.patch(`https://bookhive.up.railway.app/api/users/profile/updateEmail/`, userData, { withCredentials: true }, config)
		return data
	} catch (error) {
		return error.response?.data.message ? error.response.data.message : error.message
	}
}

export const updateUserPassword = async (userData) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}
		const { data } = await axios.patch(
			`https://bookhive.up.railway.app/api/users/profile/updatePassword/`,
			userData,
			{ withCredentials: true },
			config
		)
		return data
	} catch (error) {
		return error.response?.data.message ? error.response.data.message : error.message
	}
}

//To update user profile based on user object
export const deleteUser = async () => {
	try {
		// const  { userInfo } or cookie = getState()
		const config = {
			headers: {
				Authorization: `Bearer ${cookie.token}`,
			},
		}
		const { data } = await axios.delete(`https://bookhive.up.railway.app/api/users/deleteMe`, config)
		return data.message
	} catch (error) {
		return error.response?.data.message ? error.response.data.message : error.message
	}
}
