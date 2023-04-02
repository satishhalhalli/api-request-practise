import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const MovieForm = (props) => {
  const [title, setTitle] = useState('');
  const [openingText, setOpeningText] = useState('');
  const [releaseDate, setReleaseDate] = useState('');

  const submitHandler = (event) => {
    event.preventDefault();
    const newMovie = {
      title: title,
      openingText: openingText,
      releaseDate: releaseDate,
    };
    console.log(newMovie);
    setTitle('');
    setOpeningText('');
    setReleaseDate('');
  };

  return (
    <Form onSubmit={submitHandler}>
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Opening Text</Form.Label>
        <Form.Control
          as="textarea"
          rows="5"
          value={openingText}
          onChange={(event) => setOpeningText(event.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Release Date</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter release date"
          value={releaseDate}
          onChange={(event) => setReleaseDate(event.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Add Movie
      </Button>
    </Form>
  );
};

export default MovieForm;
