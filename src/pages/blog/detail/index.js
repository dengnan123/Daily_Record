import React, { Component } from "react";
import { connect } from "dva";
import ReactMarkdown from "react-markdown";
// import router from "umi/router";
// import PropTypes from "prop-types";
import { Skeleton, Card } from "antd";
import styles from "./index.less";

class Detail extends Component {
  componentDidMount() {
    const {
      location: {
        query: { id }
      },
      dispatch,
      numberArr
    } = this.props;
    this.handleScroll();
    if (numberArr.includes(parseInt(id, 10))) {
      dispatch({
        type: "indexModel/saveInfo",
        payload: {
          id
        }
      });
    } else {
      dispatch({
        type: "indexModel/getInfo",
        payload: {
          id
        }
      });
    }
  }
  handleScroll() {
    document.documentElement.scrollTop = -120;
    let scrollTop = document.body.scrollTop;
  }

  render() {
    const { loading, info, arr } = this.props;
    const isLoading = loading.effects["indexModel/getInfo"];
    return (
      <div className={styles.pageContent}>
        <Skeleton loading={isLoading} active>
          {/* {info.body ? <ReactMarkdown source={info.body} /> : null} */}
          <Card
            // loading={isLoading}
            className={styles.card}
          >
            {info.body ? <ReactMarkdown source={info.body} /> : null}
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
  const { info, numberArr } = state.indexModel;
  const arr = Array(10).fill(0);
  return {
    loading,
    info,
    numberArr,
    arr
  };
}

export default connect(indexStateToProps)(Detail);
