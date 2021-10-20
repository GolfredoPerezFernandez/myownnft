/*
* TodoCompositeView.tsx
* Copyright: Microsoft 2018
*
* Main view that provides a composite view of todos on the left and
* details of the selected todo on the right.
*/

import * as RX from 'reactxp';
import { ComponentBase } from 'resub';

import NavContextStore from '../stores/NavContextStore';
import * as NavModels from '../models/NavModels';
import { Colors, Fonts, FontSizes } from '../app/Styles';

import CreateTodoPanel from './CreateTodoPanel';
import TodoListPanel from './TodoListPanel';
import TodoListPanel2 from './TodoListPanel2';
import { InvolveHook } from './InvolveHook';
import ViewTodoPanel from './ViewTodoPanel';
import { HomeHook } from './HomeHook';
import { SwapHook } from './SwapHook';
import { PartnerHook } from './PartnerHook';
import { AboutHook } from './AboutHook';
import TodoListPanel3 from './TodoListPanel3';
import CurrentUserStore from '../stores/CurrentUserStore';
import { RoadHook } from './RoadHook';
import { DocsHook } from './DocsHook';
import { EditProfile } from './EditProfile';
import TodoListPanel4 from './TodoListPanel4';
import ViewTodoPanel2 from './ViewTodoPanel2';
import ViewTodoPanel3 from './ViewTodoPanel3';
import TodoListPanel5 from './TodoListPanel5';

interface Entries {
    img: string;
    imgText: string;
    title: string;
    content: string;
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

export interface TodoCompositeViewProps extends RX.CommonProps {
    navContext: NavModels.TodoRootNavContext;
    entries: Entries[];
    isStackNav: boolean;
    isMarketplace: boolean;
    width: number;
    isConnect: boolean;
    showSideMenu: boolean;
    user: userMoralis
}

interface TodoCompositeViewState {
    activeId: string;
    isMyNFts: boolean;
    isPolygon: boolean;
}

const _styles = {
    label: RX.Styles.createTextStyle({
        font: Fonts.displayBold,
        fontSize: FontSizes.size14,
        color: 'white',
    }),
    viewContainer: RX.Styles.createViewStyle({
        flex: 1,
        alignSelf: 'stretch',
        flexDirection: 'row',
    }),
    leftPanelContainer: RX.Styles.createViewStyle({

        flexDirection: 'column',
    }),
    leftPanelContainer2: RX.Styles.createViewStyle({
        width: 400,
        flexDirection: 'column',
    }),
    rightPanelContainer2: RX.Styles.createViewStyle({
        flex: 1,
        flexDirection: 'column',
        backgroundColor: Colors.grayF8,
    }),
    rightPanelContainer: RX.Styles.createViewStyle({
        flex: 1,
        flexDirection: 'column',
        backgroundColor: Colors.grayF8,
    }),
};


export default class TodoCompositeView extends ComponentBase<TodoCompositeViewProps, TodoCompositeViewState> {
    protected _buildState(props: TodoCompositeViewProps, initState: boolean): Partial<TodoCompositeViewState> | undefined {
        const partialState: Partial<TodoCompositeViewState> = {
            activeId: CurrentUserStore.getActive(),
            isMyNFts: CurrentUserStore.isNfts(),
            isPolygon: CurrentUserStore.getPolygon(),
        };
        return partialState;
    }
    render(): JSX.Element | null {
        return (
            <RX.View style={_styles.viewContainer}>
                <RX.View style={[_styles.leftPanelContainer, { width: this.props.showSideMenu ? 220 : 60 }]}>
                    <TodoListPanel2
                        showSideMenu={this.props.showSideMenu}
                        selectedTodoId={this.props.navContext.todoList.selectedTodoId || ''}
                        onSelect={this._onSelectTodo}
                        onCreateNew={this._onCreateNewTodo}
                    />
                </RX.View>
                {this.state.isMyNFts ? <RX.View style={{
                    width: 350,
                    flexDirection: 'column',
                }}> <TodoListPanel5
                        selectedTodoId={this.props.navContext.todoList3.selectedTodoId3 || ''}
                        onSelect={this._onSelectTodo3}
                        onCreateNew={this._onCreateNewTodo}
                    /></RX.View> : null}
                {this.props.isMarketplace ? <RX.View style={{
                    width: 350,
                    flexDirection: 'column',
                }}> <TodoListPanel4
                        selectedTodoId={this.props.navContext.todoList2.selectedTodoId2 || ''}
                        onSelect={this._onSelectTodo2}
                        onCreateNew={this._onCreateNewTodo}
                    /></RX.View> : null}
                {this.props.isConnect ? <RX.View style={{
                    width: 320,
                    flexDirection: 'column',
                }}> <TodoListPanel3
                        selectedTodoId={this.props.navContext.todoList.selectedTodoId || ''}
                        onSelect={this._onSelectTodo}
                        onCreateNew={this._onCreateNewTodo}
                    /></RX.View> : null}
                <RX.View style={_styles.rightPanelContainer}>
                    {this._renderRightPanel()}
                </RX.View>
                {this.props.isConnect ? <RX.View style={_styles.leftPanelContainer2}>

                    <TodoListPanel
                        selectedTodoId={this.props.navContext.todoList.selectedTodoId || ''}
                        onSelect={this._onSelectTodo}
                        onCreateNew={this._onCreateNewTodo}
                    />
                </RX.View> : null
                }
            </RX.View>
        );
    }

    private _renderRightPanel() {
        if (this.props.navContext.showNewTodoPanel) {
            return (
                <CreateTodoPanel user={this.props.user} />
            );
        } else if (this.props.navContext.showHomePanel) {
            return (
                <HomeHook width={this.props.width} isStackNav={this.props.isStackNav} entries={this.props.entries} />
            );
        } else if (this.props.navContext.todoList.selectedTodoId) {
            return (
                <ViewTodoPanel todoId={this.props.navContext.todoList.selectedTodoId} />
            );
        } else if (this.props.navContext.todoList2.selectedTodoId2) {
            return (
                <ViewTodoPanel2 todoId={this.props.navContext.todoList2.selectedTodoId2} />
            );
        } else if (this.props.navContext.todoList3.selectedTodoId3) {
            return (
                <ViewTodoPanel3 todoId={this.props.navContext.todoList3.selectedTodoId3} />
            );
        } else if (this.props.navContext.showSwap) {
            return (
                <SwapHook />
            );
        } else if (this.props.navContext.showVideoNFT) {
            return (
                <AboutHook />
            );
        } else if (this.props.navContext.showAudioNFT) {
            return (
                <InvolveHook />
            );
        } else if (this.props.navContext.showImageNFT) {
            return (
                <RoadHook />
            );
        } else if (this.props.navContext.showObjectNFT) {
            return (
                <PartnerHook />
            );
        } else if (this.props.navContext.showICO) {
            return (
                <DocsHook />
            );
        } else if (this.props.navContext.showProfile) {
            return (
                <EditProfile />
            );
        } else {
            return <HomeHook width={this.props.width} isStackNav={this.props.isStackNav} entries={this.props.entries} />;
        }
    }

    private _onSelectTodo = (todoId: string) => {
        NavContextStore.navigateToTodoList(todoId, false);
    };

    private _onSelectTodo3 = (todoId: string) => {
        NavContextStore.navigateToTodoList(undefined, false, false, false, false, false, false, false, false, false, undefined, todoId);
    };
    private _onSelectTodo2 = (todoId: string) => {
        NavContextStore.navigateToTodoList(undefined, false, false, false, false, false, false, false, false, false, todoId);
    };
    private _onCreateNewTodo = () => {
        NavContextStore.navigateToTodoList('', true);
    };
}
