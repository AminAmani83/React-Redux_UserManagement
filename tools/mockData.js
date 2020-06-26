const react_users = [
  {
    id: "e452b8a9-976d-42e3-a70d-3b3e6a7d53c0",
    name: "Amin1",
    age: 23,
    addressId: "52a652d5-8667-4b99-9124-350165f1dbc0",
  },
  {
    id: "e452b8a9-976d-42e3-a70d-3b3e6a7d53c1",
    name: "Amin2",
    age: 21,
    addressId: "52a652d5-8667-4b99-9124-350165f1dbc1",
  },
  {
    id: "e452b8a9-976d-42e3-a70d-3b3e6a7d53c2",
    name: "Amin4",
    age: 26,
    addressId: "52a652d5-8667-4b99-9124-350165f1dbc0",
  },
  {
    id: "e452b8a9-976d-42e3-a70d-3b3e6a7d53c3",
    name: "Amin3",
    age: 20,
    addressId: "52a652d5-8667-4b99-9124-350165f1dbc0",
  },
  {
    id: "e452b8a9-976d-42e3-a70d-3b3e6a7d53c4",
    name: "Amin6",
    age: 25,
    addressId: "52a652d5-8667-4b99-9124-350165f1dbc2",
  },
  {
    id: "e452b8a9-976d-42e3-a70d-3b3e6a7d53c5",
    name: "Amin7",
    age: 27,
    addressId: "52a652d5-8667-4b99-9124-350165f1dbc1",
  },
  {
    id: "e452b8a9-976d-42e3-a70d-3b3e6a7d53c6",
    name: "Amin5",
    age: 26,
    addressId: "52a652d5-8667-4b99-9124-350165f1dbc2",
  },
  {
    id: "e452b8a9-976d-42e3-a70d-3b3e6a7d53c7",
    name: "Amin8",
    age: 28,
    addressId: "52a652d5-8667-4b99-9124-350165f1dbc1",
  },
  {
    id: "e452b8a9-976d-42e3-a70d-3b3e6a7d53c8",
    name: "Amin9",
    age: 29,
    addressId: "52a652d5-8667-4b99-9124-350165f1dbc0",
  },
  {
    id: "e452b8a9-976d-42e3-a70d-3b3e6a7d53c9",
    name: "Amin10",
    age: 30,
    addressId: "52a652d5-8667-4b99-9124-350165f1dbc2",
  },
];

const react_addresses = [
  {
    id: "52a652d5-8667-4b99-9124-350165f1dbc0",
    province: "QC",
    city: "Montreal",
    street: "101 Sherbrooke West",
  },
  {
    id: "52a652d5-8667-4b99-9124-350165f1dbc1",
    province: "QC",
    city: "Montreal",
    street: "202 Sherbrooke West",
  },
  {
    id: "52a652d5-8667-4b99-9124-350165f1dbc2",
    province: "QC",
    city: "Montreal",
    street: "303 Sherbrooke West",
  },
];

const newUser = {
  id: "",
  name: "",
  age: null,
  addressId: "",
};

const newAddress = {
  id: "",
  province: "",
  city: "",
  street: "",
};

// Using CommonJS style export so we can consume via Node (without using Babel-node)
module.exports = {
  newUser,
  newAddress,
  react_users,
  react_addresses,
};
