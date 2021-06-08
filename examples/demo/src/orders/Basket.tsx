import * as React from 'react';
import { FC } from 'react';
import DataTable from '../netspective-studios/design-system/components/table/Table';
import { makeStyles } from '@material-ui/core/styles';
import { Link, FieldProps, useTranslate, useQueryWithStore } from 'react-admin';

import { AppState, Order, Product } from '../types';

const useStyles = makeStyles({
    rightAlignedCell: { textAlign: 'right' },
});

const Basket: FC<FieldProps<Order>> = ({ record }) => {
    const classes = useStyles();
    const translate = useTranslate();

    const { loaded, data: products } = useQueryWithStore<AppState>(
        {
            type: 'getMany',
            resource: 'products',
            payload: {
                ids: record ? record.basket.map(item => item.product_id) : [],
            },
        },
        {},
        state => {
            const productIds = record
                ? record.basket.map(item => item.product_id)
                : [];

            return productIds
                .map<Product>(
                    productId =>
                        state.admin.resources.products.data[
                            productId
                        ] as Product
                )
                .filter(r => typeof r !== 'undefined')
                .reduce((prev, next) => {
                    prev[next.id] = next;
                    return prev;
                }, {} as { [key: string]: Product });
        }
    );

    if (!loaded || !record) return null;

    const columns = [
        {
            key: 'reference',
            label: translate('resources.commands.fields.basket.reference'),
            property: 'reference',
            render: (text: any, row: any) => {
                return <Link to={`/products/${row.id}`}>{text}</Link>;
            },
        },
        {
            key: 'unit_price',
            label: translate('resources.commands.fields.basket.unit_price'),
            property: 'unit_price',
        },
        {
            key: 'quantity',
            label: translate('resources.commands.fields.basket.quantity'),
            property: 'quantity',
        },
        {
            key: 'total',
            label: translate('resources.commands.fields.basket.total'),
            property: 'total',
        },
    ];

    const dataSource = [];
    if (record?.basket) {
        for (let i = 0; i < record.basket.length; i++) {
            const item = record.basket[i];
            if (products[item.product_id]) {
                dataSource.push({
                    id: item.product_id,
                    reference: products[item.product_id].reference,
                    unit_price: products[item.product_id].price.toLocaleString(
                        undefined,
                        {
                            style: 'currency',
                            currency: 'USD',
                        }
                    ),
                    quantity: item.quantity,
                    total: (
                        products[item.product_id].price * item.quantity
                    ).toLocaleString(undefined, {
                        style: 'currency',
                        currency: 'USD',
                    }),
                });
            }
        }
    }

    return (
        <React.Fragment>
            {dataSource && (
                <DataTable columns={columns} dataSource={dataSource} />
            )}
        </React.Fragment>
    );
};

export default Basket;
