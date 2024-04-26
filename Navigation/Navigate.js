import React, { useState, useEffect } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native"; // Import useNavigation hook here
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import axios from "axios";
import HomeScreen from "../Screens/HomeScreen";
import BusinessNewsScreen from "../Screens/BusinessNewsScreen";
import Technology from "../Screens/Technology";
import Sports from "../Screens/Sports";
import General from "../Screens/General";
import Setting from "../Screens/Setting";
import Fullnews from "../Screens/Fullnews";
import { Ionicons } from "@expo/vector-icons";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  Text,
} from "react-native";
import SearchNews from "../Screens/SearchNews";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import ViewNotes from "../Screens/component/ViewNotes";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MyTabs = () => {
  const navigation = useNavigation(); // Use useNavigation hook here

  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Stocks"
        component={HomeScreen}
        options={{
          tabBarLabel: "Stocks",
          tabBarLabelStyle: {
            color: "black",
          },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo name="line-graph" size={26} color="black" />
            ) : (
              <Entypo name="line-graph" size={26} color="gray" />
            ),
        }}
      />
      <Tab.Screen
        name="Business"
        component={BusinessNewsScreen}
        options={{
          tabBarLabel: "Business",
          tabBarLabelStyle: {
            color: "black",
          },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <FontAwesome5 name="business-time" size={26} color="black" />
            ) : (
              <FontAwesome5 name="business-time" size={26} color="gray" />
            ),
        }}
      />
      <Tab.Screen
        name="General"
        component={General}
        options={{
          tabBarLabel: "General",
          tabBarLabelStyle: {
            color: "black",
          },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo name="news" size={26} color="black" />
            ) : (
              <Entypo name="news" size={26} color="gray" />
            ),
        }}
      />
      <Tab.Screen
        name="Technology"
        component={Technology}
        options={{
          tabBarLabel: "Technology",

          tabBarLabelStyle: {
            color: "black",
          },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <MaterialIcons name="laptop" size={26} color="black" />
            ) : (
              <MaterialIcons name="laptop" size={26} color="gray" />
            ),
        }}
      />
      <Tab.Screen
        name="Sports"
        component={Sports}
        options={{
          tabBarLabel: "Sports",
          tabBarLabelStyle: {
            color: "black",
          },

          tabBarIcon: ({ focused }) =>
            focused ? (
              <MaterialIcons name="sports-cricket" size={26} color="black" />
            ) : (
              <MaterialIcons name="sports-cricket" size={26} color="gray" />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

const Navigate = () => {
  const navigation = useNavigation(); // Use useNavigation hook here

  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    console.log("Search Results:", searchResults);
  }, [searchResults]); // Log searchResults whenever it changes

  const handleSearch = async (text) => {
    setQuery(text);
    try {
      const response = await axios.get("https://newsapi.org/v2/everything", {
        params: {
          q: text,
          apiKey: "2571685a84244a0484c9d1590af525bb",
        },
      });
      setSearchResults(response.data.articles);
    } catch (error) {
      console.error("Error searching news:", error);
    }
  };

  const handleSuggestionPress = (suggestion) => {
    const selectedNews = searchResults.find(
      (news) => news.title === suggestion
    );
    if (selectedNews && selectedNews.url) {
      navigation.navigate("SearchNews", { newsUrl: selectedNews.url });
      setSuggestions([]); // Clear suggestions
    } else {
      console.warn("Selected news not found or missing URL");
    }
  };

  const navigateToFullNews = (newsItem) => {
    navigation.navigate("SearchNews", { newsItem }); // Navigate to SearchNews screen with selected news item
  };

  const handleInputChange = async (text) => {
    setQuery(text);
    try {
      const response = await axios.get("https://newsapi.org/v2/everything", {
        params: {
          q: text,
          apiKey: "2571685a84244a0484c9d1590af525bb",
        },
      });
      const suggestions = response.data.articles.map(
        (article) => article.title
      );
      setSuggestions(suggestions);
      handleSearch(text); // Perform search as text changes
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const toggleSearchInput = () => {
    setShowSearchInput(!showSearchInput);
    if (!showSearchInput) {
      setQuery("");
    }
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Inhaler"
        component={MyTabs}
        options={{
          headerShown: true,
          headerRight: () => (
            <View style={styles.headerRight}>
              {showSearchInput ? (
                <View style={styles.searchContainer}>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.searchInput}
                      placeholder="Search"
                      onChangeText={(text) => handleInputChange(text)}
                      value={query}
                    />
                    <FlatList
                      style={styles.suggestionsList}
                      data={suggestions}
                      renderItem={({ item }) => (
                        <TouchableOpacity
                          onPress={() => handleSuggestionPress(item)}
                        >
                          <Text style={styles.suggestion}>{item}</Text>
                        </TouchableOpacity>
                      )}
                      keyExtractor={(item, index) => index.toString()}
                    />
                  </View>
                </View>
              ) : null}
              <Ionicons
                name={showSearchInput ? "close" : "search"}
                size={24}
                color="black"
                style={{ marginRight: 10 }}
                onPress={toggleSearchInput}
              />
              <Ionicons
                name="settings-outline"
                size={24}
                color="black"
                style={{ marginLeft: 10 }}
                onPress={() => navigation.navigate("Setting")}
              />
            </View>
          ),
        }}
      />

      <Stack.Screen name="Setting" component={Setting} />
      <Stack.Screen name="Fullnews" component={Fullnews} />
      <Stack.Screen name="SearchNews" component={SearchNews} />
      <Stack.Screen name="Viewnotes" component={ViewNotes} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "gray",
    flex: 1,
  },
  inputContainer: {
    flex: 1,
    position: "relative",
  },
  searchInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  suggestionsList: {
    position: "absolute",
    top: 40,
    left: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: "#fff",
    borderRadius: 5,
    elevation: 3,
    maxHeight: 150,
  },
  suggestion: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
});

export default Navigate;
