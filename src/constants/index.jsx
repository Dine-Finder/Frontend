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
    text: "I love exploring new cuisines and this system and this makes it so easy to find the hottest spots and hidden gems!",
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

export const termsAndConditions = `

  **1. Introduction**

  Welcome to [Your Restaurant Recommendation System]! These Terms and Conditions ("Terms") govern your access to and use of our website and services. By using our services, you agree to these Terms. If you do not agree, please do not use our services.

  **2. User Accounts**

  To use certain features of our website, you may need to create a user account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.

  **3. Data Collection and Privacy**

  We collect and store personal information that you provide to us, such as your email address, login credentials, and review data. This information is used to enhance your experience and provide personalized recommendations. Please refer to our Privacy Policy for more details on how we handle your data.

  **4. User Reviews**

  You are responsible for the content of any reviews you post on our website. By submitting reviews, you grant us a non-exclusive, royalty-free, perpetual, and worldwide license to use, modify, and display such content. Reviews should be accurate and respectful.

  **5. Content Ownership**

  All content on our website, including text, graphics, logos, and software, is the property of Dine Finder or its licensors and is protected by copyright and other intellectual property laws. You may not reproduce, distribute, or create derivative works from our content without our express written permission.

  **6. Limitation of Liability**

  Our services are provided "as is" without any warranties of any kind. We do not guarantee the accuracy, reliability, or availability of our services. In no event shall we be liable for any direct, indirect, incidental, or consequential damages arising from your use of our services.

  **7. Changes to Terms**

  We may update these Terms from time to time. We will notify you of any changes by posting the new Terms on our website. Your continued use of our services after such changes constitutes your acceptance of the revised Terms.

  **8. Governing Law**

  These Terms are governed by and construed in accordance with the laws of USA, without regard to its conflict of law principles. Any disputes arising from these Terms will be subject to the exclusive jurisdiction of the courts in Manhattan.

  **9. Contact Us**

  If you have any questions or concerns about these Terms, please contact us at [Your Contact Information].

  **Effective Date:** ${adjustedTime}
`;
