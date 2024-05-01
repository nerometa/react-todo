import type { Todo } from '@/models';
import { Card, CardBody, Stack } from '@chakra-ui/react';
import TodoItem from './TodoItem';

type Props = {
	todoList: Todo[];
};

export default function TodoList({ todoList }: Props) {
	return (
		<Card id='todo-list' border={0} shadow={0}>
			<CardBody>
				<Stack spacing='4'>
					{todoList.map((todo: Todo) => (
						<TodoItem key={todo.id} todo={todo} />
					))}
				</Stack>
			</CardBody>
		</Card>
	);
}
