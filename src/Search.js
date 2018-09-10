import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import Book from './Book';
import { Link } from 'react-router-dom';
class Search extends Component {
  state = {
    query: '',
    matchedBooks: []
  }

  // Update state when a query is typed in
  updateSearchQuery = (query) => {
    this.setState({
      query: query
    })
    this.getMatchedBooks(query);
  }

  // Calls the BooksAPI method to search for a query
  getMatchedBooks = (query) => {
    if(query) {
      BooksAPI.search(query).then((matchedBooks) => {
        if(matchedBooks.error) {
          this.setState({matchedBooks: [] });
        }
        else {
          this.setState({matchedBooks});
        }
      })
    }
    else {
      this.setState({matchedBooks: [] });
    }
  }
  // Provides input box for typing query and displays matching results
  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author"
              value={this.state.query}
              onChange={(event) => this.updateSearchQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {
              this.state.matchedBooks.map(matchedBook => {
                let shelf="none";
                this.props.books.map(book => (
                  book.id === matchedBook.id ? shelf = book.shelf : ''
                ));
                return (
                  <li key={matchedBook.id}>
                    <Book book = {matchedBook} changeShelf={this.props.changeShelf} shelf={shelf}/>
                  </li>
                );
              })
            }
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;
