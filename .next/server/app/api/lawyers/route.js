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
exports.id = "app/api/lawyers/route";
exports.ids = ["app/api/lawyers/route"];
exports.modules = {

/***/ "(rsc)/./app/api/lawyers/route.js":
/*!**********************************!*\
  !*** ./app/api/lawyers/route.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/db */ \"(rsc)/./lib/db.js\");\n/* harmony import */ var _models_User__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/models/User */ \"(rsc)/./models/User.js\");\n\n\n\nasync function GET() {\n    try {\n        await (0,_lib_db__WEBPACK_IMPORTED_MODULE_1__.connectToDB)();\n        const lawyers = await _models_User__WEBPACK_IMPORTED_MODULE_2__.User.find({\n            userType: \"lawyer\"\n        }).select(\"-password\");\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            lawyers\n        });\n    } catch (err) {\n        console.error(\"Error fetching lawyers:\", err);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Failed to fetch lawyers\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2xhd3llcnMvcm91dGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUEwQztBQUNKO0FBQ0Y7QUFFN0IsZUFBZUc7SUFDcEIsSUFBSTtRQUNGLE1BQU1GLG9EQUFXQTtRQUVqQixNQUFNRyxVQUFVLE1BQU1GLDhDQUFJQSxDQUFDRyxJQUFJLENBQUM7WUFBRUMsVUFBVTtRQUFTLEdBQUdDLE1BQU0sQ0FBQztRQUUvRCxPQUFPUCxxREFBWUEsQ0FBQ1EsSUFBSSxDQUFDO1lBQUVKO1FBQVE7SUFDckMsRUFBRSxPQUFPSyxLQUFLO1FBQ1pDLFFBQVFDLEtBQUssQ0FBQywyQkFBMkJGO1FBQ3pDLE9BQU9ULHFEQUFZQSxDQUFDUSxJQUFJLENBQUM7WUFBRUcsT0FBTztRQUEwQixHQUFHO1lBQUVDLFFBQVE7UUFBSTtJQUMvRTtBQUNGIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXG11aGFtXFxEZXNrdG9wXFxBSS1Qb3dlcmVkLUxlZ2FsLVByb3BlcnR5LUFkdmlzb3ItbWFpblxcYXBwXFxhcGlcXGxhd3llcnNcXHJvdXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gXCJuZXh0L3NlcnZlclwiXHJcbmltcG9ydCB7IGNvbm5lY3RUb0RCIH0gZnJvbSBcIkAvbGliL2RiXCJcclxuaW1wb3J0IHsgVXNlciB9IGZyb20gXCJAL21vZGVscy9Vc2VyXCJcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBHRVQoKSB7XHJcbiAgdHJ5IHtcclxuICAgIGF3YWl0IGNvbm5lY3RUb0RCKClcclxuXHJcbiAgICBjb25zdCBsYXd5ZXJzID0gYXdhaXQgVXNlci5maW5kKHsgdXNlclR5cGU6IFwibGF3eWVyXCIgfSkuc2VsZWN0KFwiLXBhc3N3b3JkXCIpXHJcblxyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgbGF3eWVycyB9KVxyXG4gIH0gY2F0Y2ggKGVycikge1xyXG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yIGZldGNoaW5nIGxhd3llcnM6XCIsIGVycilcclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBcIkZhaWxlZCB0byBmZXRjaCBsYXd5ZXJzXCIgfSwgeyBzdGF0dXM6IDUwMCB9KVxyXG4gIH1cclxufVxyXG4iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwiY29ubmVjdFRvREIiLCJVc2VyIiwiR0VUIiwibGF3eWVycyIsImZpbmQiLCJ1c2VyVHlwZSIsInNlbGVjdCIsImpzb24iLCJlcnIiLCJjb25zb2xlIiwiZXJyb3IiLCJzdGF0dXMiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/lawyers/route.js\n");

/***/ }),

/***/ "(rsc)/./lib/db.js":
/*!*******************!*\
  !*** ./lib/db.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   connectToDB: () => (/* binding */ connectToDB)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nlet isConnected = false;\nconst connectToDB = async ()=>{\n    if (isConnected) return;\n    try {\n        await mongoose__WEBPACK_IMPORTED_MODULE_0___default().connect(process.env.MONGODB_URI, {\n            dbName: \"legaladvisor\",\n            useNewUrlParser: true,\n            useUnifiedTopology: true\n        });\n        isConnected = true;\n        console.log(\"✅ MongoDB connected\");\n    } catch (err) {\n        console.error(\"❌ MongoDB connection error:\", err);\n    }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvZGIuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQStCO0FBRS9CLElBQUlDLGNBQWM7QUFFWCxNQUFNQyxjQUFjO0lBQ3pCLElBQUlELGFBQWE7SUFFakIsSUFBSTtRQUNGLE1BQU1ELHVEQUFnQixDQUFDSSxRQUFRQyxHQUFHLENBQUNDLFdBQVcsRUFBRTtZQUM5Q0MsUUFBUTtZQUNSQyxpQkFBaUI7WUFDakJDLG9CQUFvQjtRQUN0QjtRQUVBUixjQUFjO1FBQ2RTLFFBQVFDLEdBQUcsQ0FBQztJQUNkLEVBQUUsT0FBT0MsS0FBSztRQUNaRixRQUFRRyxLQUFLLENBQUMsK0JBQStCRDtJQUMvQztBQUNGLEVBQUMiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcbXVoYW1cXERlc2t0b3BcXEFJLVBvd2VyZWQtTGVnYWwtUHJvcGVydHktQWR2aXNvci1tYWluXFxsaWJcXGRiLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb25nb29zZSBmcm9tIFwibW9uZ29vc2VcIlxyXG5cclxubGV0IGlzQ29ubmVjdGVkID0gZmFsc2VcclxuXHJcbmV4cG9ydCBjb25zdCBjb25uZWN0VG9EQiA9IGFzeW5jICgpID0+IHtcclxuICBpZiAoaXNDb25uZWN0ZWQpIHJldHVyblxyXG5cclxuICB0cnkge1xyXG4gICAgYXdhaXQgbW9uZ29vc2UuY29ubmVjdChwcm9jZXNzLmVudi5NT05HT0RCX1VSSSwge1xyXG4gICAgICBkYk5hbWU6IFwibGVnYWxhZHZpc29yXCIsXHJcbiAgICAgIHVzZU5ld1VybFBhcnNlcjogdHJ1ZSxcclxuICAgICAgdXNlVW5pZmllZFRvcG9sb2d5OiB0cnVlLFxyXG4gICAgfSlcclxuXHJcbiAgICBpc0Nvbm5lY3RlZCA9IHRydWVcclxuICAgIGNvbnNvbGUubG9nKFwi4pyFIE1vbmdvREIgY29ubmVjdGVkXCIpXHJcbiAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKFwi4p2MIE1vbmdvREIgY29ubmVjdGlvbiBlcnJvcjpcIiwgZXJyKVxyXG4gIH1cclxufVxyXG4iXSwibmFtZXMiOlsibW9uZ29vc2UiLCJpc0Nvbm5lY3RlZCIsImNvbm5lY3RUb0RCIiwiY29ubmVjdCIsInByb2Nlc3MiLCJlbnYiLCJNT05HT0RCX1VSSSIsImRiTmFtZSIsInVzZU5ld1VybFBhcnNlciIsInVzZVVuaWZpZWRUb3BvbG9neSIsImNvbnNvbGUiLCJsb2ciLCJlcnIiLCJlcnJvciJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/db.js\n");

/***/ }),

/***/ "(rsc)/./models/User.js":
/*!************************!*\
  !*** ./models/User.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   User: () => (/* binding */ User)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst UserSchema = new (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema)({\n    firstName: {\n        type: String,\n        required: true\n    },\n    lastName: {\n        type: String,\n        required: true\n    },\n    email: {\n        type: String,\n        required: true,\n        unique: true\n    },\n    password: {\n        type: String,\n        required: true\n    },\n    userType: {\n        type: String,\n        enum: [\n            \"client\",\n            \"lawyer\"\n        ],\n        required: true\n    },\n    specialization: {\n        type: String,\n        default: \"property\"\n    },\n    image: {\n        type: String\n    },\n    location: {\n        type: String\n    },\n    bio: {\n        type: String\n    },\n    verified: {\n        type: Boolean,\n        default: false\n    },\n    sessionRate: {\n        type: Number,\n        default: 50\n    },\n    availableSlots: {\n        type: Map,\n        of: [\n            String\n        ],\n        default: {}\n    }\n}, {\n    timestamps: true\n});\nconst User = (mongoose__WEBPACK_IMPORTED_MODULE_0___default().models).User || mongoose__WEBPACK_IMPORTED_MODULE_0___default().model(\"User\", UserSchema);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9tb2RlbHMvVXNlci5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBK0I7QUFFL0IsTUFBTUMsYUFBYSxJQUFJRCx3REFBZSxDQUFDO0lBQ3JDRyxXQUFXO1FBQUVDLE1BQU1DO1FBQVFDLFVBQVU7SUFBSztJQUMxQ0MsVUFBVztRQUFFSCxNQUFNQztRQUFRQyxVQUFVO0lBQUs7SUFDMUNFLE9BQVc7UUFBRUosTUFBTUM7UUFBUUMsVUFBVTtRQUFNRyxRQUFRO0lBQUs7SUFDeERDLFVBQVc7UUFBRU4sTUFBTUM7UUFBUUMsVUFBVTtJQUFLO0lBQzFDSyxVQUFXO1FBQUVQLE1BQU1DO1FBQVFPLE1BQU07WUFBQztZQUFVO1NBQVM7UUFBRU4sVUFBVTtJQUFLO0lBQ3RFTyxnQkFBZ0I7UUFBRVQsTUFBTUM7UUFBUVMsU0FBUztJQUFXO0lBQ3BEQyxPQUFXO1FBQUVYLE1BQU1DO0lBQU87SUFDMUJXLFVBQVc7UUFBRVosTUFBTUM7SUFBTztJQUMxQlksS0FBVztRQUFFYixNQUFNQztJQUFPO0lBQzFCYSxVQUFXO1FBQUVkLE1BQU1lO1FBQVNMLFNBQVM7SUFBTTtJQUMzQ00sYUFBYTtRQUFFaEIsTUFBTWlCO1FBQVFQLFNBQVM7SUFBRztJQUN6Q1EsZ0JBQWdCO1FBQ2RsQixNQUFNbUI7UUFDTkMsSUFBSTtZQUFDbkI7U0FBTztRQUNaUyxTQUFTLENBQUM7SUFDWjtBQUNGLEdBQUc7SUFBRVcsWUFBWTtBQUFLO0FBRWYsTUFBTUMsT0FBTzFCLHdEQUFlLENBQUMwQixJQUFJLElBQUkxQixxREFBYyxDQUFDLFFBQVFDLFlBQVciLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcbXVoYW1cXERlc2t0b3BcXEFJLVBvd2VyZWQtTGVnYWwtUHJvcGVydHktQWR2aXNvci1tYWluXFxtb2RlbHNcXFVzZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1vbmdvb3NlIGZyb20gXCJtb25nb29zZVwiXHJcblxyXG5jb25zdCBVc2VyU2NoZW1hID0gbmV3IG1vbmdvb3NlLlNjaGVtYSh7XHJcbiAgZmlyc3ROYW1lOiB7IHR5cGU6IFN0cmluZywgcmVxdWlyZWQ6IHRydWUgfSxcclxuICBsYXN0TmFtZTogIHsgdHlwZTogU3RyaW5nLCByZXF1aXJlZDogdHJ1ZSB9LFxyXG4gIGVtYWlsOiAgICAgeyB0eXBlOiBTdHJpbmcsIHJlcXVpcmVkOiB0cnVlLCB1bmlxdWU6IHRydWUgfSxcclxuICBwYXNzd29yZDogIHsgdHlwZTogU3RyaW5nLCByZXF1aXJlZDogdHJ1ZSB9LFxyXG4gIHVzZXJUeXBlOiAgeyB0eXBlOiBTdHJpbmcsIGVudW06IFtcImNsaWVudFwiLCBcImxhd3llclwiXSwgcmVxdWlyZWQ6IHRydWUgfSxcclxuICBzcGVjaWFsaXphdGlvbjogeyB0eXBlOiBTdHJpbmcsIGRlZmF1bHQ6IFwicHJvcGVydHlcIiB9LFxyXG4gIGltYWdlOiAgICAgeyB0eXBlOiBTdHJpbmcgfSxcclxuICBsb2NhdGlvbjogIHsgdHlwZTogU3RyaW5nIH0sXHJcbiAgYmlvOiAgICAgICB7IHR5cGU6IFN0cmluZyB9LFxyXG4gIHZlcmlmaWVkOiAgeyB0eXBlOiBCb29sZWFuLCBkZWZhdWx0OiBmYWxzZSB9LFxyXG4gIHNlc3Npb25SYXRlOiB7IHR5cGU6IE51bWJlciwgZGVmYXVsdDogNTAgfSxcclxuICBhdmFpbGFibGVTbG90czoge1xyXG4gICAgdHlwZTogTWFwLFxyXG4gICAgb2Y6IFtTdHJpbmddLFxyXG4gICAgZGVmYXVsdDoge30sXHJcbiAgfSxcclxufSwgeyB0aW1lc3RhbXBzOiB0cnVlIH0pXHJcblxyXG5leHBvcnQgY29uc3QgVXNlciA9IG1vbmdvb3NlLm1vZGVscy5Vc2VyIHx8IG1vbmdvb3NlLm1vZGVsKFwiVXNlclwiLCBVc2VyU2NoZW1hKVxyXG4iXSwibmFtZXMiOlsibW9uZ29vc2UiLCJVc2VyU2NoZW1hIiwiU2NoZW1hIiwiZmlyc3ROYW1lIiwidHlwZSIsIlN0cmluZyIsInJlcXVpcmVkIiwibGFzdE5hbWUiLCJlbWFpbCIsInVuaXF1ZSIsInBhc3N3b3JkIiwidXNlclR5cGUiLCJlbnVtIiwic3BlY2lhbGl6YXRpb24iLCJkZWZhdWx0IiwiaW1hZ2UiLCJsb2NhdGlvbiIsImJpbyIsInZlcmlmaWVkIiwiQm9vbGVhbiIsInNlc3Npb25SYXRlIiwiTnVtYmVyIiwiYXZhaWxhYmxlU2xvdHMiLCJNYXAiLCJvZiIsInRpbWVzdGFtcHMiLCJVc2VyIiwibW9kZWxzIiwibW9kZWwiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./models/User.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Flawyers%2Froute&page=%2Fapi%2Flawyers%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Flawyers%2Froute.js&appDir=C%3A%5CUsers%5Cmuham%5CDesktop%5CAI-Powered-Legal-Property-Advisor-main%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cmuham%5CDesktop%5CAI-Powered-Legal-Property-Advisor-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Flawyers%2Froute&page=%2Fapi%2Flawyers%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Flawyers%2Froute.js&appDir=C%3A%5CUsers%5Cmuham%5CDesktop%5CAI-Powered-Legal-Property-Advisor-main%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cmuham%5CDesktop%5CAI-Powered-Legal-Property-Advisor-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_muham_Desktop_AI_Powered_Legal_Property_Advisor_main_app_api_lawyers_route_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/lawyers/route.js */ \"(rsc)/./app/api/lawyers/route.js\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/lawyers/route\",\n        pathname: \"/api/lawyers\",\n        filename: \"route\",\n        bundlePath: \"app/api/lawyers/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\muham\\\\Desktop\\\\AI-Powered-Legal-Property-Advisor-main\\\\app\\\\api\\\\lawyers\\\\route.js\",\n    nextConfigOutput,\n    userland: C_Users_muham_Desktop_AI_Powered_Legal_Property_Advisor_main_app_api_lawyers_route_js__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZsYXd5ZXJzJTJGcm91dGUmcGFnZT0lMkZhcGklMkZsYXd5ZXJzJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGbGF3eWVycyUyRnJvdXRlLmpzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNtdWhhbSU1Q0Rlc2t0b3AlNUNBSS1Qb3dlcmVkLUxlZ2FsLVByb3BlcnR5LUFkdmlzb3ItbWFpbiU1Q2FwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9QyUzQSU1Q1VzZXJzJTVDbXVoYW0lNUNEZXNrdG9wJTVDQUktUG93ZXJlZC1MZWdhbC1Qcm9wZXJ0eS1BZHZpc29yLW1haW4maXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQStGO0FBQ3ZDO0FBQ3FCO0FBQzhDO0FBQzNIO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5R0FBbUI7QUFDM0M7QUFDQSxjQUFjLGtFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQXNEO0FBQzlEO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzBGOztBQUUxRiIsInNvdXJjZXMiOlsiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCJDOlxcXFxVc2Vyc1xcXFxtdWhhbVxcXFxEZXNrdG9wXFxcXEFJLVBvd2VyZWQtTGVnYWwtUHJvcGVydHktQWR2aXNvci1tYWluXFxcXGFwcFxcXFxhcGlcXFxcbGF3eWVyc1xcXFxyb3V0ZS5qc1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvbGF3eWVycy9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2xhd3llcnNcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2xhd3llcnMvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJDOlxcXFxVc2Vyc1xcXFxtdWhhbVxcXFxEZXNrdG9wXFxcXEFJLVBvd2VyZWQtTGVnYWwtUHJvcGVydHktQWR2aXNvci1tYWluXFxcXGFwcFxcXFxhcGlcXFxcbGF3eWVyc1xcXFxyb3V0ZS5qc1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Flawyers%2Froute&page=%2Fapi%2Flawyers%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Flawyers%2Froute.js&appDir=C%3A%5CUsers%5Cmuham%5CDesktop%5CAI-Powered-Legal-Property-Advisor-main%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cmuham%5CDesktop%5CAI-Powered-Legal-Property-Advisor-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@opentelemetry"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Flawyers%2Froute&page=%2Fapi%2Flawyers%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Flawyers%2Froute.js&appDir=C%3A%5CUsers%5Cmuham%5CDesktop%5CAI-Powered-Legal-Property-Advisor-main%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cmuham%5CDesktop%5CAI-Powered-Legal-Property-Advisor-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();