import type { Todo } from '@/models';
import {
	Button,
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
	Textarea,
} from '@chakra-ui/react';
import { useState } from 'react';

type Props = {
	onClose: () => void;
	updateTodo: (todo: Todo) => void;
	isOpen: boolean;
	todo: Todo;
};

export function TodoUpdateModal({ isOpen, onClose, todo, updateTodo }: Props) {
	const [newTodo, setNewTodo] = useState<Todo>(todo);
	const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setNewTodo({ ...todo, title: e.target.value });
	const onDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setNewTodo({ ...todo, description: e.target.value });

	const onClickEdit = () => {
		updateTodo(newTodo);
		onClose();
	};

	const isError = newTodo.title === '';

	return (
		<Modal isOpen={isOpen} onClose={onClose} isCentered>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Update Todo</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<form>
						<FormControl isInvalid={isError} mb={4}>
							<FormLabel fontWeight={600}>Title</FormLabel>
							<Input
								type='text'
								placeholder="What's your task today?"
								value={newTodo.title}
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
								value={newTodo.description || ''}
								onChange={onDescriptionChange}
							/>
						</FormControl>
					</form>
				</ModalBody>

				<ModalFooter>
					<Button variant='ghost' mr={3} onClick={onClose}>
						Close
					</Button>
					<Button colorScheme='green' onClick={onClickEdit}>
						Edit
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
