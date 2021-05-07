import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";
import { getUser } from "../services/auth";

const HeaderStyles = styled.header`
  background-color: black;
  padding: 0 25px;
  display: flex;
  align-items: center;
  color: white;

  .spacer {
    flex: 1;
  }

  a {
    text-decoration: none;
    color: white;
  }
`;

const Header: React.FC<{ siteTitle: string }> = ({ siteTitle }) => {
  const user = getUser();
  return (
    <HeaderStyles>
      <div>
        <h1>
          <Link to="/">{siteTitle}</Link>
        </h1>
      </div>
      <div className="spacer"></div>
      <nav>
        {user ? <p>Hello {user.firstName}</p> : <Link to="/login">Login</Link>}
      </nav>
    </HeaderStyles>
  );
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
