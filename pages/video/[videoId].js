import { useRouter } from 'next/router';
import Modal from 'react-modal';
import styles from '../../styles/Video.module.css';

import cls from 'classnames';

import { getYoutubeVideoById } from '../../lib/videos';

Modal.setAppElement('#__next');

export async function getStaticProps() {
  // data to fetch from API
  // const video = {
  //   title: 'SPY x FAMILY',
  //   publishTime: '2022-06-01',
  //   description:
  //     'A spy, an assassin and a telepath come together to pose as a family, each for their own reasons, while hiding their true identities from each other.',
  //   channelTitle: 'Netflix anime series',
  //   viewCount: 20000,
  // };

  const videoId = 'l1uINfUshjc';

  const videoArray = await getYoutubeVideoById(videoId);

  return {
    props: {
      video: videoArray.length > 0 ? videoArray[0] : {},
    },
    revalidate: 10, // In seconds
  };
}

export async function getStaticPaths() {
  const listOfVideos = ['l1uINfUshjc', 'd4U1WcIM1E8', '1mhWzjgbLO0'];

  const paths = listOfVideos.map((videoId) => ({
    params: { videoId },
  }));

  return { paths, fallback: 'blocking' };
}

const Video = ({ video }) => {
  const router = useRouter();

  const {
    title,
    publishTime,
    description,
    channelTitle,
    statistics: { viewCount },
  } = video;

  return (
    <div className={styles.container}>
      <Modal
        isOpen={true}
        contentLabel='Watch the video'
        onRequestClose={() => {
          router.back();
        }}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <iframe
          id='player'
          className={styles.videoPlayer}
          type='text/html'
          width='100%'
          height='390'
          src={`http://www.youtube.com/embed/${router.query.videoId}?autoplay=1&controls=0&rel=0`}
          frameBorder='0'
        ></iframe>

        <div className={styles.modalBody}>
          <div className={styles.modalBodyContent}>
            <div className={styles.col1}>
              <p className={styles.publishTime}>{publishTime}</p>
              <p className={styles.title}>{title}</p>
              <p className={styles.description}>{description}</p>
            </div>
            <div className={styles.col2}>
              <p className={cls(styles.subText, styles.subTextWrapper)}>
                <span className={styles.textColor}>Cast: </span>
                <span className={styles.channelTitle}>{channelTitle}</span>
              </p>
              <p className={cls(styles.subText, styles.subTextWrapper)}>
                <span className={styles.textColor}>View Count: </span>
                <span className={styles.channelTitle}>{viewCount}</span>
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Video;
