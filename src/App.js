import React, { Component } from 'react'
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

export default class App extends Component {
  pageSize = 9;
  apikey = process.env.REACT_APP_NEWS_API_KEY
  state = {
    progress: 0
  }
  setProgress = (progress) => {
    this.setState({ progress: progress });
  };
  render() {
    return (
      <div>
        <Router>
          <LoadingBar
            color='#f11946'
            progress={this.state.progress}
            onLoaderFinished={() => this.setProgress(0)}
          />
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home apiKey={this.apikey} setProgress={this.setProgress} key="general" pageSize={this.pageSize} colour={"primary"} country={"us"} category="general" />}></Route>
            <Route exact path="/sports" element={<Home apiKey={this.apikey} setProgress={this.setProgress} key="sports" pageSize={this.pageSize} colour={"success"} country={"us"} category="sports" />}></Route>
            <Route exact path="/business" element={<Home apiKey={this.apikey} setProgress={this.setProgress} key="business" pageSize={this.pageSize} colour={"danger"} country={"us"} category="business" />}></Route>
            <Route exact path="/entertainment" element={<Home apiKey={this.apikey} setProgress={this.setProgress} key="entertainment" colour={"warning"} pageSize={this.pageSize} country={"us"} category="entertainment" />}></Route>
            <Route exact path="/health" element={<Home apiKey={this.apikey} setProgress={this.setProgress} key="health" pageSize={this.pageSize} colour={"info"} country={"us"} category="health" />}></Route>
            <Route exact path="/science" element={<Home apiKey={this.apikey} setProgress={this.setProgress} key="science" pageSize={this.pageSize} colour={"dark"} country={"us"} category="science" />}></Route>
            <Route exact path="/technology" element={<Home apiKey={this.apikey} setProgress={this.setProgress} key="technology" colour={"secondary"} pageSize={this.pageSize} country={"us"} category="technology" />}></Route>
          </Routes>
        </Router>
        {/* <LoadingBar
            color='#f11946'
            progress={this.state.progress}
          /> */}
      </div>
    );
  }
}