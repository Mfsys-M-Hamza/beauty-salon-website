/** Icons usable from the config. Add new ones in src/components/ui/Icon.tsx. */
export type IconName =
  | "sparkles"
  | "scissors"
  | "shield-check"
  | "leaf"
  | "heart"
  | "clock"
  | "users"
  | "gem"
  | "flower"
  | "droplets"
  | "hand"
  | "eye"
  | "smile"
  | "calendar-check"
  | "star"
  | "palette"
  | "message-circle";

export type PageName = "home" | "services" | "gallery" | "about" | "contact";

export interface ImageAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: IconName;
  image: ImageAsset;
}

export interface Service {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  /** Number in the configured currency. */
  price: number;
  /** "from" renders "From $30". */
  priceType: "fixed" | "from";
  durationMinutes: number;
  featured?: boolean;
  /** Small badge such as "Popular". */
  badge?: string;
}

export interface Offer {
  id: string;
  badge: string;
  title: string;
  description: string;
  terms: string;
  ctaLabel: string;
  /** Pre-selects this service in the booking form. */
  serviceId?: string;
}

export interface Testimonial {
  name: string;
  service: string;
  quote: string;
  rating: 1 | 2 | 3 | 4 | 5;
  /** Keep true until the quote is a real, permitted customer review. */
  isSample: boolean;
}

export interface GalleryItem {
  id: string;
  type: "image" | "video";
  category: string;
  title: string;
  image: ImageAsset;
  /** Only for type "video". Leave undefined to show the poster only. */
  video?: { webm?: string; mp4?: string };
}

export interface BeforeAfterPair {
  id: string;
  title: string;
  description: string;
  before: ImageAsset;
  after: ImageAsset;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: ImageAsset;
}

export interface TitledText {
  icon: IconName;
  title: string;
  text: string;
}

export interface TimelineItem {
  label: string;
  title: string;
  text: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface BusinessDay {
  /** Full English day name, also used in structured data. */
  day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
  /** 24h "HH:MM". */
  open: string;
  close: string;
  closed?: boolean;
}

export interface SocialLink {
  id: "instagram" | "facebook" | "tiktok" | "youtube";
  label: string;
  url: string;
}

/**
 * One animated clip or decorative animation. Components look clips up by
 * page + section, so a client can swap, disable or remove them from config.
 */
export interface MediaClip {
  id: string;
  title: string;
  description: string;
  page: PageName;
  section: string;
  /** Services page only: show this clip after that category's services in the "All" view. */
  afterCategoryId?: string;
  /**
   * Built-in animated makeup illustration shown instead of a video file:
   * "lipstick" (a lipstick opening and closing) or "products" (lipstick, powder compact, nail polish).
   */
  animation?: "lipstick" | "products";
  /** Public paths. Leave undefined until a real clip exists (poster is shown). */
  video?: { webm?: string; mp4?: string };
  /** Optional portrait version used below the md breakpoint. */
  mobile?: { poster: ImageAsset; video?: { webm?: string; mp4?: string } };
  poster: ImageAsset;
  /** Alternative text. Ignored for decorative clips. */
  alt: string;
  enabled: boolean;
  /** Decorative clips autoplay muted and have no controls. Others get play/pause/mute. */
  decorative: boolean;
  /** Shows a "placeholder" label while true. */
  placeholder: boolean;
  /** Guidance for whoever produces the real clip. */
  brief: {
    subject: string;
    dimensions: string;
    duration: string;
    format: string;
    maxSize: string;
    replaceAt: string;
  };
}

export interface SeoPage {
  title: string;
  description: string;
}
