import Onboarding from "@/app/onboarding";

export const onboarding = [
  {
    id: 1,
    title: "Welcome to Ainpal!",
    description:
      "Your trusted companion for navigating the world of law. Explore, learn, and know your rights!",
    animation: require("../assets/images/first.json"),
  },

  {
    id: 2,
    title: "Chatbot Feature!",
    description:
      "The chatbot offers instant legal help, answering questions according to your needs.",
    animation: require("../assets/images/second.json"),
  },

  {
    id: 3,
    title: "Account access",
    description:
      "Manage your account access with sign-in, sign-out, and Google sign-in options for seamless authentication and chat histories.",
    animation: require("../assets/images/third.json"),
  },

];

export const animations = [
  {
    id: 4,
    title: "Account create",
    animation: require("../assets/images/account.json"), // Replace with your actual animation path
  },
];
