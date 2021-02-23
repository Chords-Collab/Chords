import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import './SidebarOption.css';

class Channel extends Component {

    selectChannel = () => {
        const { history, title, id } = this.props;
        if (id) {
            history.push(`/room/${id}`);
        } else {
            history.push(title);
        }
    };

    render() {
        return (
            <div className='sidebarOption'>
                <h3 className="sidebarOption__channel">
                    <span className="sidebarOption__hash" onClick={this.selectChannel}># {this.props.title}</span>
                    <IconButton
                        className={"sidebarOption__deleteIcon"}
                        size={"small"}
                        aria-label="delete" id={this.props.id} onClick={(event) => this.props.deleteChannel(event)}>
                        <DeleteIcon />
                    </IconButton>
                </h3>
            </div>
        )
    }
}

export default withRouter(Channel);