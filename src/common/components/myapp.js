import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getCaption } from "../redux/reducers/caption.reducer";
class myapp extends Component {
  constructor(props) {
    super(props);
    this.captionget = this.captionget.bind(this);
    this.combineExtract = this.combineExtract.bind(this);
    this.getCaptions = this.getCaptions.bind(this);
    this.search = this.search.bind(this);
    this.call = this.call.bind(this);
    this.state = {
      data:"",
      id:""
    };
  }
  componentWillMount() {
    let id = "3OgsRa7VDtI";
    axios
      .get(
        `https://www.youtube.com/api/timedtext?lang=en&fmt=vtt&name=&v=${id}`
      )
      .then(({ data }) => {
        this.setState({ data, id });
      })
      .catch(error => console.log(error));
  }
  captionget(v) {
    this.props.captionget(v);
  }

  call() {
    this.getCaptions();
  }
  getCaptions() {
    const captions = [];
    let mydata = this.state.data.split("\n");
    captions.push(mydata[3]);
    mydata.map((item, index) => {
      captions.push(item);
    });
    this.combineExtract(captions);
  }

  combineExtract(cp) {
    const caption = cp;
    let blank = [];
    let mycaption = [];
    let intermediate = 0;
    caption.map((item, index) => {
      if (item === "") {
        blank.push(index + 1);
      }
    });
    blank.map((item, index) => {
      let temporary = "";

      let get = blank[index + 1] - item - 1;
      for (let i = intermediate + 1; i < get + intermediate; i++) {
        temporary += caption[i] + " ";
      }

      let smash =
        caption[intermediate] !== undefined
          ? caption[intermediate].split(" --> ")
          : [];
      smash = smash.map(item => item.split(".")[0].split(":"));
      let combine = [];
      smash.map((item, i) => {
        let time = +item[2] + +item[1] * 60 + +item[0] * 60 * 60;
        combine.push(time);
      });

      mycaption.push([combine, temporary]);
      intermediate = blank[index + 1];
    });
    let captions = [];
    for (let i = 1; i < mycaption.length - 2; i++) captions.push(mycaption[i]);
    this.search(captions);
  }

  search(cp) {
    const caption = cp;
    let existarray = [];
    caption.map((item, index) => {
      let exist = item[1]
        .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
        .toLowerCase()
        .indexOf(this.props.word);
      if (exist >= 0) {
        existarray.push(item);
      }
    });
    if (existarray.length > 0) existarray.push(this.state.id);
    // return existarray;
    this.captionget(existarray);
  }

  render() {
    return <button onClick={this.call}>{this.props.title}</button>;
  }
}
const mapStateToProps = state => ({
  caption: state.caption,
  word: state.word
});
const mapActionsToProps = {
  captionget: getCaption
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(myapp);
