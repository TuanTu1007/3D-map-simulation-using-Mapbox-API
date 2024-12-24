import { supabase } from "./CreateUser.js";

const createAdmin = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: "21522747@gm.uit.edu.vn",
      password: "21522747",
      options: {
        data: {
          role: "admin", // Đánh dấu tài khoản này là Admin
        },
      },
    });
  
    if (error) {
      console.error("Error creating admin:", error.message);
    } else {
      console.log("Admin account created:", data);
    }
  };
  
  createAdmin();