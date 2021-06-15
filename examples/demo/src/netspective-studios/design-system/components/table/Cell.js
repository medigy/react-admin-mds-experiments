import React from 'react';
import DataTableCell from '@salesforce/design-system-react/components/data-table/cell';

const CustomDataTableCell = props => (
    <DataTableCell {...props}>
        {props.render(props.children, props.item)}
    </DataTableCell>
);

CustomDataTableCell.displayName = DataTableCell.displayName;

export default CustomDataTableCell;
