import React, { Component } from "react";
export class NewsItem extends Component {
  render() {
    let { title, imgUrl, discription, source, colour, author, date, newsUrl } =
      this.props;
    return (
      <div className="container mt-5">
        <div
          className="card d-flex justify-content-between "
          style={{
            // border: "solid black",
            transition: "box-shadow 0.3s ease-in-out",
            width:"25rem",
            height:"32rem"
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              position: "absolute",
              right: "0",
            }}
          >
            <span className={`badge bg-${colour}`}>{source}</span>
          </div>
          <img
            src={imgUrl}
            className="card-img-top fixed-img "
            alt=".."
          />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{discription}...</p>
            <p className="card-text">
              <small className="text-body-secondary">
                By {author} on {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              href={newsUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-sm btn-primary "
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}
export default NewsItem;
