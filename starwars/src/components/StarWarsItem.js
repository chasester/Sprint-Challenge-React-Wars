import React from 'react';

class StarWarsItem extends React.Component
{
    constructor(props)
    {
      super(props);
      this.state = {value: ""}
      if(props.url) this.URL = this.props.data;
    }
    URl = "";
    componentDidMount() {
      if(this.URL !=="")
        this.getUrlData(this.URL)
    }
  


    render(){
        let data = this.props.url ? this.state.value !== "" ? this.state.value : " -- " : this.props.data;
        return (<div className={`list-item item-${this.props.name}`}>{`${this.props.title} ${data}`}</div>)
    }
    getUrlData(URL)
    {
        fetch(URL)
        .then(res => {
          return res.json();
        })
        .then(data => {
          this.setState({value : data[Object.keys(data)[0]]})
        })
        .catch(err => {
          this.setState({value: "ERROR"});
        });
    }
}

export default StarWarsItem;