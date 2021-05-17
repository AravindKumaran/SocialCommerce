import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Image, Alert, ToastAndroid} from 'react-native';

const ViewsCount = ({
  currentPost,
  OnIncView,
  currentIndex,
  currentVisibleIndex,
}) => {
  const [views, setViews] = useState(
    currentPost.views === null ? 0 : currentPost.views,
  );

  useEffect(async () => {
    // console.log(currentIndex);
    // console.log(currentVisibleIndex);

    if (currentIndex === currentVisibleIndex) {
      const viewsCount = views + 1;
      OnIncView(viewsCount);
      setViews(viewsCount);
    }
  }, [currentVisibleIndex]);

  return (
    <View>
      <Text>{views} Views</Text>
    </View>
  );
};

export default ViewsCount;
