import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/use-color-scheme';
import {QueryClientProvider,QueryClient} from "@tanstack/react-query";
import {AuthProvider} from "@/context/AuthContext";
import { useEffect } from "react";

import * as Notifications from "expo-notifications";
import {initDB} from "@/db/sqlite";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});


const queryClient = new QueryClient();
export default function RootLayout() {
  const colorScheme = useColorScheme();
  useEffect(() => {
    const setup = async () => {
      await initDB();
    };

    setup();
  }, []);
  return (
      <AuthProvider>
      <QueryClientProvider client={queryClient}>
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
      </QueryClientProvider>
        </AuthProvider>
  );
}
