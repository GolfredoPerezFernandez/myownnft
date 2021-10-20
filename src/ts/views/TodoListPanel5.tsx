/**
* TodoListPanel.tsx
* Copyright: Microsoft 2018
*
* Display first screen of the Todo application.
*/

import * as _ from 'lodash';
import * as RX from 'reactxp';
import { VirtualListView, VirtualListViewItemInfo } from 'reactxp-virtuallistview';
import { VirtualListCellRenderDetails } from 'reactxp-virtuallistview/dist/VirtualListCell';
import { ComponentBase } from 'resub';

import { Colors, Fonts, FontSizes } from '../app/Styles';


interface TodoListItemInfo extends VirtualListViewItemInfo {
    todo: Nfts;
}

export interface TodoListPanelProps extends RX.CommonProps {
    selectedTodoId?: string;
    onSelect: (selectedId: string) => void;
    onCreateNew: () => void;
}

interface TodoListPanelState {
    todos: TodoListItemInfo[];
    activeId: string;
    loadingAll: boolean;
    filteredTodoList: TodoListItemInfo[];
    searchString: string;
}

const _listItemHeight = 80;

const _styles = {
    listScroll: RX.Styles.createViewStyle({
        flexDirection: 'column',
        alignSelf: 'stretch',
        backgroundColor: "white",
    }),
    todoListHeader: RX.Styles.createViewStyle({
        height: 100,
        paddingRight: 10,
        borderBottomWidth: 1,
        borderColor: Colors.borderSeparator,
        flexDirection: 'column',
        alignItems: 'flex-start',
    }),
    searchBox: RX.Styles.createTextInputStyle({
        font: Fonts.displayRegular,
        fontSize: FontSizes.size14,
        borderWidth: 1,
        width: 250,
        color: 'black',
        height: 37,
        backgroundColor: 'white',
        borderColor: Colors.borderSeparator,
        flex: 1,
        padding: 4,
        marginHorizontal: 12,
    }),
    container: RX.Styles.createViewStyle({
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: "white",
    }),
    addTodoButton: RX.Styles.createViewStyle({
        margin: 8,
        paddingHorizontal: 8,
        paddingVertical: 4,
        flexDirection: 'row'
    }),
    buttonText: RX.Styles.createTextStyle({
        font: Fonts.displayRegular,
        fontSize: FontSizes.size32,
        lineHeight: 32,
        color: Colors.buttonTextColor,
    }),
    buttonTextHover: RX.Styles.createTextStyle({
        color: Colors.buttonTextHover,
    }),
    titleStyle: RX.Styles.createTextStyle({
        font: Fonts.displayBold,
        fontSize: 24,
        textAlign: 'center',
        color: 'black',
        marginTop: 10,
        alignSelf: 'flex-start'
    }),
    titleStyle2: RX.Styles.createTextStyle({
        font: Fonts.displayBold,
        fontSize: 16,
        textAlign: 'center',
        color: 'black',
        alignSelf: 'center'
    }),
    label: RX.Styles.createTextStyle({
        font: Fonts.displayBold,
        fontSize: FontSizes.size14,
        color: 'black',
    }),
    todoNameText: RX.Styles.createTextStyle({
        flex: -1,
        fontSize: FontSizes.size20,
        font: Fonts.displayBold,
        color: 'black',
        margin: 8,
    }),
};


const Moralis = require('moralis');
Moralis.initialize("kVVoRWButUY31vShqdGGQmiya4L0n3kF5aRTUVXk");
Moralis.serverURL = 'https://qqdpez4ourk2.moralishost.com:2053/server'

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
    image: string;
}
import AppConfig from '../app/AppConfig';

import * as UI from '@sproutch/ui';
import CurrentUserStore from '../stores/CurrentUserStore';
import TodoListItem5 from './TodoListItem5';
export default class TodoListPanel5 extends ComponentBase<TodoListPanelProps, TodoListPanelState> {
    protected _buildState(props: TodoListPanelProps, initState: boolean): Partial<TodoListPanelState> | undefined {
        const partialState: Partial<TodoListPanelState> = {
            activeId: CurrentUserStore.getActive2(),
            loadingAll: CurrentUserStore.getLoadingAll(),
        };


        partialState.todos = CurrentUserStore.getMyNfts().map((todo, i) => ({
            key: i.toString(),
            height: _listItemHeight,
            template: 'todo',
            todo,
        }));

        if (initState) {
            partialState.searchString = '';
            partialState.filteredTodoList = partialState.todos;
        } else {
            const filter = _.trim(partialState.searchString);
            if (filter) {
                partialState.filteredTodoList = this._filterTodoList(partialState.todos, filter);
            } else {
                partialState.filteredTodoList = partialState.todos;
            }
        }

        return partialState;
    }



    render() {
        return (<RX.View useSafeInsets={true} style={_styles.container}>
            <RX.View style={_styles.todoListHeader}>

                <RX.Text style={_styles.todoNameText} numberOfLines={1}>
                    {'My NFTs'}
                </RX.Text>
                <RX.View style={{ flexDirection: 'row', height: 50 }}>
                    <RX.TextInput
                        style={_styles.searchBox}
                        value={this.state.searchString}
                        placeholderTextColor={'black'}
                        autoFocus={!AppConfig.isTouchInterface()}
                        placeholder={'Search in my nfts'}
                        onChangeText={this._onChangeTextSearch}
                        autoCapitalize={'none'}
                    />
                </RX.View>
            </RX.View>


            {this.state.filteredTodoList === [] || this.state.loadingAll == true ? <UI.Spinner style={{ alignSelf: 'center', }} color={'black'} /> : <VirtualListView
                itemList={this.state.filteredTodoList}
                renderItem={this._renderItem}
                style={_styles.listScroll}
            />}



        </RX.View>);
    }

    private _onChangeTextSearch = (newValue: string) => {
        const filteredTodoList = this._filterTodoList(this.state.todos, newValue.trim());
        this.setState({
            filteredTodoList,
            searchString: newValue,
        });
    };

    private _filterTodoList(sortedTodos: TodoListItemInfo[], searchString: string): TodoListItemInfo[] {
        const lowerSearchString = searchString.toLowerCase();

        return _.filter(sortedTodos, item => {
            const todoLower = item.todo.token_address.toLowerCase();
            return todoLower.search(lowerSearchString) >= 0;
        });
    }

    private _renderItem = (details: VirtualListCellRenderDetails<TodoListItemInfo>) => {
        const item = details.item;
        return (
            <TodoListItem5
                todo={item.todo}
                height={_listItemHeight}
                isSelected={item.todo.token_id === this.props.selectedTodoId}
                searchString={this.state.searchString}
                onPress={this._onPressTodo}
            />
        );
    };
    private _onPressTodo = (todoId: string) => {

        let tokenUri = CurrentUserStore.getTodoById2(todoId)?.tokenUri

        if (tokenUri) {

            fetch(tokenUri)
                .then(function (response: any) {

                    return response.json();
                }).then(function (myJson) {
                    console.log(myJson)
                    CurrentUserStore.setItemImage(myJson.image)
                    CurrentUserStore.setItemName(myJson.title)
                    CurrentUserStore.setItemDescription(myJson.description)
                    CurrentUserStore.setItemOwner(myJson.createdBy)
                });
        }
        this.props.onSelect(todoId);
        this.setState({
            searchString: '',
            filteredTodoList: this.state.todos,
        });
    };

}
