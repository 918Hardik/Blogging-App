import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../main'
import axios from 'axios';
import { BeatLoader } from 'react-spinners';

const AllAuthors = () => {
  const {mode}=useContext(Context);
  const [ authors , setAuthors] = useState([]);

  useEffect(()=>{
    const fetchAuthors = async()=>{
      const {data} = await axios.get("http://localhost:4000/api/v1/user/authors",{withCredentials: true});
      setAuthors(data.authors);
    };
    fetchAuthors();
  },[]);
  return (
    <article className={mode === "dark" ? "dark-bg all-authors" : "light-bg all-authors"}>
      <h2>All Authors</h2>
      <div className="container">
        {
          authors && authors.length > 0 ?(authors.map(element=>{
            return (
              <div className="card" key={element._id}>
                <img src={element.avatar?.url} alt="author_avatar" />
                <h3>{element.name}</h3>
                <p>{element.role}</p>
              </div>
            )
          })):(<BeatLoader size={50} color='gray' style={{padding: "200px 0"}}></BeatLoader>)
        }
      </div>
    </article>
  )
}

export default AllAuthors