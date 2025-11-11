// app/_layout.tsx
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import LoadingScreen from '../components/LoadingScreen';
import { AuthProvider, useAuth } from '../contexts/AuthContext';

// Componente wrapper para manejar el estado de carga
function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
          <StatusBar style="auto" />
          <AuthWrapper>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="index" />
              <Stack.Screen name="login" />
              <Stack.Screen name="register" />
              <Stack.Screen name="home" />
              <Stack.Screen name="wardrobe" />
              <Stack.Screen name="outfits" />
              <Stack.Screen name="profile" />
              <Stack.Screen name="edit-profile" />
              <Stack.Screen name="create-outfit" />
            </Stack>
          </AuthWrapper>
        </SafeAreaView>
      </SafeAreaProvider>
    </AuthProvider>
  );
}