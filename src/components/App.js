import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import PageNotFound from './PageNotFound';
import ProfilePage from './ProfilePage';
import SearchPage from './SearchPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<SearchPage />} exact />
          <Route path='/user/:userid' element={<ProfilePage />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
