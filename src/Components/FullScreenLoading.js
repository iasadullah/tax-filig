import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

const FullScreenLoading = () => {
  return (
    <View style={styles.mainContainer}>
      <ActivityIndicator color={'#508DBC'} size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FullScreenLoading;
