import React, {useContext} from 'react';
import {View, Modal, Text, ActivityIndicator, StyleSheet} from 'react-native';

const Loading = props => {
  return (
    <Modal transparent={true} visible={props.isLoading}>
      <View style={styles.mainContainer}>
        <View
          style={{
            ...styles.loadingContainer,
          }}>
          <ActivityIndicator size="large" color="#508DBC" />
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
    height: 100,
    // backgroundColor: 'white',
  },
  textContainer: {
    flexDirection: 'row',
  },
  loadingText: {
    alignSelf: 'center',
    marginTop: 10,
    fontSize: 16,
    color: '#2f2f2f',
  },
});
export default Loading;
