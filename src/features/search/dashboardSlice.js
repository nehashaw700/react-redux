import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchItems = createAsyncThunk(
    'dashboard/fetchItems',
    async () => {
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await res.json();
        return data;
    }
)

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        items: [],
        filteredItems: [],
        error: null,
        loading: false,
    },

    reducers: {
        searchItems: (state, action) => {
            state.filteredItems = state.items.filter((item) => {
                const itemName = item.name.toLowerCase()
                return itemName.includes(action.payload.toLowerCase())
            })
        }
    },

    extraReducers: (builder) => {
        builder.addCase(fetchItems.pending, (state) => {
            state.loading = true;
        })
            .addCase(fetchItems.fulfilled, (state, action) => {
                state.items = action.payload;
                state.filteredItems = action.payload;
                state.loading = false;
            })
            .addCase(fetchItems.rejected, (state) => {
                state.error = "Some Error Occurred!";
                state.loading = false;
            })
    }

})

export const { searchItems } = dashboardSlice.actions;
export default dashboardSlice.reducer;