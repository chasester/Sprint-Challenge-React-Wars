import React from 'react';
import StarWarsItem from './StarWarsItem';
import './StarWars.css';

class StarWarsList extends React.Component
{
    render()
    {
        if(this.props.data === undefined || this.props.data.length <= 0) return "";
        let title = this.props.data.length > 1 && this.props.plurltitle ? this.props.plurltitle : this.props.title;
        return(
            <div className={`list-container list-container-${title}`}>
                <div className={`list-title list-title-${title}`}>{title}</div>
                {this.props.data.map((x,i)=> <StarWarsItem key={`${this.key}:${i}`} title={""} data={x} url={true} date={false} />)}
            </div>
        )
    }
}
//
export default StarWarsList;