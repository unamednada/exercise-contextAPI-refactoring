import React from "react";
import RedditContext from "./RedditContext";

class Provider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    const { children } = this.props;
    const context = {};
    return (
      <RedditContext.Provider value={ context }>
        { children }
      </RedditContext.Provider>
    )
  }
}

export default Provider;
