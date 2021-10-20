/*
* TopBarStack.tsx
* Copyright: Microsoft 2018
*
* Horizontal bar that appears on the top of every view within the app
* when it's using stack-based layout.
*/

import * as RX from 'reactxp';
import { ComponentBase } from 'resub';

import { Colors, Fonts, FontSizes, Styles } from '../app/Styles';
import AccountMenuButton from './AccountMenuButton';

const _styles = {
    background: RX.Styles.createViewStyle({
        alignSelf: 'stretch',
        height: 56,
        borderBottomWidth: 1,
        borderColor: Colors.gray66,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: 20,
    }),
    leftRightContainer: RX.Styles.createViewStyle({
        flexDirection: 'row',
        alignItems: 'center',
        width: 120,
    }),
    titleContainer: RX.Styles.createViewStyle({
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
    }),
    titleText: RX.Styles.createTextStyle({
        flex: -1,
        font: Fonts.displaySemibold,
        fontSize: FontSizes.size16,
        color: Colors.menuText,
        textAlign: 'center',
    }),
    backText: RX.Styles.createTextStyle({
        font: Fonts.displayRegular,
        fontSize: FontSizes.size16,
        color: Colors.menuText,
        margin: 8,
    }),
    backTextHover: RX.Styles.createTextStyle({
        color: Colors.menuTextHover,
    }),
};

export interface TopBarStackProps extends RX.CommonProps {
    title: string;
    onSelect: (selectedId: string) => void;
    showBackButton: boolean;

    onBack?: () => void;
}

import { FaWallet } from "@react-icons/all-files/fa/FaWallet";
import * as UI from '@sproutch/ui';
import CurrentUserStore from '../stores/CurrentUserStore';
export default class TopBarStack extends ComponentBase<TopBarStackProps, RX.Stateless> {
    render(): JSX.Element | null {
        let leftContents: JSX.Element | undefined;
        let rightContents: JSX.Element | undefined;

        leftContents = (<AccountMenuButton onPress={this._onPressTodo} />);
        rightContents = (

            <UI.Button onPress={() => this.login()} iconSlot={iconStyle => (
                <FaWallet color={'black'} style={{ marginTop: 0, marginRight: 5, width: 16, height: 16 }} />
            )} style={{ content: [{ width: 120, borderRadius: 11, }], label: { color: 'black', font: Fonts.displayBold } }
            } elevation={4} variant={"outlined"} label="Connect" />

        );

        return (
            <RX.View style={[_styles.background, Styles.statusBarTopMargin]}>
                <RX.View style={_styles.leftRightContainer}>
                    {leftContents}
                </RX.View>
                <RX.View style={_styles.titleContainer}>
                    <RX.Text style={_styles.titleText} numberOfLines={1}>
                        {this.props.title}
                    </RX.Text>
                </RX.View>
                <RX.View style={_styles.leftRightContainer}>
                    {rightContents}
                </RX.View>
            </RX.View>
        );
    }

    private _onPressTodo = (todoId: string) => {
        this.props.onSelect(todoId);
    };
    async login() {
        const Moralis = require('moralis');
        Moralis.initialize("kVVoRWButUY31vShqdGGQmiya4L0n3kF5aRTUVXk");

        Moralis.serverURL = 'https://qqdpez4ourk2.moralishost.com:2053/server'
        CurrentUserStore.setConnect(true)
        try {

            Moralis.Web3.authenticate().then(() => {


            })
            // Hooray! Let them use the app now.
        } catch (error) {
            // Show the error message somewhere and let the user try again.
            alert("Error: " + error.code + " " + error.message);
        }

    }


}
