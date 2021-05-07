import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";

const HeaderStyles = styled.header`
  background-color: black;
  padding: 0 25px;

  a {
    text-decoration: none;
    color: white;
  }
`;

const Header: React.FC<{ siteTitle: string }> = ({ siteTitle }) => (
  <HeaderStyles>
    <div>
      <h1>
        <Link to="/">{siteTitle}</Link>
      </h1>
    </div>
  </HeaderStyles>
);

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
