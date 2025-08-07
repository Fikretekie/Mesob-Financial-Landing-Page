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
  title: "Services We Offers",
  services: [
    {
      id: 1,
      title: "Truck",
      image: "services-1-4.jpg",
      icon: "icon-mobile-analytics",
      href: "https://app.mesobfinancial.com/login",
      text: "Reliable and affordable truck financing solutions to keep your business moving without financial hurdles.",
    },
    {
      id: 2,
      title: "Groceries",
      image: "services-1-5.jpg",
      icon: "icon-analysis",
      href: "https://app.mesobfinancial.com/login",
      text: "Convenient grocery financing options to help you stock up on essentials with flexible payment plans.",
    },
    {
      id: 3,
      title: "RIDESHARE DRIVERS/PARTNERS",
      image: "services-1-6.jpg",
      icon: "icon-creative-1",
      href: "https://app.mesobfinancial.com/login",
      text: "A range of financial solutions tailored to support various business and personal needs.",
    },
    {
      id: 4,
      title: "Individual/Households",
      image: "services-1-6.jpg",
      icon: "icon-creative-1",
      href: "https://app.mesobfinancial.com/login",
      text: "A range of financial solutions tailored to support various business and personal needs.",
    },
    {
      id: 5,
      title: "Cafe",
      image: "services-1-6.jpg",
      icon: "icon-creative-1",
      href: "https://app.mesobfinancial.com/login",
      text: "A range of financial solutions tailored to support various business and personal needs.",
    },
    {
      id: 6,
      title: "Cleaning Services",
      image: "services-1-6.jpg",
      icon: "icon-creative-1",
      href: "https://app.mesobfinancial.com/login",
      text: "A range of financial solutions tailored to support various business and personal needs.",
    },
    {
      id: 7,
      title: "⁠Beauty & Grooming",
      image: "services-1-6.jpg",
      icon: "icon-creative-1",
      href: "https://app.mesobfinancial.com/login",
      text: "A range of financial solutions tailored to support various business and personal needs.",
    },
    {
      id: 8,
      title: "E-commerce Sellers",
      image: "services-1-6.jpg",
      icon: "icon-creative-1",
      href: "https://app.mesobfinancial.com/login",
      text: "A range of financial solutions tailored to support various business and personal needs.",
    },
    {
      id: 9,
      title: "Construction Trades",
      image: "services-1-6.jpg",
      icon: "icon-creative-1",
      href: "https://app.mesobfinancial.com/login",
      text: "A range of financial solutions tailored to support various business and personal needs.",
    },
    {
      id: 10,
      title: "Content Creator",
      image: "services-1-6.jpg",
      icon: "icon-creative-1",
      href: "https://app.mesobfinancial.com/login",
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
  phone: "+1 (614) 966-5005",
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
