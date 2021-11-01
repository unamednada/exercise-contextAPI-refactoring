import React from "react";
import RedditContext from "./RedditContext";
import { getPostsBySubreddit } from "../services/redditAPI";

class Provider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      shouldRefreshSubreddit: false,
      selectedSubreddit: 'reactjs',
      postsBySubreddit: {
        frontend: {},
        reactjs: {},
      },
    }
  }

  componentDidUpdate(_pveProps, prevState) {
    const { shouldRefreshSubreddit, selectedSubreddit } = this.state;
    const selectedSubredditChanged = prevState.selectedSubreddit !== selectedSubreddit;

    if (selectedSubredditChanged || shouldRefreshSubreddit ) {
      this.fetchPosts();
    }
  }

  fetchPosts() {
    if (!this.shouldFetchPosts()) return;

    this.setState({
      shouldRefreshSubreddit: false,
      isFetching: true,
    });

    const { selectedSubreddit } = this.state;
    getPostsBySubreddit(selectedSubreddit)
      .then(this.handleFetchSuccess, this.handleFetchError);
  }

  shouldFetchPosts() {
    const {
      selectedSubreddit,
      postsBySubreddit,
      isFetching,
      shouldRefreshSubreddit,
    } = this.state;
    const posts = postsBySubreddit[selectedSubreddit];

    if (!posts.items) return true;
    if (isFetching) return false;
    return shouldRefreshSubreddit;
  }

  handleFetchSuccess(json) {
    const lastUpdated = Date.now();
    const items = json.data.children.map((child) => child.data);

    this.setState((state) => {
      const newState = {
        ...state,
        shouldRefreshSubreddit: false,
        isFetching: false,
      };

      newState.postsBySubreddit[state.selectedSubreddit] = {
        items,
        lastUpdated,
      };

      return newState;
    })
  }

  handleFetchError(error) {
    this.setState((state) => {
      const newState = {
        ...state,
        shouldRefreshSubreddit: false,
        isFetching: false,
      }

      newState.postsBySubreddit[state.selectedSubreddit] = {
        error: error.message,
        items: [],
      }

      return newState;
    })
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
