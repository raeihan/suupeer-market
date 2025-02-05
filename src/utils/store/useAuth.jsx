import { create } from "zustand";
import { supabase } from "../SupaClient";

export const useAuth = create((set, get) => ({
  user: null,
  auth: false,
  full_name: "",
  username: "",
  avatar_url: "",
  email: "",
  loading: true,

  register: async (full_name, email, password) => {
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      console.error("Error: ", error.message);
    } else {
      try {
        const { error: profileRegister } = await supabase
          .from("profiles")
          .upsert([{ id: data.user.id, full_name, email }]);

        if (profileRegister) {
          console.error("Update Error: ", profileRegister.message);
        } else {
          set({
            user: data.user,
            auth: true,
            full_name,
            email,
            loading: false,
          });
          console.log("User Registered:", data.user);
        }
      } catch (error) {
        console.error("User Can't be Added:", error.message);
      }
    }
  },

  login: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Login Failed: ", error.message);
    } else {
      console.log("Login Success:", data.user);
      set({ user: data.user, auth: true });
      await get().fetchUserData(data.user.id);
    }
  },

  logout: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Logout Error:", error.message);
      return;
    }
    set({
      user: null,
      auth: false,
      full_name: "",
      username: "",
      avatar_url: "",
      email: "",
    });
    console.log("User Logged Out");
  },

  fetchUser: async () => {
    if (get().user) return; // Hindari fetch ulang jika user sudah ada
    set({ loading: true });

    const { data, error } = await supabase.auth.getUser();
    if (error) {
      console.error("Fetch user error: ", error.message);
      set({ loading: false });
      return;
    }

    const { user } = data;
    if (user) {
      console.log("User Found:", user);
      set({ user, auth: true });
      await get().fetchUserData(user.id);
    } else {
      console.warn("No User Found");
    }
    set({ loading: false });
  },

  fetchUserData: async (userId) => {
    try {
      console.log("Fetching user data for ID:", userId);
      const { data: userData, error } = await supabase
        .from("profiles")
        .select("full_name, email, username, avatar_url")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Fetch user data error: ", error.message);
        return;
      }

      if (userData) {
        console.log("User Data Fetched:", userData);
        set({
          full_name: userData.full_name,
          email: userData.email,
          username: userData.username,
          avatar_url: userData.avatar_url,
        });
      }
    } catch (error) {
      console.error("Unexpected error:", error.message);
    }
  },
  updateProfile: async (userId, full_name, email, username, avatar_url) => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ full_name, email, username, avatar_url })
        .eq("id", userId);

      if (error) {
        console.error("Update Error: ", error.message);
        return false;
      }
      set({ full_name, email, username, avatar_url });
      console.log("Profile Updated Successfully");
      return true;
    } catch (error) {
      console.error("Unexpected error:", error.message);
      return false;
    }
  },
}));
