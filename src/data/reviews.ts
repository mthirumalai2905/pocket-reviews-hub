import sneakers from "@/assets/sneakers.jpg";
import headphones from "@/assets/headphones.jpg";
import smartwatch from "@/assets/smartwatch.jpg";

export type Review = {
  slug: string;
  title: string;
  category: string;
  shortDescription: string;
  image: string;
  price: string;
  rating: number;
  summary: string;
  pros: string[];
  cons: string[];
  detailed: string[];
  amazonUrl: string;
};

export const reviews: Review[] = [
  {
    slug: "sneakers-under-2000",
    title: "Best Sneakers Under ₹2000",
    category: "Footwear",
    shortDescription:
      "Lightweight, breathable everyday sneakers that punch well above their price tag.",
    image: sneakers,
    price: "₹1,799",
    rating: 4.3,
    summary:
      "An exceptional pair of daily-wear sneakers offering surprising comfort, decent build, and a clean minimal design — all under ₹2000.",
    pros: [
      "Extremely lightweight and breathable mesh upper",
      "Comfortable cushioned insole for all-day wear",
      "Clean, versatile look that pairs with anything",
      "Solid stitching and grippy outsole",
    ],
    cons: ["Sizing runs slightly small — order half a size up", "Not ideal for heavy rain"],
    detailed: [
      "These sneakers nail the basics. Out of the box, the mesh upper feels soft, the tongue is well padded, and the lacing system holds your foot securely without pinching. After two weeks of daily wear — including long walks and a couple of casual runs — there were no signs of sole separation or insole flattening.",
      "The biggest surprise is the cushioning. For a sub-₹2000 pair, the EVA midsole gives a noticeably bouncy step, and the rubber outsole grips well on tile, concrete, and lightly damp surfaces. The minimal silhouette also means they look great with jeans, joggers, or shorts.",
      "If you're hunting for a clean everyday sneaker without spending five figures, this is the one to beat. Just go half a size up and you're set.",
    ],
    amazonUrl: "https://www.amazon.in/?tag=YOUR_AFFILIATE_TAG",
  },
  {
    slug: "budget-headphones",
    title: "Top Budget Headphones",
    category: "Audio",
    shortDescription:
      "Punchy bass, clean mids, and a comfortable fit — the best wireless headphones under ₹2000.",
    image: headphones,
    price: "₹1,899",
    rating: 4.4,
    summary:
      "A genuinely impressive pair of over-ear wireless headphones with strong battery life and surprisingly balanced sound for the price.",
    pros: [
      "Up to 40 hours of battery life",
      "Comfortable plush ear cushions",
      "Bluetooth 5.3 with stable connection",
      "Foldable, travel-friendly design",
    ],
    cons: ["No active noise cancellation", "Bass can feel heavy on default EQ"],
    detailed: [
      "For under ₹2000, the build quality is the first thing that stands out — matte plastic that doesn't feel cheap, smooth folding hinges, and soft protein-leather earcups that stay comfortable for hours.",
      "Sound-wise, expect a bass-forward signature that works great for hip-hop, EDM, and casual movie watching. Mids are clear, and vocals don't get drowned out. With a quick EQ tweak in any companion app, you can flatten the response and get an even better experience.",
      "Battery life is the real hero — easily 35+ hours in real-world testing. Pair these with the comfortable fit and you've got a daily driver that's hard to beat at this price.",
    ],
    amazonUrl: "https://www.amazon.in/?tag=YOUR_AFFILIATE_TAG",
  },
  {
    slug: "smartwatch-under-2000",
    title: "Best Smartwatch Under ₹2000",
    category: "Wearables",
    shortDescription:
      "A bright AMOLED display, 7-day battery, and full fitness tracking under ₹2000.",
    image: smartwatch,
    price: "₹1,999",
    rating: 4.2,
    summary:
      "A feature-packed smartwatch that delivers a premium feel, accurate health tracking, and a vibrant display far above its price class.",
    pros: [
      "Crisp 1.43\" AMOLED display",
      "7-day real-world battery life",
      "Heart rate, SpO2, and sleep tracking",
      "100+ sports modes and IP68 rating",
    ],
    cons: ["Notifications are read-only (no quick reply)", "GPS is connected, not built-in"],
    detailed: [
      "The display is the headline feature — a vibrant AMOLED panel with great brightness outdoors and rich, deep blacks indoors. Touch response is smooth, and the watch faces look genuinely premium.",
      "Health tracking is solid for the price. Heart-rate readings stayed within 3-4 bpm of a chest strap during light cardio, and sleep tracking is reasonably accurate at detecting wake/sleep transitions.",
      "Battery life consistently lasted 6-7 days with always-on display off and notifications enabled. For anyone wanting a no-nonsense fitness companion under ₹2000, this is one of the strongest picks available right now.",
    ],
    amazonUrl: "https://www.amazon.in/?tag=YOUR_AFFILIATE_TAG",
  },
];

export const getReview = (slug: string) => reviews.find((r) => r.slug === slug);
