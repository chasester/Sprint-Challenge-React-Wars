import React, { Component } from 'react';
import './App.css';
import StarWarsItem from './components/StarWarsItem';
import StarWarsList from './components/StarWarsList';

class App extends Component {
  constructor() {
    super();
    this.state = {
      starwarsChars: []
    };
  }

  componentDidMount() {
    this.getCharacters('https://swapi.co/api/people/');
    window.onscroll = ()=> this.scrolling();
  }

  scrollbottom = null;
  gathering = true;
  passoff = null;
  
  scrolling()
  {
    if(!this.scrollbottom){let a = [...document.querySelectorAll(".char-container")]; this.scrollbottom = a[a.length-5 > 0 ? a.length-5 : 0].offsetTop;}
    if(this.scrollbottom <= window.pageYOffset+window.screen.height && !this.gathering)
    {
     
      this.getCharacters(`https://swapi.co/api/people/${this.state.starwarsChars.length+1}/`);
      this.setState(this.state);
      this.gathering = true;
    }

  }
  getCharacters = URL => {
    // feel free to research what this code is doing.
    // At a high level we are calling an API to fetch some starwars data from the open web.
    // We then take that data and resolve it our state.
    fetch(URL)
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.passoff = data;
        this.setState({ starwarsChars: [...this.state.starwarsChars, ...data.results ]});
        this.gathering = false;
        this.scrollbottom = null;
        this.passoff = null;
      })
      .catch(err => {
        this.setState({ starwarsChars: [...this.state.starwarsChars, this.passoff]});
        this.gathering = false;
        this.scrollbottom = null;
      }).catch( () => {console.log("error");this.gathering = true;});
  };
//<li>Home World: { fetch(x.homeworld).then(res=> res.json()).then(data => data.results).catch(err => {throw new Error(err)})}</li>
  render() {
   
    let l = this.state.starwarsChars.map( (x,i) =>
    {
      let j = 0;
        if(x.name === undefined) return"";
        return (
          <div className="char-container" key={i} > <h3>{x.name}</h3>
            <div className="apperence">
              <div>
                <StarWarsItem key={`${j++}:${i}`} title={"Birth Year:"} data={x.birth_year} url={false} date={true}/>
                <StarWarsItem key={`${j++}:${i}`} title={"Gender:"} data={x.gender} url={false} date={false}/>
                <StarWarsItem key={`${j++}:${i}`} title={"Height:"} data={x.height} url={false} date={false}/>
                <StarWarsItem key={`${j++}:${i}`} title={"Mass:"} data={x.mass} url={false} date={false}/>
              </div>
              <div>
                <StarWarsItem key={`${j++}:${i}`} title={"Eye Color:"} data={x.eye_color} url={false} date={false}/>
                <StarWarsItem key={`${j++}:${i}`} title={"Hair Color:"} data={x.hair_color} url={false} date={false}/>
                <StarWarsItem key={`${j++}:${i}`} title={"Skin Color:"} data={x.skin_color} url={false} date={false}/>
              
              </div>
            </div>
            <StarWarsItem key={`${j++}:${i}`} title={"Home World:"} data={ x.homeworld} url={false} date={false}/>
            <div className="data-lists">
              <StarWarsList key={`${j++}:${i}`} title={"Film:"} plurltitle={"Films:"} data={x.films} url={false} date={false}/>
              <StarWarsList key={`${j++}:${i}`} title={"Vehicle:"} plurltitle={"Vehicles:"} data={x.vehicles} url={false} date={false}/>
              <StarWarsList key={`${j++}:${i}`} title={"Species:"} plurltitle={"Species:"} data={x.species} url={false} date={false}/>
            </div>

            <div className="meta">
              <StarWarsItem key={`${j++}:${i}`} title={"Created:"} data={x.created} url={false} date={true}/>
              <StarWarsItem key={`${j++}:${i}`} title={"Edited:"} data={x.edited} url={false} date={true}/>
            </div>

            {//if(x.starships.length > 0) {<li>{x.starships.length > 1 ? <ul>Star Ships: {x.starships.map(y=><li>{y}</li>)}</ul> : <div> Star Ship: {x.starships}</div>}</li>}
            }
          </div>
        );
    }
    );
    return (
      <div className="container">
        <h1 className="Header">React Wars</h1>
        <div className="image"></div>
        <div className="content">
        {l}
        </div>
      </div>
    );
  }
}

export default App;
