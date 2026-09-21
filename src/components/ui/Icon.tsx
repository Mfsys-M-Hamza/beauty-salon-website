import {
  CalendarCheck,
  Clock,
  Droplets,
  Eye,
  Flower2,
  Gem,
  HandHeart,
  Heart,
  Leaf,
  MessageCircle,
  Palette,
  Scissors,
  ShieldCheck,
  Smile,
  Sparkles,
  Star,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { IconName } from "@/config/types";

const icons: Record<IconName, LucideIcon> = {
  sparkles: Sparkles,
  scissors: Scissors,
  "shield-check": ShieldCheck,
  leaf: Leaf,
  heart: Heart,
  clock: Clock,
  users: Users,
  gem: Gem,
  flower: Flower2,
  droplets: Droplets,
  hand: HandHeart,
  eye: Eye,
  smile: Smile,
  "calendar-check": CalendarCheck,
  star: Star,
  palette: Palette,
  "message-circle": MessageCircle,
};

export function Icon({ name, className }: { name: IconName; className?: string }) {
  const Component = icons[name];
  return <Component aria-hidden="true" className={className ?? "size-6"} strokeWidth={1.6} />;
}
