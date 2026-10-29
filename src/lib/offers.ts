import { dishes } from "./menu";

export type Combo = {
  id: string;
  name: string;
  items: string;
  note: string;
  price: number;
  was: number;
  dishIds: string[];
};

const ids = (list: string[]) => list;

export const combos: Combo[] = [
  {
    id: "grill-meal",
    name: "وجبة المنقل",
    items: "برجر اللحمة المزدوج + بطاطس بالروزماري + ليموناضة",
    note: "الأكثر طلبًا",
    price: 265,
    was: 295,
    dishIds: ids(["d01", "d13", "d17"]),
  },
  {
    id: "steam-table",
    name: "سفرة البخار",
    items: "دامبلنغ لحم + رامن خضار + حمص",
    note: "بتكفي اتنين",
    price: 345,
    was: 365,
    dishIds: ids(["d07", "d08", "d12"]),
  },
  {
    id: "oven-night",
    name: "ليلة الكوشة",
    items: "بيتزا مارغريتا + فوكاتشيا + سلطة طماطم",
    note: "نباتي",
    price: 315,
    was: 340,
    dishIds: ids(["d09", "d11", "d14"]),
  },
];

export const comboDishes = (combo: Combo) =>
  combo.dishIds
    .map((id) => dishes.find((d) => d.id === id))
    .filter((d): d is NonNullable<typeof d> => Boolean(d));
