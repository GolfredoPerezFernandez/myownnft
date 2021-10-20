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


import TodoListItem3 from './TodoListItem3';

interface TodoListItemInfo extends VirtualListViewItemInfo {
    todo: Collection;
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
        width: 320,
        color: 'black',
        marginTop: 5,
        marginBottom: 10,
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
        fontSize: FontSizes.size16,
        font: Fonts.displayBold,
        color: 'black',
    }),
};


interface Collection {
    id: string;
    title: string;
    symbol: string;
    cover: string;
    avatar: string;
    nftContractAddress: string;
}
const Moralis = require('moralis');
Moralis.initialize("kVVoRWButUY31vShqdGGQmiya4L0n3kF5aRTUVXk");
Moralis.serverURL = 'https://qqdpez4ourk2.moralishost.com:2053/server'

interface Item {
    createdAt: string;
    fileHash: string;
    filePath: string;
    metadataFileHash: string;
    metadataFilePath: string;
    collection: string;
    description: string;
    title: string;
    ownerAddress: string;
    nftContractAddress: string;
    nftId: string;
    price: number;
    type: string;
    forSale: boolean;
}
import AppConfig from '../app/AppConfig';

import * as UI from '@sproutch/ui';
import CurrentUserStore from '../stores/CurrentUserStore';
export default class TodoListPanel3 extends ComponentBase<TodoListPanelProps, TodoListPanelState> {
    protected _buildState(props: TodoListPanelProps, initState: boolean): Partial<TodoListPanelState> | undefined {
        const partialState: Partial<TodoListPanelState> = {
            activeId: CurrentUserStore.getActive2(),
            loadingAll: CurrentUserStore.getLoadingAll(),
        };


        partialState.todos = CurrentUserStore.getCollections().map((todo, i) => ({
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

    onItemCreated = async (item: any) => {
        var newItem: Item = {
            fileHash: item.attributes.fileHash,
            filePath: item.attributes.filePath,
            metadataFileHash: item.attributes.metadataFileHash,
            metadataFilePath: item.attributes.metadataFilePath,
            description: item.attributes.description,
            title: item.attributes.title,
            ownerAddress: item.attributes.ownerAddress,
            nftContractAddress: item.attributes.nftContractAddress,
            nftId: item.attributes.nftId,
            createdAt: item.attributes.createdAt,
            price: item.attributes.price,
            type: item.attributes.type,
            forSale: item.attributes.forSale,
            collection: item.attributes.forSale,
        }
        CurrentUserStore.setAllItems([], newItem);

    }


    render() {
        return (<RX.View useSafeInsets={true} style={_styles.container}>

            <RX.View style={_styles.todoListHeader}>

                <RX.View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 50 }}>
                    <RX.Text style={_styles.todoNameText} numberOfLines={2}>
                        {'Collections '}
                    </RX.Text>
                    <UI.Button onPress={this._onPressCreateNewTodo} style={{ content: [{ width: 140, marginLeft: 60, justifyContent: 'center', alignItems: 'center', borderRadius: 11, }], label: _styles.label }
                    } elevation={4} variant={"outlined"} label="+ Create NFT" />

                </RX.View>
                <RX.TextInput
                    style={_styles.searchBox}
                    value={this.state.searchString}
                    placeholderTextColor={'black'}
                    autoFocus={!AppConfig.isTouchInterface()}
                    placeholder={'Search Collection'}
                    onChangeText={this._onChangeTextSearch}
                    autoCapitalize={'none'}
                />
            </RX.View>
            <RX.View style={{ flexDirection: 'row', backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                {this.state.activeId === 'all' ?
                    <UI.Button onPress={() => this.goToAllCollections()} palette='primary' style={{ root: [{}], content: [{ borderRadius: 0, borderWidth: 0, width: 160, backgroundColor: 'gray' }], label: _styles.label }
                    } elevation={4} variant={"outlined"} label="ERC721" /> :
                    <UI.Button onPress={() => this.goToAllCollections()} style={{ content: [{ borderRadius: 0, borderWidth: 0, width: 160, backgroundColor: 'white' }], label: _styles.label }
                    } elevation={4} variant={"outlined"} label="ERC721 " />}

                {this.state.activeId === 'my' ?
                    <UI.Button onPress={() => this.goToMyCollections()} palette={'primary'} style={{ content: [{ borderRadius: 0, borderWidth: 0, width: 160, backgroundColor: 'gray' }], label: _styles.label }
                    } elevation={4} variant={"outlined"} label="ERC1155" /> :
                    <UI.Button onPress={() => this.goToMyCollections()} style={{ content: [{ borderRadius: 0, width: 160, borderWidth: 0, backgroundColor: 'white', }], label: _styles.label }
                    } elevation={4} variant={"outlined"} label="ERC1155" />}

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

    private _onChangeTextSearch = (newValue: string) => {
        const filteredTodoList = this._filterTodoList(this.state.todos, newValue.trim());
        this.setState({
            filteredTodoList,
            searchString: newValue,
        });
    };

    private goToAllCollections = () => {
        CurrentUserStore.setActive2('all')
    };
    private goToMyCollections = () => {
        CurrentUserStore.setActive2('my')
    };

    private _onPressCreateNewTodo = () => {
        this.props.onCreateNew();
        this.setState({
            searchString: '',
            filteredTodoList: this.state.todos,
        });
    };

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
            <TodoListItem3
                todo={item.todo}
                height={_listItemHeight}
                isSelected={item.todo.id === this.props.selectedTodoId}
                searchString={this.state.searchString}
                onPress={this._onPressTodo}
            />
        );
    };

    private _onPressTodo = (todoId: string) => {
        this.props.onSelect(todoId);
        this.setState({
            searchString: '',
            filteredTodoList: this.state.todos,
        });
    };

}
