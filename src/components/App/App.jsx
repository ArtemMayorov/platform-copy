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
import routs from './routs';

function App() {
  const dispatch = useDispatch();
  const { requestStatus, token, userAuthorizationStatus } = useSelector((state) => state.user);
  const { requestStatusNewArticle, slugArticle } = useSelector((state) => state.articlesList);
  const { base, articles, slug, signUp, signIN, profile, newArticle, edit } = routs;

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
          <Route exact path={articles}>
            <ArticleList />
          </Route>
          <Route exact path={`${articles}/:${slug}?`}>
            <ArticlePage />
          </Route>
          <Route exact path={signUp}>
            {requestStatus === 'successfully' ? <Redirect to={signIN} /> : <SignUpPage />}
          </Route>
          <Route path={signIN}>
            {requestStatus === 'successfully' || userAuthorizationStatus ? <Redirect to={base} /> : <SignInPage />}
          </Route>

          <Route path={profile}>
            <ProfileEditPage />
          </Route>
          {token && (
            <Route path={newArticle}>
              {requestStatusNewArticle === 'successfully' ? (
                <Redirect to={`${articles}/${slugArticle}`} />
              ) : (
                <CreateArticlePage />
              )}
            </Route>
          )}
          <Route path={newArticle}>{userAuthorizationStatus ? <CreateArticlePage /> : <Redirect to={signIN} />}</Route>

          <Route path={`{${articles}/:${slug}?/${edit}`}>
            {requestStatusNewArticle === 'successfully' ? (
              <Redirect to={`${articles}/${slugArticle}`} />
            ) : (
              <EditArticlePage />
            )}
          </Route>

          <Route path={base}>
            <ArticleList />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
