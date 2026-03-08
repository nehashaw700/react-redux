import { configureStore } from "@reduxjs/toolkit";
import todoReducer from '../features/todos/todoSlice';
import dashboardReducer from '../features/search/dashboardSlice';

const store = configureStore({
    reducer: {
        todos: todoReducer,
        dashboard: dashboardReducer,
    }
})

export default store;

