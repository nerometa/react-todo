import {
	Box,
	Card,
	CardBody,
	Container,
	Heading,
	Stack,
	Text,
} from '@chakra-ui/react';
import './App.css';
import { AddTodo } from '@/components/AddTodo';
import { useTodo } from '@/hooks/useTodo';

function App() {
	const [todoList, addTodo] = useTodo();

	return (
		<Container mx='auto' maxW={750}>
			<Heading as='h1' pt={'2rem'} pb={'3rem'} textAlign={'center'}>
				React Todo
			</Heading>

			<AddTodo addTodo={addTodo} />

			<Card id='todo-list'>
				<CardBody>
					<Stack spacing='4'>
						{todoList.map((item) => (
							<Box
								borderWidth={1}
								borderRadius={6}
								p={4}
								key={item.id}>
								<Text fontWeight={'bold'}>{item.title}</Text>
								{item.description && (
									<Text pt='2' fontSize='sm'>
										{item.description}
									</Text>
								)}
							</Box>
						))}
					</Stack>
				</CardBody>
			</Card>
		</Container>
	);
}

export default App;
