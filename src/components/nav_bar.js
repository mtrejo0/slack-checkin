import React from 'react'

import {NavLink} from 'react-router-dom'

import './nav_bar.css'

class NavigationBar extends React.Component {


    render(){

        return (
          <div className="nav">
            <ul>
              <li>
                <NavLink to="/home">Home</NavLink>
              </li>
            </ul>
          </div>
        );
    }

}

export default NavigationBar;