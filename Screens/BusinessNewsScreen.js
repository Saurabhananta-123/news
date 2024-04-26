import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, ActivityIndicator, Dimensions, FlatList } from 'react-native'; // Import FlatList
import axios from 'axios';
import NewsItem from './NewsItem';
import { useNavigation } from '@react-navigation/native';

const BusinessNewsScreen = ({ route }) => {
  const windowHeight = Dimensions.get('window').height;
  const navigation = useNavigation();
  const { selectedCountry } = route.params || {};
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [defaultCountry] = useState('in');

  useEffect(() => {
    if (selectedCountry || defaultCountry) {
      fetchBusinessNews();
    }
  }, [selectedCountry, defaultCountry]);

  const fetchBusinessNews = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://newsapi.org/v2/top-headlines', {
        params: {
          country: selectedCountry || defaultCountry,
          category: 'business',
          apiKey: 'f2097516e63e4fecb790485ec0c18b12',
        },
      });
      setArticles(response.data.articles);
    } catch (error) {
      console.error('Error fetching business news:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewsPress = (newsUrl) => {
    navigation.navigate('Fullnews', { newsUrl });
  };

  if (!selectedCountry && !defaultCountry) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView >
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
        keyExtractor={(item) => item.title}
        horizontal={false} // Set to false to make it vertical
       
        showsVerticalScrollIndicator={false} // Hide the vertical scroll indicator
        onRefresh={fetchBusinessNews} // Fetch news when user pulls down to refresh
        refreshing={loading} // Show loading indicator while fetching news
      />
    </SafeAreaView>
  );
};

export default BusinessNewsScreen;
