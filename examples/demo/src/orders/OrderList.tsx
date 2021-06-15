import * as React from 'react';
import { FC, Fragment, useCallback, useEffect, useState } from 'react';
import {
    AutocompleteInput,
    BooleanField,
    Datagrid,
    DatagridProps,
    DateField,
    DateInput,
    Filter,
    FilterProps,
    Identifier,
    List,
    ListContextProvider,
    ListProps,
    NullableBooleanInput,
    NumberField,
    ReferenceInput,
    ReferenceField,
    SearchInput,
    TextField,
    TextInput,
    useGetList,
    useListContext,
} from 'react-admin';
import { useMediaQuery, Theme } from '@material-ui/core';

import DSTabs from '../netspective-studios/design-system/components/tabs/Tabs';
import DSTabsPanel from '../netspective-studios/design-system/components/tabs-panel/TabsPanel';

import { makeStyles } from '@material-ui/core/styles';

import NbItemsField from './NbItemsField';
import CustomerReferenceField from '../visitors/CustomerReferenceField';
import AddressField from '../visitors/AddressField';
import MobileGrid from './MobileGrid';
import { Customer } from '../types';

const OrderFilter: FC<Omit<FilterProps, 'children'>> = props => (
    <Filter {...props}>
        <SearchInput source="q" alwaysOn />
        <ReferenceInput source="customer_id" reference="customers">
            <AutocompleteInput
                optionText={(choice: Customer) =>
                    choice.id // the empty choice is { id: '' }
                        ? `${choice.first_name} ${choice.last_name}`
                        : ''
                }
            />
        </ReferenceInput>
        <DateInput source="date_gte" />
        <DateInput source="date_lte" />
        <TextInput source="total_gte" />
        <NullableBooleanInput source="returned" />
    </Filter>
);

const useDatagridStyles = makeStyles({
    total: { fontWeight: 'bold' },
});

interface TabbedDatagridProps extends DatagridProps {}

const useGetTotals = (filterValues: any) => {
    const { total: totalOrdered } = useGetList(
        'commands',
        { perPage: 1, page: 1 },
        { field: 'id', order: 'ASC' },
        { ...filterValues, status: 'ordered' }
    );
    const { total: totalDelivered } = useGetList(
        'commands',
        { perPage: 1, page: 1 },
        { field: 'id', order: 'ASC' },
        { ...filterValues, status: 'delivered' }
    );
    const { total: totalCancelled } = useGetList(
        'commands',
        { perPage: 1, page: 1 },
        { field: 'id', order: 'ASC' },
        { ...filterValues, status: 'cancelled' }
    );

    return {
        ordered: totalOrdered,
        delivered: totalDelivered,
        cancelled: totalCancelled,
    };
};

const TabbedDatagrid: FC<TabbedDatagridProps> = props => {
    const listContext = useListContext();
    const { ids, filterValues, setFilters, displayedFilters } = listContext;
    const classes = useDatagridStyles();
    const isXSmall = useMediaQuery<Theme>(theme =>
        theme.breakpoints.down('xs')
    );
    const [ordered, setOrdered] = useState<Identifier[]>([] as Identifier[]);
    const [delivered, setDelivered] = useState<Identifier[]>(
        [] as Identifier[]
    );
    const [cancelled, setCancelled] = useState<Identifier[]>(
        [] as Identifier[]
    );
    const totals = useGetTotals(filterValues) as any;

    useEffect(() => {
        if (ids && ids !== filterValues.status) {
            switch (filterValues.status) {
                case 'ordered':
                    setOrdered(ids);
                    break;
                case 'delivered':
                    setDelivered(ids);
                    break;
                case 'cancelled':
                    setCancelled(ids);
                    break;
            }
        }
    }, [ids, filterValues.status]);

    const handleChange = useCallback(
        (value: any) => {
            setFilters &&
                setFilters(
                    { ...filterValues, status: value },
                    displayedFilters
                );
        },
        [displayedFilters, filterValues, setFilters]
    );

    const selectedIds =
        filterValues.status === 'ordered'
            ? ordered
            : filterValues.status === 'delivered'
            ? delivered
            : cancelled;

    const smallViewContent = () => {
        return (
            <ListContextProvider value={{ ...listContext, ids: selectedIds }}>
                <MobileGrid {...props} ids={selectedIds} />
            </ListContextProvider>
        );
    };

    const getSelectedTabId = () => {
        const status = filterValues.status;
        if (status === 'ordered') {
            return 0;
        } else if (status === 'delivered') {
            return 1;
        } else {
            return 2;
        }
    };

    const handleTabChange = (s: any) => {
        let value = '';

        if (s === 0) {
            value = 'ordered';
        } else if (s === 1) {
            value = 'delivered';
        } else {
            value = 'cancelled';
        }
        handleChange(value);
    };

    return (
        <Fragment>
            <DSTabs
                variant="scoped"
                selectedIndex={getSelectedTabId()}
                onSelect={handleTabChange}
            >
                <DSTabsPanel
                    label={
                        totals['ordered']
                            ? `Ordered (${totals['ordered']})`
                            : 'Ordered'
                    }
                >
                    {isXSmall ? (
                        smallViewContent()
                    ) : (
                        <ListContextProvider
                            value={{ ...listContext, ids: ordered }}
                        >
                            <Datagrid {...props} optimized rowClick="edit">
                                <DateField source="date" showTime />
                                <TextField source="reference" />
                                <CustomerReferenceField />
                                <ReferenceField
                                    source="customer_id"
                                    reference="customers"
                                    link={false}
                                    label="resources.commands.fields.address"
                                >
                                    <AddressField />
                                </ReferenceField>
                                <NbItemsField />
                                <NumberField
                                    source="total"
                                    options={{
                                        style: 'currency',
                                        currency: 'USD',
                                    }}
                                    className={classes.total}
                                />
                            </Datagrid>
                        </ListContextProvider>
                    )}
                </DSTabsPanel>
                <DSTabsPanel
                    label={
                        totals['delivered']
                            ? `Delivered (${totals['delivered']})`
                            : 'Delivered'
                    }
                >
                    {isXSmall ? (
                        smallViewContent()
                    ) : (
                        <ListContextProvider
                            value={{ ...listContext, ids: delivered }}
                        >
                            <Datagrid {...props} rowClick="edit">
                                <DateField source="date" showTime />
                                <TextField source="reference" />
                                <CustomerReferenceField />
                                <ReferenceField
                                    source="customer_id"
                                    reference="customers"
                                    link={false}
                                    label="resources.commands.fields.address"
                                >
                                    <AddressField />
                                </ReferenceField>
                                <NbItemsField />
                                <NumberField
                                    source="total"
                                    options={{
                                        style: 'currency',
                                        currency: 'USD',
                                    }}
                                    className={classes.total}
                                />
                                <BooleanField source="returned" />
                            </Datagrid>
                        </ListContextProvider>
                    )}
                </DSTabsPanel>
                <DSTabsPanel
                    label={
                        totals['cancelled']
                            ? `Cancelled (${totals['cancelled']})`
                            : 'Cancelled'
                    }
                >
                    {isXSmall ? (
                        smallViewContent()
                    ) : (
                        <ListContextProvider
                            value={{ ...listContext, ids: cancelled }}
                        >
                            <Datagrid {...props} rowClick="edit">
                                <DateField source="date" showTime />
                                <TextField source="reference" />
                                <CustomerReferenceField />
                                <ReferenceField
                                    source="customer_id"
                                    reference="customers"
                                    link={false}
                                    label="resources.commands.fields.address"
                                >
                                    <AddressField />
                                </ReferenceField>
                                <NbItemsField />
                                <NumberField
                                    source="total"
                                    options={{
                                        style: 'currency',
                                        currency: 'USD',
                                    }}
                                    className={classes.total}
                                />
                                <BooleanField source="returned" />
                            </Datagrid>
                        </ListContextProvider>
                    )}
                </DSTabsPanel>
            </DSTabs>
        </Fragment>
    );
};

const OrderList: FC<ListProps> = props => (
    <List
        {...props}
        filterDefaultValues={{ status: 'ordered' }}
        sort={{ field: 'date', order: 'DESC' }}
        perPage={25}
        filters={<OrderFilter />}
    >
        <TabbedDatagrid />
    </List>
);

export default OrderList;
