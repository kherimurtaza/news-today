import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import propTypes from 'prop-types'

export class News extends Component {



  static defaultProps = {
    country : "in",
    pageSize : 6,
    category : 'general'
  }

    static propTypes = {
    country : propTypes.string,
    pageSize : propTypes.number,
    category : propTypes.string
    }


  constructor(){
    super();
    this.state = {
      articles: [],
      loading:false,
      page:1,

    }
  }

  async componentDidMount(){
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=67a71eb1586b4f598148b15ed64acf0d&pageSize=${this.props.pageSize}`
    this.setState({loading:true});
    let data = await fetch(url)
    let parsedData = await data.json()
    console.log(parsedData)
    this.setState({
      articles:parsedData.articles,
      totalResults: parsedData.totalResults,
      loading:false
    })
  }

   handlePrevClick = async () =>{
    console.log("prev")
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=67a71eb1586b4f598148b15ed64acf0d&page=${this.state.page -1 }&pageSize=${this.props.pageSize}`
    this.setState({loading:true});
    let data = await fetch(url)
    let parsedData = await data.json()
    console.log(parsedData)
    this.setState({
      page: this.state.page -1,
      articles:parsedData.articles,
      loading:false
    })

  }
  handleNextClick =  async () =>{
    console.log("next")
    if(! this.state.page +1 > Math.ceil(this.state.totalResults/this.props.pageSize)){
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=67a71eb1586b4f598148b15ed64acf0d&page=${this.state.page +1 }&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url)
    let parsedData = await data.json()
    this.setState({
      page: this.state.page +1,
      articles:parsedData.articles,
      loading:false
    })
  }
}
  render() {
    return (
      <div className='container my-3' >
        
        <h1 className='text-center'>Breaking News Headlines</h1>
        {this.state.loading && <Spinner/>}
        <div className='row'>
        {!this.state.loading && this.state.articles.map((element)=>{

        return <div className='col-md-4' key={element.url}>
        <NewsItem   title={element.title ? element.title.slice(0,45) : "" } description={element.description ? element.description.slice(0,88): ""} 
         imageUrl={element.urlToImage}
         newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
        </div>

      })}
      </div>
      <div className='container d-flex justify-content-between'>
      <button disabled={this.state.page<=1} type="button" className="btn btn-success" onClick={this.handlePrevClick}> 	&larr; Previous</button>
      <button type="button" disabled={this.state.page +1 > Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-success" onClick={this.handleNextClick}> &rarr; Next</button>
      </div>
      </div>
    )
  }
}

export default News
