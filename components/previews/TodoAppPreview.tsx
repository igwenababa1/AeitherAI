import React, { useState, useEffect } from 'react';

type Priority = 'High' | 'Medium' | 'Low';

interface Task {
  id: number;
  text: string;
  completed: boolean;
  priority: Priority;
}

interface TodoAppPreviewProps {
  initialTasks?: { text: string; completed: boolean; priority: Priority }[];
}

const defaultTasks: Task[] = [
    { id: 1, text: 'Design the new homepage', completed: false, priority: 'High' },
    { id: 2, text: 'Develop the API endpoints', completed: true, priority: 'High' },
    { id: 3, text: 'Deploy to staging server', completed: false, priority: 'Medium' },
];

export const TodoAppPreview: React.FC<TodoAppPreviewProps> = ({ initialTasks }) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    
    useEffect(() => {
        const tasksToUse = initialTasks || defaultTasks;
        const tasksWithIds = tasksToUse.map((task, index) => ({
            ...task,
            id: Date.now() + index,
            priority: task.priority || 'Medium', // Default priority if not provided
        }));
        setTasks(tasksWithIds);
    }, [initialTasks]);

    const [input, setInput] = useState('');
    const [priority, setPriority] = useState<Priority>('Medium');

    const addTask = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim()) {
            setTasks([...tasks, { id: Date.now(), text: input, completed: false, priority }]);
            setInput('');
            setPriority('Medium'); // Reset priority after adding
        }
    };
    
    const toggleTaskCompletion = (id: number) => {
        setTasks(tasks.map(task => 
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const priorityColors: { [key in Priority]: string } = {
        High: 'bg-red-200 text-red-800',
        Medium: 'bg-yellow-200 text-yellow-800',
        Low: 'bg-green-200 text-green-800',
    };

    return (
        <div className="w-full h-full bg-white text-gray-800 font-sans rounded-b-lg flex flex-col">
            <header className="bg-indigo-600 text-white p-4 text-center rounded-t-lg flex-shrink-0">
                <h1 className="text-xl sm:text-2xl font-bold">Project Tasks</h1>
            </header>
            <main className="flex-grow p-4 overflow-y-auto">
                <form onSubmit={addTask} className="mb-4">
                    <div className="flex flex-col sm:flex-row gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="flex-grow p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Add a new task..."
                        />
                         <select
                            value={priority}
                            onChange={(e) => setPriority(e.target.value as Priority)}
                            className="p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                        >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                        <button type="submit" className="bg-indigo-600 text-white p-2 px-4 rounded-md hover:bg-indigo-700 transition-colors">Add</button>
                    </div>
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
                            <span className={`ml-3 px-2 py-0.5 text-xs font-semibold rounded-full whitespace-nowrap ${priorityColors[task.priority]}`}>
                                {task.priority}
                            </span>
                        </li>
                    ))}
                    {tasks.length === 0 && <p className="text-gray-500 text-center mt-4">All tasks completed!</p>}
                </ul>
            </main>
        </div>
    );
};
