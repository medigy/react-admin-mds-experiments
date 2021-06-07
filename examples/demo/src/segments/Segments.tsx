import * as React from 'react';
import { FC } from 'react';
import Card from '../netspective-studios/design-system/components/card/Card';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
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
    return (
        <Card
            className={classes.root}
            hasNoHeader
            bodyClassName={classes.cardBody}
        >
            <Title
                title={translate('resources.segments.name', { smart_count: 2 })}
            />
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>
                            {translate('resources.segments.fields.name')}
                        </TableCell>
                        <TableCell />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {segments.map(segment => (
                        <TableRow key={segment.id}>
                            <TableCell>{translate(segment.name)}</TableCell>
                            <TableCell>
                                <LinkToRelatedCustomers segment={segment.id} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Card>
    );
};

export default Segments;
