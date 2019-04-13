import React, { PureComponent } from "react";
import styles from "./index.less";

export default class CourierList extends PureComponent {
  constructor(props) {
    super(props);
    const { defaultHead } = this.props;

    this.state = {
      containerWidth: 1500,
      checkedPosition: 0,
      barWidth: 70,
      checkedHead: defaultHead
    };
  }

  componentDidMount() {
    const { heardList } = this.props;
    let containerWidth = 0;
    (heardList || []).forEach((item, index) => {
      containerWidth += this[`ref_${index}`].getBoundingClientRect().width;
    });

    this.setState({
      barWidth: this.ref_0.getBoundingClientRect().width,
      containerWidth
    });
  }

  onClickHeader = (checkedHead, index) => {
    let preWidth = 0;
    for (let i = 0; i < index; i += 1) {
      preWidth += this[`ref_${i}`].offsetWidth;
    }
    const barWidth = this[`ref_${index}`].offsetWidth;
    this.setState({ checkedHead, checkedPosition: preWidth, barWidth });
  };

  render() {
    const {
      checkedHead,
      checkedPosition,
      containerWidth,
      barWidth
    } = this.state;
    const { heardList, source } = this.props;
    return (
      <div
        className={styles.container}
        style={{ width: `${containerWidth}px` }}
      >
        <div className={styles.headerContainer}>
          <div className={styles.header}>
            {heardList.map((item, index) => (
              <div
                ref={r => {
                  this[`ref_${index}`] = r;
                }}
                key={item.code}
                className={
                  checkedHead === item.code
                    ? styles.headItemChecked
                    : styles.headItem
                }
                onClick={this.onClickHeader.bind(this, item.code, index)}
              >
                {item.text} {item.num}
              </div>
            ))}
          </div>
          <div
            className={styles.tab_bar}
            style={{
              transform: `translate3d(${checkedPosition}px, 0px, 0px)`,
              width: `${barWidth}px`
            }}
          />
        </div>
        <div className={styles.list}>
          {source.map(item => (
            <div key={item.id} className={styles.row}>
              <div>
                <div className={styles.name}>{item.name}</div>
                <div className={styles.phone}>{item.phone}</div>
              </div>
              <div className={styles.count}>
                <span className={styles.doing}>{item.doing}</span> /
                <span className={styles.error}> {item.error}</span> /
                <span className={styles.all}> {item.all}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}