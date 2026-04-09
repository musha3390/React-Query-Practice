export interface Task {
    userId: number,
    id: number,
    title: string,
    completed: boolean,
}

export const fetchTasks = async () : Promise<Task[]> => {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=10");
    if (!res.ok){
        throw new Error("Failed To fetch tasks");
    }

    return res.json();
};

export const addTask = async (title: string) => {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos",{
        method: "POST",
        headers: {'Contenet-Type': "application/json; cahrset-utf-8"},
        body: JSON.stringify({
            title,
            completed: false,
            userId: 1,
        })
    });

    if(!res.ok) {
        throw new Error("Failed to add task");
    }

    return res.json();
};