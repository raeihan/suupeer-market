import { create } from "zustand";
import { supabase } from "../SupaClient";

export const useBasket = create((set, get) => ({
  basket: [],
  fetchBasket: async () => {
    const { data, error } = await supabase
      .from("basket")
      .select("*, product(image)");
    if (!error) set({ basket: data });
  },
  addToBasket: async (item) => {
    const { basket } = get();
    const existingItem = basket.find((i) => i.id_product === item.id_product);

    if (existingItem) {
      const updateItem = {
        ...existingItem,
        count: existingItem.count + 1,
        price: existingItem.price + item.price,
      };
      const { data, error } = await supabase
        .from("basket")
        .update({
          count: updateItem.count,
          price: updateItem.price,
        })
        .eq("id", existingItem.id)
        .select();

      if (!error && data) {
        set((state) => ({
          basket: state.basket.map((basketItem) =>
            basketItem.id === existingItem.id ? { ...basketItem, ...data[0] } : basketItem
          ),
        }));
        alert("Item successfully added to basket!");
      }
    } else {
      const newItem = {
        ...item,
        count: 1,
        price: item.price,
      };
      const { data, error } = await supabase.from("basket").insert([newItem]).select();

      if (!error && data) {
        set((state) => ({ basket: [...state.basket, data[0]] }));
        alert("Item successfully added to basket!");
      }
    }
  },
  updateItemCount: async (idProduct, newCount) => {
    if (newCount <= 0) {
      await supabase.from("basket").delete().eq("id_product", idProduct);
      set((state) => ({
        basket: state.basket.filter((item) => item.id_product !== idProduct),
      }));
      return;
    }

    const { basket } = get();
    const item = basket.find((i) => i.id_product === idProduct);
    if (!item) return;

    const newPrice = (item.price / item.count) * newCount;

    const { data, error } = await supabase
      .from("basket")
      .update({ count: newCount, price: newPrice })
      .eq("id_product", idProduct)
      .select();

    if (!error && data) {
      set((state) => ({
        basket: state.basket.map((i) =>
          i.id_product === idProduct ? { ...i, count: newCount, price: newPrice } : i
        ),
      }));
    }
  },
}));
