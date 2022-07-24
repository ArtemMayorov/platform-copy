import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';

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
  const { requestStatus, token, userAuthorizationStatus } = useSelector((state) => state.user);
  const { requestStatusNewArticle, slugArticle } = useSelector((state) => state.articlesList);

  useEffect(() => {
    if (Cookies.get('token')) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch]);
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

export default App;
