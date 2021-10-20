/**
* ViewTodoPanel.tsx
* Copyright: Microsoft 2017
*
* The Todo item edit view.
*/

import * as RX from 'reactxp';
import { ComponentBase } from 'resub';

import { Colors, Fonts, FontSizes } from '../app/Styles';
import CurrentUserStore from '../stores/CurrentUserStore';

export interface ViewTodoPanelProps extends RX.CommonProps {
    todoId: string;
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

interface ViewTodoPanelState {
    image: any;
    title: any;
    user: userMoralis;
    description: any;
    owner: any;
    todo: Market;
}
const _styles = {
    container: RX.Styles.createViewStyle({
        alignSelf: 'stretch',
        justifyContent: 'center',
        flex: 1,
        padding: 20,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'white',
    }),
    todoText: RX.Styles.createTextStyle({
        margin: 3,
        fontSize: FontSizes.size12,
        alignSelf: 'stretch',
        backgroundColor: 'transparent',
    }),
    buttonContainer: RX.Styles.createViewStyle({
        margin: 8,
        alignSelf: 'stretch',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    }),
    label: RX.Styles.createTextStyle({
        font: Fonts.displayLight,
        fontSize: FontSizes.size12,
        color: Colors.menuText,
    })
};



import { RiStore2Line } from "@react-icons/all-files/ri/RiStore2Line";


const Moralis = require('moralis');
Moralis.initialize("kVVoRWButUY31vShqdGGQmiya4L0n3kF5aRTUVXk");
Moralis.serverURL = 'https://qqdpez4ourk2.moralishost.com:2053/server'


import * as UI from '@sproutch/ui';
import * as abi from './abi';
const MARKETPLACE_CONTRACT_ADDRESS = '0x17275DcC4C5b27dA7E7888A304D219e1f9b4B6E0'
export default class ViewTodoPanel2 extends ComponentBase<ViewTodoPanelProps, ViewTodoPanelState> {
    image = ''
    title = ''
    owner = ''
    description = ''
    protected _buildState(props: ViewTodoPanelProps, initState: boolean): Partial<ViewTodoPanelState> {



        const newState: Partial<ViewTodoPanelState> = {
            todo: CurrentUserStore.getTodoById2(props.todoId),
            title: '',
            owner: '',
            description: '',
            user: CurrentUserStore.getUser(),
        };


        return newState;


    }
    volume = 0
    isPlaying = false

    handlePlay = () => {
        this.isPlaying = true
    };

    buyItem = async (item: Market) => {


    };

    handlePause = () => {

        this.isPlaying = true
    };

    handleVolume(value: any) {
        this.volume = value
    };

    render() {
        fetch(this.state.todo?.tokenUri)
            .then(response => response.json())
            .then(data => {

                this.image = data.image

                this.owner = data.createdBy
                this.description = data.description
                this.title = data.title
                this.setState({ image: data.image })
            })


        return (
            <RX.View style={_styles.container}>

                <UI.Paper elevation={10} style={{ root: { marginLeft: 20, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 18, width: 428, height: 408, } }} >

                    <RX.Image style={{ width: 428, height: 660, }} resizeMethod={'resize'} resizeMode={'contain'}
                        source={this.image} />


                </UI.Paper>
                <RX.View style={{ flex: 1, marginLeft: 20, justifyContent: 'center', alignItems: 'center', }}>
                    <RX.Text style={_styles.todoText}>
                        {this.state.todo ? "tokenObjectId: " + this.state.todo?.tokenObjectId : ''}
                    </RX.Text>
                    <RX.Text style={_styles.todoText}>
                        {this.state.todo ? "Owner Address: " + this.state.todo?.ownerOf : ''}
                    </RX.Text>
                    <RX.Text style={_styles.todoText}>
                        {this.state.todo ? "Seller Username: " + this.state.todo?.sellerUsername : ''}
                    </RX.Text>
                    <RX.Text style={_styles.todoText}>
                        {this.state.todo ? "Market ID: " + this.state.todo?.uid : ''}
                    </RX.Text>

                    <RX.Text style={_styles.todoText}>
                        {this.state.todo ? "NFT ID: " + this.state.todo?.tokenId : ''}
                    </RX.Text>
                    <RX.Text style={_styles.todoText}>
                        {this.state.todo ? "Token Address " + this.state.todo?.tokenAddress : ''}
                    </RX.Text>

                    <RX.Text style={_styles.todoText}>
                        {this.state.todo ? "Symbol " + this.state.todo?.symbol : ''}
                    </RX.Text>

                    <RX.Text style={_styles.todoText}>
                        {this.state.todo ? "Avatar " : ''}
                    </RX.Text>

                    <RX.Text style={_styles.todoText}>
                        {this.state.todo ? "Symbol " + this.state.todo?.symbol : ''}
                    </RX.Text>

                    <RX.Text style={_styles.todoText}>
                        {this.state.todo ? "Metadata Uri: " + this.state.todo?.tokenUri : ''}
                    </RX.Text>

                    <RX.Text style={_styles.todoText}>
                        {this.state.todo ? "Name: " + this.title : ''}
                    </RX.Text>

                    <RX.Text style={_styles.todoText}>
                        {this.state.todo ? "Description: " + this.description : ''}
                    </RX.Text>

                    <RX.Text style={_styles.todoText}>
                        {this.state.todo ? "Owner Address: " + this.owner : ''}
                    </RX.Text>


                    <RX.Text style={_styles.todoText}>
                        {this.state.todo ? "Price: " + Moralis.Units.FromWei(this.state.todo?.askingPrice) + " Matic" : ''}
                    </RX.Text>

                    {this.state.todo?.ownerOf === this.state.user.ethAddress ? null :
                        <RX.View style={_styles.buttonContainer}>
                            {this.isLoad === true ? <UI.Spinner color={'black'} /> :
                                <UI.Button onPress={this._onPressTodo2} iconSlot={iconStyle => (
                                    <RiStore2Line color={'#FF296D'} style={{ marginTop: 0, alignSelf: 'center', marginRight: 5, width: 25, height: 25 }} />
                                )} style={{ content: [{ width: 140, borderRadius: 11, }], label: _styles.label }
                                } elevation={4} variant={"outlined"} label={"Buy For: " + Moralis.Units.FromWei(this.state.todo?.askingPrice) + " Matic"} />

                            }

                        </RX.View>
                    }

                </RX.View>
            </RX.View >
        );
    }
    componentDidMount() {


    }
    isLoad = false
    private _onPressTodo2 = async (e: RX.Types.SyntheticEvent) => {
        e.stopPropagation();
        this.isLoad = true
        const user = await Moralis.User.current();
        console.log(user)
        if (user) {
            const web3 = await Moralis.Web3.enable();
            const marketplaceContract = await new web3.eth.Contract(abi.marketplaceContractAbi, MARKETPLACE_CONTRACT_ADDRESS)

            CurrentUserStore.setBuyer(user.username)
            try {

                await marketplaceContract.methods.buyItem(this.state.todo?.uid).send({ from: user.get('ethAddress'), value: this.state.todo?.askingPrice })

                this.isLoad = false
            } catch {
                this.isLoad = false

            }

        } else {
            this.isLoad = false
            return
        }

    };

}
