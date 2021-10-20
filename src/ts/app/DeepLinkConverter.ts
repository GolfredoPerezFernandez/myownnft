/*
* DeepLinkConverter.tsx
* Copyright: Microsoft 2018
*
* Converts between app (deep-link) URLs and navigation contexts.
*/

import * as assert from 'assert';

import * as _ from 'lodash';

import NavActions from '../app/NavActions';
import * as NavModels from '../models/NavModels';

import AppConfig from './AppConfig';

const Moralis = require('moralis');

Moralis.initialize("kVVoRWButUY31vShqdGGQmiya4L0n3kF5aRTUVXk");
Moralis.serverURL = 'https://qqdpez4ourk2.moralishost.com:2053/server'

export default class DeepLinkConverter {
    static getUrlFromContext(context: NavModels.RootNavContext): string {
        let url = AppConfig.getFrontendBaseUrl();

        if (context.isStackNav) {
            const stackContext = context as NavModels.StackRootNavContext;
            const topViewContext = stackContext.stack[stackContext.stack.length - 1];

            if (topViewContext instanceof NavModels.TodoListViewNavContext) {
                url += '/collection';
                return url;
            } else if(topViewContext instanceof NavModels.TodoListViewNavContext2) {
                url += '/marketplace';
                return url;
            } else if (topViewContext instanceof NavModels.ViewTodoViewNavContext) {
                url += '/collection?selected=' + encodeURIComponent(topViewContext.todoId);
                return url;
            } else if (topViewContext instanceof NavModels.NewTodoViewNavContext) {
                url += '/collection?selected=new';
                return url;
            } else if (topViewContext instanceof NavModels.ViewTodoViewNavContext2) {
                url += '/marketplace?selected=' + encodeURIComponent(topViewContext.todoId2);
                return url;
            } else if (topViewContext instanceof NavModels.ViewTodoViewNavContext3) {
                url += '/myNfts?selected=' + encodeURIComponent(topViewContext.todoId3);
                return url;
            }  else if (topViewContext instanceof NavModels.HomeViewNavContext) {
                url += '/';
                return url;
            } else if (topViewContext instanceof NavModels.VideoNFTViewNavContext) {
                url += '/roadMap';
                return url;
            }  else if (topViewContext instanceof NavModels.AudioNFTViewNavContext) {
                url += '/involve';
                return url;
            }  else if (topViewContext instanceof NavModels.ImageNFTViewNavContext) {
                url += '/roadMap';
                return url;
            } else if (topViewContext instanceof NavModels.SwapViewNavContext) {
                url += '/swap';
                return url;
            } else if (topViewContext instanceof NavModels.ObjectNFTViewNavContext) {
                url += '/partner';
                return url;
            }else if (topViewContext instanceof NavModels.HomeViewNavContext) {
                url += '/';
                return url;
            } else if (topViewContext instanceof NavModels.ProfileViewNavContext) {
                url += '/profile';
                return url;
            }else if (topViewContext instanceof NavModels.ICOViewNavContext) {
                url += '/docs';
                return url;
            }
        } else {
            const compositeContext = context as NavModels.CompositeRootNavContext;
            if (compositeContext instanceof NavModels.TodoRootNavContext) {
                url += '/';
                const todoListContext = context as NavModels.TodoRootNavContext;
                if (todoListContext.showNewTodoPanel) {
                    url += 'collection?selected=new';
                } else if (todoListContext.todoList.selectedTodoId) {
                    url += 'collection?selected=' + encodeURIComponent(todoListContext.todoList.selectedTodoId);
                } else if (todoListContext.todoList2.selectedTodoId2) {
                    url += 'marketplace?selected=' + encodeURIComponent(todoListContext.todoList2.selectedTodoId2);
                }  else if (todoListContext.todoList3.selectedTodoId3) {
                    url += 'myNfts?selected=' + encodeURIComponent(todoListContext.todoList3.selectedTodoId3);
                }  else if (todoListContext.showVideoNFT) {
                    url += 'about';
                }  else if (todoListContext.showAudioNFT) {
                    url += 'involve';
                }  else if (todoListContext.showImageNFT) {
                    url += 'roadMap';
                }  else if (todoListContext.showObjectNFT) {
                    url += 'partner';
                } else if (todoListContext.showSwap) {
                    url += 'swap';
                } else if (todoListContext.showICO) {
                    url += 'docs';
                }  else if (todoListContext.showHomePanel) {
                    url += '';
                }else if (todoListContext.showProfile) {
                    url += 'profile';
                }
                return url;
            
            } else {
                assert.fail('Unimplemented');
            }
        }

        return '';
    }

    static getContextFromUrl(url: string, isStackNav: boolean): NavModels.RootNavContext | undefined {
        const urlObj = new URL(url);
        if (!urlObj) {
            return undefined;
        }

        const pathElements = _.map(_.split(urlObj.pathname, '/'), elem => decodeURIComponent(elem));
        if (pathElements.length < 2) {
            return undefined;
        }

        switch (pathElements[1]) {
            case 'myNfts':
                var selectedTodoId3: string | undefined;
            

                const selectedValue3 = urlObj.searchParams.get('selected');
              
                    if(selectedValue3){

                    selectedTodoId3 = selectedValue3;
                    }
                return NavActions.createTodoListContext(isStackNav, undefined, false,false,false,false,false,false,false,false,false,undefined,selectedTodoId3);
       
            case 'marketplace':
                var selectedTodoId2: string | undefined;
            

                const selectedValue2 = urlObj.searchParams.get('selected');
              
                    if(selectedValue2){

                    selectedTodoId2 = selectedValue2;
                    }
                return NavActions.createTodoListContext(isStackNav, undefined, false,false,false,false,false,false,false,false,false,selectedTodoId2);
       
            case 'collection':
                
                let selectedTodoId: string | undefined;
                let showNewPanel = false;
                let showroadMapPanel = false;
                let showAudioNFTPanel = false;
                let showImageNFTPanel = false;
                let showObjectNFT = false;
                let showSwap = false;

                let showICO = false;

                const selectedValue = urlObj.searchParams.get('selected');
                let user =  Moralis.User.current();
                console.log("user "+user)
                if(!user){
                    return NavActions.createTodoListContext(isStackNav, undefined, false,true)
                }
              if (selectedValue === 'new') {
                    showNewPanel = true;
                }  else if (selectedValue==='roadMap') {
                    selectedTodoId=undefined;
                    showroadMapPanel = true;
                }  else if (selectedValue==='audioNFT') {
                    selectedTodoId=undefined;

                    showAudioNFTPanel = true;
                } else if (selectedValue==='objectNFT') {
                    showObjectNFT = false;
                } else if (selectedValue==='involve') {
                   
                } else if(selectedValue){

                    selectedTodoId = selectedValue;
                }
                return NavActions.createTodoListContext(isStackNav, selectedTodoId, showNewPanel,showSwap,showroadMapPanel,showAudioNFTPanel,showImageNFTPanel,showObjectNFT,showICO);
         case 'docs':
                  return NavActions.createTodoListContext(isStackNav, undefined, false,false,false,false,false,false,true);
        case 'roadMap':
                    return NavActions.createTodoListContext(isStackNav, undefined, false,false,false,true,false,false,false);
        case 'partner':
                    return NavActions.createTodoListContext(isStackNav, undefined, false,false,false,false,false,false,true);
         case 'about':
                        return NavActions.createTodoListContext(isStackNav, undefined, false,false,false,true,false,false,false);
         case 'involve':
                            return NavActions.createTodoListContext(isStackNav, undefined, false,false,false,false,true,false,false);
         case 'profile':
           return NavActions.createTodoListContext(isStackNav, undefined, false,false,false,false,false,false,false,false,true);
        
        default:
            return NavActions.createTodoListContext(isStackNav, undefined, false,true);
            }
        }
}
