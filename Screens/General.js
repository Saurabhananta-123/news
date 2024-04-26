import React, { useState, useEffect } from 'react';
import { View, FlatList, SafeAreaView, ActivityIndicator } from 'react-native';
import axios from 'axios';
import NewsItem from './NewsItem';
import { useNavigation } from '@react-navigation/native';

const General = ({ route }) => {
  const navigation = useNavigation();
  const { selectedCountry } = route.params || {}; // Handle potential undefined value

  // Set India ('in') as the default country if selectedCountry is undefined
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [defaultCountry] = useState('in'); // Default country code for India

  useEffect(() => {
    if (selectedCountry || defaultCountry) {
      fetchGeneralNews();
    }
  }, [selectedCountry, defaultCountry]); // Fetch news when the selected country or default country changes

  const fetchGeneralNews = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://newsapi.org/v2/top-headlines', {
        params: {
          country: selectedCountry || defaultCountry, // Use selected country if available, otherwise default to India
          category: 'general', // Fetch only general news
          apiKey: '2571685a84244a0484c9d1590af525bb', // Replace with your API key
        },
      });
      setArticles(response.data.articles);
    } catch (error) {
      console.error('Error fetching general news:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!selectedCountry && !defaultCountry) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  const handleNewsPress = (newsUrl) => {
    // Navigate to the full news screen with the news URL as a parameter
    navigation.navigate('Full', { newsUrl });
  };

  

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={articles}
        renderItem={({ item }) => (
          <NewsItem
            title={item.title}
            description={item.description}
            imageUrl={item.urlToImage}
            onPress={() => handleNewsPress(item.url)}
          />
        )}
        keyExtractor={(item) => item.title} // Use a unique identifier for the key
        refreshing={loading} // Show loading indicator while fetching news
        onRefresh={fetchGeneralNews} // Fetch news when user pulls down to refresh
      />
    </SafeAreaView>
  );
};

export default General;
