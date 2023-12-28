# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

## Explain the important coding parts in this assignment

- ### **App.tsx**
```jsx
const [todos, setTodos] = useState<Todo[]>([]);
```
- The `useState` hook is used to declare a state variable named `todos` and its corresponding update function `setTodos`
- The initial state of `todos` is an empty array (`[]`). The `<Todo[]>` specifies the type of the state as an array of `Todo`objects.

```tsx
const toggleTodo = (selectedTodoId: number) => {
    const newTodos = todos.map(todo =>
        todo.id === selectedTodoId ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodos);
};
```
- This function is responsible for toggling the completion status of a todo item with a given id. 
- `todos.map(todo => ...)`: This part uses the map function to iterate over each todo in the todos array.
- `todo.id === selectedTodoId ? ... : ...: `This is a ternary operator that checks if the id of the current todo matches the selectedTodoId.
  - If the condition is `true`, meaning the current todo has the same id as the selectedTodoId, then a new todo object is created with the following properties:
    - `{ ...todo }`: This uses the spread `(...)` operator to create a shallow copy of the current todo. This is done to keep the other properties of the todo unchanged. 
    - `completed: !todo.completed`: This toggles the completed property of the todo. If completed was true, it becomes false, and vice versa
  - If the condition is `false`, meaning the current todo does not have the same id as the selectedTodoId, then the current todo is kept unchanged.
- It uses the `map` function to create a new array `(newTodos)` by iterating through each todo in the current `todos` array. 
- If the id of the current todo matches the `selectedTodoId`, a new todo object is created with the completion status negated `(!todo.completed)`. Otherwise, the current todo is kept unchanged. 
- The `setTodos` function is then called to update the state with the new array.

- ### **ToDoList.tsx**
````tsx

````
