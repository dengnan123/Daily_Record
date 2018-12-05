import styles from "./index.css";
import router from "umi/router";

function BasicLayout(props) {
  const click = function() {
    router.push("/");
  };
  return (
    <div className={styles.normal}>
      <div className={styles.divTitle}>
        <span className={styles.title} onClick={click}>
          Daily Record
        </span>
        <a
          href="https://github.com/dengnan123/Daily-record"
          className={styles.link}
          target="_blank"
        >
          <img src={require("../assets/github.png")} className={styles.img} />
        </a>
      </div>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
}

export default BasicLayout;
