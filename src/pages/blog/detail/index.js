import React, { Component } from "react";
import { connect } from "dva";
import ReactMarkdown from "react-markdown";
import hljs from "highlight.js";
import marked from "marked";
import { Skeleton, Card } from "antd";
import styles from "./index.less";

class Detail extends Component {
  componentWillMount() {
    // 代码高亮
    marked.setOptions({
      highlight: code => {
        return hljs.highlightAuto(code).value;
      }
    });
  }

  componentDidMount() {
    const {
      location: {
        query: { id }
      },
      dispatch,
      info
    } = this.props;
    this.handleScroll();
    if (JSON.stringify(info) === "{}") {
      dispatch({
        type: "indexModel/getInfo",
        payload: {
          id
        }
      });
    }
  }

  handleScroll() {
    window.scrollTo(0, 0);
  }

  render() {
    const { loading, info, arr } = this.props;
    console.log("infoinfo", info);
    const isLoading = loading.effects["indexModel/getInfo"];
    return (
      // <div className={styles.pageContent}>
      <div className={styles.content}>
        <Skeleton loading={isLoading} active>
          <Card className={styles.card}>
            <h3 className={styles.detailTitle}>{info.title}</h3>
            {/* {info.body} */}
            {info.body ? (
              <div dangerouslySetInnerHTML={{ __html: marked(info.body) }} />
            ) : null}
          </Card>
        </Skeleton>
        {arr.map((value, index) => {
          return (
            <Skeleton loading={isLoading} active key={index}>
              {""}
            </Skeleton>
          );
        })}
      </div>
    );
  }
}

function indexStateToProps(state) {
  const { loading } = state;
  const { info, numberArr, obj } = state.indexModel;
  const arr = Array(10).fill(0);
  return {
    loading,
    info,
    numberArr,
    arr,
    obj
  };
}

export default connect(indexStateToProps)(Detail);
