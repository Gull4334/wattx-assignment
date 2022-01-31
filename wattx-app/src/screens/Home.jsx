import React, { useEffect, useState } from 'react';
import { getAllCurrencies } from '../apis/api';
import ReactEcharts from "echarts-for-react";

const Home = () => {

    const [currencies, setCurrencies] = useState([]);
    const [marketCapArray, setMarketCapArray] = useState([]);

    useEffect(() => {

        let dataArray = [];
        let capArray = [];

        let result = getAllCurrencies(); // we will use then().catch when we'll use api instead of hardcode data.
        if (result.data) {
            result.data.map((currency, currencyIndex) => {
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
        setCurrencies(dataArray);
        setMarketCapArray(capArray);

    }, []);

    const optionsEchart = {
        xAxis: {
            data: marketCapArray
        },
        yAxis: {
            type: 'value'
        },

        series: [
            {
                name: 'Price',
                radius: '55%',
                center: ['50%', '60%'],
                data: currencies,
                type: 'scatter',
                areaStyle: {}
            }
        ],
        tooltip: {
            trigger: 'item',
            formatter: function (params) {
                return `
          ${params.name}<br />
          Cap: ${params.data.market_cap}<br />
          Volume: ${params.data.value}<br />
          Price: ${params.data.price}<br />
          `;
            }
        },
    };

    return (
        <div>
            <div>
                <select>
                    <option>All</option>
                    <option>10</option>
                    <option>50</option>
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
                        {currencies.map((currency, currencyIndex) => (
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
            <ReactEcharts option={optionsEchart} />
        </div>
    )
}

export default Home;