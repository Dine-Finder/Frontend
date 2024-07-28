import video1 from "../../assets/video1.mp4";
import video2 from "../../assets/video2.mp4";
import { useNavigate, Link } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleNavigate = (pathIfLoggedIn, pathIfLoggedOut) => {
    return () => navigate(token ? pathIfLoggedIn : pathIfLoggedOut);
  };

  const handleNavClick = (event, anchorId) => {
    event.preventDefault();
    const anchorSection = document.querySelector(anchorId);
    if (anchorSection) {
      anchorSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col items-center mt-6 lg:mt-20">
      <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide">
        Discover & Dine
        <span className="bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">
          {" "}in New York City
        </span>
      </h1>
      <p className="mt-10 text-lg text-center text-neutral-500 max-w-4xl">
        Explore the best dining spots tailored to your taste with our advanced restaurant recommendation system. Harness the power of NYC's extensive business data and real-time busyness predictions to enhance your dining experiences.
      </p>
      <div className="flex justify-center my-10">
        <button 
          onClick={handleNavigate('/home', '/login')} 
          className="bg-gradient-to-r from-orange-500 to-orange-800 py-3 px-4 mx-3 rounded-md hover:scale-110 active:scale-90"
        >
          Start Exploring
        </button>
        <Link to={"#features"} className="py-3 px-4 mx-3 rounded-md border" onClick={(e) => handleNavClick(e, "#features")}>
          Learn More
        </Link>
      </div>
      <div className="flex mt-10 justify-center">
        <video
          autoPlay
          loop
          muted
          className="rounded-lg w-1/2 border border-orange-700 shadow-sm shadow-orange-400 mx-2 my-4"
        >
          <source src={video1} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <video
          autoPlay
          loop
          muted
          className="rounded-lg w-1/2 border border-orange-700 shadow-sm shadow-orange-400 mx-2 my-4"
        >
          <source src={video2} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default HeroSection;
