export const categories = [
  {
    id: 1,
    name: "Pizza",
    image:
      "https://imgs.search.brave.com/1Jh-MLS320E4HP0vd8aK7CpOu6uFfwvMIS4OKd0IRHw/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTQ1/OTcxNTc5OS9waG90/by9waXp6YS13aXRo/LWhhbS1hbmQtY2hl/ZXNlLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz1ncFJNVmZx/eTQ0YWc0VGtyb1Q4/V0VlclJvdGxmS2hl/WlF1NmtRa2RobnhR/PQ",
    items: [
      {
        id: 1,
        name: "Margherita",
        price: 10,
        image:
          "https://imgs.search.brave.com/kysKLldgT3ct78JyVMFSFa_9hrxpkZ1AwaTqCY1wU2s/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMwMS5ueXQuY29t/L2ltYWdlcy8yMDE0/LzA0LzA5L2Rpbmlu/Zy8wOUpQUElaWkEy/LzA5SlBQSVpaQTIt/YXJ0aWNsZUxhcmdl/LXYzLmpwZz93aWR0/aD0xMjgwJnF1YWxp/dHk9NzUmYXV0bz13/ZWJw",
        category: "Pizza",
      },
      {
        id: 2,
        name: "Pepperoni",
        price: 12,
        image:
          "https://imgs.search.brave.com/ier5FoGSKyblxZYHp4Xkwse532I5j8eSRE7lPB9eKYs/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTg0/OTI4NDMyL3Bob3Rv/L3BpenphLWZyb20t/dGhlLXRvcC1wZXBw/ZXJvbmktY2hlZXNl/LmpwZz9zPTYxMng2/MTImdz0wJms9MjAm/Yz13a0M0eXJaTGN2/SHFnLTlrUXRSYjF3/YW5fejE1ZWlPMVoy/OTdPRlN1eHBnPQ",
        category: "Pizza",
      },
      {
        id: 3,
        name: "Vegetarian",
        price: 11,
        image:
          "https://imgs.search.brave.com/NPv_En1glaHa3efP5NdggTjEwf9_o84Ro_OcbJ7ZZPc/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/cmV0ZXRlcHJhY3Rp/Y2Uucm8vd3AtY29u/dGVudC91cGxvYWRz/LzIwMTUvMDcvcGl6/emEtdmVnZXRhcmlh/bmEuanBn",
        category: "Pizza",
      },
      // {
      //   id: 4,
      //   name: "Margherita",
      //   price: 10,
      //   image:
      //     "https://imgs.search.brave.com/kysKLldgT3ct78JyVMFSFa_9hrxpkZ1AwaTqCY1wU2s/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMwMS5ueXQuY29t/L2ltYWdlcy8yMDE0/LzA0LzA5L2Rpbmlu/Zy8wOUpQUElaWkEy/LzA5SlBQSVpaQTIt/YXJ0aWNsZUxhcmdl/LXYzLmpwZz93aWR0/aD0xMjgwJnF1YWxp/dHk9NzUmYXV0bz13/ZWJw",
      //   category: "Pizza",
      // },
      // {
      //   id: 5,
      //   name: "Pepperoni",
      //   price: 12,
      //   image:
      //     "https://imgs.search.brave.com/ier5FoGSKyblxZYHp4Xkwse532I5j8eSRE7lPB9eKYs/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTg0/OTI4NDMyL3Bob3Rv/L3BpenphLWZyb20t/dGhlLXRvcC1wZXBw/ZXJvbmktY2hlZXNl/LmpwZz9zPTYxMng2/MTImdz0wJms9MjAm/Yz13a0M0eXJaTGN2/SHFnLTlrUXRSYjF3/YW5fejE1ZWlPMVoy/OTdPRlN1eHBnPQ",
      //   category: "Pizza",
      // },
      // {
      //   id: 6,
      //   name: "Vegetarian",
      //   price: 11,
      //   image:
      //     "https://imgs.search.brave.com/NPv_En1glaHa3efP5NdggTjEwf9_o84Ro_OcbJ7ZZPc/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/cmV0ZXRlcHJhY3Rp/Y2Uucm8vd3AtY29u/dGVudC91cGxvYWRz/LzIwMTUvMDcvcGl6/emEtdmVnZXRhcmlh/bmEuanBn",
      //   category: "Pizza",
      // },
    ],
  },
  {
    id: 2,
    name: "Hot Drinks",
    image:
      "https://imgs.search.brave.com/RrXuc-OKApJfAzzlbiCf-BhHOjcQ_OMGXXokUhQH7O4/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTI3/MTM4NjE2Ny9waG90/by9jb2ZmZWUuanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPTVn/V1NoQlMtbFNhX3lj/bTFfb2xjbTl3cmlj/N2RLWU5NTW04UTc4/MC1BNzQ9",
    items: [
      {
        id: 4,
        name: "Coffee",
        price: 3,
        image: "https://example.com/coffee.jpg",
        category: "Hot Drinks",
      },
      {
        id: 5,
        name: "Tea",
        price: 2,
        image: "https://example.com/tea.jpg",
        category: "Hot Drinks",
      },
      {
        id: 6,
        name: "Espresso",
        price: 4,
        image: "https://example.com/espresso.jpg",
        category: "Hot Drinks",
      },
    ],
  },
  // {
  //   id: 3,
  //   name: "Cold Drinks",
  //   image:
  //     "https://imgs.search.brave.com/__4Wg8tene27g7n4i2_a-x316ys8IZ1bIPIBMbJ9dNo/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9j/b2xkLWNvZmZlZS1k/cmlua18xNDQ2Mjct/MTgzODMuanBnP3Np/emU9NjI2JmV4dD1q/cGc",
  //   items: [
  //     {
  //       id: 7,
  //       name: "Coca-Cola",
  //       price: 2,
  //       image: "https://example.com/coca-cola.jpg",
  //     },
  //     {
  //       id: 8,
  //       name: "Sprite",
  //       price: 2,
  //       image: "https://example.com/sprite.jpg",
  //     },
  //     {
  //       id: 9,
  //       name: "Water",
  //       price: 1,
  //       image: "https://example.com/water.jpg",
  //     },
  //   ],
  // },
  // {
  //   id: 4,
  //   name: "Ice Cream",
  //   image:
  //     "https://imgs.search.brave.com/Zz1E6otZxIJJ08Mb1iq9d59fM68F7pCjy_aLlyPJUcU/rs:fit:500:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA1LzY0LzAyLzM0/LzM2MF9GXzU2NDAy/MzQ2NF9SYVpiOTVE/OHlGUHQyRG54YnNZ/TFFhUVE1QlNyVUlt/Ty5qcGc",
  //   items: [
  //     {
  //       id: 10,
  //       name: "Vanilla",
  //       price: 5,
  //       image: "https://example.com/vanilla.jpg",
  //     },
  //     {
  //       id: 11,
  //       name: "Chocolate",
  //       price: 5,
  //       image: "https://example.com/chocolate.jpg",
  //     },
  //     {
  //       id: 12,
  //       name: "Strawberry",
  //       price: 5,
  //       image: "https://example.com/strawberry.jpg",
  //     },
  //   ],
  // },
  // {
  //   id: 5,
  //   name: "Breakfast",
  //   image:
  //     "https://imgs.search.brave.com/7GNqtxiNeoKlI8onuT1exF5o5RiKJJSh8aR-ZOVBNq8/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTU3/NTU4NDIzL3Bob3Rv/L3BhbmNha2VzLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz16/Z3RKOWNOZ1dJY2pM/a1g2Q29NUW1BR2tl/R0FjT1BNTEdYbVpU/cjkzU0c0PQ",
  //   items: [
  //     {
  //       id: 4,
  //       name: "Coffee",
  //       price: 3,
  //       image: "https://example.com/coffee.jpg",
  //     },
  //     { id: 5, name: "Tea", price: 2, image: "https://example.com/tea.jpg" },
  //     {
  //       id: 6,
  //       name: "Espresso",
  //       price: 4,
  //       image: "https://example.com/espresso.jpg",
  //     },
  //   ],
  // },
  // {
  //   id: 6,
  //   name: "Brownie",
  //   image:
  //     "https://imgs.search.brave.com/1Jf1X3E-_tC3QVCurdsimgnhfpaik9_gwb0hY1QraPg/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzY1Lzg1/Lzk2LzY1ODU5NjUx/NGIyY2Q0ZDc5ZDk5/M2NkZDQ4ZWU5MDI5/LmpwZw",
  //   items: [
  //     {
  //       id: 7,
  //       name: "Coca-Cola",
  //       price: 2,
  //       image: "https://example.com/coca-cola.jpg",
  //     },
  //     {
  //       id: 8,
  //       name: "Sprite",
  //       price: 2,
  //       image: "https://example.com/sprite.jpg",
  //     },
  //     {
  //       id: 9,
  //       name: "Water",
  //       price: 1,
  //       image: "https://example.com/water.jpg",
  //     },
  //   ],
  // },
  // {
  //   id: 7,
  //   name: "Waffle",
  //   image:
  //     "https://imgs.search.brave.com/WW6kMLG-EwVNof_DZh52DsvgzCyoXWJzqkryUHeNGow/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by93YWZmbGUtd2l0/aC1jaG9jb2xhdGUt/aWNlLWNyZWFtXzEz/MzktNjA2MzUuanBn/P3NpemU9NjI2JmV4/dD1qcGc",
  //   items: [
  //     {
  //       id: 10,
  //       name: "Vanilla",
  //       price: 5,
  //       image: "https://example.com/vanilla.jpg",
  //     },
  //     {
  //       id: 11,
  //       name: "Chocolate",
  //       price: 5,
  //       image: "https://example.com/chocolate.jpg",
  //     },
  //     {
  //       id: 12,
  //       name: "Strawberry",
  //       price: 5,
  //       image: "https://example.com/strawberry.jpg",
  //     },
  //   ],
  // },
  // {
  //   id: 8,
  //   name: "Cake",
  //   image:
  //     "https://imgs.search.brave.com/40DfV_fLSL8u_gARMN0ZGDv9CXOD3BvknJ5uiks7LSw/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9mbG91/cnNob3AuY29tL2Nk/bi9zaG9wL3Byb2R1/Y3RzL1doYXR0aGVD/YWtlXzEuanBnP3Y9/MTY5NTQzODg2OCZ3/aWR0aD0xOTQ2",
  //   items: [
  //     {
  //       id: 4,
  //       name: "Coffee",
  //       price: 3,
  //       image: "https://example.com/coffee.jpg",
  //     },
  //     { id: 5, name: "Tea", price: 2, image: "https://example.com/tea.jpg" },
  //     {
  //       id: 6,
  //       name: "Espresso",
  //       price: 4,
  //       image: "https://example.com/espresso.jpg",
  //     },
  //   ],
  // },
];

export const tables = [
  { id: 1, name: "Table 1", status: "Vacant", orders: [] },
  { id: 2, name: "Table 2", status: "Vacant", orders: [] },
  { id: 3, name: "Table 3", status: "Vacant", orders: [] },
  { id: 4, name: "Table 4", status: "Vacant", orders: [] },
  { id: 5, name: "Table 5", status: "Vacant", orders: [] },
  { id: 6, name: "Table 6", status: "Vacant", orders: [] },
  { id: 7, name: "Table 7", status: "Vacant", orders: [] },
  { id: 8, name: "Table 8", status: "Vacant", orders: [] },
  { id: 9, name: "Table 9", status: "Vacant", orders: [] },
  { id: 10, name: "Table 10", status: "Vacant", orders: [] },
  { id: 11, name: "Table 11", status: "Vacant", orders: [] },
  { id: 12, name: "Table 12", status: "Vacant", orders: [] },
  { id: 13, name: "Table 13", status: "Vacant", orders: [] },
  { id: 14, name: "Table 14", status: "Vacant", orders: [] },
  { id: 15, name: "Table 15", status: "Vacant", orders: [] },
  { id: 16, name: "Table 16", status: "Vacant", orders: [] },
  { id: 17, name: "Table 17", status: "Vacant", orders: [] },
  { id: 18, name: "Table 18", status: "Vacant", orders: [] },
  { id: 19, name: "Table 19", status: "Vacant", orders: [] },
  { id: 20, name: "Table 20", status: "Vacant", orders: [] },
  { id: 21, name: "Table 21", status: "Vacant", orders: [] },
  { id: 22, name: "Table 22", status: "Vacant", orders: [] },
  { id: 23, name: "Table 23", status: "Vacant", orders: [] },
  // Add more tables as needed
];

// export const kitchenOrders = []; // Add this line to track orders sent to the kitchen
// export const baristaOrders = [];

export const initialKitchenOrders = [];
export const initialBaristaOrders = [];
