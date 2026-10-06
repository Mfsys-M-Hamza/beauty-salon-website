/**
 * CENTRAL CLIENT CONFIGURATION
 * ----------------------------------------------------------------------------
 * Everything client-specific lives in this file. To reuse the template for a
 * new salon, edit this file, replace the images in /public/images and (if
 * available) add clips to /public/videos. Search for "[" to find placeholders
 * such as [SALON NAME], [CITY] and [PHONE NUMBER].
 *
 * Prices, testimonials, staff, offers and clips below are SAMPLE CONTENT.
 * Replace all of it before launch.
 */
import type {
  BeforeAfterPair,
  BusinessDay,
  Category,
  Faq,
  GalleryItem,
  ImageAsset,
  MediaClip,
  Offer,
  SeoPage,
  Service,
  SocialLink,
  TeamMember,
  Testimonial,
  TimelineItem,
  TitledText,
} from "./types";

const image = (src: string, alt: string, width: number, height: number): ImageAsset => ({
  src,
  alt,
  width,
  height,
});

// ---------------------------------------------------------------------------
// Identity & contact
// ---------------------------------------------------------------------------
const name = "Layal Lash by Saba Kashif";
const city = "Islamabad";

const contact = {
  ownerName: "Saba Kashif",
  /** `display` is shown on the site, `dial` is used for tel: links (digits and +). */
  phone: { display: "+92 313 5131346", dial: "+923135131346" },
  /** `number` is digits only, with country code and no "+" (used for wa.me links). */
  whatsapp: { display: "+92 313 5131346", number: "923135131346" },
  email: "[EMAIL ADDRESS]",
  address: {
    street: "First floor, above K&N's, Main Double Road, Block B, Soan Gardens",
    city,
    region: "Islamabad Capital Territory",
    postalCode: "[POSTAL CODE]",
    country: "PK",
  },
  serviceAreas: ["Soan Gardens", "PWD Housing Society", "Police Foundation", "Islamabad Expressway"],
  /** Optional. When empty or a placeholder, a Google Maps search of the address is used. */
  googleMapsUrl:
    "https://www.google.com/maps/place/Layal+Lash+by+Saba+kashif+salon+%26+Asthetics+beauty+%26+academy/@33.5638125,73.1499375,17z/data=!4m6!3m5!1s0x38dfec4ce3c2a239:0xac46afc333067b86!8m2!3d33.5638125!4d73.1499375!16s%2Fg%2F11f15h_kyg",
  /** Map pin coordinates from the Google Maps listing. */
  geo: { latitude: 33.5638125, longitude: 73.1499375 },
  /** Optional online booking page (Fresha, Calendly...). Leave "" to hide the button. */
  appointmentUrl: "",
};

/** From the Google Maps listing: open 7 days a week. */
const hours: BusinessDay[] = [
  { day: "Monday", open: "11:00", close: "20:00" },
  { day: "Tuesday", open: "11:00", close: "20:00" },
  { day: "Wednesday", open: "11:00", close: "20:00" },
  { day: "Thursday", open: "11:00", close: "20:00" },
  { day: "Friday", open: "11:00", close: "20:00" },
  { day: "Saturday", open: "11:00", close: "20:00" },
  { day: "Sunday", open: "11:00", close: "20:00" },
];

/** Entries whose url is still a placeholder are shown as inactive icons. */
const social: SocialLink[] = [
  { id: "instagram", label: "Instagram", url: "https://www.instagram.com/layal_lash_by_saba_kashif/" },
  { id: "facebook", label: "Facebook", url: "https://www.facebook.com/p/Layal-Lash-Beauty-Salon-Insititute-100063909936573/" },
  { id: "tiktok", label: "TikTok", url: "https://www.tiktok.com/@layallashbysabakashif" },
];

// ---------------------------------------------------------------------------
// Services & pricing (placeholder prices: edit before launch)
// ---------------------------------------------------------------------------
const categories: Category[] = [
  {
    id: "hair-styling",
    name: "Haircuts & Styling",
    description: "Cuts, blow-dries and finishing styles tailored to your face shape and routine.",
    icon: "scissors",
    image: image("/images/services/hair-styling.jpg", "Stylist blow-drying long hair in a bright salon", 800, 600),
  },
  {
    id: "hair-coloring",
    name: "Hair Coloring",
    description: "Global colour, highlights and gloss treatments with a colour consultation first.",
    icon: "palette",
    image: image("/images/services/hair-coloring.jpg", "Colourist applying hair colour with a brush in a salon", 800, 600),
  },
  {
    id: "hair-treatments",
    name: "Hair Treatments",
    description: "Deep conditioning and scalp care to restore softness, shine and strength.",
    icon: "droplets",
    image: image("/images/services/hair-treatments.jpg", "Soft, wavy silver-blonde hair", 800, 600),
  },
  {
    id: "bridal-makeup",
    name: "Bridal Makeup",
    description: "Trial-led bridal looks designed to photograph beautifully and last all day.",
    icon: "gem",
    image: image("/images/services/bridal-makeup.jpg", "Bride in a red bridal outfit and veil", 800, 600),
  },
  {
    id: "party-makeup",
    name: "Party Makeup",
    description: "Polished makeup for celebrations, events and evenings out.",
    icon: "sparkles",
    image: image("/images/services/party-makeup.jpg", "Makeup artist applying makeup to a client", 800, 600),
  },
  {
    id: "facials-skincare",
    name: "Facials, Skin & Aesthetics",
    description: "Hydrafacials, BB Glow, PRP and brightening facials chosen after a skin consultation.",
    icon: "flower",
    image: image("/images/services/facials-skincare.jpg", "Client receiving a facial treatment from a therapist in gloves", 800, 600),
  },
  {
    id: "mani-pedi",
    name: "Manicure & Pedicure",
    description: "Careful nail shaping, cuticle care, polish and acrylic extensions.",
    icon: "hand",
    image: image("/images/services/mani-pedi.jpg", "Nail technician applying polish during a manicure", 800, 600),
  },
  {
    id: "waxing-threading",
    name: "Waxing & Threading",
    description: "Gentle hair removal for face and body using single-use applicators.",
    icon: "leaf",
    image: image("/images/services/waxing-threading.jpg", "Close-up of smooth, clear skin", 800, 600),
  },
  {
    id: "lashes-brows",
    name: "Eyelash & Eyebrow",
    description: "Lash extensions, lifts, brow shaping and tinting to frame your eyes.",
    icon: "eye",
    image: image("/images/services/lashes-brows.jpg", "Close-up of an eye with defined lashes and brows", 800, 600),
  },
  {
    id: "massage-spa",
    name: "Massage & Spa",
    description: "Unhurried relaxation treatments to ease tension and reset.",
    icon: "heart",
    image: image("/images/services/massage-spa.jpg", "Therapist giving a relaxing massage over a white towel", 800, 600),
  },
  {
    id: "packages",
    name: "Layal Lash Deals",
    description: "Set-price deals from our in-salon menu, each with a free add-on treatment.",
    icon: "star",
    image: image("/images/services/packages.jpg", "Lipstick and makeup products on a white surface", 800, 600),
  },
];

const services: Service[] = [
  { id: "womens-cut", categoryId: "hair-styling", name: "Cut & Blow-dry", description: "Consultation, wash, precision cut and styled finish.", price: 1500, priceType: "from", durationMinutes: 60, featured: true, badge: "Popular" },
  { id: "blow-dry", categoryId: "hair-styling", name: "Blow-dry & Style", description: "Wash and a smooth, curled or straight finish.", price: 1000, priceType: "from", durationMinutes: 45 },
  { id: "trim", categoryId: "hair-styling", name: "Trim & Shape", description: "Light tidy-up to keep your current length healthy.", price: 700, priceType: "from", durationMinutes: 30 },

  { id: "root-colour", categoryId: "hair-coloring", name: "Root Colour", description: "Regrowth colour matched to your existing shade.", price: 3500, priceType: "from", durationMinutes: 90 },
  { id: "highlights", categoryId: "hair-coloring", name: "Highlights / Balayage", description: "Hand-placed lightening for soft dimension. Price depends on length.", price: 9000, priceType: "from", durationMinutes: 150 },
  { id: "gloss", categoryId: "hair-coloring", name: "Colour Gloss", description: "Tone-refreshing gloss for shine and colour longevity.", price: 2500, priceType: "from", durationMinutes: 45 },

  { id: "deep-conditioning", categoryId: "hair-treatments", name: "Deep Conditioning Treatment", description: "Intensive moisture treatment with scalp massage.", price: 2000, priceType: "from", durationMinutes: 45 },
  { id: "keratin-smoothing", categoryId: "hair-treatments", name: "Smoothing Treatment", description: "Frizz-reducing smoothing service. Patch test advised.", price: 12000, priceType: "from", durationMinutes: 180 },

  { id: "bridal-makeup-full", categoryId: "bridal-makeup", name: "Bridal Makeup", description: "Full bridal makeup on the day, following your trial look.", price: 25000, priceType: "from", durationMinutes: 120, featured: true, badge: "Bridal favourite" },
  { id: "bridal-trial", categoryId: "bridal-makeup", name: "Bridal Trial", description: "A rehearsal session to agree your look before the day.", price: 8000, priceType: "fixed", durationMinutes: 90 },

  { id: "party-makeup-full", categoryId: "party-makeup", name: "Party Makeup", description: "Full-face makeup for events and celebrations.", price: 5000, priceType: "from", durationMinutes: 60 },
  { id: "makeup-styling", categoryId: "party-makeup", name: "Makeup & Hair Styling", description: "Complete event look with makeup and styled hair.", price: 8000, priceType: "from", durationMinutes: 105 },

  { id: "signature-facial", categoryId: "facials-skincare", name: "Signature Facial", description: "Cleanse, exfoliate, massage and mask for a fresh glow.", price: 3500, priceType: "from", durationMinutes: 60, featured: true },
  { id: "hydrating-facial", categoryId: "facials-skincare", name: "Hydrating Facial", description: "Moisture-focused facial for dry or tired skin.", price: 4000, priceType: "from", durationMinutes: 60 },
  { id: "hydrafacial", categoryId: "facials-skincare", name: "Hydrafacial", description: "Deep cleanse, exfoliation and hydration for clean, glowing skin.", price: 6000, priceType: "from", durationMinutes: 60, featured: true, badge: "Client favourite" },
  { id: "bb-glow", categoryId: "facials-skincare", name: "BB Glow", description: "Tinted serum treatment for a more even, luminous-looking complexion. Patch test required.", price: 8000, priceType: "from", durationMinutes: 75 },
  { id: "prp-facial", categoryId: "facials-skincare", name: "PRP Skin Treatment", description: "Platelet-rich plasma treatment to support skin texture and renewal. Consultation required.", price: 15000, priceType: "from", durationMinutes: 60 },
  { id: "lip-treatment", categoryId: "facials-skincare", name: "Lip Treatment", description: "Treatment to soften, brighten and even out lip colour. Consultation required.", price: 5000, priceType: "from", durationMinutes: 45 },
  { id: "express-facial", categoryId: "facials-skincare", name: "Express Facial", description: "A quick refresh between appointments.", price: 2000, priceType: "fixed", durationMinutes: 30 },

  { id: "classic-manicure", categoryId: "mani-pedi", name: "Classic Manicure", description: "Shape, cuticle care, hand massage and polish.", price: 1500, priceType: "fixed", durationMinutes: 45 },
  { id: "classic-pedicure", categoryId: "mani-pedi", name: "Classic Pedicure", description: "Foot soak, exfoliation, nail care and polish.", price: 2000, priceType: "fixed", durationMinutes: 60 },
  { id: "acrylic-nails", categoryId: "mani-pedi", name: "Acrylic Nails", description: "Full set of acrylic extensions, shaped and finished with your choice of design.", price: 4000, priceType: "from", durationMinutes: 90 },
  { id: "mani-pedi-combo", categoryId: "mani-pedi", name: "Manicure & Pedicure", description: "Both treatments in one relaxed visit.", price: 3200, priceType: "fixed", durationMinutes: 100 },

  { id: "eyebrow-threading", categoryId: "waxing-threading", name: "Eyebrow Threading", description: "Precise shaping using cotton thread.", price: 300, priceType: "fixed", durationMinutes: 15 },
  { id: "full-face-threading", categoryId: "waxing-threading", name: "Full Face Threading", description: "Brows, upper lip, chin and cheeks.", price: 800, priceType: "from", durationMinutes: 30 },
  { id: "leg-wax", categoryId: "waxing-threading", name: "Leg Waxing", description: "Half or full leg waxing with a soothing finish.", price: 1500, priceType: "from", durationMinutes: 45 },

  { id: "brow-shape-tint", categoryId: "lashes-brows", name: "Brow Shape & Tint", description: "Shaping and tint to define your natural brows.", price: 1200, priceType: "fixed", durationMinutes: 30 },
  { id: "lash-extensions", categoryId: "lashes-brows", name: "Lash Extensions", description: "Classic or volume extensions applied lash by lash for a fuller look. Patch test advised.", price: 5000, priceType: "from", durationMinutes: 120, featured: true },
  { id: "lash-lift", categoryId: "lashes-brows", name: "Lash Lift & Tint", description: "Lifted, darker lashes without daily curling. Patch test required.", price: 3500, priceType: "from", durationMinutes: 60 },

  { id: "relaxing-massage", categoryId: "massage-spa", name: "Relaxing Massage", description: "Full-body massage with warm oils.", price: 5000, priceType: "from", durationMinutes: 60 },
  { id: "back-shoulder", categoryId: "massage-spa", name: "Back & Shoulder Massage", description: "Focused relief for desk-tight muscles.", price: 2500, priceType: "fixed", durationMinutes: 30 },

  // Deals 8-13 from the salon's printed "Layal lash Deals" menu (Google Maps photo).
  { id: "deal-spa-mani-pedi", categoryId: "packages", name: "Spa Manicure + Spa Pedicure", description: "Free simple cleansing, eyebrow and upper lip threading.", price: 3000, priceType: "fixed", durationMinutes: 120, featured: true, badge: "Deal" },
  { id: "deal-whitening-mani-pedi", categoryId: "packages", name: "Whitening Manicure + Whitening Pedicure", description: "Free face bleach and polish.", price: 2000, priceType: "fixed", durationMinutes: 100 },
  { id: "deal-whitening-facial", categoryId: "packages", name: "Johnson Whitening Facial", description: "Free hand polish.", price: 4000, priceType: "fixed", durationMinutes: 75 },
  { id: "deal-face-polish", categoryId: "packages", name: "Face Polishing with Deep Cleansing", description: "Free eyebrow, upper lip and forehead threading.", price: 1500, priceType: "fixed", durationMinutes: 45 },
  { id: "deal-hair-streaks", categoryId: "packages", name: "Hair Streaks", description: "Free damaged-hair repair treatment.", price: 5000, priceType: "fixed", durationMinutes: 150 },
  { id: "deal-hair-dye", categoryId: "packages", name: "Basic Hair Dye", description: "Free deep conditioning and hair steaming.", price: 2000, priceType: "fixed", durationMinutes: 90 },
];

const offers: Offer[] = [
  {
    id: "spa-mani-pedi-deal",
    badge: "Salon deal",
    title: "Spa manicure + spa pedicure for Rs 3,000",
    description: "Both spa treatments in one visit, with simple cleansing, eyebrow and upper lip threading included free.",
    terms: "From the Layal Lash deals menu. Prices may change; we will confirm when you book.",
    ctaLabel: "Book this deal",
    serviceId: "deal-spa-mani-pedi",
  },
];

// ---------------------------------------------------------------------------
// Social proof, team, story
// ---------------------------------------------------------------------------
/** Overall rating shown above the testimonials, from the Google Maps listing. */
const googleReviews = {
  rating: 4.1,
  count: 60,
  url: contact.googleMapsUrl,
};

/**
 * Public Google reviews (lightly trimmed, spelling tidied). The first entries are
 * shown on the home page; the full list is shown on the About page.
 * Per-review stars are inferred from the wording where Google's star wasn't copied.
 */
const testimonials: Testimonial[] = [
  { name: "Ayesha B.", service: "Hydrafacial", rating: 5, isSample: false, quote: "My skin felt so clean, hydrated and fresh afterwards. The facial gave my skin a beautiful glow and I absolutely loved the results. Highly recommended!" },
  { name: "Kiran B.", service: "Mani-pedi & waxing", rating: 5, isSample: false, quote: "Fantastic experience! Their mani-pedi and waxing are excellent, and the salon is super clean. The staff is extremely polite and the owner is wonderful." },
  { name: "Asfa Y.", service: "Haircut, nails & makeup", rating: 5, isSample: false, quote: "This is my favourite salon. Saba Kashif is very professional and the staff is well trained. It is hygienically clean with a very aesthetic, professional setup." },
  { name: "Ayesha T.", service: "Salon visit", rating: 5, isSample: false, quote: "I really appreciated that the salon is open 7 days a week, even on Fridays. They took their time with every step and made sure not to miss any part of the service." },
  { name: "Halima S.", service: "Acrylic nails", rating: 5, isSample: false, quote: "The work is neat, the designs are beautiful, and the nails lasted for weeks with no lifting. Highly recommend!" },
  { name: "Hira", service: "Mani-pedi & makeup", rating: 5, isSample: false, quote: "Excellent service and very good behaviour from the staff. The owner is very nice and one of the best in this area. The make-up artist is amazing." },
  { name: "Inshrah N.", service: "Hydrafacial", rating: 5, isSample: false, quote: "In love with my skin after the hydrafacial! Super clean, professional and welcoming. Will definitely be coming back for regular sessions." },
  { name: "Saaima S.", service: "Haircut", rating: 5, isSample: false, quote: "The service was excellent. They gave me exactly the haircut I showed them. Highly recommended!" },
  { name: "Ayesha K.", service: "Facial & haircut", rating: 5, isSample: false, quote: "I absolutely loved their facial and haircut, both were done really well, and the staff is so professional and friendly." },
  { name: "Bismah M.", service: "Hair colour", rating: 5, isSample: false, quote: "I always choose Layal Lash by Saba Kashif for all my services and they never disappoint. Today I was here for my hair colour and I love their work." },
  { name: "Azan B.", service: "Waxing & mani-pedi", rating: 5, isSample: false, quote: "Manicure and pedicure are very good, and the studio is neat and clean. I highly recommend them." },
  { name: "Abdul A.", service: "Makeup", rating: 5, isSample: false, quote: "Great ambience with a friendly environment. Enjoyed the services, and the best makeup artist." },
  { name: "Nazia I.", service: "Salon services", rating: 5, isSample: false, quote: "All the staff and the owner are very friendly and cooperative, and their services are so good. I highly recommend going there." },
  { name: "Adeen M.", service: "Party makeup & blow-dry", rating: 4, isSample: false, quote: "I went for party makeup and it was really good, and their blow-dry is so good I have been back several times. Overall a good experience. Satisfied!" },
];

const team: TeamMember[] = [
  { name: "[STAFF NAME 1]", role: "[ROLE, e.g. Senior Stylist]", bio: "[Short bio: training, specialities and years of experience, only if accurate.]", image: image("/images/team/team-1.svg", "Portrait placeholder of a salon team member", 800, 1000) },
  { name: "[STAFF NAME 2]", role: "[ROLE, e.g. Makeup Artist]", bio: "[Short bio: training, specialities and what they love doing.]", image: image("/images/team/team-2.svg", "Portrait placeholder of a makeup artist", 800, 1000) },
  { name: "[STAFF NAME 3]", role: "[ROLE, e.g. Skin Therapist]", bio: "[Short bio: training, specialities and what they love doing.]", image: image("/images/team/team-3.svg", "Portrait placeholder of a skin therapist", 800, 1000) },
];

const whyChoose: TitledText[] = [
  { icon: "users", title: "A team that listens", text: "Every visit starts with a conversation, so the result suits your style, skin and schedule." },
  { icon: "shield-check", title: "Hygiene first", text: "Tools are cleaned and sanitised between clients and single-use items are used where appropriate." },
  { icon: "sparkles", title: "Quality products", text: "We choose professional-grade products and can explain what we use on your hair and skin." },
  { icon: "calendar-check", title: "Easy booking", text: "Book by WhatsApp, phone or the form on this site, whichever is easiest for you." },
  { icon: "heart", title: "Relaxed atmosphere", text: "A calm, clean space where you can switch off while we take care of the details." },
  { icon: "leaf", title: "Honest advice", text: "We recommend what your hair and skin actually need, and tell you the price upfront." },
];

const values: TitledText[] = [
  { icon: "heart", title: "Care", text: "Every client is treated with patience, respect and attention." },
  { icon: "shield-check", title: "Hygiene", text: "Clean tools, fresh linen and tidy stations for every appointment." },
  { icon: "sparkles", title: "Craft", text: "We keep learning so our techniques and advice stay current." },
  { icon: "smile", title: "Comfort", text: "A welcoming space where everyone feels at ease." },
];

const hygieneStatement =
  "Clean tools, fresh linen and a tidy workspace for every client. Reusable tools are cleaned and sanitised between appointments, and single-use items are used where appropriate. [Edit to match your salon's actual hygiene procedures.]";
const productStatement =
  "We use professional hair, skin and nail products and are happy to talk you through what is used in your treatment. If you have sensitive skin or allergies, tell us when you book and we will suggest suitable options. [Edit to name the brands or standards you actually use.]";

const timeline: TimelineItem[] = [
  { label: "[YEAR]", title: "The salon opens", text: "[Tell the story of how [SALON NAME] started and why.]" },
  { label: "[YEAR]", title: "Growing the team", text: "[Mention new stylists, therapists or services added over time.]" },
  { label: "[YEAR]", title: "A refreshed space", text: "[Mention a renovation, a move or new treatment rooms, if applicable.]" },
  { label: "Today", title: "Here for you", text: "[Describe what the salon focuses on today.]" },
];

const faqs: Faq[] = [
  { question: "How can I book an appointment?", answer: `You can use the booking form on our contact page, message us on WhatsApp (${contact.whatsapp.display}) or call ${contact.phone.display}. Tell us the service, your preferred date and time, and we will reply to confirm availability.` },
  { question: "Do you accept walk-in customers?", answer: "Walk-ins are welcome when we have space, but appointments are recommended so we can guarantee your preferred time, especially at weekends. [Edit to match your walk-in policy.]" },
  { question: "Can I cancel or reschedule an appointment?", answer: "Yes. Please let us know as early as possible, ideally at least 24 hours before your appointment, so we can offer the slot to another client. [Edit to match your cancellation policy.]" },
  { question: "How early should I book bridal services?", answer: "We recommend booking bridal makeup and hair as soon as your date is confirmed, and arranging a trial a few weeks before the wedding. Popular dates fill up early." },
  { question: "Which payment methods are accepted?", answer: "[LIST ACCEPTED PAYMENT METHODS, e.g. cash, debit and credit cards, bank transfer.]" },
  { question: "Do you provide consultations before treatment?", answer: "Yes. Every service begins with a short consultation so we can understand your goals, your hair or skin type and any concerns before we start." },
  { question: "Are your products suitable for sensitive skin?", answer: "Please tell us about sensitive skin or allergies when booking. We can suggest suitable options and recommend a patch test for some colour, lash and skin treatments." },
  { question: "Where is the salon located?", answer: `We are at ${contact.address.street}, ${contact.address.city}. Open the contact page for directions and our opening hours.` },
];

// ---------------------------------------------------------------------------
// Gallery & before/after
// ---------------------------------------------------------------------------
const galleryCategories = [
  { id: "bridal", label: "Bridal" },
  { id: "party", label: "Party Makeup" },
  { id: "hair", label: "Hair" },
  { id: "mehndi", label: "Mehndi" },
  { id: "salon", label: "Our Salon" },
];

/** Client work and salon photos from @layal_lash_by_saba_kashif and the Google Maps listing. */
const g = (name: string) => `/images/layal/${name}.jpg`;
const gallery: GalleryItem[] = [
  { id: "bride-red", type: "image", category: "bridal", title: "Barat bride", image: image(g("bride-red"), "Bride in red with bold eye makeup, a gold and ruby nath, matha patti and heavy jewellery", 640, 800) },
  { id: "party-emerald", type: "image", category: "party", title: "Soft glam party look", image: image(g("party-emerald"), "Client with soft pink glam makeup, long side-swept curls and an emerald and diamond necklace", 640, 800) },
  { id: "highlights", type: "image", category: "hair", title: "Highlights", image: image(g("highlights"), "Long brown hair with soft caramel highlights and loose waves", 900, 1125) },
  { id: "bridal-in-progress", type: "image", category: "bridal", title: "Bridal makeup by Saba Kashif", image: image(g("bridal-in-progress"), "Saba Kashif finishing a bride's makeup in the studio", 640, 800) },
  { id: "henna", type: "image", category: "mehndi", title: "Eid mehndi", image: image(g("henna"), "Hand with a delicate floral and butterfly henna design and Eid Mubarak written in Urdu", 900, 1125) },
  { id: "hair-sleek", type: "image", category: "hair", title: "Sleek straight finish", image: image(g("hair-sleek"), "Long, sleek, straight hair seen from behind", 640, 800) },
  { id: "studio", type: "image", category: "salon", title: "Inside the studio", image: image(g("studio"), "Salon styling stations with black chairs and a red tufted feature wall", 900, 1125) },
  { id: "storefront-night", type: "image", category: "salon", title: "Our building at night", image: image(g("storefront-night"), "The salon building lit with fairy lights at night, above K&N's", 900, 1125) },
  { id: "storefront", type: "image", category: "salon", title: "Find us above K&N's", image: image(g("storefront"), "Layal Lash signboard on the first floor above K&N's on Main Double Road, Soan Gardens", 1280, 720) },
];

// Add same-angle before/after photo pairs here; the sections stay hidden while this is empty.
const beforeAfter: BeforeAfterPair[] = [];

// ---------------------------------------------------------------------------
// Animated media (clips). Set enabled:false to hide, or add video paths.
// ---------------------------------------------------------------------------
const brief = (
  kind: "hero" | "section",
  subject: string,
  replaceAt: string,
): MediaClip["brief"] => ({
  subject,
  dimensions: kind === "hero" ? "1920x1080 (plus 1080x1920 portrait for mobile)" : "1280x720 (16:9)",
  duration: kind === "hero" ? "8-15 seconds, seamless loop" : "5-10 seconds",
  format: "WebM (VP9) and MP4 (H.264), no audio track, no embedded text",
  maxSize: kind === "hero" ? "5 MB per file" : "3 MB per file",
  replaceAt,
});

const clip = (
  c: Omit<MediaClip, "enabled" | "placeholder" | "brief"> & { briefKind: "hero" | "section"; subject: string },
): MediaClip => {
  const { briefKind, subject, ...rest } = c;
  return {
    ...rest,
    enabled: true,
    placeholder: true,
    brief: brief(briefKind, subject, `Put files in /public/videos/ and set "video" on clip "${c.id}" in src/config/salon.ts`),
  };
};

const p = (file: string, alt: string): ImageAsset => image(`/images/clips/${file}.jpg`, alt, 1280, 720);

const clips: MediaClip[] = [
  clip({
    id: "home-hero", title: "Hero background", description: "Slow, decorative loop behind the home headline.",
    page: "home", section: "hero", decorative: true, briefKind: "hero",
    subject: "Slow close-ups of hair being brushed, soft makeup application and fresh towels in warm light",
    poster: image("/images/hero/hero-poster.jpg", "", 1920, 1080),
    mobile: { poster: image("/images/hero/hero-portrait.jpg", "", 1080, 1920) },
    alt: "Stylist gently styling a client's hair",
  }),
  {
    ...clip({
      id: "home-experience", title: "The salon experience", description: "Our styling studio in Soan Gardens.",
      page: "home", section: "experience", decorative: false, briefKind: "section",
      subject: "A facial or hair treatment shown in calm, close detail",
      poster: image("/images/layal/studio-wide.jpg", "Layal Lash studio with styling chairs, mirrors and a red tufted feature wall", 1280, 960),
      alt: "Layal Lash studio with styling chairs, mirrors and a red tufted feature wall",
    }),
    // Salon photo, not a clip: shown as a still without the placeholder label.
    placeholder: false,
  },
  {
    ...clip({
      id: "home-makeup", title: "Makeup artistry", description: "Animated makeup products beside the makeup services.",
      page: "home", section: "makeup", decorative: false, briefKind: "section",
      subject: "Lipstick, compact and nail polish being opened (built-in animation; replace with a real clip if you prefer)",
      poster: p("makeup", "Animated lipstick, powder compact and nail polish opening and closing"),
      alt: "Animated lipstick, powder compact and nail polish opening and closing",
    }),
    animation: "products",
    placeholder: false,
  },
  clip({
    id: "services-intro", title: "Services introduction", description: "Decorative loop behind the services page heading.",
    page: "services", section: "intro", decorative: true, briefKind: "hero",
    subject: "Soft macro shots of brushes, towels and products",
    poster: p("services-intro", ""), alt: "",
  }),
  {
    ...clip({
      id: "services-hair-break", title: "Hair styling clip", description: "Shown between hair and makeup services.",
      page: "services", section: "break-hair", decorative: false, briefKind: "section",
      subject: "Hair styling: brushing, curling or a finished blow-dry",
      poster: image("/images/layal/highlights-16x9.jpg", "Long brown hair with soft caramel highlights and loose waves", 1280, 720),
      alt: "Long brown hair with soft caramel highlights and loose waves",
    }),
    placeholder: false,
    afterCategoryId: "hair-treatments",
  },
  {
    ...clip({
      id: "services-makeup-break", title: "Makeup clip", description: "Shown after the makeup services.",
      page: "services", section: "break-makeup", decorative: false, briefKind: "section",
      subject: "Makeup application with soft brushes",
      poster: p("makeup", "Animated lipstick opening and closing"),
      alt: "Animated lipstick opening and closing",
    }),
    animation: "lipstick",
    placeholder: false,
    afterCategoryId: "party-makeup",
  },
  {
    ...clip({
      id: "services-spa-break", title: "Skincare and spa clip", description: "Shown after skincare services.",
      page: "services", section: "break-spa", decorative: false, briefKind: "section",
      subject: "Skincare or spa treatment with warm towels and gentle hand movements",
      poster: image("/images/layal/henna-16x9.jpg", "Hand with a delicate floral and butterfly henna design", 1080, 608),
      alt: "Hand with a delicate floral and butterfly henna design",
    }),
    placeholder: false,
    afterCategoryId: "facials-skincare",
  },
  clip({
    id: "gallery-intro", title: "Gallery introduction", description: "Decorative loop behind the gallery heading.",
    page: "gallery", section: "intro", decorative: true, briefKind: "hero",
    subject: "Slow pans across styling stations and finished looks",
    poster: p("gallery-intro", ""), alt: "",
  }),
  {
    ...clip({
    id: "about-environment", title: "Inside the salon", description: "A short walk through the salon space.",
    page: "about", section: "environment", decorative: false, briefKind: "section",
    subject: "Slow pan of the reception, styling area and treatment room (no people's faces without consent)",
    poster: image("/images/layal/studio-16x9.jpg", "Layal Lash styling stations with black chairs and a red tufted feature wall", 1280, 720),
    alt: "Layal Lash styling stations with black chairs and a red tufted feature wall",
    }),
    placeholder: false,
  },
  clip({
    id: "contact-intro", title: "Booking introduction", description: "Decorative loop behind the contact heading.",
    page: "contact", section: "intro", decorative: true, briefKind: "hero",
    subject: "Soft lifestyle shots: appointment book, coffee, fresh flowers",
    poster: p("contact-intro", ""), alt: "",
  }),
];

// ---------------------------------------------------------------------------
// SEO
// ---------------------------------------------------------------------------
const seo = {
  defaultTitle: `${name} | Beauty Salon in ${city}`,
  titleTemplate: `%s | ${name}`,
  description: `${name} is a beauty salon in ${city} offering haircuts, colouring, bridal and party makeup, facials, manicure and pedicure, waxing and spa treatments. Book online or on WhatsApp.`,
  keywords: [
    `beauty salon in ${city}`,
    `ladies salon in ${city}`,
    "hair salon near me",
    `bridal makeup in ${city}`,
    "facial and skincare services",
    `manicure and pedicure in ${city}`,
  ],
  pages: {
    home: { title: `Beauty Salon in ${city}: Hair, Makeup & Skincare`, description: `Book hair, bridal makeup, facial, manicure and spa appointments at ${name} in ${city}. Clear prices, a hygienic space and easy WhatsApp booking.` },
    services: { title: `Services & Prices in ${city}`, description: `Browse haircuts, colouring, bridal and party makeup, facials, nails, waxing and spa treatments at ${name}, with clear starting prices.` },
    gallery: { title: "Gallery & Before and After", description: `See recent hair, makeup, skincare and nail work from ${name} in ${city}, including before-and-after comparisons.` },
    about: { title: `About Our Salon in ${city}`, description: `Meet the team at ${name}, learn our story and see how we care for every client's hair, skin and comfort.` },
    contact: { title: "Book an Appointment & Contact", description: `Request an appointment at ${name} in ${city} by WhatsApp, phone or our booking form. See opening hours and directions.` },
  } satisfies Record<string, SeoPage>,
};

// ---------------------------------------------------------------------------
// Final export
// ---------------------------------------------------------------------------
export const salon = {
  name,
  city,
  /** `image` (square) replaces the initials badge in the header when set. */
  logo: { initials: "LL", image: undefined as string | undefined },
  tagline: "Makeup studio, salon & academy",
  shortDescription: `A makeup studio, salon and beauty academy in Soan Gardens, ${city}, open 7 days a week.`,
  description: `${name} is a makeup studio, salon and beauty academy in Soan Gardens, ${city}, led by makeup artist and educator Saba Kashif. We offer bridal and party makeup, hair colour and treatments, Hydrafacials, BB Glow, PRP, lash extensions, nails and waxing, plus makeup and lash courses.`,
  aboutIntro: `At ${name}, every appointment begins with a conversation. Saba Kashif and her team take their time with each step, so you leave feeling refreshed, looked after and like yourself.`,
  aboutImages: {
    story: image("/images/layal/bridal-in-progress.jpg", "Saba Kashif finishing a bride's makeup in the studio", 640, 800),
    interior: image("/images/layal/studio-wide.jpg", "Layal Lash studio with styling chairs, mirrors and a red tufted feature wall", 1280, 960),
  },
  /** Public site URL. Set NEXT_PUBLIC_SITE_URL in the environment for production. */
  siteUrl: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.example-salon.com").replace(/\/$/, ""),
  currency: { code: "PKR", locale: "en-PK" },
  /** Set to false at launch to hide "Sample" and "Placeholder" labels. */
  showPlaceholderLabels: true,
  /** Price lists are guides only. Shown as a note under the price list. */
  priceNote: "Prices are a guide and may vary with hair length, thickness and treatment needs. We will confirm the final price before we start.",
  hero: {
    eyebrow: `Beauty salon in ${city}`,
    headline: "Feel beautiful, from the first hello",
    subheadline: `Hair, makeup, skincare and nails in a calm, clean space in ${city}. Tell us what you have in mind and we will take care of the rest.`,
    highlights: ["Consultation with every service", "Clear prices", "Book by WhatsApp"],
    /** Collage beside the headline (desktop). The first image is the large one. */
    images: [
      image("/images/layal/bride-red.jpg", "Bride in red with bold eye makeup, a gold and ruby nath, matha patti and heavy jewellery", 640, 800),
      image("/images/layal/party-emerald.jpg", "Client with soft pink glam makeup, long curls and an emerald and diamond necklace", 640, 800),
    ],
  },
  contact,
  hours,
  social,
  bookingTimeSlots: ["11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"],
  categories,
  services,
  offers,
  googleReviews,
  testimonials,
  team,
  whyChoose,
  values,
  hygieneStatement,
  productStatement,
  timeline,
  faqs,
  galleryCategories,
  gallery,
  beforeAfter,
  /** Home page bridal lookbook. The first image is the large feature. */
  lookbook: [
    { title: "Bridal makeup by Saba Kashif", image: image("/images/layal/bridal-in-progress.jpg", "Saba Kashif finishing a bride's makeup in the studio", 640, 800) },
    { title: "Highlights", image: image("/images/layal/highlights.jpg", "Long brown hair with soft caramel highlights and loose waves", 900, 1125) },
    { title: "Eid mehndi", image: image("/images/layal/henna.jpg", "Hand with a delicate floral and butterfly henna design", 900, 1125) },
    { title: "Sleek finish", image: image("/images/layal/hair-sleek.jpg", "Long, sleek, straight hair seen from behind", 640, 800) },
    { title: "Our studio", image: image("/images/layal/studio.jpg", "Salon styling stations with black chairs and a red tufted feature wall", 900, 1125) },
  ],
  clips,
  seo,
  /** Used by privacy and terms pages. */
  legal: { lastUpdated: "[DATE]" },
};

export type Salon = typeof salon;
