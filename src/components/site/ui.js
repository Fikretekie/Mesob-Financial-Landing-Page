import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  Boxes,
  Briefcase,
  Car,
  Coffee,
  Download,
  FileText,
  Fuel,
  Hammer,
  Home,
  Languages,
  Link2,
  Layers,
  MapPinned,
  Plus,
  ReceiptText,
  Route,
  Scissors,
  ShoppingCart,
  SprayCan,
  Star,
  Store,
  Truck,
  UserPlus,
  Video,
  WalletCards,
} from "lucide-react";
import { APP_URL } from "@/data/site";
import { goToSignup, trackDemoEvent } from "@/utils/demoTracking";

const STROKE = 1.5;

export function Brand() {
  return (
    <>
      <img className="ks-brand__mark" src="/brand/mark.webp" alt="" width="34" height="26" />
      <span className="ks-brand__word">
        <b>MEK</b>SOVA
      </span>
    </>
  );
}

export function Arrow({ className }) {
  return <ArrowUpRight strokeWidth={STROKE} className={`ks-flip ${className ?? ""}`} aria-hidden />;
}

// Primary call to action. Signup buttons get a plain href (works without JS)
// and, on click, add the visitor's ad attribution + industry before leaving.
export function Cta({
  href,
  signup = false,
  industry,
  track,
  variant = "primary",
  size,
  block = false,
  knob = true,
  className = "",
  children,
}) {
  const classes = [
    "ks-btn",
    `ks-btn--${variant}`,
    size === "sm" && "ks-btn--sm",
    block && "ks-btn--block",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  const body = (
    <>
      <span>{children}</span>
      {variant === "primary" && knob && (
        <span className="ks-btn__knob">
          <Arrow />
        </span>
      )}
    </>
  );

  if (signup) {
    const base = `${APP_URL}/signup${industry ? `?industry=${industry}` : ""}`;
    return (
      <a
        className={classes}
        href={base}
        onClick={(event) => {
          event.preventDefault();
          goToSignup(industry, track ?? "site");
        }}
      >
        {body}
      </a>
    );
  }

  const onClick = track ? () => trackDemoEvent("site_cta", { source: track, href }) : undefined;
  if (href.startsWith("/")) {
    return (
      <Link className={classes} href={href} onClick={onClick}>
        {body}
      </Link>
    );
  }
  return (
    <a className={classes} href={href} onClick={onClick}>
      {body}
    </a>
  );
}

export function Eyebrow({ children }) {
  return (
    <span className="ks-eyebrow">
      <span className="ks-eyebrow__dot" aria-hidden />
      {children}
    </span>
  );
}

export function Stars({ label }) {
  return (
    <span className="ks-stars" role="img" aria-label={label}>
      {[0, 1, 2, 3, 4].map((index) => (
        <Star key={index} strokeWidth={0} aria-hidden />
      ))}
    </span>
  );
}

export function PlusIcon() {
  return <Plus strokeWidth={STROKE} aria-hidden />;
}

const INDUSTRY_ICONS = {
  truck: Truck,
  rideshare: Car,
  households: Home,
  groceries: ShoppingCart,
  cafe: Coffee,
  cleaning: SprayCan,
  beauty: Scissors,
  ecommerce: Store,
  construction: Hammer,
  "content-creator": Video,
  other: Briefcase,
};

export function IndustryGlyph({ icon }) {
  const Icon = INDUSTRY_ICONS[icon] ?? Briefcase;
  return <Icon strokeWidth={STROKE} aria-hidden />;
}

const FEATURE_ICONS = {
  sync: Link2,
  mileage: Route,
  trips: MapPinned,
  fuel: Fuel,
  ifta: FileText,
  scan: ReceiptText,
  payables: WalletCards,
  reports: BookOpen,
  multi: Layers,
  accountant: UserPlus,
  languages: Languages,
  documents: FileText,
  inventory: Boxes,
  export: Download,
};

export function FeatureGlyph({ id }) {
  const Icon = FEATURE_ICONS[id] ?? BookOpen;
  return <Icon strokeWidth={STROKE} aria-hidden />;
}

export function Section({ id, className = "", line = false, tight = false, children, labelledBy }) {
  const classes = ["ks-section", line && "ks-section--line", tight && "ks-section--tight", className]
    .filter(Boolean)
    .join(" ");
  return (
    <section id={id} className={classes} aria-labelledby={labelledBy}>
      <div className="ks-wrap">{children}</div>
    </section>
  );
}

export const money = (value) =>
  `$${value.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
