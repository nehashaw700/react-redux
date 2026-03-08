import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos,addTodos, deleteTodos, toggleTodos } from "../features/todos/todoSlice";

const TodoList = () => {
    const dispatch = useDispatch();

    const {items, loading, error} = useSelector((store) => store.todos)
    const [task, setTask] = useState("");

    const handleAddItems = () =>{
        if(!task.trim()) return;

        const todo = {title: task}
        dispatch(addTodos(todo));
        setTask('');
    }

    const handleDeleteItems = (id) =>{
        dispatch(deleteTodos({id}));
    }

    const handleToggleItems = (id) => {
        dispatch(toggleTodos({id}))
    }

    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    if(loading){
        return <p>Loading...</p>;
    }

    if(error){
        return <p>{error}</p>
    }

    return (
        <div>
            <h1> ToDo App </h1>

            <div>
                <input
                    value={task}
                    placeholder="Please enter Task here"
                    onChange={(e) => setTask(e.target.value)}>
                </input>

                <button onClick={handleAddItems}>
                    ADD
                </button>
            </div>

            <div>
                <ul>
                    {
                        items.map((item) => (
                            <li key={item.id}>
                                <span>{item.title}</span>
                                <button onClick={() => handleToggleItems(item.id)}>{item.completed ? 'Open' : 'Mark Complete'}</button>
                                <button onClick={() => handleDeleteItems(item.id)}>Delete</button>
                            </li>
                        ))
                    }
                </ul>
            </div>


        </div>
    )
}

export default TodoList;