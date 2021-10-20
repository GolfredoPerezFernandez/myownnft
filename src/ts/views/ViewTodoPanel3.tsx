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
interface Nfts {
    token_address: string;
    token_id: string;
    amount: string;
    owner_of: string;
    contract_type: string;
    token_uri: any;
    metadata: Metadata;
}
interface Metadata {
    createdBy: string;
    title: string;
    description: string;
    image: string
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
    todo: Nfts;
    valueInEth: number;
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





const Moralis = require('moralis');
Moralis.initialize("kVVoRWButUY31vShqdGGQmiya4L0n3kF5aRTUVXk");
Moralis.serverURL = 'https://qqdpez4ourk2.moralishost.com:2053/server'


import * as UI from '@sproutch/ui';
export default class ViewTodoPanel3 extends ComponentBase<ViewTodoPanelProps, ViewTodoPanelState> {

    protected _buildState(props: ViewTodoPanelProps, initState: boolean): Partial<ViewTodoPanelState> {



        const newState: Partial<ViewTodoPanelState> = {
            todo: CurrentUserStore.getTodoById4(props.todoId),
            image: CurrentUserStore.getItemImage(),
            title: CurrentUserStore.getItemName(),
            owner: CurrentUserStore.getItemOwner(),
            description: CurrentUserStore.getItemDescription(),
            user: CurrentUserStore.getUser(),
        };


        return newState;


    }
    volume = 0
    isPlaying = false

    handlePlay = () => {
        this.isPlaying = true
    };


    handlePause = () => {

        this.isPlaying = true
    };

    handleVolume(value: any) {
        this.volume = value
    };
    render() {
        console.log('render')
        return (
            <RX.View style={_styles.container}>

                <UI.Paper elevation={10} style={{ root: { marginLeft: 20, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 18, width: 428, height: 408, } }} >

                    <RX.Image style={{ width: 428, height: 660, }} resizeMode={'contain'}
                        source={this.state.todo?.metadata?.image} />


                </UI.Paper>
                <RX.View style={{ flex: 1, marginLeft: 20, justifyContent: 'center', alignItems: 'center', }}>
                    <RX.Text style={_styles.todoText}>
                        {this.state.todo ? "title : " + this.state.todo.metadata.title : ''}
                    </RX.Text>

                    <RX.Text style={_styles.todoText}>
                        {this.state.todo ? "Owner Address: " + this.state.todo.owner_of : ''}
                    </RX.Text>
                    <RX.Text style={_styles.todoText}>
                        {this.state.todo ? "token_id : " + this.state.todo.token_id : ''}
                    </RX.Text>

                    <RX.Text style={_styles.todoText}>
                        {this.state.todo ? "token_address: " + this.state.todo.token_address : ''}
                    </RX.Text>
                    <RX.Text style={_styles.todoText}>
                        {this.state.todo ? "token_uri: " + this.state.todo.token_uri : ''}
                    </RX.Text>

                    <RX.Text style={_styles.todoText}>
                        {this.state.todo ? "contract_type " + this.state.todo.contract_type : ''}
                    </RX.Text>

                    <RX.Text style={_styles.todoText}>
                        {this.state.todo ? "amount " + this.state.todo.amount : ''}
                    </RX.Text>
                    <RX.Text style={_styles.todoText}>
                        {this.state.todo ? "createdBy : " + this.state.todo.metadata.createdBy : ''}
                    </RX.Text>

                    <RX.Text style={_styles.todoText}>
                        {this.state.todo ? "description : " + JSON.stringify(this.state.todo.metadata.description) : ''}
                    </RX.Text>
                    <RX.Text style={_styles.todoText}>
                        {this.state.todo ? "metadata: " + JSON.stringify(this.state.todo?.metadata) : ''}
                    </RX.Text>



                </RX.View>
            </RX.View >
        );
    }

}
