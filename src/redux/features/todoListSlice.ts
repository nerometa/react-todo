import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store/store';
import { Todo } from '@/models';

interface TodoListState {
	todoList: Todo[];
}

// Define the initial state using that type
const initialState: TodoListState = {
	todoList: [],
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
				newState,
				todoList: newState.todoList.filter(
					(todo) => todo.id !== action.payload
				),
			};
		},
		updateTodo: (state, action: PayloadAction<Todo>) => {
			let newState = { ...state };
			return {
				newState,
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
	},
});

export const { addTodo, deleteTodo, updateTodo } = todoListSlice.actions;

export default todoListSlice.reducer;
