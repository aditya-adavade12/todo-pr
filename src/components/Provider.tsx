import React, { createContext, useEffect, useState } from "react";

interface taskdata {
    name: string;
    timeStamp: string;
    status: string;
    id: number;
}

interface localStoragectx {
    data: taskdata[];
    updateData: (newData: taskdata) => void;
}

const localStorageContext = createContext<localStoragectx | null>(null);

export const Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [data, setData] = useState<taskdata[]>([]);
    // Load data from localstorage
    useEffect(() => {
        const getData = localStorage.getItem("Tasks");
        if (getData) {
            setData(JSON.parse(getData));
        }
    }, []);
    const updateData = (newData: taskdata): void => {
        const newTask = [...data, newData];
        localStorage.setItem("Tasks", JSON.stringify(newTask))
        setData(newTask);
    };
    return (
        <localStorageContext.Provider value={{ data, updateData }}>
            {children}
        </localStorageContext.Provider>
    )
}

export default localStorageContext;