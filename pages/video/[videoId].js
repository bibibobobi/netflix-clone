import { useRouter } from 'next/router';

const Video = () => {
  const router = useRouter();
  console.log({ router });
  // const { videoId } = router.query;

  return <p>video page: {router.query.videoId}</p>;
};

export default Video;
