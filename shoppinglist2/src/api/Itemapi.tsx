import axios, { AxiosRequestConfig } from "axios";
import { Item, ItemResponse } from "../type";

const getAxiosConfig = () : AxiosRequestConfig => {
  const token = sessionStorage.getItem("jwt")
  return{
    headers:{
      'Authorization':token,
      'Content-Type' : 'application/json',
    },
  }
}

export const getItems = async() : Promise<ItemResponse[]> => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/items`,getAxiosConfig()); 
  return res.data;
}
export const addItems = async(item:Item) : Promise<ItemResponse[]> => {
  const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/items`, item , getAxiosConfig()) ;
  return res.data
}
export const deleteItem = async(link : ItemResponse): Promise<ItemResponse> => {
    const url = link._links.self.href;
    const res = await axios.delete(url, getAxiosConfig());
  return res.data
}