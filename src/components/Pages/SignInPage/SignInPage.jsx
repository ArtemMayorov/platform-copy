import React from 'react';
import { useSelector } from 'react-redux';

import SignForm from 'components/Sign/SignForm';
import Loader from 'components/Loader/Loader';
import Error from 'components/Error/Error';

import s from './SignInPage.module.scss';

function SignInPage() {
  const { error, loading } = useSelector((state) => state.articlesList);
  if (error) return <Error />;
  if (loading) return <Loader />;
  return (
    <div className={s.container}>
      <SignForm page="SignIn" />
    </div>
  );
}
export default SignInPage;
