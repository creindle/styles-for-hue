import React, { Component } from 'react';
import ListItem from './ListItem';

class ListComp extends Component {
  render() {
    const listArray = this.props.list.map((listItem, index) => {
      return (
        <ListItem
          key={listItem.elementId}
          elementId={listItem.elementId}
          style={listItem.style}
          selectElement={this.props.selectElement}
          selectedElementId={this.props.selectedElementId}
        >
        </ListItem>
      )
    })
    return (
      <ul
        className={`listComp${this.props.elementId}`}
      >
        {listArray}
      </ul>
    )
  }
}

export default ListComp;