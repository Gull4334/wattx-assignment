import React, { useState } from 'react';
import ReactEcharts from "echarts-for-react";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreator } from '../state/actions';


const Liquidity = () => {
    const myReduxData = useSelector((state) => state.data);
    const [currenciesToShow, setCurrenciesToShow] = useState('All');

    const dispatch = useDispatch();
    const { UpdateData } = bindActionCreators(ActionCreator, dispatch);

    const optionsEchart = {
        xAxis: {
            data: myReduxData.showMarketCap ? myReduxData.showMarketCap : []
        },
        yAxis: {
            type: 'value'
        },

        series: [
            {
                name: 'Price',
                radius: '55%',
                center: ['50%', '60%'],
                data: myReduxData.showCurrencies ? myReduxData.showCurrencies : [],
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
            
            <ReactEcharts option={optionsEchart} />
        </div>
    )
}

export default Liquidity;