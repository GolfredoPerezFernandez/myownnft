/**
* CreateTodoPanel.tsx
* Copyright: Microsoft 2017
*
* The Todo item edit view.
*/

import * as RX from 'reactxp';

import TodosStore from '../stores/TodosStore';
import { CreateTodoHook } from './CreateTodoHook';

interface CreateTodoPanelProps extends RX.CommonProps {
    user: userMoralis
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
interface CreateTodoPanelState {
    todoText: string;
    file: File[] | undefined;
    extension: string;
}

export default class CreateTodoPanel extends RX.Component<CreateTodoPanelProps, CreateTodoPanelState> {
    protected _buildState(props: CreateTodoPanelProps, initState: boolean): Partial<CreateTodoPanelState> | undefined {

        let partialState: Partial<CreateTodoPanelState> = {
            extension: TodosStore.getExtension(),
            todoText: ''
        };
        return partialState;
    }

    render() {
        return <CreateTodoHook collection={''} collectionAvatar={''} user={this.props.user} fileExtension={this.state?.extension} _onChangeText={this._onChangeText} />
    }

    private _onChangeText = (newText: string) => {
        this.setState({ todoText: newText });
    };

}
