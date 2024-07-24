import React from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import Swal from 'sweetalert2';
import logo from "../../assets/logo.png";

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You will be logged out of your account.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, logout!',
            cancelButtonText: 'Cancel'
        });

        if (result.isConfirmed) {
            localStorage.removeItem('token');
            Swal.fire(
                'Logged out!',
                'You have been logged out successfully.',
                'success'
            );
            navigate('/');
        }
    };

    return (
        <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80 bg-orange-600 bg-opacity-30">
            <div className="container px-4 mx-auto relative lg:text-sm">
                <div className="flex justify-between items-center">
                    <div className="flex items-center flex-shrink-0">
                        <img className="h-14 w-14 mr-2" src={logo} alt="Logo" />
                        <span className="text-2xl font-bold tracking-tight"><a href="/">DineFinder</a></span>
                    </div>
                    <button 
                    onClick={handleLogout} 
                    className="flex items-center px-5 py-2 text-lg font-bold text-gray-700 transition-colors duration-200 bg-white border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 hover:scale-110 active:scale-90">
                        <LogOut className="h-5 w-5 mr-2" />
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
