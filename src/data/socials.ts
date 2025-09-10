// src/data/socials.ts
import { IoMail, IoLogoGithub, IoLogoLinkedin } from "react-icons/io5";

const socialsData = [
  { 
    id: "email", 
    icon: IoMail, 
    label: "Email",
    url: "mailto:henry.melo.contact@gmail.com" 
  },
  {
    id: "github",
    icon: IoLogoGithub,
    label: "GitHub", 
    url: "https://github.com/henrycmelo",
  },
  {
    id: "linkedin",
    icon: IoLogoLinkedin,
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/henry--melo/",
  },
];

export default socialsData;