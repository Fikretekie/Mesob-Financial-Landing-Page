import logo from "@/images/resources/logo-1.png";

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

export const servicesSubNavItems = [

];

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
    id: 1,
    icon: "fab fa-twitter",
    href: "#",
  },
  {
    id: 2,
    icon: "fab fa-facebook-square",
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
];

const headerData = {
  logo,
  navItems,
  callText: "Need help? Talk to an expert",
  phone: "+1 (571) 216-3509",
  phoneHref: "12463330079",
  email: "needhelp@oslim.com",
  socials,
};

export default headerData;
