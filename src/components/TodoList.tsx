import type { Todo } from '@/models';
import { Card, CardBody, Stack } from '@chakra-ui/react';
import TodoItem from './TodoItem';

type Props = {
	todoList: Todo[];
	deleteTodo: (id: string) => void;
	updateTodo: (todo: Todo) => void;
};

export default function TodoList({ todoList, deleteTodo, updateTodo }: Props) {
	return (
		<Card id='todo-list' border={0} shadow={0}>
			<CardBody>
				<Stack spacing='4'>
					{todoList.map((todo: Todo) => (
						<TodoItem
							key={todo.id}
							todo={todo}
							deleteTodo={deleteTodo}
							updateTodo={updateTodo}
						/>
					))}
				</Stack>
			</CardBody>
		</Card>
	);
}
