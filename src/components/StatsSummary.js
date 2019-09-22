import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getStats } from "../redux/actions/dataActions";

const StatsSummary = props => {
    useEffect(() => {
        props.getStats();
    }, []);

    return <p>Hi from stats</p>;
};

const mapStateToProps = state => ({
    stats: state.data.stats
});

const mapActionsToProps = {
    getStats
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(StatsSummary);
