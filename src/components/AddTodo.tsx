import { addTodo } from '@/redux/features/todoListSlice';
import { useAppDispatch } from '@/redux/store/store';
import { Button, Flex, FormControl, Input } from '@chakra-ui/react';
import { useState, type SyntheticEvent } from 'react';

export function AddTodo() {
	const [todo, setTodo] = useState('');
	const dispatch = useAppDispatch();

	const onTodoInput = (e: React.ChangeEvent<HTMLInputElement>) =>
		setTodo(e.target.value);
	const handleSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
		dispatch(
			addTodo({
				id: crypto.randomUUID(),
				title: todo,
				description: null,
				isCompleted: false,
			})
		);
		setTodo('');
	};

	return (
		<form onSubmit={handleSubmit}>
			<FormControl pb={8} isRequired>
				<Flex gap={2}>
					<Input
						type='text'
						variant='filled'
						placeholder="What's your task today?"
						_focusVisible={{ bg: 'white' }}
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
