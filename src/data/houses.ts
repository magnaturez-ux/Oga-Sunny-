import type { Area } from "@/lib/geo";

export const HOUSE_TYPES = [
  "Self-Con",
  "Room & Parlour",
  "1 Bedroom",
  "2 Bedroom",
  "3 Bedroom",
  "Shop",
] as const;
export type HouseType = (typeof HOUSE_TYPES)[number];

export type House = {
  id: string;
  title: string;
  area: Area;
  type: HouseType;
  price: number;
  lat: number;
  lng: number;
  phone: string;
  landlord: string;
  description: string;
};

export const HOUSES: House[] = [
  { id: "OGS-MAR-1021", title: "Clean Self-Con by Mararaba Junction", area: "Mararaba", type: "Self-Con", price: 250000, lat: 9.0192, lng: 7.5921, phone: "08031234501", landlord: "Baba Musa", description: "Tiled floor, prepaid meter, borehole water. 2 mins walk to junction." },
  { id: "OGS-MAR-1022", title: "Room & Parlour off Gurku Road", area: "Mararaba", type: "Room & Parlour", price: 380000, lat: 9.0213, lng: 7.5968, phone: "08031234502", landlord: "Mrs Okafor", description: "Fenced compound, gate man, POP ceiling." },
  { id: "OGS-MAR-1023", title: "2 Bedroom Flat near Aso Pada", area: "Mararaba", type: "2 Bedroom", price: 650000, lat: 9.0161, lng: 7.5998, phone: "08031234503", landlord: "Alhaji Sani", description: "Spacious rooms, 2 toilets, parking space for 2 cars." },
  { id: "OGS-MAR-1024", title: "1 Bedroom behind Mararaba Market", area: "Mararaba", type: "1 Bedroom", price: 450000, lat: 9.0175, lng: 7.5889, phone: "08031234504", landlord: "Pastor James", description: "New building, wardrobe, kitchen cabinets." },
  { id: "OGS-MAR-1025", title: "Lock-up Shop on Express", area: "Mararaba", type: "Shop", price: 300000, lat: 9.0201, lng: 7.5905, phone: "08031234505", landlord: "Chief Eze", description: "Facing main road, heavy foot traffic." },
  { id: "OGS-MAR-1026", title: "Masaka Self-Con with Solar", area: "Masaka", type: "Self-Con", price: 200000, lat: 8.9975, lng: 7.6382, phone: "08031234506", landlord: "Mallam Idris", description: "Solar backup, quiet street, water dey always." },
  { id: "OGS-MAR-1027", title: "3 Bedroom Bungalow Masaka Estate", area: "Masaka", type: "3 Bedroom", price: 900000, lat: 9.0012, lng: 7.6431, phone: "08031234507", landlord: "Engr. Bello", description: "Big compound, BQ, all rooms ensuite." },
  { id: "OGS-MAR-1028", title: "Room & Parlour near Masaka Park", area: "Masaka", type: "Room & Parlour", price: 320000, lat: 8.9958, lng: 7.6355, phone: "08031234508", landlord: "Mama Ngozi", description: "Close to motor park, easy transport to town." },
  { id: "OGS-MAR-1029", title: "2 Bedroom Masaka Low Cost", area: "Masaka", type: "2 Bedroom", price: 550000, lat: 9.0034, lng: 7.6467, phone: "08031234509", landlord: "Mr Danjuma", description: "Newly painted, tiled, security light." },
  { id: "OGS-MAR-1030", title: "One Man Village Self-Con", area: "One Man", type: "Self-Con", price: 180000, lat: 9.0249, lng: 7.5772, phone: "08031234510", landlord: "Baba Yusuf", description: "Budget friendly, shared compound, clean toilet." },
  { id: "OGS-MAR-1031", title: "1 Bedroom One Man Close", area: "One Man", type: "1 Bedroom", price: 400000, lat: 9.0271, lng: 7.5803, phone: "08031234511", landlord: "Mrs Adebayo", description: "Interlocked compound, prepaid meter." },
  { id: "OGS-MAR-1032", title: "Shop beside One Man Mosque", area: "One Man", type: "Shop", price: 250000, lat: 9.0262, lng: 7.5759, phone: "08031234512", landlord: "Alhaji Garba", description: "Good for provisions or POS business." },
  { id: "OGS-MAR-1033", title: "Room & Parlour One Man Extension", area: "One Man", type: "Room & Parlour", price: 350000, lat: 9.0238, lng: 7.5819, phone: "08031234513", landlord: "Uncle Tunde", description: "Fresh building, first tenants." },
  { id: "OGS-MAR-1034", title: "Ado Self-Con Hilltop", area: "Ado", type: "Self-Con", price: 220000, lat: 9.0095, lng: 7.6108, phone: "08031234514", landlord: "Mrs Ibrahim", description: "Cool breeze, nice view, fenced." },
  { id: "OGS-MAR-1035", title: "2 Bedroom Ado Phase 1", area: "Ado", type: "2 Bedroom", price: 600000, lat: 9.0071, lng: 7.6143, phone: "08031234515", landlord: "Mr Chukwu", description: "Kitchen cabinets, water heater, parking." },
  { id: "OGS-MAR-1036", title: "3 Bedroom Duplex Ado", area: "Ado", type: "3 Bedroom", price: 1200000, lat: 9.0112, lng: 7.6165, phone: "08031234516", landlord: "Dr. Amina", description: "Duplex with balcony, gated estate." },
  { id: "OGS-MAR-1037", title: "New Nyanya Self-Con by Bridge", area: "New Nyanya", type: "Self-Con", price: 230000, lat: 9.0358, lng: 7.5671, phone: "08031234517", landlord: "Baba Ali", description: "Near pedestrian bridge, easy to Abuja." },
  { id: "OGS-MAR-1038", title: "1 Bedroom New Nyanya Main", area: "New Nyanya", type: "1 Bedroom", price: 420000, lat: 9.0381, lng: 7.5702, phone: "08031234518", landlord: "Mrs Eke", description: "Tiled, POP, prepaid meter, borehole." },
  { id: "OGS-MAR-1039", title: "Room & Parlour New Nyanya Phase 4", area: "New Nyanya", type: "Room & Parlour", price: 360000, lat: 9.0342, lng: 7.5654, phone: "08031234519", landlord: "Mr Oche", description: "Quiet area, good neighbours." },
  { id: "OGS-MAR-1040", title: "2 Bedroom New Nyanya Estate", area: "New Nyanya", type: "2 Bedroom", price: 700000, lat: 9.0395, lng: 7.5725, phone: "08031234520", landlord: "Hajiya Zainab", description: "Gated estate, 24hr security, CCTV." },
];
