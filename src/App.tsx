import { AddTodo } from '@/components/AddTodo';
import TodoList from '@/components/TodoList';
import { Container, Heading } from '@chakra-ui/react';
import './App.css';
import { useAppSelector } from './redux/store/store';

function App() {
	const todoList = useAppSelector((state) => state.todoList.todoList);

	return (
		<Container mx='auto' maxW={750}>
			<Heading as='h1' pt={'2rem'} pb={'3rem'} textAlign={'center'}>
				React Todo
			</Heading>

			<AddTodo />
			<TodoList todoList={todoList} />
		</Container>
	);
}

export default App;
