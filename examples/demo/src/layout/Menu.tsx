import * as React from 'react';
import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import SettingsIcon from '@material-ui/icons/Settings';
import { useMediaQuery, Theme, Box } from '@material-ui/core';
import {
    useTranslate,
    DashboardMenuItem,
    MenuItemLink,
    MenuProps,
} from 'react-admin';

import VerticalNavigation from '../netspective-studios/design-system/components/vertical-navigation/VerticalNavigation';
import { AppState } from '../types';

type MenuName = 'menuCatalog' | 'menuSales' | 'menuCustomers';

const Menu: FC<MenuProps> = ({ onMenuClick, logout, dense = false }) => {
    const [state, setState] = useState({
        menuCatalog: true,
        menuSales: true,
        menuCustomers: true,
    });
    const translate = useTranslate();
    const isXSmall = useMediaQuery((theme: Theme) =>
        theme.breakpoints.down('xs')
    );
    const open = useSelector((state: AppState) => state.admin.ui.sidebarOpen);
    useSelector((state: AppState) => state.theme); // force rerender on theme change

    const handleToggle = (menu: MenuName) => {
        setState(state => ({ ...state, [menu]: !state[menu] }));
    };

    const menuItems = [
        {
            id: 'sales',
            label: 'Sales',
            icon: 'user',
            items: [
                { id: '/commands', label: 'Orders', to: '/commands' },
                { id: '/invoices', label: 'Invoices', to: '/invoices' },
            ],
        },
        {
            id: 'catalog',
            label: 'Catalog',
            icon: 'user',
            items: [
                { id: '/products', label: 'Products', to: '/products' },
                { id: '/categories', label: 'Categories', to: '/categories' },
            ],
        },
        {
            id: 'customers',
            label: 'Customers',
            icon: 'user',
            items: [
                { id: '/customers', label: 'Customers', to: '/customers' },
                { id: '/segments', label: 'Segments', to: '/segments' },
                { id: '/reviews', label: 'Reviews', to: '/reviews' },
            ],
        },
    ];
    return (
        <Box mt={1}>
            <DashboardMenuItem onClick={onMenuClick} sidebarIsOpen={open} />
            <VerticalNavigation categories={menuItems} />
            {isXSmall && (
                <MenuItemLink
                    to="/configuration"
                    primaryText={translate('pos.configuration')}
                    leftIcon={<SettingsIcon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
            )}
            {isXSmall && logout}
        </Box>
    );
};

export default Menu;
