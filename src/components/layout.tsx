import "normalize.css";
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { graphql, useStaticQuery } from "gatsby";

import Header from "./header";

interface SiteTitleQuery {
  site: {
    siteMetadata: {
      title: string;
    };
  };
}

const LayoutStyle = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;

  main {
    flex: 1;
  }
`;

const Layout: React.FC = ({ children }) => {
  const data = useStaticQuery<SiteTitleQuery>(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <LayoutStyle>
      <Header siteTitle={data.site.siteMetadata.title || `Title`} />
      <main>{children}</main>
      <footer>© Ivie A. {new Date().getFullYear()}</footer>
    </LayoutStyle>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
