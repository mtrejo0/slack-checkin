import React from 'react'

import "../index.css";

import axios from "axios";

let SERVER = "http://localhost:5000";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      tag: "",
      link: "",
      tags: [],
      items: [],
      allTags: [],
    };
    this.checkin = this.checkin.bind(this);
    this.checkout = this.checkout.bind(this);
    this.floors = this.floors.bind(this);
    this.itemsByFloor = this.itemsByFloor.bind(this);
  }

  componentDidMount() {
    let getItems = () => {
      axios.get(`${SERVER}/items`).then((res) => {
        let items = res.data.data;
        this.setState({ items });
      });
    };
    getItems();
    setInterval(function () {
      getItems();
    }, 3000);
  }

  checkin(item) {
    axios.get(`${SERVER}/checkin/${item}`).then((res) => {
      this.setState({
        items: res.data.items,
      });
    });
  }

  checkout(item) {
    axios.get(`${SERVER}/checkout/${item}`).then((res) => {
      this.setState({
        items: res.data.items,
      });
    });
  }

  floors() {
    return Array.from(new Set(this.state.items.map((each) => each.floor)));
  }

  itemsByFloor() {
    return this.floors().map((floor) => {
      return {
        floor,
        items: this.state.items.filter((each) => each.floor === floor),
      };
    });
  }

  render() {
    return (
      <div className="margin32">
        {this.itemsByFloor().map((floor) => {
          return (
            <div>
              <h1>Floor {floor.floor}</h1>
              <hr></hr>
              <div className="free">
                {floor.items.map((item) => {
                  return (
                    <div className="nice-border item">
                      <h3>{item.name}</h3>
                      <p>{item.description}</p>
                      <h3>
                        Available: {item.available}/{item.total}
                      </h3>
                      <button
                        onClick={() => this.checkin(item.name)}
                        className="checkin"
                        disabled={!(item.available < item.total)}
                      >
                        Check In
                      </button>
                      <button
                        onClick={() => this.checkout(item.name)}
                        className="checkout"
                        disabled={!(item.available > 0)}
                      >
                        Check Out
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
} 

export default Home;