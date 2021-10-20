

import { Colors, Fonts, } from '../app/Styles';



const _styles = {
  slider: RX.Styles.createViewStyle({
    overflow: 'hidden' // for custom animations
  }),
  sliderContentContainer: RX.Styles.createViewStyle({
    alignSelf: 'center'
  }),
  titleStyle55: RX.Styles.createTextStyle({
    font: Fonts.displayBold,
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
    alignSelf: 'center'
  }),
  titleStyle0: RX.Styles.createTextStyle({
    font: Fonts.displayBold,
    fontSize: 16,
    textAlign: 'center',
    color: 'black',
    alignSelf: 'center'
  }),
  titleStyle: RX.Styles.createTextStyle({
    font: Fonts.displayBold,
    fontSize: 36,
    textAlign: 'center',
    color: 'black',
    alignSelf: 'center'
  }),
  titleStyle2s: RX.Styles.createTextStyle({
    font: Fonts.displayBold,
    fontSize: 32,
    textAlign: 'left',
    color: 'white',
    alignSelf: 'flex-start'
  }),
  Text5: RX.Styles.createTextStyle({
    fontSize: 10,
    font: Fonts.displayBold,
    color: 'black',
  }),
  Text6: RX.Styles.createTextStyle({
    fontSize: 10,
    font: Fonts.displayBold,
    color: 'black',
  }),
  titleStyle2s2: RX.Styles.createTextStyle({
    font: Fonts.displayBold,
    fontSize: 32,
    textAlign: 'left',
    color: '#FF296D',
    alignSelf: 'flex-start'
  }),
  titleStyle2: RX.Styles.createTextStyle({
    font: Fonts.displayBold,
    fontSize: 40,
    textAlign: 'center',
    color: 'black',
    alignSelf: 'center'
  }),
  titleStyle22: RX.Styles.createTextStyle({
    font: Fonts.displayBold,
    fontSize: 32,
    textAlign: 'center',
    color: 'white',
    alignSelf: 'center'
  }),
  titleStyle3: RX.Styles.createTextStyle({
    font: Fonts.displayRegular,
    fontSize: 14,
    textAlign: 'left',
    color: 'gray',
    alignSelf: 'center'
  }),
  titleStyle4: RX.Styles.createTextStyle({
    font: Fonts.displayBold,
    fontSize: 15,
    textAlign: 'center',
    color: 'black',
    alignSelf: 'center'
  }),
  Text2: RX.Styles.createTextStyle({
    fontSize: 12,
    font: Fonts.displayBold,
    color: 'black',
    marginTop: 10,
    alignSelf: 'center'
  }),
  titleStyle33: RX.Styles.createTextStyle({
    font: Fonts.displayBold,
    fontSize: 40,
    textAlign: 'left',
    color: 'black',
    alignSelf: 'flex-start'
  }),
  titleStyle33s: RX.Styles.createTextStyle({
    font: Fonts.displayBold,
    fontSize: 32,
    textAlign: 'left',
    color: '#FF296D',
    alignSelf: 'flex-start'
  }),
  buttomStyle: RX.Styles.createTextStyle({
    font: Fonts.displayBold,
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
    alignSelf: 'center'
  }),
  contentStyle: RX.Styles.createTextStyle({
    font: Fonts.displayRegular,
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    alignSelf: 'center'
  }),
  contentStyle2: RX.Styles.createTextStyle({
    font: Fonts.displayBold,
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    alignSelf: 'center'
  }),
  contentContainer: RX.Styles.createViewStyle({
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  }),
  container: RX.Styles.createViewStyle({
    flex: 1,
    height: 600,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.simpleDialogBackground,
    borderWidth: 1,
    borderColor: Colors.simpleDialogBorder,
  }),
  contentStyle3: RX.Styles.createTextStyle({
    font: Fonts.displayBold,
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    alignSelf: 'center'
  }),
  input: RX.Styles.createTextInputStyle({
    font: Fonts.displayBold,
    fontSize: 12,
    color: 'white',
    paddingLeft: 20,
    textAlign: 'left',
    width: 250, marginTop: 5, backgroundColor: '#181818', borderRadius: 11, height: 37
  }),
  input2: RX.Styles.createTextInputStyle({
    font: Fonts.displayBold,
    fontSize: 12,
    color: 'white',
    paddingLeft: 20,
    textAlign: 'left',
    width: 250, marginTop: 5, backgroundColor: '#181818', borderRadius: 11, height: 80
  }),
  label: RX.Styles.createTextStyle({
    font: Fonts.displayBold,
    fontSize: 12,
    color: 'black',
  }),
  Text: RX.Styles.createTextStyle({
    fontSize: 24,
    font: Fonts.displayBold,
    color: 'black',
  }),
  Text3: RX.Styles.createTextStyle({
    fontSize: 16,
    font: Fonts.displayBold,
    color: 'gray',
  }),
}

import SimpleDialog from '../controls/SimpleDialog';
import Dropzone from 'react-dropzone';

import * as UI from '@sproutch/ui';


const _confirmDeleteDialogId = 'cancel';

const Moralis = require('moralis');
Moralis.initialize("kVVoRWButUY31vShqdGGQmiya4L0n3kF5aRTUVXk");

Moralis.serverURL = 'https://qqdpez4ourk2.moralishost.com:2053/server'

export const CollectionHook = ({
  user
}: {
  user: any
}) => {
  const [description, setDescription] = useState('')

  const [name, setName] = useState('')

  const [symbol, setSymbol] = useState('')

  const [cargando,] = useState(false)
  var [file, setFile] = useState<any>('')


  function setFileUpload(file: any) {


    setFile(URL.createObjectURL(file))
  }



  async function _onDropFile2(files: File[]) {
    console.log("files" + files[0])
    let blob = new Blob(files);
    setFileUpload(blob)
    var reader = new FileReader()
    reader.readAsDataURL(files[0])
    reader.onloadend = _loaded


  }
  // const _onDropFile = async (files: File[]) => {
  //   image = files[0]
  //   let blob = new Blob(files);
  //   setFileUpload(blob)
  //   setFileName(files[0].name)
  //   fileType = files[0].type
  //   CurrentUserStore.setExtension(files[0].type)
  //   var reader = new FileReader()

  //   reader.readAsDataURL(image)

  //   reader.onloadend = _loaded
  // }

  async function _onPressSave() {







  }
  const _loaded = async (evt: ProgressEvent | any) => {

    await setFile64(evt.target.result)
  }

  var [data, setData] = useState('')
  var [,] = useState('')
  function setFile64(file: any) {
    setData(file)


  }
  return (<RX.View style={_styles.container} >
    <RX.View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {data === '' ?
        <Dropzone style={{ marginBottom: 10, justifyContent: 'center', alignItems: 'center', borderRadius: 100, alignSelf: 'center', borderStyle: 'dashed', marginTop: 20, flexDirection: 'column', height: 130, width: 130, }}
          onDrop={_onDropFile2}>
          <RX.View style={{ borderRadius: 100, justifyContent: 'center', height: 130, width: 130, alignItems: 'center' }} >
            <RX.Text style={[_styles.Text5, { width: 100, textAlign: 'center', color: 'black', alignSelf: 'center', }]}>
              {'Drag & drop a file '}
            </RX.Text>

            <UI.Button style={{ root: [{ height: 30 }], content: [{ width: 100, height: 30, borderRadius: 11, alignSelf: 'center', marginBottom: 20, marginTop: 10, }], label: _styles.label }
            } elevation={4} variant={"outlined"} label="Choose File" />

          </RX.View>
        </Dropzone> :

        <RX.Image resizeMode='cover' resizeMethod='resize' style={{ alignSelf: 'center', borderRadius: 100, height: 130, width: 130 }} source={file} />

      }
      <RX.View style={{ justifyContent: 'center', marginLeft: 10, alignItems: 'center', flex: 1 }}>
        <RX.Text style={[_styles.Text5, { width: 100, textAlign: 'center', color: 'black', alignSelf: 'center', }]}>
          {'We recommend an image of at least 400x400. Gifs work too.'}
        </RX.Text>


      </RX.View>
    </RX.View>
    <RX.Text style={[_styles.Text2, { marginTop: 0 }]} >
      {'Display name:'}
    </RX.Text>
    <RX.TextInput placeholderTextColor={'white'} style={_styles.input} value={name} onChangeText={setName} placeholder="Enter collection name " />

    <RX.Text style={[_styles.Text2, { marginTop: 10 }]} >
      {'Symbol:'}
    </RX.Text>
    <RX.TextInput placeholderTextColor={'white'} style={_styles.input} value={symbol} onChangeText={setSymbol} placeholder="Enter token symbol" />

    <RX.Text style={[_styles.Text2, { marginTop: 10 }]} >
      {'Description:'}
    </RX.Text>
    <RX.TextInput multiline={true} placeholderTextColor={'white'} style={_styles.input2} value={description} onChangeText={setDescription} placeholder="Spread some words about your token collection" />




    <RX.View>
      {cargando ? <RX.View> <RX.Text style={[_styles.Text3, { width: 200, marginTop: 20, marginLeft: 50, textAlign: 'center', alignSelf: 'center', }]}>
        {'Cargando...'}
      </RX.Text></RX.View> :

        <RX.View style={{ paddingBottom: 50, justifyContent: 'center', alignItems: 'center' }}>

          <UI.Button onPress={() => _onPressSave()} style={{ root: [{ marginTop: 20 }], content: [{ width: 180, borderRadius: 11, }], label: _styles.label }
          } elevation={4} variant={"outlined"} label="Create Collection" />
          <UI.Button onPress={onCancel} style={{ root: [{ marginTop: 10 }], content: [{ width: 160, borderRadius: 11, }], label: _styles.label }
          } elevation={4} variant={"outlined"} label="Cancel" />

        </RX.View>

      }
      <RX.Text style={[_styles.Text5, { width: 100, textAlign: 'center', color: 'black', alignSelf: 'center', }]}>
        {'This featured will added soon'}
      </RX.Text>
    </RX.View>

  </RX.View >



  );
  async function onCancel() {

    SimpleDialog.dismissAnimated(_confirmDeleteDialogId);
  }
};

import * as RX from 'reactxp'
import { useState } from 'react';
