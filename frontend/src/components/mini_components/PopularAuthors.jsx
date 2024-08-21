import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { BeatLoader } from "react-spinners";

const PopularAuthors = () => {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get("https://blogging-app-backend-mqk7.onrender.com/api/v1/user/authors", { withCredentials: true });
        setAuthors(data.authors);
        setLoading(false); // Data fetched, set loading to false
      } catch (error) {
        console.error('Error fetching authors:', error);
        setLoading(false); // Set loading to false in case of error
      }
    }
    fetchUser();
  }, [])

  return (
    <section className='popularAuthors'> {/* Corrected typo: popluarAuthors to popularAuthors */}
      <h3>Popular Authors</h3>
      <div className="container">
        {loading ? (
          <BeatLoader size={30} color="gray" />
        ) : authors && authors.length > 0 ? (
          authors.slice(0, 4).map(author => (
            <div className="card" key={author._id}>
              <img src={author.avatar ? author.avatar.url : ''} alt="author" /> {/* Check if avatar exists */}
              <p>{author.name}</p>
              <p>{author.role}</p>
            </div>
          ))
        ) : (
          <p>No authors found</p> // Render a message when there are no authors
        )}
      </div>
    </section>
  )
}

export default PopularAuthors;
 
