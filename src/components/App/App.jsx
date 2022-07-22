import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';

// import CardList from 'components/CardList/CardList';
import ArticleList from 'components/ArticleList/ArticleList';
import ArticlePage from 'components/Pages/ArticlePage/ArticlePage';
import SignUpPage from 'components/Pages/SignUpPage/SignUpPage';
import SignInPage from 'components/Pages/SignInPage/SignInPage';
import CreateArticlePage from 'components/Pages/CreateArticlePage/CreateArticlePage';
import EditArticlePage from 'components/Pages/EditArticlePage/EditArticlePage';
import ProfileEditPage from 'components/Pages/ProfileEditPage/ProfileEditPage';
import { fetchCurrentUser } from 'Store/Slices/userSlice';

import Header from '../Header/Header';

import s from './App.module.scss';

function App() {
  const dispatch = useDispatch();
  const { requestStatus, token, loading, userAuthorizationStatus } = useSelector((state) => state.user);
  const { requestStatusNewArticle, slugArticle } = useSelector((state) => state.articlesList);

  useEffect(() => {
    if (Cookies.get('token')) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch]);
  console.log('token', token);
  console.log('userAuthorizationStatus', userAuthorizationStatus);
  console.log('loading', loading);
  return (
    <div className={s.container}>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/articles">
            <ArticleList />
          </Route>
          <Route exact path="/articles/:slug?">
            <ArticlePage />
          </Route>
          <Route exact path="/sign-up">
            {requestStatus === 'successfully' ? <Redirect to="/sign-in" /> : <SignUpPage />}
          </Route>
          <Route path="/sign-in">
            {requestStatus === 'successfully' || userAuthorizationStatus ? <Redirect to="/" /> : <SignInPage />}
          </Route>
          {/* <Route path="/sign-in">{requestStatus === 'successfully' ? <Redirect to="/" /> : <SignInPage />}</Route> */}
          <Route path="/profile">
            <ProfileEditPage />
          </Route>
          {token && (
            <Route path="/new-article">
              {requestStatusNewArticle === 'successfully' ? (
                <Redirect to={`/articles/${slugArticle}`} />
              ) : (
                <CreateArticlePage />
              )}
            </Route>
          )}
          <Route path="/new-article">
            {userAuthorizationStatus ? <CreateArticlePage /> : <Redirect to="/sign-in" />}
          </Route>
          {/* {!token && <Route path="/new-article">{token ? <Redirect to="/sign-in" /> : <CreateArticlePage />}</Route>} */}

          <Route path="/articles/:slug?/edit">
            {requestStatusNewArticle === 'successfully' ? (
              <Redirect to={`/articles/${slugArticle}`} />
            ) : (
              <EditArticlePage />
            )}
          </Route>

          <Route path="/">
            <ArticleList />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
// import React, { useEffect } from 'react';
// import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import Cookies from 'js-cookie';

// // import CardList from 'components/CardList/CardList';
// import ArticleList from 'components/ArticleList/ArticleList';
// import ArticlePage from 'components/Pages/ArticlePage/ArticlePage';
// import SignUpPage from 'components/Pages/SignUpPage/SignUpPage';
// import SignInPage from 'components/Pages/SignInPage/SignInPage';
// import CreateArticlePage from 'components/Pages/CreateArticlePage/CreateArticlePage';
// import EditArticlePage from 'components/Pages/EditArticlePage/EditArticlePage';
// import ProfileEditPage from 'components/Pages/ProfileEditPage/ProfileEditPage';
// import { fetchCurrentUser } from 'Store/Slices/userSlice';

// import Header from '../Header/Header';

// import s from './App.module.scss';

// function App() {
//   const dispatch = useDispatch();
//   const { requestStatus } = useSelector((state) => state.user);
//   const { requestStatusNewArticle, slugArticle } = useSelector((state) => state.articlesList);

//   useEffect(() => {
//     if (Cookies.get('token')) {
//       dispatch(fetchCurrentUser(Cookies.get('token')));
//     }
//   }, [dispatch]);

//   return (
//     <div className={s.container}>
//       <Router>
//         {/* <Switch> */}
//         <Header />
//         <Route path="/articles/:slug?">
//           <ArticlePage />
//         </Route>
//         <Route path="/sign-up">{requestStatus === 'successfully' ? <Redirect to="/sign-in" /> : <SignUpPage />}</Route>
//         <Route path="/sign-in">{requestStatus === 'successfully' ? <Redirect to="/" /> : <SignInPage />}</Route>
//         <Route path="/profile">
//           <ProfileEditPage />
//         </Route>
//         <Route path="/new-article">
//           {requestStatusNewArticle === 'successfully' ? (
//             <Redirect to={`/articles/${slugArticle}`} />
//           ) : (
//             <CreateArticlePage />
//           )}
//         </Route>
//         <Route path="/articles/:slug?/edit">
//           {requestStatusNewArticle === 'successfully' ? (
//             <Redirect to={`/articles/${slugArticle}`} />
//           ) : (
//             <EditArticlePage />
//           )}
//         </Route>
//         <Route exact path="/">
//           <ArticleList />
//         </Route>
//         {/* </Switch> */}
//       </Router>
//     </div>
//   );
// }

export default App;
