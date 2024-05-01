import type { Todo } from '@/models';
import {
	Box,
	Button,
	ButtonGroup,
	Card,
	CardBody,
	Flex,
	Stack,
	Text,
	VisuallyHidden,
	useDisclosure,
} from '@chakra-ui/react';
import { FiEdit3, FiTrash } from 'react-icons/fi';
import { TodoUpdateModal } from './TodoUpdateModal';

type Props = {
	todoList: Todo[];
	deleteTodo: (id: string) => void;
	updateTodo: (todo: Todo) => void;
};

export default function TodoList({ todoList, deleteTodo, updateTodo }: Props) {
	const { isOpen, onOpen, onClose } = useDisclosure();

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
									<Text pt='2' fontSize='sm'>
										{todo.description}
									</Text>
								)}
							</Box>
							<ButtonGroup>
								<Button
									variant='ghost'
									onClick={onOpen}
									title='Edit todo'>
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
							<TodoUpdateModal
								updateTodo={updateTodo}
								isOpen={isOpen}
								onClose={onClose}
								todo={todo}
							/>
						</Flex>
					))}
				</Stack>
			</CardBody>
		</Card>
	);
}
