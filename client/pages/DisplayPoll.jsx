import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useContext, useEffect } from 'react'
import { Bar } from "react-chartjs-2"
// import { Chart as ChartJS} from 'chart.js/auto'

//notes:
// npm install chart.js
// npm install react-chartjs-2

function DisplayPoll() {

    const [polls, setPolls] = useState([]);
    const {id} = useParams();

    const [value, setValue] = useState('')
    const [updated, setUpdated] = useState(0);
  //   const [, updateState] = React.useState();
  // const forceUpdate = React.useCallback(() => updateState({}), []);


    useEffect(()=>{
        const fetchPolls = async () => {
            let response = await fetch(`http://localhost:3000/api/poll/${id}/display`)
        let data = await response.json()

        setPolls(data.poll)

        }
        fetchPolls()
        .catch(console.err)
    },[])


    async function handleDelete(e, key, poll_id, users, entries) {
        console.log("entering handleSubmit?")
        e.preventDefault();

        async function postFlask (){
         const response = await fetch(`http://localhost:3000/api/poll/${poll_id}/${key}`, {
            method: 'DELETE'

            })
        }
        await postFlask()
        .catch(err => console.log('error in post server deleting flask'))
        // navigateFlaskHome()

      const fetchPolls = async () => {
        let response = await fetch(`http://localhost:3000/api/poll/${id}/display`)
        let data = await response.json()
        setPolls(data.poll)
        }
        await fetchPolls()
        .catch(console.err)

      }
      //filtered poll:  removed all rows that did not have entries.
    let filteredPoll = polls.filter(poll => poll.entries !== null)
    // console.log('filteredPoll', filteredPoll)
    const pollResult = {}
    const pollOptions = polls.filter(poll => poll.poll_options !==null)
    //making sure graph contains all poll_options since it is filtered out in the entries
    pollOptions.forEach(poll => {
        pollResult[poll.poll_options] = 0
    })
    // console.log('pollOptions, check if it has all options, fish', pollOptions)
    // console.log( 'pollResult', pollResult)

    filteredPoll.forEach(poll => {
        pollResult[poll.entries] ? pollResult[poll.entries]++ : pollResult[poll.entries] = 1;
    })
    // console.log('pollResult', pollResult)
    // console.log('Object.entries(pollResult)', Object.entries(pollResult))
    const test = Object.entries(pollResult).map(entry=> entry[0]);

    //
    const pollGraph = {
        labels: Object.entries(pollResult).map((entry)=> entry[0]),
        datasets: [{
          label: "votes",
          data: Object.entries(pollResult).map((entry)=> entry[1])
        }],


      }

      //getting the prompt to display on top of the page
      let prompt = polls.filter(poll => poll.poll_prompt !== null)
    //   console.log('prompt[0]', (prompt[0]))
    //   let oneObj = prompt[0]
    //   console.log('oneObj', {...prompt[0]}.poll_prompt)
//
    return (

     <div className="displayPoll mb-5">

      <div className="displayPrompt text-secondary"><h1>{{...prompt[0]}.poll_prompt}</h1></div>
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
             <th className="text-center" scope="col">Delete</th>
         </tr>
       </thead>

       <tbody>

             {   filteredPoll &&
                 filteredPoll.map(poll => {
                     return (
                         <tr key={poll.id} value={poll.id} >

                             <td className="text-center">{poll.users}</td>
                             <td className="text-center">{poll.entries}</td>
                             <td className="text-center"><button type="submit" onClick={(e) => handleDelete(e, poll.id, poll.poll_id, poll.users, poll.entries)} className="btn btn-danger btn-sm ">Delete</button></td>
                         </tr>
                     )
                 })
             }

       </tbody>
     </table>
   </div>

     {/*  */}

     <h3 className="text-muted mt-5 ">Update Poll</h3>
     {   polls.filter(poll => poll.entries !== null) &&
      polls.filter(poll => poll.entries !== null).map(poll => { return (<UpdateTable poll={poll} setValue={setValue}></UpdateTable>) })
      }

    </div>
    )
}


function UpdateTable({poll, setValue}) {

  const [users, setUsers] = useState(poll.users);
  const [entries, setEntries] = useState(poll.entries);
  const refreshPage = ()=>{
    window.location.reload();
 }
  async function handleSubmit(e, key, poll_id){

    e.stopPropagation();
    e.preventDefault();

    async function postFlask (){
        const response = await fetch(`http://localhost:3000/api/poll/${poll_id}/${key}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              users,
              entries
            })
        })
    }
    await postFlask()
    await refreshPage()
    .catch(err => console.log('error in post server adding flask'))

     }

     let reactkey = 0;
     console.log('poll prop in updateTable component handlesubmit', poll.id)


  return (
    <div>
        <form key={poll.id} action="">
            <div className="form-row row mb-3">
            <div className="col-sm">
            Users <input type="text" value={users} onChange={e=> setUsers(e.target.value)} className="form-control" />
         </div>
         <div className="col-sm">
            Vote <input type="text" className="form-control" value={entries} onChange={e=> setEntries(e.target.value)}/>
         </div>
            <button type="submit" onClick={(e) => handleSubmit(e, poll.id, poll.poll_id)} className="btn btn-warning btn-sm  ">Update</button>
          </div>

          </form>

    </div>
  )
}



export { DisplayPoll, UpdateTable }
