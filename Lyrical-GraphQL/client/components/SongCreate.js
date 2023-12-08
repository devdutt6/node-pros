import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Link, hashHistory } from "react-router";
import { getSongs } from "../query/songs";

class SongCreate extends Component {
  constructor(props) {
    super(props);
    this.state = { title: "" };
  }

  submitForm(e) {
    e.preventDefault();

    this.props
      .mutate({
        variables: {
          title: this.state.title,
        },
        refetchQueries: [{ query: getSongs }],
      })
      .then(() => hashHistory.push("/"));
  }

  render() {
    return (
      <div>
        <Link to="/">Back</Link>
        <h3>Create a new Song</h3>
        <form onSubmit={this.submitForm.bind(this)}>
          <label htmlFor="title">Song title: </label>
          <input
            id="title"
            onChange={(e) => this.setState({ title: e.target.value })}
            value={this.state.title}
          />
        </form>
      </div>
    );
  }
}

const createSong = gql`
  mutation createSong($title: String!) {
    addSong(title: $title) {
      id
      title
    }
  }
`;

export default graphql(createSong)(SongCreate);
