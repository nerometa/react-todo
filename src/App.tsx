import { AddTodo } from '@/components/AddTodo';
import { useTodo } from '@/hooks/useTodo';
import { Container, Heading } from '@chakra-ui/react';
import './App.css';
import TodoList from '@/components/TodoList';

function App() {
	const [todoList, addTodo, updateTodo, deleteTodo] = useTodo();

	return (
		<Container mx='auto' maxW={750}>
			<Heading as='h1' pt={'2rem'} pb={'3rem'} textAlign={'center'}>
				React Todo
			</Heading>

			<AddTodo addTodo={addTodo} />
			<TodoList
				updateTodo={updateTodo}
				deleteTodo={deleteTodo}
				todoList={todoList}
			/>
		</Container>
	);
}

export default App;
