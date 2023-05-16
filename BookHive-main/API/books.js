import axios from '../lib/axiosConfig'

export const getBestsellers = async (query) => {
	try {
		const { data } = await axios.get('https://bookhive.up.railway.app/api/books/bestsellers', { params: query })
		return data
	} catch (error) {
		return error.response && error.response.data.message ? error.response.data.message : error.message
	}
}

export const getTopAudiobooks = async (query) => {
	try {
		const { data } = await axios.get('https://bookhive.up.railway.app/api/books/audiobooks', { params: query })
		return data
	} catch (error) {
		return error.response && error.response.data.message ? error.response.data.message : error.message
	}
}

export const getLatestBooks = async (query) => {
	try {
		const { data } = await axios.get('https://bookhive.up.railway.app/api/books/latest/', { params: query })
		return data
	} catch (error) {
		return error.response && error.response.data.message ? error.response.data.message : error.message
	}
}

//Free books
export const getIndianBooks = async (language) => {
	try {
		const { data } = await axios.get('https://bookhive.up.railway.app/api/books/indian/', { params: { language } })
		return data
	} catch (error) {
		return error.response && error.response.data.message ? error.response.data.message : error.message
	}
}

export const getRegionalBooks = async (language) => {
	try {
		const { data } = await axios.get('https://bookhive.up.railway.app/api/books/regional/', { params: { language } })
		return data
	} catch (error) {
		return error.response && error.response.data.message ? error.response.data.message : error.message
	}
}

export const searchBooks = async (query) => {
	try {
		const { data } = await axios.get('https://bookhive.up.railway.app/api/books/search', { params: query })
		return data
	} catch (error) {
		return error.response?.data.message ? error.response.data.message : error.message
	}
}

export const getSearchSuggestions = async (keyword) => {
	try {
		const { data } = await axios.get(`https://bookhive.up.railway.app/api/books/searchSuggestion/`, { params: { keyword } })
		return data
	} catch (error) {
		return error.response?.data.message ? error.response.data.message : error.message
	}
}

export const getSimilarBooks = async (bookId, query) => {
	try {
		const { data } = await axios.get(`https://bookhive.up.railway.app/api/books/${bookId}/similar/`, { params: query })
		return data
	} catch (error) {
		return error.response?.data.message ? error.response.data.message : error.message
	}
}

export const getBookDetails = async (bookId) => {
	try {
		const { data } = await axios.get(`https://bookhive.up.railway.app/api/books/${bookId}`)
		return data
	} catch (error) {
		return error.response?.data.message ? error.response.data.message : error.message
	}
}

export const createBook = async (book) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		}

		const { data } = await axios.post(`https://bookhive.up.railway.app/api/books/`, book, { withCredentials: true }, config)
		return data
	} catch (error) {
		return error.response?.data.message ? error.response.data.message : error.message
	}
}

export const createBookReview = async (review) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		}

		const { data } = await axios.post(`https://bookhive.up.railway.app/api/reviews/`, review, { withCredentials: true }, config)
		return data
	} catch (error) {
		return error.response?.data.message ? error.response.data.message : error.message
	}
}

export const updateBookReview = async (review) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		}

		const { data } = await axios.patch(`https://bookhive.up.railway.app/api/reviews/${review.reviewId}`, review, { withCredentials: true }, config)
		return data
	} catch (error) {
		return error.response?.data.message ? error.response.data.message : error.message
	}
}

export const likeBookReview = async (reviewId) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		}

		const { data } = await axios.patch(`https://bookhive.up.railway.app/api/reviews/${reviewId}/like`, {}, { withCredentials: true }, config)
		return data
	} catch (error) {
		return error.response?.data.message ? error.response.data.message : error.message
	}
}

// export const dislikeBookReview = async () => {
// 	try {
// 		const config = {
// 			headers: {
// 				'Content-Type': 'application/json',
// 				Accept: 'application/json',
// 			},
// 		}

// 		const { data } = await axios.patch(`/reviews/${review.reviewId}/dislike`, {}, { withCredentials: true }, config)
// 		return data
// 	} catch (error) {
// 		return error.response?.data.message ? error.response.data.message : error.message
// 	}
// }
