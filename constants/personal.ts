// 🌟 Personal Life & Interests Data - UPDATED
// Single source of truth for personal portfolio information

export interface BucketListItem {
    id: string
    title: string
    completed: boolean
    icon: string
    color: string
}

export interface TravelExperience {
    id: string
    location: string
    country: string
    visited: boolean
    visitDate?: string
    duration?: string
    highlights: string[]
    rating: number // 1-5
    memories: string
    category: "city" | "nature" | "historical" | "adventure" | "cultural"
    coordinates?: { lat: number; lng: number }
}

// =============================================================================
// PERSONAL DATA - UPDATED
// =============================================================================

export const bucketList: BucketListItem[] = [
    {
        id: "spiti-valley-trip",
        title: "Explore Spiti Valley's Moon-like Landscape",
        completed: true,
        icon: "🏔️",
        color: "#A78BFA"
    },
    {
        id: "ladakh-bike-trip",
        title: "Epic Ladakh Bike Trip on Royal Enfield",
        completed: false,
        icon: "🏍️",
        color: "#60A5FA"
    },
    {
        id: "fall-in-love",
        title: "Find True Love & Life Partner",
        completed: false,
        icon: "💕",
        color: "#FDE2E4"
    },
    {
        id: "learn-swimming",
        title: "Learn Swimming Properly",
        completed: false,
        icon: "🏊‍♂️",
        color: "#34D399"
    },
    {
        id: "sky-diving",
        title: "Experience Skydiving Adventure",
        completed: false,
        icon: "🪂",
        color: "#F59E0B"
    },
    {
        id: "scuba-diving",
        title: "Explore Underwater World - Scuba Diving",
        completed: false,
        icon: "🤿",
        color: "#0EA5E9"
    },
    {
        id: "tech-startup",
        title: "Launch My Own Tech Startup",
        completed: false,
        icon: "🚀",
        color: "#8B5CF6"
    },
    {
        id: "open-source-contribution",
        title: "Contribute to Major Open Source Project",
        completed: false,
        icon: "💻",
        color: "#10B981"
    },
    {
        id: "learn-piano",
        title: "Master Playing Piano",
        completed: false,
        icon: "🎹",
        color: "#C084FC"
    },
    {
        id: "fitness-marathon",
        title: "Complete a Full Marathon",
        completed: false,
        icon: "🏃‍♂️",
        color: "#EF4444"
    }
]

export const travelExperiences: TravelExperience[] = [
    // =============================
    // PLACES I HAVE VISITED ✅
    // =============================
    {
        id: "kashmir-2023",
        location: "Kashmir Valley",
        country: "India",
        visited: true,
        visitDate: "2023-08",
        duration: "6 days",
        highlights: [
            "Breathtaking Dal Lake shikara ride at sunrise",
            "Snow-capped peaks and pristine valleys",
            "Mughal Gardens - Shalimar and Nishat Bagh",
            "Traditional houseboats on Dal Lake",
            "Gulmarg gondola ride and skiing slopes",
            "Local Kashmiri cuisine and kehwa tea"
        ],
        rating: 5,
        memories: "Kashmir truly felt like paradise on earth! The serene beauty of Dal Lake at dawn, the majestic mountains, and the warm hospitality made it unforgettable. Every moment felt like a postcard.",
        category: "nature",
        coordinates: { lat: 34.083656, lng: 74.797371 }
    },
    {
        id: "kedarkantha-trek-2022",
        location: "Kedarkantha Trek",
        country: "India",
        visited: true,
        visitDate: "2022-12",
        duration: "5 days",
        highlights: [
            "Summit climb at 12,500 feet with 360° Himalayan views",
            "Camping beside frozen Juda ka Talab lake",
            "Snow-covered pine and oak forests",
            "Sunrise views of Swargarohini and Bandarpunch peaks",
            "Traditional Garhwali villages and culture",
            "Adventure of winter trekking in deep snow"
        ],
        rating: 5,
        memories: "My first winter trek! The summit push in freezing temperatures was challenging but so rewarding. The pristine snow, starlit nights, and achievement of reaching the peak made it life-changing.",
        category: "adventure",
        coordinates: { lat: 31.02257, lng: 78.17185 }
    },
    {
        id: "udaipur-2023",
        location: "Udaipur",
        country: "India",
        visited: true,
        visitDate: "2023-03",
        duration: "4 days",
        highlights: [
            "Magnificent City Palace overlooking Lake Pichola",
            "Romantic boat rides on Lake Pichola at sunset",
            "Jagdish Temple's intricate architecture",
            "Traditional Rajasthani thali and dal bati churma",
            "Saheliyon Ki Bari's beautiful gardens",
            "Vintage car museum and royal heritage"
        ],
        rating: 5,
        memories: "The City of Lakes lived up to its reputation! The royal palaces, serene lakes, and romantic ambiance made it feel like a fairy tale. Perfect blend of history and natural beauty.",
        category: "historical",
        coordinates: { lat: 24.571270, lng: 73.691544 }
    },
    {
        id: "jaipur-2022",
        location: "Jaipur",
        country: "India",
        visited: true,
        visitDate: "2022-10",
        duration: "3 days",
        highlights: [
            "Majestic Amber Fort and elephant rides",
            "Intricate Hawa Mahal (Palace of Winds)",
            "Colorful bazaars and traditional handicrafts",
            "City Palace museum and royal artifacts",
            "Jantar Mantar astronomical observatory",
            "Traditional Rajasthani folk performances"
        ],
        rating: 4,
        memories: "The Pink City was a visual feast! Every corner told stories of royal grandeur. The architecture, colors, and vibrant culture made it an incredible cultural immersion.",
        category: "historical",
        coordinates: { lat: 26.922070, lng: 75.778885 }
    },
    {
        id: "bhopal-2023",
        location: "Bhopal",
        country: "India",
        visited: true,
        visitDate: "2023-05",
        duration: "2 days",
        highlights: [
            "Serene Upper and Lower Lakes",
            "Bhimbetka rock paintings (UNESCO World Heritage)",
            "Taj-ul-Masajid - one of India's largest mosques",
            "Rich Mughal and Afghan architecture",
            "Traditional Bhopali cuisine and street food",
            "Museum of Man showcasing tribal culture"
        ],
        rating: 4,
        memories: "Bhopal surprised me with its blend of natural beauty and rich history. The ancient rock art at Bhimbetka was fascinating, and the lakes provided perfect tranquility.",
        category: "cultural",
        coordinates: { lat: 23.2599, lng: 77.4126 }
    },
    {
        id: "manali-kullu-kasol-2022",
        location: "Manali, Kullu & Kasol",
        country: "India",
        visited: true,
        visitDate: "2022-07",
        duration: "7 days",
        highlights: [
            "Adventure sports in Solang Valley",
            "Scenic drive through Kullu Valley",
            "Peaceful vibes in Kasol (Mini Israel)",
            "Rohtang Pass snow adventure",
            "Traditional Himachali cuisine",
            "Israeli food and cafes in Kasol",
            "Beas River rafting and paragliding",
            "Apple orchards and mountain views"
        ],
        rating: 4,
        memories: "Perfect mountain getaway! From adventure sports to peaceful river-side cafes, this trip had everything. The mix of Himachali culture and international vibes was unique.",
        category: "adventure",
        coordinates: { lat: 32.2396, lng: 77.1887 } // Manali coordinates
    },
    {
        id: "amritsar-2023",
        location: "Amritsar",
        country: "India",
        visited: true,
        visitDate: "2023-04",
        duration: "2 days",
        highlights: [
            "Golden Temple - spiritual and architectural marvel",
            "Witnessing the Wagah Border ceremony",
            "Free community kitchen (langar) experience",
            "Jallianwala Bagh historical significance",
            "Traditional Punjabi cuisine and lassi",
            "Sikh history and culture immersion"
        ],
        rating: 5,
        memories: "Deeply moving spiritual experience! The Golden Temple's serenity, the community service, and the patriotic fervor at Wagah Border created lasting memories.",
        category: "cultural",
        coordinates: { lat: 31.633979, lng: 74.872264 }
    },
    {
        id: "ooty-coonoor-2021",
        location: "Ooty & Coonoor",
        country: "India",
        visited: true,
        visitDate: "2021-09",
        duration: "4 days",
        highlights: [
            "Toy train ride through Nilgiri hills",
            "Tea gardens and colonial charm in Coonoor",
            "Ooty Lake boating and horse riding",
            "Rose Garden and Botanical Gardens",
            "Homemade chocolates and tea tasting",
            "Misty mountains and cool weather"
        ],
        rating: 4,
        memories: "The Queen of Hill Stations was perfectly charming! The toy train journey, aromatic tea gardens, and pleasant weather made it a refreshing escape.",
        category: "nature",
        coordinates: { lat: 11.4064, lng: 76.6932 } // Ooty coordinates
    },
    {
        id: "bangalore-mysore-2022",
        location: "Bangalore & Mysore",
        country: "India",
        visited: true,
        visitDate: "2022-01",
        duration: "5 days",
        highlights: [
            "Tech hub exploration and startup culture",
            "Magnificent Mysore Palace illumination",
            "Traditional sandalwood products in Mysore",
            "Bangalore's pub culture and nightlife",
            "Chamundi Hills and temple visits",
            "Modern city life meets royal heritage"
        ],
        rating: 4,
        memories: "Great contrast between modern Bangalore and royal Mysore! The palace lights, tech culture, and South Indian hospitality made it a well-rounded trip.",
        category: "cultural",
        coordinates: { lat: 12.9716, lng: 77.5946 } // Bangalore coordinates
    },
    {
        id: "ujjain-2023",
        location: "Ujjain",
        country: "India",
        visited: true,
        visitDate: "2023-02",
        duration: "2 days",
        highlights: [
            "Sacred Mahakaleshwar Jyotirlinga temple",
            "Shipra river ghats and spiritual atmosphere",
            "Ancient astronomical observatory",
            "Traditional Hindu rituals and ceremonies",
            "Local street food and religious offerings",
            "Rich Vedic history and spirituality"
        ],
        rating: 4,
        memories: "Powerful spiritual energy! The ancient temple, religious fervor, and connection to Hindu mythology created a deeply meaningful experience.",
        category: "cultural",
        coordinates: { lat: 23.1765, lng: 75.7885 }
    },
    {
        id: "spiti-valley-2023",
        location: "Spiti Valley",
        country: "India",
        visited: true,
        visitDate: "2023-06",
        duration: "8 days",
        highlights: [
            "Moon-like landscapes and high altitude desert",
            "Ancient monasteries - Key, Tabo, Dhankar",
            "Highest post office in the world at Hikkim",
            "Fossil hunting in Langza village",
            "Camping under star-filled skies",
            "Buddhist culture and Tibetan influence",
            "Challenging mountain roads and adventure",
            "Pin Valley National Park wildlife"
        ],
        rating: 5,
        memories: "Absolutely life-changing! Spiti's surreal landscapes, spiritual monasteries, and extreme conditions pushed my limits. The raw beauty and Buddhist culture were transformative.",
        category: "adventure",
        coordinates: { lat: 32.287042, lng: 77.999249 }
    },
    {
        id: "shimla-2022",
        location: "Shimla",
        country: "India",
        visited: true,
        visitDate: "2022-05",
        duration: "3 days",
        highlights: [
            "Colonial architecture and British heritage",
            "Mall Road shopping and Ridge walks",
            "Toy train from Kalka to Shimla",
            "Viceregal Lodge and its history",
            "Christ Church and Gothic architecture",
            "Pleasant hill station climate"
        ],
        rating: 4,
        memories: "Classic hill station charm! The colonial architecture, pleasant weather, and nostalgic toy train ride made it a delightful weekend getaway.",
        category: "historical",
        coordinates: { lat: 31.1048, lng: 77.1734 }
    },
    {
        id: "nashik-2023",
        location: "Nashik",
        country: "India",
        visited: true,
        visitDate: "2023-09",
        duration: "3 days",
        highlights: [
            "Sula Vineyards wine tasting experience",
            "Sacred Trimbakeshwar Jyotirlinga temple",
            "Godavari river ghats and spiritual significance",
            "Ancient Pandav Leni caves exploration",
            "Traditional Maharashtrian cuisine",
            "Wine country tours and grape harvesting"
        ],
        rating: 4,
        memories: "Perfect blend of spirituality and modern experiences! The wine tasting, ancient temples, and beautiful vineyards created a unique combination of old and new.",
        category: "cultural",
        coordinates: { lat: 19.9975, lng: 73.7898 }
    },

    // =============================
    // DREAM DESTINATIONS 🌟
    // =============================
    {
        id: "dubai-future",
        location: "Dubai",
        country: "UAE",
        visited: false,
        highlights: [
            "Burj Khalifa - world's tallest building",
            "Luxury shopping in Dubai Mall and Gold Souk",
            "Desert safari with camel riding",
            "Dubai Fountain show and Marina walks",
            "Modern architecture meets Arabian culture",
            "World-class dining and nightlife",
            "Palm Jumeirah and Atlantis resort",
            "Burj Al Arab iconic sail-shaped hotel"
        ],
        rating: 0,
        memories: "",
        category: "city",
        coordinates: { lat: 25.2048, lng: 55.2708 }
    },
    {
        id: "paris-future",
        location: "Paris",
        country: "France",
        visited: false,
        highlights: [
            "Eiffel Tower and romantic Seine river",
            "Louvre Museum and world-class art",
            "Notre-Dame Cathedral and Gothic architecture",
            "Champs-Élysées shopping and cafes",
            "Montmartre and Sacré-Cœur Basilica",
            "French cuisine and wine culture",
            "Palace of Versailles day trip",
            "Romantic walks along cobblestone streets"
        ],
        rating: 0,
        memories: "",
        category: "cultural",
        coordinates: { lat: 48.8566, lng: 2.3522 }
    },
    {
        id: "meghalaya-future",
        location: "Meghalaya",
        country: "India",
        visited: false,
        highlights: [
            "Living root bridges in Cherrapunji",
            "Cleanest village in Asia - Mawlynnong",
            "Crystal clear Umngot river in Dawki",
            "Wettest place on earth - unique ecosystem",
            "Double-decker living root bridge trek",
            "Khasi and Jaintia tribal culture",
            "Limestone caves and waterfalls",
            "Scotland of the East landscapes"
        ],
        rating: 0,
        memories: "",
        category: "nature",
        coordinates: { lat: 25.4670, lng: 91.3662 }
    },
    {
        id: "ladakh-future",
        location: "Ladakh",
        country: "India",
        visited: false,
        highlights: [
            "World's highest motorable roads",
            "Pangong Tso and Tso Moriri pristine lakes",
            "Buddhist monasteries - Hemis, Thiksey, Diskit",
            "Nubra Valley sand dunes and double-humped camels",
            "Magnetic Hill and gravity-defying phenomena",
            "High altitude desert and barren mountains",
            "Adventure biking on Khardung La Pass",
            "Tibetan Buddhist culture and traditions"
        ],
        rating: 0,
        memories: "",
        category: "adventure",
        coordinates: { lat: 34.1526, lng: 77.5770 }
    },
    {
        id: "arunachal-pradesh-future",
        location: "Arunachal Pradesh",
        country: "India",
        visited: false,
        highlights: [
            "Land of dawn-lit mountains",
            "Pristine forests and biodiversity hotspot",
            "Tawang Monastery - largest in India",
            "Tribal cultures and traditional festivals",
            "Ziro Valley and Apatani tribe",
            "Bumla Pass near China border",
            "Sangti Valley and black-necked cranes",
            "Unexplored wilderness and adventure"
        ],
        rating: 0,
        memories: "",
        category: "adventure",
        coordinates: { lat: 28.2180, lng: 94.7278 }
    },
    {
        id: "goa-future",
        location: "Goa",
        country: "India",
        visited: false,
        highlights: [
            "Beautiful beaches - Baga, Calangute, Anjuna",
            "Portuguese heritage and colonial architecture",
            "Vibrant nightlife and beach parties",
            "Water sports and marine adventures",
            "Delicious seafood and Goan cuisine",
            "Historic churches and temples",
            "Spice plantations and cashew farms",
            "Relaxed coastal lifestyle and festivities"
        ],
        rating: 0,
        memories: "",
        category: "nature",
        coordinates: { lat: 15.2993, lng: 74.1240 }
    }
]

// Helper functions for personal data access
export const getCompletedBucketList = () => {
    return bucketList.filter(item => item.completed)
}

export const getPendingBucketList = () => {
    return bucketList.filter(item => !item.completed)
}

export const getVisitedPlaces = () => {
    return travelExperiences.filter(place => place.visited)
}

export const getDreamDestinations = () => {
    return travelExperiences.filter(place => !place.visited)
}

export const getTotalTravelStats = () => {
    const visited = getVisitedPlaces().length
    const planned = getDreamDestinations().length
    const countries = [...new Set(travelExperiences.map(t => t.country))].length

    return {
        placesVisited: visited,
        plannedDestinations: planned,
        countriesExplored: countries,
        totalTravelGoals: travelExperiences.length
    }
}

export const getBucketListStats = () => {
    const completed = getCompletedBucketList().length
    const pending = getPendingBucketList().length
    const completionRate = Math.round((completed / bucketList.length) * 100)

    return {
        completed,
        pending,
        total: bucketList.length,
        completionRate
    }
}