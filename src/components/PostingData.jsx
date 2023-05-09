import { useState } from 'react';
import { useFetch } from '../hooks/useFetch';

const PostingData = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const { executePost } = useFetch('posts');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(null);
    try {
      await executePost({ title, body });
      setIsSubmitted(true);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleReset = () => {
    setTitle("");
    setBody("");
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div>
        <p>Your post was successfully submitted!</p>
        <button onClick={handleReset}>Go back</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title:</label>
      <input
        id="title"
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <label htmlFor="body">Body:</label>
      <textarea
        id="body"
        value={body}
        onChange={(event) => setBody(event.target.value)}
      />
      <button type="submit">Submit</button>
      {errorMessage && <p>{errorMessage}</p>}
    </form>
  );
};

export default PostingData;
