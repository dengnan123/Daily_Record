import React, { Component } from "react";
import { connect } from "dva";
import ReactMarkdown from "react-markdown";
// import router from "umi/router";
// import PropTypes from "prop-types";
import { Skeleton } from "antd";
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
    const { loading, info } = this.props;
    const isLoading = loading.effects["indexModel/getInfo"];
    return (
      <div className={styles.pageContent}>
        <Skeleton loading={isLoading} active>
          {info.body ? <ReactMarkdown source={info.body} /> : null}
        </Skeleton>
      </div>
    );
  }
}

function indexStateToProps(state) {
  const { loading } = state;
  const { info, numberArr } = state.indexModel;
  return {
    loading,
    info,
    numberArr
  };
}

export default connect(indexStateToProps)(Detail);
