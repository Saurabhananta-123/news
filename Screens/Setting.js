// Setting.js

import React, { useState, useEffect } from 'react';
import { View, Text, Button, Switch, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CountryPicker from 'react-native-country-picker-modal';
import { useNavigation } from '@react-navigation/native';

const Setting = () => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [sportsNewsEnabled, setSportsNewsEnabled] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const country = await AsyncStorage.getItem('selectedCountry');
        const sportsEnabled = await AsyncStorage.getItem('sportsNewsEnabled');
        setSelectedCountry(country || '');
        setSportsNewsEnabled(sportsEnabled === 'true');
      } catch (error) {
        console.error('Error fetching settings:', error);
      }
    };
    fetchSettings();
  }, []);

  const handleCountryChange = (countryCode) => {
    setSelectedCountry(countryCode);
  };

  const handleSportsNewsToggle = () => {
    setSportsNewsEnabled((prev) => !prev);
  };

  const handleSaveSettings = async () => {
    try {
      await AsyncStorage.setItem('selectedCountry', selectedCountry);
      await AsyncStorage.setItem('sportsNewsEnabled', sportsNewsEnabled ? 'true' : 'false');
      alert('Settings saved successfully!');
      navigation.navigate('Business', { selectedCountry }); // Pass selected country to BusinessNewsScreen
      navigation.navigate('Technology', { selectedCountry }); // Pass selected country to Technology screen
      navigation.navigate('Sports', { selectedCountry, sportsNewsEnabled }); // Pass selected country and sportsNewsEnabled to Sports screen
      navigation.navigate('Stocks', { selectedCountry }); // Pass selected country to Stocks screen
      navigation.navigate('General', { selectedCountry }); // Pass selected country to General screen
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Select Your Preferred Country:</Text>
      <CountryPicker
        withFilter
        withFlag
        withCountryNameButton
        withAlphaFilter
        withCallingCode
        withEmoji
        onSelect={(country) => handleCountryChange(country.cca2)}
        countryCode={selectedCountry}
        containerButtonStyle={styles.countryPickerButton}
      />
      <View style={styles.toggleContainer}>
        <Text style={styles.toggleText}>Enable Sports News:</Text>
        <Switch
          value={sportsNewsEnabled}
          onValueChange={handleSportsNewsToggle}
          style={styles.toggleSwitch}
        />
      </View>
      <Button title="Save" onPress={handleSaveSettings} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  countryPickerButton: {
    marginBottom: 20,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  toggleText: {
    fontSize: 16,
    marginRight: 10,
  },
  toggleSwitch: {
    transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }], // Adjust the size of the switch
  },
});

export default Setting;
