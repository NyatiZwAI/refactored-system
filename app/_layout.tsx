//Wraps entire app in AuthProvider and enables routing

import { Slot } from "expo-router";
import { AuthProvider } from "@/auth/AuthContext";
import 'tailwindcss/tailwind.css';

export default function RootLayout() {
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
}
