import React, { useState } from 'react'

const UserInput: React.FC = () => {
    // Task object
    interface task {
        taskName: string,
        timeStamp: string,
        id: number,
        status: string
    }
    const [Task, setTask] = useState<task>({
        taskName: "",
        timeStamp: new Date().toUTCString(),
        id: Math.floor(Math.random() * 100000),
        status: "incomplete",
    });
    // Input handler
    const InputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTask((prevTask) => ({
            ...prevTask,
            taskName: e.target.value,
        }));      
    }
    const AddTask = () => {
        if (!Task.taskName) {
            alert("Please Provide a task name");
        } else {
            let tasks = JSON.parse(localStorage.getItem("Tasks") || "[]");
            tasks.push(Task);
            localStorage.setItem("Tasks", JSON.stringify(tasks));
            setTask((prevTask) => ({
                ...prevTask, 
                taskName: "",
            }));
            window.location.reload();
        }
    }
    // Clear input field
    const ClearInput = () => {
        setTask((prevTask) => ({
            ...prevTask, 
            taskName: "",
        }));
    };
    return (
        <div className='w-[50vw] mx-auto max-sm:w-[90vw] mt-8'>
            {/* User Input */}
            <div id="user-input-container">
                <div className='flex flex-row items-center gap-0.5 w-full border border-stone-700 rounded-lg py-1.5 px-1.5'>
                    <span className='flex'>
                        <span className="flex material-symbols-outlined text-stone-500">
                            add
                        </span>
                    </span>
                    <input type="text" placeholder='Add New Task..' className='outline-none w-full py-0.5 px-1.5 rounded-lg font-medium' onChange={InputHandler} value={Task.taskName}/>
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
