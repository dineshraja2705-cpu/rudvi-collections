import kurti from "@/assets/kurti.jpg";
import kurtiDetail from "@/assets/kurti-detail.jpg";
import coordSet from "@/assets/coord-set.jpg";
import coordSetDetail from "@/assets/coord-set-detail.jpg";
import koreanDress from "@/assets/korean-dress.jpg";
import koreanDressDetail from "@/assets/korean-dress-detail.jpg";
import nightie from "@/assets/nightie.jpg";
import nightieDetail from "@/assets/nightie-detail.jpg";
import saree from "@/assets/saree.jpg";
import sareeDetail from "@/assets/saree-detail.jpg";
import readyBlouse from "@/assets/ready-blouse.jpg";
import readyBlouseDetail from "@/assets/ready-blouse-detail.jpg";
import kidsWear from "@/assets/kids-wear.jpg";
import kidsWearDetail from "@/assets/kids-wear-detail.jpg";

export interface Dress {
  id: string;
  name: string;
  category: string;
  image: string;
  images: string[];
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  offer?: string;
  fabric: string;
  description: string;
  details: string[];
  sizes: string[];
}

export const collections: Dress[] = [
  {
    id: "kurtis",
    name: "Kurtis",
    category: "Ethnic Wear",
    image: kurti,
    images: [kurti, kurtiDetail],
    price: 500,
    oldPrice: 1000,
    rating: 4.8,
    reviews: 215,
    offer: "29% OFF",
    fabric: "Cotton Silk with Embroidery",
    description:
      "Elegant everyday kurtis in breathable cotton silk, finished with subtle embroidery and a flattering silhouette. Perfect for work, college, or casual celebrations.",
    details: [
      "Breathable cotton silk blend",
      "Delicate neckline embroidery",
      "3/4 sleeves & side slits",
      "Machine wash gentle cycle",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "coord-sets",
    name: "Coord Sets",
    category: "Festive Coord",
    image: coordSet,
    images: [coordSet, coordSetDetail],
    price: 499,
    oldPrice: 1000,
    rating: 4.9,
    reviews: 178,
    offer: "23% OFF",
    fabric: "Georgette with Sequin Work",
    description:
      "Trendy coordinated sets pairing a sculpted crop top with flowing palazzos or a skirt. Effortless ethnic glamour for festive gatherings and intimate weddings.",
    details: [
      "Matching top & bottom set",
      "Sequin & thread embellishment",
      "Includes dupatta",
      "Dry clean only",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: "korean-dresses",
    name: "Korean Dresses",
    category: "Korean Style",
    image: koreanDress,
    images: [koreanDress, koreanDressDetail],
    price: 2500,
    oldPrice: 3500,
    rating: 4.7,
    reviews: 132,
    offer: "22% OFF",
    fabric: "Chiffon with Floral Print",
    description:
      "Soft, romantic Korean-inspired dresses with flutter sleeves, ruffle details, and airy floral prints. A modern addition to your everyday wardrobe.",
    details: [
      "Lightweight chiffon",
      "Floral print & ruffle accents",
      "Concealed back zip",
      "Gentle hand wash",
    ],
    sizes: ["XS", "S", "M", "L"],
  },
  {
    id: "nighties",
    name: "Nighties",
    category: "Sleepwear",
    image: nightie,
    images: [nightie, nightieDetail],
    price: 1499,
    oldPrice: 1999,
    rating: 4.6,
    reviews: 98,
    offer: "25% OFF",
    fabric: "Cotton Modal with Lace",
    description:
      "Comfortable cotton-modal nighties with delicate lace trims and a relaxed fit. Sleep in softness and wake up refreshed.",
    details: [
      "Soft cotton-modal fabric",
      "Lace V-neck & hem",
      "Relaxed A-line fit",
      "Machine wash friendly",
    ],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "sarees",
    name: "Sarees",
    category: "Traditional",
    image: saree,
    images: [saree, sareeDetail],
    price: 3499,
    oldPrice: 5000,
    rating: 4.9,
    reviews: 312,
    offer: "25% OFF",
    fabric: "Pure Silk with Zari Border",
    description:
      "Timeless silk sarees with rich zari borders and classic motifs. Draped to perfection, these sarees bring heritage elegance to every occasion.",
    details: [
      "Pure silk with zari weave",
      "Unstitched blouse piece included",
      "6.3 metres with border",
      "Dry clean only",
    ],
    sizes: ["Free Size"],
  },
  {
    id: "ready-made-blouse",
    name: "Ready Made Blouse",
    category: "Blouses",
    image: readyBlouse,
    images: [readyBlouse, readyBlouseDetail],
    price: 2499,
    oldPrice: 3299,
    rating: 4.8,
    reviews: 167,
    offer: "24% OFF",
    fabric: "Silk with Bead Work",
    description:
      "Ready-to-wear silk blouses stitched with padded cups, elbow sleeves, and intricate beadwork. Pair effortlessly with your favourite saree or lehenga.",
    details: [
      "Padded, ready-to-wear fit",
      "Elbow sleeve with beadwork",
      "Hook & eye back closure",
      "Dry clean only",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "kids-wear",
    name: "Kids Wear",
    category: "Kids",
    image: kidsWear,
    images: [kidsWear, kidsWearDetail],
    price: 2499,
    oldPrice: 4499,
    rating: 4.9,
    reviews: 142,
    offer: "22% OFF",
    fabric: "Organza with Embroidery",
    description:
      "Adorable ethnic wear for little ones — lehengas, gowns, and kurta sets crafted with soft fabrics and comfortable fits so they shine at every celebration.",
    details: [
      "Soft organza & lining",
      "Floral embroidery & sequins",
      "Elastic waist for comfort",
      "Gentle hand wash",
    ],
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"],
  },
];

export const getDress = (id: string) => collections.find((d) => d.id === id);
