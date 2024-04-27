import React, { useState, useEffect } from 'react';
import { View, FlatList, SafeAreaView, ActivityIndicator, Image, Text, TouchableOpacity } from 'react-native'; // Import Text and TouchableOpacity
import axios from 'axios';
import NewsItem from './NewsItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';


import CrosswordGrid from './component/CrosswordGrid';

const Sports = ({ route }) => {
  const navigation = useNavigation();
  const { selectedCountry, sportsNewsEnabled } = route.params || {};

  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchSportsNews = async (countryCode) => {
    setRefreshing(true);

    try {
      let response;
      if (sportsNewsEnabled) {
        response = await axios.get('https://newsapi.org/v2/top-headlines', {
          params: {
            country: countryCode,
            category: 'sports',
            apiKey: '',
          },
        });
        setArticles(response.data.articles);
      } else {
        // If sports news is not enabled, don't fetch news, just display the game component
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setRefreshing(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchSportsNews(selectedCountry);
    }, [selectedCountry, sportsNewsEnabled])
  );

  const handleRefresh = () => {
    fetchSportsNews(selectedCountry);
  };

  const handleNewsPress = (newsUrl) => {
    navigation.navigate('Fullnews', { newsUrl });
  };

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {sportsNewsEnabled ? (
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
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      ) : (
        <CrosswordGrid /> // Render your game component instead of the news list
      )}
    </SafeAreaView>
  );
};

export default Sports;
