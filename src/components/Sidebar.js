// --- Imports --- //
import React, { useEffect } from "react";
import { connect } from "react-redux";

// --- Material Ui Imports --- //
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import makeStyles from "@material-ui/core/styles/makeStyles";

// --- Custom Component Import --- //
import ExpandableListItem from "./ExpandableListItem";

// --- Store Imports --- //
import { actions, operations } from "../store";

const drawerWidth = 250
// --- Styles --- //
const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  }
}));

// -- setting up state --- /

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    colors: state.colors,
    sets: state.sets
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    initSets: () => {
      dispatch(operations.fetchSets());
    },
    fetchSet: url => {
      dispatch(operations.fetchSet(url))
    }
  };
};

function Sidebar(props) {
  const classes = useStyles(props);
  useEffect(() => {
    if (props.sets.length === 0) {
      props.initSets();
    }
  });
  return (
    <Drawer
    open={props.open}
    onClose={props.closeDrawer}
      className={classes.drawer}
      // variant="permanent"
      classes={{
        paper: classes.drawerPaper
      }}
      // anchor="left"
    >
      <Box className={classes.toolbar} display="flex"  alignItems="center" p={2}>
        <Typography variant="h5">Application Name</Typography>
      </Box>
      <Divider />
      <List>
        <ListItem button>
          <ListItemText>Dashboard</ListItemText>
        </ListItem>
        <ExpandableListItem primary="Color">
          {props.colors.map(color => {
            return (
              <ListItem button key={color}>
                <ListItemText primary={color} />
              </ListItem>
            );
          })}
        </ExpandableListItem>
        <ExpandableListItem primary="Sets">
          {Object.keys(props.sets).map(key => {
            // if only one block in the set.
            if (props.sets[key].sets.length === 1) {
              return (
                <ListItem button key={key} onClick={() => props.fetchSet(props.sets[key].sets[0].search_uri)}>
                  <ListItemText primary={props.sets[key].name} />
                </ListItem>
              );
            } else {
              return (
                <ExpandableListItem primary={props.sets[key].name} key={key}>
                  {props.sets[key].sets.map(set => {
                    return (
                      <ListItem button key={set.code} onClick={() => props.fetchSet(set.search_uri)}>
                        <ListItemText primary={set.name} />
                      </ListItem>
                    );
                  })}
                </ExpandableListItem>
              );
            }
          })}
        </ExpandableListItem>
      </List>
    </Drawer>
  );
}

// --- Exports --- //
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar);
