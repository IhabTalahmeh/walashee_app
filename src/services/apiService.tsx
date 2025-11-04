import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';
import Config from 'react-native-config';

const BASE_URL = Config.BASE_URL;

// Create an Axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: { Accept: 'application/json' }
});

const getFullUrl = (url: string) => {
  return `${BASE_URL}/${url}`;
}

const get = async (url: string, config: AxiosRequestConfig = {}) => {
  try {
    const response = await axiosInstance.get(getFullUrl(url), config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const post = async (url: string, data: any, config: AxiosRequestConfig = {}) => {
  try {
    console.log('url', getFullUrl(url));
    console.log('data', data);
    const response = await axiosInstance.post(getFullUrl(url), data, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const patch = async (url: string, data: any, config: AxiosRequestConfig = {}) => {
  try {
    const response = await axiosInstance.patch(getFullUrl(url), data, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const put = async (url: string, data: any, config: AxiosRequestConfig = {}) => {
  try {
    const response = await axiosInstance.put(getFullUrl(url), data, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const del = async (url: string, config: AxiosRequestConfig = {}, data?: any) => {
  try {
    const response = await axiosInstance.delete(getFullUrl(url), {
      ...config,
      data: data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const postFormData = async (url: string, formData: FormData, config: AxiosRequestConfig = {}) => {
  try {
    const response = await axiosInstance.post(getFullUrl(url), formData, {
      ...config,
      headers: {
        'Content-Type': 'multipart/form-data',
        ...(config.headers || {}),
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const patchFormData = async (url: string, formData: FormData, config: AxiosRequestConfig = {}) => {
  try {
    const response = await axiosInstance.patch(getFullUrl(url), formData, {
      ...config,
      headers: {
        'Content-Type': 'multipart/form-data',
        ...(config.headers || {}),
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const ApiService = {
  get,
  post,
  patch,
  put,
  delete: del,
  postFormData,
  patchFormData
};
