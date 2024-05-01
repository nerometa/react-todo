import type { Todo } from '@/models';
import {
	Box,
	Button,
	Card,
	CardBody,
	Flex,
	Stack,
	Text,
	VisuallyHidden,
} from '@chakra-ui/react';
import { FiTrash } from 'react-icons/fi';

type Props = {
	todoList: Todo[];
	deleteTodo: (id: string) => void;
};

export default function TodoList({ todoList, deleteTodo }: Props) {
	return (
		<Card id='todo-list'>
			<CardBody>
				<Stack spacing='4'>
					{todoList.map((todo) => (
						<Flex alignItems={'center'}>
							<Box
								flex={1}
								borderWidth={1}
								borderRadius={6}
								p={4}
								key={todo.id}>
								<Text fontWeight={'bold'}>{todo.title}</Text>
								{todo.description && (
									<Text pt='2' fontSize='sm'>
										{todo.description}
									</Text>
								)}
							</Box>
							<Button
								onClick={() => deleteTodo(todo.id)}
								title='Delete todo'
								color='red'
								variant='ghost'>
								<VisuallyHidden>Delete todo</VisuallyHidden>
								<FiTrash />
							</Button>
						</Flex>
					))}
				</Stack>
			</CardBody>
		</Card>
	);
}
