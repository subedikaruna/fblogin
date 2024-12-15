import FacebookLogin from "@greatsumini/react-facebook-login";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleResponse = async (response) => {
    const userData = {
      name: response.name,
      email: response.email,
      id: response.id,
      avatar: response.picture.data.url,
    };

    const loginResponse = await fetch("http://localhost:3000/api/auth/login", {
      method: "post",
      credentials: "include",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(userData),
    });

    const data = await loginResponse.json();
    if (!loginResponse.ok) {
      alert(data.message);
    }
    navigate("/profile");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-50">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full text-center">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">
          Login with Facebook
        </h1>
        <p className="text-gray-600 mb-6">
          Connect your Facebook account to get started!
        </p>

        <div className="flex justify-center">
          <FacebookLogin
            appId={import.meta.env.VITE_FB_APP_ID}
            onSuccess={(response) => {
              console.log("Login Success!", response);
            }}
            onFail={(error) => {
              console.log("Login Failed!", error);
            }}
            onProfileSuccess={handleResponse}
            render={({ onClick }) => (
              <button
                onClick={onClick}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-3v-3h3V9.6c0-3 1.8-4.6 4.5-4.6 1.3 0 2.5.1 2.8.1v3.1h-1.9c-1.5 0-1.9.9-1.9 1.8V12h3.2l-.5 3h-2.7v7A10 10 0 0 0 22 12z" />
                </svg>
                Continue with Facebook
              </button>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
