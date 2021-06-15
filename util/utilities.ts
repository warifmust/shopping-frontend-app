export const APPLE =
  "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80F";
export const MANGO =
  "https://images.unsplash.com/photo-1553279768-865429fa0078?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80";
export const BANANA =
  "https://images.unsplash.com/photo-1481349518771-20055b2a7b24?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1109&q=80";
export const LEMON =
  "https://images.unsplash.com/photo-1594304466740-01a51b280fd3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80";
export const STRAWBERRY =
  "https://images.unsplash.com/photo-1583070161414-7314e034d18b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80";
export const GRAPE =
  "https://images.unsplash.com/photo-1565098772267-60af42b81ef2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1084&q=80";
export const KIWI =
  "https://images.unsplash.com/photo-1552801386-22419317d4d3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80";
export const WATERMELON =
  "https://images.unsplash.com/photo-1587049352846-4a222e784d38?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";

export const products = [
  {
    id: 0,
    img: APPLE,
    price: "1.00",
    name: "Apple",
    nutrient: "Lorem ipsum dolor emet.",
  },
  {
    id: 1,
    img: MANGO,
    price: "5.00",
    name: "Mango",
    nutrient: "Lorem ipsum dolor emet.",
  },
  {
    id: 2,
    img: BANANA,
    price: "2.50",
    name: "Banana",
    nutrient: "Lorem ipsum dolor emet.",
  },
  {
    id: 3,
    img: LEMON,
    price: "1.50",
    name: "Lemon",
    nutrient: "Lorem ipsum dolor emet.",
  },
  {
    id: 4,
    img: STRAWBERRY,
    price: "1.00",
    name: "Strawberry",
    nutrient: "Lorem ipsum dolor emet.",
  },
  {
    id: 5,
    img: GRAPE,
    price: "13.00",
    name: "Grape",
    nutrient: "Lorem ipsum dolor emet.",
  },
  {
    id: 6,
    img: KIWI,
    price: "10.00",
    name: "Kiwi",
    nutrient: "Lorem ipsum dolor emet.",
  },
  {
    id: 7,
    img: WATERMELON,
    price: "7.50",
    name: "Watermelon",
    nutrient: "Lorem ipsum dolor emet.",
  },
];

export const formatTwoDecimal = (text: string) => {
  const parsed = parseInt(text);
  const price = (Math.round(parsed * 100) / 100).toFixed(2);
  return price;
};

export const capitalize = (text: string) => {
  return text[0].toUpperCase() + text.slice(1).toLowerCase();
};
