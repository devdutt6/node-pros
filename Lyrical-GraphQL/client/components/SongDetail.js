import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getDetails } from "../query/songs";
import gql from "graphql-tag";
import { Link } from "react-router";

class SongDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lyrics: "",
    };
  }

  onSubmit() {
    this.props
      .mutate({
        variables: {
          id: this.props.data.song.id,
          content: this.state.lyrics,
        },
      })
      .then(() => {
        this.props.data.refetch();
      });
  }

  onLike(id) {
    console.log("like", id);
  }

  render() {
    {
      if (this.props.data.loading) {
        return <div>Loading...</div>;
      }
    }
    return (
      <div>
        <Link to="/">Back</Link>
        <h3>{this.props.data.song.title}</h3>
        <ul className="collection">
          {this.props.data.song.lyrics &&
            this.props.data.song.lyrics.map((lyric) => {
              return (
                <li key={lyric.id} className="collection-item">
                  {lyric.content}
                  <i
                    className="material-icons right"
                    onClick={() => this.onLike(lyric.id)}
                  >
                    thumb_up
                  </i>
                  {/* {lyric.likes} */}
                </li>
              );
            })}
        </ul>

        <form onSubmit={this.onSubmit.bind(this)}>
          <label htmlFor="lyric">Add lyrics:</label>
          <input
            onChange={(e) => this.setState({ lyrics: e.target.value })}
            value={this.state.lyrics}
          />
        </form>
      </div>
    );
  }
}

const addLyrics = gql`
  mutation addLyric($id: ID, $content: String) {
    addLyricToSong(songId: $id, content: $content) {
      id
    }
  }
`;

export default graphql(addLyrics)(
  graphql(getDetails, {
    options: (props) => {
      return { variables: { id: props.params.id } };
    },
  })(SongDetail)
);
