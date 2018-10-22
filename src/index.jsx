import {trace, toJS, spy, observe, observable, action, computed} from 'mobx';
import React, {Component, Fragment} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {observer, PropTypes as ObservablePropTypes} from 'mobx-react';
//TODO 

//不建议生产环境使用
// spy(event => {
//     console.log(event);
// })

class Todo {
    id = Math.random();
    @observable title = '';
    @observable finished = false;

    constructor(title){
        this.title = title;
    }

    @action.bound toggle() {
        this.finished = !this.finished;
    }
}

class Store {
    @observable todos = [];

    disposers = [];

    constructor(){
        //observe函数返回的是disposer的方法，当disposer被执行后observe就停止监视
        observe(this.todos, change => {
            this.disposers.forEach(disposer => disposer());

            this.disposers = [];

            for(let todo of change.object) {
                var disposer = observe(todo, changex => {
                    // console.log(changex);
                    this.save();
                })

                this.disposers.push(disposer);
            }
            this.save();
            // console.log(change);
        })
    }

    save() {
        localStorage.setItem('todos', JSON.stringify(toJS(this.todos)));
        // console.log(toJS(this.todos));
    }

    @action.bound createTodo(title){
        this.todos.unshift(new Todo(title));
    }

    @action.bound removeTodo(todo){
        //remove并非原生的方法 是mobx在observable的Array提供的
        this.todos.remove(todo);
    }

    @computed get left() {
        return this.todos.filter(todo => !todo.finished).length
    }
}

var store = new Store();

class TodoItem extends Component {
    static propTypes = {
        todo: PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            finished: PropTypes.bool.isRequired
        }).isRequired
    };

    handleClick = (e) => {
        this.props.todo.toggle();
    }

    render() {
        const todo = this.props.todo;
        return <Fragment>
            <input type="checkbox" className="toggle" checked={todo.finished} onChange={this.handleClick} />
            <span className={['title', todo.finished && 'finished'].join(' ')}>{todo.title}</span>
        </Fragment>
    }
}

@observer
class TodoFooter extends Component {
    static propTypes = {};
    render() { trace()
        const left = this.props.left;
        return <footer>{left} item(s) unfinished</footer>
    }
}

@observer
class TodoHeader extends Component {
    static propTypes = {};

    state = {
        inputValue: ''
    }

    handleSubmit = (e) => {
        //阻止默认行为
        e.preventDefault();

        let store = this.props.store;
        let inputValue = this.state.inputValue;

        store.createTodo(inputValue);

        //清空输入框
        this.setState({inputValue: ''});
    }

    handleChange = (e) => {
        let inputValue = e.target.value;

        this.setState({inputValue});
    }

    render() {
        return <header>
        <form onSubmit={this.handleSubmit}>
            <input type="text" onChange={this.handleChange} value={this.state.inputValue} className="input" placeholder="What needs to be finished?"/>
        </form>
    </header>
    }
}

@observer
class TodoView extends Component {
    static propTypes = {};

    render() {
        const todos = this.props.todos;
        return todos.map(todo=>{
            return <li key={todo.id} className="todo-item">
                <TodoItem todo={todo} />
                <span className="delete" onClick={e=>store.removeTodo(todo)}>X</span>
            </li>
        })
    }
}

@observer
class TodoList extends Component {
    //参数类型校验代码
    static propTypes = {
        store: PropTypes.shape({
            createTodo: PropTypes.func,
            //todos是一个可观察的对象
            todos: ObservablePropTypes.observableArrayOf(ObservablePropTypes.observableObject).isRequired
        }).isRequired
    }

    render(){ trace()
        const store = this.props.store;
        const todos = store.todos;

        return <div className="todo-list">
            <TodoHeader store={store} />
            <ul><TodoView todos={todos} /></ul>
            <TodoFooter left={store.left} />
        </div>
    }
}

ReactDOM.render(<TodoList store={store}/>, document.querySelector('#root'))
