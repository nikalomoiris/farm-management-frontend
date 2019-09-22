import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { getAnimals } from "../redux/actions/dataActions";

import AnimalSummary from "../components/AnimalSummary";
import StatsSummary from "../components/StatsSummary";

const Home = props => {
    useEffect(() => {
        props.getAnimals();
    }, []);

    let AnimalsMarkup = props.animals ? (
        props.animals.map(animal => (
            <AnimalSummary key={animal.code} animal={animal} />
        ))
    ) : (
        <p>Loading...</p>
    );

    return (
        <Grid container spacing={4}>
            <Grid item sm={8} xs={12}>
                {AnimalsMarkup}
            </Grid>
            <Grid item sm={4} xs={12}>
                <StatsSummary />
            </Grid>
        </Grid>
    );
};

const mapStateToProps = state => ({
    animals: state.data.animals
});

const mapActionsToProps = {
    getAnimals
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(Home);
