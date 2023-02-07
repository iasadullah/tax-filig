import React from 'react';
import {
  View,
  Modal,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Platform,
} from 'react-native';
// import FastImage from 'react-native-fast-image';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '../Constants/Colors';

const Info = props => {
  return (
    <Modal
      onRequestClose={props.onHideInfoPopup}
      transparent={true}
      visible={props.show}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={props.onHideInfoPopup}
        style={styles.mainContainer}>
        <TouchableOpacity
          activeOpacity={1}
          style={{
            ...styles.subContainer,
            backgroundColor: props.isDarkMode
              ? Colors.sectionBackgound2
              : Colors.sectionBackgound1,
          }}>
          <View style={styles.topContainer}>
            <Text
              style={{
                ...styles.headingText,
                color: props.isDarkMode ? Colors.heading2 : Colors.heading1,
              }}>
              Alert
            </Text>
          </View>
          <View style={styles.middleContainer}>
            <View style={styles.bgImage}>
              <Text style={styles.descriptionText}>{props.infoText}</Text>
            </View>
          </View>
          <View style={styles.bottomContainer}>
            <TouchableOpacity
              style={styles.btnActive}
              onPress={props.onHideInfoPopup}>
              <Text style={{...styles.buttonText, color: '#fff'}}>ok</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  subContainer: {
    width: wp(90),
    height: 280,
    backgroundColor: 'white',
    borderRadius: 12,
  },
  topContainer: {
    width: '100%',
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  middleContainer: {
    width: '100%',
    height: 130,
  },
  bottomContainer: {
    width: '100%',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headingText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    letterSpacing: 0.9,
    includeFontPadding: false,
  },
  descriptionText: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
    marginHorizontal: wp(5),
    color: Colors.heading1,
    includeFontPadding: false,
  },
  bgImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnActive: {
    width: 146,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.button1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.button1Text,
    includeFontPadding: false,
  },
  cornerLeft: {
    position: 'absolute',
    width: Platform.OS === 'ios' ? wp(6) : wp(5),
    height: wp(9),
    backgroundColor: '#b3b3b3',
    borderTopEndRadius: 20,
    borderBottomEndRadius: 20,
    bottom: hp(7.5),
    left: 0,
  },
  cornerRight: {
    position: 'absolute',
    width: Platform.OS === 'ios' ? wp(6) : wp(5),
    height: wp(9),
    backgroundColor: '#b3b3b3',
    borderTopStartRadius: 20,
    borderBottomStartRadius: 20,
    bottom: hp(7.5),
    right: 0,
  },
});
export default Info;
