import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import clsx from "clsx";
import relativeTime from "dayjs/plugin/relativeTime";

import { makeStyles } from "@material-ui/core/styles";
import {
    Card,
    CardContent,
    CardHeader,
    Avatar,
    IconButton,
    Typography,
    CardActions,
    Collapse,
    Button,
    Container
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DeleteIcon from "@material-ui/icons/Delete";
import InfoIcon from "@material-ui/icons/Info";

dayjs.extend(relativeTime);

const useStyles = makeStyles(theme => ({
    card: {
        marginBottom: 10
    },
    avatar: {
        width: 30,
        height: 30
    },
    aliveIndicator: {
        backgroundColor: "green",
        width: 10,
        height: 10
    },
    deadIndicator: {
        backgroundColor: "red",
        width: 10,
        height: 10
    },
    expand: {
        transform: "rotate(0deg)",
        marginLeft: "auto",
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest
        })
    },
    expandOpen: {
        transform: "rotate(180deg)"
    },
    actionButtons: {
        display: "flex",
        justifyContent: "space-between",
        marginLeft: 0,
        width: "40%"
    },
    cardActions: {
        display: "flex"
    }
}));

const AnimalSummary = ({ animal }) => {
    const classes = useStyles();
    const {
        code,
        dateOfBirth,
        mother,
        isAlive,
        createdAt,
        userHandle,
        userImage,
        points,
        notes,
        sex
    } = animal;

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleDelete = code => {
        console.log(`Delete animal ${code}`);
    };

    return (
        <Card className={classes.card}>
            <CardHeader
                disableTypography
                avatar={
                    <Avatar
                        aria-label="user"
                        sizes="small"
                        className={
                            isAlive
                                ? classes.aliveIndicator
                                : classes.deadIndicator
                        }
                    />
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={
                    <Typography variant="subtitle1" color="textPrimary">
                        {code}
                    </Typography>
                }
                subheader={
                    <Typography variant="subtitle1" color="textSecondary">
                        Date of Birth: {dayjs(dateOfBirth).format("DD/MM/YY")}
                    </Typography>
                }
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary">
                    Mother: {mother.code ? mother.code : "-"}
                </Typography>
            </CardContent>
            <CardActions disableSpacing className={classes.cardActions}>
                <Container className={classes.actionButtons}>
                    <IconButton
                        aria-label="details"
                        color="primary"
                        component={Link}
                        to={`/animals/${code}`}
                    >
                        <InfoIcon />
                    </IconButton>
                    <IconButton
                        aria-label="delete"
                        color="secondary"
                        onClick={() => handleDelete(code)}
                    >
                        <DeleteIcon />
                    </IconButton>
                </Container>
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography variant="subtitle2">Created by:</Typography>
                    <Typography variant="body2" component="div">
                        <Avatar
                            aria-label="user"
                            sizes="small"
                            className={classes.avatar}
                            src={userImage}
                        />
                        {userHandle}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                        {dayjs(createdAt).fromNow()}
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
};

export default AnimalSummary;
