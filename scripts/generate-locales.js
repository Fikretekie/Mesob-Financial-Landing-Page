/**
 * Generates locale JSON files from en.json + per-language overrides.
 * Run: node scripts/generate-locales.js
 */
const fs = require("fs");
const path = require("path");

const localesDir = path.join(__dirname, "../src/i18n/locales");
const en = JSON.parse(fs.readFileSync(path.join(localesDir, "en.json"), "utf8"));

const deepMerge = (base, override) => {
  if (!override) return base;
  const out = Array.isArray(base) ? [...base] : { ...base };
  for (const key of Object.keys(override)) {
    if (
      override[key] &&
      typeof override[key] === "object" &&
      !Array.isArray(override[key]) &&
      base[key] &&
      typeof base[key] === "object" &&
      !Array.isArray(base[key])
    ) {
      out[key] = deepMerge(base[key], override[key]);
    } else {
      out[key] = override[key];
    }
  }
  return out;
};

const biz = (items) => ({ businessTypes: items });

const am = {
  common: {
    meta: {
      defaultDescription:
        "ሜክሶቫ ለአነስተኛ ንግዶች ደረሰኞችን፣ ገቢን እና ወጪዎችን በቀላል፣ ለታክስ ዝግጁ የመዝገብ ስራ ያግዛል።",
    },
    breadcrumb: { home: "መነሻ" },
    titleSubtitle:
      "ወጪዎችን ይከታተሉ፣ ለታክስ ዝግጁ ሪፖርቶችን ይፍጠሩ እና ደረሰኞችን በቀላሉ ያስተዳድሩ — ለአነስተኛ ንግድ ባለቤቶች የተሠራ። ወዲያውኑ ይጀምሩ",
    videoUnsupported: "አሳሽዎ የቪዲዮ መለያውን አይደግፍም።",
    formRequired: "ይህ መስክ ያስፈልጋል።",
    reviews: "ግምገማዎች",
    review: "ግምገማ",
  },
  header: {
    nav: { home: "መነሻ", services: "አገልግሎቶች", about: "ስለ እኛ", contact: "እውቂያ" },
    login: "ግባ",
    signup: "በነጻ ይጀምሩ",
  },
  search: { label: "እዚህ ይፈልጉ", placeholder: "እዚህ ይፈልጉ...", submitAria: "ፍለጋ ላክ" },
  footer: {
    tagline: "የንግድዎን የገንዘብ ወደፊት እንነቃ።",
    explore: "ያስሱ",
    contact: "እውቂያ",
    links: { about: "ስለ እኛ", terms: "የአጠቃቀም ውሎች", privacy: "የግላዊነት ፖሊሲ", content: "ይዘት" },
    copyright: "© የቅጂ መብት {{year}} በ{{author}}። ሁሉም መብቶች የተጠበቁ ናቸው።",
  },
  home: {
    meta: {
      description:
        "ሜክሶቫ ለአነስተኛ ንግዶች ቀላል የመዝገብ መተግበሪያ ነው—ደረሰኞች፣ ወጪዎች እና የታክስ ወቅት በአንድ ቦታ።",
    },
    hero: {
      tagline: "ወደ meksova እንኳን በደህና መጡ",
      title: "ትርፍዎን በደቂቃዎች ይመልከቱ — የቀጥታ ዴሞን ይሞክሩ",
      ctaDemo: "ዴሞ ይሞክሩ — ምዝገባ አያስፈልግም",
      ctaTrial: "30 ቀን ነጻ ሙከራ ይጀምሩ",
      trialNote: "ክሬዲት ካርድ አያስፈልግም። ሙሉ መዳረሻ ለ30 ቀናት።",
      businessTypesTitle: "የንግድ አይነትዎን ይምረጡ",
      videoPlay: "አጫውት", videoPause: "አቁም", videoMute: "ድምጽ አጥፋ", videoUnmute: "ድምጽ አብራ",
    },
    testimonials: {
      heading: "በመቶዎች የታመነ",
      headingHighlight: "አነስተኛ ንግድ ባለቤቶች",
    },
  },
  ...biz([
    { id: "truck", title: "መኪና አጓጓዥ", text: "በራስዎ የሂሳብ ስራ — የጭነት ገቢ፣ ነዳጅ፣ ጥገና እና ደረሰኞችን ይከታተሉ።" },
    { id: "groceries", title: "ግሮሰሪ", text: "በራስዎ የሂሳብ ስራ — ዕለታዊ ሽያጭ፣ የአቅራቢ ወጪ እና ደረሰኞችን ይከታተሉ።" },
    { id: "rideshare", title: "ራይድሼር አሽከርካሪዎች", text: "በራስዎ የሂሳብ ስራ — የጉዞ ገቢ፣ ነዳጅ፣ ጥገና እና ደረሰኞችን ይመዝግቡ።" },
    { id: "households", title: "ግለሰብ/ቤተሰብ", text: "በራስዎ የሂሳብ ስራ — ቢሎችን፣ የቤት ወጪዎችን እና ደረሰኞችን በቀላሉ ይከታተሉ።" },
    { id: "cafe", title: "ካፌ / ሬስቶራንት", text: "በራስዎ የሂሳብ ስራ — ሽያጭ፣ የአቅራቢ ወጪ፣ ሰራተኞች እና ደረሰኞችን ይከታተሉ።" },
    { id: "cleaning", title: "የጽዳት አገልግሎት", text: "በራስዎ የሂሳብ ስራ — ስራዎች፣ የአቅርቦት ወጪ እና ክፍያዎችን ይከታተሉ።" },
    { id: "beauty", title: "ውበት እና ጥገና", text: "በራስዎ የሂሳብ ስራ — የደንበኛ ክፍያ፣ የምርት ወጪ እና ደረሰኞችን ይከታተሉ።" },
    { id: "ecommerce", title: "ኢ-ኮሜርስ", text: "በራስዎ የሂሳብ ስራ — የመስመር ሽያጭ፣ ክፍያዎች፣ ማጓጓዣ እና ደረሰኞችን ይከታተሉ።" },
    { id: "construction", title: "የግንባታ ሙያ", text: "በራስዎ የሂሳብ ስራ — የፕሮጀክት ወጪ፣ የሰራተኛ ደመወዝ እና ደረሰኞችን ይከታተሉ።" },
    { id: "contentCreator", title: "ይዘት ፈጣሪ", text: "በራስዎ የሂሳብ ስራ — ገቢ፣ ወጪ፣ ስፖንሰርሺፕ እና ደረሰኞችን ይከታተሉ።" },
    { id: "other", title: "ሌሎች ንግዶች", text: "በራስዎ የሂሳብ ስራ — ማንኛውንም ንግድ ገቢ፣ ወጪ እና ደረሰኞችን ይከታተሉ።" },
  ]),
  services: {
    meta: {
      title: "አገልግሎቶች - Meksova",
      description: "ሜክሶቫ የሚደግፋቸው የንግድ አይነቶች።",
    },
    pageTitle: "አገልግሎቶቻችን",
    tagline: "አገልግሎቶቻችን",
    title: "የምናቀርባቸው አገልግሎቶች",
  },
  about: {
    meta: {
      title: "ስለ እኛ - Meksova",
      description: "ስለ Meksova እና ቀላል የመዝገብ ስራ ይወቁ።",
    },
    pageTitle: "ስለ እኛ",
    pageBreadcrumb: "ስለ እኛ",
    story: {
      tagline: "ስለ meksova",
      titlePrefix: "አብረው ይሰሩ ለ ",
      titleHighlight: "ንግድዎ",
      missionTitle: "ተልዕኮችን ለመጠበቅ \n ንግድዎን እና ብዙ ተጨማሪ",
    },
  },
  ourMission: {
    trustedHeading: "በመቶዎች የታመነ",
    trustedHighlight: "አነስተኛ ንግድ ባለቤቶች",
    title: "ተልዕኮችን ለመጠበቅ ንግድዎን &",
    titleHighlight: "ብዙ ተጨማሪ",
    cta: "ተጨማሪ ያግኙ",
    watermark: "ዓለም አቀፍ ፋይናንስ",
  },
  contact: {
    meta: { title: "እውቂያ - Meksova", description: "ለጥያቄዎች እና ድጋፍ ያግኙን።" },
    pageTitle: "እውቂያ",
    details: {
      title: "ያግኙን",
      text: "ምርጥ የደንበኛ ልምድ እናቀርባለን",
      addressLabel: "ቢሮአችን",
    },
    form: {
      tagline: "ከእኛ ጋር ያግኙ",
      title: "ጥያቄ አለዎት?",
      titleAlt: "መልዕክት ይጻፉ",
      submit: "መልዕክት ላክ",
      fields: {
        fullName: "ሙሉ ስም",
        email: "ኢሜይል",
        phone: "ስልክ",
        subject: "ርዕስ",
        message: "መልዕክት ይጻፉ",
        messagePlaceholder: "ንግድዎን እንዴት ልንረዳዎት?",
      },
    },
  },
  faq: { meta: { title: "ተደጋጋሚ ጥያቄዎች" }, pageTitle: "ተደጋጋሚ ጥያቄዎች" },
  error: {
    meta: { title: "404 ስህተት" },
    pageTitle: "404 ስህተት",
    tagline: "ይቅርታ፣ ያን ገጽ ማግኘት አልቻልንም!",
    text: "የሚፈልጉት ገጽ አልነበረም።",
    searchPlaceholder: "እዚህ ይፈልጉ",
    backHome: "ወደ መነሻ ተመለስ",
  },
  marketingRules: { title: "የግብይት ህጎች", breadcrumbParent: "አገልግሎቶች", breadcrumbPage: "ዝርዝር" },
};

// Spanish, French, Arabic, Somali, Tigrinya - key UI overrides (legal falls back to English merge with translated titles)
const es = {
  common: {
    meta: { defaultDescription: "Meksova ayuda a las pequeñas empresas a registrar recibos, ingresos y gastos con contabilidad simple y lista para impuestos." },
    breadcrumb: { home: "Inicio" },
    titleSubtitle: "Registre gastos, genere informes listos para impuestos y gestione recibos sin esfuerzo — diseñado para pequeños negocios. Empiece ahora",
    formRequired: "Este campo es obligatorio.",
    reviews: "reseñas", review: "reseña",
  },
  header: { nav: { home: "Inicio", services: "Servicios", about: "Nosotros", contact: "Contacto" }, login: "Iniciar sesión", signup: "Comience gratis" },
  search: { label: "buscar aquí", placeholder: "Buscar aquí...", submitAria: "enviar búsqueda" },
  footer: {
    tagline: "Impulsando el futuro financiero de su negocio.",
    explore: "Explorar", contact: "Contacto",
    links: { about: "Nosotros", terms: "Términos de uso", privacy: "Política de privacidad", content: "Contenido" },
    copyright: "© Copyright {{year}} por {{author}}. Todos los derechos reservados.",
  },
  home: {
    meta: { description: "Meksova es una app de contabilidad fácil para pequeños negocios—recibos, gastos e impuestos en un solo lugar." },
    hero: {
      tagline: "bienvenido a meksova",
      title: "Vea sus ganancias en minutos — Pruebe nuestra demo en vivo",
      ctaDemo: "Probar demo — Sin registro",
      ctaTrial: "Prueba gratis de 30 días",
      trialNote: "No se requiere tarjeta de crédito. Acceso completo por 30 días.",
      businessTypesTitle: "Seleccione su tipo de negocio",
    },
    testimonials: { heading: "Con la confianza de cientos de", headingHighlight: "propietarios de pequeños negocios" },
  },
  ...biz([
    { id: "truck", title: "Camión", text: "Contabilidad DIY — registre ingresos de flete, combustible, reparaciones y recibos." },
    { id: "groceries", title: "Tiendas", text: "Contabilidad DIY — ventas diarias, costos de proveedores y recibos." },
    { id: "rideshare", title: "Conductores de rideshare", text: "Contabilidad DIY — tarifas, combustible, reparaciones y recibos." },
    { id: "households", title: "Hogares", text: "Contabilidad DIY — facturas, gastos familiares y recibos fácilmente." },
    { id: "cafe", title: "Café / Restaurantes", text: "Contabilidad DIY — ventas, proveedores, personal y recibos." },
    { id: "cleaning", title: "Limpieza", text: "Contabilidad DIY — trabajos, suministros y pagos." },
    { id: "beauty", title: "Belleza", text: "Contabilidad DIY — pagos de clientes, productos y recibos." },
    { id: "ecommerce", title: "E-commerce", text: "Contabilidad DIY — ventas online, comisiones, envío y recibos." },
    { id: "construction", title: "Construcción", text: "Contabilidad DIY — gastos de proyecto, nómina y recibos." },
    { id: "contentCreator", title: "Creador de contenido", text: "Contabilidad DIY — ingresos, gastos, patrocinios y recibos." },
    { id: "other", title: "Otros negocios", text: "Contabilidad DIY — ingresos, gastos y recibos de cualquier negocio." },
  ]),
  services: { pageTitle: "Nuestros servicios", tagline: "Nuestros servicios", title: "Servicios que ofrecemos", meta: { title: "Servicios - Meksova", description: "Tipos de negocio que apoya Meksova." } },
  about: { pageTitle: "Sobre nosotros", pageBreadcrumb: "Nosotros", story: { tagline: "Sobre meksova", titlePrefix: "Trabajemos juntos por ", titleHighlight: "su negocio", missionTitle: "Misión: proteger \n su negocio y mucho más" }, meta: { title: "Nosotros - Meksova", description: "Conozca Meksova y nuestra contabilidad simple." } },
  ourMission: { trustedHeading: "Con la confianza de cientos de", trustedHighlight: "propietarios de pequeños negocios", title: "Misión: proteger su negocio &", titleHighlight: "Mucho más", cta: "DESCUBRIR MÁS", watermark: "Finanzas globales" },
  contact: { pageTitle: "Contacto", meta: { title: "Contacto - Meksova", description: "Contáctenos para soporte o alianzas." }, details: { title: "Contáctenos", text: "Ofrecemos la mejor experiencia al cliente", addressLabel: "Nuestra oficina" }, form: { tagline: "CONTÁCTENOS", title: "¿Tiene alguna pregunta?", titleAlt: "Escriba un mensaje", submit: "ENVIAR MENSAJE", fields: { fullName: "Nombre completo", email: "Correo electrónico", phone: "Teléfono", subject: "Asunto", message: "Escriba un mensaje", messagePlaceholder: "¿Cómo podemos ayudar a su negocio?" } } },
  faq: { meta: { title: "Preguntas frecuentes" }, pageTitle: "Preguntas frecuentes" },
  error: { meta: { title: "Error 404" }, pageTitle: "Error 404", tagline: "¡Lo sentimos, no encontramos esa página!", text: "La página que busca no existió.", searchPlaceholder: "Buscar aquí", backHome: "volver al inicio" },
  marketingRules: { title: "Reglas de marketing", breadcrumbParent: "Servicios", breadcrumbPage: "Detalles" },
};

const fr = {
  common: {
    meta: { defaultDescription: "Meksova aide les petites entreprises à suivre reçus, revenus et dépenses avec une comptabilité simple et prête pour les impôts." },
    breadcrumb: { home: "Accueil" },
    titleSubtitle: "Suivez les dépenses, générez des rapports fiscaux et gérez les reçus — conçu pour les petites entreprises. Commencez maintenant",
    formRequired: "Ce champ est obligatoire.",
    reviews: "avis", review: "avis",
  },
  header: { nav: { home: "Accueil", services: "Services", about: "À propos", contact: "Contact" }, login: "Connexion", signup: "Commencer gratuitement" },
  search: { label: "rechercher ici", placeholder: "Rechercher ici...", submitAria: "envoyer la recherche" },
  footer: {
    tagline: "Propulser l'avenir financier de votre entreprise.",
    explore: "Explorer", contact: "Contact",
    links: { about: "À propos", terms: "Conditions d'utilisation", privacy: "Politique de confidentialité", content: "Contenu" },
    copyright: "© Copyright {{year}} par {{author}}. Tous droits réservés.",
  },
  home: {
    meta: { description: "Meksova est une application de comptabilité facile pour les petites entreprises." },
    hero: {
      tagline: "bienvenue sur meksova",
      title: "Voyez vos profits en minutes — Essayez notre démo en direct",
      ctaDemo: "Essayer la démo — Sans inscription",
      ctaTrial: "Essai gratuit de 30 jours",
      trialNote: "Aucune carte de crédit requise. Accès complet pendant 30 jours.",
      businessTypesTitle: "Sélectionnez votre type d'entreprise",
    },
    testimonials: { heading: "Approuvé par des centaines de", headingHighlight: "propriétaires de petites entreprises" },
  },
  ...biz([
    { id: "truck", title: "Camion", text: "Comptabilité DIY — suivez revenus fret, carburant, réparations et reçus." },
    { id: "groceries", title: "Épicerie", text: "Comptabilité DIY — ventes quotidiennes, fournisseurs et reçus." },
    { id: "rideshare", title: "Chauffeurs VTC", text: "Comptabilité DIY — courses, carburant, réparations et reçus." },
    { id: "households", title: "Foyers", text: "Comptabilité DIY — factures, dépenses familiales et reçus." },
    { id: "cafe", title: "Café / Restaurants", text: "Comptabilité DIY — ventes, fournisseurs, personnel et reçus." },
    { id: "cleaning", title: "Nettoyage", text: "Comptabilité DIY — travaux, fournitures et paiements." },
    { id: "beauty", title: "Beauté", text: "Comptabilité DIY — paiements clients, produits et reçus." },
    { id: "ecommerce", title: "E-commerce", text: "Comptabilité DIY — ventes en ligne, frais, livraison et reçus." },
    { id: "construction", title: "Construction", text: "Comptabilité DIY — dépenses projet, salaires et reçus." },
    { id: "contentCreator", title: "Créateur de contenu", text: "Comptabilité DIY — revenus, dépenses, sponsors et reçus." },
    { id: "other", title: "Autres entreprises", text: "Comptabilité DIY — revenus, dépenses et reçus pour tout commerce." },
  ]),
  services: { pageTitle: "Nos services", tagline: "Nos services", title: "Services que nous offrons", meta: { title: "Services - Meksova", description: "Types d'entreprises pris en charge par Meksova." } },
  about: { pageTitle: "À propos de nous", pageBreadcrumb: "À propos", story: { tagline: "À propos de meksova", titlePrefix: "Travaillons ensemble pour ", titleHighlight: "votre entreprise", missionTitle: "Mission : protéger \n votre entreprise et bien plus" }, meta: { title: "À propos - Meksova", description: "Découvrez Meksova et notre comptabilité simple." } },
  ourMission: { trustedHeading: "Approuvé par des centaines de", trustedHighlight: "propriétaires de petites entreprises", title: "Mission : protéger votre entreprise &", titleHighlight: "Bien plus", cta: "EN SAVOIR PLUS", watermark: "Finance mondiale" },
  contact: { pageTitle: "Contact", meta: { title: "Contact - Meksova", description: "Contactez Meksova pour le support ou les partenariats." }, details: { title: "Contactez-nous", text: "Nous offrons la meilleure expérience client", addressLabel: "Notre bureau" }, form: { tagline: "CONTACTEZ-NOUS", title: "Une question ?", titleAlt: "Écrire un message", submit: "ENVOYER LE MESSAGE", fields: { fullName: "Nom complet", email: "Adresse e-mail", phone: "Téléphone", subject: "Sujet", message: "Écrire un message", messagePlaceholder: "Comment pouvons-nous aider votre entreprise ?" } } },
  faq: { meta: { title: "FAQ" }, pageTitle: "FAQ" },
  error: { meta: { title: "Erreur 404" }, pageTitle: "Erreur 404", tagline: "Désolé, nous ne trouvons pas cette page !", text: "La page que vous recherchez n'a jamais existé.", searchPlaceholder: "Rechercher ici", backHome: "retour à l'accueil" },
  marketingRules: { title: "Règles marketing", breadcrumbParent: "Services", breadcrumbPage: "Détails" },
};

const ar = {
  common: {
    meta: { defaultDescription: "تساعد Meksova الشركات الصغيرة على تتبع الإيصالات والدخل والمصروفات بمحاسبة بسيطة جاهزة للضرائب." },
    breadcrumb: { home: "الرئيسية" },
    titleSubtitle: "تتبع المصروفات، وأنشئ تقارير جاهزة للضرائب، وأدر الإيصالات بسهولة — مصمم لأصحاب الأعمال الصغيرة. ابدأ الآن",
    formRequired: "هذا الحقل مطلوب.",
    reviews: "مراجعات", review: "مراجعة",
  },
  header: { nav: { home: "الرئيسية", services: "الخدمات", about: "من نحن", contact: "اتصل بنا" }, login: "تسجيل الدخول", signup: "ابدأ مجانًا" },
  search: { label: "ابحث هنا", placeholder: "ابحث هنا...", submitAria: "إرسال البحث" },
  footer: {
    tagline: "نُمكّن مستقبل أعمالك المالي.",
    explore: "استكشف", contact: "اتصل بنا",
    links: { about: "من نحن", terms: "شروط الاستخدام", privacy: "سياسة الخصوصية", content: "المحتوى" },
    copyright: "© حقوق النشر {{year}} بواسطة {{author}}. جميع الحقوق محفوظة.",
  },
  home: {
    meta: { description: "Meksova تطبيق محاسبة سهل للشركات الصغيرة — الإيصالات والمصروفات والضرائب في مكان واحد." },
    hero: {
      tagline: "مرحبًا بك في meksova",
      title: "شاهد أرباحك في دقائق — جرّب العرض التوضيحي المباشر",
      ctaDemo: "جرّب العرض — بدون تسجيل",
      ctaTrial: "ابدأ تجربة مجانية 30 يومًا",
      trialNote: "لا حاجة لبطاقة ائتمان. وصول كامل لمدة 30 يومًا.",
      businessTypesTitle: "اختر نوع عملك",
    },
    testimonials: { heading: "موثوق به من قبل مئات", headingHighlight: "أصحاب الأعمال الصغيرة" },
  },
  ...biz([
    { id: "truck", title: "شاحنات", text: "محاسبة ذاتية — تتبع دخل الشحن والوقود والإصلاحات والإيصالات." },
    { id: "groceries", title: "بقالة", text: "محاسبة ذاتية — مبيعات يومية وتكاليف الموردين والإيصالات." },
    { id: "rideshare", title: "سائقو مشاركة الرحلات", text: "محاسبة ذاتية — أجرة الرحلات والوقود والإصلاحات والإيصالات." },
    { id: "households", title: "أفراد/أسر", text: "محاسبة ذاتية — فواتير ومصروفات عائلية وإيصالات بسهولة." },
    { id: "cafe", title: "مقهى / مطاعم", text: "محاسبة ذاتية — مبيعات وموردين وموظفين وإيصالات." },
    { id: "cleaning", title: "خدمات تنظيف", text: "محاسبة ذاتية — أعمال ومستلزمات ومدفوعات." },
    { id: "beauty", title: "تجميل", text: "محاسبة ذاتية — مدفوعات العملاء والمنتجات والإيصالات." },
    { id: "ecommerce", title: "تجارة إلكترونية", text: "محاسبة ذاتية — مبيعات عبر الإنترنت ورسوم وشحن وإيصالات." },
    { id: "construction", title: "بناء", text: "محاسبة ذاتية — مصروفات المشاريع وأجور العمال والإيصالات." },
    { id: "contentCreator", title: "صانع محتوى", text: "محاسبة ذاتية — أرباح ومصروفات ورعاة وإيصالات." },
    { id: "other", title: "أعمال أخرى", text: "محاسبة ذاتية — دخل ومصروفات وإيصالات لأي عمل." },
  ]),
  services: { pageTitle: "خدماتنا", tagline: "خدماتنا", title: "الخدمات التي نقدمها", meta: { title: "الخدمات - Meksova", description: "أنواع الأعمال التي تدعمها Meksova." } },
  about: { pageTitle: "من نحن", pageBreadcrumb: "من نحن", story: { tagline: "عن meksova", titlePrefix: "نعمل معًا من أجل ", titleHighlight: "عملك", missionTitle: "مهمتنا حماية \n عملك والمزيد" }, meta: { title: "من نحن - Meksova", description: "تعرّف على Meksova ومحاسبتنا البسيطة." } },
  ourMission: { trustedHeading: "موثوق به من قبل مئات", trustedHighlight: "أصحاب الأعمال الصغيرة", title: "مهمتنا حماية عملك &", titleHighlight: "والمزيد", cta: "اكتشف المزيد", watermark: "تمويل عالمي" },
  contact: { pageTitle: "اتصل بنا", meta: { title: "اتصل بنا - Meksova", description: "تواصل مع Meksova للدعم أو الشراكات." }, details: { title: "تواصل معنا", text: "نقدم أفضل تجربة للعملاء", addressLabel: "مكتبنا" }, form: { tagline: "تواصل معنا", title: "هل لديك سؤال؟", titleAlt: "اكتب رسالة", submit: "إرسال الرسالة", fields: { fullName: "الاسم الكامل", email: "البريد الإلكتروني", phone: "الهاتف", subject: "الموضوع", message: "اكتب رسالة", messagePlaceholder: "كيف يمكننا مساعدة عملك؟" } } },
  faq: { meta: { title: "الأسئلة الشائعة" }, pageTitle: "الأسئلة الشائعة" },
  error: { meta: { title: "خطأ 404" }, pageTitle: "خطأ 404", tagline: "عذرًا، لا يمكننا العثور على هذه الصفحة!", text: "الصفحة التي تبحث عنها لم تكن موجودة.", searchPlaceholder: "ابحث هنا", backHome: "العودة للرئيسية" },
  marketingRules: { title: "قواعد التسويق", breadcrumbParent: "الخدمات", breadcrumbPage: "التفاصيل" },
};

const so = {
  common: {
    meta: { defaultDescription: "Meksova waxay ka caawisaa ganacsiyada yaryar inay la socdaan rasiidka, dakhliga, iyo kharashyada xisaab fudud oo diyaar u ah canshuurta." },
    breadcrumb: { home: "Guriga" },
    titleSubtitle: "La soco kharashka, samee warbixinnada canshuurta, oo maamul rasiidada — loogu talagalay milkiilayaasha ganacsiga yaryar. Bilow hadda",
    formRequired: "Goobtan waa lagama maarmaan.",
    reviews: "diiwaan", review: "diiwaan",
  },
  header: { nav: { home: "Guriga", services: "Adeegyada", about: "Naga", contact: "Nala soo xiriir" }, login: "Gal", signup: "Bilow bilaash" },
  search: { label: "halkan ka raadi", placeholder: "Halkan ka raadi...", submitAria: "dir raadinta" },
  footer: {
    tagline: "Waxaan awood siinaynaa mustaqbalka maaliyadeed ee ganacsigaaga.",
    explore: "Baadh", contact: "Xiriir",
    links: { about: "Naga", terms: "Shuruudaha isticmaalka", privacy: "Siyaasadda asturnaanta", content: "Waxa ku jira" },
    copyright: "© Xuquuqda daabacaadda {{year}} by {{author}}. Dhammaan xuquuqaha waa la ilaaliyay.",
  },
  home: {
    meta: { description: "Meksova waa app xisaab fudud oo loogu talagalay ganacsiyada yaryar." },
    hero: {
      tagline: "ku soo dhawoow meksova",
      title: "Faa'iidadaada daqiiqado gudahood arag — Tijaabi demo-ga tooska ah",
      ctaDemo: "Tijaabi Demo — Diiwaangelin ma lahan",
      ctaTrial: "Bilow tijaabo 30 maalmood oo bilaash ah",
      trialNote: "Kaarka deynta looma baahna. Helitaan buuxa 30 maalmood.",
      businessTypesTitle: "Dooro nooca ganacsigaaga",
    },
    testimonials: { heading: "Waxaa aamina boqolaal", headingHighlight: "milkiilayaasha ganacsiga yaryar" },
  },
  ...biz([
    { id: "truck", title: "Baabuur xamuul", text: "Xisaab DIY — la soco dakhliga xamuulka, shidaalka, dayactirka, iyo rasiidada." },
    { id: "groceries", title: "Dukaamada", text: "Xisaab DIY — iibka maalinlaha ah, kharashka alaab-qeybiyeyaasha, iyo rasiidada." },
    { id: "rideshare", title: "Darawalada rideshare", text: "Xisaab DIY — kirada, shidaal, dayactir, iyo rasiidada." },
    { id: "households", title: "Qoysaska", text: "Xisaab DIY — biilasha, kharashka qoyska, iyo rasiidada." },
    { id: "cafe", title: "Kafateeriyo / Makhaayado", text: "Xisaab DIY — iibka, alaab-qeybiyeyaasha, shaqaalaha, iyo rasiidada." },
    { id: "cleaning", title: "Nadiifinta", text: "Xisaab DIY — shaqooyinka, alaabta, iyo lacag bixinta." },
    { id: "beauty", title: "Quruxda", text: "Xisaab DIY — lacagaha macaamiisha, alaabta, iyo rasiidada." },
    { id: "ecommerce", title: "E-commerce", text: "Xisaab DIY — iibka internetka, khidmadaha, rarida, iyo rasiidada." },
    { id: "construction", title: "Dhismaha", text: "Xisaab DIY — kharashka mashruuca, mushaharka, iyo rasiidada." },
    { id: "contentCreator", title: "Abuuraha waxa", text: "Xisaab DIY — dakhliga, kharashka, taageerayaasha, iyo rasiidada." },
    { id: "other", title: "Ganacsiyo kale", text: "Xisaab DIY — dakhliga, kharashka, iyo rasiidada ganacsi kasta." },
  ]),
  services: { pageTitle: "Adeegyadeena", tagline: "Adeegyadeena", title: "Adeegyada aan bixino", meta: { title: "Adeegyada - Meksova", description: "Noocyada ganacsiga ee Meksova taageerto." } },
  about: { pageTitle: "Naga", pageBreadcrumb: "Naga", story: { tagline: "Ku saabsan meksova", titlePrefix: "Wada shaqeyno ", titleHighlight: "ganacsigaaga", missionTitle: "Ujeedadu waa ilaalinta \n ganacsigaaga iyo wax badan" }, meta: { title: "Naga - Meksova", description: "Baro Meksova iyo xisaabteena fudud." } },
  ourMission: { trustedHeading: "Waxaa aamina boqolaal", trustedHighlight: "milkiilayaasha ganacsiga yaryar", title: "Ujeedadu waa ilaalinta ganacsigaaga &", titleHighlight: "Wax badan", cta: "WAX BADAN BARO", watermark: "Maaliyadda caalamiga" },
  contact: { pageTitle: "Xiriir", meta: { title: "Xiriir - Meksova", description: "Nala soo xiriir taageero ama iskaashi." }, details: { title: "Nala soo xiriir", text: "Waxaan bixinaynaa khibradda macmiilka ugu fiican", addressLabel: "Xafiiskayaga" }, form: { tagline: "NALA SOO XIRIIR", title: "Su'aal ma haysaa?", titleAlt: "Qor fariin", submit: "DIR FARIINTA", fields: { fullName: "Magaca buuxa", email: "Cinwaanka emailka", phone: "Telefoon", subject: "Mawduuca", message: "Qor fariin", messagePlaceholder: "Sidee kuu caawin karnaa ganacsigaaga?" } } },
  faq: { meta: { title: "Su'aalaha badanaa la isweydiiyo" }, pageTitle: "Su'aalaha badanaa la isweydiiyo" },
  error: { meta: { title: "Khalad 404" }, pageTitle: "Khalad 404", tagline: "Waan ka xunnahay, boggaas ma heli karno!", text: "Bogga aad raadineyso ma jirin.", searchPlaceholder: "Halkan ka raadi", backHome: "ku noqo guriga" },
  marketingRules: { title: "Xeerarka suuqgeynta", breadcrumbParent: "Adeegyada", breadcrumbPage: "Faahfaahin" },
};

const ti = {
  common: {
    meta: { defaultDescription: "Meksova ንኣኃዝቲ ትካላት መራኸቢታት፣ ኣታዊን ኣወጻእቲን ብቐሊል ናይ ግብሪ ዝዳለወ ሕሳብ የገልግል።" },
    breadcrumb: { home: "ገዛ" },
    titleSubtitle: "ኣወጻእቲ ተኸታተል፣ ናይ ግብሪ ዝዳለወ ጸብጻባት ኣፍርይ፣ መራኸቢታት ብቐሊል ኣመሓድር — ንኣኃዝቲ ትካላት ዝተሰራሕ። ብቕጽበት ጀምር",
    formRequired: "እዚ ቦታ የድሊ።",
    reviews: "ግምገማታት", review: "ግምገማ",
  },
  header: { nav: { home: "ገዛ", services: "ኣገልግሎታት", about: "ብዛዕባና", contact: "ርኸብ" }, login: "እተው", signup: "ብነጻ ጀምር" },
  search: { label: "ኣብዚ ድለይ", placeholder: "ኣብዚ ድለይ...", submitAria: "ድለይ ሰዲድ" },
  footer: {
    tagline: "ናይ ንግድኻ ናይ ገንዘብ መጻኢ ንሓይሽ ኢና።",
    explore: "ዳህስስ", contact: "ርኸብ",
    links: { about: "ብዛዕባና", terms: "ውዕላት ተጠቃቀም", privacy: "ፖሊሲ ብሕታውነት", content: "ትሕዝቶ" },
    copyright: "© መሰል {{year}} ብ{{author}}። ኩሉ መሰላት ተሓሊዩ።",
  },
  home: {
    meta: { description: "Meksova ንኣኃዝቲ ትካላት ቀሊል ናይ ሕሳብ ኣፕ ኢዩ።" },
    hero: {
      tagline: "ናብ meksova እንቋዕ ብደሓን መጻእኩም",
      title: "ብደቓይቕ መኽሰብካ ርአ — ቀጥታ ዴሞ ይፈትኑ",
      ctaDemo: "ዴሞ ፈትኑ — ምዝገባ የድሊ ኣይኮነን",
      ctaTrial: "30 መዓልቲ ብነጻ ጀምር",
      trialNote: "ካርድ ክሬዲት የድሊ ኣይኮነን። ምሉእ ተበጻሕነት 30 መዓልቲ።",
      businessTypesTitle: "ዓይነት ንግድኻ ምረጽ",
    },
    testimonials: { heading: "ብመቶታት ዝኣመነ", headingHighlight: "ኣኃዝቲ ንግዲ ባለታት" },
  },
  ...biz([
    { id: "truck", title: "መኪና", text: "ብነፍሲ ወከፍ ሕሳብ — ኣታዊ ጽዕነት፣ ነዳዲ፣ ጥገናን መራኸቢታትን ተኸታተል።" },
    { id: "groceries", title: "ግሮሰሪ", text: "ብነፍሲ ወከፍ ሕሳብ — መዓልታዊ ሽያጥ፣ ኣቅራቢ ክፍሊትን መራኸቢታትን።" },
    { id: "rideshare", title: "ራይድሼር ሹፌሮታት", text: "ብነፍሲ ወከፍ ሕሳብ — ክፍሊት ጉዕዞ፣ ነዳዲ፣ ጥገናን መራኸቢታትን።" },
    { id: "households", title: "ግለሰብ/ስድራቤት", text: "ብነፍሲ ወከፍ ሕሳብ — ቢሎች፣ ናይ ስድራቤት ኣወጻእቲን መራኸቢታትን።" },
    { id: "cafe", title: "ካፌ / ሬስቶራንት", text: "ብነፍሲ ወከፍ ሕሳብ — ሽያጥ፣ ኣቅራቢ፣ ሰራሕተኛታትን መራኸቢታትን።" },
    { id: "cleaning", title: "ናይ ጽሬት ኣገልግሎት", text: "ብነፍሲ ወከፍ ሕሳብ — ስራሕ፣ ኣቕሑን ክፍሊትን።" },
    { id: "beauty", title: "ስሕበት", text: "ብነፍሲ ወከፍ ሕሳብ — ክፍሊት ዓማዊል፣ ፍርያትን መራኸቢታትን።" },
    { id: "ecommerce", title: "ኢ-ኮሜርስ", text: "ብነፍሲ ወከፍ ሕሳብ — ኦንላይን ሽያጥ፣ ክፍሊትን መራኸቢታትን።" },
    { id: "construction", title: "ህንጻ", text: "ብነፍሲ ወከፍ ሕሳብ — ናይ ፕሮጀክት ኣወጻእቲ፣ ደሞዝን መራኸቢታትን።" },
    { id: "contentCreator", title: "ፈጣሪ ትሕዝቶ", text: "ብነፍሲ ወከፍ ሕሳብ — ኣታዊ፣ ኣወጻእቲ፣ ስፖንሰርን መራኸቢታትን።" },
    { id: "other", title: "ካልኦት ንግዲ", text: "ብነፍሲ ወከፍ ሕሳብ — ንዝኾነ ንግዲ ኣታዊ፣ ኣወጻእቲን መራኸቢታትን።" },
  ]),
  services: { pageTitle: "ኣገልግሎታትና", tagline: "ኣገልግሎታትና", title: "ዝንቀሎም ኣገልግሎታት", meta: { title: "ኣገልግሎታት - Meksova", description: "Meksova ዝድገፎም ዓይነታት ንግዲ።" } },
  about: { pageTitle: "ብዛዕባና", pageBreadcrumb: "ብዛዕባና", story: { tagline: "ብዛዕባ meksova", titlePrefix: "ኣብሓድሽ ን ", titleHighlight: "ንግድኻ", missionTitle: "ተልእኾና ምክልኻል \n ንግድኻን ብዙሕ ካልእን" }, meta: { title: "ብዛዕባና - Meksova", description: "Meksovaን ቀሊል ሕሳብን ተማሃሩ።" } },
  ourMission: { trustedHeading: "ብመቶታት ዝኣመነ", trustedHighlight: "ኣኃዝቲ ንግዲ ባለታት", title: "ተልእኾና ንግድኻ ምክልኻል &", titleHighlight: "ብዙሕ ካልእ", cta: "ተወሳኺ ርአ", watermark: "ኣህለዋዊ ፋይናንስ" },
  contact: { pageTitle: "ርኸብ", meta: { title: "ርኸብ - Meksova", description: "ንሕጽርዎ ወይ ሓድጋ ተራኸቡና።" }, details: { title: "ርኸቡና", text: "ዝበለጸ ተመክቶ ዓማዊል ንህብ", addressLabel: "ቢሮና" }, form: { tagline: "ርኸቡና", title: "ሕቶ ኣሎካ?", titleAlt: "መልእኽቲ ጽሓፍ", submit: "መልእኽቲ ሰዲድ", fields: { fullName: "ምሉእ ስም", email: "ኢመይል", phone: "ተሌፎን", subject: "ኣርእስቲ", message: "መልእኽቲ ጽሓፍ", messagePlaceholder: "ንግድኻ ከመይ ክንሕግዘካ ንኽእል?" } } },
  faq: { meta: { title: "ተደጋጋሚ ሕቶታት" }, pageTitle: "ተደጋጋሚ ሕቶታት" },
  error: { meta: { title: "404 ጌጋ" }, pageTitle: "404 ጌጋ", tagline: "ይቕሬታ፣ እቲ ገጽ ኣይተረኽበን!", text: "እቲ ዝደልይካዮ ገጽ ኣይነበረን።", searchPlaceholder: "ኣብዚ ድለይ", backHome: "ናብ ገዛ ተመለስ" },
  marketingRules: { title: "ሕጊ ዕዳጋ", breadcrumbParent: "ኣገልግሎታት", breadcrumbPage: "ዝርዝር" },
};

const locales = { am, es, fr, ar, so, ti };

for (const [code, override] of Object.entries(locales)) {
  const merged = deepMerge(en, override);
  fs.writeFileSync(path.join(localesDir, `${code}.json`), JSON.stringify(merged, null, 2));
  console.log(`Wrote ${code}.json`);
}

console.log("Done.");
