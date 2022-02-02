import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreator } from '../state/actions';
import { InputLabel,OutlinedInput,Container, Box, Select, MenuItem, TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import { getAllCurrencies } from '../apis/api';

const Home = () => {
    const myReduxData = useSelector((state) => state.data);
    const [currenciesToShow, setCurrenciesToShow] = useState();

    useEffect(() => {
        
        if (myReduxData.allCurrencies.length === 0) {
            getAllCurrencies().then((response) => {

                response.json().then((result) => {

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
                    UpdateData({ allCurrencies: dataArray, showCurrencies: dataArray, allMarketCap: capArray, showMarketCap: capArray });
                })
            })
        }
    }, [])

    const dispatch = useDispatch();
    const { UpdateData } = bindActionCreators(ActionCreator, dispatch);

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
            <InputLabel id="demo-multiple-name-label">Show</InputLabel>
                <Select
                input={<OutlinedInput label="Show" />}
                 onChange={(e) => changeNumberOfCurrencies(e)} value={currenciesToShow}>
                    <MenuItem value='All'>Show All</MenuItem>
                    <MenuItem value='10'>Show 10</MenuItem>
                    <MenuItem value='50'>Show 50</MenuItem>
                </Select>
                <div>
                    <TableContainer sx={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Rank</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Price</TableCell>
                                    <TableCell>Cap</TableCell>
                                    <TableCell>Vol</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {myReduxData.showCurrencies && myReduxData.showCurrencies.map((currency, currencyIndex) => (
                                    <TableRow>
                                        <TableCell>{currencyIndex + 1}</TableCell>
                                        <TableCell>{currency.name}</TableCell>
                                        <TableCell>{currency.price}</TableCell>
                                        <TableCell>{currency.market_cap}</TableCell>
                                        <TableCell>{currency.value}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </Box>
        </Container>
    )
}

export default Home;