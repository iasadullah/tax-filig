import React from 'react';

import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Image,
  Platform,
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/AntDesign';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '../Constants/Colors';
import FI from 'react-native-vector-icons/FontAwesome';

const ConsentForm = props => {
  return (
    <Modal visible={props.consentForm} animationType="slide" transparent={true}>
      {!props.requestProcessed ? (
        <TouchableOpacity
          activeOpacity={1}
          onPress={props.onHideCityPopup}
          style={styles.mainContainer}>
          <TouchableOpacity
            activeOpacity={1}
            style={{
              ...styles.boxContainer,
              backgroundColor: props.isDarkMode
                ? Colors.sectionBackgound2
                : Colors.sectionBackgound1,
            }}>
            <View style={styles.contentContainer}>
              <ScrollView style={{}} showsVerticalScrollIndicator={true}>
                {props.brandsList.length == 0 ? (
                  <View
                    style={{
                      flex: 1,
                      marginTop: '50%',
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignItems: 'center',
                    }}>
                    <ActivityIndicator size="large" color={'#CA0909'} />
                  </View>
                ) : (
                  props.brandsList.map((item, index) => {
                    return (
                      <View
                        key={index}
                        style={{
                          width: '100%',
                          borderBottomColor: 'lightgrey',
                          borderBottomWidth: 1,
                          padding: '4.5%',
                        }}>
                        <TouchableOpacity
                          // onPress={() => props.onSelectCity(item)}
                          style={{
                            flexDirection: 'row',
                            width: '100%',
                            alignItems: 'center',
                          }}>
                          <FI
                            name="circle"
                            size={20}
                            style={{
                              width: wp('8%'),
                              color: props.isDarkMode
                                ? Colors.normalText3
                                : Colors.normalText2,
                            }}
                          />

                          <Text
                            style={{
                              ...styles.nameText,
                              color: props.isDarkMode
                                ? Colors.heading2
                                : Colors.heading1,
                            }}>
                            {item.name}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    );
                  })
                )}
              </ScrollView>
            </View>

            <View style={styles.bottomContainer}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                  width: '40%',
                }}>
                <TouchableOpacity
                  style={{alignSelf: 'center'}}
                  onPress={props.onSelectCheckBox}>
                  <FontAwesomeIcon
                    name={
                      props.checkBox === false ? 'checksquareo' : 'checksquare'
                    }
                    size={30}
                  />
                </TouchableOpacity>
                <View>
                  <Text
                    style={{fontSize: Platform.OS === 'ios' ? hp(2.2) : hp(2)}}>
                    Kindly check the box
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  width: '70%',
                }}>
                {props.checkBox === true ? (
                  <TouchableOpacity
                    onPress={props.onSubscribePressed}
                    style={styles.btnActive}>
                    <Text style={styles.buttonText}>Subscribe</Text>
                  </TouchableOpacity>
                ) : (
                  <View style={styles.btnInactive}>
                    <Text style={styles.buttonText}>Subscribe</Text>
                  </View>
                )}
                <TouchableOpacity
                  onPress={props.onCancel}
                  style={{...styles.btnActive, backgroundColor: '#c70404'}}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      ) : (
        <View style={styles.mainContainer}>
          <TouchableOpacity
            activeOpacity={1}
            style={{
              ...styles.boxContainer,
              backgroundColor: props.isDarkMode
                ? Colors.sectionBackgound2
                : Colors.sectionBackgound1,
            }}>
            <View style={styles.contentContainer}>
              <ScrollView style={{}} showsVerticalScrollIndicator={true}>
                <View
                  style={{
                    width: '100%',
                    // borderBottomColor: 'lightgrey',
                    // borderBottomWidth: 1,
                    padding: '4.5%',
                  }}>
                  <View
                    // onPress={() => props.onSelectCity(item)}
                    style={{
                      flexDirection: 'column',
                      width: '100%',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        ...styles.nameText,
                        color: props.isDarkMode
                          ? Colors.heading2
                          : Colors.heading1,
                      }}>
                      Your request has been processed
                    </Text>
                  </View>
                </View>
              </ScrollView>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </Modal>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  boxContainer: {
    // backgroundColor: 'white',
    // height: hp(70),
    width: wp('90%'),
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    height: hp(10),
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
  },
  headerText: {
    alignSelf: 'center',
    fontSize: Platform.OS === 'ios' ? hp(2.2) : hp(2.5),
    fontFamily: 'Poppins-SemiBold',
    marginLeft: '5%',
    color: Colors.heading1,
  },
  nameText: {
    fontFamily: 'Poppins-Regular',
    fontSize: Platform.OS === 'ios' ? hp(1.6) : hp(1.9),
  },
  jazzLogo: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignSelf: 'center',
    width: '60%',
  },
  contentContainer: {
    width: wp('90%'),
    maxHeight: hp(60),
  },
  bottomContainer: {
    width: '100%',
    height: hp(15),
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'lightgrey',
  },
  btnActive: {
    width: '30%',
    height: Platform.OS === 'ios' ? '50%' : '60%',
    borderRadius: wp(20),
    backgroundColor: Colors.button1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  btnInactive: {
    width: '30%',
    height: Platform.OS === 'ios' ? '50%' : '60%',
    borderRadius: wp(20),
    backgroundColor: '#313234',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontSize: Platform.OS === 'ios' ? hp(2.1) : hp(2.4),
    fontFamily: 'Poppins-Medium',
    color: '#fff',
  },
});

export default ConsentForm;
