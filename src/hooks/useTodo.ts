import { useEffect, useState } from 'react';
import type { Todo } from '@/models';

const todoListExample = [
	{ id: crypto.randomUUID(), title: 'Plant trees 🌲', description: null },
	{
		id: crypto.randomUUID(),
		title: 'Coding my web application project 🌲',
		description: 'Use React with shadcn/ui',
	},
	{
		id: crypto.randomUUID(),
		title: 'Put on 2 more solar panels on my home ☀️',
		description: null,
	},
];

export function useTodo() {
	const [todoList, setTodoList] = useState<Todo[]>(() =>
		JSON.parse(localStorage.getItem('todoList') || '[]')
	);

	useEffect(() => {
		localStorage.setItem('todoList', JSON.stringify(todoListExample));
	}, []);

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
				}
				return item;
			})
		);
	};
	const deleteTodo = (id: string) =>
		setTodoList(todoList.filter((todo) => todo.id !== id));

	return [todoList, addTodo, updateTodo, deleteTodo] as const;
}
