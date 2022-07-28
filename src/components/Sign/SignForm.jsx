import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'antd';

import Spinner from 'components/buttons/ButtonLoader/Spinner';
import {
  deleteRequestStatus,
  fetchUserRegistration,
  fetchUserAuthorization,
  fetchUpdateUser,
} from 'Store/Slices/userSlice';

import 'antd/dist/antd.css';
import s from './SignForm.module.scss';

function SignForm({ page }) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);
  const {
    requestStatus,
    formErrors: { emailError, usernameError, passwordError },
  } = useSelector((state) => state.user);
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm({ mode: 'onBlur' });

  const [validError, setValidError] = useState(null);

  useEffect(() => () => dispatch(deleteRequestStatus()), []);

  const onSubmit = (data) => {
    const { email, password, username, avatar: image } = data;
    if (page === 'SignUp') dispatch(fetchUserRegistration({ email, password, username }));
    if (page === 'SignIn') dispatch(fetchUserAuthorization({ email, password }));
    if (page === 'Edit') {
      const { newPassword: password } = data;
      if (email === '' && password === '' && image === '' && username === '') {
        setValidError(true);
        return;
      }
      setValidError(null);
      dispatch(fetchUpdateUser({ newUserData: { email, username, image, password } }));
    }
    reset();
  };

  return (
    <div className={s.container}>
      {requestStatus === 'unauthorized' && page === 'SignIn' && (
        <Alert message="wrong email or password" type="error" closable />
      )}
      {validError ? <Alert message="not all data entered" type="error" /> : null}

      {requestStatus === 'unauthorized' && page === 'SignUp' && (
        <Alert message="user already registered" type="error" closable />
      )}
      {requestStatus === 'unauthorized' && page === 'Edit' && (
        <Alert message="username or email already in use" type="error" />
      )}
      {requestStatus === 'successfully' && page === 'Edit' && <Alert message="successfully" type="success" showIcon />}

      <h1 className={s.titile}>
        {page === 'SignUp' && 'Create new account'}
        {page === 'SignIn' && 'Sign In'}
        {page === 'Edit' && 'Edit Profile'}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {(page === 'SignUp' || page === 'Edit') && (
          <label className={`${s.label} ${errors?.username?.message || usernameError ? s.error : null}`}>
            <span>Username</span>
            {page === 'Edit' && (
              <input
                {...register('username', {
                  minLength: {
                    value: 3,
                    message: 'username  must be at least 3 characters',
                  },
                  maxLength: {
                    value: 20,
                    message: 'username must be up to 20 characters',
                  },
                })}
              />
            )}
            {page !== 'Edit' && (
              <input
                {...register('username', {
                  required: 'Required field',
                  minLength: {
                    value: 3,
                    message: 'username  must be at least 3 characters',
                  },
                  maxLength: {
                    value: 20,
                    message: 'username must be up to 20 characters',
                  },
                })}
              />
            )}

            <div className={s.errorMessage}>
              {errors?.username && (
                <p>{errors?.username?.message || 'Your username needs to be at least 3 characters'}</p>
              )}
            </div>
          </label>
        )}

        {(page === 'SignUp' || page === 'SignIn' || page === 'Edit') && (
          <label className={`${s.label} ${errors?.email?.message || emailError ? s.error : null}`}>
            <span>Email address</span>
            {page === 'Edit' && (
              <input
                {...register('email', {
                  required: 'Required field',
                  pattern: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
                })}
              />
            )}
            {page !== 'Edit' && (
              <input
                {...register('email', {
                  required: 'Required field',
                  pattern: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
                })}
              />
            )}
            <div className={s.errorMessage}>
              {errors?.email && <p>{errors?.email?.message || 'Please enter a valid e-mail'}</p>}
            </div>
          </label>
        )}
        {(page === 'SignUp' || page === 'SignIn') && (
          <label className={`${s.label} ${errors?.password?.message || passwordError ? s.error : null}`}>
            <span>Password</span>
            <input
              type="password"
              {...register('password', {
                required: 'Required field',
                minLength: {
                  value: 6,
                  message: 'password must be at least 6 characters',
                },
                maxLength: {
                  value: 40,
                  message: 'password must be up to 40 characters',
                },
              })}
            />
            <div className={s.errorMessage}>
              {errors?.password && <p>{errors?.password?.message || 'wrong password format'}</p>}
            </div>
          </label>
        )}
        {page === 'Edit' && (
          <label className={`${s.label} ${errors?.newPassword?.message ? s.error : null}`}>
            <span>New Password</span>
            <input
              type="password"
              {...register('newPassword', {
                minLength: 6,
                maxLength: 40,
              })}
            />
            <div className={s.errorMessage}>
              {errors?.NewPassword && (
                <p>{errors?.NewPassword?.message || 'Your password needs to be at least 6 characters'}</p>
              )}
            </div>
          </label>
        )}
        {page === 'Edit' && (
          <label className={`${s.label} ${errors?.avatar?.message ? s.error : null}`}>
            <span>Avatar image (url)</span>
            <input
              {...register('avatar', {
                pattern: /^https?:\/\/.*\.(?:jpe?g|gif|png)$/gi,
              })}
            />
            <div className={s.errorMessage}>
              {errors?.avatar && <p>{errors?.avatar?.message || 'Please enter a valid url'}</p>}
            </div>
          </label>
        )}
        {page === 'SignUp' && (
          <label className={`${s.label} ${errors?.confirmPassword?.message ? s.error : null}`}>
            <span>Repeat Password</span>
            <input
              type="password"
              {...register('confirmPassword', {
                required: 'Required field',
                validate: (val) => {
                  if (watch('password') !== val) {
                    return 'Your passwords do no match';
                  }
                },
              })}
            />
            <div className={s.errorMessage}>
              {errors?.confirmPassword && <p>{errors?.confirmPassword?.message || 'Passwords must match'}</p>}
            </div>
          </label>
        )}

        {page === 'SignUp' && (
          <>
            <div className={s.checkboxContainer}>
              <input
                type="checkbox"
                name="agreement"
                className={s.checkbox}
                {...register('agreement', {
                  required: 'Should accept agreement',
                })}
                id="agreement"
              />
              <label htmlFor="agreement">
                <span>I agree to the processing of my personal information</span>
              </label>
            </div>
            <div className={s.chekbox_errorMessage}>
              {errors?.agreement && <p>{errors?.agreement?.message || 'Passwords must match'}</p>}
            </div>
          </>
        )}
        <button className={s.button} type="submit">
          {loading && <Spinner />}
          {page === 'SignUp' && !loading && 'Create'}
          {page === 'SignIn' && !loading && 'Login'}
          {page === 'Edit' && !loading && 'Save'}
        </button>
      </form>
      <span className={s.sentence}>
        {page === 'SignUp' && (
          <>
            <span>Already have an account? </span>
            <Link to="/sign-in">Sign In</Link>
          </>
        )}
        {page === 'SignIn' && (
          <>
            <span>Don’t have an account? </span>
            <Link to="/sign-up">Sign Up</Link>
          </>
        )}
      </span>
    </div>
  );
}

export default SignForm;
