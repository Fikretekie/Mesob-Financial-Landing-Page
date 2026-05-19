import { useTranslation } from "react-i18next";

const featureMeta = [
  { id: 1, key: "truck", icon: "fas fa-truck", href: "https://app.meksova.com/signup" },
  { id: 2, key: "groceries", image: "services-1-5.jpg", icon: "fas fa-shopping-cart", href: "https://app.meksova.com/signup" },
  { id: 3, key: "rideshare", icon: "fas fa-car", href: "https://app.meksova.com/signup" },
  { id: 4, key: "households", icon: "fas fa-home", href: "https://app.meksova.com/signup" },
  { id: 5, key: "cafe", icon: "fas fa-mug-hot", href: "https://app.meksova.com/signup" },
  { id: 6, key: "cleaning", icon: "fas fa-broom", href: "https://app.meksova.com/signup" },
  { id: 7, key: "beauty", icon: "fas fa-cut", href: "https://app.meksova.com/signup" },
  { id: 8, key: "ecommerce", icon: "fas fa-store", href: "https://app.meksova.com/signup" },
  { id: 9, key: "construction", icon: "fas fa-hammer", href: "https://app.meksova.com/signup" },
  { id: 10, key: "contentCreator", icon: "fas fa-video", href: "https://app.meksova.com/signup" },
  { id: 11, key: "other", icon: "fas fa-briefcase", href: "https://app.meksova.com/signup" },
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
