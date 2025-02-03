import image1 from "@/images/services/service-details-img-1.jpg";
import image3 from "@/images/services/service-details-img-2.jpg";
import image6 from "@/images/services/service-details-img-3.jpg";
import image4 from "@/images/services/service-details-img-4.jpg";
import image2 from "@/images/services/service-details-img-5.jpg";
import image5 from "@/images/services/service-details-img-6.jpg";
import { faqs } from "./fAQsPage";
import { servicesSubNavItems } from "./headerData";

export const servicesOne = {
  tagline: "Our Services",
  title: "Services We Offer",
  services: [
    // {
    //   id: 1,
    //   title: "Consumer \n Product",
    //   image: "services-1-1.jpg",
    //   icon: "icon-creative",
    //   href: "/consumer-product",
    //   text: "Lorem ipsum dolor sit donec amet tristique ante vel sem dictum is rhoncus elit sed.",
    // },
    // {
    //   id: 2,
    //   title: "Banking \n Advising",
    //   image: "services-1-2.jpg",
    //   icon: "icon-business",
    //   href: "/banking-advising",
    //   text: "Lorem ipsum dolor sit donec amet tristique ante vel sem dictum is rhoncus elit sed.",
    // },
    // {
    //   id: 3,
    //   title: "Marketing \n Rules",
    //   image: "services-1-3.jpg",
    //   icon: "icon-global",
    //   href: "/marketing-rules",
    //   text: "Lorem ipsum dolor sit donec amet tristique ante vel sem dictum is rhoncus elit sed.",
    // },
    {
      id: 4,
      title: "Truck",
      image: "services-1-4.jpg",
      icon: "icon-mobile-analytics",
      href: "/business-growth",
      text: "Reliable and affordable truck financing solutions to keep your business moving without financial hurdles.",
    },
    {
      id: 5,
      title: "Groceries",
      image: "services-1-5.jpg",
      icon: "icon-analysis",
      href: "audit-marketing",
      text: "Convenient grocery financing options to help you stock up on essentials with flexible payment plans.",
    },
    {
      id: 6,
      title: "Services",
      image: "services-1-6.jpg",
      icon: "icon-creative-1",
      href: "/financial-advice",
      text: "A range of financial solutions tailored to support various business and personal needs.",
    },
  ],
};

export const servicesTwo = {
  title: "Our Services",
  tagline: "Services We Offer",
  text: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised.",
  services: [
    {
      id: 1,
      icon: "icon-creative",
      title: "Consumer \n Product",
      href: "/consumer-product",
      text: "Lorem ipsum is are \n many variations of \n pass of majority.",
    },
    {
      id: 2,
      icon: "icon-analysis",
      title: "Audit \n Marketing",
      href: "/audit-marketing",
      text: "Lorem ipsum is are \n many variations of \n pass of majority.",
    },
    {
      id: 3,
      icon: "icon-business",
      title: "Banking \n Advising",
      href: "/banking-advising",
      text: "Lorem ipsum is are \n many variations of \n pass of majority.",
    },
    {
      id: 4,
      icon: "icon-global",
      title: "Marketing \n Rules",
      href: "/marketing-rules",
      text: "Lorem ipsum is are \n many variations of \n pass of majority.",
    },
    {
      id: 5,
      icon: "icon-verification",
      title: "Trucking",
      href: "/consumer-product",
      text: "Lorem ipsum is are \n many variations of \n pass of majority.",
    },
    {
      id: 6,
      icon: "icon-bank",
      title: "wealth Management",
      href: "/audit-marketing",
      text: "Lorem ipsum is are \n many variations of \n pass of majority.",
    },
    {
      id: 7,
      icon: "icon-report1",
      title: "financial advice",
      href: "/banking-advising",
      text: "Lorem ipsum is are \n many variations of \n pass of majority.",
    },
    {
      id: 8,
      icon: "icon-travel",
      title: "Travel & Hospitality",
      href: "/marketing-rules",
      text: "Lorem ipsum is are \n many variations of \n pass of majority.",
    },
  ],
};

export const serviceDetailsSidebar = {
  navItems: servicesSubNavItems.slice(3),
  title: "Contact with \n us for any \n advice",
  phoneIcon: "icon-phone-call",
  text: "Need help? Talk to an expert",
  phone: "+1 (571) 216-3509",
  phoneHref: "12463330079",
};

const commonServiceDerails = {
  icon: "icon-global",
  title2: "Welcome to Mesob Financial – Simple Accounting for Truck Owners",
  text: "Managing your trucking finances is easy with Mesob Financial. Enter your financial details directly on our website and keep track of income, expenses, and balances effortlessly.",

  contents: [
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.",
  ],
  howHelps: [
    {
      id: 1,
      image: "service-details-how-help-1.jpg",
      text: "Pellentesque pharetra ornare dui, non malesuada magna convallis vitae.",
    },
    {
      id: 2,
      image: "service-details-how-help-2.jpg",
      text: " Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.",
      points: [
        "In id diam nec nisi congue tincidunt",
        "Sed tristique lorem non tesque",
      ],
    },
  ],
  faqs,
};

export const consumerProduct = {
  image: image1,
  title: "Consumer Product",
  ...commonServiceDerails,
};

export const auditMarketing = {
  image: image2,
  title: "Audit Marketing",
  ...commonServiceDerails,
};

export const bankingAdvising = {
  image: image3,
  title: "Banking Advising",
  ...commonServiceDerails,
};

export const businessGrowth = {
  image: image4,
  title: "Trucking",
  ...commonServiceDerails,
};

export const financialAdvice = {
  image: image5,
  title: "Financial Advice",
  ...commonServiceDerails,
};

export const marketingRules = {
  image: image6,
  title: "Marketing Rules",
  ...commonServiceDerails,
};
