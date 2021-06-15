import * as React from 'react';
import { FC } from 'react';
import Avatar from '../netspective-studios/design-system/components/avatar/Avatar';
import { FieldProps } from 'react-admin';
import { Customer } from '../types';

interface Props extends FieldProps<Customer> {
    className?: string;
    size?: string;
}

const AvatarField: FC<Props> = ({ record, size = '25', className }) =>
    record ? (
        <Avatar
            src={`${record.avatar}?size=${size}x${size}`}
            variant="user"
            // record={record}
            size="small"
            // style={{
            //     width: parseInt(size, 10),
            //     height: parseInt(size, 10),
            //     marginRight: 5,
            // }}
            // className={className}
        />
    ) : null;

export default AvatarField;
