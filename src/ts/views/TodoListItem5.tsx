/*
* TodoListItem.tsx
* Copyright: Microsoft 2018
*
* Renders a list item that represents a todo item.
*/
import * as RX from 'reactxp';
import { ComponentBase } from 'resub';

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

import HoverButton from '../controls/HoverButton';
import { Fonts, FontSizes } from '../app/Styles';
interface TodoListItemProps extends RX.CommonProps {
    height: number;
    todo: Nfts;
    isSelected: boolean;
    searchString?: string;
    onPress: (todoId: string) => void;
}

interface TodoListItemState {
    heightStyle: RX.Types.ViewStyleRuleSet;
}

const _itemBorderWidth = 1;

const _styles = {
    label: RX.Styles.createTextStyle({
        font: Fonts.displayBold,
        fontSize: FontSizes.size14,
        color: 'black',
    }),
    container: RX.Styles.createButtonStyle({
        alignSelf: 'stretch',
        borderBottomWidth: _itemBorderWidth,
        borderColor: '#2B2B2B',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: "white",
    }),
    todoNameText: RX.Styles.createTextStyle({
        flex: -1,
        fontSize: FontSizes.size16,
        font: Fonts.displayRegular,
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
        height: 60,
        width: 60,
    }),
    hovering: RX.Styles.createButtonStyle({
        backgroundColor: '#434040',
    }),
    selected: RX.Styles.createButtonStyle({
        backgroundColor: '#434040',
    }),
};


export default class TodoListItem5 extends ComponentBase<TodoListItemProps, TodoListItemState> {
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
        this.props.onPress(this.props.todo.token_id);
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
            searchSubstrIndex = this.props.todo.token_id.toLowerCase().indexOf(searchString);
        }

        if (searchSubstrIndex >= 0) {
            nameText = (
                <RX.Text style={_styles.todoNameText} numberOfLines={1}>
                    <RX.Text numberOfLines={1}>
                        {this.props.todo.token_id.substr(0, searchSubstrIndex)}
                    </RX.Text>
                    <RX.Text style={_styles.todoNameTextSelected} numberOfLines={1}>
                        {this.props.todo.token_id.substr(searchSubstrIndex, searchString.length)}
                    </RX.Text>
                    <RX.Text numberOfLines={1}>
                        {this.props.todo.token_id.substr(searchSubstrIndex + searchString.length)}
                    </RX.Text>
                </RX.Text>
            );
        } else {
            nameText = (
                <RX.Text style={_styles.todoNameText} numberOfLines={1}>
                    {this.props.todo.token_id}
                </RX.Text>
            );
        }

        return (
            <RX.View style={buttonStyles}>
                <RX.Image
                    style={_styles.todoImage}
                    source={this.props.todo.metadata.image}
                />
                {nameText}
            </RX.View>
        );
    };
}
