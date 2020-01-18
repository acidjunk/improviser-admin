import React, { Component } from "react";
import { GET_LIST, GET_MANY, Responsive, withDataProvider } from "react-admin";
import { connect } from "react-redux";
import compose from "recompose/compose";

import NewExercises from "./NewExercises";
import NewRiffs from "./NewRiffs";
import NewUsers from "./NewUsers";

const styles = {
    flex: { display: "flex" },
    flexListItem: { display: "flex", marginTop: "2em" },
    flexColumn: { display: "flex", flexDirection: "column" },
    leftCol: { flex: 1, marginRight: "1em" },
    rightCol: { flex: 1, marginLeft: "1em" },
    singleCol: { marginTop: "2em", marginBottom: "2em" }
};

class Dashboard extends Component {
    state = {};

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps) {
        // handle refresh
        if (this.props.version !== prevProps.version) {
            this.fetchData();
        }
    }

    fetchData() {
        this.fetchRiffs();
        this.fetchExercises();
        this.fetchUsers();
    }

    async fetchExercises() {
        const { dataProvider } = this.props;
        const aMonthAgo = new Date();
        aMonthAgo.setDate(aMonthAgo.getDate() - 30);
        const { data: newExercises } = await dataProvider(GET_LIST, "exercises", {
            filter: {
                // has_ordered: true,
                // created_at_gte: aMonthAgo.toISOString(),
            },
            sort: { field: "created_at", order: "DESC" },
            pagination: { page: 1, perPage: 10 }
        });
        this.setState({
            newExercises,
            nbNewExercises: newExercises.reduce(nb => ++nb, 0)
        });
    }

    async fetchRiffs() {
        const { dataProvider } = this.props;
        const aMonthAgo = new Date();
        aMonthAgo.setDate(aMonthAgo.getDate() - 30);
        const { data: newRiffs } = await dataProvider(GET_LIST, "riffs", {
            filter: {
                // created_at_gte: aMonthAgo.toISOString(),
            },
            sort: { field: "created_at", order: "DESC" },
            pagination: { page: 1, perPage: 10 }
        });
        this.setState({
            newRiffs,
            nbNewRiffs: newRiffs.reduce(nb => ++nb, 0)
        });
    }

    async fetchUsers() {
        const { dataProvider } = this.props;
        const aMonthAgo = new Date();
        aMonthAgo.setDate(aMonthAgo.getDate() - 30);
        const { data: newUsers } = await dataProvider(GET_LIST, "users", {
            filter: {
                // created_at_gte: aMonthAgo.toISOString()
            },
            sort: { field: "created_at", order: "DESC" },
            pagination: { page: 1, perPage: 10 }
        });
        this.setState({
            newUsers,
            nbNewUsers: newUsers.reduce(nb => ++nb, 0)
        });
    }

    render() {
        const { nbNewRiffs, newRiffs, nbNewExercises, newExercises, nbNewUsers, newUsers } = this.state;

        return (
            <Responsive
                xsmall={
                    <div>
                        <div style={styles.flexColumn}>
                            <div style={styles.flex}>
                                <NewRiffs nb={nbNewRiffs} riffs={newRiffs} />
                            </div>
                            <div style={styles.singleCol}>
                                <NewExercises nb={nbNewExercises} exercises={newExercises} />
                            </div>
                            <div style={styles.singleCol}>
                                <NewUsers nb={nbNewUsers} users={newUsers} />
                            </div>
                        </div>
                    </div>
                }
                small={
                    <div style={styles.flexColumn}>
                        <div style={styles.flex}>
                            <NewRiffs nb={nbNewRiffs} riffs={newRiffs} />
                            <NewExercises nb={nbNewExercises} exercises={newExercises} />
                        </div>
                        <div style={styles.singleCol}>
                            <NewUsers nb={nbNewUsers} users={newUsers} />
                        </div>
                    </div>
                }
                medium={
                    <div style={styles.flex}>
                        <div style={styles.leftCol}>
                            <div style={styles.flex}>
                                <NewRiffs nb={nbNewRiffs} riffs={newRiffs} />
                            </div>
                        </div>
                        <div style={styles.rightCol}>
                            <div style={styles.flex}>
                                <NewExercises nb={nbNewExercises} exercises={newExercises} />
                            </div>
                            <div style={styles.singleCol}>
                                <NewUsers nb={nbNewUsers} users={newUsers} />
                            </div>
                        </div>
                    </div>
                }
            />
        );
    }
}

const mapStateToProps = state => ({
    version: state.admin.ui.viewVersion
});

export default compose(connect(mapStateToProps), withDataProvider)(Dashboard);
