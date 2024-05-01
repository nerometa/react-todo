import { AddTodo } from '@/components/AddTodo';
import TodoList from '@/components/TodoList';
import { Box, Container, Heading, Select } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { TodoDisplayStatus } from './models';
import { filterByStatus } from './redux/features/todoListSlice';
import { useAppSelector } from './redux/store/store';

function App() {
	const todoList = useAppSelector((state) => state.todoList.todoList);
	const filteredTodoList = useAppSelector(
		(state) => state.todoList.filteredTodoList
	);
	const dispatch = useDispatch();
	const onFilterChange = (e: TodoDisplayStatus) => {
		dispatch(filterByStatus(e));
	};

	useEffect(() => {
		onFilterChange('all');
	}, []);

	return (
		<Container mx='auto' maxW={750}>
			<Heading as='h1' pt={'2rem'} pb={'3rem'} textAlign={'center'}>
				React Todo
			</Heading>

			<AddTodo />
			<Box mb={4}>
				<Select
					variant='filled'
					defaultValue={'all'}
					_focusVisible={{ bg: 'white' }}
					onChange={(e) =>
						onFilterChange(e.target.value as TodoDisplayStatus)
					}>
					<option value='all'>All</option>
					<option value='completed'>Completed</option>
					<option value='incompleted'>Incompleted</option>
				</Select>
			</Box>
			<Box pb={16}>
				<TodoList todoList={filteredTodoList ?? todoList} />
			</Box>
		</Container>
	);
}

export default App;
