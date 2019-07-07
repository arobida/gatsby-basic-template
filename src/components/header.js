import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useState } from "react"
import { css } from "@emotion/core"
import styled from "@emotion/styled"
import { MdFingerprint, MdClear } from "react-icons/md"
import Headroom from "react-headroom"

const nav = css`
  margin-bottom: 1.45rem;
  -webkit-box-shadow: 3px 3px 5px 6px #ccc;
  -moz-box-shadow: 3px 3px 5px 6px #ccc;
  box-shadow: 3px 3px 5px 6px #ccc;
  @media (max-width: 450px) {
    height: 4rem;
    width: 4rem;
    position: fixed;
    right: 20px;
    bottom: 20px;
    border-radius: 100px;
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
const MobileMenu = styled.div`
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
  return (
    <header css={nav}>
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
      <MobileMenu>
        <MdFingerprint size="3.5rem" color="#FF9100" />
      </MobileMenu>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
