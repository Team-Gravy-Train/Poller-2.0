import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';

function TakePoll() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [prompt, setPrompt] = useState('');
    const [checked, setChecked] = useState([]);
    const [pollOptions, setPollOptions] = useState([]);
    const [name, setName] = useState('');
    let updatedList = [];

    useEffect(() => {
      const fetchPollQuestions = async () => {
        const response = await fetch(`/api/poll/${id}`)
        return await response.json();
      }

      fetchPollQuestions()
        .then((accessPoll) => {
          const pollOptionsArray = accessPoll.pollOptionsArray;
          setPollOptions(pollOptionsArray);
          const pollPrompt = accessPoll.pollPrompt;
          setPrompt(pollPrompt);
        })
    }, [])

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

    const submit = (event) => {
      event.preventDefault();
      const dataToSend = {
        answer: checked[0],
        user: name
      }
      fetch(`/api/poll/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(dataToSend),
      })
      navigate(`/${id}/display`);
    }

    const checkBoxOptions = [];
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
