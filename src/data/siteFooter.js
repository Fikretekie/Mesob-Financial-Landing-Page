// import logo from "@/images/resources/logo-1.png";
import bg from "@/images/shapes/site-footer-shape-1.png";

const footerData = {
  bg,
  text: "Mesob Financial",
 
  socials: [

    {
      id: 2,
      icon: "fab fa-facebook",
      href: "https://www.facebook.com/profile.php?id=61579534023491",
    },
    {
      id: 3,
      icon: "fab fa-tiktok",
      href: "https://www.tiktok.com/@mesob85?_t=ZT-8yzttOuwr1r&_r=1",
    },
    {
      id: 4,
      icon: "fab fa-instagram",
      href: "https://www.instagram.com/mesobfinancial?igsh=eWNoNWNoaG45cHI0",
    },
  ],
  links: [
    {
      id: 1,
      text: "About",
      href: "/about",
    },
    {
      id: 2,
      // text: "Meet our team",
      href: "/team",
    },
    {
      id: 3,
      // text: "Case stories",
      href: "/case",
    },
    {
      id: 4,
      // text: "Latest news",
      href: "/blog",
    },
    {
      id: 5,
      text: "Contact",
      href: "/contact",
    },
    {
      id: 6,
      // text: "Support",
      href: "/about",
    },
    {
      id: 7,
      text: "Terms of use",
      href: "/terms-of-use",
    },
    {
      id: 8,
      text: "Privacy policy",
      href: "/privacy-policy",
    },
    {
      id: 9,
      // text: "Help",
      href: "/about",
    },
  ],
  // newsletterText: "Subsrcibe for our upcoming latest articles and resources",
  // address: "60 road, broklyn golden street new york. USA",
  phone: "+1 (614) 966-5005",
  phoneHref: "12463330079",
  email: "info@mesobfinancial.com",
  author: "Mesob Financial",
  year: new Date().getFullYear(),
};

export default footerData;
