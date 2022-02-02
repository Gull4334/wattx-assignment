const express = require('express');
const app = express();
const cors = require('cors');
const { default: axios } = require('axios');

app.use(cors({
    origin: '*'
}));

app.get('/', ({},res) => {
  axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',{
    headers: {
      'X-CMC_PRO_API_KEY': '4091e722-76b2-4cd1-88ec-7e70ae7b3307',
    },
  }).then((response) => {
    if(response.status === 200)
      res.send(response.data);
    else
      res.send({data:[],status:{}});
  }).catch((err) => {
    res.send(err);
  });
});

app.listen(4200, () => console.log("node server on 4200"));