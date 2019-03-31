import React, { Component } from 'react';
import apiURL from '../../api';
import { Button, FormControl, Form } from 'react-bootstrap';

export default class AddReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      score: 5,
      sent: false,
      error: ''
    }
    this.onCommentChange = this.onCommentChange.bind(this);
    this.sendReview = this.sendReview.bind(this);
    this.onScoreChange = this.onScoreChange.bind(this);
  }

  onScoreChange = (e) => {
    e.preventDefault();
    this.setState({ score: e.target.value })
  }

  onCommentChange = (e) => {
    e.preventDefault();
    this.setState({ comment: e.target.value })
  }

  sendReview = (e) => {
    e.preventDefault();
    fetch(`${apiURL}/api/review/${this.props.storyID}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        comment: this.state.comment,
        score: this.state.score,
        reviewer: this.props.username
      })
    }).then((response) => {
      switch (response.status) {
        case 200:
          break;
        default:
          this.setState({error: 'Error adding review'})
          break;
      }
      return;
    })
  }

  render() {
    return (
      <React.Fragment>
        <Form inline style={{ alignItems: "baseline", display: "flex", justifyContent: 'center' }} onSubmit={this.onGoSubmit}>
          <h6>{this.state.error}</h6>
          <FormControl
            as="textarea"
            rows="2"
            placeholder="Enter a comment..."
            value={ this.state.comment }
            onChange={ this.onCommentChange }
            style={{ resize: "none", marginRight: "10px" , width: "50%", height: "100px"}}
          />
          <div style={{ display: "flex", flexFlow: "wrap" }}>
            <Button
              variant="info"
              disabled={ this.state.disabled }
              onClick={ this.sendReview }
              style={{ marginRight: "50%", marginBottom: "6px"}}
            >Post</Button>
            <Form.Control
              as="select"
              value={ this.state.score }
              onChange={ this.onScoreChange }
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Form.Control>
          </div>
        </Form>
      </React.Fragment>
    )
  }
}