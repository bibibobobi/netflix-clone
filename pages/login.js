import { useState } from 'react';

import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Login.module.css';

import { magic } from '../lib/magic-client';

const Login = () => {
  const [email, setEmail] = useState('');
  const [userMsg, setUserMag] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handelOnChangeEmail = (e) => {
    setUserMag('');
    const email = e.target.value;
    setEmail(email);
  };

  const handleLoginWithEmail = async (e) => {
    e.preventDefault();

    if (email) {
      if (email === 'smilingcat33@gmail.com') {
        // log in a user by their email
        try {
          setIsLoading(true);

          const didToken = await magic.auth.loginWithMagicLink({
            email,
          });
          console.log({ didToken });
          if (didToken) {
            setIsLoading(false);
            router.push('/');
          }
        } catch (error) {
          // Handle errors if required!
          console.error('Something went wrong logging in', error);
          setIsLoading(false);
        }
      } else {
        setUserMag('Something went wrong logging in');
      }
    } else {
      // show user message
      setUserMag('Please enter a valid email.');
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix | Sign in</title>
      </Head>

      <header className={styles.header}>
        <div className={styles.headerWrapper}>
          <Link href='/'>
            <a className={styles.logoLink}>
              <div className={styles.logoWrapper}>
                <Image
                  src={'/static/netflix.svg'}
                  alt='Netflix logo'
                  width='128'
                  height='34'
                />
              </div>
            </a>
          </Link>
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.mainWrapper}>
          <h1 className={styles.signinHeader}>Sign In</h1>
          <input
            type='text'
            placeholder='Email address'
            className={styles.emailInput}
            onChange={handelOnChangeEmail}
          />
          <p className={styles.userMsg}>{userMsg}</p>
          <button onClick={handleLoginWithEmail} className={styles.loginBtn}>
            {isLoading ? 'Loading...' : 'Sign In'}
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
