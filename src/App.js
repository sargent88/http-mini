import React, { Component } from 'react';
import {getEnemies} from './services/enemies'
import {getTroops, addTroop} from './services/troops'
import './styles/App.css';

getEnemies().then(enemies => {
  console.log(enemies)
})

class App extends Component {

constructor(props) {
  super(props);

  this.state = {
    enemies: [],
    troops: [],
    recruit: ''
  }

  this.seeEnemies = this.seeEnemies.bind(this);
  this.handleChange = this.handleChange.bind(this);
  this.recruitTroop = this.recruitTroop.bind(this);
}

componentDidMount() {
  this.callTroops()
}


  seeEnemies() {
    getEnemies().then(enemies => {
      this.setState({
        enemies: enemies
      })
    })
  }

  callTroops() {
      getTroops().then(troops=> {
    this.setState({
      troops: troops
    })
  })
  }

  recruitTroop(event) {
    event.preventDefault();
    if(this.state.newRecruit){
      addTroop(this.state.newRecruit).then(() => {
        this.callTroops();
        this.setState({
          newRecruit: ''
        })
      })
    }
  }


  transformMinion() {
  }

  slayLeader() {
  }

  handleChange(event) {
    this.setState({
      newRecruit: event.target.value
    })
  }


  render() {

    const troops = this.state.troops.map((troop, i) => (<li className='troop' key={i}>{troop.recruit}</li>))

    const enemies = this.state.enemies.map((enemy, i) => (
      <ul className='army'>
        <h3>Enemy Army #{enemy.id}: {enemy.name}</h3>

        <div className='leader'>
          {enemy.leader}
        </div>

        <ul className='minions'>
          {enemy.minions.map((minion, i) => (<li className='minion' key={i}>{minion.type}</li>))}
        </ul>
      </ul>
    ))

    const message = this.state && this.state.enemies.length < 1 ? "ALL CLEAR" : "";

    return (
      <div className="App">

        {/* Main Defenses */}
        <div className="App-header">
          <h1>Enemies at our gate!</h1>
          <h2>Prepare our defenses!</h2>
          <div className="defenses">
            <div onClick={this.seeEnemies} className="defense" id="sentry">Sentry<span className="instructions">Click here to see approaching enemies!</span></div>
            <div className="defense" id="captain">Captain<span className="instructions">Fill out Request Form below to recruit new troop!</span></div>
            <div className="defense" id="wizard">Wizard<span className="instructions">Click directly on a minion to cast a spell!</span></div>
            <div className="defense" id="ballista">Ballista<span className="instructions">Blast enemy leader to disperse army!</span></div>
          </div>
        </div>


        {/* Reinforcements */}
        <div className="reinforcements">
          <form type="submit">
            New Recruit Request Form:
            <input onChange={this.handleChange} value={this.state.newRecruit} id="paperwork" placeholder="Please indicate requested recruit"/>
            <button onClick={this.recruitTroop}>Enlist!</button>
          </form>

          <div id="wall">
            <span></span><span id="gate"></span><span></span>
          </div>
        </div>

        <ul className="troops">
          {troops}
        </ul>

        <h1 id="message">{message}</h1>

        {/* Enemy Armies */}
        <div className="enemies">
        {enemies}
        </div>
      </div>
    );
  }
}

export default App;
