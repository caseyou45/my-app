import styles from "../ArticlePage/ArticlePage.module.css";

const HandleDisplayTime = ({ date }) => {
  let time;
  const now = new Date();
  const postTime = new Date(date);
  const diffTime = Math.abs(postTime - now);
  const diffMin = Math.ceil(diffTime / (1000 * 60));
  const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays > 1) {
    time = `${diffDays} days ago`;
  }

  if (diffDays === 1) {
    time = `${diffDays} day ago`;
  }

  if (diffHours < 24) {
    time = `${diffHours} hours ago`;
    if (diffHours === 1) {
      time = `${diffHours} hour ago`;
    }
  }

  if (diffMin < 60) {
    time = `${diffMin} mins ago`;
    if (diffMin === 1) {
      time = `${diffMin} min ago`;
    }
  }

  return <span className={styles.commentTime}>Posted : {time}</span>;
};

export default HandleDisplayTime;
