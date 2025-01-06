import { DeleteOutlined } from '@ant-design/icons';
import { Button, Popover } from 'antd';
import React from 'react';
import { IDeleteButtonProps } from '../../../@types/components/atoms/IDeleteButtonProps';

const DeleteButton: React.FC<IDeleteButtonProps> = (props) => {
    return (
        <Popover
            content={
                <a style={{ marginRight: 20 }} onClick={(e) => props.delete(e)}>Delete</a>
            }
            title="Are you sure?"
            trigger="click"
        >
            <Button {...props} type='dashed' style={{
                background: 'red',
                color: 'white',
                height: 26,
                border: '1px dashed red',
                borderRadius: 0,
                position: 'absolute',
                right: 0

            }}>
                <DeleteOutlined />
            </Button >
        </Popover >

    )
}
export default DeleteButton;