import React, { useEffect, useState } from 'react';
import './FamousSection.css';
import axios from 'axios';

function FamousSection() {
  // TODO: on load, call the fetchPeople() function
  useEffect(() =>{
    fetchPeople()
  },[])

  let [famousPersonName, setPersonName] = useState('');
  let [famousPersonRole, setPersonRole] = useState('');
  let [famousPeopleArray, setPeopleArray] = useState([]);


  const fetchPeople = () => {
  
    // TODO: fetch the list of people from the server
    axios({
      method: "GET",
      url:"/people",

    })
    .then((response) => {
      setPeopleArray(response.data)
    })
    .catch((error )=>{
      console.log("error in axios get",error)
    })
  }

  const addPerson = (evt) => {
    evt.preventDefault();
    console.log(`The person is ${famousPersonName} and they're famous for ${famousPersonRole}`);

    
    // TODO: create POST request to add this new person to the database
    axios({
      method: "POST",
      url:"/people",
      data:
      {
        name: famousPersonName,
        role: famousPersonRole

      }
    })
    .then((response)=>{
      setPersonName("")
      setPersonRole("")
      fetchPeople()

    })
    .catch((error)=>{
      console.log("error in post route",error)
    })

    // HINT: the server is expecting a person object 
    //       with a `name` and a `role` property
  
  }

    return (
      <section className="new-person-section">
        <form onSubmit={addPerson}>
          <label htmlFor="name-input">Name:</label>
          <input
          value={famousPersonName}
           id="name-input"
            onChange={e => setPersonName(e.target.value)} />
          <label htmlFor="role-input">Famous for:</label>
          
          <input
          value={famousPersonRole}
           id="role-input"
            onChange={e => setPersonRole(e.target.value)} />
          <button type="submit">Done</button>

        </form>
        <p>
          {famousPersonName} is famous for "{famousPersonRole}".
        </p>
        <ul>
          {/* TODO: Render the list of famous people */
          famousPeopleArray.map((person) =>{
            return <li key={person.id}>{person.name}, {person.role}</li>
          })
          }
        </ul>
      </section>
    );
}

export default FamousSection;
