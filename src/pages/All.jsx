import React from 'react'
import { useState, useEffect } from 'react'
import {NavLink} from 'react-router-dom'

function All() {
    const [state, seState] = useState([])
    let notcompletecount = 0
    useEffect(() => {
      fetch('http://localhost:7000/tests')
      .then(res => res.json())
        .then(data => {
         seState(data)
        
        })
    }, [])
  

    state.map(e => {
        if(e.complete === 'false'){
            notcompletecount++
        }
    })
  
   
  
    const completeTest = (id) => {
    

    let a= state.find(e => e.id === id)
    if(a.complete === 'false'){
        a.complete= 'true'
    }
        fetch(`http://localhost:7000/tests/${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "Application/json"
            },
            body: JSON.stringify(a)
        })
        .then(res => res.json())
        .then(data => {
            let mine = [...state]
            let index= mine.findIndex(e => e.id === a.id)
            mine.splice(index,1,a)
            seState(mine)
        })
    }


    const [test, setTest] = useState({})
    const getTest = (e) => {
        setTest({
          "complete": 'false',
          "content" : e.target.value 
        })
      }

    const addTest = (e) => {
      e.preventDefault()
      fetch('http://localhost:7000/tests',{
        method: 'Post',
        headers: {
            "Content-Type": "Application/json"
        },
        body: JSON.stringify(test)
      })
      .then(res => res.json())
      .then(data => {
            seState([...state, data])
      })
    } 
  
    let completeid = []
    state.map(e => {
        if(e.complete === 'true'){
            completeid.push(e.id)
        }
    })

    const clearcomplete = () => {
        let c= [...state]
        completeid.map(id => {
            fetch(`http://localhost:7000/tests/${id}`, {
                method: "DELETE"
            })
            .then(res => res.json())
            .then(data => {
              c= c.filter(e => e.id !== id)
              seState(c)
             
            })
        })
    }

  return (
    <div>
        <div className="tests">
        <div className="newtest">
          <form onSubmit={(e) => addTest(e)} >
            <input type="text" placeholder='What needs to be done?' className='input-group' 
            onChange={(e) => getTest(e)} />
            <button className='btn btn-success'>Send</button>
            
              
                <i className="fa-solid fa-angle-down" ></i>
            

          </form>
          <table >
            <tbody>
              {

                state.map((index, key) => (
                  <tr key={key}>
                    <td>
                      <span className='done'
                        onClick={() => completeTest(index.id)}
                      >
                        {
                          index.complete==='true' ?
                            <i className="fa-solid fa-check activated"></i>
                            :
                            <i className="fa-solid fa-check"></i>
                        }
                      </span> {index.content}
                    </td>
                  </tr>
                ))

              }
            </tbody>
          </table>

          <div className="info">
            <div className="data-count">
            <h3> <span> {notcompletecount} </span> items left </h3>
            </div>
            <div className="data-list">
              <ul>
                <li> <NavLink to='/'>All</NavLink> </li>
                <li> <NavLink to='/active'>Active</NavLink> </li>
                <li> <NavLink to='/complete'>Complete</NavLink> </li>
              </ul>
            </div>
            <div className="data-clear">
              <h3 onClick={() => clearcomplete()}>Clear Completed</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default All