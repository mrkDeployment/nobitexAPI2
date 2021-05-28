import React from 'react';
import '../App.css';
import axios from 'axios'
import {withRouter} from 'react-router'

class List extends React.Component {
  constructor(props){
    super(props)
    this.state={
    }
  }

  componentDidMount () {
    this.interval = setInterval(() => {
      this.handleMax()
    }, 3000)
    }

  async handleMax(){

    let data100 = {
      symbol: "USDTIRT"
    }

    var audio = new Audio('https://media.geeksforgeeks.org/wp-content/uploads/20190531135120/beep.mp3');

    axios.post('https://api.nobitex.ir/v2/trades', data100,{})
    .then((response) => {
      this.setState({ tether: Number.parseFloat(response.data.trades[0].price, 10) })
    })
    .catch((error) => {
      console.log('erroppppppp')
    })

    let coin_list = [
      "btc",
      "eth",
      "ltc",
      "bch",
      "xlm",
      "trx",
      "doge",
      "etc",
      "bnb",
      "eos",
      "xrp",
    ]

    let nobitex_coin_list = [
      "BTCIRT",
      "ETHIRT",
      "LTCIRT",
      "BCHIRT",
      "XLMIRT",
      "TRXIRT",
      "DOGEIRT",
      "ETCIRT",
      "BNBIRT",
      "EOSIRT",
      "XRPIRT",
    ]

    let binance_coin_list = [
      "BTCUSDT",
      "ETHUSDT",
      "LTCUSDT",
      "BCHUSDT",
      "XLMUSDT",
      "TRXUSDT",
      "DOGEUSDT",
      "ETCUSDT",
      "BNBUSDT",
      "EOSUSDT",
      "XRPUSDT",
    ]

    let exir_coin_list = [
      "btc-irt",
      "eth-irt",
      "ltc-irt",
      "bch-irt",
      "xlm-irt",
      "trx-irt",
      "doge-irt",
      // "etc-irt",
      // "bnb-irt",
      // "eos-irt",
      // "xrp-irt",
    ]

    
    for (let i = 1; i < nobitex_coin_list.length+1; i++) {

      var j = i-1;
      window["data"+j] = {
        symbol: nobitex_coin_list[i-1]
      }


      // nobitex API

      await axios.post('https://api.nobitex.ir/v2/trades', window["data"+j],{})
      .then((response) => {
        var price= Number.parseFloat(response.data.trades[0].price, 10)/this.state.tether
        // this.setState({nobitex_volume2: response.data.trades[0].volume})
        this.setState({ [`nobitex_price${j}`]: price })
      })
      .catch((error) => {
        console.log('erroppppppp')
      })
      
      //binance API

      await axios.get("https://api.binance.com/api/v3/ticker/price?symbol="+binance_coin_list[j], {
      })
      .then(response => {
        var price= Number.parseFloat(response.data.price, 10)
        console.log('aaaaaaaa')
        this.setState({ [`binance_price${j}`]: price })
      })
      .catch(error => {
        console.log(error);
      });

      if(this.state[`binance_price${j}`]>=this.state[`nobitex_price${j}`]){
        this.setState({ [`min${j}`]: this.state[`binance_price${j}`] })
        this.setState({ [`name_min${j}`]: binance_coin_list[j] })
        this.setState({ [`max${j}`]: this.state[`nobitex_price${j}`] })
        this.setState({ [`name_max${j}`]: nobitex_coin_list[j] })
      }else{
        this.setState({ [`max${j}`]: this.state[`binance_price${j}`] })
        this.setState({ [`name_max${j}`]: binance_coin_list[j] })
        this.setState({ [`min${j}`]: this.state[`nobitex_price${j}`] })
        this.setState({ [`name_min${j}`]: nobitex_coin_list[j] })
      }

      //exir API
      // if(j<7){
      //   await axios.get('https://api.exir.io/v1/trades', {
      //   })
      //   .then(response => {
      //     var price= Number.parseFloat(response.data[exir_coin_list[j]][0].price, 10)/Number.parseFloat(response.data["usdt-irt"][0].price, 10)
      //     this.setState({ [`exir_price${j}`]: price })
      //   })
      //   .catch(error => {
      //     console.log('error:')
      //   })

      //   if(this.state[`binance_price${j}`]>=this.state[`exir_price${j}`]){
      //     this.setState({ [`minn${j}`]: this.state[`binance_price${j}`] })
      //     this.setState({ [`name_minn${j}`]: binance_coin_list[j] })
      //     this.setState({ [`maxx${j}`]: this.state[`exir_price${j}`] })
      //     this.setState({ [`name_maxx${j}`]: exir_coin_list[j] })
      //   }else{
      //     this.setState({ [`maxx${j}`]: this.state[`binance_price${j}`] })
      //     this.setState({ [`name_maxx${j}`]: binance_coin_list[j] })
      //     this.setState({ [`minn${j}`]: this.state[`exir_price${j}`] })
      //     this.setState({ [`name_minn${j}`]: exir_coin_list[j] })
      //   }

      //   // if(Math.abs((this.state[`maxx${j}`]-this.state[`minn${j}`])/this.state[`minn${j}`]*100)>4 && this.state[`binance_price${j}`] > this.state[`exir_price${j}`]){
      //   //   console.log("maxxxx",this.state[`maxx${j}`],this.state[`name_maxx${j}`])
      //   //   console.log("minnnn",this.state[`minn${j}`],this.state[`name_minn${j}`])
      //   //   console.log("exir",this.state[`binance_price${j}`])
      //   //   // console.log("nobitex",  this.state.binance_price,this.state.nobitex_volume)
      //   //   var now = new Date();
      //   //   console.log("taghir",(this.state[`maxx${j}`]-this.state[`minn${j}`])/this.state[`minn${j}`]*100,now) 
      //   //   audio.play(); 
      //   // }
        
      // }

      if(Math.abs((this.state[`max${j}`]-this.state[`min${j}`])/this.state[`min${j}`]*100)>2.4 && this.state[`binance_price${j}`] > this.state[`nobitex_price${j}`]){
        console.log("nobitex",(this.state.tether)*0.985*this.state[`binance_price${j}`])
        console.log("maxxxx",this.state[`max${j}`],this.state[`name_max${j}`])
        console.log("minnnn",this.state[`min${j}`],this.state[`name_min${j}`])
        // console.log("nobitex",  this.state.binance_price,this.state.nobitex_volume)
        var now = new Date();
        console.log("taghir",(this.state[`max${j}`]-this.state[`min${j}`])/this.state[`min${j}`]*100,now) 
        audio.play(); 

        let allowed_price = (this.state.tether)*0.985*this.state[`binance_price${j}`]
        let amount=10000000/allowed_price

        let NobitexToken= window.localStorage.getItem('NobitexToken');

        let buy_data = {
          type: "buy",
          srcCurrency: coin_list[j],
          dstCurrency: "rls",
          amount: String(amount),
          price: String(allowed_price)
        }
    
        let config = {
          headers: { Authorization: `token ${NobitexToken}` }
        };
    
        await axios.post('https://api.nobitex.ir/market/orders/add', buy_data,config)
        .then((response) => {
          console.log('buy',response)
        })
        .catch((error) => {
          console.log('erroppppppp',error)
        })
      }
      

      // if(Math.abs((this.state[`max${j}`]-this.state[`min${j}`])/this.state[`min${j}`]*100)>1.2 && this.state[`binance_price${j}`] < this.state[`nobitex_price${j}`]){
      //   console.log("maxxxx",this.state[`max${j}`],this.state[`name_max${j}`])
      //   console.log("minnnn",this.state[`min${j}`],this.state[`name_min${j}`])
      //   console.log("nobitex",this.state[`binance_price${j}`])
      //   // console.log("nobitex",  this.state.binance_price,this.state.nobitex_volume)
      //   var now = new Date();
      //   console.log("taghir",(this.state[`max${j}`]-this.state[`min${j}`])/this.state[`min${j}`]*100,now) 
      //   audio.play(); 
      // }

      // if(this.state[`nobitex_price${0}`]*(this.state.tether)<91650){
      //   console.log(this.state[`nobitex_price${0}`]*(this.state.tether))
      //   console.log("maxxxx",this.state[`max${j}`],this.state[`name_max${j}`])
      //   console.log("minnnn",this.state[`min${j}`],this.state[`name_min${j}`])
      //   console.log("nobitex",(this.state.tether)*this.state[`binance_price${j}`])
      //   // console.log("nobitex",  this.state.binance_price,this.state.nobitex_volume)
      //   var now = new Date();
      //   console.log("taghir",(this.state[`max${j}`]-this.state[`min${j}`])/this.state[`min${j}`]*100,now) 
      //   audio.play(); 
      // }

    }
  }

  handleChange = (e) => {
    this.setState({ 'NobitexToken': e.target.value })
    { e.target.value === '' && this.setState({ 'NobitexToken': null})}
  }

  handleClickButton = () => {
    window.localStorage.setItem('NobitexToken',this.state.NobitexToken)
  }

  async Buy() {

    let NobitexToken= window.localStorage.getItem('NobitexToken');

    let allowed_price = 300000
    let amount=10000000/allowed_price

    let buy_data = {
      type: "buy",
      srcCurrency: "btc",
      dstCurrency: "rls",
      amount: String(amount),
      price: String(allowed_price)
    }

    let config = {
      headers: { Authorization: `token ${NobitexToken}` }
    };

    await axios.post('https://api.nobitex.ir/market/orders/add', buy_data,config)
    .then((response) => {
      console.log('buy',response)
    })
    .catch((error) => {
      console.log('erroppppppp',error)
    })
  }

  render(){
    return (
      <div className="Container">
        <div className="NobitexToken">
          <p>Nobitex Token</p>
          <input
            className="NobitexToken"
            placeholder="Nobitex Token"
            onChange={(e) => this.handleChange(e)}
          />
          <button
            onClick={(e) => this.handleClickButton(e)}
          >send</button>

          <button
            onClick={(e) => this.Buy(e)}
          >Buy</button>
        </div>
      </div>
    );
  }
}
export default withRouter(List);
