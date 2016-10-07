import React, { Component } from 'react';
import { FontMenu, ColorMenu } from '../components';

class Edit extends Component {
  constructor (props) {
    super(props);
  }

  saveStyle(doc){
    $.ajax({
      url: '/update',
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({doc: doc}),
    });
  }

  exportAsCSSFile() {
    var incomingString = 'background-color: red; font-family: arial; display: inline-block;';

    var lineBreaks = incomingString.replace(/; /g, ';\n  ');
    var initialBracket = '{ \n  ';
    var endBracket = '\n}';
    var initialSCSS = initialBracket.concat(lineBreaks);
    var finishedSCSS = initialSCSS.concat(endBracket);

    console.log(finishedSCSS);
  }

  render() {
    return (
      <div
        className="editColumn"
      >
        <h1> Edit </h1>
        <FontMenu
          fontList={this.props.fontList}
          selectedElement={this.props.selectedElement}
          changeFont={this.props.changeFont}
        />
        <ColorMenu
          colorPalette={this.props.colorPalette}
          selectedElement={this.props.selectedElement}
          changeColor={this.props.changeColor}
        />
        <div>
          <button
            className="save"
            type="button"
            onClick={this.saveStyle(this.props.elements)}
          >
            Save Template
          </button>
        </div>
        <div>
          <button
            className="export-as-css-file"
            type="button"
            onClick={this.exportAsCSSFile}
          >
            Export As CSS File
          </button>
        </div>
      </div>
    )
  }
}

export default Edit;