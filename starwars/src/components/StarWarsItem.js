import React from 'react';

class StarWarsItem extends React.Component
{
    
    render(){
        let data;
        data = this.props.data;
        return (<div className={`list-item item-${this.props.name}`}>{`${this.props.title} ${data}`}</div>)
    }
    getUrlData(URL)
    {
        fetch(URL)
        .then(res => {
          return res.json();
        })
        .then(data => {
          return data.results;
        })
        .catch(err => {
          return null;
        });
    }
}

export default StarWarsItem;