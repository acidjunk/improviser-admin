import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { translate } from "react-admin";
import { Link } from "react-router-dom";
import { compose } from "redux";

import { RiffIcon } from "../Riffs";
import CardIcon from "./CardIcon";

const styles = theme => ({
    main: {
        flex: "1",
        marginLeft: "1em",
        marginTop: 20
    },
    card: {
        padding: "16px 0",
        overflow: "inherit",
        textAlign: "right"
    },
    title: {
        padding: "0 16px"
    },
    value: {
        padding: "0 16px",
        minHeight: 48
    },
    avatar: {
        background: theme.palette.background.avatar
    },
    listItemText: {
        paddingRight: 0
    },
    inline: {
        display: "inline"
    }
});

const NewRiffs = ({ riffs = [], nb, translate, classes }) => (
    <div className={classes.main}>
        <CardIcon Icon={RiffIcon} bgColor="#4caf50" />
        <Card className={classes.card}>
            <Typography className={classes.title} color="textSecondary">
                {translate("pos.dashboard.new_riffs")}
            </Typography>
            <Typography variant="headline" component="h2" className={classes.value}>
                {nb}
            </Typography>
            <Divider />
            <List>
                {riffs.map(record => (
                    <React.Fragment key={record.id}>
                        <ListItem button to={`/riffs/${record.id}`} component={Link} key={record.id}>
                            <ListItemText
                                primary={`${record.name}`}
                                secondary={
                                    <div>
                                        <React.Fragment>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                className={classes.inline}
                                                color="textPrimary"
                                            >
                                                {`${record.created_at} - ${record.number_of_bars} bars`}
                                            </Typography>
                                        </React.Fragment>
                                        <div>
                                            <img alt={`riff-${record.name}`} src={record.image} />
                                        </div>
                                    </div>
                                }
                                className={classes.listItemText}
                            />
                        </ListItem>
                        <Divider />
                    </React.Fragment>
                ))}
            </List>
        </Card>
    </div>
);

const enhance = compose(withStyles(styles), translate);

export default enhance(NewRiffs);
