// --- Imports --- //
import React, { useEffect } from "react";
import { connect } from "react-redux";

// --- Material Ui Imports --- //
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import ExpandableListItem from "./ExpandableListItem";

import makeStyles from "@material-ui/core/styles/makeStyles";
import { Collapse } from "@material-ui/core";

// --- Store Imports --- //
import { actions } from "../store";

// --- Styles --- //
const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  toolbar: theme.mixins.toolbar,
  treeview: {
    maxHeight: 250
  }
}));

// -- setting up state --- /

const mapStateToProps = (state, ownProps) => {
  console.log(state);
  return {
    ...ownProps,
    colors: state.colors,
    sets: state.sets
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    initSets: () => {
      dispatch(actions.fetchSets());
    }
  };
};

function Sidebar(props) {
  const classes = useStyles();
  useEffect(() => {
    console.log("useEffect");
    props.initSets();
  });
  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper
      }}
    >
      <div className={classes.toolbar} />
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
          {props.sets.map(set => {
            return (
              <ListItem button key={set.id}>
                <ListItemText primary={set.name} />
              </ListItem>
            );
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
