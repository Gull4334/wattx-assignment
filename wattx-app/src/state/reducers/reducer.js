
let dataArray = [];
let capArray = [];

const initialData = { allCurrencies: dataArray, showCurrencies: dataArray, allMarketCap: capArray, showMarketCap: capArray };

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