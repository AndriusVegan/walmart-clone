import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { Product } from "./typings/productTypings";
// import type {} from '@redux-devtools/extension' // required for devtools typing

interface CartState {
  cart: Product[];
  //   from Product Typings
  addToCart: (product: Product) => void;
  removeFromCart: (product: Product) => void;
}

export const useCartStore = create<CartState>()(
  devtools(
    persist(
      (set, get) => ({
        cart: [],
        addToCart: (product) => {
          set((state) => ({
            cart: [...state.cart, product],
          }));
        },
        removeFromCart: (product) => {
          const productToRemove = get().cart.findIndex(
            (p) => p.meta.sku === product.meta.sku
            // sku is ID of the item
          );

          set((state) => {
            const newCart = [...state.cart];
            // copies the old cart object modefies it and then created a new one(updated)
            newCart.splice(productToRemove, 1);
            return { cart: newCart };
          });
        },
      }),
      {
        name: "shopping-cart-storage",
      }
    )
  )
);
