export interface ServiceItem {
  id: string;
  name: string;
  hindiName?: string;
  category: 'hair' | 'skin' | 'bridal' | 'nails' | 'spa' | 'lashes';
  categoryLabel: string;
  description: string;
  durationMinutes: number;
  price: number;
  originalPrice?: number;
  badge?: string;
  image: string;
  includes: string[];
}

export interface Stylist {
  id: string;
  name: string;
  role: string;
  experienceYears: number;
  rating: number;
  reviewsCount: number;
  specialty: string;
  image: string;
  bio: string;
  instagram: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  city: string;
  service: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  avatar: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  tag: string;
  image: string;
  beforeAfter?: boolean;
}

export interface AppointmentBooking {
  id: string;
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
  serviceId: string;
  serviceName: string;
  stylistId: string;
  stylistName: string;
  date: string;
  timeSlot: string;
  notes?: string;
  totalPrice: number;
  status: 'confirmed' | 'pending';
  bookingTime: string;
}

export const PARLOR_SERVICES: ServiceItem[] = [
  {
    id: 'srv-1',
    name: '24K Royal Gold & Diamond Facial',
    hindiName: '24K रॉयल गोल्ड & डायमंड फेशियल',
    category: 'skin',
    categoryLabel: 'Skin & Glow',
    description: 'Ultra-luxurious anti-aging treatment infused with genuine gold peptides and pure botanical collagen for an incandescent radiant glow.',
    durationMinutes: 75,
    price: 3499,
    originalPrice: 4500,
    badge: 'Signature Glow',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&auto=format&fit=crop&q=80',
    includes: ['Deep pore cleansing', 'Enzymatic exfoliation', '24K Gold serum infusion', 'Cryo-cooling massage', 'Collagen hydro-jelly mask']
  },
  {
    id: 'srv-2',
    name: 'Korean Hydra-Glass Skin Spa',
    hindiName: 'कोरियन हाइड्रा-ग्लास स्किन स्पा',
    category: 'skin',
    categoryLabel: 'Skin & Glow',
    description: 'High-tech 7-step hydro-dermabrasion treatment infusing peptides, hyaluronic acid, and LED light for flawless pore-free glass radiance.',
    durationMinutes: 60,
    price: 2999,
    originalPrice: 3800,
    badge: 'Trending',
    image: 'https://images.unsplash.com/photo-1512290900672-1f55a15320e1?w=800&auto=format&fit=crop&q=80',
    includes: ['Hydra-vacuum extraction', 'Salicylic & Glycolic peel', 'High-pressure oxygen dome', 'LED phototherapy', 'Ceramide lock']
  },
  {
    id: 'srv-3',
    name: 'Maharani Royal Bridal Makeover (HD Airbrush)',
    hindiName: 'महारानी रॉयल ब्राइडल मेकओवर (HD एयरब्रश)',
    category: 'bridal',
    categoryLabel: 'Bridal Couture',
    description: 'Bespoke celebrity-style wedding look featuring waterproof 18-hour HD airbrush foundation, 3D mink lashes, contouring, and royal bridal styling.',
    durationMinutes: 180,
    price: 14999,
    originalPrice: 18500,
    badge: 'Bride Favourite',
    image: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=800&auto=format&fit=crop&q=80',
    includes: ['Pre-bridal skin prep', 'Temptu HD airbrush base', 'Bridal jewelry & dupatta draping', 'Custom hairstyle & fresh flowers', 'Touch-up emergency kit']
  },
  {
    id: 'srv-4',
    name: 'Sangeet & Reception Glam Look',
    hindiName: 'संगीत & रिसेप्शन ग्लैमरस लुक',
    category: 'bridal',
    categoryLabel: 'Bridal Couture',
    description: 'Dramatic smoky or shimmery glitter eyes, luminous glass skin, modern textured waves or sleek Hollywood curls.',
    durationMinutes: 90,
    price: 5999,
    originalPrice: 7500,
    badge: 'Party Glam',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&auto=format&fit=crop&q=80',
    includes: ['High-definition makeup', 'Mink lash application', 'Designer hairstyle', 'Saree / lehenga draping']
  },
  {
    id: 'srv-5',
    name: 'Brazilian Nanoplastia & Keratin Smooth',
    hindiName: 'ब्राजीलियन नैनोप्लास्टिया & केराटिन स्मूथ',
    category: 'hair',
    categoryLabel: 'Hair Studio',
    description: 'Formaldehyde-free organic amino acid therapy that relaxes curls, eliminates 100% frizz, and restores liquid glass mirror shine.',
    durationMinutes: 150,
    price: 5499,
    originalPrice: 7000,
    badge: 'Zero Frizz',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop&q=80',
    includes: ['Clarifying wash', 'Nano-peptide infuser', 'Thermal seal technology', 'Deep nourishing caviar mask']
  },
  {
    id: 'srv-6',
    name: 'French Balayage & Olaplex Color Melt',
    hindiName: 'फ्रेंच बालायाज & ओलाप्लेक्स हेयर कलर',
    category: 'hair',
    categoryLabel: 'Hair Studio',
    description: 'Hand-painted dimensional caramel, honey, or hazelnut accents seamlessly blended with Olaplex bond repair.',
    durationMinutes: 140,
    price: 6499,
    originalPrice: 8500,
    badge: 'Bespoke Color',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80',
    includes: ['Custom shade consultation', 'Olaplex No.1 & No.2 treatment', 'Gloss toner', 'Signature blowout styling']
  },
  {
    id: 'srv-7',
    name: 'Russian Gel Nail Extensions & Ombre Chrome',
    hindiName: 'रशियन जेल नेल्स एक्सटेंशन & क्रोम',
    category: 'nails',
    categoryLabel: 'Nails & Art',
    description: 'Dry e-file Russian cuticle manicure with durable sculpted gel extensions, mirror chrome glazed donut dust, and Swarovski crystals.',
    durationMinutes: 75,
    price: 2499,
    originalPrice: 3200,
    badge: 'Chrome Shine',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&auto=format&fit=crop&q=80',
    includes: ['Russian e-file dry manicure', 'Sculpted gel extensions', 'Hand-painted nail art', 'Moisturizing cuticle elixir']
  },
  {
    id: 'srv-8',
    name: 'Rose & Milk Petal Luxury Pedicure',
    hindiName: 'गुलाब & दूध लक्ज़री पेडीक्योर',
    category: 'nails',
    categoryLabel: 'Nails & Art',
    description: 'Warm organic almond milk and fresh damask rose petals soak, volcanic pumice scrub, warm paraffin dip, and hot stone foot massage.',
    durationMinutes: 50,
    price: 1699,
    originalPrice: 2200,
    badge: 'Pampering',
    image: 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?w=800&auto=format&fit=crop&q=80',
    includes: ['Rosewater & milk bath', 'Himalayan pink salt scrub', 'Paraffin heel wrap', 'Hot stone reflexology massage']
  },
  {
    id: 'srv-9',
    name: 'Aroma Balinese Full Body Massage & Herbal Scrub',
    hindiName: 'अरोमा बालिनीज बॉडी मसाज & हर्बल स्क्रब',
    category: 'spa',
    categoryLabel: 'Body Spa',
    description: 'Calming holistic pressure-point therapy using warm botanical essential oils to melt muscular fatigue and deeply replenish the spirit.',
    durationMinutes: 75,
    price: 3299,
    originalPrice: 4200,
    badge: 'Deep Relaxation',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&auto=format&fit=crop&q=80',
    includes: ['Steam bath & warm shower', 'Custom essential oil blending', 'Full body rhythmic massage', 'Organic ubtan polish']
  },
  {
    id: 'srv-10',
    name: 'Russian Volume Lash Extensions & Brow Lamination',
    hindiName: 'वॉल्यूम लैश एक्सटेंशन & ब्रो लेमिनेशन',
    category: 'lashes',
    categoryLabel: 'Lash & Brow',
    description: 'Feather-light cashmere 3D/4D lashes paired with Korean keratin brow lift and organic botanical tint for waking up camera-ready.',
    durationMinutes: 70,
    price: 2799,
    originalPrice: 3500,
    badge: 'Camera Ready',
    image: 'https://images.unsplash.com/photo-1583001931096-959e9a1a6223?w=800&auto=format&fit=crop&q=80',
    includes: ['Eye shape mapping', 'Hypoallergenic adhesive', 'Keratin brow nourishing infuser', 'Spoolie care brush']
  }
];

export const STYLISTS: Stylist[] = [
  {
    id: 'stylist-1',
    name: 'Ananya Sharma',
    role: 'Celebrity Makeup Director & Bridal Lead',
    experienceYears: 12,
    rating: 4.98,
    reviewsCount: 420,
    specialty: 'Royal Bridal Makeovers & Airbrush Art',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
    bio: 'Trained in Paris & Mumbai, Ananya has styled 800+ brides and runway models with an unmistakable signature glowing skin finish.',
    instagram: '@ananya_makeups'
  },
  {
    id: 'stylist-2',
    name: 'Rohan Mehta',
    role: 'Creative Hair Sculptor & Color Specialist',
    experienceYears: 9,
    rating: 4.95,
    reviewsCount: 310,
    specialty: 'Balayage, Nanoplastia & Textured Bobs',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80',
    bio: 'Certified by Vidal Sassoon London, Rohan transforms everyday hair into runway silhouettes with master precision.',
    instagram: '@rohan_hairatelier'
  },
  {
    id: 'stylist-3',
    name: 'Pooja Varma',
    role: 'Senior Aesthetician & Skin Doctor',
    experienceYears: 10,
    rating: 4.97,
    reviewsCount: 380,
    specialty: 'Hydra Facials & Glass Skin Therapies',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80',
    bio: 'Pooja blends clinical dermatology expertise with holistic herbal luxury, giving each client tailored dermal treatments.',
    instagram: '@dr_poojaskin'
  },
  {
    id: 'stylist-4',
    name: 'Meera Kapoor',
    role: 'Russian Nail Artist & Lash Specialist',
    experienceYears: 7,
    rating: 4.92,
    reviewsCount: 240,
    specialty: 'Chrome Nails, Ombre & 3D Lash Fans',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&auto=format&fit=crop&q=80',
    bio: 'Known for micro-precision dry manicures and long-lasting sculpted extensions loved by fashion influencers.',
    instagram: '@meera_nailstudio'
  }
];

export const REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    author: 'Simran Khurana',
    city: 'Mumbai',
    service: 'Maharani Royal Bridal Makeover',
    rating: 5,
    date: '3 days ago',
    comment: 'I cannot thank Ananya and the Elysian team enough! My bridal makeup stayed completely fresh for 16 hours through teary pheras and humid reception. Everyone praised the glow!',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80'
  },
  {
    id: 'rev-2',
    author: 'Ayesha Patel',
    city: 'Ahmedabad',
    service: 'Korean Hydra-Glass Skin Spa',
    rating: 5,
    date: '1 week ago',
    comment: 'The glass skin facial here is unmatched. My stubborn blackheads vanished and my face literally looked like glowing porcelain. Loved the serene ambience and custom herbal tea too.',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80'
  },
  {
    id: 'rev-3',
    author: 'Radhika Desai',
    city: 'Bangalore',
    service: 'French Balayage & Olaplex',
    rating: 5,
    date: '2 weeks ago',
    comment: 'Rohan is a magician with hair color! He tailored the warm caramel tones to complement my olive undertones perfectly with zero damage. Hair feels softer than before.',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&auto=format&fit=crop&q=80'
  },
  {
    id: 'rev-4',
    author: 'Tanya Sengupta',
    city: 'Delhi',
    service: 'Russian Gel Nails & Chrome',
    rating: 5,
    date: 'Last month',
    comment: 'The glaze finish on my nails lasted over 4 weeks without any chipping! The parlor cleanliness, hygienic disposable kits, and gentle care are 10/10.',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=200&auto=format&fit=crop&q=80'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Heritage Royal Bride',
    category: 'Bridal Glam',
    tag: 'Temptu Airbrush HD',
    image: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'gal-2',
    title: 'Honey Melt Balayage',
    category: 'Hair Art',
    tag: 'Olaplex Dimensional',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'gal-3',
    title: 'Glazed Donut Chrome Nails',
    category: 'Nail Studio',
    tag: 'Russian Dry Manicure',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'gal-4',
    title: 'Porcelain Glass Skin Glow',
    category: 'Facial Spa',
    tag: '7-Step Hydra Derm',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'gal-5',
    title: 'Evening Sangeet Radiance',
    category: 'Bridal Glam',
    tag: 'Smoky Champagne Eye',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'gal-6',
    title: 'Rose Petal Foot Spa Retreat',
    category: 'Nail Studio',
    tag: 'Paraffin & Hot Stone',
    image: 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?w=800&auto=format&fit=crop&q=80'
  }
];
