import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";

function LoadingIndicator({ visible = false }) {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <ActivityIndicator animating={true} color='blue' size='large' />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    backgroundColor: "white",
    height: "100%",
    opacity: 0.8,
    width: "100%",
    flex: 1,
    zIndex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default LoadingIndicator;
