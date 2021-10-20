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
import TodoListItem from './TodoListItem';

interface TodoListItemInfo extends VirtualListViewItemInfo {
    todo: Item;
}

export interface TodoListPanelProps extends RX.CommonProps {
    selectedTodoId?: string;
    onSelect: (selectedId: string) => void;
    onCreateNew: () => void;
}

interface TodoListPanelState {
    todos: TodoListItemInfo[];
    activeId: string;
    itemsForSale: number;
    loadingAll: boolean;
    itemsOwned: number;
    itemsAll: number;
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
        color: 'black',
        height: 37,
        width: 380,
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
    forSale: boolean;
    type: string;
}


const Moralis = require('moralis');
Moralis.initialize("kVVoRWButUY31vShqdGGQmiya4L0n3kF5aRTUVXk");
Moralis.serverURL = 'https://qqdpez4ourk2.moralishost.com:2053/server'

import AppConfig from '../app/AppConfig';
import * as UI from '@sproutch/ui';
import CurrentUserStore from '../stores/CurrentUserStore';
import NavContextStore from '../stores/NavContextStore';

export default class TodoListPanel extends ComponentBase<TodoListPanelProps, TodoListPanelState> {
    protected _buildState(props: TodoListPanelProps, initState: boolean): Partial<TodoListPanelState> | undefined {

        const partialState: Partial<TodoListPanelState> = {
            activeId: CurrentUserStore.getActive(),
            itemsForSale: CurrentUserStore.getOnSaleItems().length,
            itemsOwned: CurrentUserStore.getAllItems().length,
            itemsAll: CurrentUserStore.getAll().length,
            loadingAll: CurrentUserStore.getLoadingAll(),
        };
        partialState.todos = CurrentUserStore.getActive() === 'forSale' ? CurrentUserStore.getOnSaleItems().map((todo, i) => ({
            key: i.toString(),
            height: _listItemHeight,
            template: 'todo',
            todo,
        })) : CurrentUserStore.getActive() === 'all' ? CurrentUserStore.getAll().map((todo, i) => ({
            key: i.toString(),
            height: _listItemHeight,
            template: 'todo',
            todo,
        })) : CurrentUserStore.getAllItems().map((todo, i) => ({
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
        return (
            <RX.View useSafeInsets={true} style={_styles.container}>

                <RX.View style={_styles.todoListHeader}>
                    <RX.Text style={_styles.todoNameText} numberOfLines={1}>
                        {'All NFTs'}
                    </RX.Text>
                    <RX.View style={{ flexDirection: 'row', height: 50 }}>

                        <RX.TextInput
                            style={_styles.searchBox}
                            value={this.state.searchString}
                            placeholderTextColor={'black'}
                            autoFocus={!AppConfig.isTouchInterface()}
                            placeholder={'Search Item'}
                            onChangeText={this._onChangeTextSearch}
                            autoCapitalize={'none'}
                        />
                    </RX.View>


                </RX.View>
                <RX.View style={{ flexDirection: 'row', backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                    {this.state.activeId === 'all' ?
                        <UI.Button onPress={() => this.goToAll()} palette='primary' style={{ root: [{}], content: [{ borderRadius: 0, borderWidth: 0, width: 133, backgroundColor: 'gray' }], label: _styles.label }
                        } elevation={4} variant={"outlined"} label={"All " + "(" + this.state.itemsAll + ")"} /> :
                        <UI.Button onPress={() => this.goToAll()} style={{ content: [{ borderRadius: 0, borderWidth: 0, width: 133, backgroundColor: 'white' }], label: _styles.label }
                        } elevation={4} variant={"outlined"} label={"All " + "(" + this.state.itemsAll + ")"} />}

                    {this.state.activeId === 'forSale' ?
                        <UI.Button onPress={() => this.goToForSale()} palette='primary' style={{ root: [{}], content: [{ borderRadius: 0, borderWidth: 0, width: 133, backgroundColor: 'gray' }], label: _styles.label }
                        } elevation={4} variant={"outlined"} label={"For Sale " + "(" + this.state.itemsForSale + ")"} /> :
                        <UI.Button onPress={() => this.goToForSale()} style={{ content: [{ borderRadius: 0, borderWidth: 0, width: 133, backgroundColor: 'white' }], label: _styles.label }
                        } elevation={4} variant={"outlined"} label={"For Sale " + "(" + this.state.itemsForSale + ")"} />}

                    {this.state.activeId === 'owned' ?
                        <UI.Button onPress={() => this.goToMy()} palette={'primary'} style={{ content: [{ borderRadius: 0, borderWidth: 0, width: 133, backgroundColor: 'gray' }], label: _styles.label }
                        } elevation={4} variant={"outlined"} label={"Owned " + "(" + this.state.itemsOwned + ")"} /> :
                        <UI.Button onPress={() => this.goToMy()} style={{ content: [{ borderRadius: 0, width: 133, borderWidth: 0, backgroundColor: 'white', }], label: _styles.label }
                        } elevation={4} variant={"outlined"} label={"Owned " + "(" + this.state.itemsOwned + ")"} />}

                </RX.View>

                {this.state.filteredTodoList === [] || this.state.loadingAll == true ? <UI.Spinner style={{ alignSelf: 'center', }} color={'black'} /> :
                    <VirtualListView
                        itemList={this.state.filteredTodoList}
                        renderItem={this._renderItem}
                        style={_styles.listScroll}
                    />}
            </RX.View>
        );
    }

    async goToAll() {

        NavContextStore.navigateToTodoList()
        CurrentUserStore.setActive('all')
    }
    async goToForSale() {

        NavContextStore.navigateToTodoList()
        CurrentUserStore.setActive('forSale')
    }
    async goToMy() {
        NavContextStore.navigateToTodoList()
        CurrentUserStore.setActive('owned')

    }

    private _filterTodoList(sortedTodos: TodoListItemInfo[], searchString: string): TodoListItemInfo[] {
        const lowerSearchString = searchString.toLowerCase();

        return _.filter(sortedTodos, item => {
            const todoLower = item.todo.title.toLowerCase();
            return todoLower.search(lowerSearchString) >= 0;
        });
    }

    private _renderItem = (details: VirtualListCellRenderDetails<TodoListItemInfo>) => {
        const item = details.item;
        return (
            <TodoListItem
                todo={item.todo}
                height={_listItemHeight}
                isSelected={item.todo.nftId === this.props.selectedTodoId}
                searchString={this.state.searchString}
                onPress={this._onPressTodo}
            />
        );
    };

    private _onChangeTextSearch = (newValue: string) => {
        const filteredTodoList = this._filterTodoList(this.state.todos, newValue.trim());
        this.setState({
            filteredTodoList,
            searchString: newValue,
        });
    };
    private _onPressTodo = (todoId: string) => {
        console.log("todo " + todoId)
        this.props.onSelect(todoId);
        this.setState({
            searchString: '',
            filteredTodoList: this.state.todos,
        });
    };

}
