import React, { Component } from "react";
import { DatePicker, Button } from "antd";
import moment from "moment";
import styles from "./index.less";
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

function onChange(date, dateString) {
  console.log("123时间", dateString);
}

function getTime(number) {
  return moment()
    .add(number, "months")
    .format("YYYY-MM");
}

class Picker extends Component {
  state = {
    dis: true,
    value: null
  };
  clickChnage = key => {
    let value;
    switch (key) {
      case "nowMouth":
        value = getTime(0);
        break;
      case "nextMouth":
        value = getTime(1);
        break;
      case "lastMouth":
        value = getTime(2);
        break;
    }
    this.setState({
      value
    });
  };

  atcionChnage = () => {
    this.setState({
      value: null
    });
  };

  monthChange = (date, dateString) => {
    this.setState({
      value: dateString
    });
  };
  render() {
    const { dis, value } = this.state;
    return (
      <div className={styles.content}>
        <div className={styles.top}>
          <Button
            onClick={() => {
              this.clickChnage("nowMouth");
            }}
          >
            本月
          </Button>
          <Button
            onClick={() => {
              this.clickChnage("nextMouth");
            }}
          >
            下月
          </Button>
          <Button
            onClick={() => {
              this.clickChnage("lastMouth");
            }}
          >
            上月
          </Button>
          <Button
            onClick={() => {
              this.atcionChnage("atcion");
            }}
          >
            自定义
          </Button>
          <MonthPicker
            // disabled={dis}
            // onChange={onChange}
            value={value ? moment(value, "YYYY-MM") : null}
            onChange={this.monthChange}
            placeholder="Select month"
          />
        </div>
        <div className={styles.bottom}>选择的月份:{value}</div>
      </div>
    );
  }
}

export default Picker;
