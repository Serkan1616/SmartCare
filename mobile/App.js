import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
import { View, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Pages
import EntryScreen from './Pages/EntryScreen';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import ForgotPasswordPage from './Pages/ForgotPasswordPage';
import CreatePasswordPage from './Pages/CreatePasswordPage';
import HomePage from './Pages/HomePage';
import PredictionPage from './Pages/PredictionPage';
import ProfilePage from './Pages/ProfilePage';
import HealthProfilePage from './Pages/HealthProfilePage';
import HealthTrackingPage from './Pages/HealthTrackingPage';
import ProfileEditPage from './Pages/ProfileEditPage';
import SymptomsInputPage from './Pages/SymptomsInputPage';
import RetinaPredictionPage from './Pages/RetinaPredictionPage';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const handleLogout = async (navigation) => {
  Alert.alert(
    "Logout",
    "Are you sure you want to log out?",
    [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        onPress: async () => {
          try {
            console.log("Logging out...");
            await AsyncStorage.removeItem('userToken');
            const token = await AsyncStorage.getItem('userToken');
            console.log("Token after logout:", token);

            navigation.navigate('Login');
          } catch (error) {
            console.error("Logout error:", error);
          }
        },
      },
    ]
  );
};

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#4D55CC',
        tabBarInactiveTintColor: '#888',
        tabBarStyle: { backgroundColor: '#fff', height: 60, paddingBottom: 5 },
        headerStyle: { backgroundColor: '#211C84' },
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        headerTitleStyle: { fontWeight: 'bold', fontSize: 22 },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={{
          tabBarIcon: ({ color }) => <Icon name="home" type="font-awesome" color={color} />,
          headerShown: false   // 🔥 Üstteki "Home" başlığını kaldırır
        }}
      />

      <Tab.Screen
        name="Health Tracking"
        component={HealthTrackingPage}
        options={{
          tabBarIcon: ({ color }) => <Icon name="heartbeat" type="font-awesome" color={color} />,
          headerShown: false
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfilePage}
        options={{
          tabBarIcon: ({ color }) => <Icon name="user" type="font-awesome" color={color} />,
          headerShown: false
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Entry"
        screenOptions={{
          headerStyle: { backgroundColor: '#211C84' },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: { fontWeight: 'bold', fontSize: 22 },
          headerBackTitleVisible: false,
        }}
      >
        {/* Entry Screen */}
        <Stack.Screen
          name="Entry"
          component={EntryScreen}
          options={{ title: '', headerStyle: { backgroundColor: '#211C84' } }}
        />

        {/* Login Screen */}
        <Stack.Screen name="Login" component={LoginPage} options={{ title: 'Login' }} />

        {/* Register Screen */}
        <Stack.Screen name="Register" component={RegisterPage} options={{ title: 'Register' }} />

        {/* Forgot Password Screen */}
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordPage} options={{ title: 'Forgot Password' }} />

        {/* Create Password Screen */}
        <Stack.Screen name="CreatePassword" component={CreatePasswordPage} options={{ title: 'Create Password' }} />

        {/* Home Screen (Alt Menü Entegre Edildi) */}
        <Stack.Screen
          name="Home"
          component={MainTabs}   // Alt menü burada entegre edildi
          options={({ navigation }) => ({
            headerTitle: 'Home',
            headerTitleAlign: 'left',
            headerStyle: { backgroundColor: '#211C84' },
            headerTintColor: '#fff',
            headerRight: () => (
              <View style={{ flexDirection: 'row', marginRight: 15 }}>
                {/* Profile İkonu */}
                <Icon
                  name="user"
                  type="font-awesome"
                  color="#fff"
                  containerStyle={{ marginRight: 20 }}
                  onPress={() => navigation.navigate('Profile')}
                />

                {/* Logout İkonu */}
                <Icon
                  name="sign-out"
                  type="font-awesome"
                  color="#fff"
                  containerStyle={{ marginRight: 15 }}
                  onPress={() => handleLogout(navigation)}
                />
              </View>
            ),
          })}
        />

        {/* Prediction Screen */}
        <Stack.Screen name="Predictions" component={PredictionPage} options={{ title: 'Predictions' }} />

        {/* Profile Screen */}
        <Stack.Screen name="Profile" component={ProfilePage} options={{ title: 'Profile' }} />

        {/* HealthProfile Screen */}
        <Stack.Screen name="HealthProfile" component={HealthProfilePage} options={{ title: 'Health Profile' }} />

        {/* Profile editing Screen */}
        <Stack.Screen name="ProfileEdit" component={ProfileEditPage} options={{ title: 'Profile Edit' }} />

        {/* Health Tracking Screen */}
        <Stack.Screen name="HealthTracking" component={HealthTrackingPage} options={{ title: 'Health Tracking' }} />

        <Stack.Screen name="SymptomsInputPage" component={SymptomsInputPage} options={{ title: 'Symptoms Checker' }} />

        <Stack.Screen
          name="RetinaPrediction"
          component={RetinaPredictionPage}
          options={{ title: 'Retina Prediction' }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
