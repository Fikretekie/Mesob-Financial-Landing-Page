import logo from "@/images/resources/logo.PNG";

const home = {
  id: 1,
  name: "Home",
  href: "/",
};

export const onePageNavItems = [
  { ...home, href: "#home" },
  {
    id: 2,
    name: "Services",
    href: "#services",
  },
  {
    id: 3,
    name: "About",
    href: "#about",
  },
  {
    id: 4,
    name: "Cases",
    href: "#cases",
  },
  {
    id: 5,
    name: "Team",
    href: "#team",
  },
  {
    id: 6,
    name: "News",
    href: "#news",
  },
];

export const onePageNavItemsTwo = [
  { ...home, href: "#home" },
  {
    id: 2,
    name: "About",
    href: "#about",
  },
  {
    id: 3,
    name: "Cases",
    href: "#cases",
  },
  {
    id: 4,
    name: "Services",
    href: "#services",
  },
  {
    id: 5,
    name: "Testimonial",
    href: "#testimonial",
  },
  {
    id: 6,
    name: "News",
    href: "#news",
  },
];

export const onePageNavItemsThree = [
  { ...home, href: "#home" },
  {
    id: 2,
    name: "Services",
    href: "#services",
  },
  {
    id: 3,
    name: "About",
    href: "#about",
  },
  {
    id: 4,
    name: "Cases",
    href: "#cases",
  },
  {
    id: 5,
    name: "Testimonial",
    href: "#testimonial",
  },
  {
    id: 6,
    name: "Contact",
    href: "#contact",
  },
  {
    id: 7,
    name: "News",
    href: "#news",
  },
];

export const servicesSubNavItems = [];

export const navItems = [
  home,
  {
    id: 2,
    name: "Services",
    href: "/services",
    subNavItems: servicesSubNavItems,
  },
  {
    id: 3,
    name: "About",
    href: "/about",
  },

  {
    id: 6,
    name: "Contact",
    href: "/contact",
  },
];

const socials = [

  {
    id: 2,
    icon: "fab fa-facebook-square",
    href: "https://www.facebook.com/profile.php?id=61579534023491",
  },
  {
    id: 3,
    icon: "fab fa-pinterest-p",
    href: "#",
  },
  {
    id: 4,
    icon: "fab fa-instagram",
    href: "https://www.instagram.com/mesobfinancial?igsh=eWNoNWNoaG45cHI0",
  },
  {
    id: 4,
    icon: "fab fa-tiktok",
    href: "https://www.tiktok.com/@mesob85?_t=ZT-8yzttOuwr1r&_r=1",
  },
];

const headerData = {
  logo,
  navItems,
  loginButton: {
    text: "Sign In/Sign Up",
    href: "https://app.mesobfinancial.com",
  },
  socials,
};

export default headerData;
