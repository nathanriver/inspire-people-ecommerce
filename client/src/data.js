import cover1 from "./assets/images/covers/cover-1.jpg";
import cover2 from "./assets/images/covers/cover-2.jpg";
import tshirt1 from "./assets/images/products/tshirt-1.png";
import tshirt2 from "./assets/images/products/tshirt-2.png";
import tshirt3 from "./assets/images/products/tshirt-3.png";
import tshirt4 from "./assets/images/products/tshirt-4.png";
import tshirt5 from "./assets/images/products/tshirt-5.png";

export const coverList = [cover1, cover2];

export const productList = [
  {
    name: "Beautiful World",
    price: "99000",
    image: tshirt1,
    slug: "tshirt1",
  },
  {
    name: "Inspire People",
    price: "99000",
    image: tshirt2,
    slug: "tshirt2",
  },
  {
    name: "Good Culture",
    price: "99000",
    image: tshirt3,
    slug: "tshirt3",
  },
  {
    name: "Survivor",
    price: "109000",
    image: tshirt4,
    slug: "tshirt4",
  },
  {
    name: "Live",
    price: "99000",
    image: tshirt5,
    slug: "tshit5",
  },
];

export const cartItems = [
  {
    name: "Beautiful World",
    price: 99000,
    image: tshirt1,
    slug: "tshirt1",
    quantity: 1,
  },
  {
    name: "Good Culture",
    price: 99000,
    image: tshirt3,
    slug: "tshirt3",
    quantity: 2,
  },
  {
    name: "Survivor",
    price: 109000,
    image: tshirt4,
    slug: "tshirt4",
    quantity: 1,
  },
];

export const orderList = [
  {
    id: "0HF2FWF7KS2SZN",
    status: "Completed",
    orderDate: "06 November 2021",
    total: 99000,
    items: [
      {
        name: "Beautiful World",
        price: "99000",
        image: tshirt1,
        slug: "tshirt1",
        quantity: 1,
        size: "M",
      },
    ],
  },
  {
    id: "8G3PNT9F75E4G0",
    status: "Completed",
    orderDate: "05 October 2021",
    total: 208000,
    items: [
      {
        name: "Good Culture",
        price: "99000",
        image: tshirt3,
        slug: "tshirt3",
        quantity: 1,
        size: "M",
      },
      {
        name: "Survivor",
        price: "109000",
        image: tshirt4,
        slug: "tshirt4",
        quantity: 1,
        size: "M",
      },
    ],
  },
];

export const addressList = [
  {
    label: "Exercitationem volup",
    recipient: "Veroeum",
    phoneNumber: "+6286664206969",
    fullAddress: "Laudantium, Magnam, Dignissimos 6666",
    isDefault: false,
  },
  {
    label: "Ationexercitem",
    recipient: "Elit",
    phoneNumber: "+6286664206970",
    fullAddress: "Lacus, Enim, Venenatis 7777",
    isDefault: false,
  },
  {
    label: "Xerationcitationem",
    recipient: "Ducimus",
    phoneNumber: "+6286664206971",
    fullAddress: "Porttitor, Proin, Vulputate 8888",
    isDefault: true,
  },
];

export const paymentMethods = [
  {
    id: 1,
    name: "Credit Card",
  },
  {
    id: 2,
    name: "BCA Virtual Account",
  },
  {
    id: 3,
    name: "GoPay",
  },
];
