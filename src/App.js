import React from 'react';
import Search from './Search';
import BookShelves from './BookShelves';
import * as BooksAPI from './BooksAPI';
import './App.css'
import { Route } from 'react-router-dom';

class BooksApp extends React.Component {
  state = {
    books: []
  }

  // Displays the books when the components are mounted
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
  }

  // Updates the shelf using BooksAPI method and also updates the state
  changeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf);
    BooksAPI.getAll().then((books) => {
      this.setState({books});
    })
  }

  // Renders the 2 pages(Main and search) using router.
  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <BookShelves
            books = {this.state.books}
            changeShelf = {this.changeShelf}
          />
        )} />

        <Route path="/search" render={() => (
          <Search
            changeShelf = {this.changeShelf}
            books = {this.state.books}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
