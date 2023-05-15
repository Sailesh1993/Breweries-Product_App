import React from 'react'
import { Outlet } from 'react-router'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
        <header>
            <nav>
                <Link to="/">Home</Link>
            </nav>
        </header>
        <Outlet/>
        <footer>
            <p>This is the footer</p>
        </footer>
    </div>
  )
}

export default Home