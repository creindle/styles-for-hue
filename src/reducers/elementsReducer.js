const initialState = {
  doc: {
    _id: null,
    elements: {
      divTags: [],
      pTags: [],
      imgTags: [],
      ulTags: []
    }
  },
  selectedElement: {
    selectedElementId: 0,
    selectedStyle: {}
  }
};

const reducer = (state = initialState, action) => {
  let newElems = { ...state.doc.elements};
  let selectedElement = { ...state.selectedElement};
  switch (action.type) {
    case "SET_ELEMENTS":
      return {...state, doc: action.data.doc};
    case "SELECT_ELEMENT":
        // return runThroughElems(state, newElems, selectedElement, action.data.elementId);
      for (let element in newElems) {
        newElems[element] = newElems[element].map((elem, index) => {
          if (elem.elementId === action.data.elementId) {
            selectedElement = { selectedElementId: elem.elementId, selectedStyle: elem.style };
            return { ...elem};
          }
          if (elem.subType) {
            for (let children in elem.subType) {
              elem.subType[children] = elem.subType[children].map((child, index) => {
                if (child.elementId === action.data.elementId) {
                  selectedElement = { selectedElementId: child.elementId, selectedStyle: child.style };
                  return { ...child};
                }
                return { ...child}
              })
            }
          }
          return { ...elem};
        })
      }
      return { ...state, selectedElement: selectedElement};

    case "CHANGE_COLOR":
      for (let element in newElems) {
        newElems[element] = newElems[element].map((elem, index) => {
          if (elem.elementId === action.data.elementId) {
            return { ...elem, style: { ...elem.style, backgroundColor: action.data.backgroundColor}};
          }
          if (elem.subType) {
            for (let children in elem.subType) {
              elem.subType[children] = elem.subType[children].map((child, index) => {
                if (child.elementId === action.data.elementId) {
                  return { ...child, style: { ...child.style, backgroundColor: action.data.backgroundColor}};
                }
                return { ...child};
              })
            }
          }
          return { ...elem};
        });
      }
      return { ...state, doc: { ...state.doc, elements: newElems} };
    case "CHANGE_FONT":
      for (let element in newElems) {
        newElems[element] = newElems[element].map((elem, index) => {
          if (elem.elementId === action.data.elementId) {
            return { ...elem, style: { ...elem.style, fontFamily: action.data.fontFamily}};
          }
          if (elem.subType) {
            for (let children in elem.subType) {
              elem.subType[children] = elem.subType[children].map((child, index) => {
                if (child.elementId === action.data.elementId) {
                  return { ...child, style: { ...child.style, fontFamily: action.data.fontFamily}};
                }
                return { ...child};
              })
            }
          }
          return { ...elem};
        });
      }
      return { ...state, doc: { ...state.doc, elements: newElems} };
    case "NEW_DOC":
      return { ...state, doc: { elements: { ...state.doc.elements }, _id: `ObjectId(${action.data})`} };
    default:
      return { ...state};
  }
}

// function runThroughElems (state, elements, selectedElement, id) {
//   for (let element in elements) {
//     elements[element] = elements[element].map((elem, index) => {
//       if (elem.elementId === id) {
//         selectedElement = { selectedElementId: elem.elementId, selectedStyle: elem.style };
//         return { ...elem};
//       }
//       if (elem.subType) {
//         console.log( {...elem});
//         console.log(runThroughElems(state, elem.subType, selectedElement, id));
//         runThroughElems(state, elem.subType, selectedElement, id);
//       }
//       return { ...elem} ;
//     })
//   }
//   console.log({ doc: {...state.doc, elements: {...state.doc.elements}}, selectedElement: selectedElement });
//   return { ...state, doc: {...state.doc}, selectedElement: selectedElement };
// }

export default reducer;