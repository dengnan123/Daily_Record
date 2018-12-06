import { Component } from "react";
import withRouter from "umi/withRouter";

class Layout extends Component {
  componentDidMount() {
    window.onload = function() {
      var top1 = 100;
      var nav = document.getElementById("nav");
      if (nav) {
        window.onscroll = function() {
          var top2 =
            document.body.scrollTop || document.documentElement.scrollTop;
          if (top2 > top1) {
            nav.style =
              " height:53px; width:100%;  position:fixed; top:-200px;left:0; transition:0.4s;";
          } else {
            nav.style =
              " height:53px; width:100%;     opacity: 0.8;  position:fixed; top:0;left:0; transition:0.4s;";
          }
          // top1 = top2;
        };
      }
    };
  }

  //   componentDidUpdate(prevProps) {
  //     if (this.props.location !== prevProps.location) {
  //       window.scrollTo(0, 0);
  //     }
  //   }
  render() {
    return this.props.children;
  }
}

export default withRouter(Layout);
