import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';

export default function VerifyOTPPage({ route, navigation }) {
    const [otp, setOtp] = useState('');
    const { email } = route.params;  // ✅ `RegisterPage`'den gelen e-posta bilgisini alıyoruz.

    const handleVerifyOTP = async () => {
        if (!otp) {
            Alert.alert('Error', 'Please enter the OTP code.');
            return;
        }

        try {
            const response = await axios.post('http://192.168.63.138.138:5000/api/auth/verify-otp', {
                email,  // ✅ Kullanıcının e-posta bilgisi buradan gelecek
                otp
            });

            if (response.status === 200) {
                Alert.alert('Success', 'Account verified successfully!');
                navigation.navigate('Login');  // OTP doğrulandıktan sonra Login sayfasına yönlendir
            } else {
                Alert.alert('Error', response.data.msg);
            }
        } catch (error) {
            Alert.alert('Error', 'Invalid OTP or expired. Try again.');
        }
    };

    return (
        <View>
            <TextInput
                placeholder="Enter OTP"
                value={otp}
                onChangeText={setOtp}
                keyboardType="numeric"
            />
            <Button title="Verify OTP" onPress={handleVerifyOTP} />
        </View>
    );
}
