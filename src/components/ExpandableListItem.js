// --- Import --- //
import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

// --- Material Ui Imports --- //
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import makeStyles from "@material-ui/core/styles/makeStyles";

// --- Expandable List Content Styles --- //
const expandableListContentStyles = makeStyles(theme => ({
  nestedItem: {
    // paddingLeft: theme.spacing(4),
    // maxHeight: '100%',
    // overflowY: 'scroll'
  }
}));

function ExpandableListContent(props) {
  const classes = expandableListContentStyles();

  const { classNames, expand, children, ...other } = props;

  return (
    <Collapse in={expand} timeout="auto" unmountOnExit>
      <List
        component="div"
        disablePadding
        className={clsx(classes.nestedItem, classNames)}
        {...other}
      >
        {children}
      </List>
    </Collapse>
  );
}

// --- Expandable Styles --- //
const expandableStyles = makeStyles(theme => ({
  listItemIcon: {
    minWidth: 0,
    marginRight: theme.spacing(1)
  },
  nestedList: {
    // paddingLeft: theme.spacing(2),

  }
}));
function ExpandableListItem(props) {
  const [expand, setExpand] = useState(false);
  const classes = expandableStyles();

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
      <ExpandableListContent expand={expand}>
          {children}
        </ExpandableListContent>
    </React.Fragment>
  );
}

// --- Defining Props --- //
ExpandableListItem.propTypes = {
  /**
   * properties to be applied to the list components
   */
  ListProps: PropTypes.object
};

// --- Exports --- //
export default ExpandableListItem;
