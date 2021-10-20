/**
* NavModels.ts
* Copyright: Microsoft 2018
*
* Interface and enumeration definitions used for app navigation.
* A "navigation context" describes a location within the app and
* any associated state that may be expressed within a deep link.
*
* A "view nav context" describes the state of a view.
*
* A "root nav context" describes the nav context for the app's
* root view - the top of the visual hierarchy. Depending on the
* screen size, the root nav context may be stack-based (consisting
* of a stack of individual panels) or composite (in which multiple
* views are displayed side by side).
*/

import * as _ from 'lodash';

export enum NavViewId {
    TodoComposite = 1,
    TodoList,
    TodoList2,
    TodoList3,
    NewTodo,
    ViewTodo,
    ViewTodo2,
    ViewTodo3,
    Home,
    VideoNFT,
    AudioNFT,
    ImageNFT,
    ICO,
    ObjectNFT,
    Swap,
    Profile
}

// ----------------------------------------
// Root nav contexts
// ----------------------------------------
export abstract class RootNavContext {
    constructor(public isStackNav: boolean) {
    }

    abstract clone(): RootNavContext;
}

export abstract class CompositeRootNavContext extends RootNavContext {
    constructor(public viewId: NavViewId) {
        super(false);
    }
}

export class StackRootNavContext extends RootNavContext {
    stack: ViewNavContext[];

    constructor() {
        super(true);
        this.stack = [];
    }

    clone(): StackRootNavContext {
        const clone = new StackRootNavContext();
        _.each(this.stack, navContext => {
            clone.stack.push(navContext.clone());
        });
        return clone;
    }
}

export class TodoRootNavContext extends CompositeRootNavContext {
    todoList: TodoListViewNavContext;
    todoList2: TodoListViewNavContext2;
    todoList3: TodoListViewNavContext3;

    constructor(selectedTodoId?: string, public showNewTodoPanel = false,public showHomePanel = false, public showSwap = false,public showVideoNFT = false, public showAudioNFT = false,public showImageNFT = false,public showObjectNFT = false ,public showICO = false ,public showProfile = false,selectedTodoId2?: string,selectedTodoId3?: string, ) {
        super(NavViewId.TodoComposite);
        this.todoList = new TodoListViewNavContext(selectedTodoId); 
        this.todoList2 = new TodoListViewNavContext2(selectedTodoId2); 
        this.todoList3 = new TodoListViewNavContext3(selectedTodoId3); 

    }

    clone(): TodoRootNavContext {
        return new TodoRootNavContext(this.todoList.selectedTodoId, this.showNewTodoPanel,this.showHomePanel,this.showSwap,this.showVideoNFT,this.showAudioNFT,this.showImageNFT,this.showObjectNFT,this.showICO,this.showProfile,this.todoList2.selectedTodoId2,this.todoList3.selectedTodoId3);
    }
}

// ----------------------------------------
// View nav contexts
// ----------------------------------------

export abstract class ViewNavContext {
    constructor(public viewId: NavViewId) {
    }

    abstract clone(): ViewNavContext;
}

export class TodoListViewNavContext2 extends ViewNavContext {
    constructor(public selectedTodoId2?: string) {
        super(NavViewId.TodoList2);
    }

    clone(): TodoListViewNavContext2 {
        return new TodoListViewNavContext2(this.selectedTodoId2);
    }
}
export class TodoListViewNavContext3 extends ViewNavContext {
    constructor(public selectedTodoId3?: string) {
        super(NavViewId.TodoList3);
    }

    clone(): TodoListViewNavContext2 {
        return new TodoListViewNavContext3(this.selectedTodoId3);
    }
}
export class TodoListViewNavContext extends ViewNavContext {
    constructor(public selectedTodoId?: string) {
        super(NavViewId.TodoList);
    }

    clone(): TodoListViewNavContext {
        return new TodoListViewNavContext(this.selectedTodoId);
    }
}

export class NewTodoViewNavContext extends ViewNavContext {
    constructor() {
        super(NavViewId.NewTodo);
    }

    clone(): NewTodoViewNavContext {
        return new NewTodoViewNavContext();
    }
}

export class ViewTodoViewNavContext3 extends ViewNavContext {
    constructor(public todoId3: string) {
        super(NavViewId.ViewTodo3);
    }

    clone(): ViewTodoViewNavContext3 {
        return new ViewTodoViewNavContext3(this.todoId3);
    }
}
export class ViewTodoViewNavContext2 extends ViewNavContext {
    constructor(public todoId2: string) {
        super(NavViewId.ViewTodo2);
    }

    clone(): ViewTodoViewNavContext2 {
        return new ViewTodoViewNavContext2(this.todoId2);
    }
}
export class ViewTodoViewNavContext extends ViewNavContext {
    constructor(public todoId: string) {
        super(NavViewId.ViewTodo);
    }

    clone(): ViewTodoViewNavContext {
        return new ViewTodoViewNavContext(this.todoId);
    }
}

export class HomeViewNavContext extends ViewNavContext {
    constructor() {
        super(NavViewId.Home);
    }

    clone(): HomeViewNavContext {
        return new HomeViewNavContext();
    }
}


export class VideoNFTViewNavContext extends ViewNavContext {
    constructor() {
        super(NavViewId.VideoNFT);
    }

    clone(): VideoNFTViewNavContext {
        return new VideoNFTViewNavContext();
    }
}



export class AudioNFTViewNavContext extends ViewNavContext {
    constructor() {
        super(NavViewId.AudioNFT);
    }

    clone(): AudioNFTViewNavContext {
        return new AudioNFTViewNavContext();
    }
}


export class ObjectNFTViewNavContext extends ViewNavContext {
    constructor() {
        super(NavViewId.ObjectNFT);
    }

    clone(): ObjectNFTViewNavContext {
        return new ObjectNFTViewNavContext();
    }
}
export class ImageNFTViewNavContext extends ViewNavContext {
    constructor() {
        super(NavViewId.ImageNFT);
    }

    clone(): ImageNFTViewNavContext {
        return new ImageNFTViewNavContext();
    }
}

export class SwapViewNavContext extends ViewNavContext {
    constructor() {
        super(NavViewId.Swap);
    }

    clone(): SwapViewNavContext {
        return new SwapViewNavContext();
    }
}


export class ICOViewNavContext extends ViewNavContext {
    constructor() {
        super(NavViewId.ICO);
    }

    clone(): ICOViewNavContext {
        return new ICOViewNavContext();
    }
}

export class ProfileViewNavContext extends ViewNavContext {
    constructor() {
        super(NavViewId.Profile);
    }

    clone(): ProfileViewNavContext {
        return new ProfileViewNavContext();
    }
}