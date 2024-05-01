export type Todo = {
	id: string;
	title: string;
	description: string | null;
	isCompleted: boolean;
};

export type TodoDisplayStatus = 'all' | 'completed' | 'incompleted';
