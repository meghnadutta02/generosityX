import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
const MyProfilePage = () => {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    const getProfile = async () => {
      const user =
        JSON.parse(localStorage.getItem("user")) ||
        JSON.parse(sessionStorage.getItem("user"));
      await axios.get(`api/users/profile/${user._id}`);
    };

    getProfile();
  }, []);

  useEffect(() => {
    const profile = {
      name,
      age,
      email,
      address,
      contact,
      profileImage,
    };

    localStorage.setItem("profile", JSON.stringify(profile));
  }, [name, age, email, address, contact, profileImage]);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleUpdate = () => {
    // Here you can perform any necessary validation or API calls to update the profile data
    setEditing(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setProfileImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container min-h-full py-16 lg:px-48">
      <h2 className="text-4xl font-bold">My Profile</h2>
      {!editing ? (
        <div className="border-2 border-red-500 p-4">
          <div>
            <img
              src={profileImage}
              alt="Profile"
              className="w-48 h-48 mx-auto object-cover border-2 border-black rounded-full mb-4"
            />
          </div>

          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableBody>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Name
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {name}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Email
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {email}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Contact
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {contact}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Age
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {age}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Address
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {address}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <button
            className="bg-blue-400 text-white rounded px-4 py-1 my-2"
            onClick={handleEdit}
          >
            Edit
          </button>
        </div>
      ) : (
        <div>
          <div>
            <img
              src={profileImage}
              alt="Profile"
              className="w-48 h-48 object-cover rounded-full mx-auto mb-4"
            />
          </div>
          <label className="block mb-2">
            Profile Image:
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mb-2"
            />
          </label>
          <label className="block mb-2">
            Name:
            <input
              className="border border-gray-300 rounded px-2 py-1"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label className="block mb-2">
            Age:
            <input
              className="border border-gray-300 rounded px-2 py-1"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </label>
          <label className="block mb-2">
            Email:
            <input
              className="border border-gray-300 rounded px-2 py-1"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="block mb-2">
            Address:
            <input
              className="border border-gray-300 rounded px-2 py-1"
              type="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </label>
          <label className="block mb-2">
            Contact:
            <input
              className="border border-gray-300 rounded px-2 py-1"
              type="contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </label>
          <button
            className="bg-blue-500 text-white rounded px-4 py-2"
            onClick={handleUpdate}
          >
            Update
          </button>
        </div>
      )}
    </div>
  );
};

export default MyProfilePage;
