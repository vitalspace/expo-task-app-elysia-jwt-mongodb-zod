import axios from "./axios";

export const signUp = async (body) => await axios.post("/signup", body);
export const signIn = async (body) => await axios.post("/signin", body);
export const profile = async () => await axios.get("/profile");
export const update = async (body) => await axios.put("/update", body);
