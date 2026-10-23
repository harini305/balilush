// Alt text written from what each original photograph shows (77 of 99 originals had no
// useful alt text on the source site). Factual descriptions only — no claims.
const alts = {
  // Home
  'home/garden-teak-house-terraces': 'A teak house among tropical gardens and palms at Bali Lush, with rice terraces and forest beyond',
  'home/bungalow-among-palms': 'A teak bungalow on the hillside seen through palms and banana plants above the rice terraces',
  'home/teak-bedroom-canopy-bed': 'Teak and brick bedroom with a canopy bed draped in a white mosquito net',
  'home/bedroom-rice-view': 'Teak bedroom with a patterned bedspread, tiled floor and open doors onto the greenery',
  'home/bedroom-open-windows': 'Teak bedroom with two beds and wide openings looking out to the rice fields',
  'home/pool-guests-swimming': 'Guests in the swimming pool under a turquoise umbrella, with palms and rice terraces behind',
  'home/dining-table-garden-doors': 'Carved teak doors open onto a dining table and views of the rice terraces',
  'home/joglo-roof-garden': 'A dark teak roof rising above red flowers and tropical plants under a blue sky',
  'home/bedroom-evening-light': 'A teak bedroom glowing with lamplight in the evening',
  'home/garden-lily-pond': 'A round lily pond in a lawn, surrounded by gardens and views across the valley',
  'home/teak-cottage-garden': 'A small antique teak cottage with a verandah, set on a stone base in a green garden',
  'home/swimming-pool': 'The swimming pool edged with plants, with a ceremonial umbrella and the valley beyond',

  // Staff (no names published on the source)
  'staff/staff-1': 'A Bali Lush staff member dancing in the garden',
  'staff/staff-2': 'Bali Lush staff preparing food together at a table',
  'staff/staff-3': 'A Bali Lush staff member holding a tray of offerings on the hillside',
  'staff/staff-4': 'Bali Lush staff sharing a meal on mats in the garden',
  'staff/staff-5': 'A Bali Lush staff member smiling behind a birthday cake',
  'staff/staff-6': 'A smiling Bali Lush staff member in a black cap',

  // Rooms
  'rooms/butterfly-card': 'Butterfly Room: canopy bed with a white mosquito net and a single bed under a teak roof',
  'rooms/butterfly-balcony': 'A round wooden table and chairs on a verandah overlooking the rice terraces',
  'rooms/butterfly-beds': 'Brick and teak bedroom with a canopy bed and a single bed',
  'rooms/butterfly-desk': 'Teak wardrobe, writing desk and mirror inside the room',
  'rooms/butterfly-bathroom': 'Open-air bathroom with a stone wall, shower and ferns',
  'rooms/batukaru-drone': 'Aerial view of rice terraces and forest with Mount Batukaru in the distance',
  'rooms/dragonfly-card': 'Dragonfly Room: canopy bed, bench seating and shelves of books and DVDs',
  'rooms/dragonfly-desk': 'Teak room with a bed, cabinet with television and minibar, and a carved desk by a window',
  'rooms/dragonfly-canopy-bed': 'Super King canopy bed with a white mosquito net under a high teak roof',
  'rooms/dragonfly-bunk-beds': 'Wooden bunk beds beside the canopy bed',
  'rooms/frog-card': 'Frog Bungalow: canopy bed with a purple valance, beside floor-length windows',
  'rooms/frog-exterior': 'Frog Bungalow, an antique teak rice barn with a terrace facing the rice fields',
  'rooms/frog-canopy-bed': 'Canopy bed with mosquito net beside floor-length windows',
  'rooms/frog-outdoor-bathroom': 'Open-air bathroom with a partial roof, stone walls and plants',
  'rooms/frog-terrace-view': 'Covered terrace with a chair and table looking across the garden to the rice terraces',
  'rooms/duck-card': 'Duck Cottage: open-plan teak room with a large bed and a second bed by the windows',
  'rooms/duck-garden': 'Garden path to a teak building with rice terraces beyond',
  'rooms/duck-bed': 'Duck Cottage bed with a patterned throw under a teak roof',
  'rooms/duck-beds': 'Two beds in the open-plan teak room with windows onto the garden',
  'rooms/duck-open-plan': 'Wide view of the open-plan room with several beds and a day bed',
  'rooms/duck-balcony': 'Covered balcony with a carved railing and chair, overlooking the rice fields',
  'rooms/duck-bathroom': 'Doorway from the bedroom to the open-air bathroom with a towel rail',
  'rooms/cottages-panorama': 'Teak roofs and colourful umbrellas among the gardens at Bali Lush',

  // Reviews
  'reviews/pool-terraces': 'A guest beside the pool and a thatched pavilion, with rice terraces behind',

  // Activities
  'activities/waterfall': 'A waterfall dropping over dark rock into a still pool surrounded by forest',
  'activities/waterfall-swim': 'A tiered waterfall flowing over rocks in the jungle',
  'activities/walks-treks': 'Guests walking a forest trail with a local guide',
  'activities/morning-market': 'Bunches of fresh greens and spring onions on a market stall',
  'activities/motorcycle-tour': 'A guest riding pillion on a scooter along a road beside flooded rice fields',
  'activities/jamu-making': 'A glass of golden jamu held up against the sunrise over the valley',
  'activities/offering': 'A guest learning to make a woven palm-leaf offering with a local teacher',
  'activities/local-school': 'Children at their desks in a village school classroom',
  'activities/yoga': 'Close-up of hands resting in a yoga mudra',

  // Restaurant
  'restaurant/garden-vegetables': 'Freshly picked vegetables laid out on a wooden table: aubergines, radishes, tomatoes, beetroot and herbs',
  'restaurant/garden-joglo-pool': 'The garden pathway and pool below the open-air teak restaurant',
  'restaurant/mie-goreng-plates': 'Two plates of mie goreng, one topped with a fried egg, with fresh juices',
  'restaurant/dining-terrace': 'The open-air restaurant terrace with a long wooden table overlooking the rice terraces',
  'restaurant/dining-room': 'Inside the restaurant: a long wooden table, a kitchen counter and a dartboard',
  'restaurant/sate-grill': 'A cook grilling sate skewers over coconut charcoal',
  'restaurant/sate-grill-two': 'Two cooks holding sate skewers at the outdoor grill',

  // Menus
  'menus/breakfast-omelette': 'An omelette with herbs and two slices of toast on a white plate',
  'menus/papaya-harvest': 'A smiling cook holding a freshly picked papaya in the garden',
  'menus/fresh-juices': 'Four glasses of fresh fruit juice lined up on a stone ledge',
  'menus/sourdough-plate': 'Slices of sourdough with butter and sliced tomatoes',
  'menus/retreat-buffet': 'A spread of Middle Eastern dishes: falafel, salads, flatbread and dips',
  'menus/slaw-salad': 'A shredded cabbage and herb slaw on a patterned plate',
  'menus/garden-salad': 'A garden salad with lettuce and carrot in a white bowl',
  'menus/creamy-soup': 'A bowl of creamy soup garnished with coriander',
  'menus/stir-fried-noodles': 'Stir-fried flat rice noodles with lime wedges',
  'menus/soto-ayam': 'Soto ayam: chicken soup with noodles, egg and lime',
  'menus/mie-goreng': 'A plate of mie goreng fried noodles with vegetables',

  // Retreats
  'retreats/shala-cushions': 'The thatched yoga shala set with floor cushions, looking out to the garden',
  'retreats/retreat-group': 'A retreat group and Bali Lush staff with palms pressed together',
  'retreats/shala-flower-mandala': 'A flower mandala on the shala floor with retreat guests seated around it',
  'retreats/teak-house-hillside': 'A teak house on the hillside above flowering terraced gardens',
  'retreats/scooter-rice-fields': 'A guest riding pillion on a scooter between rice fields',
  'retreats/offering-lesson': 'A village elder showing a guest how to prepare an offering',
  'retreats/weaving-offering': 'Hands weaving strips of palm leaf around a flower offering',
  'retreats/group-flower-mandala': 'Retreat guests dressed in white around a flower mandala in the shala',
  'retreats/candle-hands': 'Cupped hands holding a small lit candle',
  'retreats/balinese-dress': 'Retreat guests in Balinese dress in the restaurant',
  'retreats/garden-meditation': 'A guest sitting in meditation beside the shala steps among flowers',
  'retreats/group-restaurant': 'A large retreat group with staff gathered in the restaurant',
  'retreats/cooking-class': 'Retreat guests and cooks rolling dough in the kitchen',
  'retreats/cooking-class-group': 'Retreat guests in aprons with the kitchen team',
  'retreats/lounge-verandah': 'A guest relaxing on cushions on a verandah overlooking the rice fields',

  // Blog
  'blog/pineapple-season': 'A row of ripe pineapples laid on the grass in the garden',
  'blog/pineapple-harvest': 'Staff gathering harvested pineapples into tubs in the garden',
  'blog/penjor-1': 'A guest and a staff member in blue sitting on a mat, weaving palm leaves for the penjor',
  'blog/penjor-2': 'A staff member in blue showing a guest how to weave a palm-leaf decoration',
  'blog/penjor-3': 'A guest and a staff member weaving palm-leaf decorations on the lawn',
  'blog/rice-planting': 'Guests planting rice seedlings in a flooded paddy',
  'blog/tug-o-war-1': 'Village police in green uniforms pulling in a tug of war',
  'blog/tug-o-war-2': 'The tug of war team straining on the rope as villagers watch',
  'blog/tug-o-war-3': 'A tug of war team member cheering with arms raised',
  'blog/tug-o-war-4': 'Team members celebrating after the tug of war',
  'blog/tug-o-war-5': 'A smiling team member walking off the field after the tug of war',
};

export default alts;
