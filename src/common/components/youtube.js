import React, { Component } from "react";
import { connect } from "react-redux";
import Youtube from "@u-wave/react-youtube";
class info extends Component {
  trigger(e) {
    console.log(e.target.getCurrentTime());
    // 0 end
    // 1 play
    // 2 pause
  }
  render() {
    const video = this.props.video;
    const item = this.props.item;
    return (
      <div className="maincards">
        <div className="card">
          <Youtube video={video} onPlaying={this.trigger}  onPause={this.trigger}  onEnd={this.trigger}
            startSeconds={item[0][0] - 2}
            height={390} width={640} 
            endSeconds={item[0][1] + 2}
            />
          <div>{item[1]}</div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({});
const mapActionsToProps = {};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(info);
