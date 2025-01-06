import React from 'react';
import { NavigationContainer, NavItem, ListNavItems } from '@keystone-6/core/admin-ui/components';
import type { NavigationProps } from '@keystone-6/core/admin-ui/components';

const CustomNavigation = ({ authenticatedItem, lists }: NavigationProps) => {
  console.log();

  return (
    <NavigationContainer authenticatedItem={authenticatedItem}>
      <NavItem href="/">Dashboard</NavItem>
      <ListNavItems lists={lists} />
      <NavItem href="/analytics">Analytics</NavItem>
    </NavigationContainer>
  );
};

export default CustomNavigation;
