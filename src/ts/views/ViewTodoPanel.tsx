/**
* ViewTodoPanel.tsx
* Copyright: Microsoft 2017
*
* The Todo item edit view.
*/

import ReactAudioPlayer from 'react-audio-player';
import VideoPlayer from 'react-video-player-extended';
import * as RX from 'reactxp';
import { ComponentBase } from 'resub';

import { Colors, Fonts, FontSizes } from '../app/Styles';
import CurrentUserStore from '../stores/CurrentUserStore';

export interface ViewTodoPanelProps extends RX.CommonProps {
    todoId: string;
}

interface ViewTodoPanelState {
    todo: Item;
    valueInEth: number;
    user: userMoralis;
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
    type: string;
    forSale: boolean;
}

const _styles = {
    container: RX.Styles.createViewStyle({
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 100,
        backgroundColor: 'white',
    }),
    todoText: RX.Styles.createTextStyle({
        margin: 2,
        fontSize: FontSizes.size14,
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
export default class ViewTodoPanel extends ComponentBase<ViewTodoPanelProps, ViewTodoPanelState> {
    protected _buildState(props: ViewTodoPanelProps, initState: boolean): Partial<ViewTodoPanelState> {

        const newState: Partial<ViewTodoPanelState> = {
            todo: CurrentUserStore.getActive() === 'owned' ? CurrentUserStore.getTodoById(props.todoId) : CurrentUserStore.getTodoById3(props.todoId),
            valueInEth: 99999999999999,
            user: CurrentUserStore.getUser(),
        };

        return newState;
    }
    volume = 0
    isPlaying = false

    handlePlay = () => {
        this.isPlaying = true
    };

    async getWei() {
        const web3 = new Moralis.Web3();
        this.setState({
            valueInEth: web3.utils.toWei(this.state.todo.price)
        })
    }

    buyItem = async (item: any) => {
        const web3 = await Moralis.Web3.enable();
        try {
            const marketplaceContract = await new web3.eth.Contract(abi.marketplaceContractAbi, MARKETPLACE_CONTRACT_ADDRESS)

            const user = await Moralis.User.current();
            if (user) {
                await marketplaceContract.methods.buyItem(item.uid).send({ from: user.get('ethAddress'), value: this.state.valueInEth })

            } else {
                return
            }
        } catch {
        }

    };


    handlePause = () => {

        this.isPlaying = true
    };

    handleVolume(value: any) {
        this.volume = value
    };
    render() {
        return (
            <RX.View useSafeInsets={true} style={_styles.container}>

                <RX.Text style={_styles.todoText}>
                    {this.state?.todo ? 'Title: ' + this.state?.todo?.title : ''}
                </RX.Text>
                <RX.Text style={_styles.todoText}>
                    {this.state?.todo ? 'NFT ID: ' + this.state?.todo?.nftId : ''}
                </RX.Text>
                <RX.Text style={_styles.todoText}>
                    {this.state?.todo ? 'Owner Address: ' + this.state?.todo?.ownerAddress : ''}
                </RX.Text>
                <UI.Paper elevation={10} style={{ root: { borderRadius: 18, justifyContent: 'center', alignItems: 'center', height: 428, width: 428, } }} >

                    {this.state?.todo?.type === 'image/png' || this.state?.todo?.type === 'image/jpg' || this.state?.todo?.type === 'image/jpeg' ?
                        <RX.Image style={{ height: 428, width: 428, }} resizeMethod={'auto'} resizeMode={'contain'} source={this.state.todo?.filePath} /> :
                        this.state?.todo?.type === 'video' ?
                            <VideoPlayer
                                url={this.state.todo.filePath}
                                isPlaying={this.isPlaying}
                                volume={this.volume}
                                onPlay={this.handlePlay}
                                onPause={this.handlePause}
                                onVolume={this.handleVolume}
                                height={'428px'}
                                width={'428px'}
                            /> : this.state.todo.type === 'audio' ?
                                <ReactAudioPlayer
                                    src={this.state.todo.filePath}
                                    autoPlay={false}
                                    controls={true}
                                /> : <RX.Text style={_styles.todoText}>
                                    {'No compatible'}
                                </RX.Text>
                    }

                </UI.Paper>

                <RX.Text style={_styles.todoText}>
                    {this.state?.todo ? 'Price: ' + this.state?.todo?.price : ''}
                </RX.Text>
                {this.state?.todo?.forSale === true ? <RX.View style={_styles.buttonContainer}>

                    {this.state.todo.ownerAddress === this.state.user.ethAddress ? null :
                        <RX.View style={_styles.buttonContainer}>
                            <UI.Button onPress={this._onPressTodo2} iconSlot={iconStyle => (
                                <RiStore2Line color={'#FF296D'} style={{ marginTop: 0, alignSelf: 'center', marginRight: 5, width: 25, height: 25 }} />
                            )} style={{ content: [{ width: 140, borderRadius: 11, }], label: _styles.label }
                            } elevation={4} variant={"outlined"} label={"Buy For:" + (this.state.todo.price) + " Matic"} />
                        </RX.View>
                    }
                </RX.View> : null}


            </RX.View>
        );
    }

    private _onPressTodo2 = () => {
        this.buyItem(this.state.todo)
    };
}
