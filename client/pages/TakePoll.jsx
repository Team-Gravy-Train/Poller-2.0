import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';

// first we need to grab the options for the poll
// display them on the page
// create functionality that when one option is clicked, it'll invoke the fetch post request to add voter to database
// then route them to homepage 
// then they can check out the different polls

function TakePoll() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("What is your favorite pet?");
  const [checked, setChecked] = useState([]);
  const [pollOptions, setPollOptions] = useState(['dog', 'cat', 'fish', 'llama', 'ostrich']);
  const [name, setName] = useState('');
  let updatedList = [];

      // useEffect(() => {
      //   console.log('hello')
  //       const fetchPollQuestions = async () => {
  //         const response = await fetch(`http://localhost:3000/api/poll/${id}`)
  //         return await response.json();
  //       }
  // //req.body = name, id, choice


  //       fetchPollQuestions()
  //       .then((accessPoll) => {
  //         const pollOptionsArray = accessPoll.pollOptionsArray;
  //         setPollOptions(pollOptionsArray);
  //         const pollPrompt = accessPoll.pollPrompt;
  //         setPrompt(pollPrompt);
  //       })
      // }, [])

  // const pollOptionsArray = ['dog', 'cat', 'fish', 'llama', 'ostrich'];
  // setPollOptions(pollOptionsArray);
  // const pollPrompt = "What is your favorite pet?";
  // setPrompt(pollPrompt);

  const handleCheck = (event) => {
    updatedList = [...checked];
    // console.log(updatedList);
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
  };

  const handle = (event) => {
    setName(event.target.value);
  };

  const submit = async (event) => {
    console.log('name' + name)
    console.log('checked' + checked)
    event.preventDefault();
    const dataToSend = {
      choice: checked[0],
      name: name,
      id: 1
    }
    await fetch('/api/poll/votes', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dataToSend),
    })
  
    navigate("/homepage");
  }

  const checkBoxOptions = [];
  console.log(pollOptions)
  pollOptions.forEach((option) => {
    checkBoxOptions.push(
      <div>
        <input value={option} key={option} name='entry' type="radio" onChange={handleCheck}></input>
        <h3>{option}</h3>
        <br></br>
      </div>
    )
  })

  return (
    <div>
      <h1>Take Poll</h1>
      <h2>{prompt}</h2>
      <form onSubmit={submit}>
        {checkBoxOptions}
        <input type='text' onChange={(event) => handle(event)} placeholder="enter your name"></input>
        <input type='submit' value="Submit!"></input>
      </form>
    </div>
  )
}

export default TakePoll;
