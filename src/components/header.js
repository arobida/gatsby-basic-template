import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useState } from "react"
import { css } from "@emotion/core"
import { MdFingerprint, MdClear } from "react-icons/md"
import Headroom from "react-headroom"
import { useSpring, useTransition, animated } from "react-spring"

const nav = css`
  margin-bottom: 1.45rem;
  width: 100%;
  -webkit-box-shadow: 3px 3px 5px 6px #ccc;
  -moz-box-shadow: 3px 3px 5px 6px #ccc;
  box-shadow: 3px 3px 5px 6px #ccc;
  @media (max-width: 450px) {
    display: none;
  }
`
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
  height: 10rem;
  margin-top: 10rem;
  margin-right: 8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const link = css`
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

const Header = ({ siteTitle }) => {
  const [toggle, setToggle] = useState(false)
  console.log(toggle)
  const slider = useSpring({
    background: !toggle ? "white" : "rebeccapurple",
    width: !toggle ? "4rem" : "50rem",
    height: !toggle ? "4rem" : "50rem",
    bottom: !toggle ? "1.3rem" : "-18rem",
    right: !toggle ? "1.3rem" : "-18rem",
    zIndex: "50",
  })

  const iconchange = useSpring({
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
    <>
      <animated.header css={nav}>
        <Headroom>
          <Link
            to="/"
            style={{
              color: `rebeccapurple`,
              textDecoration: `none`,
            }}
          >
            {siteTitle}
          </Link>
        </Headroom>
      </animated.header>
      <animated.header css={mobilenav} style={slider}>
        <animated.div css={mobileItems} style={fade}>
          <Link to="/" css={link}>
            Home
          </Link>
          <Link to="/about" css={link}>
            About
          </Link>
          <Link to="/contact" css={link}>
            Contact
          </Link>
        </animated.div>
        <animated.div css={spinner} style={iconchange}>
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
    </>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
