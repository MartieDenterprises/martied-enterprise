// ===== CONFIGURATION =====
const BASE_IMAGE_URL = 'images/';

// ===== PAGINATION CONFIG =====
const PRODUCTS_PER_PAGE = 8;
let currentPage = 1;
let filteredProducts = [];
let isLoading = false;
let infiniteScrollEnabled = false;
let currentSort = 'default';

// ===== PRODUCT DATA WITH STOCK =====
// Total: 132 products (42 original + 90 new from catalog pages 6-15)
let products = [
    { id: 1, name: "Laundry Net", category: "household", price: 1800, image: "laundry-net.jpeg", badge: "", description: "Durable mesh net for protecting clothes in the washing machine.", stock: 9999, soldToday: 3 },
    { id: 2, name: "Portable Rechargeable Juicer", category: "kitchenware", price: 4500, image: "portable-juicer.jpeg", badge: "hot", description: "USB rechargeable mini blender. Perfect for smoothies on the go.", stock: 9999, soldToday: 5 },
    { id: 3, name: "Potato Peeler", category: "kitchenware", price: 1800, image: "potato-peeler.jpeg", badge: "", description: "Sharp stainless steel blade with comfortable grip handle.", stock: 9999, soldToday: 2 },
    { id: 4, name: "2 Step Soap Case", category: "household", price: 1600, image: "soap-case.jpeg", badge: "", description: "Drainage soap dish with two-tier design. Keeps soap dry.", stock: 9999, soldToday: 1 },
    { id: 5, name: "6 Way Aluminium Grater", category: "kitchenware", price: 3500, image: "aluminium-grater.jpeg", badge: "", description: "Multi-purpose grater with 6 different blade styles.", stock: 9999, soldToday: 2 },
    { id: 6, name: "Lunch Bag (Insulated)", category: "household", price: 2600, image: "lunch-bag.jpeg", badge: "", description: "Thermal insulated lunch bag. Keeps food warm or cold.", stock: 9999, soldToday: 3 },
    { id: 7, name: "Gym/Student Size Towel", category: "household", price: 2500, image: "gym-towel.jpeg", badge: "", description: "Compact quick-dry towel. Perfect for gym, travel, or school.", stock: 9999, soldToday: 4 },
    { id: 8, name: "Bowl - Dozen", category: "kitchenware", price: 7500, image: "bowl-dozen.jpeg", badge: "", description: "Set of 12 colorful plastic bowls. Stackable and durable.", stock: 9999, soldToday: 1 },
    { id: 9, name: "Fruit Basket - Dozen", category: "kitchenware", price: 6500, image: "fruit-basket.jpeg", badge: "", description: "12-piece fruit basket set. Elegant design for serving.", stock: 9999, soldToday: 2 },
    { id: 10, name: "Hand Grater", category: "kitchenware", price: 3000, image: "hand-grater.jpeg", badge: "", description: "Ergonomic hand grater for cheese, vegetables, and more.", stock: 40, soldToday: 3 },
    { id: 11, name: "Cloth Peg Basket Set", category: "household", price: 2000, image: "peg-basket.jpeg", badge: "bestseller", description: "Basket with 24 cloth pegs included. Best seller item!", stock: 70, soldToday: 8 },
    { id: 12, name: "Kitchen Napkins (Set)", category: "household", price: 5000, image: "kitchen-napkins.jpeg", badge: "", description: "Premium kitchen napkins. Absorbent and reusable.", stock: 30, soldToday: 2 },
    { id: 13, name: "2 IN 1 Towel", category: "household", price: 3500, image: "2in1-towel.jpeg", badge: "", description: "Dual-purpose towel set. Soft and highly absorbent.", stock: 35, soldToday: 1 },
    { id: 14, name: "Gold Insulated Vacuum Flask", category: "household", price: 5000, image: "vacuum-flask.jpeg", badge: "", description: "Stainless steel flask. Keeps drinks hot/cold for 12 hours.", stock: 25, soldToday: 3 },
    { id: 15, name: "Keyholders (Assorted)", category: "gifts", price: 6000, image: "keyholders.jpeg", badge: "", description: "Stylish keyholder set. Great for gifts or personal use.", stock: 40, soldToday: 4 },
    { id: 16, name: "Big Size Jute Bag", category: "gifts", price: 3000, image: "jute-bag.jpeg", badge: "", description: "Eco-friendly large jute bag. Perfect for shopping or gifts.", stock: 50, soldToday: 5 },
    { id: 17, name: "Shoe Kit", category: "gifts", price: 6000, image: "shoe-kit.jpeg", badge: "", description: "Complete shoe care kit with polish, brush, and cloth.", stock: 60, soldToday: 3 },
    { id: 18, name: "Nice Bottle with Handle", category: "gifts", price: 1800, image: "bottle-handle.jpeg", badge: "bestseller", description: "Stylish water bottle with carry handle. Customer favorite!", stock: 80, soldToday: 12 },
    { id: 19, name: "Rechargeable Lamps", category: "household", price: 6500, image: "rechargeable-lamp.jpeg", badge: "hot", description: "LED rechargeable lamp. Perfect for reading and power outages.", stock: 35, soldToday: 6 },
    { id: 20, name: "Bamboo Cooperate 3 in 1", category: "gifts", price: 25000, image: "bamboo-set.jpg", badge: "", description: "4-piece bamboo stationery set. Eco-friendly corporate gift.", stock: 45, soldToday: 2 },
    { id: 21, name: "Luxury Wall Clock", category: "decor", price: 4000, image: "wall-clock.jpeg", badge: "", description: "Elegant decorative wall clock. Adds style to any room.", stock: 20, soldToday: 1 },
    { id: 22, name: "Lunch Bag (Premium)", category: "gifts", price: 3500, image: "lunch-bag-premium.jpg", badge: "", description: "Premium insulated lunch bag with compartments.", stock: 30, soldToday: 2 },
    { id: 23, name: "Souvenir Bag Dozen", category: "gifts", price: 20000, image: "souvenir-bag.jpeg", badge: "", description: "12 custom souvenir bags. Perfect for events and weddings.", stock: 15, soldToday: 1 },
    { id: 24, name: "4 in 1 Cooperate Set", category: "gifts", price: 25000, image: "corporate-set.jpg", badge: "", description: "Executive gift set: pen, notebook, card holder, and keychain.", stock: 10, soldToday: 2 },
    { id: 25, name: "5 in 1 Gym Size Towel", category: "household", price: 5000, image: "gym-towel-5in1.jpg", badge: "", description: "Set of 5 gym towels. Quick-dry and compact.", stock: 40, soldToday: 3 },
    { id: 26, name: "Cocktail Cups", category: "kitchenware", price: 2400, image: "cocktail-cups.jpg", badge: "", description: "Colorful cocktail cup set. Perfect for parties and events.", stock: 60, soldToday: 4 },
    { id: 27, name: "Mini Basket - Dozen", category: "household", price: 6500, image: "mini-basket.jpg", badge: "", description: "12 mini storage baskets. Organize small items easily.", stock: 30, soldToday: 2 },
    { id: 28, name: "Multipurpose Cable", category: "gadgets", price: 4500, image: "multipurpose-cable.jpg", badge: "", description: "3-in-1 charging cable. Compatible with all phone types.", stock: 50, soldToday: 7 },
    { id: 29, name: "Slub Cup", category: "kitchenware", price: 2000, image: "slub-cup.jpg", badge: "", description: "Textured ceramic slub cup. Stylish and durable.", stock: 45, soldToday: 3 },
    { id: 30, name: "Toilet Brush", category: "household", price: 1500, image: "toilet-brush.jpg", badge: "", description: "Long-handled toilet brush with holder. Hygienic design.", stock: 70, soldToday: 5 },
    { id: 31, name: "Foldable Bowl", category: "kitchenware", price: 1500, image: "foldable-bowl.jpg", badge: "", description: "Silicone foldable bowl. Space-saving and portable.", stock: 55, soldToday: 4 },
    { id: 32, name: "Keyholder MOQ 30Pcs", category: "gifts", price: 1500, image: "keyholder-moq.jpg", badge: "", description: "Custom keyholders. Minimum order 30 pieces.", stock: 100, soldToday: 8 },
    { id: 33, name: "Office Mugs", category: "gifts", price: 2900, image: "office-mugs.jpg", badge: "", description: "Ceramic office mug set. Professional and elegant.", stock: 40, soldToday: 3 },
    { id: 34, name: "Plate Rack", category: "kitchenware", price: 4500, image: "plate-rack.jpeg", badge: "", description: "3-tier plate drying rack. Drainage tray included.", stock: 25, soldToday: 2 },
    { id: 35, name: "Serving Spoon (Set)", category: "kitchenware", price: 2000, image: "serving-spoon.jpeg", badge: "", description: "Set of wooden serving spoons. Smooth finish.", stock: 50, soldToday: 4 },
    { id: 36, name: "Smp Bowl - Dozen", category: "kitchenware", price: 24000, image: "smp-bowl.jpeg", badge: "", description: "12-piece premium bowl set. High-quality melamine.", stock: 15, soldToday: 1 },
    { id: 37, name: "Data Cable", category: "gadgets", price: 3000, image: "data-cable.jpeg", badge: "", description: "Fast-charging data cable. Braided for durability.", stock: 60, soldToday: 6 },
    { id: 38, name: "6Up Bottles", category: "gifts", price: 1600, image: "6up-bottle.jpeg", badge: "", description: "Set of 6 colorful bottles. Great for kids and events.", stock: 80, soldToday: 5 },
    { id: 39, name: "Mini Touch Light", category: "gadgets", price: 1800, image: "mini-touch-light.jpeg", badge: "", description: "LED touch-activated light. Stick anywhere.", stock: 70, soldToday: 7 },
    { id: 40, name: "Knife Sharpener", category: "kitchenware", price: 1500, image: "knife-sharpener.jpeg", badge: "", description: "Compact knife sharpener. Restores blade edge quickly.", stock: 100, soldToday: 10 },
    { id: 41, name: "3 in 1 Bottle", category: "gifts", price: 6500, image: "3in1-bottle.jpeg", badge: "", description: "3-compartment bottle. Separate drinks or snacks.", stock: 30, soldToday: 3 },
    { id: 42, name: "Notepad with Pen", category: "gifts", price: 6000, image: "notepad-pen.jpeg", badge: "", description: "Executive notepad with matching pen. Corporate gift ready.", stock: 35, soldToday: 4 },
    { id: 43, name: "Storage pan for 3pcs", category: "kitchenware", price: 6500, image: "storage-pan-3pcs.jpeg", badge: "", description: "3-piece storage pan set. Stackable and durable.", stock: 30, soldToday: 2 },
    { id: 44, name: "2.5l hot baby flask", category: "household", price: 32000, image: "hot-baby-flask.jpeg", badge: "", description: "2.5L hot baby flask. Keeps liquids warm for hours.", stock: 15, soldToday: 1 },
    { id: 45, name: "Haers vaccum set", category: "household", price: 17000, image: "haers-vacuum-set.jpeg", badge: "", description: "Haers vacuum flask set. Premium quality insulation.", stock: 20, soldToday: 2 },
    { id: 46, name: "Dragon water flask", category: "household", price: 20000, image: "dragon-water-flask.jpeg", badge: "", description: "Dragon brand water flask. Large capacity, durable.", stock: 18, soldToday: 1 },
    { id: 47, name: "Silicone Cooking Spoons", category: "kitchenware", price: 4000, image: "silicone-cooking-spoons.jpeg", badge: "", description: "Set of silicone cooking spoons. Heat resistant.", stock: 50, soldToday: 5 },
    { id: 48, name: "Kenwood 6 in 1 blender", category: "kitchenware", price: 50000, image: "kenwood-6in1-blender.jpeg", badge: "", description: "Kenwood 6-in-1 multi-function blender. Professional grade.", stock: 10, soldToday: 1 },
    { id: 49, name: "Hand fan", category: "gadgets", price: 4700, image: "hand-fan.jpeg", badge: "", description: "Portable rechargeable hand fan. 3 speed settings.", stock: 45, soldToday: 6 },
    { id: 50, name: "Melamine dinner set. 16pcs.", category: "kitchenware", price: 28000, image: "melamine-dinner-set.jpeg", badge: "", description: "16-piece melamine dinner set. Elegant and durable.", stock: 15, soldToday: 2 },
    { id: 51, name: "1000ml temperature flask", category: "household", price: 8500, image: "1000ml-temperature-flask.jpeg", badge: "", description: "1000ml temperature control flask. Keeps drinks hot/cold.", stock: 35, soldToday: 3 },
    { id: 52, name: "Emoji bag", category: "gifts", price: 3500, image: "emoji-bag.jpeg", badge: "", description: "Cute emoji design bag. Perfect for kids and gifts.", stock: 40, soldToday: 5 },
    { id: 53, name: "Neck massager", category: "personal", price: 9500, image: "neck-massager.jpeg", badge: "", description: "Electric neck massager. Relieves tension and pain.", stock: 25, soldToday: 3 },
    { id: 54, name: "Big Pantry Basket", category: "household", price: 2000, image: "big-pantry-basket.jpeg", badge: "", description: "Large pantry storage basket. Organize your kitchen.", stock: 60, soldToday: 8 },
    { id: 55, name: "Plain Stanley", category: "gifts", price: 9000, image: "plain-stanley.jpeg", badge: "", description: "Plain Stanley tumbler. Keeps drinks cold for hours.", stock: 30, soldToday: 4 },
    { id: 56, name: "Handle Stanley", category: "gifts", price: 12000, image: "handle-stanley.jpeg", badge: "", description: "Stanley cup with handle. Durable and stylish.", stock: 25, soldToday: 3 },
    { id: 57, name: "Waterproof Spray 750ml", category: "household", price: 3500, image: "waterproof-spray-750ml.jpeg", badge: "", description: "750ml waterproof spray. Protects shoes and fabrics.", stock: 50, soldToday: 5 },
    { id: 58, name: "Handheld Cup 900ml", category: "gifts", price: 7000, image: "handheld-cup-900ml.jpeg", badge: "", description: "900ml handheld cup with lid. Perfect for travel.", stock: 40, soldToday: 4 },
    { id: 59, name: "6000 (coffee cup) 10pcs above", category: "kitchenware", price: 6000, image: "coffee-cup-6000.jpeg", badge: "", description: "Coffee cup set. 10 pieces and above pricing available.", stock: 55, soldToday: 6 },
    { id: 60, name: "Waterproof Spray 450ml", category: "household", price: 3200, image: "waterproof-spray-450ml.jpeg", badge: "", description: "450ml waterproof spray. Compact size for travel.", stock: 60, soldToday: 7 },
    { id: 61, name: "Washable and reusable moi moi pouch 50pcs in a pack", category: "kitchenware", price: 5000, image: "moi-moi-pouch.jpeg", badge: "", description: "50pcs washable moi moi cooking pouches. Reusable.", stock: 45, soldToday: 5 },
    { id: 62, name: "35kg single pole with wheel back in stock", category: "household", price: 17000, image: "single-pole-35kg.jpeg", badge: "", description: "35kg capacity single pole clothes rack with wheels.", stock: 20, soldToday: 2 },
    { id: 63, name: "68kg double pole with wheel", category: "household", price: 29000, image: "double-pole-68kg.jpeg", badge: "", description: "68kg double pole clothes rack with wheels. Heavy duty.", stock: 15, soldToday: 1 },
    { id: 64, name: "Quality ear bud with digital", category: "gadgets", price: 11000, image: "ear-bud-digital.jpeg", badge: "", description: "Quality digital earbuds with charging case.", stock: 35, soldToday: 6 },
    { id: 65, name: "Solar fan with panel and 2 bulb and remote", category: "gadgets", price: 48000, image: "solar-fan-panel.jpeg", badge: "hot", description: "Solar powered fan with panel, 2 bulbs and remote.", stock: 12, soldToday: 3 },
    { id: 66, name: "2 in 1 Hair Straightener/ Sealer", category: "personal", price: 2000, image: "hair-straightener-2in1.jpeg", badge: "", description: "2-in-1 hair straightener and sealer. Professional results.", stock: 50, soldToday: 8 },
    { id: 67, name: "2 in 1 Buckle Hook Dozen", category: "household", price: 3000, image: "buckle-hook-dozen.jpeg", badge: "", description: "12-piece 2-in-1 buckle hook set. Strong adhesive.", stock: 60, soldToday: 9 },
    { id: 68, name: "Stripe Cosmetics Purse Dozen", category: "gifts", price: 9600, image: "stripe-cosmetics-purse.jpeg", badge: "", description: "12-piece striped cosmetics purse set. Stylish storage.", stock: 30, soldToday: 4 },
    { id: 69, name: "100ltrs Washday laundry bag", category: "household", price: 4500, image: "washday-laundry-bag.jpeg", badge: "", description: "100 liters washday laundry bag. Heavy duty material.", stock: 40, soldToday: 5 },
    { id: 70, name: "6packs and above 10500", category: "gifts", price: 11000, image: "6packs-set.jpeg", badge: "", description: "6-pack gift set. Bulk pricing available at 6+ units.", stock: 35, soldToday: 4 },
    { id: 71, name: "Spoon rack 6pcs above 2700 Good as souvenir", category: "kitchenware", price: 3000, image: "spoon-rack.jpeg", badge: "", description: "Spoon rack. 6pcs and above at N2,700. Great souvenir.", stock: 50, soldToday: 6 },
    { id: 72, name: "Mini basket.", category: "household", price: 1000, image: "mini-basket-2.jpeg", badge: "", description: "Mini storage basket. Perfect for organizing small items.", stock: 100, soldToday: 15 },
    { id: 73, name: "Hand Cream", category: "personal", price: 500, image: "hand-cream.jpeg", badge: "", description: "Moisturizing hand cream. Softens and nourishes skin.", stock: 80, soldToday: 20 },
    { id: 74, name: "Vaseline handcream", category: "personal", price: 1000, image: "vaseline-handcream.jpeg", badge: "", description: "Vaseline hand cream. Deep moisture for dry hands.", stock: 60, soldToday: 12 },
    { id: 75, name: "Knee support", category: "personal", price: 2500, image: "knee-support.jpeg", badge: "", description: "Elastic knee support brace. Provides compression and stability.", stock: 45, soldToday: 7 },
    { id: 76, name: "Lip brush Dozen", category: "personal", price: 4500, image: "lip-brush-dozen.jpeg", badge: "", description: "12-piece lip brush set. Perfect for makeup application.", stock: 40, soldToday: 5 },
    { id: 77, name: "Vine leaf 800 per strand / Dozen", category: "decor", price: 7000, image: "vine-leaf.jpeg", badge: "", description: "Decorative vine leaf garland. N800 per strand, dozen available.", stock: 30, soldToday: 3 },
    { id: 78, name: "Vitamin c gel mask 1pc:250/ 10pc", category: "personal", price: 2000, image: "vitamin-c-gel-mask.jpeg", badge: "", description: "Vitamin C gel face mask. N250 per pc, 10pc pack available.", stock: 50, soldToday: 10 },
    { id: 79, name: "Double-layer Vegetable Washing and Draining Basket 6-Piece Set.", category: "kitchenware", price: 4500, image: "vegetable-washing-basket.jpeg", badge: "", description: "6-piece double-layer vegetable washing and draining basket set.", stock: 40, soldToday: 5 },
    { id: 80, name: "Double layer 24 Skewers Hanging Household Air Fryer Grill Accessories for Barbecue", category: "kitchenware", price: 3000, image: "skewers-airfryer.jpeg", badge: "", description: "24 skewers double layer air fryer accessory. For BBQ.", stock: 45, soldToday: 6 },
    { id: 81, name: "Cloth Bag", category: "household", price: 4200, image: "cloth-bag.jpeg", badge: "", description: "Durable cloth storage bag. Multi-purpose use.", stock: 50, soldToday: 7 },
    { id: 82, name: "ORIGINAL L16 SELFIE/TRIPOD", category: "gadgets", price: 15500, image: "l16-selfie-tripod.jpeg", badge: "", description: "Original L16 selfie stick and tripod combo. Extendable.", stock: 25, soldToday: 4 },
    { id: 83, name: "ORIGINAL Q13 AI 360 ROTATING TRACKING", category: "gadgets", price: 23500, image: "q13-ai-tracking.jpeg", badge: "", description: "Q13 AI 360 degree rotating tracking holder. Auto face tracking.", stock: 18, soldToday: 3 },
    { id: 84, name: "BLUE IDEA CLIPPER", category: "personal", price: 6500, image: "blue-idea-clipper.jpeg", badge: "", description: "Blue Idea hair clipper. Professional cutting performance.", stock: 35, soldToday: 5 },
    { id: 85, name: "3 in 1 tray", category: "kitchenware", price: 25000, image: "3in1-tray.jpeg", badge: "", description: "3-in-1 serving tray set. Elegant design for entertaining.", stock: 15, soldToday: 2 },
    { id: 86, name: "3 in 1 tray", category: "kitchenware", price: 20000, image: "3in1-tray-2.jpeg", badge: "", description: "3-in-1 tray set. Versatile serving solution.", stock: 20, soldToday: 2 },
    { id: 87, name: "3in1 luxury acrylic tray....", category: "decor", price: 14000, image: "3in1-luxury-acrylic-tray.jpeg", badge: "", description: "3-in-1 luxury acrylic tray set. Modern and elegant.", stock: 22, soldToday: 3 },
    { id: 88, name: "Silver crest Rice cooker price", category: "kitchenware", price: 35000, image: "silver-crest-rice-cooker.jpeg", badge: "", description: "Silver Crest rice cooker. Multi-function cooking.", stock: 12, soldToday: 2 },
    { id: 89, name: "Big pipe 3 Tier baby cloth spraying hanger", category: "household", price: 22000, image: "3tier-baby-hanger.jpeg", badge: "", description: "3-tier baby cloth spraying hanger. Big pipe design.", stock: 18, soldToday: 2 },
    { id: 90, name: "Quality 7.0 lit 3000W", category: "kitchenware", price: 34000, image: "7lit-3000w.jpeg", badge: "", description: "7.0 liter 3000W quality appliance. High capacity.", stock: 10, soldToday: 1 },
    { id: 91, name: "2Layers Fruit Rack", category: "kitchenware", price: 17500, image: "2layers-fruit-rack.jpeg", badge: "", description: "2-layer fruit rack. Elegant display and storage.", stock: 25, soldToday: 3 },
    { id: 92, name: "Metal Mesh collapsible wire storage basket", category: "household", price: 14000, image: "metal-mesh-basket.jpeg", badge: "", description: "Collapsible metal mesh wire storage basket. Space saving.", stock: 30, soldToday: 4 },
    { id: 93, name: "Kenwood halogen oven 8 in 1 price", category: "kitchenware", price: 40000, image: "kenwood-halogen-oven.jpeg", badge: "", description: "Kenwood 8-in-1 halogen oven. Versatile cooking functions.", stock: 8, soldToday: 1 },
    { id: 94, name: "Vegetable wrought iron with bamboo lid storage basket", category: "kitchenware", price: 22000, image: "vegetable-wrought-iron-basket.jpeg", badge: "", description: "Wrought iron vegetable storage basket with bamboo lid.", stock: 18, soldToday: 2 },
    { id: 95, name: "30kg Rice Bin", category: "kitchenware", price: 26500, image: "30kg-rice-bin.jpeg", badge: "", description: "30kg capacity rice storage bin. Airtight seal.", stock: 15, soldToday: 2 },
    { id: 96, name: "3pcs Set Ceramic plate", category: "kitchenware", price: 3500, image: "3pcs-ceramic-plate.jpeg", badge: "", description: "3-piece ceramic plate set. Beautiful and durable.", stock: 50, soldToday: 7 },
    { id: 97, name: "3 in 1 Towel", category: "household", price: 5500, image: "3in1-towel.jpeg", badge: "", description: "3-in-1 towel set. Soft and absorbent.", stock: 40, soldToday: 5 },
    { id: 98, name: "High quality Thick soled indoor slipper", category: "household", price: 4500, image: "indoor-slipper.jpeg", badge: "", description: "High quality thick-soled indoor slippers. Comfortable.", stock: 45, soldToday: 6 },
    { id: 99, name: "Student Size Towel", category: "household", price: 2500, image: "student-towel.jpeg", badge: "", description: "Student size towel. Compact and quick-dry.", stock: 60, soldToday: 10 },
    { id: 100, name: "Relaxing Chair", category: "decor", price: 55500, image: "relaxing-chair.jpeg", badge: "", description: "Relaxing lounge chair. Comfortable reclining design.", stock: 8, soldToday: 1 },
    { id: 101, name: "Mini Dustbin", category: "household", price: 2000, image: "mini-dustbin.jpeg", badge: "", description: "Mini desktop dustbin. Compact and convenient.", stock: 70, soldToday: 12 },
    { id: 102, name: "7 Holes Non Stick Cartoon fry pan...", category: "kitchenware", price: 9500, image: "7holes-fry-pan.jpeg", badge: "", description: "7-hole non-stick cartoon fry pan. Fun cooking.", stock: 30, soldToday: 4 },
    { id: 103, name: "4 Face Gas Burner with cover..", category: "kitchenware", price: 33000, image: "4face-gas-burner.jpeg", badge: "", description: "4-face gas burner with cover. Professional cooking.", stock: 10, soldToday: 1 },
    { id: 104, name: "Stainless steel Double Hot plate..", category: "kitchenware", price: 18500, image: "stainless-hot-plate.jpeg", badge: "", description: "Stainless steel double hot plate. Durable and efficient.", stock: 15, soldToday: 2 },
    { id: 105, name: "Double Face Stainless steel body Hot plate..", category: "kitchenware", price: 18500, image: "double-face-hot-plate.jpeg", badge: "", description: "Double face stainless steel hot plate. Heavy duty.", stock: 15, soldToday: 2 },
    { id: 106, name: "Air Fryer Paper Liners, Round, By 50", category: "kitchenware", price: 2500, image: "airfryer-liners.jpeg", badge: "", description: "50pcs round air fryer paper liners. Disposable.", stock: 80, soldToday: 15 },
    { id: 107, name: "Heart sieve basket dozen (12 pcs)", category: "kitchenware", price: 12000, image: "heart-sieve-basket.jpeg", badge: "", description: "12-piece heart-shaped sieve basket set. Cute design.", stock: 25, soldToday: 3 },
    { id: 108, name: "2pc Cerami Bowl Set", category: "kitchenware", price: 2900, image: "2pc-ceramic-bowl.jpeg", badge: "", description: "2-piece ceramic bowl set. Elegant and microwave safe.", stock: 55, soldToday: 8 },
    { id: 109, name: "Flower Temperature Cup", category: "gifts", price: 13000, image: "flower-temperature-cup.jpeg", badge: "", description: "Flower design temperature display cup. Smart feature.", stock: 20, soldToday: 3 },
    { id: 110, name: "Wooden Spatula", category: "kitchenware", price: 3000, image: "wooden-spatula.jpeg", badge: "", description: "Natural wooden spatula set. Eco-friendly cooking tool.", stock: 50, soldToday: 7 },
    { id: 111, name: "Dinner Set", category: "kitchenware", price: 28000, image: "dinner-set.jpeg", badge: "", description: "Complete dinner set. Elegant tableware collection.", stock: 12, soldToday: 2 },
    { id: 112, name: "2L Cooler", category: "household", price: 3000, image: "2l-cooler.jpeg", badge: "", description: "2 liter mini cooler. Keeps drinks cold on the go.", stock: 45, soldToday: 6 },
    { id: 113, name: "Plastic Cup with Cover Dozen", category: "kitchenware", price: 7000, image: "plastic-cup-cover-dozen.jpeg", badge: "", description: "12-piece plastic cup with cover set. Stackable.", stock: 35, soldToday: 5 },
    { id: 114, name: "Souvenir Bag", category: "gifts", price: 21000, image: "souvenir-bag-2.jpeg", badge: "", description: "Premium souvenir bag. Perfect for events and gifting.", stock: 18, soldToday: 2 },
    { id: 115, name: "Serving Dish (1pcs)", category: "kitchenware", price: 150000, image: "serving-dish.jpeg", badge: "", description: "Premium serving dish. Luxury tableware piece.", stock: 5, soldToday: 1 },
    { id: 116, name: "Dry Iron Non-Stick SafePlate", category: "household", price: 10000, image: "dry-iron-safeplate.jpeg", badge: "", description: "Dry iron with non-stick safe plate. Easy gliding.", stock: 30, soldToday: 4 },
    { id: 117, name: "2in1 Wall Decor", category: "decor", price: 2500, image: "2in1-wall-decor.jpeg", badge: "", description: "2-in-1 wall decor set. Beautiful home accent.", stock: 50, soldToday: 8 },
    { id: 118, name: "Light Facial Beauty instrument", category: "personal", price: 15000, image: "facial-beauty-instrument.jpeg", badge: "", description: "Light therapy facial beauty instrument. Skin rejuvenation.", stock: 20, soldToday: 3 },
    { id: 119, name: "Single-burner infrared cooker", category: "kitchenware", price: 26000, image: "single-burner-infrared.jpeg", badge: "", description: "Single burner infrared cooker. Fast and efficient.", stock: 12, soldToday: 2 },
    { id: 120, name: "Unbreakable Dressing Mirror", category: "decor", price: 6500, image: "dressing-mirror.jpeg", badge: "", description: "Unbreakable dressing mirror. Safe and durable.", stock: 35, soldToday: 5 },
    { id: 121, name: "Stanley Cover", category: "gifts", price: 3500, image: "stanley-cover.jpeg", badge: "", description: "Stanley tumbler cover. Protective and stylish.", stock: 55, soldToday: 10 },
    { id: 122, name: "3.6l Foodflask", category: "household", price: 35500, image: "36l-foodflask.jpeg", badge: "", description: "3.6 liter food flask. Keeps food hot for hours.", stock: 10, soldToday: 1 },
    { id: 123, name: "3-piece set of rectangular food Storage box with lock", category: "kitchenware", price: 12000, image: "3piece-storage-box.jpeg", badge: "", description: "3-piece rectangular food storage box set with lock lids.", stock: 25, soldToday: 4 },
    { id: 124, name: "10 L Silver Crest electric kettle", category: "kitchenware", price: 22000, image: "10l-silver-crest-kettle.jpeg", badge: "", description: "10 liter Silver Crest electric kettle. Large capacity.", stock: 15, soldToday: 2 },
    { id: 125, name: "Quality 4-Layer Microwave/Fruit Stand Big", category: "kitchenware", price: 55000, image: "4layer-microwave-stand.jpeg", badge: "", description: "4-layer microwave/fruit stand. Large capacity organizer.", stock: 8, soldToday: 1 },
    { id: 126, name: "16pc Vegetable cutter", category: "kitchenware", price: 7500, image: "16pc-vegetable-cutter.jpeg", badge: "", description: "16-piece vegetable cutter set. Multiple cutting options.", stock: 35, soldToday: 6 },
    { id: 127, name: "9in1 Spin scrubber", category: "household", price: 18000, image: "9in1-spin-scrubber.jpeg", badge: "", description: "9-in-1 electric spin scrubber. Multiple brush heads.", stock: 20, soldToday: 3 },
    { id: 128, name: "Mini Fan", category: "gadgets", price: 6000, image: "mini-fan.jpeg", badge: "", description: "Portable mini fan. Rechargeable and compact.", stock: 45, soldToday: 8 },
    { id: 129, name: "Scarlet Mixer", category: "kitchenware", price: 6500, image: "scarlet-mixer.jpeg", badge: "", description: "Scarlet hand mixer. Powerful blending performance.", stock: 30, soldToday: 5 },
    { id: 130, name: "Automatic Toothbrush Sterilizer UV Toothbrush Holder Toothpaste Squeezer", category: "personal", price: 8000, image: "toothbrush-sterilizer.jpeg", badge: "", description: "UV toothbrush sterilizer with toothpaste squeezer. Hygienic.", stock: 35, soldToday: 6 },
    { id: 131, name: "Rechargeable Mosquito Lamp.", category: "household", price: 7500, image: "mosquito-lamp.jpeg", badge: "", description: "Rechargeable mosquito killer lamp. Chemical-free protection.", stock: 40, soldToday: 7 },
    { id: 132, name: "Rat Gum", category: "household", price: 2000, image: "rat-gum.jpeg", badge: "", description: "Rat gum adhesive trap. Effective pest control.", stock: 60, soldToday: 10 },
    { id: 133, name: "5-layer Folding Rack", category: "household", price: 50000, image: "5layer-folding-rack.jpeg", badge: "", description: "5-layer folding storage rack. Heavy duty metal frame.", stock: 10, soldToday: 1 },
    { id: 134, name: "Popcorn Machine", category: "kitchenware", price: 16000, image: "popcorn-machine.jpeg", badge: "", description: "Electric popcorn maker. Perfect for home movie nights.", stock: 15, soldToday: 2 },
    { id: 135, name: "Movable Base", category: "household", price: 8500, image: "movable-base.jpeg", badge: "", description: "Adjustable movable base for washing machine and fridge.", stock: 25, soldToday: 3 },
    { id: 136, name: "BP monitor", category: "gadgets", price: 9500, image: "bp-monitor.jpeg", badge: "", description: "Digital blood pressure monitor. Accurate readings.", stock: 30, soldToday: 4 },
    { id: 137, name: "Slup Cup", category: "kitchenware", price: 1700, image: "slup-cup.jpeg", badge: "", description: "Slup drinking cup with lid. Portable and spill-proof.", stock: 60, soldToday: 8 },
    { id: 138, name: "Microphone Holder", category: "gadgets", price: 1400, image: "microphone-holder.jpeg", badge: "", description: "Adjustable microphone holder stand. Flexible arm.", stock: 50, soldToday: 6 },
    { id: 139, name: "Wine and Can Rack", category: "kitchenware", price: 38000, image: "wine-can-rack.jpeg", badge: "", description: "Wall-mounted wine and can storage rack. Large capacity.", stock: 8, soldToday: 1 },
    { id: 140, name: "Mini True wireless stereo Earbuds", category: "gadgets", price: 5500, image: "mini-wireless-earbuds.jpeg", badge: "", description: "True wireless stereo earbuds with charging case.", stock: 0, soldToday: 99 },
    { id: 141, name: "Expandable Foldable Rolling Travel luggage", category: "gifts", price: 18000, image: "expandable-travel-luggage.jpeg", badge: "", description: "Expandable foldable rolling travel luggage. Multiple sizes.", stock: 9999, soldToday: 2 },
    { id: 142, name: "2.02-inch watch screen", category: "gadgets", price: 15500, image: "2inch-watch-screen.jpeg", badge: "", description: "Smart watch with 2.02-inch HD screen. Fitness tracking.", stock: 9999, soldToday: 4 },
    { id: 143, name: "Cloth Hanger", category: "household", price: 4000, image: "cloth-hanger.jpeg", badge: "", description: "Colorful plastic cloth hangers. Durable and lightweight.", stock: 9999, soldToday: 10 },
    { id: 144, name: "Moimoi Plate Dozen", category: "kitchenware", price: 5500, image: "moimoi-plate-dozen.jpeg", badge: "", description: "12-piece moimoi cooking plate set. Reusable aluminum.", stock: 9999, soldToday: 6 },
    { id: 145, name: "Maxi Microwave Oven 20L", category: "kitchenware", price: 63000, image: "maxi-microwave-20l.jpeg", badge: "", description: "20-liter maxi microwave oven. Multiple cooking modes.", stock: 9999, soldToday: 1 },
    { id: 146, name: "Divider bowl", category: "kitchenware", price: 15500, image: "divider-bowl.jpeg", badge: "", description: "Multi-compartment divider bowl. Perfect for portion control.", stock: 9999, soldToday: 3 },
    { id: 147, name: "Floral Ceramic Set", category: "kitchenware", price: 8500, image: "floral-ceramic-set.jpeg", badge: "", description: "Beautiful floral ceramic dinner set. Microwave safe.", stock: 9999, soldToday: 4 },
    { id: 148, name: "Small-size round Tray Dozen", category: "kitchenware", price: 5800, image: "small-round-tray-dozen.jpeg", badge: "", description: "12-piece small round tray set. Perfect for serving.", stock: 9999, soldToday: 5 },
    { id: 149, name: "32pcs Dinner set", category: "kitchenware", price: 30000, image: "32pcs-dinner-set.jpeg", badge: "", description: "32-piece complete dinner set. Elegant tableware.", stock: 9999, soldToday: 2 },
    { id: 150, name: "Microwave-compatible bowl sm-7000 Dozen", category: "kitchenware", price: 9000, image: "microwave-bowl-dozen.jpeg", badge: "", description: "12-piece microwave-compatible bowl set. Heat resistant.", stock: 9999, soldToday: 5 },
    { id: 151, name: "Stainless Kettle", category: "kitchenware", price: 10500, image: "stainless-kettle.jpeg", badge: "", description: "Stainless steel electric kettle. Fast boiling.", stock: 9999, soldToday: 5 },
    { id: 152, name: "N68 Handheld Cooling Fan", category: "gadgets", price: 6000, image: "n68-handheld-fan.jpeg", badge: "", description: "N68 handheld cooling fan. 100 speed adjustment settings.", stock: 9999, soldToday: 8 },
    { id: 153, name: "Peg with Basket", category: "household", price: 2000, image: "peg-with-basket.jpeg", badge: "", description: "Cloth pegs with storage basket. 24 pegs included.", stock: 9999, soldToday: 12 },
    { id: 154, name: "5-layer Fruit Basket", category: "kitchenware", price: 48000, image: "5layer-fruit-basket.jpeg", badge: "", description: "5-tier fruit and vegetable storage basket. Rotating design.", stock: 9999, soldToday: 1 },
    { id: 155, name: "Influencer Light", category: "gadgets", price: 9000, image: "influencer-light.jpeg", badge: "", description: "Ring light for content creators. Adjustable brightness.", stock: 9999, soldToday: 5 },
    { id: 156, name: "Pimple Patch (Transparent Pack)", category: "personal", price: 1800, image: "pimple-patch.jpeg", badge: "", description: "Transparent pimple patches. Invisible acne treatment.", stock: 9999, soldToday: 15 },
    { id: 157, name: "Fruit Storage", category: "household", price: 3300, image: "fruit-storage.jpeg", badge: "", description: "Stackable fruit storage container. Keep fruits fresh.", stock: 9999, soldToday: 8 },
    { id: 158, name: "Dish Drainer 8 cm", category: "kitchenware", price: 45000, image: "dish-drainer-8cm.jpeg", badge: "", description: "8cm dish drainer rack. Large capacity drying.", stock: 9999, soldToday: 2 },
    { id: 159, name: "jug.", category: "kitchenware", price: 12000, image: "jug.jpeg", badge: "", description: "Elegant ceramic jug. Perfect for serving drinks.", stock: 9999, soldToday: 4 },
    { id: 160, name: "7 pcs. silicone spoons", category: "kitchenware", price: 7000, image: "7pcs-silicone-spoons.jpeg", badge: "", description: "7-piece silicone spoon set. Heat resistant and non-stick.", stock: 9999, soldToday: 6 },
    { id: 161, name: "Multifunctional Washing and Flushing", category: "household", price: 18000, image: "multifunctional-washing-flushing.jpeg", badge: "", description: "Multifunctional washing and flushing machine. Portable.", stock: 9999, soldToday: 2 },
    { id: 162, name: "Collapsible Storage rack", category: "household", price: 26000, image: "collapsible-storage-rack.jpeg", badge: "", description: "Collapsible rolling storage rack. Space-saving design.", stock: 9999, soldToday: 2 },
    { id: 163, name: "3065 Sokany Steaming Iron", category: "household", price: 25500, image: "sokany-steaming-iron.jpeg", badge: "", description: "Sokany 3065 steam iron. Powerful wrinkle removal.", stock: 9999, soldToday: 3 },
    { id: 164, name: "5-in-1 Laundry Detergent beads for long-lasting fragrance & stain remover", category: "household", price: 5000, image: "laundry-detergent-beads.jpeg", badge: "", description: "5-in-1 laundry detergent beads. Fragrance and stain removal.", stock: 9999, soldToday: 10 },
    { id: 165, name: "Bardefu 5052 8-in-1 Blender", category: "kitchenware", price: 50000, image: "bardefu-8in1-blender.jpeg", badge: "", description: "Bardefu 5052 8-in-1 multi-function blender. Professional.", stock: 9999, soldToday: 1 },
    { id: 166, name: "RAF infrared Cooker", category: "kitchenware", price: 33000, image: "raf-infrared-cooker.jpeg", badge: "", description: "RAF infrared electric cooker. Fast and energy efficient.", stock: 9999, soldToday: 2 },
    { id: 167, name: "Kitchen Cutlery (Black & Grey Color)", category: "kitchenware", price: 25500, image: "kitchen-cutlery-black-grey.jpeg", badge: "", description: "Black and grey kitchen cutlery set. Modern design.", stock: 9999, soldToday: 3 },
    { id: 168, name: "Glass 5pcs Storage", category: "kitchenware", price: 26500, image: "glass-5pcs-storage.jpeg", badge: "", description: "5-piece glass storage container set. Airtight lids.", stock: 9999, soldToday: 2 },
    { id: 169, name: "Nordic Table", category: "decor", price: 22500, image: "nordic-table.jpeg", badge: "", description: "Nordic minimalist side table. Elegant wood finish.", stock: 9999, soldToday: 3 },
    { id: 170, name: "Smoothie Jar", category: "kitchenware", price: 2000, image: "smoothie-jar.jpeg", badge: "", description: "Glass smoothie jar with straw. Reusable and eco-friendly.", stock: 9999, soldToday: 12 },
    { id: 171, name: "Sokany 8in1 Mixer", category: "kitchenware", price: 38000, image: "sokany-8in1-mixer.jpeg", badge: "", description: "Sokany 8-in-1 hand mixer. Multiple attachments.", stock: 9999, soldToday: 2 },
    { id: 172, name: "By20(6619) Sokany Hand Mixer", category: "kitchenware", price: 14500, image: "sokany-hand-mixer.jpeg", badge: "", description: "Sokany By20 hand mixer. Powerful motor.", stock: 9999, soldToday: 4 },
    { id: 173, name: "Watch Ultra 3 pro smart watch with Gaming pad", category: "gadgets", price: 18500, image: "watch-ultra-3-pro.jpeg", badge: "", description: "Ultra 3 Pro smart watch with gaming controller.", stock: 9999, soldToday: 30 },
    { id: 174, name: "Creative Alarm Clock", category: "decor", price: 3500, image: "creative-alarm-clock.jpeg", badge: "", description: "Creative alarm clock with modern design. Silent movement.", stock: 9999, soldToday: 8 },
    { id: 175, name: "Oval shape Center Table", category: "decor", price: 70000, image: "oval-center-table.jpeg", badge: "", description: "Oval shaped center table. Luxury living room furniture.", stock: 9999, soldToday: 1 },
    { id: 176, name: "Center Table", category: "decor", price: 70000, image: "center-table.jpeg", badge: "", description: "Modern center table. Elegant living room piece.", stock: 9999, soldToday: 1 },
    { id: 177, name: "18-inch Rechargeable Fan", category: "household", price: 65000, image: "18inch-rechargeable-fan.jpeg", badge: "", description: "18-inch rechargeable standing fan. Long battery life.", stock: 9999, soldToday: 1 },
    { id: 178, name: "Hair Scrunchie Dozen", category: "personal", price: 4500, image: "hair-scrunchie-dozen.jpeg", badge: "", description: "12-piece colorful hair scrunchie set. Soft fabric.", stock: 9999, soldToday: 10 },
    { id: 179, name: "Changing Lipstick", category: "personal", price: 900, image: "changing-lipstick.jpeg", badge: "", description: "Color-changing lipstick. Reacts to your body temperature.", stock: 9999, soldToday: 20 },
    { id: 180, name: "24 hr Hot 1000 ml ALI GIN Food Flask with Spoon", category: "household", price: 15500, image: "24hr-food-flask.jpeg", badge: "", description: "24-hour hot 1000ml food flask with spoon. Vacuum insulated.", stock: 9999, soldToday: 4 },
    { id: 181, name: "5 pcs Glass Oil Jar & Seasoning Container sets", category: "kitchenware", price: 7000, image: "glass-oil-jar-set.jpeg", badge: "", description: "5-piece glass oil jar and seasoning container set.", stock: 40, soldToday: 6 },
    { id: 182, name: "Philips Steam Iron", category: "household", price: 19000, image: "philips-steam-iron.jpg", badge: "", description: "Philips steam iron. Powerful steam output.", stock: 20, soldToday: 3 },
    { id: 183, name: "SilverCrest dry iron", category: "household", price: 8500, image: "silvercrest-dry-iron.jpeg", badge: "", description: "SilverCrest dry iron. Non-stick soleplate.", stock: 35, soldToday: 5 },
    { id: 184, name: "Paloma Food Processor 8-in-1", category: "kitchenware", price: 130000, image: "paloma-food-processor.jpeg", badge: "", description: "Paloma 8-in-1 food processor. Multi-function kitchen tool.", stock: 9999, soldToday: 1 },
    { id: 185, name: "9999 pcs. Arts Coloring Sets.", category: "gifts", price: 3200, image: "arts-coloring-set.jpeg", badge: "", description: "42-piece art coloring set. Perfect for kids and adults.", stock: 9999, soldToday: 19 },
    { id: 186, name: "5 pcs Non-Punching Corner Multipurpose Shelf", category: "household", price: 15500, image: "corner-multipurpose-shelf.jpeg", badge: "", description: "5-piece corner shelf set. No drilling required.", stock: 9999, soldToday: 4 },
    { id: 187, name: "Cloth Bag 66L", category: "bag", price: 7000, image: "cloth-bag-66l.jpeg", badge: "", description: "66 liter cloth storage bag. Spacious and durable.", stock: 9990, soldToday: 0 },
    { id: 188, name: "Cloth Bag 100L", category: "bag", price: 8000, image: "cloth-bag-100l.jpeg", badge: "", description: "100 liter large cloth storage bag. Heavy duty material.", stock: 9995, soldToday: 120 },
    { id: 189, name: "Small Auto Folding Umbrella", category: "umbrella", price: 3200, image: "small-auto-folding-umbrella.jpeg", badge: "", description: "Compact auto-folding umbrella. Easy one-touch open/close.", stock: 9990, soldToday: 49 },
    { id: 190, name: "Umbrella", category: "umbrella", price: 2700, image: "umbrella-2700.jpeg", badge: "", description: "Standard umbrella. Reliable rain protection.", stock: 9990, soldToday: 40 },
    { id: 191, name: "Umbrella", category: "umbrella", price: 3000, image: "umbrella-3000.jpeg", badge: "", description: "Quality umbrella. Wind-resistant frame.", stock: 9990, soldToday: 60 },
    { id: 192, name: "Big Foldable Umbrella", category: "umbrella", price: 4500, image: "big-foldable-umbrella.jpeg", badge: "", description: "Large foldable umbrella. Extra coverage for heavy rain.", stock: 9990, soldToday: 20 },
];

const placeholderImage = "https://via.placeholder.com/300x180/f5f0f7/652e92?text=";

// ===== WISHLIST =====
let wishlist = JSON.parse(localStorage.getItem('martied_wishlist')) || [];

function saveWishlist() {
    localStorage.setItem('martied_wishlist', JSON.stringify(wishlist));
}

function toggleWishlist(productId, event) {
    if (event) event.stopPropagation();

    const index = wishlist.indexOf(productId);
    if (index > -1) {
        wishlist.splice(index, 1);
        showToast('Removed from wishlist');
    } else {
        wishlist.push(productId);
        showToast('Added to wishlist!');
    }
    saveWishlist();
    renderProducts(filteredProducts, false);
    updateWishlistButton(productId);
}

function toggleWishlistFromDetail() {
    const productId = parseInt(document.getElementById('detailAddToCart').dataset.productId);
    toggleWishlist(productId);
}

function updateWishlistButton(productId) {
    const btn = document.getElementById('detailWishlist');
    if (wishlist.includes(productId)) {
        btn.classList.add('active');
    } else {
        btn.classList.remove('active');
    }
}

// ===== CART LOGIC =====
let cart = JSON.parse(localStorage.getItem('martied_cart')) || [];
let isAdmin = false;
let editMode = false;

function saveCart() {
    localStorage.setItem('martied_cart', JSON.stringify(cart));
    updateCartUI();
}

function saveProducts() {
    localStorage.setItem('martied_products', JSON.stringify(products));
}
function updateCartUI() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const countEl = document.getElementById('cartCount');
    countEl.textContent = count;
    countEl.style.display = count > 0 ? 'flex' : 'none';
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product.stock <= 0) {
        showToast('Sorry, out of stock!');
        return;
    }

    const existing = cart.find(item => item.id === productId);
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    saveCart();
    showToast('Added to cart!');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    renderCartItems();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
            renderCartItems();
        }
    }
}

function renderCartItems() {
    const container = document.getElementById('cartItems');
    const footer = document.getElementById('cartFooter');

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="cart-empty">
                <i class="fas fa-shopping-basket"></i>
                <p>Your cart is empty</p>
            </div>
        `;
        footer.style.display = 'none';
        return;
    }

    let html = '';
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        const imageUrl = getImageUrl({image: item.image});
        html += `
            <div class="cart-item">
                <button class="remove-item" onclick="removeFromCart(${item.id})"><i class="fas fa-times"></i></button>
                <div class="cart-item-image"><img src="${imageUrl}" alt="${item.name}" onerror="this.src='${placeholderImage}${encodeURIComponent(item.name)}'"></div>
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">\u20A6${item.price.toLocaleString()}</div>
                    <div class="cart-item-quantity">
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span class="qty-value">${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                    <div style="margin-top: 5px; font-weight: 700; color: var(--primary-purple);">\u20A6${itemTotal.toLocaleString()}</div>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
    document.getElementById('cartTotal').textContent = '\u20A6' + total.toLocaleString();
    footer.style.display = 'block';
}

function toggleCart() {
    const overlay = document.getElementById('cartOverlay');
    const sidebar = document.getElementById('cartSidebar');

    if (sidebar.classList.contains('active')) {
        overlay.classList.remove('active');
        sidebar.classList.remove('active');
    } else {
        overlay.classList.add('active');
        sidebar.classList.add('active');
        renderCartItems();
    }
}

// ===== CHECKOUT =====
function showCheckout() {
    toggleCart();
    const overlay = document.getElementById('checkoutOverlay');
    const itemsContainer = document.getElementById('checkoutItems');

    let html = '';
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        html += `
            <div class="checkout-item">
                <span>${item.name} x${item.quantity}</span>
                <span>\u20A6${itemTotal.toLocaleString()}</span>
            </div>
        `;
    });

    itemsContainer.innerHTML = html;
    document.getElementById('checkoutTotal').textContent = '\u20A6' + total.toLocaleString();

    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCheckout() {
    document.getElementById('checkoutOverlay').classList.remove('active');
    document.body.style.overflow = '';
}

function closeCheckoutOnOverlay(event) {
    if (event.target === event.currentTarget) {
        closeCheckout();
    }
}

function selectPayment(method) {
    document.querySelectorAll('.payment-option').forEach(opt => opt.classList.remove('selected'));
    document.getElementById('bankDetails').classList.remove('active');
    document.getElementById('btnWhatsApp').style.display = 'none';
    document.getElementById('btnBank').style.display = 'none';

    document.getElementById('opt-' + method).classList.add('selected');

    if (method === 'bank') {
        document.getElementById('bankDetails').classList.add('active');
        document.getElementById('btnBank').style.display = 'block';
    } else {
        document.getElementById('btnWhatsApp').style.display = 'block';
    }
}

function copyAccount() {
    navigator.clipboard.writeText('9130485545').then(() => {
        alert('Account number copied!');
    });
}

function finalizeOrder(method) {
    const name = document.getElementById('customerName').value.trim();
    const phone = document.getElementById('customerPhone').value.trim();
    const address = document.getElementById('customerAddress').value.trim();

    if (!name || !phone || !address) {
        alert('Please fill all fields');
        return;
    }

    let message = `*ORDER - Martie-D*%0A%0A`;
    message += `*Name:* ${name}%0A`;
    message += `*Phone:* ${phone}%0A`;
    message += `*Address:* ${address}%0A%0A`;
    message += `*Items:*%0A`;

    let total = 0;
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        message += `â€¢ ${item.name} x${item.quantity} = \u20A6${itemTotal.toLocaleString()}%0A`;
    });

    message += `%0A*Total: \u20A6${total.toLocaleString()}*%0A`;
    message += `*Payment:* ${method === 'bank' ? 'Bank Transfer (Moniepoint)' : 'WhatsApp/OD'}%0A`;

    window.open(`https://wa.me/2348168140356?text=${message}`, '_blank');

    cart = [];
    saveCart();
    closeCheckout();
    showToast('Order sent!');
}

// ===== PRODUCT DISPLAY =====
function getImageUrl(product) {
    if (product.image.startsWith('http') || product.image.startsWith('data:')) {
        return product.image;
    }
    return BASE_IMAGE_URL + product.image;
}

function getStockBadge(stock) {
    if (stock <= 0) return '<span class="stock-badge stock-out">Out of Stock</span>';
    if (stock <= 5) return `<span class="stock-badge stock-low">Only ${stock} left!</span>`;
    return '<span class="stock-badge stock-high">In Stock</span>';
}

function getSocialProof(soldToday) {
    if (soldToday === 0) return '';
    return `<div class="social-proof"><i class="fas fa-fire"></i> ${soldToday} sold today</div>`;
}

function renderProducts(productsToRender = filteredProducts, resetPage = true) {
    const grid = document.getElementById('productsGrid');

    if (resetPage) {
        currentPage = 1;
        grid.innerHTML = '';
    }

    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const endIndex = currentPage * PRODUCTS_PER_PAGE;
    const productsToShow = productsToRender.slice(startIndex, endIndex);

    if (productsToShow.length === 0 && resetPage) {
        grid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <p>No products found</p>
                <button class="reset-btn" onclick="resetFilters()">Show All Products</button>
            </div>
        `;
        updateLoadMoreButton(0, 0);
        updateResultsCount(0);
        return;
    }

    let html = '';
    productsToShow.forEach((product, index) => {
        const imageUrl = getImageUrl(product);
        const badge = product.badge ? `<span class="product-badge badge-${product.badge}">${product.badge === 'hot' ? 'Hot' : product.badge === 'new' ? 'New' : 'Best'}</span>` : '';
        const bulkNote = '';
        const stockBadge = getStockBadge(product.stock);
        const socialProof = getSocialProof(product.soldToday);
        const isWishlisted = wishlist.includes(product.id);
        const animationDelay = index * 0.05;

        html += `
            <div class="product-card" data-id="${product.id}" data-category="${product.category}" style="animation-delay: ${animationDelay}s">
                <button class="admin-edit-btn" onclick="editProduct(${product.id})"><i class="fas fa-edit"></i></button>
                <button class="wishlist-btn ${isWishlisted ? 'active' : ''}" onclick="toggleWishlist(${product.id}, event)">
                    <i class="${isWishlisted ? 'fas' : 'far'} fa-heart"></i>
                </button>
                ${badge}
                <div class="product-image" onclick="showProductDetail(${product.id})">
                    <img src="${imageUrl}" alt="${product.name}" loading="lazy" onerror="this.src='${placeholderImage}${encodeURIComponent(product.name)}'">
                    <button class="quick-view-btn">Quick View</button>
                </div>
                <div class="product-content">
                    <div class="product-category">${product.category}</div>
                    <h3 class="product-name" onclick="showProductDetail(${product.id})">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-price">\u20A6${product.price.toLocaleString()}</div>
                    ${stockBadge}
                    ${socialProof}
                    ${bulkNote}
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id})" ${product.stock <= 0 ? 'disabled' : ''}>
                        <i class="fas fa-cart-plus"></i> ${product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
                    </button>
                </div>
            </div>
        `;
    });

    if (resetPage) {
        grid.innerHTML = html;
    } else {
        grid.insertAdjacentHTML('beforeend', html);
    }

    updateLoadMoreButton(productsToRender.length, endIndex);
    updateResultsCount(productsToRender.length);
}

function updateLoadMoreButton(totalProducts, currentShowing) {
    const container = document.getElementById('loadMoreContainer');
    const remaining = totalProducts - currentShowing;

    if (remaining > 0) {
        container.innerHTML = `
            <button class="load-more-btn" onclick="loadMoreProducts()" id="loadMoreBtn">
                <span>Load More Products</span>
                <i class="fas fa-chevron-down"></i>
                <span style="display: block; font-size: 0.75rem; font-weight: 400; margin-top: 4px; opacity: 0.9;">
                    Showing ${currentShowing} of ${totalProducts} (${remaining} remaining)
                </span>
            </button>
        `;
        setupInfiniteScroll();
    } else {
        container.innerHTML = totalProducts > 0 ? `
            <div style="text-align: center; padding: 20px; color: var(--text-gray);">
                <i class="fas fa-check-circle" style="color: var(--success); font-size: 1.5rem; margin-bottom: 8px;"></i>
                <p style="font-size: 0.9rem;">You've seen all ${totalProducts} products</p>
            </div>
        ` : '';
    }
}

function updateResultsCount(count) {
    document.getElementById('resultsCount').textContent = `${count} product${count !== 1 ? 's' : ''} found`;
}

function loadMoreProducts() {
    if (isLoading) return;
    isLoading = true;

    const btn = document.getElementById('loadMoreBtn');
    if (btn) {
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
        btn.disabled = true;
    }

    setTimeout(() => {
        currentPage++;
        renderProducts(filteredProducts, false);
        isLoading = false;
    }, 300);
}

function setupInfiniteScroll() {
    if (!infiniteScrollEnabled) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !isLoading) {
                const totalShown = currentPage * PRODUCTS_PER_PAGE;
                if (totalShown < filteredProducts.length) {
                    loadMoreProducts();
                }
            }
        });
    }, { rootMargin: '100px' });

    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) observer.observe(loadMoreBtn);
}

// ===== SORTING =====
function sortProducts() {
    const sortValue = document.getElementById('sortSelect').value;
    currentSort = sortValue;

    switch(sortValue) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'newest':
            filteredProducts.sort((a, b) => b.id - a.id);
            break;
        default:
            filteredProducts.sort((a, b) => a.id - b.id);
    }

    renderProducts(filteredProducts, true);
}

// ===== PRODUCT DETAIL MODAL =====
let currentDetailProductId = null;

function showProductDetail(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    currentDetailProductId = productId;

    document.getElementById('detailImage').src = getImageUrl(product);
    document.getElementById('detailCategory').textContent = product.category;
    document.getElementById('detailName').textContent = product.name;
    document.getElementById('detailPrice').textContent = '\u20A6' + product.price.toLocaleString();
    document.getElementById('detailDescription').textContent = product.description;
    document.getElementById('detailMetaCategory').textContent = product.category;
    document.getElementById('detailMetaStock').textContent = product.stock > 0 ? `${product.stock} available` : 'Out of stock';
    document.getElementById('detailMetaId').textContent = '#' + String(product.id).padStart(3, '0');

    const stockHtml = getStockBadge(product.stock);
    document.getElementById('detailStock').innerHTML = stockHtml;

    const bulkMeta = document.getElementById('bulkMetaItem');
    bulkMeta.style.display = 'none';

    const addToCartBtn = document.getElementById('detailAddToCart');
    addToCartBtn.dataset.productId = productId;
    addToCartBtn.onclick = () => {
        addToCart(productId);
        closeProductDetail();
    };
    addToCartBtn.disabled = product.stock <= 0;
    addToCartBtn.innerHTML = product.stock <= 0 ? 
        '<i class="fas fa-times"></i> Out of Stock' : 
        '<i class="fas fa-cart-plus"></i> Add to Cart';

    updateWishlistButton(productId);

    loadRelatedProducts(product);

    const overlay = document.getElementById('productDetailOverlay');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function loadRelatedProducts(currentProduct) {
    const related = products
        .filter(p => p.category === currentProduct.category && p.id !== currentProduct.id)
        .slice(0, 4);

    const grid = document.getElementById('relatedGrid');

    if (related.length === 0) {
        document.getElementById('relatedSection').style.display = 'none';
        return;
    }

    document.getElementById('relatedSection').style.display = 'block';

    let html = '';
    related.forEach(product => {
        const imageUrl = getImageUrl(product);
        html += `
            <div class="related-item" onclick="showProductDetail(${product.id})">
                <div class="related-image">
                    <img src="${imageUrl}" alt="${product.name}" onerror="this.src='${placeholderImage}${encodeURIComponent(product.name)}'">
                </div>
                <div class="related-name">${product.name}</div>
                <div class="related-price">\u20A6${product.price.toLocaleString()}</div>
            </div>
        `;
    });

    grid.innerHTML = html;
}

function closeProductDetail(event) {
    if (event && event.target !== event.currentTarget) return;

    const overlay = document.getElementById('productDetailOverlay');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    currentDetailProductId = null;
}

// ===== SEARCH & FILTER =====
function searchProducts() {
    const term = document.getElementById('searchInput').value.toLowerCase();
    filteredProducts = products.filter(p => 
        p.name.toLowerCase().includes(term) || 
        p.description.toLowerCase().includes(term)
    );
    sortProducts();
}

function filterCategory(category, btn) {
    document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    if (category === 'all') {
        filteredProducts = [...products];
    } else {
        filteredProducts = products.filter(p => p.category === category);
    }
    sortProducts();
}

// ===== MOBILE DROPDOWN FUNCTIONS =====
function toggleCategoryDropdown() {
    const menu = document.getElementById('catDropdownMenu');
    const toggle = document.getElementById('catDropdownToggle');
    const isOpen = menu.classList.contains('open');

    if (isOpen) {
        menu.classList.remove('open');
        toggle.classList.remove('open');
    } else {
        menu.classList.add('open');
        toggle.classList.add('open');
    }
}

function filterCategoryDropdown(category, btn) {
    document.querySelectorAll('.category-dropdown-item').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const label = document.getElementById('currentCategoryLabel');
    const categoryNames = {
        'all': '<i class="fas fa-th-large"></i> All Categories',
        'kitchenware': '<i class="fas fa-utensils"></i> Kitchenware',
        'household': '<i class="fas fa-home"></i> Household',
        'back2school': '<i class="fas fa-graduation-cap"></i> Back2School',
        'decor': '<i class="fas fa-couch"></i> Decor & Furniture',
        'gadgets': '<i class="fas fa-mobile-alt"></i> Gadgets',
        'gifts': '<i class="fas fa-gift"></i> Gifts',
'bags': '<i class="fas fa-shopping-bag"></i> Bags',
'perfume': '<i class="fas fa-spray-can"></i> Perfumes',
'umbrella': '<i class="fas fa-umbrella"></i> Umbrella',
        'personal': '<i class="fas fa-spa"></i> Personal Care'
    };
    label.innerHTML = categoryNames[category] || category;

    document.getElementById('catDropdownMenu').classList.remove('open');
    document.getElementById('catDropdownToggle').classList.remove('open');

    if (category === 'all') {
        filteredProducts = [...products];
    } else {
        filteredProducts = products.filter(p => p.category === category);
    }
    sortProducts();
}

document.addEventListener('click', function(e) {
    const dropdown = document.getElementById('categoryDropdownMobile');
    if (dropdown && !dropdown.contains(e.target)) {
        const menu = document.getElementById('catDropdownMenu');
        const toggle = document.getElementById('catDropdownToggle');
        if (menu) menu.classList.remove('open');
        if (toggle) toggle.classList.remove('open');
    }
});

function resetFilters() {
    document.getElementById('searchInput').value = '';
    document.getElementById('sortSelect').value = 'default';
    document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
    document.querySelector('.category-btn').classList.add('active');
    filteredProducts = [...products];
    currentSort = 'default';
    renderProducts(filteredProducts, true);
}

// ===== BACK TO TOP =====
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function handleScroll() {
    const backToTop = document.getElementById('backToTop');
    if (window.pageYOffset > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
}

// ===== ADMIN FUNCTIONS =====
function showLogin() {
    document.getElementById('loginOverlay').classList.add('active');
    document.getElementById('adminPassword').value = '';
    document.getElementById('adminPassword').focus();
}

function closeLogin() {
    document.getElementById('loginOverlay').classList.remove('active');
    document.getElementById('loginError').style.display = 'none';
}

function checkAdminLogin() {
    const password = document.getElementById('adminPassword').value;
    if (password === 'MartieD2026!') {
        isAdmin = true;
        closeLogin();
        document.getElementById('adminPanel').classList.add('active');
        document.body.classList.add('admin-mode');
        showToast('Admin mode activated!');
    } else {
        document.getElementById('loginError').style.display = 'block';
    }
}

function logoutAdmin() {
    isAdmin = false;
    editMode = false;
    document.getElementById('adminPanel').classList.remove('active');
    document.body.classList.remove('admin-mode');
    document.body.classList.remove('admin-edit');
    document.getElementById('addProductForm').classList.remove('active');
    document.getElementById('editModeBtn').textContent = 'Edit: OFF';
    showToast('Logged out');
}

function toggleEditMode() {
    if (!isAdmin) return;
    editMode = !editMode;
    if (editMode) {
        document.body.classList.add('admin-edit');
        document.getElementById('editModeBtn').textContent = 'Edit: ON';
        showToast('Edit mode ON - Click text to edit');
    } else {
        document.body.classList.remove('admin-edit');
        document.getElementById('editModeBtn').textContent = 'Edit: OFF';
        showToast('Edit mode OFF');
    }
}

function inlineEdit(productId, field) {
    if (!isAdmin || !editMode) return;
    const product = products.find(p => p.id === productId);
    if (!product) return;

    let newValue;
    if (field === 'price') {
        newValue = prompt(`Edit price for ${product.name}:`, product.price);
        if (newValue !== null && !isNaN(newValue)) {
            product.price = parseInt(newValue);
            saveProducts();
            renderProducts(filteredProducts, true);
            showToast('Price updated!');
        }
    } else if (field === 'name') {
        newValue = prompt(`Edit product name:`, product.name);
        if (newValue !== null && newValue.trim() !== '') {
            product.name = newValue.trim();
            saveProducts();
            renderProducts(filteredProducts, true);
            showToast('Name updated!');
        }
    } else if (field === 'description') {
        newValue = prompt(`Edit description:`, product.description);
        if (newValue !== null) {
            product.description = newValue.trim();
            saveProducts();
            renderProducts(filteredProducts, true);
            showToast('Description updated!');
        }
    } else if (field === 'stock') {
        newValue = prompt(`Edit stock quantity:`, product.stock);
        if (newValue !== null && !isNaN(newValue)) {
            product.stock = parseInt(newValue);
            saveProducts();
            renderProducts(filteredProducts, true);
            showToast('Stock updated!');
        }
    }
}

function editProduct(id) {
    if (!isAdmin) {
        showToast('Please login as admin first!');
        return;
    }
    const productCard = document.querySelector(`[data-id="${id}"]`);
    if (productCard) {
        productCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        productCard.style.animation = 'pulse 1s';
        setTimeout(() => {
            productCard.style.animation = '';
        }, 1000);
        if (!editMode) {
            showToast('Enable Edit Mode to make changes');
        }
    }
}

function addNewProduct() {
    if (!isAdmin) return;
    document.getElementById('addProductForm').classList.add('active');
    document.getElementById('newProductName').focus();
}

function cancelAddProduct() {
    document.getElementById('addProductForm').classList.remove('active');
    document.getElementById('newProductName').value = '';
    document.getElementById('newProductPrice').value = '';
    document.getElementById('newProductStock').value = '10';
    document.getElementById('newProductImage').value = '';
    document.getElementById('newProductDescription').value = '';
}

function saveNewProduct() {
    const name = document.getElementById('newProductName').value.trim();
    const price = parseInt(document.getElementById('newProductPrice').value);
    const stock = parseInt(document.getElementById('newProductStock').value) || 10;
    const image = document.getElementById('newProductImage').value.trim();
    const category = document.getElementById('newProductCategory').value;
    const description = document.getElementById('newProductDescription').value.trim();

    if (!name || !price) {
        alert('Please enter at least name and price');
        return;
    }

    const newId = Math.max(...products.map(p => p.id), 0) + 1;
    let imagePath = image;
    if (!imagePath) {
        imagePath = `https://via.placeholder.com/300x180/f5f0f7/652e92?text=${encodeURIComponent(name)}`;
    }

    const newProduct = {
        id: newId,
        name: name,
        category: category,
        price: price,
        image: imagePath,
        badge: 'new',
        description: description || 'New product',
        stock: stock,
        soldToday: 0
    };

    products.push(newProduct);
    saveProducts();
    filteredProducts = [...products];
    renderProducts(filteredProducts, true);
    cancelAddProduct();
    showToast('New product added!');
}

function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', function() {
    filteredProducts = [...products];
    renderProducts(filteredProducts, true);
    updateCartUI();

    window.addEventListener('scroll', handleScroll);

    document.getElementById('adminPassword').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') checkAdminLogin();
    });
});