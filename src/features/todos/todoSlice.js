import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk(
    "todos/fetchTodos",
    async () => {
        const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
        console.log("status:", res.status);

        const data = await res.json();
        console.log("data: ", data);
        return data;
    }
)

const todoSlice = createSlice({
    name: 'todos',

    initialState: {
        items: [],
        loading: false,
        error: null,
    },

    reducers:{
        addTodos: (state, action) => {
            state.items.push({
                id: Date.now(),
                title: action.payload.title,
                completed: false,
            })
        },

        deleteTodos: (state, action) => {
            state.items = state.items.filter((item) => item.id !== action.payload.id);
        },

        editTodos: () => {
            
        },

        toggleTodos: (state, action) => {
            const todoItem = state.items.find((item) => item.id === action.payload.id );

            if(todoItem) {
            todoItem.completed = !todoItem.completed;
            }
        },
    },

    extraReducers: (builder) => {
        builder.addCase(fetchTodos.pending, (state) =>  {
            state.loading = true;
        })
        .addCase(fetchTodos.fulfilled, (state, action) => {
            state.loading = false;
            state.items = action.payload;
        })
        .addCase(fetchTodos.rejected, (state) => {
            state.loading = false;
            state.error = "Your request could not be completed!"
        })
    }
    
});

export const {addTodos, deleteTodos, toggleTodos} = todoSlice.actions;
export default todoSlice.reducer;