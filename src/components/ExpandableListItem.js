// --- Import --- //
import React, { useState } from "react";

// --- Material Ui Imports --- //
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import makeStyles from "@material-ui/core/styles/makeStyles";

// --- Styles --- //
const useStyles = makeStyles(theme => ({
  listItemIcon: {
    minWidth: 0,
    marginRight: theme.spacing(1)
  },
  nestedList: {
    // paddingLeft: theme.spacing(2)
  },
  nestedItem: {
    paddingLeft: theme.spacing(8)
  }
}));

function ExpandableListItem(props) {
  const [expand, setExpand] = useState(false);
  const classes = useStyles();

  const children = React.Children.map(props.children, child =>
    React.cloneElement(child, { className: classes.nestedItem })
  );

  return (
    <React.Fragment>
      <ListItem component="div">
        <ListItemIcon
          onClick={() => setExpand(!expand)}
          className={classes.listItemIcon}
        >
          {expand ? <ChevronRightIcon /> : <ExpandMoreIcon />}
        </ListItemIcon>
        <ListItemText primary={props.primary} secondary={props.secondary} />
      </ListItem>
      <Collapse in={expand} timeout="auto" unmountOnExit>
        <List component="div" disablePadding className={classes.nestedList}>
          {children}
        </List>
      </Collapse>
    </React.Fragment>
  );
}

// --- Exports --- //
export default ExpandableListItem;
