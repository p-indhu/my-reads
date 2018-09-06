import React from 'react';
import Search from './Search';
import BookShelves from './BookShelves';
import * as BooksAPI from './BooksAPI';
// import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
  }

  changeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf);
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
  }

  render() {
    return (
      <div className="app">
          <BookShelves
              books = {this.state.books}
              changeShelf = {this.changeShelf}
          />
      </div>
    )
  }
}

export default BooksApp
