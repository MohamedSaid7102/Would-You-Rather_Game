import React, { Component } from 'react';

class ErrorPage extends Component {
  render() {
    const { text } = this.props;
    return (
      <div style={{ display: 'grid', minHeight: '50vh', placeItems: 'center' }}>
        <h1>Erro 404: Page not found</h1>
        <p>{text ? text : ''}</p>
      </div>
    );
  }
}
export default ErrorPage;
