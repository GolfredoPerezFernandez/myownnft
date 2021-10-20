/*
* RootView.tsx
* Copyright: Microsoft 2018
*
* Top-level UI for the TodoList sample app.
*/

import * as assert from 'assert';

import * as _ from 'lodash';
import * as RX from 'reactxp';
import Navigator, { Types as NavTypes } from 'reactxp-navigation';
import { ComponentBase } from 'resub';

import NavContextStore from '../stores/NavContextStore';
import * as NavModels from '../models/NavModels';
import { Colors } from '../app/Styles';

import { PartnerHook } from './PartnerHook';
import { SwapHook } from './SwapHook';
import CreateTodoPanel from './CreateTodoPanel';
import TodoCompositeView from './TodoCompositeView';
import TodoListPanel from './TodoListPanel';
import TopBarComposite from './TopBarComposite';
import TopBarStack from './TopBarStack';
import ViewTodoPanel from './ViewTodoPanel';
import ViewTodoPanel2 from './ViewTodoPanel2';
import ViewTodoPanel3 from './ViewTodoPanel3';
import CurrentUserStore from '../stores/CurrentUserStore';
import { HomeHook } from './HomeHook';

interface RootViewProps extends RX.CommonProps {
    onLayout?: (e: RX.Types.ViewOnLayoutEvent) => void;
}

interface RootViewState {
    entries: Entries[];
    viewTitle: string;
    isStackNav: boolean;
    width: number;
    isConnect: boolean;
    isSideMenu: boolean;
    isPolygon: boolean;
    user: any;
    isMarketplace: boolean;
    isMyNfts: boolean;
    navContext: NavModels.RootNavContext;
}

const _styles = {
    root: RX.Styles.createViewStyle({
        flex: 1,
        alignSelf: 'stretch',
    }),
    root2: RX.Styles.createViewStyle({
        flex: 1,
        backgroundColor: 'black',
        alignSelf: 'stretch',
    }),
    stackViewBackground: RX.Styles.createViewStyle({
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: Colors.white,
    }),
};


interface Entries {
    img: string;
    imgText: string;
    title: string;
    content: string;
}

import ResponsiveWidthStore from '../stores/ResponsiveWidthStore';
import { AboutHook } from './AboutHook';
import { InvolveHook } from './InvolveHook';


const Moralis = require('moralis');
Moralis.initialize("kVVoRWButUY31vShqdGGQmiya4L0n3kF5aRTUVXk");
Moralis.serverURL = 'https://qqdpez4ourk2.moralishost.com:2053/server'

import { RoadHook } from './RoadHook';
import { DocsHook } from './DocsHook';
import { EditProfile } from './EditProfile';
import TodoListPanel4 from './TodoListPanel4';
export default class RootView extends ComponentBase<RootViewProps, RootViewState> {
    private _navigator: Navigator | null = null;

    protected _buildState(props: RootViewProps, initState: boolean): Partial<RootViewState> | undefined {
        const newNavContext = NavContextStore.getNavContext();


        const partialState: Partial<RootViewState> = {
            viewTitle: this._getViewTitle(newNavContext),
            isSideMenu: CurrentUserStore.getSideMenu(),
            navContext: newNavContext,
            isPolygon: CurrentUserStore.getPolygon(),
            user: CurrentUserStore.getUser(),
            isConnect: CurrentUserStore.getIsConnect(),
            width: ResponsiveWidthStore.getWidth(),
            isStackNav: newNavContext.isStackNav,
            isMarketplace: CurrentUserStore.getMarketplace(),
            entries: [
                {
                    img: '',
                    imgText: 'Este puede ser el negocio para ti',
                    title: "asdasd",
                    content: 'Busca entre los negocios afiliados tu favorito'
                },
                {
                    img: '',
                    imgText: 'Escoje el producto deseado',
                    title: "jpñaa",
                    content: 'Descubre el producto que quieras y realiza tu pedido'
                },
                {
                    img: '',
                    imgText: 'Recibelo en tu puerta',
                    title: "asdasd",
                    content: 'La orden te sera entregada rapidamente y a disfrutar!'
                },
            ]
        };

        if (newNavContext.isStackNav) {
            if (this._navigator) {
                const newNavStack = newNavContext as NavModels.StackRootNavContext;
                let mustResetRouteStack = true;

                if (this.state.navContext && this.state.navContext.isStackNav) {
                    const prevNavStack = this.state.navContext as NavModels.StackRootNavContext;

                    if (newNavStack.stack.length === prevNavStack.stack.length + 1) {
                        if (this._compareNavStack(newNavStack.stack, prevNavStack.stack, prevNavStack.stack.length)) {
                            this._navigator.push(this._createNavigatorRoute(newNavStack.stack[newNavStack.stack.length - 1].viewId));
                            mustResetRouteStack = false;
                        }
                    } else if (newNavStack.stack.length === prevNavStack.stack.length - 1) {
                        if (this._compareNavStack(newNavStack.stack, prevNavStack.stack, newNavStack.stack.length)) {
                            this._navigator.pop();
                            mustResetRouteStack = false;
                        }
                    }
                }

                if (mustResetRouteStack) {
                    this._navigator.immediatelyResetRouteStack(this._createNavigatorRouteStack(newNavStack));
                }
            }
        }
        return partialState;
    }

    render(): JSX.Element | null {
        if (this.state.navContext.isStackNav) {
            return (
                <RX.View style={_styles.root} onLayout={this.props.onLayout}>
                    <Navigator
                        ref={this._onMountNavigator}
                        renderScene={this._onRenderScene}
                    />
                </RX.View>
            );
        } else {
            const compositeContext = this.state.navContext as NavModels.CompositeRootNavContext;
            const showBackButton = this._showBackButton(compositeContext.viewId);
            const showSideMenu = this._showSideMenu();

            return (

                <RX.View style={_styles.root} onLayout={this.props.onLayout}>
                    <TopBarComposite isMarketplace={this.state.isMarketplace} user={this.state.user} width={this.state.width} showSideMenu={showSideMenu} showBackButton={showBackButton} onBack={this._onBack} />

                    {this._renderMainView()}

                </RX.View>
            );
        }
    }
    private _showSideMenu(): boolean {
        return this.state.isSideMenu
    }


    private _showBackButton(viewId: NavModels.NavViewId): boolean {
        return viewId !== NavModels.NavViewId.TodoComposite &&
            viewId !== NavModels.NavViewId.TodoList;
    }
    private _getViewTitle(navContext: NavModels.RootNavContext): string {
        if (navContext.isStackNav) {
            const stackContext = navContext as NavModels.StackRootNavContext;
            const topViewId = stackContext.stack[stackContext.stack.length - 1].viewId;

            switch (topViewId) {
                case NavModels.NavViewId.TodoList:
                    return 'Todo List';
                case NavModels.NavViewId.ViewTodo2:
                    return 'Marketplace';
                case NavModels.NavViewId.ViewTodo3:
                    return 'MY Nfts';

                case NavModels.NavViewId.Home:
                    return 'Home';

                case NavModels.NavViewId.NewTodo:
                    return 'New Todo';

                case NavModels.NavViewId.ViewTodo:
                    return 'Todo Details';
                case NavModels.NavViewId.VideoNFT:
                    return 'Video NFT';
                case NavModels.NavViewId.AudioNFT:
                    return 'Audio NFT';
                case NavModels.NavViewId.ImageNFT:
                    return 'Image NFT';
                case NavModels.NavViewId.Swap:
                    return 'Swap';
                case NavModels.NavViewId.Profile:
                    return 'Profile';
                case NavModels.NavViewId.ICO:
                    return 'Docs';
                default:
                    assert.fail('Unknown view');
                    return '';
            }
        } else {
            return '';
        }
    }

    private _onMountNavigator = (elem: any) => {
        this._navigator = elem;

        if (this._navigator) {
            this._navigator.immediatelyResetRouteStack(this._createNavigatorRouteStack(
                this.state.navContext as NavModels.StackRootNavContext));
        }
    };

    private _onRenderScene = (navigatorRoute: NavTypes.NavigatorRoute): JSX.Element | null => {
        const viewId = navigatorRoute.routeId as NavModels.NavViewId;
        const showBackButton = this._showBackButton(viewId);

        return (
            <RX.View style={_styles.stackViewBackground}>
                <TopBarStack
                    title={this.state.viewTitle}
                    showBackButton={showBackButton}
                    onBack={this._onBack}

                    onSelect={this._onSelectTodoFromList}
                />
                {this._renderSceneContents(viewId)}
            </RX.View>
        );
    };

    private _renderSceneContents(viewId: NavModels.NavViewId) {
        switch (viewId) {
            case NavModels.NavViewId.TodoList:
                return (
                    <TodoListPanel
                        onSelect={this._onSelectTodoFromList}
                        onCreateNew={this._onCreateNewTodo}
                    />
                );
            case NavModels.NavViewId.TodoList2:
                return (
                    <TodoListPanel4
                        onSelect={this._onSelectTodoFromList2}
                        onCreateNew={this._onCreateNewTodo}
                    />
                );
            case NavModels.NavViewId.ICO:
                return <DocsHook />;
            case NavModels.NavViewId.NewTodo:
                return <CreateTodoPanel user={this.state.user} />;
            case NavModels.NavViewId.ObjectNFT:
                return <PartnerHook />;
            case NavModels.NavViewId.Swap:
                return <SwapHook />;
            case NavModels.NavViewId.VideoNFT:
                return <AboutHook />;

            case NavModels.NavViewId.Profile:
                return <EditProfile />;
            case NavModels.NavViewId.AudioNFT:
                return <InvolveHook />;
            case NavModels.NavViewId.ImageNFT:
                return <RoadHook />;
            case NavModels.NavViewId.Home:
                return <HomeHook width={this.state.width} isStackNav={this.state.isStackNav} entries={this.state.entries} />;
            case NavModels.NavViewId.ViewTodo:
                const viewContext = this._findNavContextForRoute(viewId) as NavModels.ViewTodoViewNavContext;
                if (!viewContext) {
                    return null;
                }
                return <ViewTodoPanel todoId={viewContext.todoId} />;
            case NavModels.NavViewId.ViewTodo2:
                const viewContext2 = this._findNavContextForRoute(viewId) as NavModels.ViewTodoViewNavContext2;
                if (!viewContext2) {
                    return null;
                }
                return <ViewTodoPanel2 todoId={viewContext2.todoId2} />;
            case NavModels.NavViewId.ViewTodo3:
                const viewContext3 = this._findNavContextForRoute(viewId) as NavModels.ViewTodoViewNavContext3;
                if (!viewContext3) {
                    return null;
                }
                return <ViewTodoPanel3 todoId={viewContext3.todoId3} />;

            default:
                return <HomeHook width={this.state.width} isStackNav={this.state.isStackNav} entries={this.state.entries} />;
        }
    }

    private _onSelectTodoFromList = (selectedId: string) => {
        NavContextStore.navigateToTodoList(selectedId, false);
    };
    private _onSelectTodoFromList2 = (selectedId: string) => {
        console.log("root " + selectedId)
        NavContextStore.navigateToTodoList(undefined, false, false, false, false, false, false, false, false, false, selectedId);
    };

    private _onCreateNewTodo = () => {
        NavContextStore.navigateToTodoList(undefined, true);
    };

    private _onBack = () => {
        if (this.state.navContext.isStackNav) {
            NavContextStore.popNavigationStack();
        }
    };

    private _renderMainView(): JSX.Element | null {
        if (this.state.navContext instanceof NavModels.TodoRootNavContext) {
            return <TodoCompositeView isMarketplace={this.state.isMarketplace} user={this.state.user} width={this.state.width} isStackNav={this.state.isStackNav} isConnect={this.state.isConnect} entries={this.state.entries} showSideMenu={this.state.isSideMenu} navContext={this.state.navContext} />;
        } else {
            assert.fail('Unexpected main view type');
            return null;
        }
    }

    private _createNavigatorRouteStack(stackContext: NavModels.StackRootNavContext): NavTypes.NavigatorRoute[] {
        return _.map(stackContext.stack, (viewContext, index) => this._createNavigatorRoute(viewContext.viewId));
    }

    private _createNavigatorRoute(viewId: NavModels.NavViewId): NavTypes.NavigatorRoute {
        return {
            routeId: viewId,
            sceneConfigType: NavTypes.NavigatorSceneConfigType.FloatFromRight,
        };
    }

    private _findNavContextForRoute(routeId: number) {
        assert.ok(this.state.navContext.isStackNav);

        const stackContext = this.state.navContext as NavModels.StackRootNavContext;
        return _.find(stackContext.stack, (viewContext: NavModels.ViewNavContext) => viewContext.viewId === routeId);
    }

    private _compareNavStack(stackA: NavModels.ViewNavContext[], stackB: NavModels.ViewNavContext[], count: number): boolean {
        for (let i = 0; i < count; i++) {
            if (stackA[i].viewId !== stackB[i].viewId) {
                return false;
            }
        }

        return true;
    }
}
