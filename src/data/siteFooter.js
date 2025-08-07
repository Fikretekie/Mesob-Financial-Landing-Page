// import logo from "@/images/resources/logo-1.png";
import bg from "@/images/shapes/site-footer-shape-1.png";

const footerData = {
  bg,
  text: "Mesob Financial",
  aboutText:
    "Empowering Growth: Tracking, Taxes, and Financial Success in the USA",
  socials: [
    {
      id: 1,
      icon: "fab fa-twitter",
      href: "#",
    },
    {
      id: 2,
      icon: "fab fa-facebook",
      href: "#",
    },
    {
      id: 3,
      icon: "fab fa-pinterest-p",
      href: "#",
    },
    {
      id: 4,
      icon: "fab fa-instagram",
      href: "#",
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
