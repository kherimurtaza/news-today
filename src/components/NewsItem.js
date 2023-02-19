import React, { Component } from 'react'

export class NewsItem extends Component {
  
  render()
  {
    let {title,description, imageUrl, newsUrl, author, date, source} =  this.props;

    return (
      <div className='my-3'>
        <div className="card" style={{width: "18rem"}}>
        
            <img src={!imageUrl?"https://mma.prnewswire.com/media/539438/Research_and_Markets_Logo.jpg?p=facebook":imageUrl} className="card-img-top" alt="..."/>
            <div className="card-body">
            <span className="badge rounded-pill bg-danger">{source}</span>
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{description}</p>
              <p className="card-text"><small className="text-muted"> By {!author ? 'Unknown' : author } {new Date(date).toGMTString()}</small></p>
              <a href={newsUrl} target='blank' className="btn btn-primary">Read more</a>
            </div>
          </div>
      </div>
    )
  }
}

export default NewsItem
