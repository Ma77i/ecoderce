import API from "../utils/api"

export const SignUp = async (data) => {
  const res = await API.post("/api/sign/register", data);

  if (res.data) localStorage.setItem("user", JSON.stringify(res.data));

  return res.data;
};

export const SignIn = (data) => API.post("/api/sign/login", data)

export const Delete = (data) => API.delete("api/users/", data)

export const Modify = (data) => API.put("api/users", data)