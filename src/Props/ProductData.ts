export interface ProductProps {
  id: string;
  title: string;
  price: string;
  description: string;
  image_prompt: string;
  image: string;
}

export const productData: ProductProps[] = [
  {
    id: "1",
    title: "Eco-Friendly TPE Yoga Mat",
    price: "₹549",
    description:
      "6mm thick, dual-layered non-slip surface ideal for floor workouts and yoga.",
    image_prompt:
      "plain purple yoga mat rolled halfway with no visible branding",
    image:
      "https://5.imimg.com/data5/PW/LT/MY-3005976/nbr-yoga-mat-500x500.jpg",
  },
  {
    id: "2",
    title: "Textured PVC Yoga Mat",
    price: "₹399",
    description:
      "Durable, water-resistant mat with grip texture. Suitable for all fitness levels.",
    image_prompt:
      "blue mat laid out on a wooden floor, person in downward dog pose",
    image:
      "https://thumbs.dreamstime.com/b/slender-woman-downward-dog-pose-girl-doing-yoga-indoors-slender-woman-downward-dog-pose-girl-doing-yoga-indoors-213363957.jpg",
  },
  {
    id: "3",
    title: "Travel-Friendly Foldable Yoga Mat",
    price: "₹299",
    description:
      "Lightweight, compact mat ideal for on-the-go stretching or yoga.",
    image_prompt: "grey mat folded neatly beside a water bottle",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXNAFuKwIc21X28qxvsSOT02YKIDs3Zchg9Q&s",
  },
  {
    id: "4",
    title: "Cotton Woven Fitness Mat",
    price: "₹599",
    description:
      "Handcrafted, natural cotton mat for meditation, pilates, or low-impact routines.",
    image_prompt: "off-white mat with fringe edges on a balcony floor",
    image: "https://m.media-amazon.com/images/I/818rMxvTOCL.jpg",
  },
  {
    id: "5",
    title: "Loop Resistance Bands Set (5 Levels)",
    price: "₹349",
    description:
      "Includes 5 color-coded latex bands for various strength training levels.",
    image_prompt:
      "five bands arranged in rainbow order on a plain white background",
    image:
      "https://thumbs.dreamstime.com/b/colorful-rubber-bands-isolated-white-background-142520011.jpg",
  },
  {
    id: "6",
    title: "Single Long Resistance Band – Medium Strength",
    price: "₹129",
    description: "Ideal for home workouts, stretching, or injury rehab.",
    image_prompt: "one red resistance band looped on a doorknob",
    image:
      "https://m.media-amazon.com/images/I/612CciCVuIL._AC_UF894,1000_QL80_.jpg",
  },
  {
    id: "7",
    title: "Figure 8 Resistance Tube",
    price: "₹149",
    description: "Double-handled figure 8 band for upper body workouts.",
    image_prompt: "black band with foam handles lying on a gym mat",
    image: "https://m.media-amazon.com/images/I/51nhGf+LMsL.jpg",
  },
  {
    id: "8",
    title: "Fabric Hip Resistance Band",
    price: "₹249",
    description: "Thick, non-slip band designed for leg and glute workouts.",
    image_prompt: "grey fabric band around thighs in squat position",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf8Olad3HRVhTMqEcMgrmEAMthayG__swSEw&s",
  },
  {
    id: "9",
    title: "Dual-Wheel Ab Roller with Knee Pad",
    price: "₹449",
    description: "Strengthens core and abs with stable dual-wheel design.",
    image_prompt: "black and red roller beside foam pad",
    image:
      "https://m.media-amazon.com/images/I/51rUwaBpXdL._AC_UF894,1000_QL80_.jpg",
  },
  {
    id: "10",
    title: "Compact Single-Wheel Ab Roller",
    price: "₹299",
    description: "Basic core workout tool, easy to carry and store.",
    image_prompt: "single black wheel with steel rod handles",
    image: "https://m.media-amazon.com/images/I/51KlnqsaK8L.jpg",
  },
  {
    id: "11",
    title: "Wide-Grip Ab Roller for Beginners",
    price: "₹379",
    description: "Wider base for added stability, ideal for starters.",
    image_prompt: "blue roller with textured wheels and grips",
    image:
      "https://m.media-amazon.com/images/I/71OwLWK4jxL._AC_UF1000,1000_QL80_.jpg",
  },
  {
    id: "12",
    title: "Heavy-Duty Metal Core Ab Roller",
    price: "₹599",
    description: "Steel core handles for durability, suitable for intense use.",
    image_prompt: "silver core roller on a yoga mat with dumbbells nearby",
    image:
      "https://5.imimg.com/data5/SELLER/Default/2023/3/296937354/UH/OM/RH/157610668/ab-wheel-roller.jpg",
  },
  {
    id: "13",
    title: "Adjustable PVC Skipping Rope",
    price: "₹149",
    description:
      "Basic fitness rope with plastic handles and adjustable length.",
    image_prompt: "red rope coiled next to a pair of sports shoes",
    image: "https://m.media-amazon.com/images/I/81B0l3InLKL._AC_UY1000_.jpg",
  },
  {
    id: "14",
    title: "Foam Handle Skipping Rope",
    price: "₹199",
    description: "Comfortable grip, tangle-free design for daily cardio.",
    image_prompt: "black rope with blue foam handles hanging on a hook",
    image:
      "https://m.media-amazon.com/images/I/71H00tvkiYL._AC_UF350,350_QL80_.jpg",
  },
  {
    id: "15",
    title: "Weighted Skipping Rope",
    price: "₹249",
    description: "Built-in weights for advanced cardio and arm toning.",
    image_prompt: "green rope, handles slightly bulkier with visible weights",
    image: "https://m.media-amazon.com/images/I/51oor+rfENS.jpg",
  },
  {
    id: "16",
    title: "Speed Jump Rope (Steel Cable)",
    price: "₹299",
    description: "High-speed cable rope for crossfit or HIIT routines.",
    image_prompt: "coiled metal rope with matte black handles on gym floor",
    image:
      "https://m.media-amazon.com/images/I/718UR5ObBdL._AC_UF894,1000_QL80_.jpg",
  },
];
