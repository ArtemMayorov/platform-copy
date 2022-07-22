import React from 'react';

import SignForm from 'components/Sign/SignForm';

import s from './ProfileEditPage.module.scss';

function ProfileEditPage() {
  return (
    <div className={s.container}>
      <SignForm page="Edit" />
    </div>
  );
}
export default ProfileEditPage;
