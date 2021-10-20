/*
* AccountMenuButton.tsx
* Copyright: Microsoft 2018
*
* Button that displays the currently-signed-in user and provides
* a popup menu that allows the user to sign out, adjust account
* settings, etc.
*/

import * as RX from 'reactxp';
import { ComponentBase } from 'resub';

import SimpleMenu2, { MenuItem } from '../controls/SimpleMenu2';
import { Colors, Fonts, FontSizes, } from '../app/Styles';

const _styles = {
    background: RX.Styles.createViewStyle({
        height: 75,
        width: 300,
        borderBottomWidth: 1,
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    }),
    logoContainer: RX.Styles.createViewStyle({
        flexDirection: 'row',
        marginLeft: 5,
        alignItems: 'flex-start',
    }),
    barControlsContainer: RX.Styles.createViewStyle({
        alignItems: 'center',
        width: 300,
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
        marginLeft: 10,
        color: Colors.logoColor,
    }),
    logoText2: RX.Styles.createTextStyle({
        font: Fonts.displayBold,
        fontSize: FontSizes.size20,
        marginLeft: 0,
        color: '#FF296D',
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
        fontSize: FontSizes.size14,
        color: Colors.menuText,
    })
}
interface AccountMenuButtonState {
    currentUserName: string;
    collection: string;
    isHovering: boolean;
}

interface AccountMenuButtonProps {
    username: string;
    avatar: string;
    onPress: (todoId: string) => void;
}
const _menuPopupId = 'accountMenu';


const Moralis = require('moralis');
Moralis.initialize("kVVoRWButUY31vShqdGGQmiya4L0n3kF5aRTUVXk");
Moralis.serverURL = 'https://qqdpez4ourk2.moralishost.com:2053/server'
const _confirmDeleteDialogId = 'collect'
import * as UI from '@sproutch/ui';
import SimpleDialog2 from '../controls/SimpleDialog2';
export default class AccountMenuButton2 extends ComponentBase<AccountMenuButtonProps, AccountMenuButtonState> {
    private _mountedButton: any;

    protected _buildState(props: AccountMenuButtonProps, initState: boolean): Partial<AccountMenuButtonState> | undefined {
        const partialState: Partial<AccountMenuButtonState> = {
            collection: 'MyOwnNft',
        };

        return partialState;
    }

    render(): JSX.Element | null {
        return (
            <UI.Button ref={this._onMountButton} onPress={this._onPress} iconSlot={iconStyle => (
                <RX.Image style={{ width: 37, backgroundColor: 'black', borderRadius: 11, marginRight: 10, marginLeft: -18, height: 37 }} source={this.props.avatar} />
            )} style={{ content: [{ width: 160, height: 37, justifyContent: 'flex-start', alignItems: 'center', borderRadius: 11, }], label: _styles.label }
            } elevation={4} variant={"outlined"} label={this.state.collection} />


        );
    }

    private _onMountButton = (elem: any) => {
        this._mountedButton = elem;
    };

    private _onPress = (e: RX.Types.SyntheticEvent) => {
        e.stopPropagation();

        RX.Popup.show({
            getAnchor: () => this._mountedButton,
            getElementTriggeringPopup: () => this._mountedButton,
            renderPopup: (anchorPosition: RX.Types.PopupPosition, anchorOffset: number, popupWidth: number, popupHeight: number) => {
                const items: MenuItem[] = [{
                    command: 'newCollection',
                    text: 'Create new Collection +',
                }, {
                    command: 'MyOwnNFT',
                    text: 'MyOwnNFT',
                }];

                return (
                    <SimpleMenu2
                        menuItems={items}
                        onSelectItem={this._onSelectMenuItem}
                    />
                );
            },
            dismissIfShown: true,
        }, _menuPopupId);
    };


    private _onPressModal = () => {
        const dialog = (
            <SimpleDialog2
                dialogId={_confirmDeleteDialogId}
                buttons={[{
                    text: 'Delete',
                    onPress: () => {
                        SimpleDialog2.dismissAnimated(_confirmDeleteDialogId);

                    },
                }, {
                    text: 'Cancel',
                    isCancel: true,
                    onPress: () => {
                        SimpleDialog2.dismissAnimated(_confirmDeleteDialogId);
                    },
                }]}
            />
        );

        RX.Modal.show(dialog, _confirmDeleteDialogId);
    };
    private _onSelectMenuItem = async (command: string) => {
        RX.Popup.dismiss(_menuPopupId);
        switch (command) {
            case 'newCollection':
                return this._onPressModal()

            case 'Log Out':
                return


            default:
                return
        }

        // TODO - need to implement
    };
}
