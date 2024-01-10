import React from 'react'
import git from "../components/icons8-github-64.png";
import linkedin from "../components/icons8-logo-linkedin-64.png";

const Footer = () => {
  return (
    <div className='footer'>
    <div className="footer-links">
        <a href="https://www.linkedin.com/in/guillaume-séré" target="_blank" rel="noreferrer"><img
                src={linkedin} className='link2' /></a>
        <p> <span>&copy;</span> Guillaume SERE</p>
        <a href="https://github.com/GuillaumeSere" target="_blank" rel="noreferrer"><img
                src={git} className='link1' /></a>

    </div>
</div>
  )
}

export default Footer
