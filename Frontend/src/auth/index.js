/* eslint-disable no-console */
/* eslint-disable consistent-return */
/* eslint-disable no-else-return */
/* eslint-disable arrow-body-style */
import axios from "axios";
import CryptoJS from "crypto-js";

export const signup = (user) => {
  axios
    .post(`http://localhost:5000/TowingLogApi/signup`, user)
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
// not in use
export const signin = (user) => {
  axios
    .post(`http://localhost:5000/TowingLogApi/signin`, user)
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
export const signout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    localStorage.removeItem("RefreshCount");

    axios
      .get(`http://localhost:5000/TowingLogApi/signout`)
      .then((response) => {
        console.log("signout", response);
      })
      .catch((err) => console.log(err));
  }
};

export const authenticate = (data) => {
  if (typeof window !== "undefined") {
    const encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      "8154cb24758ff7a388e3ed8398245f7a1662dbdefccdbe90b4a68e19c0d0d3fa1537713ea0021f55dc3b0685d69e1cdfb1e61dd4cf706d9f99b4897a8bacbbe3"
    );
    localStorage.setItem("jwt", encrypted);
    if (localStorage.getItem("RefreshCount") === null) {
      localStorage.setItem("RefreshCount", "0");
    }
  }
};

export const isAuthenticated = () => {
  if (typeof window === "undefined") {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    const decrypted = CryptoJS.AES.decrypt(
      localStorage.getItem("jwt"),
      "8154cb24758ff7a388e3ed8398245f7a1662dbdefccdbe90b4a68e19c0d0d3fa1537713ea0021f55dc3b0685d69e1cdfb1e61dd4cf706d9f99b4897a8bacbbe3"
    );
    // console.log("decrypted");
    // console.log(decrypted.toString(CryptoJS.enc.Utf8));
    return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
  } else {
    return false;
  }
};

export const updateRefreshCount = (num) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("RefreshCount", num);
  }
};

// // ? Attach an event listener to the beforeunload event
// window.addEventListener("beforeunload", () => {
//   // ? Check if the page is being reloaded
//   if (performance.navigation.type !== 1) {
//     // ? Clear data from local storage only on browser close
//     // ? Remove the data from local storage when the browser is closed
//     if (typeof window !== "undefined") {
//       localStorage.removeItem("jwt");
//       localStorage.removeItem("RefreshCount");
//     }
//     // //? Clear all data from local storage
//     // localStorage.clear();
//   }
// });
