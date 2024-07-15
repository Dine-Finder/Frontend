import {
  Clock,
  MapPin,
  Star,
  Search,
  MessageCircle,
  TrendingUp,
} from 'lucide-react';

import user1 from "../assets/profile-pictures/user1.jpg";
import user2 from "../assets/profile-pictures/user2.jpg";
import user3 from "../assets/profile-pictures/user3.jpg";
import user4 from "../assets/profile-pictures/user4.jpg";
import user5 from "../assets/profile-pictures/user5.jpg";
import user6 from "../assets/profile-pictures/user6.jpg";

export const navItems = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#workflow" },
  { label: "Pricing", href: "#pricing" },
  { label: "Testimonials", href: "#testimonials" },
];


export const testimonials = [
  {
    user: "Alice Johnson",
    company: "Foodie Blog",
    image: user1,
    text: "This platform has revolutionized the way I discover and choose restaurants, making dining out a breeze!",
  },
  {
    user: "Bob Lee",
    company: "Urban Diner",
    image: user2,
    text: "The busyness predictions are incredibly accurate, helping us avoid wait times and enjoy our meals in peace.",
  },
  {
    user: "Carlos Kim",
    company: "Tech Forward",
    image: user3,
    text: "As someone who's always on the go, having a tool that tells me the best times to eat out is a total game changer.",
  },
  {
    user: "Deborah Ruiz",
    company: "Culinary Adventures",
    image: user4,
    text: "I love exploring new cuisines and this system makes it so easy to find the hottest spots and hidden gems!",
  },
  {
    user: "Evan Matthews",
    company: "Casual Eats",
    image: user5,
    text: "I used this system for the first time last week and was amazed at how spot-on the recommendations were!",
  },
  {
    user: "Fiona Cheng",
    company: "Gourmet Guide",
    image: user6,
    text: "The tag-based search feature has made it easier than ever to tailor restaurant choices to specific dining preferences. It's a critic's best tool!",
  },
];

export const features = [
  {
    icon: <Clock />,
    text: "Dynamic Busyness Prediction",
    description:
      "Utilize real-time data to predict the busyness of various restaurants, helping you choose the best time to visit.",
  },
  {
    icon: <MapPin />,
    text: "Local Business Map Integration",
    description:
      "Explore restaurants and local businesses on an interactive map to find the perfect dining spot near you.",
  },
  {
    icon: <Star />,
    text: "Customized Recommendations",
    description:
      "Receive personalized restaurant recommendations based on your preferences and previous choices.",
  },
  {
    icon: <Search />,
    text: "Advanced Search with Tags",
    description:
      "Search for restaurants by specific tags generated from review analysis, ensuring a match to your taste.",
  },
  {
    icon: <MessageCircle />,
    text: "Review Insights",
    description:
      "Gain insights from detailed reviews analyzed using the latest natural language processing techniques.",
  },
  {
    icon: <TrendingUp />,
    text: "Predictive Analysis",
    description:
      "Leverage predictive models to forecast restaurant busyness and trends using historical and current data.",
  },
];


export const checklistItems = [
  {
    title: "Find the Perfect Time",
    description:
      "Use our busyness predictions to plan your visits when restaurants are less crowded.",
  },
  {
    title: "Explore Local Favorites",
    description:
      "Discover new dining spots with our map tool that shows you local favorites in real time.",
  },
  {
    title: "Personalize Your Experience",
    description:
      "Get custom recommendations that match your dining preferences and past choices.",
  },
  {
    title: "Easy Search from Reviews",
    description:
      "Search restaurants by tags from user reviews to find exactly what you're craving.",
  },
];


export const pricingOptions = [
  {
    title: "Basic",
    price: "Free",
    features: [
      "Access to basic features",
      "Limited busyness predictions",
      "Community support",
    ],
  },
  {
    title: "Premium",
    price: "$9.99/month",
    features: [
      "Unlimited busyness predictions",
      "Advanced search options",
      "Premium support",
    ],
  },
  {
    title: "Business",
    price: "$49.99/month",
    features: [
      "API access for integration",
      "Custom analytics",
      "Dedicated account manager",
    ],
  },
];


export const resourcesLinks = [
  { href: "#", text: "Getting Started" },
  { href: "#", text: "Documentation" },
  { href: "#", text: "API Reference" },
  { href: "#", text: "FAQs" },
];


export const platformLinks = [
  { href: "#", text: "Features" },
  { href: "#", text: "App Downloads" },
  { href: "#", text: "Release Notes" },
];


export const communityLinks = [
  { href: "#", text: "Local Dining Events" },
  { href: "#", text: "Meetups" },
  { href: "#", text: "Food Industry Conferences" },
  { href: "#", text: "Career Opportunities" },
];

const d = new Date();
const timezoneOffset = d.getTimezoneOffset();
let edtOffset = -240;
let adjustedTime = new Date(d.getTime() + (edtOffset + timezoneOffset) * 60 * 1000);
export const PREFERENCES = {
  location:{
      locationType: null,
      coordinates: [null, null],
      radius: null,
      neighborhood: "Central Park"
  },
  dayTime:{
      day: adjustedTime.getDay(),
      time: adjustedTime.getHours()
  },
  localeBusyness:{
      Quiet: 0,
      Average: 0,
      Busy: 0,
      importance: "Preference"
  },
  restaurantBusyness:{
      Quiet: 0,
      Average: 0,
      Busy: 0,
      importance: "Preference" 
  }
}

export const SELECTEDPREFERENCE = {
  location:{
    locationType: null,
    coordinates: [null, null],
    radius: null,
    neighborhood: ""
},
dayTime:{
    day: null,
    time: null
},
localeBusyness:{
    Quiet: 0,
    Average: 0,
    Busy: 0,
    importance: "Preference"
},
restaurantBusyness:{
    Quiet: 0,
    Average: 0,
    Busy: 0,
    importance: "Preference" 
}
}