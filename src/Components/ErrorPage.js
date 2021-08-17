import React, { Component } from 'react';

class ErrorPage extends Component {
  render() {
    return (
      <div style={{ display: 'grid', minHeight: '50vh', placeItems: 'center' }}>
        <h1>Erro 404: Page not found</h1>
      </div>
    );
  }
}
export default ErrorPage;
