
const initialData = {};

const dataReducer = (state = initialData, action) => {
    switch (action.type) {
        case 'UPDATE': {
            return action.payload
        }
        default:
            return state;
    }
}

export default dataReducer;