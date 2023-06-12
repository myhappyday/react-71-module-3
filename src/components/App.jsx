import React, { Component } from 'react';
// import ReactPlayer from 'react-player';
import { nanoid } from 'nanoid';

import TodoList from './TodoList';
import initialTodos from '../../src/todos.json';
import Container from './Container';
import TodoEditor from './TodoEditor';
import TodoFilter from './TodoFilter/TodoFilter';

import Modal from './Modal';
import IconButton from './IconButton';
import { ReactComponent as AddIcon } from './icons/add.svg';

import VideoList from './VideoList';
import Player from './Player';
import videos from '../../src/videos.json';
import { Reader } from './Reader/Reader';
import publications from '../../src/publications.json';

import { ToastContainer } from 'react-toastify';
import PokemonForm from './Pokemon/PokemonForm';
import PokemonInfo from './Pokemon/PokemonInfo';

// import Clock from './Clock';
// import Tabs from './Tabs';
// import tabs from '../../src/tabs.json';

class App extends Component {
  state = {
    // todos: initialTodos,
    todos: [],
    filter: '',
    showModal: false,
    selectedVideo: null,
    pokemonName: '',
  };

  componentDidMount() {
    // console.log('App componentDidMount');

    const todos = localStorage.getItem('todos');
    const parsedTodos = JSON.parse(todos);

    // console.log('todos:', todos);
    // console.log('parsedTodos:', parsedTodos);

    // setTimeout(() => {
    //   console.log('todos:', todos);
    //   console.log('parsedTodos:', parsedTodos);
    // }, 2000);

    if (parsedTodos) {
      // Запис даних з localStorage в state
      this.setState({ todos: parsedTodos });
      return;
    }
    this.setState({ todos: initialTodos });

    // this.setState({ todos: parsedTodos });
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log('App componentDidUpdate');
    // console.log('prevState:', prevState);
    // console.log('this.state:', this.state);

    const nextTodos = this.state.todos;
    const prevTodos = prevState.todos;

    if (nextTodos !== prevTodos) {
      // console.log('Updated "todos" field, "todos" written to storage');

      // Збереження даних зі state в localStorage
      localStorage.setItem('todos', JSON.stringify(nextTodos));
    }
    // 1-й варіант логіки зв'язування додавання todo і закриття модального вікна (менш зв'язана логіка, але більше коду і перевірок)
    if (nextTodos.length > prevTodos.length && prevTodos.length !== 0) {
      this.toggleModal();
    }
  }

  addTodo = text => {
    const todo = {
      id: nanoid(4),
      text,
      completed: false,
    };

    // this.setState(prevState => ({
    //   todos: [todo, ...prevState.todos],
    // }));

    // Деструктуризація prevState.todos
    this.setState(({ todos }) => ({
      todos: [todo, ...todos],
    }));
    // console.log('text:', text);

    // 2-й варіант логіки зв'язування додавання todo і закриття модального вікна (менше коду, але жорстко зв'язана логіка)
    // this.toggleModal();
  };

  deleteTodo = todoId => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== todoId),
    }));
  };

  toggleCompleted = todoId => {
    // console.log('todoId:', todoId);
    // this.setState(prevState => ({
    //   todos: prevState.todos.map(todo => {
    //     if (todo.id === todoId) {
    //       console.log('Find todo!');
    //       return {
    //         ...todo,
    //         completed: !todo.completed,
    //       };
    //     }

    //     return todo;
    //   }),
    // }));

    // Another way
    this.setState(({ todos }) => ({
      todos: todos.map(todo =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      ),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleTodos = () => {
    const { filter, todos } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return todos.filter(todo =>
      todo.text.toLowerCase().includes(normalizedFilter)
    );
  };

  calculateCompletedTodos = () => {
    const { todos } = this.state;

    return todos.reduce(
      (total, todo) => (todo.completed ? total + 1 : total),
      0
    );
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  selectVideo = link => {
    this.setState({ selectedVideo: link });
  };

  handleFormSubmit = pokemonName => {
    this.setState({ pokemonName });
  };

  render() {
    // console.log('App render');
    const { todos, filter, showModal } = this.state;

    // Значення, що обчислюються
    const totalTodoCount = todos.length;
    const completedTodoCount = this.calculateCompletedTodos();
    const visibleTodos = this.getVisibleTodos();

    return (
      <Container>
        <h1>Життєвий цикл. HTTP-запити.</h1>

        <h2 style={{ color: 'indigo' }}>Pokemon</h2>
        <div style={{ maxWidth: 1170, margin: '0 auto', padding: 20 }}>
          <PokemonForm onSubmit={this.handleFormSubmit} />
          <PokemonInfo pokemonName={this.state.pokemonName} />
          <ToastContainer autoClose={3000} />
        </div>

        <h2 style={{ color: 'indigo' }}>Player</h2>
        <div style={{ padding: 24 }}>
          <h1>Selected video: {this.state.selectedVideo}</h1>
          <VideoList videos={videos} onSelect={this.selectVideo} />
          <Player url={this.state.selectedVideo} />
        </div>

        <h2 style={{ color: 'indigo' }}>Reader</h2>
        <Reader items={publications} />

        {/* <h2 style={{ color: 'indigo' }}>Tabs</h2>
        <Tabs items={tabs} /> */}

        {/* <h2 style={{ color: 'indigo' }}>Clock</h2>
        {showModal && <Clock />}
        <button type="button" onClick={this.toggleModal}>
          Open/Close clock
        </button> */}

        <h2 style={{ color: 'indigo' }}>Modal</h2>
        <button type="button" onClick={this.toggleModal}>
          Open modal
        </button>
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <h2>Hello! This is content of modal as children</h2>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione,
              ipsam architecto molestias sequi at voluptate placeat iste magni?
              Quos itaque minima similique consequatur praesentium sequi hic
              rerum dolore repellat ex quae necessitatibus quasi, alias facilis
              nam delectus explicabo nobis repudiandae cumque perferendis
              laudantium at. Reprehenderit necessitatibus, quia tenetur aliquam
              est enim delectus rerum quo. Sint, veniam consectetur laboriosam
              quae possimus illum molestiae aliquid suscipit iste, dolorum at
              numquam obcaecati quaerat debitis odio accusamus et deserunt,
              natus cumque nostrum sed. Numquam tempora alias perferendis
              officiis suscipit blanditiis officia, odio cum fuga deserunt
              voluptate, mollitia quo, aperiam odit quam! Quos, dolorum
              doloribus?
            </p>
            <button type="button" onClick={this.toggleModal}>
              Close modal
            </button>
          </Modal>
        )}

        <h2 style={{ color: 'indigo' }}>IconButton</h2>
        <IconButton onClick={this.toggleModal} aria-label="Add todo">
          <AddIcon width="40" height="40" fill="#fff" />
        </IconButton>
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <TodoEditor onSubmit={this.addTodo} />
            {/* <button type="button" onClick={this.toggleModal}>
              Close modal
            </button> */}
          </Modal>
        )}

        <h2 style={{ color: 'indigo' }}>TodoList</h2>
        <div>
          <p>Загальна кількість: {totalTodoCount}</p>
          <p>Кількість виконаних: {completedTodoCount}</p>
        </div>
        {/* <TodoEditor onSubmit={this.addTodo} /> */}
        <TodoFilter value={filter} onChange={this.changeFilter} />
        <TodoList
          todos={visibleTodos}
          onDeleteTodo={this.deleteTodo}
          onToggleCompleted={this.toggleCompleted}
        />
      </Container>
    );
  }
}

export default App;
