import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Login.module.css';

const Login = () => {
  const handleLoginWithEmail = (e) => {
    console.log('login btn clicked');
    e.preventDefault();
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
          />
          <p className={styles.userMsg}>Hi mag</p>
          <button onClick={handleLoginWithEmail} className={styles.loginBtn}>
            Sign In
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
