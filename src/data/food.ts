import type { Area } from "@/lib/geo";

export type FoodSpot = {
  id: string;
  name: string;
  dish: string;
  price: number;
  area: Area;
  lat: number;
  lng: number;
  phone: string;
  hours: string;
};

export const FOOD_SPOTS: FoodSpot[] = [
  { id: "f1", name: "Mama Put Corner", dish: "Rice & Stew + Beef", price: 700, area: "Mararaba", lat: 9.0189, lng: 7.5928, phone: "08061230001", hours: "7am - 9pm" },
  { id: "f2", name: "Mallam Suya Spot", dish: "Beef Suya", price: 500, area: "Mararaba", lat: 9.0204, lng: 7.5912, phone: "08061230002", hours: "5pm - 1am" },
  { id: "f3", name: "Okpa Mama Chidi", dish: "Hot Okpa", price: 300, area: "Mararaba", lat: 9.0168, lng: 7.5951, phone: "08061230003", hours: "6am - 11am" },
  { id: "f4", name: "Junction Amala Joint", dish: "Amala + Ewedu + Gbegiri", price: 800, area: "Mararaba", lat: 9.0179, lng: 7.5899, phone: "08061230004", hours: "10am - 8pm" },
  { id: "f5", name: "Aunty Bose Akara", dish: "Akara & Pap", price: 400, area: "Masaka", lat: 8.9981, lng: 7.6376, phone: "08061230005", hours: "6am - 10am" },
  { id: "f6", name: "Masaka Fish Point", dish: "Point & Kill Catfish", price: 2500, area: "Masaka", lat: 9.0004, lng: 7.6412, phone: "08061230006", hours: "4pm - 12am" },
  { id: "f7", name: "Tuwo Palace", dish: "Tuwo Shinkafa + Miyan Kuka", price: 600, area: "Masaka", lat: 8.9963, lng: 7.6441, phone: "08061230007", hours: "11am - 9pm" },
  { id: "f8", name: "One Man Noodles Bukka", dish: "Indomie & Egg", price: 600, area: "One Man", lat: 9.0255, lng: 7.5776, phone: "08061230008", hours: "24 hours" },
  { id: "f9", name: "Kilishi Brother", dish: "Kilishi Pack", price: 1000, area: "One Man", lat: 9.0266, lng: 7.5797, phone: "08061230009", hours: "9am - 10pm" },
  { id: "f10", name: "Iya Basira Pounded Yam", dish: "Pounded Yam + Egusi", price: 900, area: "One Man", lat: 9.0243, lng: 7.5811, phone: "08061230010", hours: "11am - 7pm" },
  { id: "f11", name: "Ado Boli & Fish", dish: "Roasted Plantain + Fish", price: 500, area: "Ado", lat: 9.0092, lng: 7.6115, phone: "08061230011", hours: "3pm - 10pm" },
  { id: "f12", name: "Mama Ijeoma Abacha", dish: "African Salad (Abacha)", price: 700, area: "Ado", lat: 9.0078, lng: 7.6136, phone: "08061230012", hours: "12pm - 8pm" },
  { id: "f13", name: "Nyanya Shawarma King", dish: "Chicken Shawarma", price: 1500, area: "New Nyanya", lat: 9.0362, lng: 7.5677, phone: "08061230013", hours: "2pm - 2am" },
  { id: "f14", name: "Zobo & Kunu Hub", dish: "Chilled Zobo / Kunu", price: 200, area: "New Nyanya", lat: 9.0374, lng: 7.5695, phone: "08061230014", hours: "8am - 9pm" },
  { id: "f15", name: "Bridge Beans & Dodo", dish: "Ewa Agoyin + Dodo", price: 600, area: "New Nyanya", lat: 9.0349, lng: 7.5661, phone: "08061230015", hours: "7am - 4pm" },
];
