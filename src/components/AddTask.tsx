import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTask } from "../api/task";
import { useState } from "react";

const AddTask = () => {
    const queryClient = useQueryClient();
    const [title, setTitle] = useState("");
    const mutation = useMutation({
        mutationFn: addTask,

        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["task"]});
            setTitle("");
        }
    });

    const handleAdd = () => {
        if(!title.trim()) return
        mutation.mutate(title);
    }
     return (
       <div className="max-w-xl mx-auto mt-6 p-4">
         {/* Input */}
         <div className="flex gap-2 mb-4">
           <input
             value={title}
             onChange={(e) => setTitle(e.target.value)}
             placeholder="Enter task..."
             className="border p-2 flex-1 rounded"
           />
           <button
             onClick={handleAdd}
             className="bg-green-500 text-white px-4 rounded"
           >
             Add
           </button>
         </div>

         {/* Mutation states */}
         {mutation.isPending && <p>Adding task...</p>}
         {mutation.isError && <p className="text-red-500">Error adding task</p>}
       </div>
     );
};

export default AddTask;
