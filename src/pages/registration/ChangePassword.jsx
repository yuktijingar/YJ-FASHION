import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updatePassword, reauthenticateWithCredential } from "firebase/auth";
import { auth } from "../../firebase/FirebaseConfig"; // Assuming auth is exported from FirebaseConfig
import toast from "react-hot-toast";
import Loader from "../../components/loader/Loader";
import Navbar from "../../components/navbar/Navbar";
import { EmailAuthProvider } from "firebase/auth";

const ChangePassword = () => {
  const navigate = useNavigate();

  // State for password change fields
  const [passwordChange, setPasswordChange] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "", // Added confirmation password state
  });

  const [loading, setLoading] = useState(false);

  const changePassword = async () => {
    try {
      setLoading(true);
      const user = auth.currentUser;

      // Check if new password matches confirmation password
      if (passwordChange.newPassword !== passwordChange.confirmPassword) {
        setLoading(false);
        toast.error("New password and confirmation password do not match");
        return;
      }

      // Re-authenticate with current password before update
      await reauthenticateWithCredential(user, EmailAuthProvider.credential(user.email, passwordChange.currentPassword));

      // Update password with Firebase
      await updatePassword(user, passwordChange.newPassword);

      // Clear password fields
      setPasswordChange({ currentPassword: "", newPassword: "", confirmPassword: "" });

      setLoading(false);

      // Redirect to home page
      navigate('/'); // Assuming your home page route is '/'

      toast.success("Password changed successfully");
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast.error("Failed to change password");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center h-screen">
        {/* Loading Component */}
        {loading && <Loader />}
        {/* Change Password Form */}
        <div className="login_Form bg-pink-50 px-1 lg:px-8 py-6 border border-pink-100 rounded-xl shadow-md">
          {/* Top Heading */}
          <div className="mb-5">
          <img src="https://firebasestorage.googleapis.com/v0/b/yj---fashion.appspot.com/o/YJ-FASHION%20LOGO.png?alt=media&token=db1a0298-5bef-4164-bc8c-6de12b2f6bda" alt="logo" className='mx-auto' style={{width:'300px',height:'50px'}} />
            <h2 className="text-center text-2xl font-bold text-pink-500">Change Password</h2>
          </div>

          {/* Current Password Input */}
          <div className="mb-3">
            <input
              type="password"
              placeholder="Current Password"
              value={passwordChange.currentPassword}
              onChange={(e) =>
                setPasswordChange({
                  ...passwordChange,
                  currentPassword: e.target.value,
                })
              }
              className="bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200"
            />
          </div>

          {/* New Password Input */}
          <div className="mb-3">
            <input
              type="password"
              placeholder="New Password"
              value={passwordChange.newPassword}
              onChange={(e) =>
                setPasswordChange({
                  ...passwordChange,
                  newPassword: e.target.value,
                })
              }
              className="bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200"
            />
          </div>

          {/* Confirm Password Input */}
          <div className="mb-4">
            <input
              type="password"
              placeholder="Confirm New Password"
              value={passwordChange.confirmPassword}
              onChange={(e) =>
                setPasswordChange({
                  ...passwordChange,
                  confirmPassword: e.target.value,
                })
              }
              className="bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200"
            />
          </div>

          {/* Change Password Button */}
          <div className="mb-4">
            <button
              onClick={changePassword}
              type="button"
              className="bg-pink-500 hover:bg-pink-600 w-full text-white text-center py-2 font-bold rounded-md"
              disabled={loading} // Disable button while loading
            >
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
