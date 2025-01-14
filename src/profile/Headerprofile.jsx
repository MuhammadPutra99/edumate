import React, { useContext, useState, useEffect } from "react";
import { FaCamera, FaPen } from "react-icons/fa";
import { MdOutlineAttachEmail, MdOutlineSchool } from "react-icons/md";
import { FaInstagram } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { toast } from "react-hot-toast";
import { db, auth } from "../admin/auth/firebaseConfig";
import { fetchUserProfile } from "../admin/utils/firebaseUtils";
import { convertToBase64 } from "../admin/utils/fileUtils";
import { updateProfile } from "../admin/auth/firebaseService";

export default function HeaderProfile() {
  const { currentUser, dispatch } = useContext(AuthContext);
  const [profileData, setProfileData] = useState({
    username: "",
    photoURL: "",
    description: "",
    instagram: "",
    school: "",
    location: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser?.uid) {
      fetchUserProfile(currentUser.uid, currentUser)
        .then((data) => {
          if (data) setProfileData(data);
        })
        .catch((error) => console.error(error));
    }
  }, [currentUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        if (file.size > 1024 * 1024) {
          toast.error("Image size should be less than 1MB");
          return;
        }
        const base64String = await convertToBase64(file);
        setProfileData((prev) => ({ ...prev, photoURL: base64String }));
      } catch (error) {
        console.error("Error converting image:", error);
        toast.error("Failed to process image");
      }
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const updatedData = { ...profileData, updatedAt: new Date() };
      await updateProfile(currentUser.uid, updatedData);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to logout?")) {
      try {
        await signOut(auth);
        dispatch({ type: "LOGOUT" });
        navigate("/");
      } catch (error) {
        console.error("Logout error:", error);
        toast.error("Failed to logout");
      }
    }
  };

  return (
    <div className="relative h-screen">
      <div className="absolute bottom-0 bg-white w-full h-[80%]">
        <form className="px-4 md:px-14" onSubmit={(e) => e.preventDefault()}>
          <div className="absolute -top-10 w-32 h-32 md:w-64 md:h-64 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full shadow-lg flex items-center justify-center">
            <input
              type="file"
              accept="image/*"
              id="profilePhoto"
              className="hidden"
              onChange={handleImageChange}
            />
            <label htmlFor="profilePhoto" className="cursor-pointer">
              <FaCamera className="text-white text-3xl hover:text-gray-400" />
            </label>
          </div>

          {profileData.photoURL && (
            <div
              className="absolute -top-10 w-32 h-32 md:w-64 md:h-64 bg-cover bg-center rounded-full"
              style={{ backgroundImage: `url(${profileData.photoURL})` }}
            >
              <label
                htmlFor="profilePhoto"
                className="absolute bottom-0 right-0 bg-white p-2 rounded-full cursor-pointer shadow-md hover:bg-gray-100"
              >
                <FaPen className="text-gray-600" />
              </label>
            </div>
          )}

          <div className="flex flex-row justify-between">
            <div className="flex flex-col px-4 md:px-72 py-6">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={profileData.username}
                onChange={handleInputChange}
                className="montserrat w-full px-3 py-2 rounded-xl text-4xl text-black font-semibold placeholder:font-normal outline-none"
              />

              <textarea
                name="description"
                placeholder="Description"
                value={profileData.description}
                onChange={handleInputChange}
                className="montserrat w-full h-28 px-3 py-2 rounded-xl text-lg text-black font-light placeholder:font-normal text-start resize-none overflow-hidden outline-none"
              />
            </div>

            <div className="relative top-10">
              <button
                type="button"
                onClick={handleLogout}
                className="flex flex-row justify-center items-center w-40 h-12 bg-gradient-to-r from-zinc-700 to-zinc-900 hover:bg-gradient-to-tr hover:from-[#FF635A] hover:to-[#952A25] rounded-2xl gap-x-5 shadow-lg"
              >
                <CiLogout className="text-white text-2xl font-bold" />
                <span className="montserrat text-xl text-white font-semibold">
                  Log Out
                </span>
              </button>
            </div>
          </div>

          <div className="w-full h-[1px] bg-black mt-6"></div>

          <div className="flex flex-row pt-5">
            <div className="w-1/2 flex flex-col gap-y-5">
              <div className="flex items-center gap-x-5 text-2xl text-gray-600">
                <MdOutlineAttachEmail />
                <p className="text-2xl font-semibold">{currentUser.email}</p>
              </div>

              <div className="flex items-center gap-x-5 text-2xl text-gray-600">
                <FaInstagram />
                <input
                  type="text"
                  name="instagram"
                  placeholder="Your Instagram Account"
                  value={profileData.instagram}
                  onChange={handleInputChange}
                  className="w-3/4 p-2 outline-none"
                />
              </div>

              <div className="flex items-center gap-x-5 text-2xl text-gray-600">
                <MdOutlineSchool />
                <input
                  type="text"
                  name="school"
                  placeholder="Your School Address"
                  value={profileData.school}
                  onChange={handleInputChange}
                  className="w-3/4 p-2 outline-none"
                />
              </div>

              <div className="flex items-center gap-x-5 text-2xl text-gray-600">
                <IoLocationOutline />
                <input
                  type="text"
                  name="location"
                  placeholder="Your Address"
                  value={profileData.location}
                  onChange={handleInputChange}
                  className="w-3/4 p-2 outline-none"
                />
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSave}
            disabled={isLoading}
            className="mt-5 px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 disabled:bg-gray-400"
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
}