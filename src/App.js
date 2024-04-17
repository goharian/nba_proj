import React, {Component} from 'react';
import './App.css';
import axios from 'axios'

class App extends Component {
  constructor(props){
    super(props)
    this.state={
      players:[]
    }
  }

  async componentDidMount(){
    const url = "http://api.balldontlie.io/v1/players"
    let result = null; 
    try{
      result = await axios.get(url, {
        headers:{
          "Content-Type": "application/json",
          Authorization: 'afe25e37-3a9d-4920-a7fe-3aa9148367af'
        }
      })
      console.log(result);
      
      this.setState({players: result?.data.data})
    }catch(e){
      console.error('ERR::::', e)
    }
  }
  render(){
    const {players} = this.state;
    console.log({players})
    let mappedArray = (players).map((players) =>{
      return(
        <li>{players.first_name} {players.last_name} {players.weight_pound}</li>
      )
    })
  return (
    <div className="App">
      <ul>
        {mappedArray}
      </ul>
    </div>
  );
}
}
export default App;
