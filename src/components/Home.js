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
    country: "us",
    pageSize: 9,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  // Helper function to safely fetch JSON
  safeFetchJson = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  // Function to fetch fresh news from NewsAPI and store in MongoDB
  fetchFreshNews = async () => {
    try {
      const response = await this.safeFetchJson(
        `/api/fetch-news?category=${this.props.category}&country=${this.props.country}`
      );
      if (response.success) {
        console.log(`Fetched ${response.count} fresh articles for ${this.props.category}`);
        // After fetching fresh news, get the stored news
        this.updatePage();
      }
    } catch (error) {
      console.error("Error fetching fresh news:", error);
    }
  };

  fetchMoreData = async () => {
    this.setState({ loading: true });
    const url = `/api/get-news?category=${this.props.category}&country=${this.props.country}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;

    try {
      let parsedData = await this.safeFetchJson(url);
      
      if (parsedData.status === "ok" && parsedData.articles.length > 0) {
        this.setState({
          articles: this.state.articles.concat(parsedData.articles),
          totalResults: parsedData.totalResults,
          loading: false,
          page: this.state.page + 1,
        });
      } else {
        // If no more articles, try to fetch fresh news
        await this.fetchFreshNews();
        this.setState({ loading: false });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      this.setState({ loading: false });
    }
  };

  updatePage = async () => {
    this.props.setProgress(0);
    const url = `/api/get-news?category=${this.props.category}&country=${this.props.country}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.props.setProgress(10);

    this.setState({ loading: true });

    try {
      let parsedData = await this.safeFetchJson(url);
      
      if (parsedData.status === "ok") {
        if (parsedData.articles.length === 0) {
          // No articles in database, fetch fresh news first
          console.log("No articles found in database, fetching fresh news...");
          await this.fetchFreshNews();
          return;
        }
        
        console.log("Fetched from MongoDB:", parsedData.articles.length);
        document.title = "News-App";
        this.props.setProgress(70);

        this.setState({
          articles: parsedData.articles,
          totalResults: parsedData.totalResults,
          loading: false,
        });

        this.props.setProgress(100);
      } else {
        throw new Error("Failed to fetch news from database");
      }
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
      <div className="bg-secondary-subtle pt-5">
        <h1 className="text-center fw-bold">News - Top Headlines</h1>
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
