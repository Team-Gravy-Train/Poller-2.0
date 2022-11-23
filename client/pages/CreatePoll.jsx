import React, { useState } from 'react'
import { BrowserRouter, useNavigate } from "react-router-dom";
// import Questions from '../components/Questions';

export const CreatePoll = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState(2);

  const handleFormData = async (e) => {

    e.preventDefault();
    const title = e.target.title.value;
    const options = [];
    for (let i = 1; i <= questions; i++) {
      const answer = `answer${i}`;
      options.push(e.target[answer].value);
    }
    console.log(title);
    const response = await fetch('./api/poll', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: title, options: options })
    });

    const data = await response.json();
    /*
    [1, [pizza, hotdogs, burritos]]
    */
    navigate(`/poll/${data[0]}`);
  }

  const numOfQuestions = [];
  for (let i = 1; i <= questions; i++) {
    numOfQuestions.push(
      <div className="input-group mb-3" key={i}>
        <input type="text" name={`answer${i}`} className="form-control border border-info" placeholder={`Option ${i}`} required/>
        <button type="button" onClick={() => setQuestions(questions - 1)} className="input-group-text btn btn-outline-info" >X</button>
      </div>
    )
  }

  return <div>
    <h1 className='text-center'>Create a Poll</h1>
    <div className='m-auto p-3 border border-info rounded form-wrapper'>

      <form onSubmit={handleFormData}>
        <label><strong>Title</strong></label>
        <div className="input-group mb-3">
          <input  type="text" name="title" className="form-control border border-info" placeholder="Type your question here" required/>
        </div>

        <label><strong>Answer Options:</strong></label>
        {numOfQuestions}

        <button className="btn btn-outline-info" type="button" onClick={() => setQuestions(questions + 1)}>Add Option</button>
        <hr className="border border-info" />
        <button className="btn btn-info text-white w-25" type="submit" >Create Poll</button>
      </form>
    </div>
  </div>
}

export default CreatePoll
