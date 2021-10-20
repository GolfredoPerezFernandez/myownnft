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

import SimpleMenu, { MenuItem } from '../controls/SimpleMenu';
import { Fonts, } from '../app/Styles';

interface AccountMenuButtonState {
    currentUserName: string;
    isHovering: boolean;
}

interface AccountMenuButtonProps {
    onPress: (todoId: string) => void;
}
const _menuPopupId = 'accountMenu';


import { FaWallet } from "@react-icons/all-files/fa/FaWallet";
import * as UI from '@sproutch/ui';
import NavContextStore from '../stores/NavContextStore';
export default class AccountMenuButton extends ComponentBase<AccountMenuButtonProps, AccountMenuButtonState> {
    private _mountedButton: any;

    protected _buildState(props: AccountMenuButtonProps, initState: boolean): Partial<AccountMenuButtonState> | undefined {
        const partialState: Partial<AccountMenuButtonState> = {

        };

        return partialState;
    }

    render(): JSX.Element | null {
        return (

            <UI.Button ref={this._onMountButton} onPress={this._onPress} iconSlot={iconStyle => (
                <FaWallet color={'black'} style={{ marginTop: 0, marginRight: 5, width: 20, height: 20 }} />
            )} style={{ content: [{ width: 120, borderRadius: 11, }], label: { color: 'black', font: Fonts.displayBold } }
            } elevation={4} variant={"outlined"} label="Menu" />


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
                    command: 'home',
                    text: 'Home',
                }, {
                    command: '',
                    text: '-',
                }, {
                    command: 'ico',
                    text: 'Initial Coin Offering',
                }, {
                    command: '',
                    text: '-',
                }, {
                    command: 'swap',
                    text: 'Swap',
                }, {
                    command: '',
                    text: '-',
                }, {
                    command: 'videonft',
                    text: 'Video NFT',
                }, {
                    command: '',
                    text: '-',
                }, {
                    command: 'audionft',
                    text: 'Audio NFT',
                }, {
                    command: '',
                    text: '-',
                }, {
                    command: 'imagenft',
                    text: 'Image NFT',
                }, {
                    command: '',
                    text: '-',
                }, {
                    command: '3dnft',
                    text: '3D Object NFT',
                }];

                return (
                    <SimpleMenu
                        menuItems={items}
                        onSelectItem={this._onSelectMenuItem}
                    />
                );
            },
            dismissIfShown: true,
        }, _menuPopupId);
    };

    private _onSelectMenuItem = (command: string) => {
        RX.Popup.dismiss(_menuPopupId);
        switch (command) {
            case 'home':
                return NavContextStore.navigateToTodoList(undefined, false, true, false, false, false, false, false, false)
            case 'ico':
                return NavContextStore.navigateToTodoList(undefined, false, false, false, false, false, false, false, true)
            case 'swap':
                return NavContextStore.navigateToTodoList(undefined, false, false, true, false, false, false, false, false)
            case 'videonft':
                return NavContextStore.navigateToTodoList(undefined, false, false, false, true);
            case 'audionft':
                return this.props.onPress('audioNFT');
            case 'imagenft':
                return this.props.onPress('imageNFT');
            case '3dnft':
                return this.props.onPress('objectNFT');


            default:
                return NavContextStore.navigateToTodoList(undefined, false, true, false, false, false, false, false, false)
        }

        // TODO - need to implement
    };
}
