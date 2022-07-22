import React from 'react';

import SignForm from 'components/Sign/SignForm';

import s from './SignUpPage.module.scss';

function SignUpPage() {
  return (
    <div className={s.container}>
      <SignForm page="SignUp" />
    </div>
  );
}
export default SignUpPage;
