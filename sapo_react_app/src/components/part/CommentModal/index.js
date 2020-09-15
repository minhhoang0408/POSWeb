import React from 'react'
import CResponse from '../../pieces/AddResponseForm'
import {Button} from '@material-ui/core';
import CommentIcon from '@material-ui/icons/Comment';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import Tooltip from "@material-ui/core/Tooltip";

export default function CommentModal() {

    const [open, setOpen] = React.useState(0);

    const handleClick = (e) => {
        e.preventDefault()
        setOpen(open === 1 ? 0 : 1)
    }


    return (
        <List
            component="nav"
            aria-labelledby="nested-list-subheader"
        >
            <ListItem button onClick={handleClick}>
                <Tooltip title="Thêm phản hồi khách hàng" arrow>
                <Button
                    variant="contained"
                    color="primary"
                    style={{ position: "relative",width:"100%" }} >
                    <CommentIcon style={{ width: "30px", height: "30px" }} />
                </Button>
                </Tooltip>
            </ListItem>
            <Collapse in={open === 1} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <CResponse />
                </List>
            </Collapse>
        </List>
    )
}