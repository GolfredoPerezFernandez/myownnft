/*
* TodoListItem.tsx
* Copyright: Microsoft 2018
*
* Renders a list item that represents a todo item.
*/

import * as RX from 'reactxp';
import { ComponentBase } from 'resub';

import HoverButton from '../controls/HoverButton';
import { Fonts, FontSizes } from '../app/Styles';
import { Todo } from '../models/TodoModels';

interface TodoListItemProps extends RX.CommonProps {
    height: number;
    todo: Todo;
    isSelected: boolean;
    showSideMenu: boolean;
    searchString?: string;
    onPress: (todoId: string) => void;
}

interface TodoListItemState {
    heightStyle: RX.Types.ViewStyleRuleSet;
}


const _styles = {
    container: RX.Styles.createButtonStyle({
        alignSelf: 'stretch',
        backgroundColor: 'white',
        flexDirection: 'row',
        paddingLeft: 20,
        alignItems: 'center',
        justifyContent: 'flex-start',
    }),
    todoNameText: RX.Styles.createTextStyle({
        flex: -1,
        fontSize: FontSizes.size16,
        font: Fonts.displayBold,
        color: 'black',
        margin: 8,
    }),
    todoNameTextSelected: RX.Styles.createTextStyle({
        font: Fonts.displaySemibold,
        color: 'white',
    }),
    todoImage: RX.Styles.createImageStyle({
        marginLeft: 16,
        marginRight: 4,
        height: 20,
        width: 24,
    }),
    hovering: RX.Styles.createButtonStyle({
        backgroundColor: '#434040',
    }),
    selected: RX.Styles.createButtonStyle({
        backgroundColor: '#434040',
    }),
};

import { GiThreeFriends } from "@react-icons/all-files/gi/GiThreeFriends";
import { GiBookmark } from "@react-icons/all-files/gi/GiBookmark";
import { AiFillHome } from "@react-icons/all-files/ai/AiFillHome";
import { GiRoad } from "@react-icons/all-files/gi/GiRoad";
import { FaHandshake } from "@react-icons/all-files/fa/FaHandshake";
import { ImVideoCamera } from "@react-icons/all-files/im/ImVideoCamera";
import NavContextStore from '../stores/NavContextStore';
export default class TodoListItem2 extends ComponentBase<TodoListItemProps, TodoListItemState> {
    protected _buildState(props: TodoListItemProps, initState: boolean): Partial<TodoListItemState> | undefined {
        const partialState: Partial<TodoListItemState> = {
            heightStyle: RX.Styles.createViewStyle({
                height: props.height,
            }, false),
        };
        return partialState;
    }

    render(): JSX.Element | null {
        return (
            <HoverButton
                onRenderChild={this._onRenderItem}
                onPress={this._onPress} />
        );
    }

    private _onPress = (e: RX.Types.SyntheticEvent) => {
        // Prevent VirtualListView.onItemSelected from
        // being triggering in the web app.
        e.stopPropagation();
        console.log(this.props.todo.id)
        if (this.props.todo.text === 'Home') {
            NavContextStore.navigateToTodoList(undefined, false, true)
        } else if (this.props.todo.text === 'About MyOwnNFT') {
            NavContextStore.navigateToTodoList(undefined, false, false, false, true, false, false, false, false)
        } else if (this.props.todo.text === 'Get Involve') {
            NavContextStore.navigateToTodoList(undefined, false, false, false, false, true)
        } else if (this.props.todo.text === 'Road Map') {
            NavContextStore.navigateToTodoList(undefined, false, false, false, false, false, true)
        } else if (this.props.todo.text === 'Partners') {
            NavContextStore.navigateToTodoList(undefined, false, false, false, false, false, false, true)
        } else if (this.props.todo.text === 'Documentation') {
            NavContextStore.navigateToTodoList(undefined, false, false, false, false, false, false, false, true)
        } else {
            this.props.onPress(this.props.todo.id);
        }
    };
    private _onRenderItem = (isHovering: boolean) => {
        const buttonStyles = [_styles.container, this.state.heightStyle];
        if (this.props.isSelected) {
            buttonStyles.push(_styles.selected);
        } else if (isHovering) {
            buttonStyles.push(_styles.hovering);
        }

        let nameText: JSX.Element;
        const searchString = this.props.searchString ? this.props.searchString.trim().toLowerCase() : '';
        let searchSubstrIndex = -1;
        if (searchString) {
            searchSubstrIndex = this.props.todo.text.toLowerCase().indexOf(searchString);
        }

        if (searchSubstrIndex >= 0) {
            nameText = (
                <RX.Text style={_styles.todoNameText} numberOfLines={1}>
                    <RX.Text numberOfLines={1}>
                        {this.props.todo.text.substr(0, searchSubstrIndex)}
                    </RX.Text>
                    <RX.Text style={_styles.todoNameTextSelected} numberOfLines={1}>
                        {this.props.todo.text.substr(searchSubstrIndex, searchString.length)}
                    </RX.Text>
                    <RX.Text numberOfLines={1}>
                        {this.props.todo.text.substr(searchSubstrIndex + searchString.length)}
                    </RX.Text>
                </RX.Text>
            );
        } else {
            nameText = (
                <RX.Text style={_styles.todoNameText} numberOfLines={1}>
                    {this.props.todo.text}
                </RX.Text>
            );
        }

        return (
            <RX.View style={buttonStyles}>
                {this.props.todo.text === 'Home' ? <AiFillHome color={'black'} style={{ width: 20, height: 20 }} /> : null}
                {this.props.todo.text === 'About MyOwnNFT' ? <ImVideoCamera color={'black'} style={{ width: 20, height: 20 }} /> : null}
                {this.props.todo.text === 'Get Involve' ? <FaHandshake color={'black'} style={{ width: 20, height: 20 }} /> : null}
                {this.props.todo.text === 'Road Map' ? <GiRoad color={'black'} style={{ width: 20, height: 20 }} /> : null}
                {this.props.todo.text === 'Partners' ? <GiThreeFriends color={'black'} style={{ width: 20, height: 20 }} /> : null}
                {this.props.todo.text === 'Documentation' ? <GiBookmark color={'black'} style={{ width: 20, height: 20 }} /> : null}
                {this.props.showSideMenu ? nameText : null}
            </RX.View>
        );
    };
}
