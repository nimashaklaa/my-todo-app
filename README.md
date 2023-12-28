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

### **App.tsx**
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

```tsx
const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const text = (e.target as HTMLFormElement).elements.namedItem('todo') as HTMLInputElement | null;
  if (text && text.value) {
    addTodo(text.value);
    (e.target as HTMLFormElement).reset();
  }
};
```
- `e.preventDefault();`prevents the default form submission behavior, which would cause the page to reload.
- `(e.target as HTMLFormElement):`
  - `e` is the event parameter received by the function. 
  - `.target` refers to the target of the event, i.e., the element that triggered the event. 
  - `as HTMLFormElement`is a type assertion, telling TypeScript to treat the target as an HTML form element.
- `.elements` is a property of an HTML form element that provides access to a collection of all form elements as a `HTMLFormControlsCollection`.
- `.namedItem('todo')` is a method of `HTMLFormControlsCollection` that retrieves the first form control with the given name.
-` as HTMLInputElement | null`: Another type assertion is used to tell TypeScript that the result of `.namedItem('todo')` should be treated as an `HTMLInputElement`. 
- The `| null` part indicates that the result can also be null if the element with the given name is not found.

attempting to retrieve an element with the name `todo` from the form that triggered the event `(e)`. The result `(text)` is then treated as an `HTMLInputElement` or `null`.
The null part accounts for the possibility that the element is not found.

### **ToDoList.tsx**
````tsx
export const TodoList: React.FC<TodoListProps> = ({ todos, toggleTodo }) => {
}
````
- `React.FC`: This is a generic type from the React library that stands for "Functional Component." 
  - It's a generic type that takes a type argument representing the expected props of the functional component
- `<TodoListProps>:` This is the type argument provided to React.FC. It specifies the expected props for the `TodoList` component. 
- `= ({ todos, toggleTodo }) => { ... }`: This is the actual definition of the functional component. 
  - It's an arrow function that takes the expected props (destructuring them from the props object) and includes the component logic and rendering