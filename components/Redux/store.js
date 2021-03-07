import { createStore } from "redux";
import theme_reducer from "./reducers/theme_reducer";

const store = createStore(
    theme_reducer
);

export { store };