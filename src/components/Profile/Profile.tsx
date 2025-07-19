import { Edit, LogOut, Save, X } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Button from "../Shared/Button";
import {useState} from "react";


const Profile = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
   const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    schoolName: "Vyas public",
    adminName: "Gajendra",
    email: "gajendra00@gmail.com",
    totalStudents: "1200",
  })

  const [editData, setEditData] = useState(profileData)
  
    const handleEdit = () => {
    setIsEditing(true)
    setEditData(profileData)
  }

  const handleSave = () => {
    setProfileData(editData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditData(profileData)
    setIsEditing(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    })
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
  };


  return (
    <>
      <div className="p-2">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
        {!isEditing ? (
          <button
            onClick={handleEdit}
            className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition duration-200 flex items-center"
          >
            <Edit className="w-5 h-5 mr-2" />
            Edit Profile
          </button>
        ) : (
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-200 flex items-center"
            >
              <Save className="w-5 h-5 mr-2" />
              Save
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition duration-200 flex items-center"
            >
              <X className="w-5 h-5 mr-2" />
              Cancel
            </button>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">School Name</label>
            {isEditing ? (
              <input
                type="text"
                name="schoolName"
                value={editData.schoolName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              />
            ) : (
              <p className="text-gray-900 font-semibold">{profileData.schoolName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Admin Name</label>
            {isEditing ? (
              <input
                type="text"
                name="adminName"
                value={editData.adminName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              />
            ) : (
              <p className="text-gray-900">{profileData.adminName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={editData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              />
            ) : (
              <p className="text-gray-900">{profileData.email}</p>
            )}
          </div>


          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Total Students</label>
            {isEditing ? (
              <input
                type="text"
                name="totalStudents"
                value={editData.totalStudents}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              />
            ) : (
              <p className="text-gray-900">{profileData.totalStudents}</p>
            )}
          </div>

          
        </div>
      </div>
    </div>

      <div className="flex justify-center mt-9">
        <Button onClick={handleLogout}>
          <LogOut className="w-5 h-5 mr-2" />
          Logout
        </Button>
      </div>
    </>
  );
};

export default Profile;
