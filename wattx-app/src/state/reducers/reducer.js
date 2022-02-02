import { getAllCurrencies } from "../../apis/api";

let result = getAllCurrencies();
let dataArray = [];
let capArray = [];

if (result.data) {
    result.data.map((currency) => {
            dataArray.push(
                {
                    name: currency.name,
                    price: currency.quote.USD.price,
                    percent_change_24h: currency.quote.USD.percent_change_24h,
                    market_cap: currency.quote.USD.market_cap,
                    value: currency.quote.USD.volume_24h
                }
            );
            capArray.push(currency.quote.USD.market_cap);
    });
}

const initialData = {allCurrencies: dataArray, showCurrencies: dataArray, allMarketCap: capArray, showMarketCap: capArray};

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