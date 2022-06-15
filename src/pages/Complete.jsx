import React from 'react'
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

function Complete() {

  const [complete, setComplete] = useState([])



    useEffect(() => {
      fetch('http://localhost:7000/tests')
        .then(res => res.json())
        .then(data => {
          let a = data.filter(e => e.complete != 'false')
          setComplete(a)
        })
    }, [])
  

    return (
      <div>
        <div className="tests">
          <div className="newtest">

            <table >
              <tbody>
                {

                  complete.map((index, key) => (
                    <tr key={key}>
                      <td>
                        <span className='done'

                        >

                          <i className="fa-solid fa-check activated"></i>


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

  export default Complete