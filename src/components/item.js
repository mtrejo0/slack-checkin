import React from "react";

import "../index.css";

import eventBus from "../util/eventbus";

import axios from "axios";

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
  }

  delete() {
    axios
      .delete("http://localhost:5000/items/" + this.props.item.id)
      .then(() => {
        eventBus.dispatch("delete_item", { id: this.props.item.id });
      });
  }
  render() {
    return (
      <div className="nice-border item">
        <strong>
          {this.props.item.link ? (
            <a href={this.props.item.link} target="_blank" rel="noreferrer">
              {" "}
              {this.props.item.name}
            </a>
          ) : (
            <p>{this.props.item.name}</p>
          )}
        </strong>
        {this.props.item.tags[0] ? (
          <p>Tags: {this.props.item.tags.join(", ")}</p>
        ) : null}
        {this.props.item.description ? (
          <p>Description: {this.props.item.description}</p>
        ) : null}
        <button onClick={() => this.delete()}>Delete</button>
      </div>
    );
  }
}

export default Item;
