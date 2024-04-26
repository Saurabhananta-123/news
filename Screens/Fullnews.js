import React from 'react';
import { Platform, View } from 'react-native';
import { WebView } from 'react-native-webview';

const Fullnews = ({ route }) => {
  const { newsUrl } = route.params;

  const renderWebView = () => {
    if (Platform.OS === 'web') {
      return (
        <iframe src={newsUrl} width="100%" height="1000px" />
      );
    } else {
      return (
        <WebView source={{ uri: newsUrl }} />
      );
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {renderWebView()}
    </View>
  );
};

export default Fullnews;
