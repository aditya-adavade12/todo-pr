import React, { useState } from 'react'

const UserInput: React.FC = () => {
    // Task object
    interface task {
        taskValue: string,
        timeStamp: string,
        id: number
    }
    const [Task, setTask] = useState<task>({
        taskValue: "",
        timeStamp: new Date().toISOString(),
        id: Math.floor(Math.random() * 100000),
    });
    // Input handler
    const InputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTask((prevTask) => ({
            ...prevTask,
            taskValue: e.target.value,
        }));      
    }
    // Add a task
    const AddTask = () => {
        if (!Task.taskValue) {
            alert("Please input valid field!");
        } else {
            let tasks = JSON.parse(localStorage.getItem("Tasks") || "[]");
            tasks.push(Task);
            localStorage.setItem("Tasks", JSON.stringify(tasks));
            setTask((prevTask) => ({
                ...prevTask, 
                taskValue: "",
            }));
        }
    }
    // Clear input field
    const ClearInput = () => {
        setTask((prevTask) => ({
            ...prevTask, 
            taskValue: "",
        }));
    };
    return (
        <div className='w-[50vw] mx-auto max-sm:w-[90vw] mt-8'>
            {/* User Input */}
            <div id="user-input-container">
                <div className='flex flex-row items-center gap-0.5 w-full border border-stone-700 rounded-lg py-1.5 px-1.5'>
                    <span className='flex'>
                        <span className="flex material-symbols-outlined">
                            add
                        </span>
                    </span>
                    <input type="text" placeholder='Add New Task..' className='outline-none w-full py-0.5 px-1.5 rounded-lg font-medium' onChange={InputHandler} value={Task.taskValue}/>
                </div>
            </div>
            <div className='flex flex-row gap-2.5 w-full mt-4'>
                <button className='bg-black border border-stone-700 text-white w-full py-2 rounded-lg font-semibold cursor-pointer hover:opacity-80 transition-all' onClick={ClearInput}>Clear All</button>
                <button className='bg-white text-black w-full py-2 rounded-lg font-semibold cursor-pointer hover:opacity-80 transition-all' onClick={AddTask}>Save</button>
            </div>
        </div>
    )
}

export default UserInput
