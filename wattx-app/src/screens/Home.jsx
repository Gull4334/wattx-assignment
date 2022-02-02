import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreator } from '../state/actions';


const Home = () => {
    const myReduxData = useSelector((state) => state.data);
    const [currenciesToShow, setCurrenciesToShow] = useState('All');

    const dispatch = useDispatch();
    const { UpdateData } = bindActionCreators(ActionCreator, dispatch);

    const changeNumberOfCurrencies = (e) => {
        setCurrenciesToShow(e.currentTarget.value);
        if (e.currentTarget.value === '50') {
            UpdateData({ 
                ...myReduxData, 
                showCurrencies: myReduxData.allCurrencies.slice(0, 50),
                showMarketCap: myReduxData.allMarketCap.slice(0, 50)
             });
        }
        else if (e.currentTarget.value === '10') {
            UpdateData({ 
                ...myReduxData, 
                showCurrencies: myReduxData.allCurrencies.slice(0, 10),
                showMarketCap: myReduxData.allMarketCap.slice(0, 10)
             });
        }
        else {
            UpdateData({ 
                ...myReduxData, 
                showCurrencies: myReduxData.allCurrencies,
                showMarketCap: myReduxData.allMarketCap
             });
        }
    }

    return (
        <div>
            <div>
                <select onChange={(e) => changeNumberOfCurrencies(e)} value={currenciesToShow}>
                    <option value='All'>All</option>
                    <option value='10'>10</option>
                    <option value='50'>50</option>
                </select>
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Cap</th>
                            <th>Vol</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myReduxData.showCurrencies && myReduxData.showCurrencies.map((currency, currencyIndex) => (
                            <tr>
                                <td>{currencyIndex + 1}</td>
                                <td>{currency.name}</td>
                                <td>{currency.price}</td>
                                <td>{currency.market_cap}</td>
                                <td>{currency.value}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>            
        </div>
    )
}

export default Home;