import * as React from 'react';
import { FC } from 'react';
import DataTable from '../netspective-studios/design-system/components/table/Table';
import { makeStyles } from '@material-ui/core/styles';
import { FieldProps, useTranslate } from 'react-admin';

import { Order } from '../types';

const useStyles = makeStyles({
    container: { minWidth: '35em' },
    rightAlignedCell: { textAlign: 'right' },
    boldCell: { fontWeight: 'bold' },
});

const Totals: FC<FieldProps<Order>> = ({ record }: { record?: Order }) => {
    const classes = useStyles();
    const translate = useTranslate();

    const columns = [
        {
            key: 'name',
            property: 'name',
            label: 'Description',
        },
        {
            key: 'value',
            property: 'value',
            label: '',
        },
    ];

    const dataSource = [
        {
            name: translate('resources.commands.fields.basket.sum'),
            value: record?.total_ex_taxes.toLocaleString(undefined, {
                style: 'currency',
                currency: 'USD',
            }),
        },
        {
            name: translate('resources.commands.fields.basket.delivery'),
            value: record?.delivery_fees.toLocaleString(undefined, {
                style: 'currency',
                currency: 'USD',
            }),
        },
        {
            name: `${translate(
                'resources.commands.fields.basket.taxes'
            )} ${record?.tax_rate.toLocaleString(undefined, {
                style: 'percent',
            })}`,
            value: record?.taxes.toLocaleString(undefined, {
                style: 'currency',
                currency: 'USD',
            }),
        },
        {
            name: translate('resources.commands.fields.basket.total'),
            value: record?.total.toLocaleString(undefined, {
                style: 'currency',
                currency: 'USD',
            }),
        },
    ];

    return (
        <React.Fragment>
            <DataTable columns={columns} dataSource={dataSource} />
        </React.Fragment>
    );
};

export default Totals;
