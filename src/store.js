import { configureStore, createSlice } from '@reduxjs/toolkit';

// Get saved data from localStorage
const savedCart = localStorage.getItem("cart");
const localStorageCart = savedCart ? JSON.parse(savedCart) : [];

const savedUser = localStorage.getItem("user");
const localStorageUser = savedUser ? JSON.parse(savedUser) : null;

// Products Slice
const productsSlice = createSlice({
  name: 'products',
  initialState: {
    veg: [
      { name: 'Tomato', price: 1.5, image: '/images/tomato.jpg' },
      { name: 'Bottle Gourd', price: 10.89, image: '/images/bottle gourd.jpg' },
      { name: 'Bitter Gourd', price: 300.5, image: '/images/bittergourd.jpg' },
      { name: 'Carrot', price: 250.5, image: '/images/carrot.jpg' },
      { name: 'Broccoli', price: 100.5, image: '/images/download.jpeg' },
      { name: 'Pumpkin', price: 150.58, image: '/images/pumpkin.jpg' },
      { name: 'Cabbage', price: 120.45, image: '/images/cabbage.jpg' },
      { name: 'Brinjal', price: 50.5, image: '/images/brinjal.jpg' },
      { name: 'Capsicum', price: 300.5, image: '/images/capsicum.jpg' },
      { name: 'Beetroot', price: 80.5, image: '/images/beetroot.jpg' },
      { name: 'Cauliflower', price: 30.5, image: '/images/cauliflower.jpg' },
      { name: 'Onions', price: 130.5, image: '/images/onions.jpg' },
      { name: 'Cluster Beans', price: 55.5, image: '/images/clusterbeans.jpg' },
      { name: 'Cucumber', price: 100.4, image: '/images/cucumber.jpg' },
      { name: 'Drumsticks', price: 220.5, image: '/images/drumsticks.jpg' },
      { name: 'Tindora', price: 150.5, image: '/images/tindora.jpg' },
      { name: 'Potato', price: 45.8, image: '/images/potato.jpg' },
      { name: 'String Beans', price: 33.5, image: '/images/stringbeans.jpg' },
      { name: 'Garlic', price: 150.5, image: '/images/garlic.jpg' },
      { name: 'Ladies Finger', price: 70.5, image: '/images/ladiesfinger.jpg' },
    ],
    nonveg: [
      { name: 'Chicken', price: 150.0, image: '/images/chicken.jpg' },
      { name: 'Fish', price: 100.0, image: '/images/fish.jpg' },
      { name: 'Quail', price: 280.0, image: '/images/quail.jpg' },
      { name: 'Lamb', price: 180.0, image: '/images/lamb.jpg' },
      { name: 'Turkey', price: 250.0, image: '/images/Turkey.jpg' },
      { name: 'Pork', price: 200.0, image: '/images/pork.jpg' },
      { name: 'Beef', price: 600.0, image: '/images/Beef.jpg' },
      { name: 'Shrimp', price: 500.0, image: '/images/shrimp.jpg' },

      
    ],
    chocolates: [
      { name: '5 Star', price: 150.0, image: '/images/5 star.jpg' },
      { name: 'Dairy Milk', price: 180.0, image: '/images/dairymilk.jpg' },
      { name: 'Ferrero Rocher', price: 170.0, image: '/images/ferreros.jpg' },
      { name: 'Fuse', price: 200.0, image: '/images/fuse.jpg' },
      { name: 'KitKat', price: 190.0, image: '/images/kitkat.jpg' },
      { name: 'Crispello', price: 160.0, image: '/images/crispello.jpg' },
      { name: 'Munch', price: 210.0, image: '/images/munch.jpg' },
      { name: 'Perk', price: 250.0, image: '/images/perk.jpg' },
      { name: 'London', price: 500.0, image: '/images/london.jpg' },
      { name: 'Gems', price: 50.0, image: '/images/gems.jpg' },
      { name: 'Flake', price: 50.0, image: '/images/flake.jpg' },
      { name: 'Boost', price: 50.0, image: '/images/boost.jpg' },
    ],
    fruits: [
      { name: 'Apple', price: 150.0, image: '/images/apple.jpg' },
      { name: 'Banana', price: 60.0, image: '/images/banana.jpg' },
      { name: 'Cherry', price: 200.0, image: '/images/cherry.jpg' },
      { name: 'Orange', price: 100.0, image: '/images/orange.jpg' },
      { name: 'Grapes', price: 180.0, image: '/images/grapes.jpg' },
      { name: 'Mango', price: 250.0, image: '/images/mango.jpg' },
      { name: 'Strawberry', price: 300.0, image: '/images/strawberry.jpg' },
      { name: 'Watermelon', price: 180.0, image: '/images/watermelon.jpg' },
      { name: 'Custard Apple', price: 280.0, image: '/images/custerd.jpg' },
      { name: 'Kiwi', price: 180.0, image: '/images/kiwi.jpg' },
      { name: 'Coconut', price: 90.0, image: '/images/coconut.jpg' },
      { name: 'Dragon Fruit', price: 80.0, image: '/images/dragonfruit.jpg' },
      { name: 'Pineapple', price: 40.0, image: '/images/pineapple.jpg' },
      { name: 'Pomegranate', price: 380.0, image: '/images/pomagranet.jpg' },
      { name: 'Guava', price: 35.0, image: '/images/guvava.jpg' },
      { name: 'Neredu Pallu', price: 130.0, image: '/images/neredupallu.jpg' },
      { name: 'Plum', price: 80.0, image: '/images/plum.jpg' },
      { name: 'Jackfruit', price: 280.0, image: '/images/jackfruit.jpg' },
      { name: 'Pear', price: 190.0, image: '/images/pear.jpg' },
      { name: 'Sapota', price: 50.0, image: '/images/sapota.jpg' },
    ],
  },
  reducers: {},
});

// Cart Slice
const cartSlice = createSlice({
  name: 'cart',
  initialState: localStorageCart,
  reducers: {
    Addtocart: (state, action) => {
      const item = state.find(i => i.name === action.payload.name);
      if (item) {
        item.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.find(i => i.name === action.payload);
      if (item) item.quantity += 1;
    },
    decrementQuantity: (state, action) => {
      const item = state.find(i => i.name === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        return state.filter(i => i.name !== action.payload);
      }
    },
    removeItem: (state, action) => state.filter(i => i.name !== action.payload),
    clearcart: () => [],
  },
});

// Orders Slice
const orderSlice = createSlice({
  name: 'orders',
  initialState: [],
  reducers: {
    addOrder: (state, action) => {
      state.push(action.payload);
    },
  },
});

// User Slice
const userSlice = createSlice({
  name: 'user',
  initialState: localStorageUser,
  reducers: {
    loginUser: (state, action) => action.payload,
    logoutUser: () => null,
  },
});

// Configure store
const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
    cart: cartSlice.reducer,
    orders: orderSlice.reducer,
    user: userSlice.reducer,
  },
});

// Save cart and user to localStorage
store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem("cart", JSON.stringify(state.cart));
  localStorage.setItem("user", JSON.stringify(state.user));
});

// Export actions
export const {
  Addtocart,
  incrementQuantity,
  decrementQuantity,
  removeItem,
  clearcart,
} = cartSlice.actions;

export const { addOrder } = orderSlice.actions;
export const { loginUser, logoutUser } = userSlice.actions;

// Export store
export default store;
