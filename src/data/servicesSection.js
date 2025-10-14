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
      icon: "fas fa-truck", // FontAwesome truck icon
      href: "https://app.mesobfinancial.com/login",
      text: "Do it yourself accounting — track freight income, fuel, repairs, and receipts.",
    },
    {
      id: 2,
      title: "Groceries",
      icon: "fas fa-shopping-cart", // Shopping cart icon
      href: "https://app.mesobfinancial.com/login",
      text: "Do it yourself accounting — track daily sales, supplier costs, and receipts.",
    },
    {
      id: 3,
      title: "RIDESHARE",
      icon: "fas fa-car", // Car icon
      href: "https://app.mesobfinancial.com/login",
      text: "Do it yourself accounting — log fares income, fuel, repairs, and receipts",
    },
    {
      id: 4,
      title: "Individual/Households",
      icon: "fas fa-home", // Home icon
      href: "https://app.mesobfinancial.com/login",
      text: "Do it yourself accounting — track bills, family expenses, and receipts easily.",
    },
    {
      id: 5,
      title: "Cafe/Restaurants",
      icon: "fas fa-mug-hot", // Mug icon for cafes
      href: "https://app.mesobfinancial.com/login",
      text: "Do it yourself accounting — track sales, supplier costs, staff, and receipts.",
    },
    {
      id: 6,
      title: "Cleaning Services",
      icon: "fas fa-broom", // Broom icon for cleaning
      href: "https://app.mesobfinancial.com/login",
      text: "Do it yourself accounting — track jobs, supply costs, and payments efficiently.",
    },
    {
      id: 7,
      title: "Beauty & Grooming",
      icon: "fas fa-cut", // Scissors icon
      href: "https://app.mesobfinancial.com/login",
      text: "Do it yourself accounting — track client payments, product costs, and receipts.",
    },
    {
      id: 8,
      title: "E-commerce Sellers",
      icon: "fas fa-store", // Store icon
      href: "https://app.mesobfinancial.com/login",
      text: "Do it yourself accounting — track online sales, fees, shipping, and receipts.",
    },
    {
      id: 9,
      title: "Construction Trades",
      icon: "fas fa-hammer", // Hammer icon for trades
      href: "https://app.mesobfinancial.com/login",
      text: "Do it yourself accounting — track project expenses, worker pay, and receipts.",
    },
    {
      id: 10,
      title: "Content Creator",
      icon: "fas fa-video", // Video icon
      href: "https://app.mesobfinancial.com/login",
      text: "Do it yourself accounting — track earnings, expenses, sponsorships, and receipts easily.",
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
