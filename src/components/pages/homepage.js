import React, { Component } from 'react'
import StoryItem from  '../bookshelf/storyItem';

export class homepage extends Component {
  componentWillMount(){
    this.getRandomStories(10);
    this.getNewStories(10);
  }

  getRandomStories(n){
    fetch('http://localhost:8080/api/stories/10')
      .then((response) => {
        switch (response.status) {
          case 200:
            break
          default:
            break;
        }
        return response.json()
      }).then((data) => {
        this.setState({randStories: data.stories})
      })
  }

  getNewStories(n){
    fetch('http://localhost:8080/api/newstories/10')
      .then((response) => {
        switch (response.status) {
          case 200:
            break
          default:
            break;
        }
        return response.json()
      }).then((data) => {
        this.setState({newStories: data.stories})
      })
  }

  render() {
    return (
        <React.Fragment>
            <h1>Homepage</h1>

            <div className="break"></div>

            <div className="main-panel-container">
              <header>New Stories</header>
              <hr></hr>
              <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
                {this.state && this.state.newStories && this.state.newStories.map(story => (
                  <StoryItem story={story}/>
                )
                )}
              </div>
            </div>

            <div className="break"></div>

            <div className="main-panel-container">
              <header>Random Stories</header>
              <hr></hr>
              <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
                {this.state && this.state.randStories && this.state.randStories.map(story => (
                  <StoryItem story={story}/>
                )
                )}
              </div>
            </div>

        </React.Fragment>
    )
  }
}

export default homepage
