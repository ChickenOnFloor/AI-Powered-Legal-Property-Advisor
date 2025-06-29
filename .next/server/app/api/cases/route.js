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
exports.id = "app/api/cases/route";
exports.ids = ["app/api/cases/route"];
exports.modules = {

/***/ "(rsc)/./app/api/cases/route.js":
/*!********************************!*\
  !*** ./app/api/cases/route.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/db */ \"(rsc)/./lib/db.js\");\n/* harmony import */ var _models_case__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/models/case */ \"(rsc)/./models/case.js\");\n\n\n\nasync function GET() {\n    try {\n        await (0,_lib_db__WEBPACK_IMPORTED_MODULE_1__.connectToDB)();\n        const cases = await _models_case__WEBPACK_IMPORTED_MODULE_2__[\"default\"].find({}).sort({\n            createdAt: -1\n        }).limit(5);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: true,\n            cases\n        });\n    } catch (error) {\n        console.error(\"Error fetching cases:\", error) // 👈 LOG the exact error\n        ;\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: false,\n            error: \"Failed to fetch cases\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2Nhc2VzL3JvdXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBMEM7QUFDSjtBQUNOO0FBRXpCLGVBQWVHO0lBQ3BCLElBQUk7UUFDRixNQUFNRixvREFBV0E7UUFDakIsTUFBTUcsUUFBUSxNQUFNRixvREFBSUEsQ0FBQ0csSUFBSSxDQUFDLENBQUMsR0FBR0MsSUFBSSxDQUFDO1lBQUVDLFdBQVcsQ0FBQztRQUFFLEdBQUdDLEtBQUssQ0FBQztRQUNoRSxPQUFPUixxREFBWUEsQ0FBQ1MsSUFBSSxDQUFDO1lBQUVDLFNBQVM7WUFBTU47UUFBTTtJQUNsRCxFQUFFLE9BQU9PLE9BQU87UUFDZEMsUUFBUUQsS0FBSyxDQUFDLHlCQUF5QkEsT0FBUSx5QkFBeUI7O1FBQ3hFLE9BQU9YLHFEQUFZQSxDQUFDUyxJQUFJLENBQUM7WUFBRUMsU0FBUztZQUFPQyxPQUFPO1FBQXdCLEdBQUc7WUFBRUUsUUFBUTtRQUFJO0lBQzdGO0FBQ0YiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcbXVoYW1cXERlc2t0b3BcXEFJLVBvd2VyZWQtTGVnYWwtUHJvcGVydHktQWR2aXNvci1tYWluXFxhcHBcXGFwaVxcY2FzZXNcXHJvdXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gXCJuZXh0L3NlcnZlclwiXHJcbmltcG9ydCB7IGNvbm5lY3RUb0RCIH0gZnJvbSBcIkAvbGliL2RiXCJcclxuaW1wb3J0IENhc2UgZnJvbSBcIkAvbW9kZWxzL2Nhc2VcIlxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIEdFVCgpIHtcclxuICB0cnkge1xyXG4gICAgYXdhaXQgY29ubmVjdFRvREIoKVxyXG4gICAgY29uc3QgY2FzZXMgPSBhd2FpdCBDYXNlLmZpbmQoe30pLnNvcnQoeyBjcmVhdGVkQXQ6IC0xIH0pLmxpbWl0KDUpXHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBjYXNlcyB9KVxyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZmV0Y2hpbmcgY2FzZXM6XCIsIGVycm9yKSAgLy8g8J+RiCBMT0cgdGhlIGV4YWN0IGVycm9yXHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiRmFpbGVkIHRvIGZldGNoIGNhc2VzXCIgfSwgeyBzdGF0dXM6IDUwMCB9KVxyXG4gIH1cclxufVxyXG4iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwiY29ubmVjdFRvREIiLCJDYXNlIiwiR0VUIiwiY2FzZXMiLCJmaW5kIiwic29ydCIsImNyZWF0ZWRBdCIsImxpbWl0IiwianNvbiIsInN1Y2Nlc3MiLCJlcnJvciIsImNvbnNvbGUiLCJzdGF0dXMiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/cases/route.js\n");

/***/ }),

/***/ "(rsc)/./lib/db.js":
/*!*******************!*\
  !*** ./lib/db.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   connectToDB: () => (/* binding */ connectToDB)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nlet isConnected = false;\nconst connectToDB = async ()=>{\n    if (isConnected) return;\n    try {\n        await mongoose__WEBPACK_IMPORTED_MODULE_0___default().connect(process.env.MONGODB_URI, {\n            dbName: \"legaladvisor\",\n            useNewUrlParser: true,\n            useUnifiedTopology: true\n        });\n        isConnected = true;\n        console.log(\"✅ MongoDB connected\");\n    } catch (err) {\n        console.error(\"❌ MongoDB connection error:\", err);\n    }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvZGIuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQStCO0FBRS9CLElBQUlDLGNBQWM7QUFFWCxNQUFNQyxjQUFjO0lBQ3pCLElBQUlELGFBQWE7SUFFakIsSUFBSTtRQUNGLE1BQU1ELHVEQUFnQixDQUFDSSxRQUFRQyxHQUFHLENBQUNDLFdBQVcsRUFBRTtZQUM5Q0MsUUFBUTtZQUNSQyxpQkFBaUI7WUFDakJDLG9CQUFvQjtRQUN0QjtRQUVBUixjQUFjO1FBQ2RTLFFBQVFDLEdBQUcsQ0FBQztJQUNkLEVBQUUsT0FBT0MsS0FBSztRQUNaRixRQUFRRyxLQUFLLENBQUMsK0JBQStCRDtJQUMvQztBQUNGLEVBQUMiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcbXVoYW1cXERlc2t0b3BcXEFJLVBvd2VyZWQtTGVnYWwtUHJvcGVydHktQWR2aXNvci1tYWluXFxsaWJcXGRiLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb25nb29zZSBmcm9tIFwibW9uZ29vc2VcIlxyXG5cclxubGV0IGlzQ29ubmVjdGVkID0gZmFsc2VcclxuXHJcbmV4cG9ydCBjb25zdCBjb25uZWN0VG9EQiA9IGFzeW5jICgpID0+IHtcclxuICBpZiAoaXNDb25uZWN0ZWQpIHJldHVyblxyXG5cclxuICB0cnkge1xyXG4gICAgYXdhaXQgbW9uZ29vc2UuY29ubmVjdChwcm9jZXNzLmVudi5NT05HT0RCX1VSSSwge1xyXG4gICAgICBkYk5hbWU6IFwibGVnYWxhZHZpc29yXCIsXHJcbiAgICAgIHVzZU5ld1VybFBhcnNlcjogdHJ1ZSxcclxuICAgICAgdXNlVW5pZmllZFRvcG9sb2d5OiB0cnVlLFxyXG4gICAgfSlcclxuXHJcbiAgICBpc0Nvbm5lY3RlZCA9IHRydWVcclxuICAgIGNvbnNvbGUubG9nKFwi4pyFIE1vbmdvREIgY29ubmVjdGVkXCIpXHJcbiAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKFwi4p2MIE1vbmdvREIgY29ubmVjdGlvbiBlcnJvcjpcIiwgZXJyKVxyXG4gIH1cclxufVxyXG4iXSwibmFtZXMiOlsibW9uZ29vc2UiLCJpc0Nvbm5lY3RlZCIsImNvbm5lY3RUb0RCIiwiY29ubmVjdCIsInByb2Nlc3MiLCJlbnYiLCJNT05HT0RCX1VSSSIsImRiTmFtZSIsInVzZU5ld1VybFBhcnNlciIsInVzZVVuaWZpZWRUb3BvbG9neSIsImNvbnNvbGUiLCJsb2ciLCJlcnIiLCJlcnJvciJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/db.js\n");

/***/ }),

/***/ "(rsc)/./models/case.js":
/*!************************!*\
  !*** ./models/case.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst CaseSchema = new (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema)({\n    title: String,\n    status: {\n        type: String,\n        default: \"Pending\"\n    },\n    lawyer: String,\n    date: {\n        type: Date,\n        default: Date.now\n    },\n    userId: {\n        type: (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema).Types.ObjectId,\n        ref: \"User\"\n    }\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((mongoose__WEBPACK_IMPORTED_MODULE_0___default().models).Case || mongoose__WEBPACK_IMPORTED_MODULE_0___default().model(\"Case\", CaseSchema));\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9tb2RlbHMvY2FzZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBK0I7QUFFL0IsTUFBTUMsYUFBYSxJQUFJRCx3REFBZSxDQUFDO0lBQ3JDRyxPQUFPQztJQUNQQyxRQUFRO1FBQUVDLE1BQU1GO1FBQVFHLFNBQVM7SUFBVTtJQUMzQ0MsUUFBUUo7SUFDUkssTUFBTTtRQUFFSCxNQUFNSTtRQUFNSCxTQUFTRyxLQUFLQyxHQUFHO0lBQUM7SUFDdENDLFFBQVE7UUFBRU4sTUFBTU4sd0RBQWUsQ0FBQ2EsS0FBSyxDQUFDQyxRQUFRO1FBQUVDLEtBQUs7SUFBTztBQUM5RDtBQUVBLGlFQUFlZix3REFBZSxDQUFDaUIsSUFBSSxJQUFJakIscURBQWMsQ0FBQyxRQUFRQyxXQUFXQSxFQUFBIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXG11aGFtXFxEZXNrdG9wXFxBSS1Qb3dlcmVkLUxlZ2FsLVByb3BlcnR5LUFkdmlzb3ItbWFpblxcbW9kZWxzXFxjYXNlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb25nb29zZSBmcm9tIFwibW9uZ29vc2VcIlxyXG5cclxuY29uc3QgQ2FzZVNjaGVtYSA9IG5ldyBtb25nb29zZS5TY2hlbWEoe1xyXG4gIHRpdGxlOiBTdHJpbmcsXHJcbiAgc3RhdHVzOiB7IHR5cGU6IFN0cmluZywgZGVmYXVsdDogXCJQZW5kaW5nXCIgfSxcclxuICBsYXd5ZXI6IFN0cmluZyxcclxuICBkYXRlOiB7IHR5cGU6IERhdGUsIGRlZmF1bHQ6IERhdGUubm93IH0sXHJcbiAgdXNlcklkOiB7IHR5cGU6IG1vbmdvb3NlLlNjaGVtYS5UeXBlcy5PYmplY3RJZCwgcmVmOiBcIlVzZXJcIiB9LFxyXG59KVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgbW9uZ29vc2UubW9kZWxzLkNhc2UgfHwgbW9uZ29vc2UubW9kZWwoXCJDYXNlXCIsIENhc2VTY2hlbWEpXHJcbiJdLCJuYW1lcyI6WyJtb25nb29zZSIsIkNhc2VTY2hlbWEiLCJTY2hlbWEiLCJ0aXRsZSIsIlN0cmluZyIsInN0YXR1cyIsInR5cGUiLCJkZWZhdWx0IiwibGF3eWVyIiwiZGF0ZSIsIkRhdGUiLCJub3ciLCJ1c2VySWQiLCJUeXBlcyIsIk9iamVjdElkIiwicmVmIiwibW9kZWxzIiwiQ2FzZSIsIm1vZGVsIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./models/case.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fcases%2Froute&page=%2Fapi%2Fcases%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcases%2Froute.js&appDir=C%3A%5CUsers%5Cmuham%5CDesktop%5CAI-Powered-Legal-Property-Advisor-main%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cmuham%5CDesktop%5CAI-Powered-Legal-Property-Advisor-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fcases%2Froute&page=%2Fapi%2Fcases%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcases%2Froute.js&appDir=C%3A%5CUsers%5Cmuham%5CDesktop%5CAI-Powered-Legal-Property-Advisor-main%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cmuham%5CDesktop%5CAI-Powered-Legal-Property-Advisor-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_muham_Desktop_AI_Powered_Legal_Property_Advisor_main_app_api_cases_route_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/cases/route.js */ \"(rsc)/./app/api/cases/route.js\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/cases/route\",\n        pathname: \"/api/cases\",\n        filename: \"route\",\n        bundlePath: \"app/api/cases/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\muham\\\\Desktop\\\\AI-Powered-Legal-Property-Advisor-main\\\\app\\\\api\\\\cases\\\\route.js\",\n    nextConfigOutput,\n    userland: C_Users_muham_Desktop_AI_Powered_Legal_Property_Advisor_main_app_api_cases_route_js__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZjYXNlcyUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGY2FzZXMlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZjYXNlcyUyRnJvdXRlLmpzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNtdWhhbSU1Q0Rlc2t0b3AlNUNBSS1Qb3dlcmVkLUxlZ2FsLVByb3BlcnR5LUFkdmlzb3ItbWFpbiU1Q2FwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9QyUzQSU1Q1VzZXJzJTVDbXVoYW0lNUNEZXNrdG9wJTVDQUktUG93ZXJlZC1MZWdhbC1Qcm9wZXJ0eS1BZHZpc29yLW1haW4maXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQStGO0FBQ3ZDO0FBQ3FCO0FBQzRDO0FBQ3pIO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5R0FBbUI7QUFDM0M7QUFDQSxjQUFjLGtFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQXNEO0FBQzlEO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzBGOztBQUUxRiIsInNvdXJjZXMiOlsiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCJDOlxcXFxVc2Vyc1xcXFxtdWhhbVxcXFxEZXNrdG9wXFxcXEFJLVBvd2VyZWQtTGVnYWwtUHJvcGVydHktQWR2aXNvci1tYWluXFxcXGFwcFxcXFxhcGlcXFxcY2FzZXNcXFxccm91dGUuanNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL2Nhc2VzL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvY2FzZXNcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2Nhc2VzL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiQzpcXFxcVXNlcnNcXFxcbXVoYW1cXFxcRGVza3RvcFxcXFxBSS1Qb3dlcmVkLUxlZ2FsLVByb3BlcnR5LUFkdmlzb3ItbWFpblxcXFxhcHBcXFxcYXBpXFxcXGNhc2VzXFxcXHJvdXRlLmpzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fcases%2Froute&page=%2Fapi%2Fcases%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcases%2Froute.js&appDir=C%3A%5CUsers%5Cmuham%5CDesktop%5CAI-Powered-Legal-Property-Advisor-main%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cmuham%5CDesktop%5CAI-Powered-Legal-Property-Advisor-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@opentelemetry"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fcases%2Froute&page=%2Fapi%2Fcases%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcases%2Froute.js&appDir=C%3A%5CUsers%5Cmuham%5CDesktop%5CAI-Powered-Legal-Property-Advisor-main%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cmuham%5CDesktop%5CAI-Powered-Legal-Property-Advisor-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();