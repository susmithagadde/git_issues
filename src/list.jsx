import React, { Component } from "react";
import { PostData } from "./postdata";

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: [],
      headers: [
        "Total Issues",
        "In 24Hrs",
        "Lessthan SevenDays",
        "Morethan SevenDays"
      ],
      onedayago: [],
      lessthan_seven: [],
      morethan_seven: []
    };
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  getIssues = () => {
    var temp = this.state.search;
    var test = temp.toString().split("/");
    var user = test[3]; //username
    var rep_name = test[4]; //Repository Name
    PostData(user, rep_name).then(result => {
      //calling PostData function to fetch the data
      let responseJSON = result;
      this.setState({ test: [...responseJSON] });

      this.state.test.map(t => {
        var a = t.created_at;
        var s = a.toString().split("T");
        var final = s[0].toString().split("-");

        var date = new Date(final[0] + "-" + final[1] + "-" + final[2]); //Date Conversion
        var date_format =
          date.getFullYear() +
          "-" +
          (date.getMonth() + 1) +
          "-" +
          date.getDate();

        var today_date = new Date();

        var Issue_date = new Date(date_format);

        var diff1 = Math.abs(today_date.getTime() - Issue_date.getTime()); //Date Difference
        var diffDays = Math.ceil(diff1 / (1000 * 3600 * 24));
        let total = diffDays;
        const { onedayago, lessthan_seven, morethan_seven } = this.state;
        if (total === 1) {
          onedayago.push(final);
        } else if (total <= 7 && total > 1) {
          lessthan_seven.push(final);
        } else {
          morethan_seven.push(final);
        }

        return this.setState({ onedayago, lessthan_seven, morethan_seven });
      });
    });
  };

  render() {
    return (
      <div className="container search-table">
        <div className="search-box">
          <div className="search-form">
            <div className="input-group">
              <input
                type="text"
                placeholder="Search Here"
                name="search"
                className="form-control input-lg"
                onChange={this.onChange}
              />
              <div className="input-group-btn">
                <button
                  className="btn btn-primary"
                  type="submit"
                  onClick={this.getIssues}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
          <div className="search-list">
            <h5>Issues List</h5>
            <table className="table" id="myTable">
              <thead>
                <tr>
                  {this.state.headers.map(h => (
                    <th key={h}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{this.state.test.length}</td>
                  <td>{this.state.onedayago.length}</td>
                  <td>{this.state.lessthan_seven.length}</td>
                  <td>{this.state.morethan_seven.length}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default List;
