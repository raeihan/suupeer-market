import { create } from "zustand";
import { supabase } from "../SupaClient";

export const useBasket = create((set, get) => ({
  basket: [],
  fetchBasket: async (id) => {
    const { data, error } = await supabase
      .from("basket")
      .select("*, product(image)")
      .eq("id_user", id);
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
            basketItem.id === existingItem.id
              ? { ...basketItem, ...data[0] }
              : basketItem
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
      const { data, error } = await supabase
        .from("basket")
        .insert([newItem])
        .select();

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
          i.id_product === idProduct
            ? { ...i, count: newCount, price: newPrice }
            : i
        ),
      }));
    }
  },
  checkPaymentStatus: async (orderId) => {
    const res = await fetch(
      `http://localhost:5000/api/payment/status/${orderId}`
    );
    const data = await res.json();

    if (data.status_code === "200") {
      alert(`Payment Status: ${data.transaction_status}`);
    } else {
      alert("Failed to fetch payment status");
    }
  },

  handlePayment: async () => {
    const orderId = `Order-${Date.now()}`;
    const totalAmount = get().basket.reduce(
      (total, item) => total + item.price,
      0
    );

    const items = get().basket.map((item) => ({
      id: item.id_product,
      price: item.price / item.count,
      quantity: item.count,
      name: item.product_name,
    }));

    const fetchCustomerData = async (userId) => {
      const { data, error } = await supabase
        .from("profiles")
        .select("full_name, email")
        .eq("id", userId)
        .single();
      
      if (error) {
        console.error("Error fetching customer data:", error);
        return null;
      }
      return data;
    };
    
    const customer = async () => {
      const userId = get().basket[0].id_user;
      const customerData = await fetchCustomerData(userId);
      
      return customerData ? {
        id: userId,
        name: customerData.full_name,
        email: customerData.email,
        phone: customerData.phone,
      } : null;
    };
    

    const res = await fetch("https://midtrans-lyart.vercel.app/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      body: JSON.stringify({
        order_id: orderId,
        gross_amount: totalAmount,
        customer_details: customer,
        item_details: items,
      }),
    });
    
    if (!res.ok) {
      console.error("Server error:", res.status, res.statusText);
      return;
    }
    
    const text = await res.text(); // Ambil response sebagai teks terlebih dahulu
    console.log("Raw response:", text);
    
    try {
      const { token } = JSON.parse(text);
      console.log("Token received:", token);
    } catch (error) {
      console.error("JSON parsing error:", error);
    }
    

    const { token } = await res.json();

    if (window.snap) {
      window.snap.pay(token, {
        onSuccess: async function () {
          alert("Payment success");

          const { data, error } = await supabase
            .from("history_payment")
            .insert([
              {
                user_id: customer.id,
                order_id: orderId,
                gross_amount: totalAmount,
                item_details: JSON.stringify(items),
              },
            ]);

          if (error) {
            console.log(error);
          } else {
            console.log(data);
          }
        },
      });
    }
  },
}));