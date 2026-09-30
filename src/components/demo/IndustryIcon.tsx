'use client'

import {
  Briefcase,
  Car,
  Coffee,
  Hammer,
  Home,
  Scissors,
  ShoppingCart,
  SprayCan,
  Store,
  Truck,
  Video,
  type LucideIcon,
} from 'lucide-react';

// Lucide rather than Font Awesome: demo.css forces `font-family: inherit` on
// every element inside .demo-app, which breaks icon fonts there.
const ICONS: Record<string, LucideIcon> = {
  truck: Truck,
  rideshare: Car,
  households: Home,
  groceries: ShoppingCart,
  cafe: Coffee,
  cleaning: SprayCan,
  beauty: Scissors,
  ecommerce: Store,
  construction: Hammer,
  'content-creator': Video,
  other: Briefcase,
};

export function IndustryIcon({ slug, className }: { slug: string; className?: string }) {
  const Icon = ICONS[slug] ?? Briefcase;
  return <Icon className={className} aria-hidden />;
}
