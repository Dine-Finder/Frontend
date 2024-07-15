import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate instead of useHistory
import { User, LogOut } from "lucide-react";
import logo from "../../assets/logo.png";

const Navbar = () => {
    const navigate = useNavigate(); // Use the useNavigate hook for navigation

    const handleLogout = () => {
        // Remove the token from local storage
        localStorage.removeItem('token');

        // Log to console or handle any post-logout logic here
        console.log("Logged out successfully");

        // Redirect to login page
        navigate('/login');
    };

    return (
        <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80">
            <div className="container px-4 mx-auto relative lg:text-sm">
                <div className="flex justify-between items-center">
                    <div className="flex items-center flex-shrink-0">
                        <img className="h-10 w-10 mr-2" src={logo} alt="Logo" />
                        <span className="text-xl tracking-tight"><a href="/">DineFinder</a></span>
                    </div>
                    <button onClick={handleLogout} className="flex items-center px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700">
                        <LogOut className="h-5 w-5 mr-2" /> {/* Use LogOut icon */}
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
