import React, { useState } from 'react';
import ReactEcharts from "echarts-for-react";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreator } from '../state/actions';
import {Container, Box, Select,MenuItem} from '@mui/material';


const Liquidity = () => {
    const myReduxData = useSelector((state) => state.data);
    const [currenciesToShow, setCurrenciesToShow] = useState();

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
        
        setCurrenciesToShow(e.target.value);
        if (e.target.value === '50') {
            UpdateData({ 
                ...myReduxData, 
                showCurrencies: myReduxData.allCurrencies.slice(0, 50),
                showMarketCap: myReduxData.allMarketCap.slice(0, 50)
             });
        }
        else if (e.target.value === '10') {
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
        <Container maxWidth="md">
            <Box>
            <Select label="Age" onChange={(e) => changeNumberOfCurrencies(e)} value={currenciesToShow}>
                    <MenuItem value='All'>Show All</MenuItem>
                    <MenuItem value='10'>Show 10</MenuItem>
                    <MenuItem value='50'>Show 50</MenuItem>
                </Select>
            
            <ReactEcharts option={optionsEchart} />
            </Box>
        </Container>
    )
}

export default Liquidity;