import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { showNotification as showNotificationAction } from "react-admin";
import { UPDATE } from "react-admin";
import { connect } from "react-redux";
import { push as pushAction } from "react-router-redux";

import { uploadDataProvider } from "../dataProvider";

class RenderToggleApproveButton extends Component {
    handleClick = () => {
        const { push, record, showNotification } = this.props;
        const updatedRecord = { ...record, approved: !record.approved };
        uploadDataProvider(UPDATE, "backing-tracks", { id: record.id, data: updatedRecord })
            .then(() => {
                showNotification("Approve status toggled");
                push("/backing-tracks");
            })
            .catch(e => {
                console.error(e);
                showNotification("Error: backing-track update failed", "warning");
            });
    };

    render() {
        const { record } = this.props;
        return (
            <Button color="primary" size="small" variant="contained" onClick={this.handleClick}>
                {record.approved ? "stop" : "approve"}
            </Button>
        );
    }
}

RenderToggleApproveButton.propTypes = {
    push: PropTypes.func,
    record: PropTypes.object,
    showNotification: PropTypes.func
};

export default connect(null, {
    showNotification: showNotificationAction,
    push: pushAction
})(RenderToggleApproveButton);
