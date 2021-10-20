/**
* SimpleDialog.tsx
* Copyright: Microsoft 2018
*
* Defines the contents (including a title and buttons) for
* a dialog box. Typically embedded within an RX.Modal component.
*/

import * as _ from 'lodash';
import * as RX from 'reactxp';
import { ComponentBase } from 'resub';

import KeyCodes from '../utilities/KeyCodes';


import Modal from './Modal';
import { CollectionHook } from '../views/CollectionHook';

export interface SimpleDialogButton {
    text?: string;
    onPress?: () => void;
    buttonStyle?: RX.Types.ButtonStyleRuleSet;
    textStyle?: RX.Types.TextStyleRuleSet;
    isCancel?: boolean;
    isSubmit?: boolean;
    isDisabled?: boolean;
}

// Note: This class is meant to handle only simple dialogs. If you need somewhat more
// complicated behavior, you may be tempted to extend this class. Please don't do this
// because it will no longer be "simple" if everyone adds these tweaks to it. Instead,
// implement your custom logic within your own dialog class.
export interface SimpleDialogProps {
    dialogId: string;

    maxWidth?: number;
    maxHeight?: number;

    containerStyle?: RX.Types.ViewStyleRuleSet;
    children?: RX.Types.ReactNode;
    buttons?: SimpleDialogButton[];
}

interface TodoListItemState {
    isRegister: boolean;
    username: string;
    user: any;
    password: string;
    email: string;
    password2: string;
    error: string
}
const Moralis = require('moralis');
Moralis.initialize("kVVoRWButUY31vShqdGGQmiya4L0n3kF5aRTUVXk");
Moralis.serverURL = 'https://qqdpez4ourk2.moralishost.com:2053/server'


export default class SimpleDialog2 extends ComponentBase<SimpleDialogProps, TodoListItemState> {
    protected _buildState(props: SimpleDialogProps, initState: boolean): Partial<TodoListItemState> | undefined {
        const partialState: Partial<TodoListItemState> = {
            user: Moralis.User.current(),
        };
        return partialState;
    }

    componentDidMount() {
        super.componentDidMount();

        RX.Input.backButtonEvent.subscribe(this._onBack);
        RX.Input.keyUpEvent.subscribe(this._onKeyUp);
    }

    componentWillUnmount() {
        super.componentWillUnmount();

        RX.Input.backButtonEvent.unsubscribe(this._onBack);
        RX.Input.keyUpEvent.unsubscribe(this._onKeyUp);
    }

    render() {
        return (
            <Modal
                modalId={this.props.dialogId}
                modalWidth={this.props.maxWidth || 450}
                modalHeight={this.props.maxHeight}
            >

                <CollectionHook user={this.state.user} />
            </Modal>
        );
    }



    private _completeButtonPress(buttonDef: SimpleDialogButton) {
        if (buttonDef.onPress) {
            buttonDef.onPress();
        }
    }

    private _onKeyUp = (event: RX.Types.KeyboardEvent) => {
        let buttonToCall: SimpleDialogButton | undefined;

        if (event.keyCode === KeyCodes.Escape) {

            Modal.dismissAnimated('delete')
            _.each(this.props.buttons, button => {
                if (button.isCancel) {
                    buttonToCall = button;
                }
            });

            if (buttonToCall) {
                this._completeButtonPress(buttonToCall);
                return true;
            }
        }

        return false;
    };

    private _onBack = () => {
        let buttonToCall: SimpleDialogButton | undefined;

        // Map the hardware back button to "cancel".
        _.each(this.props.buttons, button => {
            if (button.isCancel) {
                buttonToCall = button;
            }
        });

        if (buttonToCall) {
            this._completeButtonPress(buttonToCall);
            return true;
        }

        return false;
    };

    static dismissAnimated(dialogId: string): Promise<void> {
        return Modal.dismissAnimated(dialogId);
    }
}
