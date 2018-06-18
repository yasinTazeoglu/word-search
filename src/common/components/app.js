import React, { Component } from "react";
import d from "lodash.debounce";
import { connect } from "react-redux";
import { setWord } from "../redux/reducers/word.reducer";
import Mybutton from "./myapp";
import Youtube from "./youtube";
class app extends Component {
  constructor(props) {
    super(props);
    this.setWord = this.setWord.bind(this);
    this.state={
      i:0
    }
  }
  mapObject(object, callback) {
    return Object.keys(object).map(function(key) {
      return callback(key, object[key]);
    });
  }
  setWord(e) {
    this.props.setWord(e);
  }
  render() {
    const debounce = d(this.setWord, 500);
    var size = Object.keys(this.props.caption).length - 1;
    const options = this.mapObject(
      this.props.caption,
      (key, a) => (+key !== size ? [...a] : [a])
    );

    return (
      <div>
        <input
          onChange={e => {
            debounce(e.target.value);
          }}
        />
        <Mybutton title="search" />
        <br />
        <br />
        {options.length>0?<Youtube video={options[size]} item={options[this.state.i]}/>:null}
        <button onClick={()=>{this.setState({i:this.state.i+1})}}>next</button>
        <button onClick={()=>{this.setState({i:this.state.i-1})}}>back</button>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  caption: state.caption,
  word: state.word
});
const mapActionsToProps = {
  setWord: setWord
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(app);
