/**
* CurrentUserStore.tsx
* Copyright: Microsoft 2018
*
* Singleton store that maintains information about the currently-signed-in user.
*/
interface Item {
    createdAt:string;
    fileHash:string;
    filePath:string;
    metadataFileHash:string;
    metadataFilePath:string;
    description:string;
    title:string;
    ownerAddress:string;
    nftContractAddress:string;
    nftId:string;
    price:number;
    type:string;
    forSale:boolean;
}


interface ItemForSale {
    uid:string,
    tokenId:string,
    tokenAddress:string,
    askingPrice:any,
    symbol:string,
    tokenUri:string,
    ownerOf:string,
    sellerUsername:string,
    sellerAvatar:string,
}

import { autoSubscribe, AutoSubscribeStore, StoreBase } from 'resub';

interface userMoralis{
    username:string;
    email:string;
    createdAt:string;
    sessionToken:string;
    emailVerified:boolean;
    updatedAt:string;
    avatar:string;
    objectId:string;
    ethAddress:string;
}

interface Collection{
    id:string;
    title:string;
    symbol:string;
    cover:string;
    avatar:string;
  nftContractAddress:string;
}
interface Market{
    uid:string;
    tokenId:string;
    tokenAddress:string;
    askingPrice:string;
    symbol:string;
    tokenUri:string;
    ownerOf:string;
    tokenObjectId:any;
    sellerUsername:string;
}
interface Metadata{
    createdBy:string;
    title:string;
    description:string;
    image:string;
}
interface Nfts{
    token_address:string;
    token_id:string;
    amount:string;
    owner_of:string;
    contract_type:string;
    token_uri:any;
    metadata:Metadata;
}
@AutoSubscribeStore
export class CurrentUserStore extends StoreBase {
    // TODO - properly initialize
    private _sideMenu = false

    private _error = ''
    private _username = ''
    private _isMyNfts = false
    private _isConnect = false
    private _isRegister = false
    private _isMarketplace = false
    private _isMetamask = false
    private _users: IdentityModels.User[] = [] 
    
    private _userMoralis: userMoralis = {
        createdAt: '',
        updatedAt: '',
        emailVerified: false,
        sessionToken: '',
        email: '',
        username: '',
        objectId:'',
        avatar:'',
        ethAddress:''
    }
    private _itemId: number = 0
    private _itemMarket: Market[] = []
    private _myNfts: Nfts[] = []
    private _itemSold: Market[] = []
    private _cart: IdentityModels.Post[] = []

    private _collections:Collection[]=[{
        id:'',
        title:"OpenMedia",
        nftContractAddress:"",
        avatar:"",
        cover:"",
         symbol:"OPM"
    }]
    private _itemsForSales:ItemForSale[]=[]
    private _userAll:Item[]=[]
    private _userAllItems:Item[]=[]
    private _userOnSaleItems:Item[]=[]
    private image: string = ''
    
    private _totalNft: number = 0
    private _totalMarket: number = 0
    private _buyer: string = ''
    private _loadingAll = false
    private _sameSession = false
    @autoSubscribe
    getBuyer(): string {
        return this._buyer
    }
    setTotalMarket(total:number) { 
 
        this._totalMarket = total
        this.trigger()
    }
    setTotalNfts(total:number) { 
 
        this._totalNft = total
        this.trigger()
    }
    setSameSession(session:boolean) { 
 
        this._sameSession = session
        this.trigger()
    }
    setBuyer(buyer:string) { 
 
        this._buyer = buyer
        this.trigger()
    }
    setLoadingAll(isMarket:boolean) { 
 
        this._loadingAll = isMarket
        this.trigger()
    }
    
    @autoSubscribe
    getSameSession(): boolean {
        return this._sameSession
    }
    @autoSubscribe
    getLoadingAll(): boolean {
        return this._loadingAll
    }
    @autoSubscribe
    getIsMarketplace(): boolean {
        return this._isMarketplace
    }
    @autoSubscribe
    getItemImage(): string {
        return this.image
    }
    
     arrayRemove(arr:any[], value:any) { 
    
        return arr.filter(function(ele){ 
            return ele != value; 
        });
    }
    
    removeItemFromOnSale(uid:string,address:string) { 
        

       this._userOnSaleItems =  this._userOnSaleItems.filter((value)=>value.nftId!=uid&&value.nftContractAddress!=address);
        this.trigger()
   }
    removeItemFromMarketplace(uid:string,add:string) { 
      
        this._itemMarket =  this._itemMarket.filter((value)=>value.uid!=uid);
        this.trigger()
    }
    @autoSubscribe
    isNfts(): boolean {
        return this._isMyNfts
    }
    
    setMyNfts(isMarket:boolean) { 
 
        this._isMyNfts = isMarket
        this.trigger()
    }

    setMetamask(isMarket:boolean) { 
 
        this._isMetamask = isMarket
        this.trigger()
    }
    setIsMarket(isMarket:boolean) { 
 
        this._isMarketplace = isMarket
        this.trigger()
    }
    setItemImage(item:string) { 
 
        this.image = item
        this.trigger()
    }
    setPolygon(item:boolean) { 
 
        this._isPolygon = item
        this.trigger()
    }
    private itemName: string = ''
    
    private _isPolygon: boolean = false
    @autoSubscribe
    getPolygon(): boolean {
        return this._isPolygon
    }
    @autoSubscribe
    getMetamask(): boolean {
        return this._isMetamask
    }
    @autoSubscribe
    getItemName(): string {
        return this.itemName
    }
    setItemName(name:string) { 
 
        this.itemName = name
        this.trigger()
    }
    
    private itemDescription: string = ''
    
    @autoSubscribe
    getItemDescription(): string {
        return this.itemDescription
    }
    setItemDescription(description:string) { 
 
        this.itemDescription = description
        this.trigger()
    }
    private itemOwner: string = ''
    
    @autoSubscribe
    getItemOwner(): string {
        return this.itemOwner
    }
    setItemOwner(description:string) { 
 
        this.itemOwner = description
        this.trigger()
    }
    @autoSubscribe
    getSoldItems(): Market[] {
        return this._itemSold
    }
    setSoldItems(len: Market[],item?:Market) { 
        if(item){
        this._itemSold.push(item)
    } else {

        this._itemSold = len
    }
        this.trigger()
    }

    
    setNfts(len: any[],item?:Nfts) { 

    if(item){
        this._myNfts.push({
            token_address:item.token_address,
            token_id:item.token_id,
            amount:item.amount,
            owner_of:item.owner_of,
            contract_type:item.contract_type,
            token_uri:item.token_uri,
            metadata:{
                createdBy:JSON.parse(item.metadata.createdBy),
                title:JSON.parse(item.metadata.title),
                description:JSON.parse(item.metadata.description),
                image:JSON.parse(item.metadata.image)
            },
        })
    } else {

        for(let i=0;i<len.length;i++){
            this._myNfts.push({
                token_address:len[i].token_address,
                token_id:len[i].token_id,
                amount:len[i].amount,
                owner_of:len[i].owner_of,
                contract_type:len[i].contract_type,
                token_uri:len[i].token_uri,
                metadata:{
                    createdBy:len[i].metadata.createdBy,
                    title:len[i].metadata.title,
                    description:len[i].metadata.description,
                    image:len[i].metadata.image
                },
            })
        }

    }
        this.trigger()
    }
    setItemForMarket(len: Market[],item?:Market) { 
        if(item){
        this._itemMarket.push(item)
    } else {

        this._itemMarket = len
    }
        this.trigger()
    }
    setItemsForSale(len: [],item?:ItemForSale) { 
        if(item){
        this._itemsForSales.push(item)
    } else {

        this._itemsForSales = len
    }
        this.trigger()
    }
    setOnSaleItems(len: [],item?:Item) { 
        if(item){
        this._userOnSaleItems.push(item)
    } else {

        this._userOnSaleItems = len
    }
        this.trigger()
    }
    @autoSubscribe
    getCollections(): Collection[] {
        return this._collections
    }
    @autoSubscribe
    getMyNfts(): Nfts[] {
        return this._myNfts
    }
    @autoSubscribe
    getTotalMarket(): number {
        return this._totalMarket
    }
    @autoSubscribe
    getTotalNft(): number {
        return this._totalNft
    }
    @autoSubscribe
    getMarket(): Market[] {
        return this._itemMarket
    }
    @autoSubscribe
    getItemsForSale(): ItemForSale[] {
        return this._itemsForSales
    }

    @autoSubscribe
    getUserItems(): Item[] {
        return this._userOnSaleItems
    }

    @autoSubscribe
    getOnSaleItems(): Item[] {
        return this._userOnSaleItems
    }

    @autoSubscribe
    getTodoById3(todoId: string){ 
        return _.find(this._userOnSaleItems, todo => todo.nftId === todoId);
    }

    @autoSubscribe
    getTodoById(todoId: string){ 
        return _.find(this._userAllItems, todo => todo.nftId === todoId);
    }

    @autoSubscribe
    getTodoById2(todoId: string){ 
        return _.find(this._itemMarket, todo => todo.uid === todoId);
    }
    
    @autoSubscribe
    getTodoById4(todoId: string){ 
        return _.find(this._myNfts, todo => todo.token_id === todoId);
    }
    setAll(len: [],item?:Item) {
        if(item){
            this._userAll.push(item)
        } else {

            this._userAll = len
        }
        this.trigger()
    }
    setAllItems(len: [],item?:Item) {
        if(item){
            this._userAllItems.push(item)
        } else {

            this._userAllItems = len
        }
        this.trigger()
    }
    @autoSubscribe
    getItem(nftId: string,nftContractAddress:string): Item|undefined {
        var find = this._userOnSaleItems.filter(function(result:Item) {
            return (result.nftId === nftId &&result.nftContractAddress.toLowerCase()===nftContractAddress);
          });
          return find[0];
    }

    @autoSubscribe
    getAll(): Item[] {
        return this._userAll
    }
    @autoSubscribe
    getAllItems(): Item[] {
        return this._userAllItems
    }

    private activeId2: string = 'all'
    @autoSubscribe
    getActive2() {

        return this.activeId2
    }

    setMarketplace(password: boolean) {
        this.marketplace = password
        this.trigger()
    }
    private marketplace: boolean = false
    @autoSubscribe
    getMarketplace() {

        return this.marketplace
    }
    setActive2(password: string) {
        this.activeId2 = password
        this.trigger()
    }
    private activeId: string = 'all'
    @autoSubscribe
    getActive() {

        return this.activeId
    }

    setActive(password: string) {
        this.activeId = password
        this.trigger()
    }
    private _extension: string = ''
    @autoSubscribe
    getExtension() {

        return this._extension
    }

    setExtension(password: string) {
        this._extension = password
        this.trigger()
    }
    @autoSubscribe
    getIsConnect(): boolean {
        return this._isConnect
    }

    setIsConnect(side: boolean) {
        this._isConnect = side
        this.trigger();

    }
    @autoSubscribe
    getSideMenu(): boolean {
        return this._sideMenu
    }


    setRegister(side: boolean) {
        this._isRegister = side
        this.trigger();

    }
    @autoSubscribe
    getRegister(): boolean {
        return this._isRegister
    }

    setSideMenu(side: boolean) {
        this._sideMenu = side
        this.trigger();

    }
    setConnect(is: boolean) {
        this._isConnect = is
        this.trigger()
    }

    setError(side: string) {
        this._error = side
        this.trigger();

    }

    @autoSubscribe
    getUser(): userMoralis {
        return this._userMoralis
    }
    setUser(username:string,email:string,createdAt:string,sessionToken:string,updatedAt:string,avatar:string,ethAddress:string) { 
       
        this._userMoralis = {
            createdAt,
            updatedAt,
            emailVerified: false,
            sessionToken,
            email,
            username,
            objectId:'',
            avatar ,
            ethAddress,
        };
        console.log(this._userMoralis)
        this.trigger();

    }
    private _isLogin: boolean = false
    @autoSubscribe
    getLogin(): boolean {
        return this._isLogin
    }
    setLogin(user: boolean) {
        this._isLogin = user
        this.trigger();

    }
    @autoSubscribe
    getError(): string {
        return this._error
    }
    setUserName(user: string) {
        this._username = user
        this.trigger();

    }
    @autoSubscribe
    getUserName(): string {
        return this._username
    }

    @autoSubscribe
    getUsers() {

        return this._users
    }


    @autoSubscribe
    getCart() {

        return this._cart
    }
    @autoSubscribe
    getItemId() {
        return this._itemId
    }
}

export default new CurrentUserStore();
/**
* CurrentUserStore.tsx
* Copyright: Microsoft 2018
*
* Singleton store that maintains information about the currently-signed-in user.
*/


import * as _ from 'lodash';
import * as IdentityModels from '../models/IdentityModels';


