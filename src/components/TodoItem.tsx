import React from "react";

import {Todo} from "../types.ts";
import './TodoItems.css';
type TodoItemProps = {
    todo: Todo;
    toggleTodo: (id:number) => void;
};

export const TodoItem: React.FC<TodoItemProps> = ({ todo, toggleTodo }) => {
    return (
        <li className='listItems'>
            <label className='labelItems'>
                <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo.id)} />
                {todo.text}
            </label>
        </li>
    );
};