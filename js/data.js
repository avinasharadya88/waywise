// Data Store for Personal Trip Planner: Activities, Sights to Visit & Stays

const PLANNER_DATA = {
  currencies: {
    USD: { symbol: "$", rate: 1.0, label: "USD ($)" },
    INR: { symbol: "₹", rate: 84.0, label: "INR (₹)" },
    EUR: { symbol: "€", rate: 0.92, label: "EUR (€)" },
    GBP: { symbol: "£", rate: 0.78, label: "GBP (£)" },
    JPY: { symbol: "¥", rate: 152.0, label: "JPY (¥)" }
  },

  assumptions: {
    dailyMealsCostUSD: 40,   // Stated base assumption per day for food & dining
    dailyTransitCostUSD: 15  // Stated base assumption per day for local transport
  },

  destinations: [
    { id: "Paris", name: "Paris, France", country: "France", heroImage: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80" },
    { id: "Tokyo", name: "Tokyo, Japan", country: "Japan", heroImage: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80" },
    { id: "Bali", name: "Bali, Indonesia", country: "Indonesia", heroImage: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80" },
    { id: "Rome", name: "Rome, Italy", country: "Italy", heroImage: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80" }
  ],

  // =========================================================================
  // ATTRACTIONS & THINGS TO VISIT (What to see, do, explore in each locality)
  // =========================================================================
  activities: [
    // --- PARIS SIGHTS & EXPERIENCES ---
    {
      id: "par-act-01",
      destination: "Paris",
      title: "Louvre Museum & Winged Victory",
      category: "Culture",
      timeSlot: "Morning",
      durationHours: 3.0,
      costUSD: 25,
      rating: 4.92,
      reviewsCount: 4200,
      coordinates: { x: 48, y: 32 },
      images: [
        "https://images.unsplash.com/photo-1565099824688-e93eb20fe622?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1543349689-9a4d426bee8e?auto=format&fit=crop&w=800&q=80"
      ],
      description: "Walk the historic corridors of the world's largest art museum. Marvel at Leonardo da Vinci's Mona Lisa, the Venus de Milo, and Napoleon III's state apartments.",
      highlight: "Must-see classical art & architecture"
    },
    {
      id: "par-act-02",
      destination: "Paris",
      title: "Latin Quarter Gourmet Pastry & Bakery Walk",
      category: "Food",
      timeSlot: "Morning",
      durationHours: 2.0,
      costUSD: 30,
      rating: 4.96,
      reviewsCount: 890,
      coordinates: { x: 52, y: 42 },
      images: [
        "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80"
      ],
      description: "Taste warm flaky croissants, artisan sourdough baguettes, and delicate macarons while learning century-old French baking secrets from master pâtissiers.",
      highlight: "Artisan bakeries & fresh tastings"
    },
    {
      id: "par-act-03",
      destination: "Paris",
      title: "Montmartre & Sacré-Cœur Artist Quarter",
      category: "Culture",
      timeSlot: "Afternoon",
      durationHours: 2.5,
      costUSD: 15,
      rating: 4.88,
      reviewsCount: 1540,
      coordinates: { x: 42, y: 18 },
      images: [
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=800&q=80"
      ],
      description: "Wander through cobblestone bohemian alleyways, visit Place du Tertre where painters work live at their easels, and gaze at sweeping views over Paris.",
      highlight: "Panoramic viewpoint & historic street art"
    },
    {
      id: "par-act-04",
      destination: "Paris",
      title: "Seine River Cruise & Notre-Dame Island",
      category: "Relaxation",
      timeSlot: "Afternoon",
      durationHours: 1.5,
      costUSD: 20,
      rating: 4.91,
      reviewsCount: 2310,
      coordinates: { x: 50, y: 38 },
      images: [
        "https://images.unsplash.com/photo-1471623432079-b009d30b6729?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1520939817895-060bdaf4fe1b?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1549144511-f099e773c147?auto=format&fit=crop&w=800&q=80"
      ],
      description: "Glide beneath historic stone bridges on an electric glass-canopied cruiser, capturing unique water perspectives of Notre-Dame and the Conciergerie.",
      highlight: "Scenic bridge arches & waterfront monuments"
    },
    {
      id: "par-act-05",
      destination: "Paris",
      title: "Eiffel Tower Summit & Trocadéro Light Show",
      category: "Adventure",
      timeSlot: "Evening",
      durationHours: 2.5,
      costUSD: 38,
      rating: 4.95,
      reviewsCount: 5600,
      coordinates: { x: 34, y: 36 },
      images: [
        "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1543349689-9a4d426bee8e?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80"
      ],
      description: "Ascend to the highest observation deck in Paris as the iron lady sparkles with 20,000 golden bulbs against the twilight Parisian skyline.",
      highlight: "Iconic evening summit view"
    },
    {
      id: "par-act-06",
      destination: "Paris",
      title: "Traditional Le Marais Bistro Wine & Tasting",
      category: "Food",
      timeSlot: "Evening",
      durationHours: 2.5,
      costUSD: 52,
      rating: 4.94,
      reviewsCount: 680,
      coordinates: { x: 56, y: 34 },
      images: [
        "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80"
      ],
      description: "Savor duck confit, beef bourguignon, and artisan French cheeses paired with organic biodynamic wines in a cozy 17th-century vaulted cellar.",
      highlight: "3-course gourmet dining & sommelier pairing"
    },
    {
      id: "par-act-07",
      destination: "Paris",
      title: "Tuileries Gardens & Orangerie Monet Water Lilies",
      category: "Culture",
      timeSlot: "Morning",
      durationHours: 2.0,
      costUSD: 16,
      rating: 4.89,
      reviewsCount: 1120,
      coordinates: { x: 44, y: 33 },
      images: [
        "https://images.unsplash.com/photo-1549144511-f099e773c147?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=800&q=80"
      ],
      description: "Immerse yourself in Claude Monet's monumental 360-degree Water Lilies murals inside custom oval galleries, preceded by a tranquil stroll among statues.",
      highlight: "Monet's original impressionist murals"
    },
    {
      id: "par-act-08",
      destination: "Paris",
      title: "Musée d'Orsay Railway Masters Tour",
      category: "Culture",
      timeSlot: "Afternoon",
      durationHours: 2.5,
      costUSD: 18,
      rating: 4.93,
      reviewsCount: 3100,
      coordinates: { x: 46, y: 36 },
      images: [
        "https://images.unsplash.com/photo-1520939817895-060bdaf4fe1b?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1565099824688-e93eb20fe622?auto=format&fit=crop&w=800&q=80"
      ],
      description: "Housed in a grand Beaux-Arts railway station, showcasing works by Van Gogh, Renoir, Degas, and Cézanne beneath the giant glass clock.",
      highlight: "World's largest impressionist collection"
    },
    {
      id: "par-act-09",
      destination: "Paris",
      title: "Palais Garnier Opera House Night Tour",
      category: "Culture",
      timeSlot: "Evening",
      durationHours: 2.0,
      costUSD: 28,
      rating: 4.91,
      reviewsCount: 780,
      coordinates: { x: 47, y: 26 },
      images: [
        "https://images.unsplash.com/photo-1543349689-9a4d426bee8e?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=800&q=80"
      ],
      description: "Walk the lavish marble Grand Staircase and gaze up at Marc Chagall's painted ceiling in the opera house that inspired The Phantom of the Opera.",
      highlight: "Gilded chandeliers & opulent marble architecture"
    },

    // --- TOKYO SIGHTS & EXPERIENCES ---
    {
      id: "tyo-act-01",
      destination: "Tokyo",
      title: "Senso-ji Temple & Nakamise-dori Morning Ritual",
      category: "Culture",
      timeSlot: "Morning",
      durationHours: 2.5,
      costUSD: 10,
      rating: 4.94,
      reviewsCount: 3900,
      coordinates: { x: 74, y: 32 },
      images: [
        "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1492571350019-22de08371fd3?auto=format&fit=crop&w=800&q=80"
      ],
      description: "Tokyo's oldest and most sacred Buddhist temple. Pass beneath the Thunder Gate's giant red lantern and smell fragrant incense in the main courtyard.",
      highlight: "Ancient 7th-century Buddhist history & stalls"
    },
    {
      id: "tyo-act-02",
      destination: "Tokyo",
      title: "Tsukiji Outer Market Fresh Seafood Safari",
      category: "Food",
      timeSlot: "Morning",
      durationHours: 2.0,
      costUSD: 35,
      rating: 4.96,
      reviewsCount: 1820,
      coordinates: { x: 68, y: 48 },
      images: [
        "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=800&q=80"
      ],
      description: "Sample flame-seared A5 Wagyu skewers, fresh Otoro tuna nigiri, sweet dashi tamagoyaki omelettes, and grilled giant scallops directly from fishmongers.",
      highlight: "Fresh sashimi & live vendor street eats"
    },
    {
      id: "tyo-act-03",
      destination: "Tokyo",
      title: "Meiji Jingu Shrine & Yoyogi Evergreen Forest",
      category: "Relaxation",
      timeSlot: "Morning",
      durationHours: 2.0,
      costUSD: 0,
      rating: 4.92,
      reviewsCount: 2800,
      coordinates: { x: 55, y: 44 },
      images: [
        "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80"
      ],
      description: "Walk beneath towering cedar Torii gates into a tranquil forest of 120,000 native trees donated from across Japan, offering calm respite in central Shibuya.",
      highlight: "Sacred Shinto forest sanctuary"
    },
    {
      id: "tyo-act-04",
      destination: "Tokyo",
      title: "Akihabara Electronics & VR Gaming Odyssey",
      category: "Adventure",
      timeSlot: "Afternoon",
      durationHours: 3.0,
      costUSD: 24,
      rating: 4.88,
      reviewsCount: 1650,
      coordinates: { x: 70, y: 38 },
      images: [
        "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=800&q=80"
      ],
      description: "Dive into multi-floor arcades, retro gaming meccas, and futuristic anime pavilions in Tokyo's neon electric district.",
      highlight: "Multi-level retro arcades & tech wonderland"
    },
    {
      id: "tyo-act-05",
      destination: "Tokyo",
      title: "Ramen Street & Hand-pulled Noodle Workshop",
      category: "Food",
      timeSlot: "Afternoon",
      durationHours: 2.0,
      costUSD: 20,
      rating: 4.95,
      reviewsCount: 920,
      coordinates: { x: 67, y: 42 },
      images: [
        "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=800&q=80"
      ],
      description: "Compare rich tonkotsu pork broth, light shio, and aged miso broths along Tokyo Station's famous Ramen Street with seasoned noodle masters.",
      highlight: "Master broth styles & gyoza sides"
    },
    {
      id: "tyo-act-06",
      destination: "Tokyo",
      title: "Shibuya Sky 360° Rooftop & Scramble Crossing",
      category: "Adventure",
      timeSlot: "Evening",
      durationHours: 2.0,
      costUSD: 26,
      rating: 4.97,
      reviewsCount: 3400,
      coordinates: { x: 57, y: 52 },
      images: [
        "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80"
      ],
      description: "Stand atop the 229-meter open-air glass sky deck overlooking Tokyo Tower, Mt. Fuji on clear sunsets, and the pulsing Shibuya scramble crossing below.",
      highlight: "Highest open-air rooftop observation deck"
    },
    {
      id: "tyo-act-07",
      destination: "Tokyo",
      title: "Shinjuku Omoide Yokocho Lantern Alley Izakaya",
      category: "Food",
      timeSlot: "Evening",
      durationHours: 2.5,
      costUSD: 36,
      rating: 4.92,
      reviewsCount: 1420,
      coordinates: { x: 54, y: 39 },
      images: [
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80"
      ],
      description: "Atmospheric smoky wooden alleyways lined with red paper lanterns, sizzling charcoal yakitori skewers, and chilled Japanese draft beers.",
      highlight: "Authentic local pub culture & charcoal skewers"
    },

    // --- BALI SIGHTS & EXPERIENCES ---
    {
      id: "bali-act-01",
      destination: "Bali",
      title: "Ubud Sacred Monkey Forest & Ancient Moss Sanctuary",
      category: "Culture",
      timeSlot: "Morning",
      durationHours: 2.5,
      costUSD: 8,
      rating: 4.91,
      reviewsCount: 2200,
      coordinates: { x: 50, y: 48 },
      images: [
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80"
      ],
      description: "Walk ancient stone bridges covered in green moss under giant banyan trees while observing playful long-tailed macaques in their natural jungle habitat.",
      highlight: "Ancient Hindu shrines in lush jungle"
    },
    {
      id: "bali-act-02",
      destination: "Bali",
      title: "Tegallalang Emerald Rice Terraces & Jungle Swing",
      category: "Adventure",
      timeSlot: "Afternoon",
      durationHours: 2.5,
      costUSD: 18,
      rating: 4.93,
      reviewsCount: 3100,
      coordinates: { x: 54, y: 42 },
      images: [
        "https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80"
      ],
      description: "Trek through cascading UNESCO-recognized rice paddies sculpted into the mountain ridges, followed by soaring on a giant swing over the coconut canopy.",
      highlight: "UNESCO terraced landscape & epic photo spots"
    },
    {
      id: "bali-act-03",
      destination: "Bali",
      title: "Uluwatu Clifftop Temple & Fire Kecak Dance",
      category: "Culture",
      timeSlot: "Evening",
      durationHours: 2.5,
      costUSD: 22,
      rating: 4.97,
      reviewsCount: 2900,
      coordinates: { x: 42, y: 72 },
      images: [
        "https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80"
      ],
      description: "Perched 70 meters above roaring Indian Ocean waves, witness the hypnotic vocal rhythm and fiery spectacle of the traditional Balinese Kecak dance at sunset.",
      highlight: "Clifftop sunset & traditional fire ritual"
    },

    // --- ROME SIGHTS & EXPERIENCES ---
    {
      id: "rom-act-01",
      destination: "Rome",
      title: "Colosseum Arena & Ancient Roman Forum",
      category: "Culture",
      timeSlot: "Morning",
      durationHours: 3.0,
      costUSD: 24,
      rating: 4.96,
      reviewsCount: 4800,
      coordinates: { x: 55, y: 52 },
      images: [
        "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?auto=format&fit=crop&w=800&q=80"
      ],
      description: "Step onto the gladiator battle floor of the 2,000-year-old Flavian Amphitheatre, then explore the political heart of the ancient Roman Empire.",
      highlight: "Gladiator arena floor & triumphal arches"
    },
    {
      id: "rom-act-02",
      destination: "Rome",
      title: "Trastevere Handcrafted Pasta & Gelato Tour",
      category: "Food",
      timeSlot: "Afternoon",
      durationHours: 2.0,
      costUSD: 28,
      rating: 4.95,
      reviewsCount: 1250,
      coordinates: { x: 48, y: 58 },
      images: [
        "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80"
      ],
      description: "Sample authentic Roman Cacio e Pepe, crispy fried artichokes, wood-fired supplì rice balls, and artisanal pistachio gelato along ivy-clad alleys.",
      highlight: "Hand-rolled pasta & authentic gelato tasting"
    },
    {
      id: "rom-act-03",
      destination: "Rome",
      title: "Trevi Fountain Coin Toss & Spanish Steps at Twilight",
      category: "Relaxation",
      timeSlot: "Evening",
      durationHours: 2.0,
      costUSD: 0,
      rating: 4.92,
      reviewsCount: 3200,
      coordinates: { x: 52, y: 44 },
      images: [
        "https://images.unsplash.com/photo-1525874684015-58379d421a52?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80"
      ],
      description: "Toss a coin over your left shoulder into Nicola Salvi's baroque travertine masterpiece under warm evening spotlights to ensure your return to Rome.",
      highlight: "Baroque fountains illuminated under the stars"
    }
  ],

  // =========================================================================
  // HANDPICKED STAYS IN THE LOCALITIES (Where to stay during your trip)
  // =========================================================================
  stays: [
    {
      id: "stay-par-01",
      destination: "Paris",
      title: "Hôtel Particulier Le Marais Loft",
      location: "Le Marais, 4th Arr., Paris",
      type: "Entire boutique loft",
      pricePerNightUSD: 240,
      rating: 4.96,
      reviewsCount: 184,
      isSuperhost: true,
      guests: 3,
      bedrooms: 1,
      beds: 2,
      bathrooms: 1,
      images: [
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80"
      ],
      amenities: ["Exposed Oak Beams", "Fast Wifi (400 Mbps)", "Chef's Kitchen", "Rain Shower", "Steps to Place des Vosges"]
    },
    {
      id: "stay-par-02",
      destination: "Paris",
      title: "Saint-Germain Rooftop Terrace Suite",
      location: "Saint-Germain-des-Prés, 6th Arr., Paris",
      type: "Entire penthouse",
      pricePerNightUSD: 360,
      rating: 4.98,
      reviewsCount: 220,
      isSuperhost: true,
      guests: 4,
      bedrooms: 2,
      beds: 2,
      bathrooms: 2,
      images: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80"
      ],
      amenities: ["Eiffel Tower Skyline View", "Wraparound Balcony", "Air Conditioning", "Nespresso Bar", "Elevator"]
    },
    {
      id: "stay-tyo-01",
      destination: "Tokyo",
      title: "Asakusa Heritage Garden Ryokan Suite",
      location: "Taito-ku, Asakusa, Tokyo",
      type: "Traditional Ryokan",
      pricePerNightUSD: 190,
      rating: 4.97,
      reviewsCount: 310,
      isSuperhost: true,
      guests: 2,
      bedrooms: 1,
      beds: 2,
      bathrooms: 1,
      images: [
        "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80"
      ],
      amenities: ["Tatami Mattresses", "Hinoki Cypress Tub", "Matcha Set", "Zen Rock Garden", "High-speed Wifi"]
    },
    {
      id: "stay-tyo-02",
      destination: "Tokyo",
      title: "Shibuya Panoramic Glass High-Rise",
      location: "Shibuya-ku, Central Tokyo",
      type: "Modern luxury condo",
      pricePerNightUSD: 280,
      rating: 4.95,
      reviewsCount: 165,
      isSuperhost: true,
      guests: 4,
      bedrooms: 2,
      beds: 2,
      bathrooms: 1.5,
      images: [
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1517840901100-8179e982acb7?auto=format&fit=crop&w=800&q=80"
      ],
      amenities: ["Floor-to-ceiling City View", "Washer/Dryer", "Subway Station Direct Access", "Gym & Pool"]
    },
    {
      id: "stay-bali-01",
      destination: "Bali",
      title: "Villa Mirah Sacred River Sanctuary",
      location: "Ubud, Bali",
      type: "Private pool villa",
      pricePerNightUSD: 160,
      rating: 4.98,
      reviewsCount: 420,
      isSuperhost: true,
      guests: 4,
      bedrooms: 2,
      beds: 2,
      bathrooms: 2,
      images: [
        "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80"
      ],
      amenities: ["Private Infinity Pool", "Daily Cooked Breakfast", "Floating Breakfast Available", "Jungle Ravine View"]
    },
    {
      id: "stay-rom-01",
      destination: "Rome",
      title: "Residenza Piazza Navona Baroque Suite",
      location: "Piazza Navona, Rome",
      type: "Historic palazzo apartment",
      pricePerNightUSD: 220,
      rating: 4.94,
      reviewsCount: 195,
      isSuperhost: true,
      guests: 3,
      bedrooms: 1,
      beds: 2,
      bathrooms: 1,
      images: [
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80"
      ],
      amenities: ["Original 16th-century Frescoes", "Italian Marble Bath", "Steps from Fountain of Four Rivers", "Wine Cellar"]
    }
  ]
};
