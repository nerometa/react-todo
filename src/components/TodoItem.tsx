import type { Todo } from '@/models';
import { deleteTodo, updateTodo } from '@/redux/features/todoListSlice';
import { useAppDispatch } from '@/redux/store/store';
import {
	Box,
	Button,
	ButtonGroup,
	Checkbox,
	Flex,
	Text,
	VisuallyHidden,
	useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FiEdit3, FiTrash } from 'react-icons/fi';
import UpdateTodoModal from './UpdateTodoModal';

type Props = {
	todo: Todo;
};

export default function TodoItem({ todo }: Props) {
	const dispatch = useAppDispatch();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [currentTodo, setCurrentTodo] = useState<Todo>({
		id: '',
		title: '',
		description: null,
		isCompleted: false,
	});

	const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setCurrentTodo({ ...currentTodo, title: e.target.value });
	const onDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
		setCurrentTodo({ ...currentTodo, description: e.target.value });

	const openModal = (todo: Todo) => {
		setCurrentTodo(todo);
		onOpen();
	};

	return (
		<Flex
			alignItems={'center'}
			key={todo.id}
			borderWidth={1}
			borderRadius={6}>
			<Box flex={1} p={4}>
				<Checkbox
					colorScheme='green'
					borderColor={'green.600'}
					isChecked={todo.isCompleted}
					onChange={() =>
						dispatch(
							updateTodo({
								...todo,
								isCompleted: !todo.isCompleted,
							})
						)
					}>
					<Text
						textDecoration={
							todo.isCompleted ? 'line-through' : 'initial'
						}
						color={todo.isCompleted ? 'darkgray' : 'initial'}
						fontWeight={'bold'}>
						{todo.title}
					</Text>
				</Checkbox>

				{todo.description && (
					<Text
						overflowWrap={'break-word'}
						pt='2'
						fontSize='sm'
						color={todo.isCompleted ? 'darkgray' : 'initial'}>
						{todo.description}
					</Text>
				)}
			</Box>
			<ButtonGroup px={4}>
				<Button
					variant='ghost'
					onClick={() => openModal(todo)}
					title='Update todo'>
					<VisuallyHidden>
						Edit todo title and description
					</VisuallyHidden>
					<FiEdit3 />
				</Button>
				<Button
					onClick={() => dispatch(deleteTodo(todo.id))}
					title='Delete todo'
					variant='ghost'>
					<VisuallyHidden>Delete todo</VisuallyHidden>
					<FiTrash />
				</Button>
			</ButtonGroup>
			<UpdateTodoModal
				currentTodo={currentTodo}
				isOpen={isOpen}
				onClose={onClose}
				onDescriptionChange={onDescriptionChange}
				onTitleChange={onTitleChange}
				key={todo.id}
			/>
		</Flex>
	);
}
