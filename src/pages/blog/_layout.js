import React, { Component } from "react";
import { connect } from "dva";
import styles from "./index.css";
import router from "umi/router";
import { Skeleton, Progress } from "antd";

class BasicLayout extends Component {
  componentWillMount() {
    this.widthChange();
  }
  componentDidMount() {
    const { dispatch, labels } = this.props;
    if (!labels.length) {
      dispatch({
        type: "indexModel/getLabels"
      });
    }

    window.addEventListener("resize", this.widthChange);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.widthChange);
  }

  widthChange = () => {
    const { dispatch } = this.props;
    const widthSize = window.innerWidth;
    // console.log("widthSize", widthSize);
    dispatch({
      type: "indexModel/save",
      payload: {
        innerWidth: widthSize
      }
    });
  };

  click = () => {
    const path_ = getPath(this.props);
    if (path_ !== "/blog/list") {
      router.push("/blog/list");
    }
  };
  divClick = name => {
    const path_ = getPath(this.props);
    if (path_ !== `/blog/list?labels=${name}`) {
      router.push(`/blog/list?labels=${name}`);
    }
  };
  render() {
    const {
      loading,
      labels,
      location: { query },
      innerWidth
    } = this.props;
    console.log("页面宽度", innerWidth);
    const type = query.labels;
    const isLoading = loading.effects["indexModel/getLabels"];
    return (
      <div className={styles.normal}>
        <div className={styles.divTitle} id="nav">
          <span
            className={innerWidth < 450 ? styles.titleOther : styles.title}
            onClick={this.click}
          >
            Daily Record
          </span>
          <a
            href="https://github.com/dengnan123/Daily-record"
            className={styles.link}
            target="_blank"
          >
            <img
              src={require("../../assets/github.png")}
              className={styles.img}
            />
          </a>
          {innerWidth < 450 ? null : (
            <Skeleton loading={isLoading} active className={styles.skeleton}>
              <div className={styles.left}>
                {labels.map((value, index) => {
                  return (
                    <div
                      key={value.name}
                      className={type === value.name ? styles.divBlue : null}
                      onClick={() => {
                        this.divClick(value.name);
                      }}
                    >
                      {value.name}
                    </div>
                  );
                })}
              </div>
            </Skeleton>
          )}
        </div>
        <div
          className={innerWidth < 450 ? styles.contentOther : styles.content}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}

function getPath(props) {
  const {
    location: { pathname, search }
  } = props;
  let path_ = `${pathname}${search}`;
  path_ = decodeURIComponent(path_);
  return path_;
}

function indexStateToProps(state) {
  const { loading } = state;
  const { labels, type, innerWidth } = state.indexModel;
  return {
    loading,
    labels,
    type,
    innerWidth
  };
}

export default connect(indexStateToProps)(BasicLayout);
