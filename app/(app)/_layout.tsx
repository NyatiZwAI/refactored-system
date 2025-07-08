//Stack layout for public screens or modals

import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack 
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
