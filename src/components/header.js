import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useState } from "react"
import { css } from "@emotion/core"
import styled from "@emotion/styled"
import { MdFingerprint, MdClear } from "react-icons/md"
import Headroom from "react-headroom"
import { useSpring, animated } from "react-spring"

const nav = css`
  margin-bottom: 1.45rem;
  -webkit-box-shadow: 3px 3px 5px 6px #ccc;
  -moz-box-shadow: 3px 3px 5px 6px #ccc;
  box-shadow: 3px 3px 5px 6px #ccc;
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
`
const Menu = styled.div`
  @media (max-width: 450px) {
    display: none;
  }
`
const MobileMenu = styled(animated.div)`
  @media (min-width: 450px) {
    display: none;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5px;
`

const Header = ({ siteTitle }) => {
  const [toggle, setToggle] = useState(false)
  console.log(toggle)
  console.log(MobileMenu)
  const slider = useSpring({
    background: !toggle ? "white" : "rebeccapurple",
    width: !toggle ? "4rem" : "50rem",
    height: !toggle ? "4rem" : "50rem",
    bottom: !toggle ? "1.3rem" : "-18rem",
    right: !toggle ? "1.3rem" : "-18rem",
    zIndex: "50",
  })
  const menuicon = css`
    position: fixed;
    bottom: 40px;
    right: 25px;
  `
  const iconchange = useSpring({
    opacity: !toggle ? 1 : 0,
  })
  const stroker = useSpring({
    x: 100,
    from: { x: 0 },
  })
  return (
    <animated.header css={nav} style={slider}>
      <Menu>
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
      </Menu>
      <MobileMenu onClick={() => setToggle(!toggle)}>
        <animated.div css={menuicon} style={stroker}>
          <MdFingerprint size="3.5rem" color="#FF9100" />
        </animated.div>
      </MobileMenu>
    </animated.header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
