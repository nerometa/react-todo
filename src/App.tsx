import { AddTodo } from '@/components/AddTodo';
import { useTodo } from '@/hooks/useTodo';
import {
	Box,
	Button,
	Card,
	CardBody,
	Container,
	Flex,
	Heading,
	Stack,
	Text,
	VisuallyHidden,
} from '@chakra-ui/react';
import { FiTrash } from 'react-icons/fi';
import './App.css';
import TodoList from './components/TodoList';

function App() {
	const [todoList, addTodo, deleteTodo] = useTodo();

	return (
		<Container mx='auto' maxW={750}>
			<Heading as='h1' pt={'2rem'} pb={'3rem'} textAlign={'center'}>
				React Todo
			</Heading>

			<AddTodo addTodo={addTodo} />
			<TodoList deleteTodo={deleteTodo} todoList={todoList} />
		</Container>
	);
}

export default App;
