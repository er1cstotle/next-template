import React, { useState, useEffect } from 'react';

import Head from 'next/head';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';

import firebaseInit from './_services/firebaseInit';
const firebase = firebaseInit();
const auth = firebase.auth();

import { Layout } from '~/components';
import LoginForm from '~/components/forms/auth/login-form';

const SignUpPage = () => {
  const router = useRouter();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    router.prefetch('/');
  });

  const signup = async ({ email, password }) => {
    try {
      await auth.createUserWithEmailAndPassword(email, password);

      // send them to the home page
      Router.push({ pathname: '/' });
    } catch (error) {
      // set errors
      // setErrors({
      //   form: 'sfdsf',
      //   email: 'sfdsf'
      //   password: 'sfdsf'
      // })
    }
  };

  return (
    <Layout>
      <Head>
        <title>Login</title>
        <link rel='icon' href='/favicon.ico' importance='low' />
      </Head>

      <LoginForm onSubmit={signup} externalErrors={errors}/>

      <Link href={'/login'}>
        <a>Login</a>
      </Link>

    </Layout>
  );
};

SignUpPage.getInitialProps = async function({ query }) {
  // handle redirect if there is a user

  return {};
};


export default SignUpPage;
