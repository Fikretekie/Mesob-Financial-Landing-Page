import bg from "../assets/images/backgrounds/bac.PNG";

export const inputs = [
  {
    name: "name",
    type: "text",
    placeholder: "Full name",
    required: true,
  },
  {
    name: "email",
    type: "email",
    placeholder: "Email address",
    required: true,
  },
  {
    name: "phone",
    type: "text",
    placeholder: "Phone",
    required: false,
  },
  {
    name: "subject",
    type: "text",
    placeholder: "Subject",
    required: false,
  },
];

const common = {
  phone: "+1 (614) 966-5005",
  phoneHref: "+1 (614) 966-5005",
  email: "info@meksova.com",
};

export const contactOne = {
  bg,
  tagline: "contact with us",
  title: "We are Here to Help You & Your Business",
  text: "Pellentesque ultricies quam dui, id portt tor leo \n iaculis nec. Phasellus ac neque.",
  timeRange: "8:00 am - 6:00 pm",
  inputs,
  bottomTitle: "Visit Our Office",
  contacts: [
    {
      id: 1,
      title: "Austin",
      text: "22 Texas West Hills",
      ...common,
    },
    {
      id: 2,
      title: "Boston",
      text: "22 Texas West Hills",
      ...common,
    },
    {
      id: 3,
      title: "New York",
      text: "22 Texas West Hills",
      ...common,
    },
    {
      id: 4,
      title: "Dubai",
      text: "22 Texas West Hills",
      ...common,
    },
  ],
};

export const contactPage = {
  tagline: "CONTACT WITH US",
  title: "Have Any Question?",
  title2: "Write a Message",
  inputs,
  buttonText: "SEND A MESSAGE",
};

export const contactDetails = {
  title: "Get in Touch",
  text: "We're delivering the best customer experience",
  address: "3130 Westerville Rd, Columbus, OH 43224",
  addressLabel: "Our Office",
  phoneIcon: "fas fa-phone",
  locationIcon: "fas fa-map-marker-alt",
  ...common,
};

