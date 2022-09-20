const API = "../../../utils/api.js";

// Register user
export const signUp = async (userData) => {
  const response = await API.post("/api/sign/register", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// // // // const fetchUserById = (userId) => {
// // // //   // the inside "thunk function"
// // // //   return async (dispatch, getState) => {
// // // //     try {
// // // //       // make an async call in the thunk
// // // //       const user = await userAPI.fetchById(userId);
// // // //       // dispatch an action when we get the response back
// // // //       dispatch(userLoaded(user));
// // // //     } catch (err) {
// // // //       // If something went wrong, handle it here
// // // //     }
// // // //   };
// // // // };

// // Login user
// export const login = async (userData) => {
//   const response = await API.post("/api/sign/login", userData);

//   if (response.data) {
//     localStorage.setItem("user", JSON.stringify(response.data));
//   }

//   return response.data;
// };

// // Logout user
// export const logout = () => {
//   localStorage.removeItem("user");
// };