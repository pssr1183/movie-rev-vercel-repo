import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
// import './MovieReviewApp.css'; // Custom CSS for styling

function MovieReviewApp() {
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(null);
  const [sentiment, setSentiment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitReview = async () => {
    try {
      setError(null);
      setLoading(true);
      setRating(null); // Clear previous rating
      setSentiment(null);
      const reviewsArray = reviewText
      .split('\n')
      .map((review) => review.trim())
      .filter((review) => review !== '' && review.length > 0); // Remove empty and whitespace-only strings
    if (reviewsArray.length === 0) {
      setError('Please enter at least one valid review.');
      setLoading(false);
      return;
    }
      const response = await axios.post('https://flask-backend-moview-review.onrender.com/predict', {
        reviews: reviewsArray,
      });
      const receivedRating = response.data.rating;
      const receivedSentiment = response.data.sentiment;
      setRating(receivedRating);
      setSentiment(receivedSentiment);
    } catch (error) {
      console.error('Error:', error);
      setRating(null);
      setSentiment(null);
      setError('An error occurred while fetching data. Please try again later.');
    } finally {
      setLoading(false); // Set loading to false when the request is completed (whether success or error)
    }
  };

  return (
    <div className="container">
      <div className="app-header">
        <h1>Movie Rating App</h1>
      </div>
      <div className="app-content">
        <div className="review-input">
          <textarea
            placeholder="Enter your movie reviews, one per line..."
            rows="5"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
        </div>
        <div className="submit-button">
          <button className="btn btn-primary" onClick={submitReview} disabled={loading}>
            {loading ? 'Loading...' : 'Submit Review'}
          </button>
        </div>
        {error && <p className="error-message">{error}</p>}
        {rating !== null && (
          <div className="rating-sentiment">
            <h2>Rating: {rating}/5</h2>
            <h2>Sentiment: {sentiment}</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieReviewApp;
