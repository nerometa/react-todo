import type { Todo } from '@/models';
import {
	Box,
	Button,
	ButtonGroup,
	Card,
	CardBody,
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
	Stack,
	Text,
	Textarea,
	VisuallyHidden,
	useDisclosure,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { FiEdit3, FiTrash } from 'react-icons/fi';

type Props = {
	todoList: Todo[];
	deleteTodo: (id: string) => void;
	updateTodo: (todo: Todo) => void;
};

export default function TodoList({ todoList, deleteTodo, updateTodo }: Props) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [currentTodo, setCurrentTodo] = useState<Todo>({
		id: '',
		title: '',
		description: null,
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
		<Card id='todo-list' border={0} shadow={0}>
			<CardBody>
				<Stack spacing='4'>
					{todoList.map((todo) => (
						<Flex
							alignItems={'center'}
							key={todo.id}
							borderWidth={1}
							borderRadius={6}>
							<Box flex={1} p={4}>
								<Text fontWeight={'bold'}>{todo.title}</Text>
								{todo.description && (
									<Text
										overflowWrap={'break-word'}
										pt='2'
										fontSize='sm'>
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
											<FormLabel fontWeight={600}>
												Title
											</FormLabel>
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
											<FormLabel fontWeight={600}>
												Description
											</FormLabel>
											<Textarea
												placeholder='What is this todo about?'
												value={
													currentTodo.description ||
													''
												}
												onChange={onDescriptionChange}
											/>
										</FormControl>
									</ModalBody>

									<ModalFooter>
										<Button
											variant='ghost'
											mr={3}
											onClick={onClose}>
											Close
										</Button>
										<Button
											colorScheme='green'
											isDisabled={isError}
											onClick={() =>
												onClickEdit(currentTodo)
											}>
											Edit
										</Button>
									</ModalFooter>
								</ModalContent>
							</Modal>
						</Flex>
					))}
				</Stack>
			</CardBody>
		</Card>
	);
}
