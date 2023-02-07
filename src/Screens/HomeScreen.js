import React, {useEffect, useState, useRef, useContext} from 'react';
import {Dimensions, FlatList, Platform} from 'react-native';

import Pdf from 'react-native-pdf';
const RNFS = require('react-native-fs');
import {decode as atob, encode as btoa} from 'base-64';

import Home from '../Components/Home';
import {PDFDocument} from 'pdf-lib';
import {fetchGet, fetchPost} from '../utils/FetchApi';
import ApiNames from '../Constants/ApiNames';
import UserContext from '../utils/UserContext';

const HomeScreen = () => {
  // const [pdfBytes, setPdfBytes] = useState('');
  const userContext = useContext(UserContext);
  const [sourceUrl, setSourceUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [fileDownloaded, setFileDownloaded] = useState(false);
  const [getSignaturePad, setSignaturePad] = useState(false);
  const [pdfEditMode, setPdfEditMode] = useState(false);
  const [signatureBase64, setSignatureBase64] = useState(null);
  const [signatureArrayBuffer, setSignatureArrayBuffer] = useState(null);
  const [pdfBase64, setPdfBase64] = useState(null);
  const [pdfArrayBuffer, setPdfArrayBuffer] = useState(null);
  const [newPdfSaved, setNewPdfSaved] = useState(false);
  const [newPdfPath, setNewPdfPath] = useState(null);
  const [pageWidth, setPageWidth] = useState(0);
  const [pageHeight, setPageHeight] = useState(0);
  const [filePath, setFilePath] = useState(
    `${RNFS.DocumentDirectoryPath}/react-native.pdf`,
  );
  //
  const [id, setId] = useState(null);
  const [clientId, setClientId] = useState(null);
  const [submit, setSubmit] = useState(false);
  const [consentForm, setConsentForm] = useState(false);
  // const [consentForm, setConsentForm] = useState(true);

  const [brandsList, setBrandsList] = useState([]);
  const [brandsIds, setBrandsId] = useState([]);
  const [checkBox, setCheckBox] = useState(false);
  const [requestProcessed, setProcessed] = useState(false);
  const [infoText, setInfoText] = useState('');
  const [errorInfo, setInfoError] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (signatureBase64 !== null) {
      setTimeout(() => {
        handleSingleTap(1, 284.96338, 1362.9375);
      }, 1000);
    }
  }, [signatureBase64, pdfEditMode]);

  useEffect(() => {
    if (sourceUrl.length === 0) {
      console.warn('getting request');
      getPushedRequest();
    }
  }, [sourceUrl]);
  const getPushedRequest = async () => {
    try {
      //for time being i am using requestById later on will change it with getPushedRequest
      // let response = await fetchGet({ApiNames.getPushedRequest);
      // console.warn('this is pushedRequest::', response);
      let response = await fetchGet(
        `request/08f39753-9e36-11ed-8176-30e17118bb8c`,
      );
      console.warn('this is repsonse::', response);
      if (response.status === 0) {
        console.warn('this is requestById::', response.response);
        let res = response.response;
        setSourceUrl(res.formUrl);
        setId(res.id);
        setClientId(res.client.id);
      } else if (response.status === 401) {
        userContext.updateIsWalkthrough(true);
      } else {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
          timerRef.current = null;
        }
        timerRef.current = setTimeout(() => {
          getPushedRequest();
          console.warn('we are calling after every 5 seconds::');
        }, 5000);
      }
    } catch (error) {
      console.log('get pushed request ::', error);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      timerRef.current = setTimeout(() => {
        getPushedRequest();
        console.warn('we are calling after every 5 seconds::');
      }, 5000);
    }
  };
  useEffect(() => {
    if (sourceUrl.length > 0) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      downloadFile();
    }
    if (signatureBase64) {
      setSignatureArrayBuffer(_base64ToArrayBuffer(signatureBase64));
    }
    if (newPdfSaved) {
      setFilePath(newPdfPath);
      // setPdfArrayBuffer(this._base64ToArrayBuffer(pdfBase64));
    }
    console.log('filePath', filePath);
  }, [signatureBase64, filePath, newPdfSaved, sourceUrl]);

  const _base64ToArrayBuffer = base64 => {
    const binary_string = atob(base64);
    const len = binary_string.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
  };

  const _uint8ToBase64 = u8Arr => {
    const CHUNK_SIZE = 0x8000; //arbitrary number
    let index = 0;
    const length = u8Arr.length;
    let result = '';
    let slice;
    while (index < length) {
      slice = u8Arr.subarray(index, Math.min(index + CHUNK_SIZE, length));
      result += String.fromCharCode.apply(null, slice);
      index += CHUNK_SIZE;
    }
    return btoa(result);
  };

  const downloadFile = () => {
    try {
      if (!fileDownloaded) {
        RNFS.downloadFile({
          fromUrl: sourceUrl,
          toFile: filePath,
        }).promise.then(res => {
          console.warn('sss ::', res);
          setFileDownloaded(true);
          readFile();
          setLoading(false);
        });
      }
    } catch (err) {
      console.log('download error::', err);
      setInfoText('Unable to view pdf please try again later');
      setInfoError(true);
    }
  };

  const readFile = () => {
    try {
      RNFS.readFile(
        `${RNFS.DocumentDirectoryPath}/react-native.pdf`,
        'base64',
      ).then(contents => {
        setPdfBase64(contents);
        setPdfArrayBuffer(_base64ToArrayBuffer(contents));
      });
    } catch (error) {
      console.warn('read file error', error);
    }
  };

  const getSignature = () => {
    setSignaturePad(true);
  };

  const handleSignature = signature => {
    setSignaturePad(false);
    setLoading(true);
    setSignatureBase64(signature.replace('data:image/png;base64,', ''));
    setPdfEditMode(true);
  };

  const handleSingleTap = async (page, x, y) => {
    try {
      if (pdfEditMode) {
        setNewPdfSaved(false);
        setFilePath(null);
        setPdfEditMode(false);
        const pdfDoc = await PDFDocument.load(pdfArrayBuffer);
        const pages = pdfDoc.getPages();
        const firstPage = pages[page - 1];
        // The meat
        const signatureImage = await pdfDoc.embedPng(signatureArrayBuffer);
        const pngDims = signatureImage.scale(0.1);
        console.warn('png', pngDims);
        if (Platform.OS == 'ios') {
          firstPage.drawImage(signatureImage, {
            x: (pageWidth * (x - 12)) / Dimensions.get('window').width,
            y: pageHeight - (pageHeight * (y + 12)) / 540,
            width: 50,
            height: 50,
          });
        } else {
          firstPage.drawImage(signatureImage, {
            x: firstPage.getWidth() / 2 - pngDims.width / 2 - 160,
            y: firstPage.getHeight() / 2 - pngDims.height - 90,
            width: 70,
            height: 70,
          });
        }
        setSubmit(true);
        // Play with these values as every project has different requirements

        const pdfBytes = await pdfDoc.save();
        const pdfBase64 = _uint8ToBase64(pdfBytes);
        const path = `${
          RNFS.DocumentDirectoryPath
        }/react-native_signed_${Date.now()}.pdf`;

        RNFS.writeFile(path, pdfBase64, 'base64')
          .then(success => {
            setNewPdfPath(path);
            setNewPdfSaved(true);
            setPdfBase64(pdfBase64);
            setLoading(false);
          })
          .catch(err => {
            console.log(err.message);
            setLoading(false);
            setInfoText('Please Try Again');
            setInfoError(true);
          });
      }
    } catch (error) {
      console.log('Single Tap Error::', error);
      setInfoText('Please Try Again');
      setInfoError(true);
    }
  };
  const onSetPageWidth = width => {
    setPageWidth(width);
  };
  const onSetPageHeight = height => {
    setPageWidth(height);
  };
  const onSubmitSignature = async () => {
    try {
      setLoading(true);
      let data = {
        requestId: id,
        signedFile: pdfBase64,
      };

      let response = await fetchPost(ApiNames.saveSignedFile, data);
      if (response.status === 0) {
        // openConsentForm();
        getBrandsList();
      } else {
        //start user journey again
        setInfoText('Please try again');
        setInfoError(true);
      }
    } catch (error) {
      setLoading(false);
      console.log('submit signed form error', error);
      setInfoText('Please try again');
      setInfoError(true);
    }
  };

  const getBrandsList = async () => {
    try {
      let response = await fetchGet(ApiNames.getBrands);
      if (response.status === 0) {
        if (response.response.length > 0) {
          setBrandsList(response.response);
          let tempBrandsId = [];
          const BrandsId = response.response.forEach(element => {
            tempBrandsId.push(element.id);
          });
          setBrandsId(tempBrandsId);
          setLoading(false);
          openConsentForm();
        } else {
          setProcessed(true);
          setLoading(false);
          onRequestProcessed();
          setConsentForm(true);
        }
      } else {
        setProcessed(true);
        setLoading(false);
        onRequestProcessed();
        setConsentForm(true);
      }
    } catch (error) {
      console.log('get brandlist error', error);
      setProcessed(true);
      setLoading(false);
      onRequestProcessed();
      setConsentForm(true);
    }
  };

  const openConsentForm = async () => {
    setConsentForm(true);
    setLoading(true);
  };
  const onSubscribePressed = async () => {
    try {
      let data = {
        clientId: clientId,
        brandIds: brandsIds,
      };
      let response = await fetchPost(ApiNames.saveSubscriptions, data);
      console.warn('response of save subscription::', response);
      if (response.status === 0) {
        setProcessed(true);
        onRequestProcessed();
      } else {
        setProcessed(true);
        onRequestProcessed();
      }
    } catch (error) {
      console.log('subscribe error', error);
      setProcessed(true);
      onRequestProcessed();
    }
  };
  const onSelectCheckBox = () => {
    setCheckBox(true);
  };
  const onRequestProcessed = () => {
    setTimeout(() => {
      setProcessed(false);
      setConsentForm(false);
      setLoading(true);
      setSourceUrl('');
      setId('');
      setBrandsList([]);
      setBrandsId('');
      setCheckBox(false);
      setNewPdfSaved(false);
      setFilePath(`${RNFS.DocumentDirectoryPath}/react-native.pdf`);
      setSignatureBase64(null);
      setFileDownloaded(false);
      setSubmit(false);
      setInfoError(false);
      setInfoText('');
      setSignatureArrayBuffer(null);
    }, 5000);
  };
  const onCancelSign = () => {
    setSignaturePad(false);
  };
  const onHideInfoPopup = () => {
    setInfoError(false);
    userContext.updateIsWalkthrough(true);
  };
  const onCancel = () => {
    setProcessed(true);
    onRequestProcessed();
  };
  return (
    <Home
      loading={loading}
      getSignaturePad={getSignaturePad}
      fileDownloaded={fileDownloaded}
      filePath={filePath}
      pdfEditMode={pdfEditMode}
      signatureArrayBuffer={signatureArrayBuffer}
      handleSingleTap={handleSingleTap}
      onSetPageWidth={onSetPageWidth}
      onSetPageHeight={onSetPageHeight}
      getSignature={getSignature}
      handleSignature={handleSignature}
      submit={submit}
      onSubmitSignature={onSubmitSignature}
      consentForm={consentForm}
      openConsentForm={openConsentForm}
      brandsList={brandsList}
      onSelectCheckBox={onSelectCheckBox}
      checkBox={checkBox}
      onSubscribePressed={onSubscribePressed}
      requestProcessed={requestProcessed}
      onCancelSign={onCancelSign}
      infoText={infoText}
      errorInfo={errorInfo}
      onHideInfoPopup={onHideInfoPopup}
      onCancel={onCancel}
    />
  );
};

export default HomeScreen;
