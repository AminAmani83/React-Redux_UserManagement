import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/react_users/";

export function getUsers() {
  console.log("API Call: Get Users");
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}

export function getUserById(userId) {
  console.log("API Call: Get User By Id");
  return fetch(baseUrl + userId)
    .then(handleResponse)
    .catch(handleError);
}

export function saveUser(user) {
  console.log("API Call: Save User", user);
  return fetch(baseUrl + (user.id || ""), {
    method: user.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(user),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteUser(userId) {
  console.log("API Call: Delete User", userId);
  return fetch(baseUrl + userId, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
