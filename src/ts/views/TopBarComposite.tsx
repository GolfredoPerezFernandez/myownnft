/*
* TopBarComposite.tsx
* Copyright: Microsoft 2018
*
* Horizontal bar that appears on the top of every view within the app
* when it's using composite layout (as opposed to stack-based layout).
*/

import * as RX from 'reactxp';
import { ComponentBase } from 'resub';

import HoverButton from '../controls/HoverButton';
import { Colors, Fonts, FontSizes } from '../app/Styles';

interface Market {
    uid: string;
    tokenId: string;
    tokenAddress: string;
    askingPrice: string;
    symbol: string;
    tokenUri: string;
    ownerOf: string;
    tokenObjectId: any;
    sellerUsername: string;
}
import * as UI from '@sproutch/ui';

interface Item {
    createdAt: string;
    fileHash: string;
    filePath: string;
    metadataFileHash: string;
    metadataFilePath: string;
    description: string;
    title: string;
    ownerAddress: string;
    nftContractAddress: string;
    nftId: string;
    price: number;
    forSale: boolean;
    type: string;
}
const _styles = {
    background: RX.Styles.createViewStyle({
        height: 75,
        borderBottomWidth: 1,
        alignSelf: 'center',
        alignItems: 'center',
        borderColor: Colors.gray66,
        flexDirection: 'row',
    }),
    logoContainer: RX.Styles.createViewStyle({
        flexDirection: 'row',
        height: 50,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    }),
    barControlsContainer: RX.Styles.createViewStyle({
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    }),
    logoImage: RX.Styles.createImageStyle({
        height: 24,
        width: 26,
    }),
    logoText: RX.Styles.createTextStyle({
        font: Fonts.displayBold,
        fontSize: FontSizes.size20,
        marginLeft: 5,
        color: '#FF296D',
    }),
    logoText2: RX.Styles.createTextStyle({
        font: Fonts.displayBold,
        fontSize: FontSizes.size20,
        marginLeft: 0,
        color: 'black',
    }),
    linkText: RX.Styles.createTextStyle({
        font: Fonts.displayRegular,
        fontSize: FontSizes.menuItem,
        marginHorizontal: 8,
        color: Colors.menuText,
    }),
    linkTextHover: RX.Styles.createTextStyle({
        color: Colors.menuTextHover,
    }),
    backButtonContainer: RX.Styles.createViewStyle({
        flexDirection: 'row',
        alignItems: 'center',
    }),
    backText: RX.Styles.createTextStyle({
        font: Fonts.displayRegular,
        fontSize: FontSizes.size16,
        color: Colors.menuText,
    }),
    label: RX.Styles.createTextStyle({
        font: Fonts.displayBold,
        fontSize: FontSizes.size12,
        color: Colors.menuText,
    })
}


interface userMoralis {
    username: string;
    email: string;

    ethAddress: string;
    createdAt: string;
    sessionToken: string;
    emailVerified: boolean;
    updatedAt: string;
    avatar: any;
    objectId: string;
}
export interface TopBarCompositeProps extends RX.CommonProps {
    showBackButton: boolean;
    showSideMenu: boolean;
    width: number;
    isMarketplace: boolean;
    user: any;
    onBack?: () => void;
}

interface TopBarCompositeState {
    isLogin: boolean;
    isRegister: boolean;
    sameSession: boolean;
    isPolygon: boolean;
    isMetamask: boolean;
    totalNfts: number;
    isMarketplace: boolean;
    user: userMoralis;
    totalMarket: number;
}
import { AiOutlineMenuFold } from "@react-icons/all-files/ai/AiOutlineMenuFold";

import { RiStore2Line } from "@react-icons/all-files/ri/RiStore2Line";

import { AiOutlineMenuUnfold } from "@react-icons/all-files/ai/AiOutlineMenuUnfold";
import { GiFlamingo } from "@react-icons/all-files/gi/GiFlamingo";
import CurrentUserStore from '../stores/CurrentUserStore';

import { BiImageAlt } from "@react-icons/all-files/bi/BiImageAlt";
import { BsFillCollectionFill } from "@react-icons/all-files/bs/BsFillCollectionFill";
import SimpleDialog from '../controls/SimpleDialog';
import AccountMenuButton2 from './AccountMenuButton2';
import NavContextStore from '../stores/NavContextStore';


const Moralis = require('moralis');
Moralis.initialize("kVVoRWButUY31vShqdGGQmiya4L0n3kF5aRTUVXk");

Moralis.serverURL = 'https://qqdpez4ourk2.moralishost.com:2053/server'

const _confirmDeleteDialogId = 'delete';

import ImageSource from 'modules/images';

export default class TopBarComposite extends ComponentBase<TopBarCompositeProps, TopBarCompositeState> {

    protected _buildState(props: TopBarCompositeProps, initState: boolean): Partial<TopBarCompositeState> | undefined {
        const partialState: Partial<TopBarCompositeState> = {
            isRegister: CurrentUserStore.getRegister(),
            isLogin: CurrentUserStore.getLogin(),
            user: CurrentUserStore.getUser(),
            isMarketplace: CurrentUserStore.getIsMarketplace(),
            isMetamask: CurrentUserStore.getMetamask(),
            totalNfts: CurrentUserStore.getTotalNft(),
            sameSession: CurrentUserStore.getSameSession(),
            isPolygon: CurrentUserStore.getPolygon(),
            totalMarket: CurrentUserStore.getTotalMarket(),
        };
        return partialState;
    }

    componentDidMount() {


        let user = Moralis.User.current();
        if (user) {

            CurrentUserStore.setSameSession(false)
            let username = user.get('username')
            let createdAt = user.get('createdAt')
            let sessionToken = user.get('sessionToken')
            let updatedAt = user.get('updatedAt')
            let address = user.get('ethAddress')
            let avatar = user.get('avatar')
            this.loadtems(address)
            this.loadAllItems()
            this.loadOnSaleItems()
            this.getUserNfts()
            this.getMarket()

            this.itemsSubscription()
            this.marketSubscription()
            this.itemsSoldSubscription()

            if (avatar === undefined) {


                CurrentUserStore.setUser(username, '', createdAt, sessionToken, updatedAt, '', address)
                CurrentUserStore.setLogin(true)
                CurrentUserStore.setMyNfts(false)
                CurrentUserStore.setConnect(true)
            } else {

                CurrentUserStore.setUser(username, '', createdAt, sessionToken, updatedAt, avatar, address)
                CurrentUserStore.setLogin(true)
                CurrentUserStore.setMyNfts(false)
                CurrentUserStore.setConnect(true)
            }
        } else {
            this.onLogOut()
        }
    }
    setSideMenu(params: boolean) {
        CurrentUserStore.setSideMenu(params)
    }

    render(): JSX.Element | null {
        let leftContents: JSX.Element | undefined;

        if (this.props.showBackButton) {
            leftContents = (
                <HoverButton onPress={this._onPressBack} onRenderChild={this._renderBackButton} />
            );
        } else {
            leftContents = (
                <RX.View style={{ flex: 20, justifyContent: 'flex-start', marginLeft: this.props.width * 0.05, alignItems: 'flex-start' }} >
                    <RX.View style={_styles.logoContainer}>
                        <RX.Button>{this.props.showSideMenu ?
                            <AiOutlineMenuFold onClick={() => this.setSideMenu(false)} style={{ width: 25, height: 25 }} />
                            :
                            <AiOutlineMenuUnfold onClick={() => this.setSideMenu(true)} style={{ width: 25, height: 25 }} />}
                        </RX.Button>
                        {!this.state.isLogin ? null :
                            <RX.View style={{ height: 50, width: this.props.width * 0.35, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <RX.View style={{ width: 40 }}></RX.View>
                                <AccountMenuButton2 onLogOut={this.onLogOut} username={this.state.user.ethAddress} avatar={this.state.user.avatar === '' ? '' : this.state.user.avatar.url()} onPress={() => this._onPressModal} />



                                <RX.View style={{ width: 10 }}></RX.View>

                                <UI.Button onPress={this._onPressTodo4} iconSlot={iconStyle => (
                                    <BiImageAlt color={'#FF296D'} style={{ marginTop: 0, alignSelf: 'center', marginRight: 5, width: 17, height: 17 }} />
                                )} style={{ root: [{ marginLeft: 0, height: 35 }], content: [{ width: 150, borderRadius: 11, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }], label: _styles.label }
                                } elevation={4} variant={"outlined"} label={"My NFTs " + "(" + this.state.totalNfts + ")"} />

                                <RX.View style={{ width: 20 }}></RX.View>
                            </RX.View>

                        }
                    </RX.View>
                </RX.View>
            );
        }
        return (
            <RX.View style={[_styles.background, { width: this.props.width }]}>

                <RX.View style={[{ width: this.props.width * 0.45 }]}>
                    {leftContents}
                </RX.View>
                <RX.View onPress={this._onPressTodo3} style={[_styles.barControlsContainer, { width: this.props.width * 0.10, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }]}>
                    <GiFlamingo color={'#FF296D'} style={{ marginTop: 0, marginRight: 0, width: 30, height: 30 }} />
                    <RX.Text style={_styles.logoText}>

                        {'MyOwn'}
                    </RX.Text> <RX.Text style={_styles.logoText2}>

                        {'NFT'}
                    </RX.Text>


                </RX.View>
                {!this.state.isMetamask ?
                    <UI.Button onPress={this._onPressTodoMetamask} iconSlot={iconStyle => (
                        <RX.Image source={ImageSource.fox} style={{ marginTop: 0, alignSelf: 'center', marginRight: 5, width: 14, height: 14 }} />
                    )} style={{ root: [{ marginLeft: 200, height: 35 }], content: [{ width: 250, borderRadius: 11, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }], label: _styles.label }
                    } elevation={4} variant={"outlined"} label={"Please Install Metamask"} />
                    :
                    <RX.View style={{ height: 50, width: this.props.width * 0.45, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>

                        {!this.state.isLogin ?
                            <UI.Button onPress={this._onPressTodo} iconSlot={iconStyle => (
                                <RX.Image source={ImageSource.fox} style={{ marginTop: 0, alignSelf: 'center', marginRight: 5, width: 14, height: 14 }} />
                            )} style={{ content: [{ width: 250, marginBottom: 5, borderRadius: 11, }], label: _styles.label }
                            } elevation={4} variant={"outlined"} label="Connect with Metamask" />
                            :
                            <RX.View style={{ height: 50, width: this.props.width * 0.40, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                                <UI.Button onPress={this._onPressTodo3} iconSlot={iconStyle => (
                                    <BsFillCollectionFill color={'#FF296D'} style={{ marginTop: 0, alignSelf: 'center', marginRight: 5, width: 14, height: 14 }} />
                                )} style={{ root: [{ marginLeft: 0, height: 35 }], content: [{ width: 180, borderRadius: 11, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }], label: _styles.label }
                                } elevation={4} variant={"outlined"} label="Collections" />
                                <RX.View style={{ width: 10 }}></RX.View>
                                <UI.Button disabled={true} onPress={this._onPressTodo2} iconSlot={iconStyle => (
                                    <RiStore2Line color={'#FF296D'} style={{ marginTop: 0, alignSelf: 'center', marginRight: 5, width: 15, height: 15 }} />
                                )} style={{ root: [{ marginLeft: 0, height: 35 }], content: [{ width: 180, borderRadius: 11, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }], label: _styles.label }
                                } elevation={4} variant={"outlined"} label={"Marketplace"} />


                                <RX.View style={{ width: 10 }}></RX.View>

                            </RX.View>}

                    </RX.View>}
            </RX.View>
        );
    }

    private async onLogOut() {


        CurrentUserStore.setSameSession(true)
        NavContextStore.navigateToTodoList(undefined, false, true)
        CurrentUserStore.setConnect(false)
        CurrentUserStore.setMarketplace(false)
        CurrentUserStore.setLogin(false)
        CurrentUserStore.setConnect(false)
        CurrentUserStore.setMyNfts(false)
        CurrentUserStore.setUser('', '', '', '', '', '', '')


        NavContextStore.navigateToTodoList(undefined, false, true)
        await Moralis.User.logOut();
    }
    private _onPressTodo4 = () => {
        CurrentUserStore.setConnect(false)
        CurrentUserStore.setMarketplace(false)
        CurrentUserStore.setMyNfts(true)
        NavContextStore.navigateToTodoList(undefined, false, true)
    };

    private _onPressTodo3 = () => {
        CurrentUserStore.setConnect(true)
        CurrentUserStore.setMyNfts(false)
        CurrentUserStore.setMarketplace(false)
        NavContextStore.navigateToTodoList(undefined, false, true)
    };
    private _onPressTodo2 = () => {
        CurrentUserStore.setMyNfts(false)
        CurrentUserStore.setConnect(false)
        CurrentUserStore.setMarketplace(true)
        NavContextStore.navigateToTodoList(undefined, false, true)
    };
    private _onPressTodoMetamask = () => {
        RX.Linking.openUrl('https://metamask.io/download.html')
    };
    _onPressTodo = async (e: RX.Types.SyntheticEvent) => {
        e.stopPropagation()
        const chainId2 = 80001;
        const chainName = "POLYGON Mumbai";
        const currencyName = "MATIC";
        const currencySymbol = "MATIC";
        const rpcUrl = "https://speedy-nodes-nyc.moralis.io/d260aa2c8aca7707222e4d3c/polygon/mumbai";
        const blockExplorerUrl = "https://explorer-mumbai.maticvigil.com/";

        await Moralis.addNetwork(
            chainId2,
            chainName,
            currencyName,
            currencySymbol,
            rpcUrl,
            blockExplorerUrl
        ).then(() => CurrentUserStore.setPolygon(true));


        await Moralis.switchNetwork('0x13881');

        return await Moralis.Web3.authenticate().then(async (user: any) => {
            let username = user.get('username')
            let createdAt = user.get('createdAt')
            let sessionToken = user.get('sessionToken')
            let updatedAt = user.get('updatedAt')
            let address = user.get('ethAddress')


            let avatar = user.get('avatar')
            this.loadtems(address)
            this.loadAllItems()
            this.loadOnSaleItems()
            this.getUserNfts()
            this.getMarket()
            this.itemsSoldSubscription()
            this.itemsSubscription()
            this.marketSubscription()

            if (avatar === undefined) {


                CurrentUserStore.setUser(username, '', createdAt, sessionToken, updatedAt, '', address)
                CurrentUserStore.setLogin(true)
                CurrentUserStore.setMyNfts(false)
                CurrentUserStore.setConnect(true)
            } else {

                CurrentUserStore.setUser(username, '', createdAt, sessionToken, updatedAt, avatar, address)
                CurrentUserStore.setLogin(true)
                CurrentUserStore.setMyNfts(false)
                CurrentUserStore.setConnect(true)
            }
        })
    };

    loadAllItems = async () => {
        const ownedItems = await Moralis.Cloud.run('getAllByCollection', { nftContractAddress: '0xD1870765438bE8141DFc789fbD47449C0FB0911e' })

        CurrentUserStore.setAll(ownedItems)


    }
    getUserNfts = async () => {
        const options1 = { chain: 'mumbai', address: '0xfD2B6F391066d8eafa910fe73eA90c197C21D338' };
        const nfts = await Moralis.Web3API.account.getNFTs(options1);

        CurrentUserStore.setTotalNfts(nfts.total)

        CurrentUserStore.setNfts(nfts.result)
    }

    itemsSoldSubscription = async () => {

        const query = new Moralis.Query('SoldItems');
        let subscription = await query.subscribe()

        subscription.on('create', this.onSoldItemCreated)
        if (this.state.sameSession) {
            subscription.unsubscribe()
        }
    }

    marketSubscription = async () => {

        const query = new Moralis.Query('ItemsForSale');
        var subscription = await query.subscribe()


        subscription.on('update', this.onMarketCreated)
        if (this.state.sameSession) {
            subscription.unsubscribe()
        }
    }

    itemsSubscription = async () => {

        const query = new Moralis.Query('Item');
        var subscription = await query.subscribe()
        subscription.on('create', this.onItemCreated)
        if (this.state.sameSession) {
            subscription.unsubscribe()
        }
    }
    getMarket = async () => {

        const ownedItems = await Moralis.Cloud.run('getItemsForSale')


        CurrentUserStore.setTotalMarket(ownedItems.length)
        CurrentUserStore.setItemForMarket(ownedItems)
    }

    loadOnSaleItems = async () => {
        CurrentUserStore.setLoadingAll(true)
        const ownedItems = await Moralis.Cloud.run('getOnSaleItemsByCollection', { nftContractAddress: '0xD1870765438bE8141DFc789fbD47449C0FB0911e' })

        CurrentUserStore.setOnSaleItems(ownedItems)
        CurrentUserStore.setLoadingAll(false)
    }

    onSoldItemCreated = async (item: any) => {
        let user = await Moralis.User.current();
        console.log('onSold')

        if (user) {
            if (user.get("accounts").includes(item.attributes.buyer)) {

                const params = { uid: item.attributes.uid }
                const soldItem = await Moralis.Cloud.run("getItemForSale", params);

                if (soldItem) {


                    CurrentUserStore.setSoldItems(soldItem)



                    const Item = Moralis.Object.extend('Item')
                    const query = await new Moralis.Query(Item);

                    query.equalTo("nftId", soldItem.tokenId);
                    const result = await query.first()
                    if (result) {


                        result.set('price', 0)
                        result.set('ownerAddress', this.state.user.ethAddress)
                        result.set('forSale', false)
                        await result.save().then(() => {
                            var newItem: Item = {
                                fileHash: result.get("fileHash"),
                                filePath: result.get("filePath"),
                                metadataFileHash: result.get("metadataFileHash"),
                                metadataFilePath: result.get("metadataFilePath"),
                                description: result.get("description"),
                                title: result.get("title"),
                                ownerAddress: result.get("ownerAddress"),
                                nftContractAddress: result.get("nftContractAddress"),
                                nftId: result.get("nftId"),
                                createdAt: result.get("createdAt"),
                                price: 0,
                                type: result.get("type"),
                                forSale: false,
                            }

                            NavContextStore.navigateToTodoList(undefined, false, true)
                            CurrentUserStore.removeItemFromMarketplace(item.attributes.uid, soldItem.tokenAddress)

                            CurrentUserStore.removeItemFromOnSale(soldItem.tokenId, soldItem.tokenAddress)
                            CurrentUserStore.setAllItems([], newItem);



                        })
                    }


                }

            }
        }

    }
    onMarketCreated = async (item: any) => {
        const params = { uid: item.attributes.uid }
        const addedItem = await Moralis.Cloud.run('getItemForSale', params);
        if (addedItem) {
            let user = await Moralis.User.current();

            if (user) {
                let newItem: Market = {
                    uid: addedItem.uid,
                    tokenId: addedItem.tokenId,
                    tokenAddress: addedItem.tokenAddress,
                    askingPrice: addedItem.askingPrice,
                    symbol: addedItem.symbol,
                    tokenUri: addedItem.tokenUri,
                    sellerUsername: addedItem.sellerUsername,
                    tokenObjectId: addedItem.tokenObjectId,
                    ownerOf: addedItem.ownerOf,
                }

                CurrentUserStore.setItemForMarket([], newItem)
            }
        }


    }
    onItemCreated = async (item: any) => {
        var newItem: Item = {
            fileHash: item.attributes.fileHash,
            filePath: item.attributes.filePath,
            metadataFileHash: item.attributes.metadataFileHash,
            metadataFilePath: item.attributes.metadataFilePath,
            description: item.attributes.description,
            title: item.attributes.title,
            ownerAddress: item.attributes.ownerAddress,
            nftContractAddress: item.attributes.nftContractAddress,
            nftId: item.attributes.nftId,
            createdAt: item.attributes.createdAt,
            price: item.attributes.price,
            type: item.attributes.type,
            forSale: item.attributes.forSale,
        }

        CurrentUserStore.setAll([], newItem);
        if (newItem.forSale === true) {

            CurrentUserStore.setOnSaleItems([], newItem);
        } else {
            let user = await Moralis.User.current();
            if (user.get('ethAddress') === newItem.ownerAddress) {


                CurrentUserStore.setAllItems([], newItem);
            }
        }

    }
    loadtems = async (add: string) => {
        CurrentUserStore.setLoadingAll(true)
        const ownedItems = await Moralis.Cloud.run('getAllItemsByCollection', { nftContractAddress: '0xD1870765438bE8141DFc789fbD47449C0FB0911e', ownerAddress: add })

        CurrentUserStore.setLoadingAll(false)
        CurrentUserStore.setAllItems(ownedItems)


    }
    private _onPressModal = (e: RX.Types.SyntheticEvent, todoId: string) => {
        e.stopPropagation();

        const dialog = (
            <SimpleDialog
                dialogId={_confirmDeleteDialogId}
                text={''}
                containerStyle={{ alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}
                maxHeight={600}
                maxWidth={400}
                isRegister={this.state.isRegister}

                buttons={[{
                    text: 'Login',
                    onPress: () => {
                        SimpleDialog.dismissAnimated(_confirmDeleteDialogId);

                    },
                }, {
                    text: 'Register',
                    isCancel: false,
                    onPress: () => {

                        CurrentUserStore.setRegister(true)
                    },
                }]}
            />
        );

        RX.Modal.show(dialog, _confirmDeleteDialogId);
    };
    private _onPressBack = (e: RX.Types.SyntheticEvent) => {
        e.stopPropagation();

        if (this.props.onBack) {
            this.props.onBack();
        }
    };

    private _renderBackButton = (isHovering: boolean) => (
        <RX.View style={_styles.backButtonContainer}>
            <RX.Text style={[_styles.backText, isHovering ? _styles.linkTextHover : undefined]}>
                {'Back'}
            </RX.Text>
        </RX.View>
    );


}
