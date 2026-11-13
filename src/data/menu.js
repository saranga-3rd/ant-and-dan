// Ant & Dan's menu, from the client's "A&D updated menu" (Nov 2026).
// No prices were supplied, so the site shows sizes and contents only.
// Third-party drink and spread brands are written generically on purpose (see copy/brand-kit.md §9).

export const classics = [
  { name: "Margherita", desc: "Tomato, mozzarella, parmesan, basil, oregano" },
  { name: "Tony Pepperoni", desc: "Tomato, mozzarella, pepperoni, parmesan" },
  { name: "Kochchi & Ham", desc: "Tomato, mozzarella, ham, fresh kochchi chilli, red onion, parmesan" },
  { name: "Hawaiian", desc: "Tomato, mozzarella, ham, pineapple, parmesan" },
  { name: "Devilled Chicken", desc: "Tomato, mozzarella, devilled chicken, red onion, roasted capsicum" },
  { name: "Four Cheese", desc: "Mozzarella, cheddar, parmesan, ricotta, black pepper" },
  { name: "Peri Peri", desc: "Peri peri chicken, mozzarella, roasted capsicum, red onion, peri peri sauce" },
  { name: "BBQ Chicken", desc: "BBQ chicken, mozzarella, red onion, roasted capsicum, BBQ sauce" },
  { name: "Veggie", desc: "Tomato, mozzarella, roasted mushroom, capsicum, red onion, olives, parmesan" },
];

export const premiums = [
  { name: "Prawn & Calamari", desc: "Tomato, mozzarella, garlic-marinated prawns, calamari, confit cherry tomatoes, fresh chilli, parsley, lemon" },
  { name: "The Big Dan", desc: "Tomato, mozzarella, double pepperoni, Italian sausage, roasted chicken, mushrooms, caramelised onions, parmesan" },
  { name: "Tandoori Chicken", desc: "Tandoori-marinated chicken, mozzarella, roasted capsicum, red onion, mint yoghurt dressing, fresh coriander" },
];

export const finishes = ["House chilli oil", "Honey", "Chilli flakes", "Parmesan"];

export const melts = [
  { name: "Chicken Parm", desc: "Crumbed chicken, tomato sauce, mozzarella, parmesan, basil" },
  { name: "Peri Peri Chicken", desc: "Peri peri chicken, mozzarella, roasted capsicum, red onion, peri peri sauce" },
  { name: "The Big Dan", desc: "Pepperoni, Italian sausage, roasted chicken, mozzarella, mushrooms, caramelised onions, parmesan" },
  { name: "BBQ Pepperoni & Sausage", desc: "Pepperoni, Italian sausage, mozzarella, roasted capsicum, red onion, BBQ sauce" },
  { name: "Four Cheese & Mushroom", desc: "Mozzarella, cheddar, parmesan, ricotta, roasted mushrooms, black pepper" },
  { name: "Garlic Prawn & Calamari", desc: "Garlic-marinated prawns, calamari, mozzarella, confit cherry tomatoes, fresh chilli, parsley" },
];

export const pastaShapes = ["Spaghetti", "Fettuccine", "Fusilli", "Penne"];
export const pastaSizes = ["Small", "Large"];
export const pastaSauces = [
  { name: "Kochchi Chicken", desc: "Roasted chicken, kochchi chilli, garlic, baby spinach, parmesan cream", heat: true },
  { name: "Chicken Parm", desc: "Crumbed chicken, tomato sauce, mozzarella, parmesan, basil" },
  { name: "Pesto Chicken", desc: "Roasted chicken, basil pesto, parmesan, cherry tomato" },
  { name: "Creamy Chicken", desc: "Roasted chicken, garlic, parmesan cream, black pepper" },
  { name: "Beef Bolognese", desc: "Slow-cooked beef, tomato, parmesan" },
  { name: "Carbonara", desc: "Pancetta, egg yolk, pecorino, parmesan, black pepper" },
  { name: "Garlic Chilli Prawn", desc: "Prawns, tomato, garlic, chilli, lemon, parsley, cherry tomato, rocket", heat: true },
  { name: "Mushroom & Truffle", desc: "Roasted mushrooms, garlic cream, parmesan, black pepper, truffle" },
  { name: "Four Cheese", desc: "Mozzarella, cheddar, parmesan, ricotta, black pepper" },
  { name: "Jaffna Calamari", desc: "Calamari, Jaffna spices, garlic, chilli, tomato", heat: true },
];

export const extras = [
  { name: "Garlic Knots", desc: "Garlic butter, parmesan, parsley, garlic parmesan dip" },
  { name: "Mozzarella Sticks", desc: "Crumbed mozzarella, warm tomato dip" },
  { name: "Arancini", desc: "Crispy risotto balls, mozzarella centre, parmesan, tomato sauce" },
  { name: "A&D Fries", desc: "Garlic butter, parmesan, parsley, A&D Sauce. Regular or double" },
  { name: "Load 'Em Up", desc: "Crispy chicken, cheese sauce, kochchi chilli, spring onion. Regular or double" },
  { name: "Crispy Chicken Bites", desc: "Boneless crispy chicken, parmesan. A&D Sauce or hot honey and pickled chilli" },
  { name: "Mac & Cheese", desc: "Creamy cheese sauce, mozzarella, parmesan crumb. Regular or double" },
];

export const freshPicks = [
  { name: "Classic Caesar", desc: "Cos lettuce, parmesan, garlic croutons, Caesar dressing, lemon" },
  { name: "Italian Chopped", desc: "Cos lettuce, tomato, cucumber, red onion, parmesan, Italian herb dressing" },
  { name: "Rocket & Parmesan", desc: "Rocket, cherry tomatoes, shaved parmesan, lemon dressing" },
];
export const freshAddOns = ["Roasted chicken", "Crispy chicken", "Garlic chilli prawns"];

export const sweets = [
  { name: "Tiramisu", desc: "Mascarpone, espresso, cocoa" },
  { name: "Big Cookie", desc: "Warm chocolate-chip cookie, vanilla, chocolate or twist soft serve, chocolate sauce" },
  { name: "Chocolate Brownie", desc: "Warm chocolate brownie, soft serve, salted caramel" },
  { name: "Banana Chocolate Pie", desc: "Hazelnut chocolate spread, banana, chocolate drizzle, crushed hazelnuts, vanilla mascarpone. Half or full pie" },
  { name: "Soft Serve", desc: "Vanilla, chocolate or twist" },
  { name: "The A&D Sundae", desc: "Soft serve, banana, warm brownie, cookie chunks, chocolate sauce, salted caramel, crushed nuts" },
];

export const meals = [
  { name: "Slice Meal", main: "1 pizza slice", side: "Regular A&D Fries or a Fresh Pick", drinks: "1 post-mix drink", feeds: "1" },
  { name: "Half Pie Meal", main: "Half an 18\" pie", side: "Regular A&D Fries or a Fresh Pick", drinks: "2 post-mix drinks", feeds: "2", featured: true },
  { name: "Full Pie Meal", main: "A full 18\" pie", side: "2 regular A&D Fries or 2 Fresh Picks", drinks: "4 post-mix drinks", feeds: "4" },
  { name: "Pasta Meal", main: "Small pasta, your way", side: "Regular A&D Fries or a Fresh Pick", drinks: "1 post-mix drink", feeds: "1" },
  { name: "Melt Meal", main: "1 melt", side: "Regular A&D Fries or a Fresh Pick", drinks: "1 post-mix drink", feeds: "1" },
];

export const levelUps = [
  { name: "Double it", desc: "Upgrade your pasta, A&D Fries or Fresh Pick to double" },
  { name: "Shake it", desc: "Swap any post-mix drink for an old school thickshake" },
  { name: "Beer upgrade", desc: "Swap any post-mix drink for a draft lager" },
  { name: "Load it", desc: "Regular A&D Fries become Loaded A&D Fries" },
];

export const shakes = [
  { name: "Vanilla", desc: "Classic vanilla ice cream thickshake", swatch: "#F1E4C6" },
  { name: "Chocolate", desc: "Rich chocolate ice cream thickshake", swatch: "#6A3D2C" },
  { name: "Salted Caramel", desc: "Creamy caramel, a touch of sea salt", swatch: "#C88A3B" },
  { name: "Cookies & Cream", desc: "Vanilla ice cream, crushed chocolate cookies", swatch: "#D8D6D2" },
  { name: "Banana", desc: "Vanilla ice cream, fresh banana", swatch: "#EFD15A" },
  { name: "Choc Banana", desc: "Chocolate ice cream, fresh banana", swatch: "#8B5B2C" },
];
export const shakeExtras = ["Malt", "Whipped cream", "Extra thick", "Chocolate sauce", "Salted caramel"];

export const drinks = [
  { name: "Draft lager", desc: "Cold, fresh, straight from the tap" },
  { name: "Post-mix soft drinks", desc: "Cola, zero-sugar cola, lemonade, orange soda" },
  { name: "Water", desc: "Still or sparkling" },
];

// Contact details are placeholders until the client confirms them (copy/brand-kit.md §13).
export const contact = {
  address: "Level 3 Food Court, [Mall name], Colombo, Sri Lanka",
  phone: "+94 11 234 5678",
  phoneHref: "tel:+94112345678",
  email: "hello@antanddans.lk",
  hours: [
    { days: "Sunday to Thursday", time: "10:00 to 23:00" },
    { days: "Friday and Saturday", time: "10:00 to midnight" },
  ],
  socials: [
    { name: "Instagram", handle: "@antanddans", href: "https://instagram.com/antanddans" },
    { name: "TikTok", handle: "@antanddans", href: "https://www.tiktok.com/@antanddans" },
    { name: "Facebook", handle: "/antanddans", href: "https://facebook.com/antanddans" },
  ],
};
