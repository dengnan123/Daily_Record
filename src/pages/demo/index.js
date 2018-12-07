import React, { Component } from "react";
import { connect } from "dva";
import router from "umi/router";
import Link from "umi/link";
import moment from "moment";
import ReactMarkdown from "react-markdown";
import hljs from "highlight.js";
import marked from "marked";
import { Row, Col, Card, Skeleton, Icon, Button } from "antd";
import styles from "./index.less";
import { demoArr } from "../../helpers/config";
class Demo extends Component {
  butClick = url => {
    console.log("urlurl", url);
    router.push(url);
  };

  render() {
    console.log("demoArrdemoArr", demoArr);
    return (
      <div className={styles.content}>
        {demoArr.map(value => {
          return (
            <Button
              onClick={() => {
                this.butClick(value.url);
              }}
              key={value.url}
            >
              {value.name}
            </Button>
          );
        })}
      </div>
    );
  }
}

export default Demo;
