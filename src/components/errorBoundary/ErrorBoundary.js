import { Component } from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";

class ErrorBoundary extends Component {
  state = {
    error: false,
  };

  componentDidCatch(err, info) {
    // приймає в сеье два аргументи - err - сама помилка, а info - в якому компоненті відбулась помилка.
    console.log(err, info);
    this.setState({ error: true });
  }

  render() {
    if (this.state.error) {
        return <ErrorMessage/>
    }

    return this.props.children;

  }
}

export default ErrorBoundary;
