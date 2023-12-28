import { useState } from 'react';
import { TodoList } from './components/TodoList';
import { Todo } from './types';
const App = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const toggleTodo = (selectedTodoId: number) => {
        const newTodos = todos.map(todo =>
            todo.id === selectedTodoId ? { ...todo, completed: !todo.completed } : todo
        );
        setTodos(newTodos);
    };
    return (
        <div className="App">
            <h1>Todo List</h1>
            <TodoList todos={todos} toggleTodo={toggleTodo} />
        </div>
    );
};
export default App;