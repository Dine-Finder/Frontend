import { Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "../../assets/logo.png";
import { navItems } from "../../constants";
import { useNavigate, Link } from 'react-router-dom';

const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  const handleNavClick = (event, anchorId) => {
    event.preventDefault();
    const anchorSection = document.querySelector(anchorId);
    if (anchorSection) {
      anchorSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigate = (path) => {
    return () => navigate(path);
  };

  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80">
      <div className="container px-4 mx-auto relative lg:text-sm">
        <div className="flex justify-between items-center">
          <Link to="#hero" onClick={(e) => handleNavClick(e, "#hero")}>
            <div className="flex items-center flex-shrink-0 hover:scale-110 active:scale-90">
              <img className="h-14 w-14 mr-2" src={logo} alt="Logo" />
              <span className="text-2xl font-bold tracking-tight ">DineFinder</span>
            </div>
          </Link>
          <ul className="hidden lg:flex ml-14 space-x-12">
            {navItems.map((item, index) => (
              <li key={index} className="hover:scale-110 hover:text-orange-600 active:scale-90 text-lg">
                <Link to={item.href} onClick={(e) => handleNavClick(e, item.href)}>{item.label}</Link>
              </li>
            ))}
          </ul>
          <div className="hidden lg:flex justify-center space-x-12 items-center">
            <button onClick={handleNavigate('/login')} className="py-2 px-3 text-base border rounded-md hover:scale-110 active:scale-90">
              Sign In
            </button>
            <button onClick={handleNavigate('/register')} className="bg-gradient-to-r text-base from-orange-500 to-orange-800 py-2 px-3 rounded-md hover:scale-110 active:scale-90">
              Create an account
            </button>
          </div>
          <div className="lg:hidden md:flex flex-col justify-end">
            <button onClick={toggleNavbar}>
              {mobileDrawerOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>  
        {mobileDrawerOpen && (
          <div className="fixed z-20 bg-custom-dark w-[90vw] top-19 border right-5 p-2 flex flex-col justify-center items-center lg:hidden rounded-md">
            <ul className="pt-4 flex flex-col gap-2">
              {navItems.map((item, index) => (
                <li key={index} className="p-2 text-sm text-white rounded-md duration-300 border">
                  <Link to={item.href} onClick={(e) => handleNavClick(e, item.href)}>{item.label}</Link>
                </li>

              ))}
            </ul>
            <div className="flex space-x-6 py-4">
              <button onClick={handleNavigate('/login')} className="py-2 px-3 border rounded-md hover:scale-110 active:scale-90">
                Sign In
              </button>
              <button onClick={handleNavigate('/register')} 
                className="py-2 px-3 rounded-md bg-gradient-to-r from-orange-500 to-orange-800 hover:scale-110 active:scale-90"
              >
                Create an account
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
