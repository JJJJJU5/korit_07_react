import axios from "axios";
import { ItemResponse } from "../type";

export const getItems = async() : Promise<ItemResponse[]> => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/items`) 
  return res.data._embedded.items;
}