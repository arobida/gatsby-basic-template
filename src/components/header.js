import { Link } from "gatsby"
import React, { useState } from "react"
import { css } from "@emotion/core"
import { MdFingerprint, MdClear } from "react-icons/md"
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa"
import Headroom from "react-headroom"
import { useSpring, useTransition, animated } from "react-spring"

import logo from "../images/gatsby-icon.png"

const nav = css`
  margin-bottom: 1.45rem;
  -webkit-box-shadow: 3px 3px 5px 6px #ccc;
  -moz-box-shadow: 3px 3px 5px 6px #ccc;
  box-shadow: 3px 3px 5px 6px #ccc;
  @media (max-width: 450px) {
    display: none;
  }
`
const navItems = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top:.5em;
`
const link = css`
  color: rebeccapurple;
  text-decoration: none;
`
const Header = () => {
  return (
    <>
      {/* This is for the Desktop or full width navigation */}
      <animated.header>
        <Headroom css={nav}>
          <div css={navItems}>
            <Link to="/" css={link}>
              <img src={logo} alt="gatsbyjs logo" style={{width:"2em",marginLeft:"1em"}} />
            </Link>
            <nav>
            <ul style={{ listStyle: "none" }}>
              <li style={{ display: "inline-block",padding:".4em" }}>
                <Link to="/" css={link}>
                  <h3>Home</h3>
                </Link>
              </li>
              <li style={{ display: "inline-block",padding:".4em" }}>
                <Link to="/about" css={link}>
                  <h3>About</h3>
                </Link>
              </li>
              <li style={{ display: "inline-block",padding:".4em" }}>
                <Link to="/contact" css={link}>
                  <h3>Contact</h3>
                </Link>
              </li>
            </ul>
            </nav>
            <ul style={{ listStyle: "none", marginRight:"1em" }}>
              <li style={{ display: "inline-block" }}>
                <a href="#">
                  <FaFacebook size="2rem" />
                </a>
              </li>
              <li style={{ display: "inline-block" }}>
                <a href="#">
                  <FaInstagram size="2rem" />
                </a>
              </li>
              <li style={{ display: "inline-block" }}>
                <a href="#">
                  <FaLinkedin size="2rem" />
                </a>
              </li>
            </ul>
          </div>
        </Headroom>
      </animated.header>
      <MobileMenu />
    </>
  )
}

const mobilenav = css`
  @media (max-width: 450px) {
    height: 4rem;
    width: 4rem;
    position: fixed;
    right: 1.3rem;
    bottom: 1.3rem;
    border-radius: 100%;
    -webkit-box-shadow: 3px 3px 5px 6px #ccc;
    -moz-box-shadow: 3px 3px 5px 6px #ccc;
    box-shadow: 3px 3px 5px 6px #ccc;
  }
  @media (min-width: 450px) {
    display: none;
  }
`

const mobileItems = css`
  list-style: none;
  z-index: 55;
  font-size: 2rem;
  height: 65%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 8rem;
`
const mobileLink = css`
  color: #ff9100;
  margin-bottom: 2rem;
`
const spinner = css`
  height: 55px;
  width: 55px;
  position: fixed;
  bottom: 1.3rem;
  right: 1.5rem;
`

const MobileMenu = () => {
  // These are all animations for the mobile menu
  const [toggle, setToggle] = useState(false)
  const slider = useSpring({
    background: !toggle ? "white" : "rebeccapurple",
    width: !toggle ? "4rem" : "50rem",
    height: !toggle ? "4rem" : "50rem",
    bottom: !toggle ? "1.3rem" : "-18rem",
    right: !toggle ? "1.3rem" : "-18rem",
    zIndex: "50",
  })

  const spin = useSpring({
    transform: !toggle ? "rotate(0deg)" : "rotate(360deg)",
  })
  const fade = useSpring({
    display: !toggle ? "none" : "flex",
    opacity: !toggle ? 0 : 1,
  })
  const transitions = useTransition(toggle, null, {
    from: {
      position: "fixed",
      zIndex: "55",
      bottom: ".3rem",
      right: ".3rem",
      opacity: 0,
    },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })
  return (
    // This is for the Mobile of small width navigation
    <animated.header css={mobilenav} style={slider}>
      <animated.div css={mobileItems} style={fade}>
        <Link to="/" css={mobileLink}>
          Home
        </Link>
        <Link to="/about" css={mobileLink}>
          About
        </Link>
        <Link to="/contact" css={mobileLink}>
          Contact
        </Link>
        <div>
          <a href="#">
            <FaFacebook />
          </a>
          <a href="#">
            <FaInstagram />
          </a>
          <a href="#">
            <FaLinkedin />
          </a>
        </div>
      </animated.div>
      <animated.div css={spinner} style={spin}>
        {transitions.map(({ item, key, props }) =>
          item ? (
            <animated.div
              key={key}
              style={props}
              onClick={() => setToggle(!toggle)}
            >
              <MdClear size="3rem" color="#FF9100" />
            </animated.div>
          ) : (
            <animated.div
              key={key}
              style={props}
              onClick={() => setToggle(!toggle)}
            >
              <MdFingerprint size="3rem" color="#FF9100" />
            </animated.div>
          )
        )}
      </animated.div>
    </animated.header>
  )
}

export default Header
