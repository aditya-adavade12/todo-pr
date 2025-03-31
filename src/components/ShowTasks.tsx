import React, { useEffect, useState } from 'react';

const ShowTasks: React.FC = () => {
    // Task object type
    interface taskType {
        taskName: string;
        timeStamp: string;
        id: number;
        status: string;
    }

    // State for tasks
    const [Task, setTask] = useState<taskType[]>(JSON.parse(localStorage.getItem("Tasks") || "[]"));

    // Mark task as complete
    const completeTask = (id: number) => {
        let getData = JSON.parse(localStorage.getItem("Tasks") || "[]");
        const newUpdate = getData.map((item: taskType) =>
            item.id === id ? { ...item, status: "complete" } : item
        );

        setTask(newUpdate);
        localStorage.setItem("Tasks", JSON.stringify(newUpdate));
    };

    // Load data from localStorage
    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem("Tasks") || "[]");
        if (storedTasks) {
            setTask(storedTasks);
        }
    }, []);

    // Delete task
    const deleteTask = (id: number) => {
        let ask = window.confirm("Are you sure you want to delete this task?");
        if (ask) {     
            let getData = JSON.parse(localStorage.getItem("Tasks") || "[]");
            const updateTasks = getData.filter((item: taskType) => item.id !== id);
    
            setTask(updateTasks);
            localStorage.setItem("Tasks", JSON.stringify(updateTasks));
        }
    };

    // Separate completed and pending tasks
    const pendingTasks = Task.filter((task) => task.status !== "complete");
    const completedTasks = Task.filter((task) => task.status === "complete");

    return (
        <div className='w-[50vw] mx-auto mt-20 max-sm:w-[90vw]'>
            <h2 className='text-2xl font-semibold'>Your Tasks</h2>

            {/* Pending Tasks Section */}
            {pendingTasks.length === 0 ? (
                <div className='text-left mt-8 text-stone-400 font-semibold'>No tasks Available</div>
            ) : (
                pendingTasks.map((item) => (
                    <div key={item.id} className='mt-4'>
                        <div className='border border-stone-700 flex flex-row items-center justify-between gap-1.5 w-full py-2 px-2 rounded-lg'>
                            <div>
                                <p className='line-clamp-1 w-full text-lg font-semibold text-white'>{item.taskName}</p>
                                <p className='text-stone-500 font-semibold text-sm'>{item.timeStamp}</p>
                            </div>
                            <div className='flex flex-row items-center gap-1.5'>
                                <button onClick={() => completeTask(item.id)} className='text-green-500 flex hover:bg-stone-800 p-0.5 rounded-lg cursor-pointer'>
                                    <span className="flex material-symbols-outlined">check_circle</span>
                                </button>
                                <button onClick={() => deleteTask(item.id)} className='flex text-stone-300 hover:bg-stone-800 p-0.5 rounded-lg cursor-pointer'>
                                    <span className="flex material-symbols-outlined">delete</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            )}

            {/* Completed Tasks Section */}
            {completedTasks.length > 0 && (
                <div className='mt-10'>
                    <h2 className='text-2xl font-semibold text-white'>Completed Tasks</h2>
                    {completedTasks.map((item) => (
                        <div key={item.id} className='mt-4'>
                            <div className='border border-stone-500 flex flex-row items-center justify-between gap-1.5 w-full py-2 px-2 rounded-lg bg-black'>
                                <div>
                                    <p className='line-clamp-1 w-full text-lg font-semibold text-stone-300 line-through'>{item.taskName}</p>
                                    <p className='text-stone-500 font-semibold text-sm'>{item.timeStamp}</p>
                                </div>
                                <button onClick={() => deleteTask(item.id)} className='flex text-red-500 hover:bg-stone-800 p-0.5 rounded-lg cursor-pointer'>
                                    <span className="flex material-symbols-outlined">delete</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ShowTasks;
