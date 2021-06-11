import React from 'react';
import DataTable from '@salesforce/design-system-react/components/data-table';
import DataTableCell from '@salesforce/design-system-react/components/data-table/cell';
import DataTableColumn from '@salesforce/design-system-react/components/data-table/column';

const CustomTableCell: React.FC = (props: any) => <DataTableCell {...props} />;

const CustomDataTableCell = (props: any) => (
    <DataTableCell {...props}>
        {props.render(props.children, props.item)}
    </DataTableCell>
);

CustomDataTableCell.displayName = CustomTableCell.displayName;

const Table = (props: any) => {
    if (props.dataSource && props.columns?.length) {
        const columns = props.columns.map((item: any) => {
            if (item.render) {
                return (
                    <DataTableColumn
                        key={item.key}
                        label={item.label}
                        property={item.property}
                    >
                        <CustomDataTableCell
                            render={item.render}
                            item={item}
                            property={item.property}
                        />
                    </DataTableColumn>
                );
            }
            return (
                <DataTableColumn
                    key={item.key}
                    label={item.label}
                    property={item.property}
                />
            );
        });
        return (
            <DataTable
                items={props.dataSource}
                id="DataTableExample-1-default"
                {...props}
            >
                {columns}
            </DataTable>
        );
    }

    return null;
};

export default Table;
