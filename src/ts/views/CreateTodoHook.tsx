
import { Fonts, FontSizes, Styles } from '../app/Styles';


import * as NumericInput from "react-numeric-input";

const _styles = {
  container: RX.Styles.createViewStyle({
    flex: 1, backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  }),
  editTodoItem0: RX.Styles.createTextInputStyle({
    margin: 2,
    width: 100,
    marginRight: 10,
    height: 34,
    textAlign: 'right',
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: FontSizes.size16,
    alignSelf: 'stretch',
  }),
  editTodoItem: RX.Styles.createTextInputStyle({
    margin: 2,
    width: 300,
    height: 34,
    borderWidth: 0.2,
    borderRadius: 2,
    borderColor: 'gray',
    paddingHorizontal: 10,
    fontSize: FontSizes.size16,
    alignSelf: 'stretch',
  }),
  editTodoItem2: RX.Styles.createTextInputStyle({
    margin: 2,
    height: 70,
    borderWidth: 0.2,
    width: 300,
    borderColor: 'gray',
    borderRadius: 2,
    paddingHorizontal: 10,
    fontSize: FontSizes.size16,
    alignSelf: 'stretch',
  }),
  editTodoItem3: RX.Styles.createTextInputStyle({
    margin: 2,
    height: 37,
    width: 70,
    borderRadius: 20,
    paddingHorizontal: 10,
    fontSize: FontSizes.size16,
    alignSelf: 'stretch',
  }),
  Text24: RX.Styles.createTextStyle({
    fontSize: 18,
    font: Fonts.displayBold,
    color: 'black',
  }),
  Text: RX.Styles.createTextStyle({
    fontSize: 24,
    font: Fonts.displayBold,
    color: 'black',
  }),
  Text5: RX.Styles.createTextStyle({
    fontSize: 13,
    font: Fonts.displayBold,
    color: 'black',
  }),
  Text6: RX.Styles.createTextStyle({
    fontSize: 10,
    font: Fonts.displayBold,
    color: 'black',
  }),
  Text3: RX.Styles.createTextStyle({
    fontSize: 14,
    font: Fonts.displayBold,
    color: 'black',
  }),
  Text2: RX.Styles.createTextStyle({
    fontSize: 12,
    font: Fonts.displayBold,
    color: 'black',
  }),
  Text4: RX.Styles.createTextStyle({
    fontSize: 16,
    font: Fonts.displayBold,
    color: 'black',
  }),
  buttonContainer: RX.Styles.createViewStyle({
    alignSelf: 'stretch',
    marginTop: 20,
    height: 70,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  buttomStyle: RX.Styles.createTextStyle({
    font: Fonts.displayBold,
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
    alignSelf: 'center'
  }),
  buttomStyle3: RX.Styles.createTextStyle({
    font: Fonts.displayBold,
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
    alignSelf: 'center'
  }),
  buttomStyle2: RX.Styles.createTextStyle({
    font: Fonts.displayBold,
    fontSize: 15,
    color: 'black',
    textAlign: 'center',
    alignSelf: 'center'
  }),
  text: RX.Styles.createTextStyle({
    flex: -1,
    fontSize: FontSizes.size16,
    font: Fonts.displayBold,
    color: 'black',
    margin: 8,
  }),
  label: RX.Styles.createTextStyle({
    font: Fonts.displayBold,
    fontSize: 14,
    color: 'black',
  })
};
import * as RX from 'reactxp';
import { useState } from 'react';

const _confirmDeleteDialogId = 'cancel';
import VideoPlayer from 'react-video-player-extended';
import ReactAudioPlayer from 'react-audio-player';
import CurrentUserStore from '../stores/CurrentUserStore';

import { BiSave } from "@react-icons/all-files/bi/BiSave";
import Dropzone from 'react-dropzone';
import * as abi from './abi';

import * as UI from '@sproutch/ui';
import { FaUpload } from "@react-icons/all-files/fa/FaUpload";
import { MdOutlineSell } from "react-icons/md";

import { ReactSVG } from 'react-svg'
const Moralis = require('moralis');
Moralis.initialize("kVVoRWButUY31vShqdGGQmiya4L0n3kF5aRTUVXk");
Moralis.serverURL = 'https://qqdpez4ourk2.moralishost.com:2053/server'
const TOKEN_CONTRACT_ADDRESS = '0xD1870765438bE8141DFc789fbD47449C0FB0911e'
const MARKETPLACE_CONTRACT_ADDRESS = '0x17275DcC4C5b27dA7E7888A304D219e1f9b4B6E0'

import Switch from "react-switch";
import SimpleDialog from '../controls/SimpleDialog';
import AccountMenuButton3 from './AccountMenuButton3';

interface userMoralis {
  username: string;
  email: string;
  createdAt: string;
  sessionToken: string;
  emailVerified: boolean;
  updatedAt: string;
  avatar: string;
  objectId: string;
  ethAddress: string;
}
export const CreateTodoHook = ({
  collection,
  collectionAvatar,
  _onChangeText,
  fileExtension,
  user,

}: {
  collection: any;
  collectionAvatar: any;
  _onChangeText: any;
  fileExtension: string;
  user: userMoralis;
}) => {

  var [price, setPrice] = useState<any>(0.01)
  var [phase, setPhase] = useState('Fill All the Fields')
  var [title, setTitle] = useState('')
  var [content, setContent] = useState('')
  var [type, setType] = useState('')
  var [onMarket, putOnMarket] = useState(false)

  var [fileName, setFileName] = useState<any>('')
  var [, setFileName2] = useState<any>('')
  var fileType = ''

  async function _onPressSave(val: string) {
    if (price === 0 && val == '1') {
      setPhase('Please set a price')
      return
    }
    setCargando(true)
    setPhase('Initializing')
    const currentUser = await Moralis.User.current();
    if (currentUser) {
      var filePath2 = '';
      var fileHash2 = '';
      if (data2) {

        const file2 = await new Moralis.File(fileName, { base64: data });
        setPhase('Uploading Cover File..This could take a few moments')
        await file2.saveIPFS()
        filePath2 = file2.ipfs()
        fileHash2 = file2.hash()

      }
      const file = await new Moralis.File(fileName, { base64: data });
      setPhase('Uploading NFT Image..This could take a few moments')
      await file.saveIPFS()
      const filePath = file.ipfs()
      const fileHash = file.hash()
      var metadata = {}
      if (data2) {
        metadata = {
          createdBy: currentUser.get('ethAddress'),
          title: title,
          description: content,
          image: filePath,
          attributes: [{ 'coverImageFilePath': filePath2, 'coverImageFileHash': fileHash2 }]
        };
      } else {
        metadata = {
          createdBy: currentUser.get('ethAddress'),
          title: title,
          description: content,
          image: filePath,
        };
      }



      const fileMetadata = await new Moralis.File('metadata.json', { base64: btoa(JSON.stringify(metadata)) });

      setPhase('Saving IPFS')
      await fileMetadata.saveIPFS();

      const metadataFilePath = fileMetadata.ipfs()
      const metadataFileHash = fileMetadata.hash()

      setPhase('Creating NFT. Please Check Metamask ')
      const nftId = await mintNFT(metadataFilePath)

      setPhase('Please wait... ')


      const userAddress = currentUser.get('ethAddress')
      switch (val) {
        case "0":
          const Item = Moralis.Object.extend("Item")

          const item = new Item()
          item.set("title", title)
          item.set("description", content)
          item.set("ownerAddress", user.ethAddress)
          item.set("fileHash", fileHash)
          item.set("filePath", filePath)
          item.set("coverfilePath", filePath2)
          item.set("coverfileHash", fileHash2)
          item.set("metadataFilePath", metadataFilePath)
          item.set("metadataFileHash", metadataFileHash)
          item.set("nftId", nftId)
          item.set("nftContractAddress", TOKEN_CONTRACT_ADDRESS)
          item.set("type", type)
          item.set("price", 0)
          item.set("forSale", false)

          await item.save()

          setPhase('')
          setDone2(true)
          setDone(false)
          setCargando(false)
          break;
        case "1":
          const Item2 = Moralis.Object.extend("Item")

          const ethInWei = Moralis.Units.ETH(price.toString())
          const item2 = new Item2()

          item2.set("title", title)

          item2.set("description", content)
          item2.set("ownerAddress", user.ethAddress)
          item2.set("fileHash", fileHash)
          item2.set("filePath", filePath)
          item2.set("coverfilePath", filePath2)
          item2.set("coverfileHash", fileHash2)
          item2.set("metadataFilePath", metadataFilePath)
          item2.set("metadataFileHash", metadataFileHash)
          item2.set("nftId", nftId)
          item2.set("nftContractAddress", TOKEN_CONTRACT_ADDRESS)
          item2.set("type", type)
          item2.set("price", price)
          item2.set("forSale", true)

          setPhase('Ensure to marketplace contract to transfer your NFT')
          try {

            await ensureMarketPlaceISApproved(nftId, TOKEN_CONTRACT_ADDRESS)

            setPhase('Enable Metamask')
            const web3 = await Moralis.Web3.enable();
            setPhase('Instancing Marketplace Contract.')
            const marketplaceContract = await new web3.eth.Contract(abi.marketplaceContractAbi, MARKETPLACE_CONTRACT_ADDRESS);
            setPhase('Push NFT To Marketplace for ' + price + " Matic.")
            await marketplaceContract.methods.addItemToMarket(nftId, TOKEN_CONTRACT_ADDRESS, ethInWei).send({ from: userAddress }).on('receipt', async (receipt: any) => {

              console.log('aqui 1')
              setCargando(false)
              setDone2(false)
              setDone(true)
              setPhase('')
              await item2.save()

              // do stuff here when tx has been confirmed
            }).on('error', async (err: any) => {


              item2.set("price", 0)
              item2.set("forSale", false)

              await item2.save()
              setPhase('')
              setPhase('')
              setDone2(true)
              setDone(false)
              setCargando(false)

            })
            break;

          } catch {


            item2.set("price", 0)
            item2.set("forSale", false)

            await item2.save()
            setPhase('')
            setPhase('')
            setDone2(true)
            setDone(false)
            setCargando(false)
            break;
          }


        case "2":

          item.set("title", title)
          item.set("description", content)
          item.set("ownerAddress", user.ethAddress)
          item.set("fileHash", fileHash)
          item.set("filePath", filePath)
          item.set("fileHash", fileHash)
          item.set("filePath", filePath)
          item.set("coverfilePath", filePath2)
          item.set("coverfileHash", fileHash2)
          item.set("metadataFilePath", metadataFilePath)
          item.set("metadataFileHash", metadataFileHash)
          item.set("nftId", nftId)
          item.set("nftContractAddress", TOKEN_CONTRACT_ADDRESS)
          item.set("type", type)
          item.set("price", 0)
          item.set("forSale", false)

          setDone2(false)
          setDone(false)
          setCargando(false)

          break;
      }

      setCargando(false)
      return;

    } else {
      console.log('error no usuario')
    }


  }

  async function mintNFT(metadataUrl: string) {
    const web3 = await Moralis.Web3.enable();

    let user = await Moralis.User.current();
    if (user) {
      const tokenContract = await new web3.eth.Contract(abi.tokenContractAbi, TOKEN_CONTRACT_ADDRESS)
      const receipt = await tokenContract.methods.createItem(metadataUrl).send({ from: user.get("ethAddress") }).on('error', (err: any) => {

        return setCargando(false)
      })
      return receipt.events.Transfer.returnValues.tokenId;

    }
  }



  async function ensureMarketPlaceISApproved(tokenId: any, tokenAddress: any) {
    let user = await Moralis.User.current();

    if (user) {
      const userAddress = user.get('ethAddress')
      const web3 = await Moralis.Web3.enable();
      const contract = await new web3.eth.Contract(abi.tokenContractAbi, tokenAddress)
      const approvedAddress = await contract.methods.getApproved(tokenId).call({ from: userAddress })


      if (approvedAddress != MARKETPLACE_CONTRACT_ADDRESS) {
        await contract.methods.approve(MARKETPLACE_CONTRACT_ADDRESS, tokenId).send({ from: userAddress })
      }

    }
  }
  var [file2, setFile2] = useState<any>('')
  var [file, setFile] = useState<any>('')

  var image: File

  var cover: File
  const _onDropFile2 = async (files: File[]) => {
    if (files[0].type === 'image/png' || files[0].type === 'image/jpeg') {


      cover = files[0]
      let blob = new Blob(files);
      setFileUpload2(blob)
      setFileName2(files[0].name)
      fileType = files[0].type
      setType2(files[0].type)
      CurrentUserStore.setExtension(files[0].type)
      var reader = new FileReader()

      reader.readAsDataURL(cover)

      reader.onloadend = _loaded2
    } else {
      setPhase('Must be an image file!')
    }
  }
  const _loaded2 = async (evt: ProgressEvent | any) => {

    await setFile642(evt.target.result)
  }
  const _onDropFile = async (files: File[]) => {
    image = files[0]
    let blob = new Blob(files);
    setFileUpload(blob)
    setFileName(files[0].name)
    fileType = files[0].type
    setType(files[0].type)
    console.log("type" + type)
    console.log("fileType " + fileType)
    CurrentUserStore.setExtension(files[0].type)
    var reader = new FileReader()

    reader.readAsDataURL(image)

    reader.onloadend = _loaded
  }
  const _loaded = async (evt: ProgressEvent | any) => {

    await setFile64(evt.target.result)
  }

  function setFileUpload2(file: any) {


    setFile2(URL.createObjectURL(file))
  }

  function setFileUpload(file: any) {


    setFile(URL.createObjectURL(file))
  }

  function _onPressAgain() {
    setDone(false)
    setDone2(false)
    setData2('')
    setPrice(0.01)
    setPhase('Fill All the Fields')
    setTitle('')
    setContent('')
    putOnMarket(false)
    setFileName('')
    setFileName2('')
    fileType = ''
    setData('')
    setType('')
    setType2('')
    setCargando(false)

  }
  function setFile642(file: any) {

    setData2(file)


  }

  var [data2, setData2] = useState('')
  var [data, setData] = useState('')
  var [type, setType] = useState('')
  var [, setType2] = useState('')
  function setFile64(file: any) {

    setData(file)


  }
  const [done2, setDone2] = useState(false)
  const [done, setDone] = useState(false)
  const [cargando, setCargando] = useState(false)
  const [isPlaying, setPlaying] = useState(false)
  const [volume, setVolumen] = useState(0.7)

  const handlePlay = () => {
    setPlaying(true)
  };

  const handlePause = () => {

    setPlaying(false)
  };

  function handleVolume(value: any) {
    setVolumen(value)
  };


  function _onPressModal(e: RX.Types.SyntheticEvent, todoId: string) {
    e.stopPropagation();

    const dialog = (
      <SimpleDialog
        dialogId={_confirmDeleteDialogId}
        text={''}
        containerStyle={{ alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}
        maxHeight={600}
        maxWidth={400}
        isRegister={false}

        buttons={[{
          text: 'Login',
          onPress: () => {
            SimpleDialog.dismissAnimated(_confirmDeleteDialogId);

          },
        }, {
          text: 'Register',
          isCancel: false,
          onPress: () => {

          },
        }]}
      />
    );

    RX.Modal.show(dialog, _confirmDeleteDialogId);
  };
  return <RX.View style={[_styles.container, Styles.statusBarTopMargin, {}]}>


    <RX.View style={{ flexDirection: 'column', height: 100, width: 550, marginBottom: 5, justifyContent: 'center', alignItems: 'center' }}>
      {cargando ? <RX.Text style={[_styles.Text, {}]} >
        {'Creating New NFT'}
      </RX.Text> : done ? <RX.Text style={[_styles.Text24, {}]} >
        {'Done! your item will be put in marketplace after 2 block confirmation usually takes few minutes'}
      </RX.Text> : done2 ? <RX.Text style={[_styles.Text24, {}]} >
        {'Done!'}
      </RX.Text> :
        <RX.Text style={[_styles.Text, {}]} >
          {'Create New NFT'}
        </RX.Text>}


      <RX.Text style={[_styles.Text4, { marginLeft: 0, marginBottom: 10, marginTop: 20, alignSelf: 'center', }]} >
        {phase}
      </RX.Text>
    </RX.View>

    {cargando ? <UI.Spinner color={'black'} /> : done || done2 ? <RX.View>
      <UI.Button disabled={title === '' && content === '' && data === ''} onPress={() => _onPressAgain()} iconSlot={iconStyle => (
        <BiSave color={'black'} style={{ marginTop: 0, marginRight: 5, width: 16, height: 16 }} />
      )} style={{ root: [{ alignSelf: 'flex-start' }], content: [{ width: 170, borderRadius: 11, marginBottom: 10, }], label: _styles.label }
      } elevation={4} variant={"outlined"} label="Create again" />
    </RX.View> :
      <RX.View style={{}} >

        <RX.View style={{ flexDirection: 'row', width: 620, height: 250, marginBottom: 0, justifyContent: 'center', alignItems: 'center' }}>
          <RX.View style={{ flexDirection: 'row', alignSelf: 'flex-start', height: 250, width: 280, justifyContent: 'center', alignItems: 'center', }}>

            {
              data === '' ?

                <RX.View style={{ flexDirection: 'row' }}>

                  <RX.View style={{ justifyContent: 'center', alignItems: 'center', width: 35, height: 30, borderRadius: 11, }} />
                  <RX.View style={{
                    borderStyle: 'dashed',
                    justifyContent: 'center', alignItems: 'center',
                    marginLeft: 5, marginRight: 20,
                    paddingTop: 10, height: 212, width: 212, borderWidth: 2, borderRadius: 10, marginBottom: 30, borderColor: 'black'
                  }}>

                    <Dropzone style={{ flex: 1, flexDirection: 'column', height: 212, width: 204, justifyContent: 'center', alignItems: 'center', alignSelf: 'stretch', }}
                      onDrop={_onDropFile}>
                      <RX.View style={{ justifyContent: 'center', paddingTop: 20, alignItems: 'center', flex: 1 }}>
                        <RX.Text style={[_styles.Text3, { width: 200, textAlign: 'center', color: 'black', alignSelf: 'center', }]}>
                          {'Upload a Digital Asset.'}
                        </RX.Text>

                        <RX.Text style={[_styles.Text6, { width: 150, textAlign: 'center', color: 'black', alignSelf: 'center', }]}>
                          {'JPG,PNG, GIF, WEBP or OBJ'}
                        </RX.Text>
                        <RX.Text style={[_styles.Text2, { width: 180, textAlign: 'center', alignSelf: 'center', }]}>
                          {'(Max file size 60mb)'}
                        </RX.Text>
                        <FaUpload style={{ width: 40, height: 40, marginTop: 20, marginBottom: 20, alignSelf: 'center' }} />

                        <UI.Button style={{ content: [{ width: 100, borderRadius: 11, marginBottom: 35, }], label: _styles.label }
                        } elevation={4} variant={"outlined"} label="Choose File" />
                      </RX.View>
                    </Dropzone>

                  </RX.View>
                </RX.View>

                :
                <RX.View style={{ flexDirection: 'row' }}>
                  <UI.Button disabled={title === '' && content === '' && data === ''} onPress={() => setData('')} style={{ label: _styles.label, root: [{ marginLeft: 2, marginTop: 5, marginRight: 3 }], content: [{ justifyContent: 'center', alignItems: 'center', width: 25, height: 25, borderRadius: 11, }] }
                  } elevation={4} variant={"outlined"} label={'x'} />
                  <RX.View style={{
                    borderStyle: 'dashed',
                    justifyContent: 'center', alignItems: 'center',
                    marginRight: 20, alignSelf: 'stretch',
                    borderWidth: 2, borderRadius: 10, marginBottom: 30, borderColor: 'black',
                    height: 212, width: 212
                  }}>
                    {type === 'image/png' || type === 'image/jpeg' || type === 'image/x-icon' || type === 'image/svg+xml' ?
                      <RX.Image resizeMode='contain' resizeMethod='resize' style={{ alignSelf: 'center', borderRadius: 10, height: 212, width: 212 }} source={file} />
                      : type === 'video/mp4' ?
                        <VideoPlayer
                          url={file}
                          isPlaying={isPlaying}
                          volume={volume}
                          onPlay={handlePlay}
                          onPause={handlePause}
                          onVolume={handleVolume}
                          height={'212px'}
                          width={'212px'}
                        />
                        : type === 'audio/mpeg' ?
                          <RX.View style={{ width: 212, height: 212, justifyContent: 'flex-end', alignItems: 'center' }}>
                            <RX.View style={{
                              borderStyle: 'dashed',
                              justifyContent: 'center', alignItems: 'center',

                              borderWidth: 2, borderRadius: 10, borderColor: 'black',
                              height: 212, marginTop: 5, width: 212
                            }}>
                              {data2 === '' ? <Dropzone style={{ flex: 1, paddingTop: 20, flexDirection: 'column', height: 212, width: 212, justifyContent: 'center', alignItems: 'center', alignSelf: 'stretch', }}
                                onDrop={_onDropFile2}>
                                <RX.View style={{ flex: 1, width: 212, height: 180, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                  <RX.Text style={[_styles.Text5, { width: 120, textAlign: 'center', color: 'black', alignSelf: 'center', }]}>
                                    {'Upload Cover'}
                                  </RX.Text>
                                  <RX.Text style={[_styles.Text6, { width: 150, textAlign: 'center', color: 'black', alignSelf: 'center', }]}>
                                    {'JPG,PNG, GIF, WEBP or OBJ'}
                                  </RX.Text>
                                  <RX.Text style={[_styles.Text6, { width: 150, textAlign: 'center', color: 'black', alignSelf: 'center', }]}>
                                    {'(Max 60mb)'}
                                  </RX.Text>
                                  <FaUpload style={{ width: 15, height: 20, marginTop: 5, alignSelf: 'center' }} />

                                  <UI.Button style={{ root: [{ height: 30 }], content: [{ width: 120, height: 30, borderRadius: 11, alignSelf: 'center', marginBottom: 20, marginTop: 10, }], label: _styles.label }
                                  } elevation={4} variant={"outlined"} label="Choose File" />
                                </RX.View>
                              </Dropzone> :

                                <RX.Image resizeMode='cover' resizeMethod='resize' style={{ alignSelf: 'center', borderRadius: 10, height: 180, width: 240 }} source={file2} />

                              }
                            </RX.View>
                            <ReactAudioPlayer
                              style={{ width: 212, height: 70, }}
                              src={file}
                              autoPlay={false}
                              title={'prueba'}
                              controlsList={"nodownload"}
                              controls={true}
                            />

                          </RX.View> : type === 'data' ?
                            <RX.View style={{ width: 212, height: 212, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                              <RX.Text onPress={() => console.log("type " + fileType)} style={[_styles.Text2, { marginBottom: 10 }]} >
                                {'Archivo de Datos:'}
                              </RX.Text>
                            </RX.View> : type === 'image/svg+xml' || type === 'image/svg' || type === 'image/x-icon' ? <ReactSVG style={{ alignSelf: 'center', borderRadius: 10, height: 212, width: 212 }} src={file} /> :
                              <RX.Text onPress={() => console.log("type " + fileType)} style={[_styles.Text2, { marginBottom: 10 }]} >
                                {'Archivo no compatible:'}
                              </RX.Text>

                    }

                  </RX.View></RX.View>
            }
          </RX.View>
          <RX.View style={{ justifyContent: 'flex-start', width: 250, marginTop: 20, height: 250, alignItems: 'flex-start', flex: 1 }}>
            <RX.Text style={[_styles.Text2,]} >
              {'Title:'}
            </RX.Text>
            <RX.TextInput
              style={_styles.editTodoItem}
              value={title}
              maxLength={120}
              disableFullscreenUI={true}
              placeholder={'E.g Nice Photo'}
              onChangeText={setTitle}
              accessibilityId={'EditTodoPanelTextInput'}
            />


            <RX.Text style={[_styles.Text2, { marginTop: 5 }]} >
              {'Descripcion:'}
            </RX.Text>
            <RX.TextInput
              style={_styles.editTodoItem2}
              value={content}
              maxLength={360}
              multiline={true}
              placeholder={'Provide a detailed description of your item'}
              onChangeText={setContent}
              accessibilityId={'EditTodoPanelTextInput'}
            />

            <RX.Text style={[_styles.Text2, { marginTop: 5 }]} >
              {'Choose collection:'}
            </RX.Text>
            <AccountMenuButton3 username={collection} avatar={collectionAvatar === '' ? '' : collectionAvatar.url()} onPress={() => _onPressModal} />





          </RX.View>
        </RX.View>
        <RX.View style={{ height: 40, justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row' }}>
          <RX.Text style={[_styles.Text2, { marginRight: 10, }]} >
            {'Put on Marketplace'}
          </RX.Text>

          <Switch onChange={putOnMarket} checked={onMarket} />
          {onMarket ?
            <RX.Text style={[_styles.Text2, { marginLeft: 50, marginRight: 10 }]} >
              {'Price:'}
            </RX.Text> : null}

          {onMarket ? <RX.View style={{ width: 200, flexDirection: 'row', flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>

            <NumericInput height={34} size={5} snap step={0.05} min={0.01} max={9999999} onChange={setPrice} value={price} />

            <RX.Text style={[_styles.Text2, { marginLeft: 10, marginTop: 5 }]} >
              {'Matic'}
            </RX.Text>
          </RX.View> : null}

        </RX.View>
        <RX.View style={_styles.buttonContainer}>

          <RX.View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            {onMarket ?

              <UI.Button disabled={true} onPress={() => _onPressSave('1')} iconSlot={iconStyle => (
                <MdOutlineSell color={'black'} style={{ marginTop: 0, marginRight: 5, width: 16, height: 16 }} />
              )} style={{ root: [{ alignSelf: 'flex-start' }], content: [{ width: 170, borderRadius: 11, marginBottom: 10, }], label: _styles.label }
              } elevation={4} variant={"outlined"} label="Fixed Price" />


              :
              <UI.Button disabled={title === '' && content === '' && data === ''} onPress={() => _onPressSave('0')} iconSlot={iconStyle => (
                <BiSave color={'black'} style={{ marginTop: 0, marginRight: 5, width: 16, height: 16 }} />
              )} style={{ root: [{ alignSelf: 'flex-start' }], content: [{ width: 170, borderRadius: 11, marginBottom: 10, }], label: _styles.label }
              } elevation={4} variant={"outlined"} label="Create Item" />}




          </RX.View>

        </RX.View>
        <RX.View style={{ height: 37 }}>
          {onMarket ?
            <RX.Text style={[_styles.Text2, {}]} >
              {'Fee 4% you will Receive: ' + (price - price * 0.04).toFixed(4) + ' Matic'}
            </RX.Text> : null}
        </RX.View>
      </RX.View >
    }
  </RX.View >

}

