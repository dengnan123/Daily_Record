import React, { Component } from "react";
import { connect } from "dva";
import router from "umi/router";
import moment from "moment";
import ReactMarkdown from "react-markdown";
import { Row, Col, Card, Skeleton, Icon, Button } from "antd";
import styles from "./index.less";

class Index extends Component {
  click = id => {
    router.push(`/blog/list`);
  };

  demoClick = () => {
    router.push(`/demo`);
  };

  render() {
    return (
      <div className={styles.pageContent}>
        <div className={styles.indexContent}>
          <Button onClick={this.click} className={styles.spanHover}>
            Daily Record
          </Button>
        </div>
        <div className={styles.indexContent}>
          <Button onClick={this.demoClick} className={styles.spanHover}>
            demo
          </Button>
        </div>
      </div>
    );
  }
}

export default Index;
