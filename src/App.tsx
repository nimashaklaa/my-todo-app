import React, { useState, FormEvent } from 'react';
import { TodoList } from './components/TodoList';
import { Todo } from './types.ts';
import { v4 as uuidv4 } from 'uuid';

const App: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const toggleTodo = (selectedTodoId: number) => {
        const newTodos = todos.map(todo =>
            todo.id === selectedTodoId ? { ...todo, completed: !todo.completed } : todo
        );
        setTodos(newTodos);
    };
    const addTodo = (text: string) => {
        const newTodo = { id: uuidv4(), text: text, completed: false };
        setTodos(prevTodos => [...prevTodos, newTodo]);
    };
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const text = (e.target as HTMLFormElement).elements.namedItem('todo') as HTMLInputElement | null;
        if (text && text.value) {
            addTodo(text.value);
            (e.target as HTMLFormElement).reset();
        }
    };

    return (
        <div className="App">
            <h1>Todo List</h1>
            <form onSubmit={handleSubmit}>
                <input name="todo" type="text"/>
                <button type="submit">Add Todo</button>
            </form>
            <TodoList todos={todos} toggleTodo={toggleTodo}/>
        </div>
    );
};
export default App;
