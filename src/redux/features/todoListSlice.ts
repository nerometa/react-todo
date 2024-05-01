import { Todo, TodoDisplayStatus } from '@/models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TodoListState {
	todoList: Todo[];
	filteredTodoList: Todo[] | null;
}

// Define the initial state using that type
const initialState: TodoListState = {
	todoList: [],
	filteredTodoList: [],
};

export const todoListSlice = createSlice({
	name: 'todoList',
	initialState,
	reducers: {
		addTodo: (state, action: PayloadAction<Todo>) => {
			state.todoList.push({
				id: action.payload.id,
				title: action.payload.title,
				description: action.payload.description,
				isCompleted: action.payload.isCompleted,
			});
		},
		deleteTodo: (state, action: PayloadAction<string>) => {
			let newState = { ...state };
			return {
				...newState,
				todoList: newState.todoList.filter(
					(todo) => todo.id !== action.payload
				),
			};
		},
		updateTodo: (state, action: PayloadAction<Todo>) => {
			let newState = { ...state };
			return {
				...newState,
				todoList: newState.todoList.map((todo) => {
					if (todo.id !== action.payload.id) return todo;

					return {
						...todo,
						...action.payload,
					};
					``;
				}),
			};
		},
		filterByStatus: (state, action: PayloadAction<TodoDisplayStatus>) => {
			let status = action.payload;
			let newState = { ...state };
			let filteredTodoList: Todo[] | null;

			switch (status) {
				case 'all':
					filteredTodoList = null;
					break;
				case 'completed':
					filteredTodoList = newState.todoList.filter(
						(todo) => todo.isCompleted === true
					);
					break;
				case 'incompleted':
					filteredTodoList = newState.todoList.filter(
						(todo) => todo.isCompleted === false
					);
					break;
			}

			return {
				...newState,
				filteredTodoList: filteredTodoList,
			};
		},
	},
});

export const { addTodo, deleteTodo, updateTodo, filterByStatus } =
	todoListSlice.actions;

export default todoListSlice.reducer;
