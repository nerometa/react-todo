import type { Todo } from '@/models';
import {
	Box,
	Button,
	ButtonGroup,
	Checkbox,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
	Textarea,
	VisuallyHidden,
	useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FiEdit3, FiTrash } from 'react-icons/fi';

type Props = {
	todo: Todo;
	updateTodo: (todo: Todo) => void;
	deleteTodo: (id: string) => void;
};

export default function TodoItem({ todo, updateTodo, deleteTodo }: Props) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [currentTodo, setCurrentTodo] = useState<Todo>({
		id: '',
		title: '',
		description: null,
		isCompleted: false,
	});

	const onCompleted = (todo: Todo) =>
		updateTodo({
			...todo,
			isCompleted: !todo.isCompleted,
		});

	const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setCurrentTodo({ ...currentTodo, title: e.target.value });
	const onDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
		setCurrentTodo({ ...currentTodo, description: e.target.value });

	const onClickEdit = (todo: Todo) => {
		updateTodo(todo);
		onClose();
	};

	const openModal = (todo: Todo) => {
		setCurrentTodo(todo);
		onOpen();
	};

	const isError = currentTodo.title === '';
	return (
		<Flex
			alignItems={'center'}
			key={todo.id}
			borderWidth={1}
			borderRadius={6}>
			<Box flex={1} p={4}>
				<Checkbox
					colorScheme='green'
					isChecked={todo.isCompleted}
					onChange={() => onCompleted(todo)}>
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
					onClick={() => deleteTodo(todo.id)}
					title='Delete todo'
					variant='ghost'>
					<VisuallyHidden>Delete todo</VisuallyHidden>
					<FiTrash />
				</Button>
			</ButtonGroup>

			<Modal isOpen={isOpen} onClose={onClose} isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Update Todo</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<FormControl isInvalid={isError} mb={4}>
							<FormLabel fontWeight={600}>Title</FormLabel>
							<Input
								type='text'
								placeholder="What's your task today?"
								value={currentTodo.title}
								onChange={onTitleChange}
								required
							/>
							{isError && (
								<FormErrorMessage>
									Todo title cannot be empty!
								</FormErrorMessage>
							)}
						</FormControl>
						<FormControl>
							<FormLabel fontWeight={600}>Description</FormLabel>
							<Textarea
								placeholder='What is this todo about?'
								value={currentTodo.description || ''}
								onChange={onDescriptionChange}
							/>
						</FormControl>
					</ModalBody>

					<ModalFooter>
						<Button variant='ghost' mr={3} onClick={onClose}>
							Close
						</Button>
						<Button
							colorScheme='green'
							isDisabled={isError}
							onClick={() => onClickEdit(currentTodo)}>
							Edit
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Flex>
	);
}
