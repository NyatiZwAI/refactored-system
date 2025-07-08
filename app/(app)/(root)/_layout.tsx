//Auth protected wrapper - redirects to login if not authenticated

import { Stack, Redirect } from "expo-router";
import { useAuth } from "@/auth/AuthContext";

export default function RootProtectedLayout() {
  const { user } = useAuth();
  if (!user) return <Redirect href="/(app)/sign-in" />;
  return (
    <Stack screenOptions={{ headerShown: false }} />
  );
}
