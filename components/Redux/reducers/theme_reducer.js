const initialState = {
    theme: 'light'
};
const theme_reducer = (state = initialState, action) => {
    switch (action.type) {
        case "setLight": {
            console.log('setting light')
            return { ...state, theme: 'light' };
        }
        case "setDark": {
            console.log('setting dark')
            return { ...state, theme: 'dark' };
        }
        default: {
            return state;
        }
    }
}

export default theme_reducer;