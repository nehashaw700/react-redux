import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems, searchItems } from "../features/search/dashboardSlice";
import useDebounce from "../utils/useDebounce";

const SearchTab = () => {
    const [text, setText] = useState("");
    const dispatch = useDispatch();

    const {filteredItems, error, loading} = useSelector((store) => store.dashboard);
    const debouncedValue = useDebounce(text, 500);

    useEffect(() => {
        dispatch(fetchItems());
    }, [dispatch]);

    useEffect(() => {
        console.log("deb", debouncedValue);
        dispatch(searchItems(debouncedValue));
    }, [dispatch, debouncedValue])

    if(error){
        return <p>{error}</p>
    }

    if(loading){
        return <p>Loading....</p>
    }

    return (
        <div>
            <h1> Search Tab </h1>
            <input value = {text}
                onChange={(e) => setText(e.target.value)}
            ></input>


            <ul>
                {
                    filteredItems.map((item) => (
                        <li key={item.id}>{item.name}</li>
                    ))
                }
            </ul>
        </div>
    )
}

export default SearchTab;