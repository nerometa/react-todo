import { Todo } from '@/models';
import { updateTodo } from '@/redux/features/todoListSlice';
import { useAppDispatch } from '@/redux/store/store';
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

type Props = {
	isOpen: boolean;
	onClose: () => void;
	currentTodo: Todo;
	onTitleChange: (e: any) => void;
	onDescriptionChange: (e: any) => void;
};

export default function UpdateTodoModal({
	isOpen,
	onClose,
	currentTodo,
	onTitleChange,
	onDescriptionChange,
}: Props) {
	const dispatch = useAppDispatch();
	const onClickEdit = (todo: Todo) => {
		dispatch(updateTodo(todo));
		onClose();
	};

	const isError = currentTodo.title === '';
	return (
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
	);
}
