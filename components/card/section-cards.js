import Link from 'next/link';
import Card from './card';
import cls from 'classnames';
import styles from './section-cards.module.css';

const SectionCards = (props) => {
  const { title, videos = [], size, shouldWrap = false, shouldScale } = props;

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={cls(styles.cardWrapper, shouldWrap && styles.wrap)}>
        {videos.map((video, idx) => {
          return (
            <Link key={idx} href={`/video/${encodeURIComponent(video.id)}`}>
              <a>
                <Card
                  id={idx}
                  imgUrl={video.imgUrl}
                  size={size}
                  shouldScale={shouldScale}
                />
              </a>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default SectionCards;
