import React, { Component } from "react";
import { connect } from "dva";
import router from "umi/router";
import moment from "moment";
import ReactMarkdown from "react-markdown";
// import PropTypes from "prop-types";
import { Row, Col, Card, Skeleton, Icon } from "antd";
import styles from "./index.less";

class FleetList extends Component {
  componentDidMount() {
    const { dispatch, numberArr } = this.props;
    if (!numberArr.length) {
      dispatch({
        type: "indexModel/getList"
      });
    }
  }

  click = id => {
    router.push(`/detail?id=${id}`);
  };

  render() {
    const { loading, arr, list } = this.props;
    const isLoading = loading.effects["indexModel/getList"];
    return (
      <div className={styles.pageContent}>
        <Skeleton loading={isLoading} active>
          <Row type="flex" justify="center">
            <Col span={24}>
              {list.map(value => {
                return (
                  <Card
                    key={value.id}
                    title={value.title}
                    bordered={false}
                    className={styles.cardSpan}
                    onClick={() => {
                      this.click(value.number);
                    }}
                  >
                    <div className={styles.content}>
                      <ReactMarkdown source={value.body.slice(0, 55)} />
                    </div>

                    <div className={styles.bottomDiv}>
                      <span>
                        <Icon type="schedule" />
                        <span className={styles.time}>
                          {moment(value.created_at).format(
                            "YYYY.MM.DD HH:mm:ss"
                          )}
                        </span>
                      </span>
                      <span className={styles.reply}>
                        <Icon type="message" />
                        <span className={styles.replySpan}>
                          {" "}
                          {value.comments}
                        </span>
                      </span>
                    </div>
                  </Card>
                );
              })}
            </Col>
          </Row>
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
  const { list, count, numberArr } = state.indexModel;
  const arr = Array(15).fill(0);
  return {
    loading,
    list,
    count,
    arr,
    numberArr
  };
}

export default connect(indexStateToProps)(FleetList);
