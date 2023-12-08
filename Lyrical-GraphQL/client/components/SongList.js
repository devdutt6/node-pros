import React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Link, hashHistory } from "react-router";
import { getSongs } from "../query/songs";

function SongList(props) {
  const { data } = props;

  let onDelete = (id) => {
    props
      .mutate({
        variables: {
          id: id,
        },
      })
      .then(() => {
        props.data.refetch();
      });
  };

  if (data.loading) return <div>loading...</div>;

  return (
    <div>
      <ul className="collection">
        {data.songs.map((dt) => (
          <li
            key={dt.id}
            className="collection-item"
            onClick={() => hashHistory.push(`/songs/${dt.id}`)}
          >
            {dt.title}{" "}
            <i className="material-icons right" onClick={() => onDelete(dt.id)}>
              cancel
            </i>
          </li>
        ))}
      </ul>
      <Link to="/songs/create" className="btn-large btn-floating right red">
        <i className="material-icons">add</i>
      </Link>
    </div>
  );
}

const mutation = gql`
  mutation deleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`;

export default graphql(mutation)(graphql(getSongs)(SongList));
