import { Button, Flex, FormControl, Input } from '@chakra-ui/react';
import { useState } from 'react';
import type { Todo } from '@/models';

type Props = {
	addTodo: (todo: Todo) => void;
};

export function AddTodo({ addTodo }: Props) {
	const [todo, setTodo] = useState('');

	const onTodoInput = (e) => setTodo(e.target.value);
	const handleSubmit = (e) => {
		e.preventDefault();
		addTodo({
			id: crypto.randomUUID(),
			title: todo,
			description: null,
		});
		setTodo('');
	};

	return (
		<form onSubmit={handleSubmit}>
			<FormControl padding={5}>
				<Flex gap={2}>
					<Input
						type='text'
						placeholder="What's your task today?"
						value={todo}
						onInput={onTodoInput}
					/>
					<Button type='submit' colorScheme='green'>
						Add
					</Button>
				</Flex>
			</FormControl>
		</form>
	);
}
