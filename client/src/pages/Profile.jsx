import { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    const getUser = async () => {
      const response = await fetch("http://localhost:3000/api/auth/get-user", {
        method: "get",
        credentials: "include",
      });
      const data = await response.json();
      if (data.success) {
        setUser(data.user);
      }
    };

    getUser();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm w-full">
        <div className="flex justify-center mb-4">
          <img
            src={user?.avatar}
            alt="Avatar"
            className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
          />
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">
            {user?.name}
          </h1>
          <p className="text-gray-600 mb-1">
            <span className="font-medium">Email:</span> {user?.email}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Facebook ID:</span> {user?.fbId}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
