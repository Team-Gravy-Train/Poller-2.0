import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useContext, useEffect } from 'react'
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS } from 'chart.js/auto'

//notes:
// npm install chart.js
// npm install react-chartjs-2

function DisplayPoll() {

  const [polls, setPolls] = useState([]);
  const [userVoter, setUserVoter] = useState([]);
  const { id } = useParams();

  // const [value, setValue] = useState('')
  // const [updated, setUpdated] = useState(0);
  //   const [, updateState] = React.useState();
  // const forceUpdate = React.useCallback(() => updateState({}), []);


  useEffect(() => {
    const fetchPolls = async () => {
      let response = await fetch(`/api/poll/${id}`)
      let data = await response.json()
      console.log(data)
      setPolls(data[0]);
      setUserVoter(data[1]);
    }
    fetchPolls()
      .catch(console.err)
  }, [])

  // delete

  // async function handleDelete(e, key, poll_id, users, entries) {
  //     console.log("entering handleSubmit?")
  //     e.preventDefault();

  //     async function postFlask (){
  //      const response = await fetch(`http://localhost:3000/api/poll/${poll_id}/${key}`, {
  //         method: 'DELETE'

  //         })
  //     }
  //     await postFlask()
  //     .catch(err => console.log('error in post server deleting flask'))
  //     // navigateFlaskHome()

  //   const fetchPolls = async () => {
  //     let response = await fetch(`http://localhost:3000/api/poll/${id}/display`)
  //     let data = await response.json()
  //     setPolls(data.poll)
  //     }
  //     await fetchPolls()
  //     .catch(console.err)

  //   }



  const pollGraph = {
    // labels: Object.entries(polls).map((entry)=> entry[0]),
    labels: polls.map(entry => entry.choice),
    datasets: [{
      label: "votes",
      // data: Object.entries(pollResult).map((entry)=> entry[1])
      data: polls.map(entry => entry.total)
    }],
  }

  // userVoter.map(entry => entry.voter)
  // userVoter.map(entry => entry.choice)

  //   //getting the prompt to display on top of the page
  //   let prompt = polls.filter(poll => poll.poll_prompt !== null)
  // //   console.log('prompt[0]', (prompt[0]))
  // //   let oneObj = prompt[0]
  // //   console.log('oneObj', {...prompt[0]}.poll_prompt)

  return (
    <div className="displayPoll mb-5">

      <div className="displayPrompt text-secondary"><h1>{{ ...prompt[0] }.poll_prompt}</h1></div>
      {/* bar chart below */}
      <div className="barchartdiv mb-5">
        <h3 className="text-center text-muted">Poll Graph</h3>
        <Bar className="display-barchart" data={pollGraph} />
      </div>
      {/*  */}


      {/*  */}
      <h3 className="text-muted mt-5">Individual Results</h3>
      <div className="display-list-group2 mt-2 mb-5">
        <table className="table table-hover table-light">
          <thead>
            <tr className="bg-primary table-warning">
              <th className="text-center" scope="col">Users</th>
              <th className="text-center" scope="col">Vote</th>
              {/* <th className="text-center" scope="col">Delete</th> */}
            </tr>
          </thead>
          {userVoter.map((el) => (
            <tr>
              <td>{el.voter}</td>
              <td>{el.choice}</td>
            </tr>
          ))}
        </table>
      </div>

      {/*  */}

      {/* <h3 className="text-muted mt-5 ">Update Poll</h3>
     {   polls.filter(poll => poll.entries !== null) &&
      polls.filter(poll => poll.entries !== null).map(poll => { return (<UpdateTable poll={poll} setValue={setValue}></UpdateTable>) })
      } */}

    </div>
  )
}


// function UpdateTable({poll, setValue}) {

//   const [users, setUsers] = useState(poll.users);
//   const [entries, setEntries] = useState(poll.entries);
//   const refreshPage = ()=>{
//     window.location.reload();
//  }
//   async function handleSubmit(e, key, poll_id){

//     e.stopPropagation();
//     e.preventDefault();

//     async function postFlask (){
//         const response = await fetch(`http://localhost:3000/api/poll/${poll_id}/${key}`, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//               users,
//               entries
//             })
//         })
//     }
//     await postFlask()
//     await refreshPage()
//     .catch(err => console.log('error in post server adding flask'))

//      }

//      let reactkey = 0;
//      console.log('poll prop in updateTable component handlesubmit', poll.id)


//   return (
//     <div>
//         <form key={poll.id} action="">
//             <div className="form-row row mb-3">
//             <div className="col-sm">
//             Users <input type="text" value={users} onChange={e=> setUsers(e.target.value)} className="form-control" />
//          </div>
//          <div className="col-sm">
//             Vote <input type="text" className="form-control" value={entries} onChange={e=> setEntries(e.target.value)}/>
//          </div>
//             <button type="submit" onClick={(e) => handleSubmit(e, poll.id, poll.poll_id)} className="btn btn-warning btn-sm  ">Update</button>
//           </div>

//           </form>

//     </div>
//   )
// }



export { DisplayPoll }
