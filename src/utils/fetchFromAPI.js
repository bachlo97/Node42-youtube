import axios from 'axios';

export const BASE_URL = 'http://localhost:8080';
export const DOMAIN_IMG = "http://localhost:8080/"
const options = {
  params: {
    maxResults: 50,
  },
  headers: {
    'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
    'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
    'token': localStorage.getItem("LOGIN_USER")
  },
};



export const fetchFromAPI = async (url) => {
  const { data } = await axios.get(`${BASE_URL}/${url}`, options);

  return data.content;
};

export const getVideoAPI = async () => {
  const { data } = await axios.get(`${BASE_URL}/video/get-video`,options);

  return data.content
}


export const getVideoTypeAPI = async () => {
  const { data } = await axios.get(`${BASE_URL}/video/get-video-type`,options);

  return data.content
}



export const getVideoWithTypeAPI = async (typeId) => {
  const { data } = await axios.get(`${BASE_URL}/video/get-video-with-type/${typeId}`,options);

  return data.content
}

export const getVideoPageAPI = async (page) => {
  const { data } = await axios.get(`${BASE_URL}/video/get-video-page/${page}`,options);

  return data.content // {data, listPage}
}

export const getVideoByIdAPI = async (videoId) => {
  const { data } = await axios.get(`${BASE_URL}/video/get-video-by-id/${videoId}`,options);

  return data.content 
}


export const loginAPI = async(model) => {
  const {data} = await axios.post(`${BASE_URL}/user/login`,model,options)
  return data.content // token
}

// API login facebook
export const loginFaceAPI = async (model) => {
  const { data } = await axios.post(`${BASE_URL}/user/login-facebook`, model);

  return data.content // token
}

export const uploadCloudinary = async(formData) =>{
  const {data} = await axios.post(`https://api.cloudinary.com/v1_1/dqsurqnqh/upload`,formData)
  return data
}

export const getUserAPI = async () => {
  const {data} = await axios.get(`${BASE_URL}/user/get-user`,options)
  return data.content
}

axios.interceptors.response.use(
  function (response) {


    return response;
  }
  ,
  function (error) {
    if (error.response.status == 401 && error.response.data == "TokenExpiredError") {
      // API reste token
      axios.post(`${BASE_URL}/user/reset-token`, null, options).then(result => {
        localStorage.setItem("LOGIN_USER", result.data.content)
        window.location.reload()

      }).catch(error => {
        // logout 
      })

    }

    return Promise.reject(error);
  }
);

// API get comment
export const getCommentAPI = async (videoId) => {
  const { data } = await axios.get(`${BASE_URL}/video/get-comment/${videoId}`, options)

  return data.content // =>{listVideo, totalPage}
}

export const commentAPI = async (model) => {
  const { data } = await axios.post(`${BASE_URL}/video/comment`, model, options)

  return data.content // =>{listVideo, totalPage}
}