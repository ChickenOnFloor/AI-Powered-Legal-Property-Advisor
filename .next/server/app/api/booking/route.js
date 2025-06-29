/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/booking/route";
exports.ids = ["app/api/booking/route"];
exports.modules = {

/***/ "(rsc)/./app/api/booking/route.js":
/*!**********************************!*\
  !*** ./app/api/booking/route.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/lib/db */ \"(rsc)/./lib/db.js\");\n/* harmony import */ var _models_booking__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/models/booking */ \"(rsc)/./models/booking.js\");\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n\n\n\nasync function POST(req) {\n    try {\n        await (0,_lib_db__WEBPACK_IMPORTED_MODULE_0__.connectToDB)();\n        const body = await req.json();\n        const { lawyerId, userName, userEmail, selectedDate, selectedTime } = body;\n        if (!lawyerId || !userName || !userEmail || !selectedDate || !selectedTime) {\n            return next_server__WEBPACK_IMPORTED_MODULE_2__.NextResponse.json({\n                message: \"Missing required fields\"\n            }, {\n                status: 400\n            });\n        }\n        const newBooking = new _models_booking__WEBPACK_IMPORTED_MODULE_1__.Booking({\n            lawyerId,\n            userName,\n            userEmail,\n            date: selectedDate,\n            time: selectedTime\n        });\n        await newBooking.save();\n        return next_server__WEBPACK_IMPORTED_MODULE_2__.NextResponse.json({\n            success: true,\n            message: \"Booking successful\"\n        });\n    } catch (error) {\n        console.error(\"Booking Error:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_2__.NextResponse.json({\n            message: \"Something went wrong\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2Jvb2tpbmcvcm91dGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFzQztBQUNJO0FBQ0E7QUFFbkMsZUFBZUcsS0FBS0MsR0FBRztJQUM1QixJQUFJO1FBQ0YsTUFBTUosb0RBQVdBO1FBRWpCLE1BQU1LLE9BQU8sTUFBTUQsSUFBSUUsSUFBSTtRQUMzQixNQUFNLEVBQUVDLFFBQVEsRUFBRUMsUUFBUSxFQUFFQyxTQUFTLEVBQUVDLFlBQVksRUFBRUMsWUFBWSxFQUFFLEdBQUdOO1FBRXRFLElBQUksQ0FBQ0UsWUFBWSxDQUFDQyxZQUFZLENBQUNDLGFBQWEsQ0FBQ0MsZ0JBQWdCLENBQUNDLGNBQWM7WUFDMUUsT0FBT1QscURBQVlBLENBQUNJLElBQUksQ0FBQztnQkFBRU0sU0FBUztZQUEwQixHQUFHO2dCQUFFQyxRQUFRO1lBQUk7UUFDakY7UUFFQSxNQUFNQyxhQUFhLElBQUliLG9EQUFPQSxDQUFDO1lBQzdCTTtZQUNBQztZQUNBQztZQUNBTSxNQUFNTDtZQUNOTSxNQUFNTDtRQUNSO1FBRUEsTUFBTUcsV0FBV0csSUFBSTtRQUVyQixPQUFPZixxREFBWUEsQ0FBQ0ksSUFBSSxDQUFDO1lBQUVZLFNBQVM7WUFBTU4sU0FBUztRQUFxQjtJQUMxRSxFQUFFLE9BQU9PLE9BQU87UUFDZEMsUUFBUUQsS0FBSyxDQUFDLGtCQUFrQkE7UUFDaEMsT0FBT2pCLHFEQUFZQSxDQUFDSSxJQUFJLENBQUM7WUFBRU0sU0FBUztRQUF1QixHQUFHO1lBQUVDLFFBQVE7UUFBSTtJQUM5RTtBQUNGIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXG11aGFtXFxEZXNrdG9wXFxBSS1Qb3dlcmVkLUxlZ2FsLVByb3BlcnR5LUFkdmlzb3ItbWFpblxcYXBwXFxhcGlcXGJvb2tpbmdcXHJvdXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvbm5lY3RUb0RCIH0gZnJvbSBcIkAvbGliL2RiXCJcclxuaW1wb3J0IHsgQm9va2luZyB9IGZyb20gXCJAL21vZGVscy9ib29raW5nXCJcclxuaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSBcIm5leHQvc2VydmVyXCJcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcSkge1xyXG4gIHRyeSB7XHJcbiAgICBhd2FpdCBjb25uZWN0VG9EQigpXHJcblxyXG4gICAgY29uc3QgYm9keSA9IGF3YWl0IHJlcS5qc29uKClcclxuICAgIGNvbnN0IHsgbGF3eWVySWQsIHVzZXJOYW1lLCB1c2VyRW1haWwsIHNlbGVjdGVkRGF0ZSwgc2VsZWN0ZWRUaW1lIH0gPSBib2R5XHJcblxyXG4gICAgaWYgKCFsYXd5ZXJJZCB8fCAhdXNlck5hbWUgfHwgIXVzZXJFbWFpbCB8fCAhc2VsZWN0ZWREYXRlIHx8ICFzZWxlY3RlZFRpbWUpIHtcclxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgbWVzc2FnZTogXCJNaXNzaW5nIHJlcXVpcmVkIGZpZWxkc1wiIH0sIHsgc3RhdHVzOiA0MDAgfSlcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBuZXdCb29raW5nID0gbmV3IEJvb2tpbmcoe1xyXG4gICAgICBsYXd5ZXJJZCxcclxuICAgICAgdXNlck5hbWUsXHJcbiAgICAgIHVzZXJFbWFpbCxcclxuICAgICAgZGF0ZTogc2VsZWN0ZWREYXRlLFxyXG4gICAgICB0aW1lOiBzZWxlY3RlZFRpbWUsXHJcbiAgICB9KVxyXG5cclxuICAgIGF3YWl0IG5ld0Jvb2tpbmcuc2F2ZSgpXHJcblxyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgbWVzc2FnZTogXCJCb29raW5nIHN1Y2Nlc3NmdWxcIiB9KVxyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKFwiQm9va2luZyBFcnJvcjpcIiwgZXJyb3IpXHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBtZXNzYWdlOiBcIlNvbWV0aGluZyB3ZW50IHdyb25nXCIgfSwgeyBzdGF0dXM6IDUwMCB9KVxyXG4gIH1cclxufVxyXG4iXSwibmFtZXMiOlsiY29ubmVjdFRvREIiLCJCb29raW5nIiwiTmV4dFJlc3BvbnNlIiwiUE9TVCIsInJlcSIsImJvZHkiLCJqc29uIiwibGF3eWVySWQiLCJ1c2VyTmFtZSIsInVzZXJFbWFpbCIsInNlbGVjdGVkRGF0ZSIsInNlbGVjdGVkVGltZSIsIm1lc3NhZ2UiLCJzdGF0dXMiLCJuZXdCb29raW5nIiwiZGF0ZSIsInRpbWUiLCJzYXZlIiwic3VjY2VzcyIsImVycm9yIiwiY29uc29sZSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/booking/route.js\n");

/***/ }),

/***/ "(rsc)/./lib/db.js":
/*!*******************!*\
  !*** ./lib/db.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   connectToDB: () => (/* binding */ connectToDB)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nlet isConnected = false;\nconst connectToDB = async ()=>{\n    if (isConnected) return;\n    try {\n        await mongoose__WEBPACK_IMPORTED_MODULE_0___default().connect(process.env.MONGODB_URI, {\n            dbName: \"legaladvisor\",\n            useNewUrlParser: true,\n            useUnifiedTopology: true\n        });\n        isConnected = true;\n        console.log(\"✅ MongoDB connected\");\n    } catch (err) {\n        console.error(\"❌ MongoDB connection error:\", err);\n    }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvZGIuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQStCO0FBRS9CLElBQUlDLGNBQWM7QUFFWCxNQUFNQyxjQUFjO0lBQ3pCLElBQUlELGFBQWE7SUFFakIsSUFBSTtRQUNGLE1BQU1ELHVEQUFnQixDQUFDSSxRQUFRQyxHQUFHLENBQUNDLFdBQVcsRUFBRTtZQUM5Q0MsUUFBUTtZQUNSQyxpQkFBaUI7WUFDakJDLG9CQUFvQjtRQUN0QjtRQUVBUixjQUFjO1FBQ2RTLFFBQVFDLEdBQUcsQ0FBQztJQUNkLEVBQUUsT0FBT0MsS0FBSztRQUNaRixRQUFRRyxLQUFLLENBQUMsK0JBQStCRDtJQUMvQztBQUNGLEVBQUMiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcbXVoYW1cXERlc2t0b3BcXEFJLVBvd2VyZWQtTGVnYWwtUHJvcGVydHktQWR2aXNvci1tYWluXFxsaWJcXGRiLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb25nb29zZSBmcm9tIFwibW9uZ29vc2VcIlxyXG5cclxubGV0IGlzQ29ubmVjdGVkID0gZmFsc2VcclxuXHJcbmV4cG9ydCBjb25zdCBjb25uZWN0VG9EQiA9IGFzeW5jICgpID0+IHtcclxuICBpZiAoaXNDb25uZWN0ZWQpIHJldHVyblxyXG5cclxuICB0cnkge1xyXG4gICAgYXdhaXQgbW9uZ29vc2UuY29ubmVjdChwcm9jZXNzLmVudi5NT05HT0RCX1VSSSwge1xyXG4gICAgICBkYk5hbWU6IFwibGVnYWxhZHZpc29yXCIsXHJcbiAgICAgIHVzZU5ld1VybFBhcnNlcjogdHJ1ZSxcclxuICAgICAgdXNlVW5pZmllZFRvcG9sb2d5OiB0cnVlLFxyXG4gICAgfSlcclxuXHJcbiAgICBpc0Nvbm5lY3RlZCA9IHRydWVcclxuICAgIGNvbnNvbGUubG9nKFwi4pyFIE1vbmdvREIgY29ubmVjdGVkXCIpXHJcbiAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKFwi4p2MIE1vbmdvREIgY29ubmVjdGlvbiBlcnJvcjpcIiwgZXJyKVxyXG4gIH1cclxufVxyXG4iXSwibmFtZXMiOlsibW9uZ29vc2UiLCJpc0Nvbm5lY3RlZCIsImNvbm5lY3RUb0RCIiwiY29ubmVjdCIsInByb2Nlc3MiLCJlbnYiLCJNT05HT0RCX1VSSSIsImRiTmFtZSIsInVzZU5ld1VybFBhcnNlciIsInVzZVVuaWZpZWRUb3BvbG9neSIsImNvbnNvbGUiLCJsb2ciLCJlcnIiLCJlcnJvciJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/db.js\n");

/***/ }),

/***/ "(rsc)/./models/booking.js":
/*!***************************!*\
  !*** ./models/booking.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Booking: () => (/* binding */ Booking)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst BookingSchema = new (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema)({\n    lawyerId: {\n        type: (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema).Types.ObjectId,\n        ref: \"User\",\n        required: true\n    },\n    userId: {\n        type: (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema).Types.ObjectId,\n        ref: \"User\",\n        required: false\n    },\n    userName: {\n        type: String,\n        required: true\n    },\n    userEmail: {\n        type: String,\n        required: true\n    },\n    date: {\n        type: String,\n        required: true\n    },\n    time: {\n        type: String,\n        required: true\n    },\n    status: {\n        type: String,\n        enum: [\n            \"pending\",\n            \"confirmed\",\n            \"completed\",\n            \"cancelled\"\n        ],\n        default: \"pending\"\n    },\n    createdAt: {\n        type: Date,\n        default: Date.now\n    }\n});\nconst Booking = (mongoose__WEBPACK_IMPORTED_MODULE_0___default().models).Booking || mongoose__WEBPACK_IMPORTED_MODULE_0___default().model(\"Booking\", BookingSchema);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9tb2RlbHMvYm9va2luZy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBK0I7QUFFL0IsTUFBTUMsZ0JBQWdCLElBQUlELHdEQUFlLENBQUM7SUFDeENHLFVBQVU7UUFDUkMsTUFBTUosd0RBQWUsQ0FBQ0ssS0FBSyxDQUFDQyxRQUFRO1FBQ3BDQyxLQUFLO1FBQ0xDLFVBQVU7SUFDWjtJQUNBQyxRQUFRO1FBQ05MLE1BQU1KLHdEQUFlLENBQUNLLEtBQUssQ0FBQ0MsUUFBUTtRQUNwQ0MsS0FBSztRQUNMQyxVQUFVO0lBQ1o7SUFDQUUsVUFBVTtRQUNSTixNQUFNTztRQUNOSCxVQUFVO0lBQ1o7SUFDQUksV0FBVztRQUNUUixNQUFNTztRQUNOSCxVQUFVO0lBQ1o7SUFDQUssTUFBTTtRQUNKVCxNQUFNTztRQUNOSCxVQUFVO0lBQ1o7SUFDQU0sTUFBTTtRQUNKVixNQUFNTztRQUNOSCxVQUFVO0lBQ1o7SUFDQU8sUUFBUTtRQUNOWCxNQUFNTztRQUNOSyxNQUFNO1lBQUM7WUFBVztZQUFhO1lBQWE7U0FBWTtRQUN4REMsU0FBUztJQUNYO0lBQ0FDLFdBQVc7UUFDVGQsTUFBTWU7UUFDTkYsU0FBU0UsS0FBS0MsR0FBRztJQUNuQjtBQUNGO0FBRU8sTUFBTUMsVUFBVXJCLHdEQUFlLENBQUNxQixPQUFPLElBQUlyQixxREFBYyxDQUFDLFdBQVdDLGVBQWMiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcbXVoYW1cXERlc2t0b3BcXEFJLVBvd2VyZWQtTGVnYWwtUHJvcGVydHktQWR2aXNvci1tYWluXFxtb2RlbHNcXGJvb2tpbmcuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1vbmdvb3NlIGZyb20gXCJtb25nb29zZVwiXHJcblxyXG5jb25zdCBCb29raW5nU2NoZW1hID0gbmV3IG1vbmdvb3NlLlNjaGVtYSh7XHJcbiAgbGF3eWVySWQ6IHtcclxuICAgIHR5cGU6IG1vbmdvb3NlLlNjaGVtYS5UeXBlcy5PYmplY3RJZCxcclxuICAgIHJlZjogXCJVc2VyXCIsXHJcbiAgICByZXF1aXJlZDogdHJ1ZSxcclxuICB9LFxyXG4gIHVzZXJJZDoge1xyXG4gICAgdHlwZTogbW9uZ29vc2UuU2NoZW1hLlR5cGVzLk9iamVjdElkLFxyXG4gICAgcmVmOiBcIlVzZXJcIixcclxuICAgIHJlcXVpcmVkOiBmYWxzZSwgLy8gb3B0aW9uYWwgZm9yIGd1ZXN0XHJcbiAgfSxcclxuICB1c2VyTmFtZToge1xyXG4gICAgdHlwZTogU3RyaW5nLFxyXG4gICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgfSxcclxuICB1c2VyRW1haWw6IHtcclxuICAgIHR5cGU6IFN0cmluZyxcclxuICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gIH0sXHJcbiAgZGF0ZToge1xyXG4gICAgdHlwZTogU3RyaW5nLFxyXG4gICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgfSxcclxuICB0aW1lOiB7XHJcbiAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICByZXF1aXJlZDogdHJ1ZSxcclxuICB9LFxyXG4gIHN0YXR1czoge1xyXG4gICAgdHlwZTogU3RyaW5nLFxyXG4gICAgZW51bTogW1wicGVuZGluZ1wiLCBcImNvbmZpcm1lZFwiLCBcImNvbXBsZXRlZFwiLCBcImNhbmNlbGxlZFwiXSxcclxuICAgIGRlZmF1bHQ6IFwicGVuZGluZ1wiLFxyXG4gIH0sXHJcbiAgY3JlYXRlZEF0OiB7XHJcbiAgICB0eXBlOiBEYXRlLFxyXG4gICAgZGVmYXVsdDogRGF0ZS5ub3csXHJcbiAgfSxcclxufSlcclxuXHJcbmV4cG9ydCBjb25zdCBCb29raW5nID0gbW9uZ29vc2UubW9kZWxzLkJvb2tpbmcgfHwgbW9uZ29vc2UubW9kZWwoXCJCb29raW5nXCIsIEJvb2tpbmdTY2hlbWEpXHJcbiJdLCJuYW1lcyI6WyJtb25nb29zZSIsIkJvb2tpbmdTY2hlbWEiLCJTY2hlbWEiLCJsYXd5ZXJJZCIsInR5cGUiLCJUeXBlcyIsIk9iamVjdElkIiwicmVmIiwicmVxdWlyZWQiLCJ1c2VySWQiLCJ1c2VyTmFtZSIsIlN0cmluZyIsInVzZXJFbWFpbCIsImRhdGUiLCJ0aW1lIiwic3RhdHVzIiwiZW51bSIsImRlZmF1bHQiLCJjcmVhdGVkQXQiLCJEYXRlIiwibm93IiwiQm9va2luZyIsIm1vZGVscyIsIm1vZGVsIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./models/booking.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fbooking%2Froute&page=%2Fapi%2Fbooking%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fbooking%2Froute.js&appDir=C%3A%5CUsers%5Cmuham%5CDesktop%5CAI-Powered-Legal-Property-Advisor-main%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cmuham%5CDesktop%5CAI-Powered-Legal-Property-Advisor-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fbooking%2Froute&page=%2Fapi%2Fbooking%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fbooking%2Froute.js&appDir=C%3A%5CUsers%5Cmuham%5CDesktop%5CAI-Powered-Legal-Property-Advisor-main%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cmuham%5CDesktop%5CAI-Powered-Legal-Property-Advisor-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_muham_Desktop_AI_Powered_Legal_Property_Advisor_main_app_api_booking_route_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/booking/route.js */ \"(rsc)/./app/api/booking/route.js\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/booking/route\",\n        pathname: \"/api/booking\",\n        filename: \"route\",\n        bundlePath: \"app/api/booking/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\muham\\\\Desktop\\\\AI-Powered-Legal-Property-Advisor-main\\\\app\\\\api\\\\booking\\\\route.js\",\n    nextConfigOutput,\n    userland: C_Users_muham_Desktop_AI_Powered_Legal_Property_Advisor_main_app_api_booking_route_js__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZib29raW5nJTJGcm91dGUmcGFnZT0lMkZhcGklMkZib29raW5nJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGYm9va2luZyUyRnJvdXRlLmpzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNtdWhhbSU1Q0Rlc2t0b3AlNUNBSS1Qb3dlcmVkLUxlZ2FsLVByb3BlcnR5LUFkdmlzb3ItbWFpbiU1Q2FwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9QyUzQSU1Q1VzZXJzJTVDbXVoYW0lNUNEZXNrdG9wJTVDQUktUG93ZXJlZC1MZWdhbC1Qcm9wZXJ0eS1BZHZpc29yLW1haW4maXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQStGO0FBQ3ZDO0FBQ3FCO0FBQzhDO0FBQzNIO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5R0FBbUI7QUFDM0M7QUFDQSxjQUFjLGtFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQXNEO0FBQzlEO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzBGOztBQUUxRiIsInNvdXJjZXMiOlsiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCJDOlxcXFxVc2Vyc1xcXFxtdWhhbVxcXFxEZXNrdG9wXFxcXEFJLVBvd2VyZWQtTGVnYWwtUHJvcGVydHktQWR2aXNvci1tYWluXFxcXGFwcFxcXFxhcGlcXFxcYm9va2luZ1xcXFxyb3V0ZS5qc1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvYm9va2luZy9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2Jvb2tpbmdcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2Jvb2tpbmcvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJDOlxcXFxVc2Vyc1xcXFxtdWhhbVxcXFxEZXNrdG9wXFxcXEFJLVBvd2VyZWQtTGVnYWwtUHJvcGVydHktQWR2aXNvci1tYWluXFxcXGFwcFxcXFxhcGlcXFxcYm9va2luZ1xcXFxyb3V0ZS5qc1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fbooking%2Froute&page=%2Fapi%2Fbooking%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fbooking%2Froute.js&appDir=C%3A%5CUsers%5Cmuham%5CDesktop%5CAI-Powered-Legal-Property-Advisor-main%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cmuham%5CDesktop%5CAI-Powered-Legal-Property-Advisor-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("mongoose");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@opentelemetry"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fbooking%2Froute&page=%2Fapi%2Fbooking%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fbooking%2Froute.js&appDir=C%3A%5CUsers%5Cmuham%5CDesktop%5CAI-Powered-Legal-Property-Advisor-main%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cmuham%5CDesktop%5CAI-Powered-Legal-Property-Advisor-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();