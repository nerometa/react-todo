import { useEffect, useState } from 'react';
import type { Todo } from '@/models';

export function useTodo() {
	const [todoList, setTodoList] = useState<Todo[]>(() =>
		JSON.parse(localStorage.getItem('todoList') || '[]')
	);

	useEffect(() => {
		localStorage.setItem('todoList', JSON.stringify(todoList));
	}, [todoList]);

	const addTodo = (todo: Todo) => setTodoList([...todoList, todo]);
	const updateTodo = (todo: Todo) => {
		if (!todo.title) {
			throw Error('A todo title cannot be empty!');
		}

		setTodoList(
			todoList.map((item) => {
				if (item.id === todo.id) {
					item.title = todo.title;
					item.description = todo.description;
					item.isCompleted = todo.isCompleted;
				}
				return item;
			})
		);
	};
	const deleteTodo = (id: string) =>
		setTodoList(todoList.filter((todo) => todo.id !== id));

	return [todoList, addTodo, updateTodo, deleteTodo] as const;
}
