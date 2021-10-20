/**
* TodosStore.tsx
* Copyright: Microsoft 2017
*
* Resub Basic Example https://github.com/Microsoft/ReSub
*/

import * as _ from 'lodash';
import { autoSubscribe, AutoSubscribeStore, StoreBase } from 'resub';

import LocalDb from '../app/LocalDb';
import { Todo } from '../models/TodoModels';
@AutoSubscribeStore
class TodosStore extends StoreBase {
    private _todos: Todo[] = [];

    private _todos2: Todo[] = [
        {
            id: "Home",
            creationTime: 0,
            text: "Home",
            _searchTerms: "Home",

        }, {
            id: "About",
            creationTime: 0,
            text: "About MyOwnNFT",
            _searchTerms: "Image NFT",

        }, {
            id: "Get",
            creationTime: 0,
            text: "Get Involve",
            _searchTerms: "Swap Token",

        }, {
            id: "Road",
            creationTime: 0,
            text: "Road Map",
            _searchTerms: "Object NFT",

        }, {
            id: "Partners",
            creationTime: 0,
            text: "Partners",
            _searchTerms: "ICO",

        }, {
            id: "Docs ",
            creationTime: 0,
            text: "Documentation",
            _searchTerms: "Audio NFT",

        }];

    private _extension: string = ''
    @autoSubscribe
    getExtension() {

        return this._extension
    }

    setExtension(password: string) {
        this._extension = password
        this.trigger()
    }
    startup() {

        return LocalDb.getAllTodos().then(todos => {
            this._todos = todos;
        });
    }

    addTodo(todoText: string) {
        const now = Date.now().valueOf();
        const newTodo: Todo = {
            id: now.toString(),
            creationTime: now,
            text: todoText,
            _searchTerms: todoText,
        };

        this._todos = this._todos.concat(newTodo);

        // Asynchronously write the new todo item to the DB.
        LocalDb.putTodo(newTodo);

        this.trigger();

        return newTodo;
    }
    @autoSubscribe
    getTodos3() {

        return this._todos;
    }


    @autoSubscribe
    getTodos2() {
        return this._todos2;
    }

    @autoSubscribe
    getTodos() {

        return this._todos;
    }


    @autoSubscribe
    getTodo2ById(todoId: string) {
        return _.find(this._todos2, todo => todo.id === todoId);
    }
    @autoSubscribe
    getTodoById(todoId: string) {
        return _.find(this._todos, todo => todo.id === todoId);
    }

    deleteTodo(todoId: string) {
        this._todos = _.filter(this._todos, todo => todo.id !== todoId);

        // Asynchronously delete the todo item from the DB.
        LocalDb.deleteTodo(todoId);
        this.trigger();
    }
}

export default new TodosStore();
