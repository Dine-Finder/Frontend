# Dine Finder Frontend Setup Guide

https://dinefinder.site/

## Video Tutorial
Watch the video tutorial for a step-by-step guide on setting up the Dine Finder frontend:

<p align="center">
  <a href="https://youtu.be/I2ugolvJmPA">
    <img src="https://connectthedotspr.com/wp-content/uploads/2018/06/watch-video-icon.jpg" alt="Watch the video">
  </a>
</p>

## Key Features
- **✨ User-friendly Interface** for seamless navigation and restaurant discovery
- **🌟 Personalized Recommendations** based on user preferences and location
- **📸 Detailed Restaurant Information**, including menus, photos, and reviews
- **🍽️ Reservation and Ordering Capabilities** for a complete dining experience

## Overview
This guide provides detailed instructions for setting up the frontend for development and deploying the Dine Finder application on Windows, macOS, and Linux operating systems.

## Prerequisites
Before proceeding, ensure you have the following installed on your system:

- **Node.js** (version 14.x or later)
- npm (Node package manager)

## Environment Setup
First, navigate to your project directory.

### Setup
```bash
npm install
```

## Configuration File Setup
Create a `.env` file in your project directory to store sensitive keys and configurations. Use your preferred text editor, for example:

### Windows
```bash
notepad .env
```

### macOS and Linux
```bash
nano .env
```

### Obtain Your API Keys

#### Get Your Google Maps API Key
Visit [Google Maps Platform](https://developers.google.com/maps) to get your API key.

#### Get Your Yelp API Key
Visit [Yelp Fusion API](https://docs.developer.yelp.com/docs/fusion-intro) to get your API key.

### Add the Following to Your `.env` File:
```plaintext
VITE_GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY
VITE_YELP_API_KEY=YOUR_YELP_API_KEY
```

## Backend Repository Setup
Ensure you have cloned the Backend repository and completed its setup before proceeding with the frontend.

```bash
git clone git@github.com:Resturant-Recommendation-System/Backend.git
```

## Running the Application
Now that your environment and configuration files are set up, you can run the application.

```bash
npm run dev
```

This command will start the development server, and you should be able to access the Dine Finder application in your web browser at `http://localhost:3000`.

## Project Structure

Below is the structure of the project detailing the directories and files contained within:

```
Frontend/
├── .github/
│   ├── workflows/
│   │   ├── frontend.yml
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Animations/
│   │   ├── HomePage/
│   │   ├── LandingPage/
│   │   └── Registration/
│   ├── constants/
│   │   └── data/
│   ├── data/
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── LandingPage.jsx
│   │   └── Layout.jsx
│   ├── styles/
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   └── theme.js
├── .env
├── .gitignore
├── .eslintrc.cjs
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
├── LICENSE
└── vite.config.js
```

## Contributing
We welcome contributions to the Dine Finder project! To contribute, please follow these steps:

1. **Fork the Repository** to your own GitHub account.
2. **Clone the Forked Repository** to your local machine.
3. Create a new branch with a descriptive name for your feature or bugfix.
4. Make your changes and commit them with clear and concise commit messages.
5. Push your changes to your forked repository.
6. Create a pull request to the main repository's `main` branch with a description of your changes.

## Conclusion
After following these steps, your Dine Finder application should be up and running. For further configurations and troubleshooting, please consult the official documentation or reach out to the project maintainers.

Happy coding and enjoy exploring the world of restaurants with Dine Finder!