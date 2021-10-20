
import { DbProvider } from 'nosqlprovider';
import * as RX from 'reactxp';
import * as SyncTasks from 'synctasks';

import NavContextStore from '../stores/NavContextStore';
import PageUrlService from '../services/PageUrlService';
import ResponsiveWidthStore from '../stores/ResponsiveWidthStore';
import RootView from '../views/RootView';
import ServiceManager, { Service } from '../services/ServiceManager';
import ServiceRegistrar from '../services/ServiceRegistrar';
import TodosStore from '../stores/TodosStore';

import LocalDb from './LocalDb';
import DeepLinkConverter from './DeepLinkConverter';
import AppConfig from './AppConfig';
import CurrentUserStore from '../stores/CurrentUserStore';


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
const Moralis = require('moralis');

Moralis.initialize("kVVoRWButUY31vShqdGGQmiya4L0n3kF5aRTUVXk");
Moralis.serverURL = 'https://qqdpez4ourk2.moralishost.com:2053/server'

export default abstract class AppBootstrapper {
    constructor() {
        RX.App.initialize(__DEV__, __DEV__);

        ServiceRegistrar.init();

        // Open the DB and startup any critical services before displaying the UI.
        LocalDb.open(this._getDbProvidersToTry()).then(() => this._startCriticalServices()).then(() => {
            RX.UserInterface.setMainView(this._renderRootView());

            // Convert the initial URL into a navigation context.
            this._getInitialUrl().then(url => {
                if (url) {
                    const context = DeepLinkConverter.getContextFromUrl(url, NavContextStore.isUsingStackNav());
                    if (context) {
                        NavContextStore.setNavContext(context);
                    }
                }
            });
        });
    }
    async getUser() {

        const isMetaMaskInstalled = await Moralis.isMetaMaskInstalled();


        CurrentUserStore.setLoadingAll(true)
        if (!isMetaMaskInstalled) {
            CurrentUserStore.setConnect(false)
            CurrentUserStore.setLogin(false)
            Moralis.User.logOut();

            CurrentUserStore.setLoadingAll(false)
            CurrentUserStore.setMetamask(false)
        } else {


            CurrentUserStore.setMetamask(true)
            try {
                await Moralis.enable();
                await Moralis.switchNetwork('0x13881');



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
                ).then(() =>
                    CurrentUserStore.setPolygon(true));

                const chainId = await Moralis.getChainId();
                if (chainId == '80001') {




                    CurrentUserStore.setPolygon(true)



                    let user = await Moralis.User.current()
                    if (user) {
                        let username = user.get('username')
                        let createdAt = user.get('createdAt')
                        let sessionToken = user.get('sessionToken')
                        let updatedAt = user.get('updatedAt')
                        let address = user.get('ethAddress')
                        let avatar = user.get('avatar')

                        this.getMarket()
                        this.loadtems(address)
                        this.loadAllItems()
                        this.loadOnSaleItems()
                        this.getUserNfts()
                        this.itemsSubscription()
                        this.marketSubscription()
                        this.itemsSoldSubscription()

                        CurrentUserStore.setLoadingAll(false)
                        if (avatar === undefined) {
                            CurrentUserStore.setConnect(true)
                            CurrentUserStore.setLogin(true)
                            CurrentUserStore.setUser(username, '', createdAt, sessionToken, updatedAt, '', address)
                        } else {

                            CurrentUserStore.setConnect(true)
                            CurrentUserStore.setLogin(true)
                            CurrentUserStore.setUser(username, '', createdAt, sessionToken, updatedAt, avatar, address)

                        }


                    } else {

                        CurrentUserStore.setConnect(false)
                        CurrentUserStore.setLogin(false)
                        CurrentUserStore.setUser('', '', '', '', '', '', '')
                        await Moralis.Web3.authenticate().then(async (user: any) => {
                            let username = user.get('username')
                            let createdAt = user.get('createdAt')
                            let sessionToken = user.get('sessionToken')
                            let updatedAt = user.get('updatedAt')
                            let address = user.get('ethAddress')
                            let avatar = user.get('avatar')

                            this.getMarket()
                            this.loadtems(address)
                            this.loadAllItems()
                            this.loadOnSaleItems()
                            this.getUserNfts()
                            this.itemsSubscription()
                            this.marketSubscription()
                            this.itemsSoldSubscription()

                            CurrentUserStore.setLoadingAll(false)
                            if (avatar === undefined) {


                                CurrentUserStore.setConnect(true)
                                CurrentUserStore.setUser(username, '', createdAt, sessionToken, updatedAt, '', address)
                                CurrentUserStore.setLogin(true)
                                CurrentUserStore.setMyNfts(false)
                            } else {

                                CurrentUserStore.setConnect(true)
                                CurrentUserStore.setUser(username, '', createdAt, sessionToken, updatedAt, avatar, address)
                                CurrentUserStore.setLogin(true)
                                CurrentUserStore.setMyNfts(false)
                            }
                        })
                    }
                } else {
                    CurrentUserStore.setPolygon(false)

                    CurrentUserStore.setLoadingAll(true)
                    CurrentUserStore.setLogin(false)

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
                    ).then(() =>
                        CurrentUserStore.setPolygon(true));

                    await Moralis.onChainChanged(function (res: any) {

                        if (res === '0x13881') {

                            CurrentUserStore.setPolygon(true)
                            CurrentUserStore.setLogin(false)
                            CurrentUserStore.setPolygon(false)
                            CurrentUserStore.setUser('', '', '', '', '', '', '')
                            CurrentUserStore.setMarketplace(false)

                            Moralis.User.logOut();
                        } else {

                            Moralis.User.logOut();

                            CurrentUserStore.setUser('', '', '', '', '', '', '')
                            CurrentUserStore.setMarketplace(false)
                            CurrentUserStore.setLogin(false)
                            CurrentUserStore.setPolygon(false)
                        }
                    })
                    await Moralis.Web3.authenticate().then(async (user: any) => {
                        let username = user.get('username')
                        let createdAt = user.get('createdAt')
                        let sessionToken = user.get('sessionToken')
                        let updatedAt = user.get('updatedAt')
                        let address = user.get('ethAddress')
                        let avatar = user.get('avatar')

                        CurrentUserStore.setConnect(true)
                        this.getMarket()
                        this.loadtems(address)
                        this.loadAllItems()
                        this.loadOnSaleItems()
                        this.getUserNfts()
                        this.itemsSubscription()
                        this.marketSubscription()
                        this.itemsSoldSubscription()
                        CurrentUserStore.setLoadingAll(false)

                        if (avatar === undefined) {


                            CurrentUserStore.setUser(username, '', createdAt, sessionToken, updatedAt, '', address)
                            CurrentUserStore.setLogin(true)
                            CurrentUserStore.setMyNfts(false)
                        } else {

                            CurrentUserStore.setUser(username, '', createdAt, sessionToken, updatedAt, avatar, address)
                            CurrentUserStore.setLogin(true)
                            CurrentUserStore.setMyNfts(false)
                        }
                    })
                }
            } catch {
                CurrentUserStore.setLoadingAll(false)


                Moralis.onChainChanged(function (res: any) {

                    if (res === '0x13881') {

                        CurrentUserStore.setPolygon(true)
                        CurrentUserStore.setLogin(false)
                        CurrentUserStore.setPolygon(false)
                        CurrentUserStore.setUser('', '', '', '', '', '', '')
                        CurrentUserStore.setMarketplace(false)

                        CurrentUserStore.setConnect(false)
                        Moralis.User.logOut();
                    } else {

                        Moralis.User.logOut();

                        CurrentUserStore.setConnect(false)
                        CurrentUserStore.setUser('', '', '', '', '', '', '')
                        CurrentUserStore.setMarketplace(false)
                        CurrentUserStore.setLogin(false)
                        CurrentUserStore.setPolygon(false)
                    }
                })
            }


        }

    }

    async start() {

        await Moralis.enable();
        const isMetaMaskInstalled = await Moralis.isMetaMaskInstalled();


        CurrentUserStore.setLoadingAll(true)
        if (!isMetaMaskInstalled) {
            CurrentUserStore.setConnect(false)
            CurrentUserStore.setLogin(false)
            CurrentUserStore.setUser('', '', '', '', '', '', '')
            CurrentUserStore.setMyNfts(false)

            CurrentUserStore.setLoadingAll(false)
            CurrentUserStore.setMetamask(false)
            Moralis.User.logOut();
        } else {

            CurrentUserStore.setMetamask(true)




            const chainId2 = 80001;
            const chainName = "POLYGON Mumbai";
            const currencyName = "MATIC";
            const currencySymbol = "MATIC";
            const rpcUrl = "https://speedy-nodes-nyc.moralis.io/d260aa2c8aca7707222e4d3c/polygon/mumbai";
            const blockExplorerUrl = "https://explorer-mumbai.maticvigil.com/";

            try {

                await Moralis.switchNetwork('0x13881');
                await Moralis.addNetwork(
                    chainId2,
                    chainName,
                    currencyName,
                    currencySymbol,
                    rpcUrl,
                    blockExplorerUrl
                )
                CurrentUserStore.setPolygon(true);
            } catch {

                CurrentUserStore.setConnect(false)
                CurrentUserStore.setMarketplace(false)
                CurrentUserStore.setLogin(false)
                CurrentUserStore.setConnect(false)
                CurrentUserStore.setMyNfts(false)
                CurrentUserStore.setUser('', '', '', '', '', '', '')
                await Moralis.User.logOut();
                NavContextStore.navigateToTodoList(undefined, false, true)
            }

        }
    }
    private _startCriticalServices(): SyncTasks.Promise<void> {
        const servicesToStart: Service[] = [TodosStore];

        this.start()

        Moralis.onChainChanged(async function (res: any) {
            let user = Moralis.User.current();
            if (user) {

            } else {

                CurrentUserStore.setPolygon(true)
                CurrentUserStore.setUser('', '', '', '', '', '', '')
                CurrentUserStore.setLogin(false)
                CurrentUserStore.setConnect(false)
                CurrentUserStore.setMyNfts(false)
                CurrentUserStore.setMarketplace(false)
                await Moralis.User.logOut();
            }


        })
        if (AppConfig.getPlatformType() === 'web') {
            servicesToStart.push(PageUrlService);
        }

        return ServiceManager.ensureStarted(servicesToStart);
    }
    itemsSoldSubscription = async () => {

        const query = new Moralis.Query('SoldItems');
        let subscription = await query.subscribe()
        subscription.on('create', this.onSoldItemCreated)
    }
    marketSubscription = async () => {

        const query = new Moralis.Query('ItemsForSale');
        let subscription = await query.subscribe()
        subscription.on('update', this.onMarketCreated)
    }
    itemsSubscription = async () => {

        const query = new Moralis.Query('Item');
        let subscription = await query.subscribe()
        subscription.on('create', this.onItemCreated)
    }
    getUserNfts = async () => {
        const options1 = { chain: 'mumbai', address: '0xfD2B6F391066d8eafa910fe73eA90c197C21D338' };
        const nfts = await Moralis.Web3API.account.getNFTs(options1);

        CurrentUserStore.setTotalNfts(nfts.total)

        CurrentUserStore.setNfts(nfts.result)
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
    }

    onSoldItemCreated = async (item: any) => {
        let user = await Moralis.User.current();

        if (user) {
            if (user.get("accounts").includes(item.attributes.buyer)) {

                const params = { uid: item.attributes.uid }
                const soldItem = await Moralis.Cloud.run("getItemForSale", params);

                if (soldItem) {

                    NavContextStore.navigateToTodoList()

                    CurrentUserStore.setSoldItems(soldItem)


                    const object = CurrentUserStore.getItem(soldItem.tokenId, soldItem.tokenAddress)
                    CurrentUserStore.setTotalMarket(CurrentUserStore.getTotalMarket() - 1)
                    CurrentUserStore.removeItemFromMarketplace(item.attributes.uid, soldItem.tokenAddress)

                    CurrentUserStore.removeItemFromOnSale(soldItem.tokenId, soldItem.tokenAddress)
                    const Item = Moralis.Object.extend('Item')
                    const query = await new Moralis.Query(Item);

                    query.equalTo("nftId", soldItem.tokenId);
                    const result = await query.first()
                    if (result) {


                        await result.set('ownerAddress', user.ethAddress)
                        await result.set('forSale', false)
                        await result.save().then(() => {


                        })
                    }
                    if (object) {

                        var newItem: Item = {
                            fileHash: object.fileHash,
                            filePath: object.filePath,
                            metadataFileHash: object.metadataFileHash,
                            metadataFilePath: object.metadataFilePath,
                            description: object.description,
                            title: object.title,
                            ownerAddress: user.ethAddress,
                            nftContractAddress: object.nftContractAddress,
                            nftId: object.nftId,
                            createdAt: object.createdAt,
                            price: object.price,
                            type: object.type,
                            forSale: false,
                        }
                        CurrentUserStore.setAllItems([], newItem);

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


                CurrentUserStore.setTotalMarket(CurrentUserStore.getTotalMarket() + 1)
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
        const ownedItems = await Moralis.Cloud.run('getAllItemsByCollection', { nftContractAddress: '0xD1870765438bE8141DFc789fbD47449C0FB0911e', ownerAddress: add })

        CurrentUserStore.setAllItems(ownedItems)


    }
    loadAllItems = async () => {
        const ownedItems = await Moralis.Cloud.run('getAllByCollection', { nftContractAddress: '0xD1870765438bE8141DFc789fbD47449C0FB0911e' })

        CurrentUserStore.setAll(ownedItems)


    }
    private _renderRootView() {
        return (
            <RootView
                onLayout={this._onLayoutRootView}
            />

        );
    }

    private _onLayoutRootView = (e: RX.Types.ViewOnLayoutEvent) => {
        const { width, height } = e;

        if (width <= 1180) {
            CurrentUserStore.setSideMenu(false)

        }
        ResponsiveWidthStore.putWindowSize(width, height);
    };

    // Subclasses must override.
    protected abstract _getDbProvidersToTry(): DbProvider[];
    protected abstract _getInitialUrl(): SyncTasks.Promise<string | undefined>;
}