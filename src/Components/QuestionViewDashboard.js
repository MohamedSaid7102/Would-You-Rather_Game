import React, { Component } from 'react';
import { connect } from 'react-redux';
import QuestionAnswer from './QuestionsForm/QuestionAnswer';
import QuestionResult from './QuestionsForm/QuestionResult';

class QuestionViewDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answered: false,
    };
  }

  render() {
    // 1. userAnsweredQuestionsIds: contains all current authedUser answered questions and it's answers
    const { qid, question, currentUser } = this.props;
    let userAnsweredQuestionsIds = Object.keys(currentUser.answers);

    if (userAnsweredQuestionsIds.includes(qid))
      return <QuestionResult question={question} />;

    if (!userAnsweredQuestionsIds.includes(qid))
      return <QuestionAnswer question={question} />;

    return <div></div>;
  }
}

const mapStateToProps = ({ questions, authedUser, users }, props) => {
  const { qid } = props.match.params;
  return {
    qid,
    question: questions[qid],
    currentUser: users[authedUser.authedUser],
    uid: users[authedUser.authedUser].id,
  };
};
export default connect(mapStateToProps)(QuestionViewDashboard);
