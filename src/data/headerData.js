import logo from "@/images/resources/logo-1.png";

const home = {
  id: 1,
  name: "Home",
  href: "/",
  subNavItems: [
    {
      id: 1,
      name: "Home One",
      href: "/",
    },
    {
      id: 2,
      name: "Home Two",
      href: "/index-2",
    },
    {
      id: 3,
      name: "Home Three",
      href: "/index-3",
    },
    {
      id: 4,
      name: "OnePage Styles",
      href: "",
      subItems: [
        {
          id: 1,
          name: "Home One",
          href: "/index-one-page",
        },
        { id: 2, name: "Home Two", href: "/index-2-one-page" },
        { id: 3, name: "Home Three", href: "/index-3-one-page" },
      ],
    },
    {
      id: 5,
      name: "Header Styles",
      href: "",
      subItems: [
        { id: 1, name: "Header One", href: "/" },
        { id: 2, name: "Header Two", href: "/index-2" },
        { id: 3, name: "Header Three", href: "/index-3" },
      ],
    },
  ],
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
  { id: 1, name: "Services", href: "/services" },
  { id: 2, name: "Services Two", href: "/services-2" },
  { id: 3, name: "Services Three", href: "/services-3" },
  { id: 4, name: "Consumer Product", href: "/consumer-product" },
  { id: 5, name: "Audit Marketing", href: "/audit-marketing" },
  { id: 6, name: "Banking Advising", href: "/banking-advising" },
  { id: 7, name: "Business Growth", href: "/business-growth" },
  { id: 8, name: "Financial Advice", href: "/financial-advice" },
  { id: 9, name: "Marketing Rules", href: "/marketing-rules" },
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
    name: "Pages",
    href: "",
    subNavItems: [
      { id: 1, name: "About", href: "/about" },
      { id: 2, name: "Team", href: "/team" },
      { id: 3, name: "Team Two", href: "/team-2" },
      { id: 4, name: "Testimonials", href: "/testimonials" },
      { id: 5, name: "FAQs", href: "/faq" },
      { id: 6, name: "404 Error", href: "/404" },
    ],
  },
  {
    id: 4,
    name: "Cases",
    href: "/cases",
    subNavItems: [
      { id: 1, name: "Cases", href: "/cases" },
      { id: 2, name: "Cases Two", href: "/cases-2" },
      { id: 3, name: "Case Details", href: "/case-details" },
    ],
  },
  {
    id: 5,
    name: "Blog",
    href: "/blog",
    subNavItems: [
      { id: 1, name: "Blog Posts", href: "/blog" },
      { id: 2, name: "Blog Two", href: "/blog-2" },
      {
        id: 3,
        name: "Blog Sidebar",
        href: "/blog-sidebar",
        subItems: [
          { id: 1, name: "Blog Right Sidebar", href: "/blog-sidebar" },
          { id: 2, name: "Blog Left Sidebar", href: "/blog-sidebar-right" },
        ],
      },
      { id: 4, name: "Blog Details", href: "/blog-details" },
    ],
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
  phone: "+1- ( 246 ) 333 - 0079",
  phoneHref: "12463330079",
  email: "needhelp@oslim.com",
  socials,
};

export default headerData;
