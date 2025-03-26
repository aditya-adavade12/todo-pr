import React, { useContext } from 'react'
import localStorageContext from './Provider';

const ShowTasks: React.FC = () => {
    // Get Data from provider
    const data = useContext(localStorageContext);
    console.log(data);
    // Complete task
    const completeTask = () => {
        alert("complete");
    }
    // Remove a task
    const removeTask = () => {
        alert("delete");
    }
    return (
        <div className='w-[50vw] mx-auto mt-20 max-sm:w-[90vw]'>
            {/* Users Tasks */}
            <div id="show-tasks-container">
                <h2 className='text-2xl font-semibold'>Your Tasks</h2>
                <div id="task-box" className='mt-4'>
                    {/* Tasks */}
                    <div id="task" className='border border-stone-700 flex flex-row items-center justify-between gap-1.5 w-full py-2 px-2 rounded-lg'>
                        <div>
                        <p className='line-clamp-1 w-full text-wrap'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis eum repellendus nemo quos neque ut quisquam, numquam accusantium officiis voluptas ea id mollitia commodi nisi provident unde possimus quae. Exercitationem nihil iure, in voluptas natus repellendus impedit voluptatum maiores consequatur fuga unde vitae distinctio ad vel quos, quisquam est sapiente?</p>
                        <p className='text-stone-500 font-semibold text-sm'>23 March 2052</p>
                        </div>
                        <div className='flex flex-row items-center gap-1.5'>
                            <button onClick={completeTask} className='flex text-green-500 hover:bg-stone-800 p-0.5 rounded-lg cursor-pointer'><span className="flex material-symbols-outlined">
                                check_circle
                            </span></button>
                            <button onClick={removeTask} className='flex text-stone-300 hover:bg-stone-800 p-0.5 rounded-lg cursor-pointer'><span className="flex material-symbols-outlined">
                                delete
                            </span></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShowTasks
