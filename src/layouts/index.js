// import styles from "./index.css";
// import router from "umi/router";

// function BasicLayout(props) {
//   const click = function() {
//     router.push("/");
//   };
//   return (
//     <div className={styles.normal}>
//       <div className={styles.divTitle}>
//         <span className={styles.title} onClick={click}>
//           Daily Record
//         </span>
//         <a
//           href="https://github.com/dengnan123/Daily-record"
//           className={styles.link}
//           target="_blank"
//         >
//           <img src={require("../assets/github.png")} className={styles.img} />
//         </a>
//       </div>
//       <div className={styles.content}>{props.children}</div>
//     </div>
//   );
// }

// export default BasicLayout;
// export default ({ children }) => children;

import { Component } from "react";
import withRouter from "umi/withRouter";

class Layout extends Component {
  componentDidMount() {
    window.onload = function() {
      var top1 = 100;
      var nav = document.getElementById("nav");
      window.onscroll = function() {
        var top2 =
          document.body.scrollTop || document.documentElement.scrollTop;
        if (top2 > top1) {
          nav.style =
            " height:53px; width:100%;  position:fixed; top:-200px;left:0; transition:0.6s;";
        } else {
          nav.style =
            " height:53px; width:100%;     opacity: 0.8;  position:fixed; top:0;left:0; transition:0.6s;";
        }
        // top1 = top2;
      };
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }
  render() {
    return this.props.children;
  }
}

export default withRouter(Layout);
