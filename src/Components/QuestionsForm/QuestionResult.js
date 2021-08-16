import React, { Component } from 'react';

export default class QuestionResult extends Component {
  render() {
    console.log(`The Question is:`, this.props.question);
    return <div>Question Result 🎉🎉🎉🎉</div>;
  }
}
