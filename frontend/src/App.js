import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AuthorsPage from './pages/AuthorsPage';
import BooksPage from './pages/BooksPage';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/authors" component={AuthorsPage} />
        <Route path="/books" component={BooksPage} />
      </Switch>
    </Router>
  );
}

export default App;