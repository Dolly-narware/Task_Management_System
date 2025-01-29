import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AxiosExample = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/posts') 
      .then((response) => {
        setData(response.data); 
        setLoading(false);
      })
      .catch((error)=> {
        setError(error.message);
        setLoading(false);
      });
  }, []); 

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Axios Example</h1>
      {data.map((item) => (
        <div key={item.id}>
          <h2>{item.title}</h2>
          <p>{item.body}</p>
        </div>
      ))}
    </div>
  );
};

export default AxiosExample;