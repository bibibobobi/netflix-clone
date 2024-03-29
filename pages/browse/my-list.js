import Head from 'next/head';
import NavBar from '../../components/nav/navbar';
import SectionCards from '../../components/card/section-cards';

import { getMyList } from '../../lib/videos';
import { RedirectUser } from '../../utils/redirectUser';

import styles from '../../styles/MyList.module.css';

export async function getServerSideProps(context) {
  const { userId, token } = await RedirectUser(context);

  if (!userId) {
    return {
      props: {},
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const videos = await getMyList(userId, token);

  return {
    props: {
      myListVideos: videos,
    },
  };
}

const MyList = ({ myListVideos }) => {
  return (
    <div>
      <Head>
        <title>Netflix | My List</title>
      </Head>
      <main className={styles.main}>
        <NavBar />
        <div className={styles.sectionWrapper}>
          <SectionCards
            title='My List'
            videos={myListVideos}
            size='small'
            shouldWrap
            shouldScale={false}
          />
        </div>
      </main>
    </div>
  );
};

export default MyList;
