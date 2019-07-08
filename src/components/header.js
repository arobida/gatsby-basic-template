import { Link } from "gatsby"
import React, { useState } from "react"
import { css } from "@emotion/core"
import { MdFingerprint, MdClear } from "react-icons/md"
import Headroom from "react-headroom"
import { useSpring, useTransition, animated } from "react-spring"

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
  align-items: flex-end;
  justify-content: flex-end;
`
const link = css`
  color: rebeccapurple;
  text-decoration: none;
  margin: 1rem;
  padding: 0;
`
const Header = () => {
  return (
    <>
      {/* This is for the Desktop or full width navigation */}
      <animated.header css={nav}>
        <Headroom>
          <div css={navItems}>
            <Link to="/" css={link} style={{ marginRight: "5rem" }}>
              <h2>Sexy Websites</h2>
            </Link>
            <Link to="/" css={link}>
              <h3>Home</h3>
            </Link>
            <Link to="/about" css={link}>
              <h3>About</h3>
            </Link>
            <Link to="/contact" css={link}>
              <h3>Contact</h3>
            </Link>
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
