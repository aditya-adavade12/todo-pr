import React, { useEffect, useRef, useState } from 'react'

const ShowTasks: React.FC = () => {
    const taskName = useRef(null);
    interface taskType {
        taskName: string;
        timeStamp: string;
        id: number;
        status: string;
    }
    const [Task, setTask] = useState<taskType[]>(JSON.parse(localStorage.getItem("Tasks") || "[]"));
    // Complete task
    const completeTask = (id: any) => {
        let getData = JSON.parse(localStorage.getItem("Tasks") || "[]");
        const newUpdate = getData.map((item: any) => {
            if (id === item.id) {
                return { ...item, status: "complete" };
            }
            return item;
        });
        setTask(newUpdate);
        localStorage.setItem("Tasks", JSON.stringify(newUpdate));
    }
    // Load data from localstorage
    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem("Tasks") || "[]");
        if (storedTasks) {
            setTask(storedTasks);
        }
    }, []);
    // Deleting the task
    const deleteTask = (id: number) => {
        let getData = JSON.parse(localStorage.getItem("Tasks") || "[]");
        const updateTasks = getData.filter((item: any) => item.id !== id);
        console.log(updateTasks);
        setTask(updateTasks);
        localStorage.setItem("Tasks", JSON.stringify(updateTasks));
    }
    return (
        <div className='w-[50vw] mx-auto mt-20 max-sm:w-[90vw]'>
            {/* Users Tasks */}
            <div id="show-tasks-container">
                <h2 className='text-2xl font-semibold'>Your Tasks</h2>
                {
                    Task.length == 0 ? (
                        <div className='text-left mt-8 text-gray-200 font-semibold'>No tasks available</div>
                    ) : (
                        Task.map((item) =>

                            <div id="task-box" className='mt-4'>
                                {/* Tasks */}
                                <div id="task" className='border border-stone-700 flex flex-row items-center justify-between gap-1.5 w-full py-2 px-2 rounded-lg' key={item.id}>
                                    <div>
                                        <p className='line-clamp-1 w-full text-wrap text-lg' ref={taskName}>{item.taskName}</p>
                                        <p className='text-stone-500 font-semibold text-sm'>{item.timeStamp}</p>
                                    </div>
                                    <div className='flex flex-row items-center gap-1.5'>
                                        <button onClick={() => completeTask(item.id)} className='flex text-green-500 hover:bg-stone-800 p-0.5 rounded-lg cursor-pointer'><span className="flex material-symbols-outlined">
                                            check_circle
                                        </span></button>
                                        <button onClick={() => deleteTask(item.id)} className='flex text-stone-300 hover:bg-stone-800 p-0.5 rounded-lg cursor-pointer'><span className="flex material-symbols-outlined">
                                            delete
                                        </span></button>
                                    </div>
                                </div>
                            </div>
                        )
                    )
                }
            </div>
        </div>
    )
}

export default ShowTasks
