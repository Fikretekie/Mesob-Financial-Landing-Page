import image from "@/images/case/case-details-img-1.jpg";

export const cases = [
  {
    id: 1,
    image: "case-1-1.jpg",
    image2: "case-3-1.jpg",
    tagline: "leadership",
    title: "Businesses \n Growth",
  },
  {
    id: 2,
    image: "case-1-2.jpg",
    image2: "case-3-2.jpg",
    tagline: "Management",
    title: "Marketing \n Advice",
  },
  {
    id: 3,
    image: "case-1-3.jpg",
    image2: "case-3-3.jpg",
    tagline: "strategy",
    title: "Finance \n Consulting",
  },
  {
    id: 4,
    image: "case-1-4.jpg",
    tagline: "growth",
    title: "Digital \n Campaigns",
  },
  {
    id: 5,
    image: "case-1-5.jpg",
    tagline: "marketing",
    title: "Substantial \n Business",
  },
  {
    id: 6,
    image: "case-1-6.jpg",
    tagline: "briliant",
    title: "Top-Notch \n Consulting",
  },
  {
    id: 7,
    image: "case-1-2.jpg",
    tagline: "Management",
    title: "Marketing \n Advice",
  },
  {
    id: 8,
    image: "case-1-3.jpg",
    tagline: "strategy",
    title: "Finance \n Consulting",
  },
  {
    id: 9,
    image: "case-1-4.jpg",
    tagline: "growth",
    title: "Digital \n Campaigns",
  },
];

export const caseOne = {
  tagline: "Our recent work",
  title: "New Case Studies",
  cases,
};

export const similarCase = {
  tagline: "more works",
  title: "Similar Cases",
  cases: cases.slice(3, 6),
};

export const caseDetailsPage = {
  image,
  clientName: "Jessica Brown",
  category: "Marketing, Consulting",
  date: "20 October, 2022",
  title: "Marketing Advice",
  text1:
    "Need something changed or is there something not quite working the way you envisaged? Is your van a little old and tired and need refreshing? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  text2:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. Ut enim ad minim veniam.",
  text3:
    "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat. There are many variations of passages.",
  text4:
    "When an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap.",
  points: [
    "Is your van a little old and tired.",
    "Lorem Ipsum is simply dummy text.",
    "When an unknown printer took.",
    "Has survived not only five centuries.",
    "The leap into electronic typesetting.",
  ],
};
