import { useTranslation } from "react-i18next";

const featureMeta = [
  { id: 1, key: "truck", icon: "fas fa-truck", href: "/demo/truck/" },
  { id: 2, key: "groceries", image: "services-1-5.jpg", icon: "fas fa-shopping-cart", href: "/demo/groceries/" },
  { id: 3, key: "rideshare", icon: "fas fa-car", href: "/demo/rideshare/" },
  { id: 4, key: "households", icon: "fas fa-home", href: "/demo/households/" },
  { id: 5, key: "cafe", icon: "fas fa-mug-hot", href: "/demo/cafe/" },
  { id: 6, key: "cleaning", icon: "fas fa-broom", href: "/demo/cleaning/" },
  { id: 7, key: "beauty", icon: "fas fa-cut", href: "/demo/beauty/" },
  { id: 8, key: "ecommerce", icon: "fas fa-store", href: "/demo/ecommerce/" },
  { id: 9, key: "construction", icon: "fas fa-hammer", href: "/demo/construction/" },
  { id: 10, key: "contentCreator", icon: "fas fa-video", href: "/demo/content-creator/" },
  { id: 11, key: "other", icon: "fas fa-briefcase", href: "/demo/other/" },
];

export const useBusinessTypes = () => {
  const { t } = useTranslation();
  const types = t("businessTypes", { returnObjects: true });

  if (!Array.isArray(types)) {
    return featureMeta.map((meta) => ({
      ...meta,
      title: meta.key,
      text: "",
    }));
  }

  return featureMeta.map((meta, index) => {
    const translated = types.find((item) => item.id === meta.key) || types[index] || {};
    return {
      ...meta,
      title: translated.title || meta.key,
      text: translated.text || "",
    };
  });
};

export default useBusinessTypes;
