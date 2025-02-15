import React, { useMemo } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { ConfigurableLink } from '@openmrs/esm-framework';

export interface DashboardLinkConfig {
  name: string;
  title: string;
}

const DashboardLink = ({ dashboardLinkConfig }: { dashboardLinkConfig: DashboardLinkConfig }) => {
  const { name } = dashboardLinkConfig;
  const location = useLocation();
  const spaBasePath = `${window.spaBase}/home`;

  const navLink = useMemo(() => {
    const pathArray = location.pathname.split('/');
    const lastElement = pathArray[pathArray.length - 1];
    return decodeURIComponent(lastElement);
  }, [location.pathname]);

  return (
    <ConfigurableLink
      to={spaBasePath}
      className={`cds--side-nav__link ${navLink === 'home' && 'active-left-nav-link'}`}
    >
      {name}
    </ConfigurableLink>
  );
};

export const createDashboardLink = (dashboardLinkConfig: DashboardLinkConfig) => {
  return () => (
    <BrowserRouter>
      <DashboardLink dashboardLinkConfig={dashboardLinkConfig} />
    </BrowserRouter>
  );
};
