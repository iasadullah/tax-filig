import React from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  ToastAndroid,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import Pdf from 'react-native-pdf';
import Signature from 'react-native-signature-canvas';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Loading from './Loading';
import FullScreenLoading from './FullScreenLoading';
import ConsentForm from './ConsentForm';
import Info from './Info';
const Home = props => {
  return (
    <>
      <ConsentForm
        consentForm={props.consentForm}
        brandsList={props.brandsList}
        onSelectCheckBox={props.onSelectCheckBox}
        checkBox={props.checkBox}
        onSubscribePressed={props.onSubscribePressed}
        requestProcessed={props.requestProcessed}
        onCancel={props.onCancel}
      />
      <Info
        show={props.errorInfo}
        onHideInfoPopup={props.onHideInfoPopup}
        infoText={props.infoText}
      />
      {props.loading === true ? (
        <FullScreenLoading />
      ) : (
        <View style={styles.container}>
          {props.getSignaturePad ? (
            <>
              <Signature
                onOK={sig => props.handleSignature(sig)}
                onEmpty={() => {
                  ToastAndroid.show(
                    'Please fill the canvas',
                    ToastAndroid.SHORT,
                  );
                  console.log('___onEmpty');
                }}
                descriptionText="Sign in the above blank space "
                confirmText="Save"
                clearText="Clear"
                webStyle={`.m-signature-pad--footer
              .button {
                background-color: #508DBC;
                color: #FFF;
              }
              .m-signature-pad {
                height: ${widthPercentageToDP - 80}px;
                margin: 0;
              }`}
              />
              <View>
                <TouchableOpacity
                  onPress={props.onCancelSign}
                  style={{
                    height: heightPercentageToDP(3.4),
                    width: widthPercentageToDP(12),
                    backgroundColor: '#c70404',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 5,
                    position: 'absolute',

                    bottom: 605,
                    // left: 0,
                    right: 100,
                  }}>
                  <Text style={{color: '#fff', fontSize: 15}}>Cancel </Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <View>
              {props.filePath ? (
                <View>
                  <Pdf
                    renderActivityIndicator={progress => {
                      <ActivityIndicator size="large" color="#508DBC" />;
                    }}
                    trustAllCerts={false}
                    minScale={1.0}
                    maxScale={2.0}
                    scale={1.0}
                    spacing={0}
                    fitPolicy={0}
                    enablePaging={true}
                    source={{uri: props.filePath}}
                    usePDFKit={false}
                    onLoadComplete={(
                      numberOfPages,
                      filePath,
                      {width, height},
                    ) => {
                      props.onSetPageWidth(width);
                      props.onSetPageHeight(height);
                    }}
                    onZoomIn={() => {
                      console.log('scale');
                    }}
                    horizontal={false}
                    // onPageSingleTap={(page, x, y) => {
                    //   props.handleSingleTap(page, x, y);
                    // }}
                    style={styles.pdf}
                  />
                </View>
              ) : (
                <FullScreenLoading />
              )}
              {props.pdfEditMode ? (
                <View style={styles.message}>
                  <Text>* EDIT MODE *</Text>
                  <Text>Touch where you want to place the signature</Text>
                </View>
              ) : (
                <>
                  {props.filePath && (
                    <View>
                      <TouchableOpacity
                        onPress={props.getSignature}
                        style={styles.button}>
                        {props.signatureArrayBuffer === null ? (
                          <>
                            <Text style={{color: '#fff'}}>Sign Document</Text>
                          </>
                        ) : (
                          <Text style={{color: '#fff'}}>Modify Signature</Text>
                        )}
                      </TouchableOpacity>
                    </View>
                  )}
                  {props.submit && (
                    <View>
                      <TouchableOpacity
                        onPress={props.onSubmitSignature}
                        style={{
                          alignItems: 'center',
                          backgroundColor: '#508DBC',
                          padding: 10,
                          marginVertical: 10,
                          position: 'absolute',
                          bottom: 120,
                          alignSelf: 'center',
                          borderRadius: 10,
                          width: '35%',
                        }}>
                        <Text style={{color: '#fff'}}>Submit Form</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </>
              )}
            </View>
          )}
        </View>
      )}
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  headerText: {
    color: '#508DBC',
    fontSize: 20,
    marginBottom: 20,
    alignSelf: 'center',
  },
  pdf: {
    width: Dimensions.get('window').width,
    // height: heightPercentageToDP(100),
    justifyContent: 'center',
    alignSelf: 'center',
    flex: 1,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#508DBC',
    padding: 10,
    marginVertical: 10,
    position: 'absolute',
    bottom: 180,
    alignSelf: 'center',
    borderRadius: 10,
    width: '35%',
  },
  buttonText: {
    color: '#DAFFFF',
  },
  message: {
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#FFF88C',
  },
  signatureCanvas: {
    // width: '90%',
  },
});
