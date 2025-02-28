import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class Home extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
  }

  static defaultProps = {
    country: "in",
    pageSize: 9,
    category: "science",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  fetchMoreData = async () => {
    this.setState({ loading: true });
    const url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${
      this.state.page + 1
    }&pageSize=${this.props.pageSize}`;

    try {
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        articles: this.state.articles.concat(parsedData.articles),
        totalResults: parsedData.totalResults,
        loading: false,
        page: this.state.page + 1,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      this.setState({ loading: false });
    }
  };

  updatePage = async () => {
    this.props.setProgress(0);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.props.setProgress(10);

    this.setState({ loading: true });

    try {
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);

      document.title = "News-App";
      this.props.setProgress(70);

      this.setState({
        articles: parsedData.articles,
        totalResults: parsedData.totalResults,
        loading: false,
      });

      this.props.setProgress(100);
    } catch (error) {
      console.error("Error fetching data:", error);
      this.setState({ loading: false });
      this.props.setProgress(100);
    }
  };

  async componentDidMount() {
    this.updatePage();
  }

  render() {
    return (
      <div className="bg-secondary-subtle">
        <h1 className="text-center  fw-bold ">News - Top Headlines</h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles?.length || 0}
          next={this.fetchMoreData}
          hasMore={this.state.articles?.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container my-5">
            <div className="row">
              {this.state.articles?.map((element) => (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 50) : " "}
                    author={element.author || "Unknown"}
                    date={element.publishedAt}
                    source={element.source.name}
                    colour={this.props.colour}
                    discription={
                      element.description
                        ? element.description.slice(0, 120)
                        : " "
                    }
                    imgUrl={
                      element?.urlToImage
                        ? element.urlToImage
                        : "https://placehold.co/600x400/orange/white"
                    }
                    newsUrl={element.url}
                  />
                </div>
              ))}
            </div>
          </div>
        </InfiniteScroll>
      </div>
    );
  }
}

export default Home;
