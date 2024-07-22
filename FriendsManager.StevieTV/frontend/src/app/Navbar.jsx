import { Link } from "react-router-dom"

export const Navbar = () => {

  return (
    <nav>
      <section>
        <h1 className="navHeader">Friends Manager by StevieTV</h1>
        <div className="navContent">
          <div className="navLinks">
            <Link to="/">Friends</Link>
            <Link to="/categories">Categories</Link>
          </div>
        </div>
      </section>
    </nav>
  )
};