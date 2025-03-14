import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from 'react-native-elements';
import { View, Text } from 'react-native';

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

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Entry"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#211C84', // Genel başlık rengi
          },
          headerTintColor: '#fff', // Başlık yazı rengi beyaz
          headerTitleAlign: 'center', // Başlık ortalanmış
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 22,
          },
          headerBackTitleVisible: false, // Geri butonunda başlık görünmesin
        }}
      >
        {/* Entry Screen */}
        <Stack.Screen
          name="Entry"
          component={EntryScreen}
          options={{
            title: '',
            headerStyle: { backgroundColor: '#211C84' }, // Giriş ekranı için yeşil
            headerTintColor: '#fff',
          }}
        />

        {/* Login Screen */}
        <Stack.Screen
          name="Login"
          component={LoginPage}
          options={{
            title: 'Login',
            headerStyle: { backgroundColor: '#211C84' },
            headerTintColor: '#fff',
          }}
        />

        {/* Register Screen */}
        <Stack.Screen
          name="Register"
          component={RegisterPage}
          options={{
            title: 'Register',
            headerStyle: { backgroundColor: '#211C84' },
            headerTintColor: '#fff',
          }}
        />

        {/* Forgot Password Screen */}
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPasswordPage}
          options={{
            title: 'Forgot Password',
            headerStyle: { backgroundColor: '#211C84' },
            headerTintColor: '#fff',
          }}
        />

        {/* Create Password Screen */}
        <Stack.Screen
          name="CreatePassword"
          component={CreatePasswordPage}
          options={{
            title: 'Create Password',
            headerStyle: { backgroundColor: '#211C84' },
            headerTintColor: '#fff',
          }}
        />

        {/* Home Screen */}
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={({ navigation }) => ({
            headerTitle: 'Home',
            headerTitleAlign: 'left',
            headerStyle: { backgroundColor: '#211C84' },
            headerTintColor: '#fff',
            headerRight: () => (
              <Icon
                name="user"
                type="font-awesome"
                color="#fff"
                containerStyle={{ marginRight: 15 }}
                onPress={() => navigation.navigate('Profile')}
              />
            ),
          })}
        />

        {/* Prediction Screen */}
        <Stack.Screen
          name="Predictions"
          component={PredictionPage}
          options={{
            title: 'Predictions',
            headerStyle: { backgroundColor: '#211C84' },
            headerTintColor: '#fff',
          }}
        />

        {/* Profile Screen */}
        <Stack.Screen
          name="Profile"
          component={ProfilePage}
          options={{
            title: 'Profile',
            headerStyle: { backgroundColor: '#211C84' },
            headerTintColor: '#fff',
          }}
        />
        {/* HealthProfile Screen */}
        <Stack.Screen
          name="HealthProfile"
          component={HealthProfilePage}
          options={{
            title: 'Health Profile',
            headerStyle: { backgroundColor: '#211C84' },
            headerTintColor: '#fff',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
