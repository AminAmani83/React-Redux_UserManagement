import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/react_addresses/";

export function getAddresses() {
  console.log("API Call: Get Addresses");
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}

export function saveAddress(address) {
  console.log("API Call: Save Address");
  return fetch(baseUrl + (address.id || ""), {
    method: address.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(address),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteAddress(addressId) {
  console.log("API Call: Delete Address");
  return fetch(baseUrl + addressId, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
