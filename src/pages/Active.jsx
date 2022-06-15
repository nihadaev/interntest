import React from 'react'
import {useEffect, useState} from 'react'
import {NavLink} from 'react-router-dom'

function Active() {
  const [notcomplete,setnotComplete] = useState([])

  useEffect(() => {
    fetch('http://localhost:7000/tests')
   .then(res => res.json())
   .then(data => {
     let a= data.filter(e => e.complete != 'true')
     setnotComplete(a)
   })
 },[])

 const completeTest = (id) => {
 let a= notcomplete.find(e => e.id === id)
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
            let mine = [...notcomplete]
           mine = mine.filter(e => e.id !== id)
           setnotComplete(mine)
        })
    }
  return (
    <div>
       <div className="tests">
        <div className="newtest">
         
          <table >
            <tbody>
              {

                notcomplete.map((index, key) => (
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

          <div className="info1">
            
            <div className="data-list">
              <ul>
                <li> <NavLink to='/'>All</NavLink> </li>
                <li> <NavLink to='/active'>Active</NavLink> </li>
                <li> <NavLink to='/complete'>Complete</NavLink> </li>
              </ul>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default Active