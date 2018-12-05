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

  render() {
    return (
      <div className={styles.pageContent}>
        {/* <Card> */}
        <Button onClick={this.click} className={styles.indexContent}>
          博客首页
        </Button>
        {/* </Card> */}
      </div>
    );
  }
}

export default Index;
