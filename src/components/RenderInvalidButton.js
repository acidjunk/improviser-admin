import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { showNotification as showNotificationAction } from "react-admin";
import { UPDATE } from "react-admin";
import { connect } from "react-redux";
import { push as pushAction } from "react-router-redux";

import { uploadDataProvider } from "../dataProvider";

class RenderInvalidButton extends Component {
    handleClick = () => {
        const { push, record, showNotification } = this.props;
        const updatedRecord = { ...record, render_valid: !record.render_valid };
        uploadDataProvider(UPDATE, "riffs", { id: record.id, data: updatedRecord })
            .then(() => {
                showNotification("Riff render status toggled");
                push("/riffs");
            })
            .catch(e => {
                console.error(e);
                showNotification("Error: riff update failed", "warning");
            });
    };

    render() {
        return <Button onClick={this.handleClick}>Toggle render status</Button>;
    }
}

RenderInvalidButton.propTypes = {
    push: PropTypes.func,
    record: PropTypes.object,
    showNotification: PropTypes.func
};

export default connect(null, {
    showNotification: showNotificationAction,
    push: pushAction
})(RenderInvalidButton);
