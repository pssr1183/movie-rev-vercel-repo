import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; 
function MovieReviewApp() {
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(null);

  const submitReview = async () => {
  try {
    const reviewsArray = reviewText.split('\n').map((review) => review.trim());
    const response = await axios.post('http://localhost:5000/predict', { reviews: reviewsArray });
    const receivedRating = response.data.rating;
    setRating(receivedRating);
   
  } catch (error) {
    console.error('Error:', error);
    setRating(null);
  }
};

  return (
    <div className="container">
      <h1>Movie Review App</h1>
      <div>
        <textarea
          placeholder="Enter your movie reviews, one per line..."
          rows="5"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />
      </div>
      <div>
        <button onClick={submitReview}>Submit Review</button>
      </div>
      {rating !== null && (
        <div>
          <h2>Rating: {rating}/5</h2>
        </div>
      )}
    </div>
  );
}

export default MovieReviewApp;
