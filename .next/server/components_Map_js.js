exports.id = "components_Map_js";
exports.ids = ["components_Map_js"];
exports.modules = {

/***/ "./components/Map.js":
/*!***************************!*\
  !*** ./components/Map.js ***!
  \***************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__) => {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_leaflet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-leaflet */ "react-leaflet");
/* harmony import */ var leaflet_dist_leaflet_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! leaflet/dist/leaflet.css */ "./node_modules/leaflet/dist/leaflet.css");
/* harmony import */ var leaflet_dist_leaflet_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(leaflet_dist_leaflet_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! leaflet */ "leaflet");
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([react_leaflet__WEBPACK_IMPORTED_MODULE_0__]);
react_leaflet__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? await __webpack_async_dependencies__ : __webpack_async_dependencies__)[0];
var _jsxFileName = "C:\\Users\\Usuario\\Desktop\\taputapu-app\\components\\Map.js";
// File: components/Map.js


 // This part fixes the marker icon issue


delete (leaflet__WEBPACK_IMPORTED_MODULE_2___default().Icon.Default.prototype._getIconUrl);
leaflet__WEBPACK_IMPORTED_MODULE_2___default().Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png'
});

function Map({
  location
}) {
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(react_leaflet__WEBPACK_IMPORTED_MODULE_0__.MapContainer, {
    center: location,
    zoom: 13,
    style: {
      height: '100vh',
      width: '100%'
    },
    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(react_leaflet__WEBPACK_IMPORTED_MODULE_0__.TileLayer, {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution: "\uFFFD <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 18,
      columnNumber: 7
    }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(react_leaflet__WEBPACK_IMPORTED_MODULE_0__.Marker, {
      position: location,
      children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(react_leaflet__WEBPACK_IMPORTED_MODULE_0__.Popup, {
        children: "You are here!"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 23,
        columnNumber: 9
      }, this)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 22,
      columnNumber: 7
    }, this)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 17,
    columnNumber: 5
  }, this);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Map);
});

/***/ }),

/***/ "./node_modules/leaflet/dist/leaflet.css":
/*!***********************************************!*\
  !*** ./node_modules/leaflet/dist/leaflet.css ***!
  \***********************************************/
/***/ (() => {



/***/ })

};
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50c19NYXBfanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUVBO0FBQ0E7Q0FHQTs7O0FBQ0EsT0FBT0ksbUZBQVA7QUFDQUEsd0VBQUEsQ0FBNEI7QUFDeEJNLEVBQUFBLGFBQWEsRUFBRSxnRUFEUztBQUV4QkMsRUFBQUEsT0FBTyxFQUFFLDZEQUZlO0FBR3hCQyxFQUFBQSxTQUFTLEVBQUU7QUFIYSxDQUE1Qjs7QUFNQSxTQUFTQyxHQUFULENBQWE7QUFBRUMsRUFBQUE7QUFBRixDQUFiLEVBQTJCO0FBQ3pCLHNCQUNFLDhEQUFDLHVEQUFEO0FBQWMsVUFBTSxFQUFFQSxRQUF0QjtBQUFnQyxRQUFJLEVBQUUsRUFBdEM7QUFBMEMsU0FBSyxFQUFFO0FBQUVDLE1BQUFBLE1BQU0sRUFBRSxPQUFWO0FBQW1CQyxNQUFBQSxLQUFLLEVBQUU7QUFBMUIsS0FBakQ7QUFBQSw0QkFDRSw4REFBQyxvREFBRDtBQUNFLFNBQUcsRUFBQyxvREFETjtBQUVFLGlCQUFXLEVBQUM7QUFGZDtBQUFBO0FBQUE7QUFBQTtBQUFBLFlBREYsZUFLRSw4REFBQyxpREFBRDtBQUFRLGNBQVEsRUFBRUYsUUFBbEI7QUFBQSw2QkFDRSw4REFBQyxnREFBRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURGO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFMRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsVUFERjtBQWFEOztBQUVELGlFQUFlRCxHQUFmIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdGFwdXRhcHUtYXBwLy4vY29tcG9uZW50cy9NYXAuanMiLCJ3ZWJwYWNrOi8vdGFwdXRhcHUtYXBwLy4vbm9kZV9tb2R1bGVzL2xlYWZsZXQvZGlzdC9sZWFmbGV0LmNzcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBGaWxlOiBjb21wb25lbnRzL01hcC5qc1xyXG5cclxuaW1wb3J0IHsgTWFwQ29udGFpbmVyLCBUaWxlTGF5ZXIsIE1hcmtlciwgUG9wdXAgfSBmcm9tICdyZWFjdC1sZWFmbGV0JztcclxuaW1wb3J0ICdsZWFmbGV0L2Rpc3QvbGVhZmxldC5jc3MnO1xyXG5pbXBvcnQgTCBmcm9tICdsZWFmbGV0JztcclxuXHJcbi8vIFRoaXMgcGFydCBmaXhlcyB0aGUgbWFya2VyIGljb24gaXNzdWVcclxuZGVsZXRlIEwuSWNvbi5EZWZhdWx0LnByb3RvdHlwZS5fZ2V0SWNvblVybDtcclxuTC5JY29uLkRlZmF1bHQubWVyZ2VPcHRpb25zKHtcclxuICAgIGljb25SZXRpbmFVcmw6ICdodHRwczovL3VucGtnLmNvbS9sZWFmbGV0QDEuNy4xL2Rpc3QvaW1hZ2VzL21hcmtlci1pY29uLTJ4LnBuZycsXHJcbiAgICBpY29uVXJsOiAnaHR0cHM6Ly91bnBrZy5jb20vbGVhZmxldEAxLjcuMS9kaXN0L2ltYWdlcy9tYXJrZXItaWNvbi5wbmcnLFxyXG4gICAgc2hhZG93VXJsOiAnaHR0cHM6Ly91bnBrZy5jb20vbGVhZmxldEAxLjcuMS9kaXN0L2ltYWdlcy9tYXJrZXItc2hhZG93LnBuZycsXHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gTWFwKHsgbG9jYXRpb24gfSkge1xyXG4gIHJldHVybiAoXHJcbiAgICA8TWFwQ29udGFpbmVyIGNlbnRlcj17bG9jYXRpb259IHpvb209ezEzfSBzdHlsZT17eyBoZWlnaHQ6ICcxMDB2aCcsIHdpZHRoOiAnMTAwJScgfX0+XHJcbiAgICAgIDxUaWxlTGF5ZXJcclxuICAgICAgICB1cmw9XCJodHRwczovL3tzfS50aWxlLm9wZW5zdHJlZXRtYXAub3JnL3t6fS97eH0ve3l9LnBuZ1wiXHJcbiAgICAgICAgYXR0cmlidXRpb249J++/vSA8YSBocmVmPVwiaHR0cHM6Ly93d3cub3BlbnN0cmVldG1hcC5vcmcvY29weXJpZ2h0XCI+T3BlblN0cmVldE1hcDwvYT4gY29udHJpYnV0b3JzJ1xyXG4gICAgICAvPlxyXG4gICAgICA8TWFya2VyIHBvc2l0aW9uPXtsb2NhdGlvbn0+XHJcbiAgICAgICAgPFBvcHVwPlxyXG4gICAgICAgICAgWW91IGFyZSBoZXJlIVxyXG4gICAgICAgIDwvUG9wdXA+XHJcbiAgICAgIDwvTWFya2VyPlxyXG4gICAgPC9NYXBDb250YWluZXI+XHJcbiAgKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTWFwOyIsIiJdLCJuYW1lcyI6WyJNYXBDb250YWluZXIiLCJUaWxlTGF5ZXIiLCJNYXJrZXIiLCJQb3B1cCIsIkwiLCJJY29uIiwiRGVmYXVsdCIsInByb3RvdHlwZSIsIl9nZXRJY29uVXJsIiwibWVyZ2VPcHRpb25zIiwiaWNvblJldGluYVVybCIsImljb25VcmwiLCJzaGFkb3dVcmwiLCJNYXAiLCJsb2NhdGlvbiIsImhlaWdodCIsIndpZHRoIl0sInNvdXJjZVJvb3QiOiIifQ==