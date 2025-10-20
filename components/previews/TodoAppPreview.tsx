import React, { useState, useEffect } from 'react';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoAppPreviewProps {
  initialTasks?: { text: string; completed: boolean }[];
}

const defaultTasks = [
    { id: 1, text: 'Design the new homepage', completed: false },
    { id: 2, text: 'Develop the API endpoints', completed: true },
    { id: 3, text: 'Deploy to staging server', completed: false },
];

export const TodoAppPreview: React.FC<TodoAppPreviewProps> = ({ initialTasks }) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    
    useEffect(() => {
        const tasksWithIds = (initialTasks || defaultTasks.map(t => ({text: t.text, completed: t.completed}))).map((task, index) => ({
            ...task,
            id: Date.now() + index
        }));
        setTasks(tasksWithIds);
    }, [initialTasks]);

    const [input, setInput] = useState('');

    const addTask = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim()) {
            setTasks([...tasks, { id: Date.now(), text: input, completed: false }]);
            setInput('');
        }
    };
    
    const toggleTaskCompletion = (id: number) => {
        setTasks(tasks.map(task => 
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    return (
        <div className="w-full h-full bg-white text-gray-800 font-sans rounded-b-lg flex flex-col">
            <header className="bg-indigo-600 text-white p-4 text-center rounded-t-lg flex-shrink-0">
                <h1 className="text-xl sm:text-2xl font-bold">Project Tasks</h1>
            </header>
            <main className="flex-grow p-4 overflow-y-auto">
                <form onSubmit={addTask} className="flex flex-col sm:flex-row mb-4">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="flex-grow p-2 border-2 border-gray-300 rounded-md sm:rounded-l-md sm:rounded-r-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Add a new task..."
                    />
                    <button type="submit" className="bg-indigo-600 text-white p-2 px-4 rounded-md sm:rounded-r-md sm:rounded-l-none hover:bg-indigo-700 transition-colors mt-2 sm:mt-0">Add</button>
                </form>
                <ul className="space-y-2">
                    {tasks.map(task => (
                        <li key={task.id} className="flex items-center p-3 bg-gray-100 rounded-md">
                            <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => toggleTaskCompletion(task.id)}
                                className="mr-3 h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                            />
                            <span className={`flex-grow transition-colors break-all ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                                {task.text}
                            </span>
                        </li>
                    ))}
                    {tasks.length === 0 && <p className="text-gray-500 text-center mt-4">All tasks completed!</p>}
                </ul>
            </main>
        </div>
    );
};