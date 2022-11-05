import axios from "axios";
import { BASE_URL } from "../config";

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-type": "application/json",
  },
});

export const getCarList = async () => {
  try {
    const response = await instance.get("/cars");
    return response;
  } catch (error) {
    return error;
  }
};
