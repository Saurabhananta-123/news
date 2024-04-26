import React from 'react';
import { View, Button } from 'react-native';

const BottomTabs = ({ selectedCategory, onCategoryChange }) => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10 }}>
      <Button title="General" onPress={() => onCategoryChange('general')} />
      <Button title="Business" onPress={() => onCategoryChange('business')} />
      <Button title="Technology" onPress={() => onCategoryChange('technology')} />
      {/* Add more buttons for other categories */}
    </View>
  );
};

export default BottomTabs;
