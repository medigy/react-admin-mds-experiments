import * as React from 'react';
import { FC } from 'react';
import Card from '../netspective-studios/design-system/components/card/Card';
import DataTable from '../netspective-studios/design-system/components/table/Table';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslate, Title } from 'react-admin';

import LinkToRelatedCustomers from './LinkToRelatedCustomers';
import segments from './data';

const useStyles = makeStyles({
    root: {
        marginTop: 16,
    },
    cardBody: {
        margin: 0,
        padding: 0,
    },
});

const Segments: FC = () => {
    const translate = useTranslate();
    const classes = useStyles();

    const columns = [
        {
            key: 'name',
            property: 'name',
            label: translate('resources.segments.fields.name'),
        },
        {
            key: 'name',
            property: 'id',
            label: '',
            render: (text: any) => <LinkToRelatedCustomers segment={text} />,
        },
    ];

    const dataSource = segments.map(segment => ({
        id: segment.id,
        name: translate(segment.name),
    }));

    return (
        <Card
            className={classes.root}
            hasNoHeader
            bodyClassName={classes.cardBody}
        >
            <Title
                title={translate('resources.segments.name', { smart_count: 2 })}
            />
            <DataTable columns={columns} dataSource={dataSource} />
        </Card>
    );
};

export default Segments;
