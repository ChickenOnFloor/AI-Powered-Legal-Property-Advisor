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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/db */ \"(rsc)/./lib/db.js\");\n/* harmony import */ var _models_case__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/models/case */ \"(rsc)/./models/case.js\");\n/* harmony import */ var _models_user__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/models/user */ \"(rsc)/./models/user.js\");\n\n\n\n\nasync function GET() {\n    try {\n        await (0,_lib_db__WEBPACK_IMPORTED_MODULE_1__.connectToDB)();\n        const cases = await _models_case__WEBPACK_IMPORTED_MODULE_2__[\"default\"].find({}).sort({\n            createdAt: -1\n        }).limit(5);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: true,\n            cases\n        });\n    } catch (error) {\n        console.error(\"Error fetching cases:\", error) // 👈 LOG the exact error\n        ;\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: false,\n            error: \"Failed to fetch cases\"\n        }, {\n            status: 500\n        });\n    }\n}\nasync function POST(req) {\n    try {\n        const body = await req.json();\n        const { title, lawyerEmail, clientEmail } = body;\n        if (!title || !lawyerEmail || !clientEmail) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                message: \"Missing fields\"\n            }, {\n                status: 400\n            });\n        }\n        await (0,_lib_db__WEBPACK_IMPORTED_MODULE_1__.connectToDB)();\n        const lawyerUser = await _models_user__WEBPACK_IMPORTED_MODULE_3__.User.findOne({\n            email: lawyerEmail\n        });\n        const clientUser = await _models_user__WEBPACK_IMPORTED_MODULE_3__.User.findOne({\n            email: clientEmail\n        });\n        if (!lawyerUser || !clientUser) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                message: \"Lawyer or client not found\"\n            }, {\n                status: 404\n            });\n        }\n        const newCase = new _models_case__WEBPACK_IMPORTED_MODULE_2__[\"default\"]({\n            title,\n            lawyer: lawyerUser.firstName + \" \" + lawyerUser.lastName,\n            userId: clientUser._id\n        });\n        await newCase.save();\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: true,\n            message: \"Case created successfully\"\n        });\n    } catch (error) {\n        console.error(\"Case creation error:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            message: \"Server error\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2Nhc2VzL3JvdXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUEwQztBQUNKO0FBQ047QUFDSztBQUU5QixlQUFlSTtJQUNwQixJQUFJO1FBQ0YsTUFBTUgsb0RBQVdBO1FBQ2pCLE1BQU1JLFFBQVEsTUFBTUgsb0RBQUlBLENBQUNJLElBQUksQ0FBQyxDQUFDLEdBQUdDLElBQUksQ0FBQztZQUFFQyxXQUFXLENBQUM7UUFBRSxHQUFHQyxLQUFLLENBQUM7UUFDaEUsT0FBT1QscURBQVlBLENBQUNVLElBQUksQ0FBQztZQUFFQyxTQUFTO1lBQU1OO1FBQU07SUFDbEQsRUFBRSxPQUFPTyxPQUFPO1FBQ2RDLFFBQVFELEtBQUssQ0FBQyx5QkFBeUJBLE9BQVEseUJBQXlCOztRQUN4RSxPQUFPWixxREFBWUEsQ0FBQ1UsSUFBSSxDQUFDO1lBQUVDLFNBQVM7WUFBT0MsT0FBTztRQUF3QixHQUFHO1lBQUVFLFFBQVE7UUFBSTtJQUM3RjtBQUNGO0FBRU8sZUFBZUMsS0FBS0MsR0FBRztJQUM1QixJQUFJO1FBQ0YsTUFBTUMsT0FBTyxNQUFNRCxJQUFJTixJQUFJO1FBQzNCLE1BQU0sRUFBRVEsS0FBSyxFQUFFQyxXQUFXLEVBQUVDLFdBQVcsRUFBRSxHQUFHSDtRQUU1QyxJQUFJLENBQUNDLFNBQVMsQ0FBQ0MsZUFBZSxDQUFDQyxhQUFhO1lBQzFDLE9BQU9wQixxREFBWUEsQ0FBQ1UsSUFBSSxDQUFDO2dCQUFFVyxTQUFTO1lBQWlCLEdBQUc7Z0JBQUVQLFFBQVE7WUFBSTtRQUN4RTtRQUVBLE1BQU1iLG9EQUFXQTtRQUVqQixNQUFNcUIsYUFBYSxNQUFNbkIsOENBQUlBLENBQUNvQixPQUFPLENBQUM7WUFBRUMsT0FBT0w7UUFBWTtRQUMzRCxNQUFNTSxhQUFhLE1BQU10Qiw4Q0FBSUEsQ0FBQ29CLE9BQU8sQ0FBQztZQUFFQyxPQUFPSjtRQUFZO1FBRTNELElBQUksQ0FBQ0UsY0FBYyxDQUFDRyxZQUFZO1lBQzlCLE9BQU96QixxREFBWUEsQ0FBQ1UsSUFBSSxDQUFDO2dCQUFFVyxTQUFTO1lBQTZCLEdBQUc7Z0JBQUVQLFFBQVE7WUFBSTtRQUNwRjtRQUVBLE1BQU1ZLFVBQVUsSUFBSXhCLG9EQUFJQSxDQUFDO1lBQ3ZCZ0I7WUFDQVMsUUFBUUwsV0FBV00sU0FBUyxHQUFHLE1BQU1OLFdBQVdPLFFBQVE7WUFDeERDLFFBQVFMLFdBQVdNLEdBQUc7UUFDeEI7UUFFQSxNQUFNTCxRQUFRTSxJQUFJO1FBRWxCLE9BQU9oQyxxREFBWUEsQ0FBQ1UsSUFBSSxDQUFDO1lBQUVDLFNBQVM7WUFBTVUsU0FBUztRQUE0QjtJQUNqRixFQUFFLE9BQU9ULE9BQU87UUFDZEMsUUFBUUQsS0FBSyxDQUFDLHdCQUF3QkE7UUFDdEMsT0FBT1oscURBQVlBLENBQUNVLElBQUksQ0FBQztZQUFFVyxTQUFTO1FBQWUsR0FBRztZQUFFUCxRQUFRO1FBQUk7SUFDdEU7QUFDRiIsInNvdXJjZXMiOlsiRDpcXEFJLVBvd2VyZWQtTGVnYWwtUHJvcGVydHktQWR2aXNvclxcYXBwXFxhcGlcXGNhc2VzXFxyb3V0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVzcG9uc2UgfSBmcm9tIFwibmV4dC9zZXJ2ZXJcIlxyXG5pbXBvcnQgeyBjb25uZWN0VG9EQiB9IGZyb20gXCJAL2xpYi9kYlwiXHJcbmltcG9ydCBDYXNlIGZyb20gXCJAL21vZGVscy9jYXNlXCJcclxuaW1wb3J0IHsgVXNlciB9IGZyb20gXCJAL21vZGVscy91c2VyXCI7XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR0VUKCkge1xyXG4gIHRyeSB7XHJcbiAgICBhd2FpdCBjb25uZWN0VG9EQigpXHJcbiAgICBjb25zdCBjYXNlcyA9IGF3YWl0IENhc2UuZmluZCh7fSkuc29ydCh7IGNyZWF0ZWRBdDogLTEgfSkubGltaXQoNSlcclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGNhc2VzIH0pXHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBmZXRjaGluZyBjYXNlczpcIiwgZXJyb3IpICAvLyDwn5GIIExPRyB0aGUgZXhhY3QgZXJyb3JcclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJGYWlsZWQgdG8gZmV0Y2ggY2FzZXNcIiB9LCB7IHN0YXR1czogNTAwIH0pXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUE9TVChyZXEpIHtcclxuICB0cnkge1xyXG4gICAgY29uc3QgYm9keSA9IGF3YWl0IHJlcS5qc29uKCk7XHJcbiAgICBjb25zdCB7IHRpdGxlLCBsYXd5ZXJFbWFpbCwgY2xpZW50RW1haWwgfSA9IGJvZHk7XHJcblxyXG4gICAgaWYgKCF0aXRsZSB8fCAhbGF3eWVyRW1haWwgfHwgIWNsaWVudEVtYWlsKSB7XHJcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IG1lc3NhZ2U6IFwiTWlzc2luZyBmaWVsZHNcIiB9LCB7IHN0YXR1czogNDAwIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGF3YWl0IGNvbm5lY3RUb0RCKCk7XHJcblxyXG4gICAgY29uc3QgbGF3eWVyVXNlciA9IGF3YWl0IFVzZXIuZmluZE9uZSh7IGVtYWlsOiBsYXd5ZXJFbWFpbCB9KTtcclxuICAgIGNvbnN0IGNsaWVudFVzZXIgPSBhd2FpdCBVc2VyLmZpbmRPbmUoeyBlbWFpbDogY2xpZW50RW1haWwgfSk7XHJcblxyXG4gICAgaWYgKCFsYXd5ZXJVc2VyIHx8ICFjbGllbnRVc2VyKSB7XHJcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IG1lc3NhZ2U6IFwiTGF3eWVyIG9yIGNsaWVudCBub3QgZm91bmRcIiB9LCB7IHN0YXR1czogNDA0IH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG5ld0Nhc2UgPSBuZXcgQ2FzZSh7XHJcbiAgICAgIHRpdGxlLFxyXG4gICAgICBsYXd5ZXI6IGxhd3llclVzZXIuZmlyc3ROYW1lICsgXCIgXCIgKyBsYXd5ZXJVc2VyLmxhc3ROYW1lLFxyXG4gICAgICB1c2VySWQ6IGNsaWVudFVzZXIuX2lkLFxyXG4gICAgfSk7XHJcblxyXG4gICAgYXdhaXQgbmV3Q2FzZS5zYXZlKCk7XHJcblxyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgbWVzc2FnZTogXCJDYXNlIGNyZWF0ZWQgc3VjY2Vzc2Z1bGx5XCIgfSk7XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoXCJDYXNlIGNyZWF0aW9uIGVycm9yOlwiLCBlcnJvcik7XHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBtZXNzYWdlOiBcIlNlcnZlciBlcnJvclwiIH0sIHsgc3RhdHVzOiA1MDAgfSk7XHJcbiAgfVxyXG59XHJcbiJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJjb25uZWN0VG9EQiIsIkNhc2UiLCJVc2VyIiwiR0VUIiwiY2FzZXMiLCJmaW5kIiwic29ydCIsImNyZWF0ZWRBdCIsImxpbWl0IiwianNvbiIsInN1Y2Nlc3MiLCJlcnJvciIsImNvbnNvbGUiLCJzdGF0dXMiLCJQT1NUIiwicmVxIiwiYm9keSIsInRpdGxlIiwibGF3eWVyRW1haWwiLCJjbGllbnRFbWFpbCIsIm1lc3NhZ2UiLCJsYXd5ZXJVc2VyIiwiZmluZE9uZSIsImVtYWlsIiwiY2xpZW50VXNlciIsIm5ld0Nhc2UiLCJsYXd5ZXIiLCJmaXJzdE5hbWUiLCJsYXN0TmFtZSIsInVzZXJJZCIsIl9pZCIsInNhdmUiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/cases/route.js\n");

/***/ }),

/***/ "(rsc)/./lib/db.js":
/*!*******************!*\
  !*** ./lib/db.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   connectToDB: () => (/* binding */ connectToDB)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nlet isConnected = false;\nconst connectToDB = async ()=>{\n    if (isConnected) return;\n    try {\n        await mongoose__WEBPACK_IMPORTED_MODULE_0___default().connect(process.env.MONGODB_URI, {\n            dbName: \"legaladvisor\",\n            useNewUrlParser: true,\n            useUnifiedTopology: true\n        });\n        isConnected = true;\n        console.log(\"✅ MongoDB connected\");\n    } catch (err) {\n        console.error(\"❌ MongoDB connection error:\", err);\n    }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvZGIuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQStCO0FBRS9CLElBQUlDLGNBQWM7QUFFWCxNQUFNQyxjQUFjO0lBQ3pCLElBQUlELGFBQWE7SUFFakIsSUFBSTtRQUNGLE1BQU1ELHVEQUFnQixDQUFDSSxRQUFRQyxHQUFHLENBQUNDLFdBQVcsRUFBRTtZQUM5Q0MsUUFBUTtZQUNSQyxpQkFBaUI7WUFDakJDLG9CQUFvQjtRQUN0QjtRQUVBUixjQUFjO1FBQ2RTLFFBQVFDLEdBQUcsQ0FBQztJQUNkLEVBQUUsT0FBT0MsS0FBSztRQUNaRixRQUFRRyxLQUFLLENBQUMsK0JBQStCRDtJQUMvQztBQUNGLEVBQUMiLCJzb3VyY2VzIjpbIkQ6XFxBSS1Qb3dlcmVkLUxlZ2FsLVByb3BlcnR5LUFkdmlzb3JcXGxpYlxcZGIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1vbmdvb3NlIGZyb20gXCJtb25nb29zZVwiXHJcblxyXG5sZXQgaXNDb25uZWN0ZWQgPSBmYWxzZVxyXG5cclxuZXhwb3J0IGNvbnN0IGNvbm5lY3RUb0RCID0gYXN5bmMgKCkgPT4ge1xyXG4gIGlmIChpc0Nvbm5lY3RlZCkgcmV0dXJuXHJcblxyXG4gIHRyeSB7XHJcbiAgICBhd2FpdCBtb25nb29zZS5jb25uZWN0KHByb2Nlc3MuZW52Lk1PTkdPREJfVVJJLCB7XHJcbiAgICAgIGRiTmFtZTogXCJsZWdhbGFkdmlzb3JcIixcclxuICAgICAgdXNlTmV3VXJsUGFyc2VyOiB0cnVlLFxyXG4gICAgICB1c2VVbmlmaWVkVG9wb2xvZ3k6IHRydWUsXHJcbiAgICB9KVxyXG5cclxuICAgIGlzQ29ubmVjdGVkID0gdHJ1ZVxyXG4gICAgY29uc29sZS5sb2coXCLinIUgTW9uZ29EQiBjb25uZWN0ZWRcIilcclxuICB9IGNhdGNoIChlcnIpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoXCLinYwgTW9uZ29EQiBjb25uZWN0aW9uIGVycm9yOlwiLCBlcnIpXHJcbiAgfVxyXG59XHJcbiJdLCJuYW1lcyI6WyJtb25nb29zZSIsImlzQ29ubmVjdGVkIiwiY29ubmVjdFRvREIiLCJjb25uZWN0IiwicHJvY2VzcyIsImVudiIsIk1PTkdPREJfVVJJIiwiZGJOYW1lIiwidXNlTmV3VXJsUGFyc2VyIiwidXNlVW5pZmllZFRvcG9sb2d5IiwiY29uc29sZSIsImxvZyIsImVyciIsImVycm9yIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/db.js\n");

/***/ }),

/***/ "(rsc)/./models/case.js":
/*!************************!*\
  !*** ./models/case.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst CaseSchema = new (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema)({\n    title: String,\n    status: {\n        type: String,\n        default: \"Pending\"\n    },\n    lawyer: String,\n    date: {\n        type: Date,\n        default: Date.now\n    },\n    userId: {\n        type: (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema).Types.ObjectId,\n        ref: \"User\"\n    }\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((mongoose__WEBPACK_IMPORTED_MODULE_0___default().models).Case || mongoose__WEBPACK_IMPORTED_MODULE_0___default().model(\"Case\", CaseSchema));\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9tb2RlbHMvY2FzZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBK0I7QUFFL0IsTUFBTUMsYUFBYSxJQUFJRCx3REFBZSxDQUFDO0lBQ3JDRyxPQUFPQztJQUNQQyxRQUFRO1FBQUVDLE1BQU1GO1FBQVFHLFNBQVM7SUFBVTtJQUMzQ0MsUUFBUUo7SUFDUkssTUFBTTtRQUFFSCxNQUFNSTtRQUFNSCxTQUFTRyxLQUFLQyxHQUFHO0lBQUM7SUFDdENDLFFBQVE7UUFBRU4sTUFBTU4sd0RBQWUsQ0FBQ2EsS0FBSyxDQUFDQyxRQUFRO1FBQUVDLEtBQUs7SUFBTztBQUM5RDtBQUVBLGlFQUFlZix3REFBZSxDQUFDaUIsSUFBSSxJQUFJakIscURBQWMsQ0FBQyxRQUFRQyxXQUFXQSxFQUFBIiwic291cmNlcyI6WyJEOlxcQUktUG93ZXJlZC1MZWdhbC1Qcm9wZXJ0eS1BZHZpc29yXFxtb2RlbHNcXGNhc2UuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1vbmdvb3NlIGZyb20gXCJtb25nb29zZVwiXHJcblxyXG5jb25zdCBDYXNlU2NoZW1hID0gbmV3IG1vbmdvb3NlLlNjaGVtYSh7XHJcbiAgdGl0bGU6IFN0cmluZyxcclxuICBzdGF0dXM6IHsgdHlwZTogU3RyaW5nLCBkZWZhdWx0OiBcIlBlbmRpbmdcIiB9LFxyXG4gIGxhd3llcjogU3RyaW5nLFxyXG4gIGRhdGU6IHsgdHlwZTogRGF0ZSwgZGVmYXVsdDogRGF0ZS5ub3cgfSxcclxuICB1c2VySWQ6IHsgdHlwZTogbW9uZ29vc2UuU2NoZW1hLlR5cGVzLk9iamVjdElkLCByZWY6IFwiVXNlclwiIH0sXHJcbn0pXHJcblxyXG5leHBvcnQgZGVmYXVsdCBtb25nb29zZS5tb2RlbHMuQ2FzZSB8fCBtb25nb29zZS5tb2RlbChcIkNhc2VcIiwgQ2FzZVNjaGVtYSlcclxuIl0sIm5hbWVzIjpbIm1vbmdvb3NlIiwiQ2FzZVNjaGVtYSIsIlNjaGVtYSIsInRpdGxlIiwiU3RyaW5nIiwic3RhdHVzIiwidHlwZSIsImRlZmF1bHQiLCJsYXd5ZXIiLCJkYXRlIiwiRGF0ZSIsIm5vdyIsInVzZXJJZCIsIlR5cGVzIiwiT2JqZWN0SWQiLCJyZWYiLCJtb2RlbHMiLCJDYXNlIiwibW9kZWwiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./models/case.js\n");

/***/ }),

/***/ "(rsc)/./models/user.js":
/*!************************!*\
  !*** ./models/user.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   User: () => (/* binding */ User)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst UserSchema = new (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema)({\n    firstName: {\n        type: String,\n        required: true\n    },\n    lastName: {\n        type: String,\n        required: true\n    },\n    email: {\n        type: String,\n        required: true,\n        unique: true\n    },\n    password: {\n        type: String,\n        required: true\n    },\n    userType: {\n        type: String,\n        enum: [\n            \"client\",\n            \"lawyer\"\n        ],\n        required: true\n    },\n    specialization: {\n        type: String,\n        default: \"property\"\n    },\n    image: {\n        type: String\n    },\n    location: {\n        type: String\n    },\n    bio: {\n        type: String\n    },\n    verified: {\n        type: Boolean,\n        default: false\n    },\n    sessionRate: {\n        type: Number,\n        default: 50\n    },\n    availableSlots: {\n        type: Map,\n        of: [\n            String\n        ],\n        default: {}\n    }\n}, {\n    timestamps: true\n});\nconst User = (mongoose__WEBPACK_IMPORTED_MODULE_0___default().models).User || mongoose__WEBPACK_IMPORTED_MODULE_0___default().model(\"User\", UserSchema);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9tb2RlbHMvdXNlci5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBK0I7QUFFL0IsTUFBTUMsYUFBYSxJQUFJRCx3REFBZSxDQUFDO0lBQ3JDRyxXQUFXO1FBQUVDLE1BQU1DO1FBQVFDLFVBQVU7SUFBSztJQUMxQ0MsVUFBVztRQUFFSCxNQUFNQztRQUFRQyxVQUFVO0lBQUs7SUFDMUNFLE9BQVc7UUFBRUosTUFBTUM7UUFBUUMsVUFBVTtRQUFNRyxRQUFRO0lBQUs7SUFDeERDLFVBQVc7UUFBRU4sTUFBTUM7UUFBUUMsVUFBVTtJQUFLO0lBQzFDSyxVQUFXO1FBQUVQLE1BQU1DO1FBQVFPLE1BQU07WUFBQztZQUFVO1NBQVM7UUFBRU4sVUFBVTtJQUFLO0lBQ3RFTyxnQkFBZ0I7UUFBRVQsTUFBTUM7UUFBUVMsU0FBUztJQUFXO0lBQ3BEQyxPQUFXO1FBQUVYLE1BQU1DO0lBQU87SUFDMUJXLFVBQVc7UUFBRVosTUFBTUM7SUFBTztJQUMxQlksS0FBVztRQUFFYixNQUFNQztJQUFPO0lBQzFCYSxVQUFXO1FBQUVkLE1BQU1lO1FBQVNMLFNBQVM7SUFBTTtJQUMzQ00sYUFBYTtRQUFFaEIsTUFBTWlCO1FBQVFQLFNBQVM7SUFBRztJQUN6Q1EsZ0JBQWdCO1FBQ2RsQixNQUFNbUI7UUFDTkMsSUFBSTtZQUFDbkI7U0FBTztRQUNaUyxTQUFTLENBQUM7SUFDWjtBQUNGLEdBQUc7SUFBRVcsWUFBWTtBQUFLO0FBRWYsTUFBTUMsT0FBTzFCLHdEQUFlLENBQUMwQixJQUFJLElBQUkxQixxREFBYyxDQUFDLFFBQVFDLFlBQVciLCJzb3VyY2VzIjpbIkQ6XFxBSS1Qb3dlcmVkLUxlZ2FsLVByb3BlcnR5LUFkdmlzb3JcXG1vZGVsc1xcdXNlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbW9uZ29vc2UgZnJvbSBcIm1vbmdvb3NlXCJcclxuXHJcbmNvbnN0IFVzZXJTY2hlbWEgPSBuZXcgbW9uZ29vc2UuU2NoZW1hKHtcclxuICBmaXJzdE5hbWU6IHsgdHlwZTogU3RyaW5nLCByZXF1aXJlZDogdHJ1ZSB9LFxyXG4gIGxhc3ROYW1lOiAgeyB0eXBlOiBTdHJpbmcsIHJlcXVpcmVkOiB0cnVlIH0sXHJcbiAgZW1haWw6ICAgICB7IHR5cGU6IFN0cmluZywgcmVxdWlyZWQ6IHRydWUsIHVuaXF1ZTogdHJ1ZSB9LFxyXG4gIHBhc3N3b3JkOiAgeyB0eXBlOiBTdHJpbmcsIHJlcXVpcmVkOiB0cnVlIH0sXHJcbiAgdXNlclR5cGU6ICB7IHR5cGU6IFN0cmluZywgZW51bTogW1wiY2xpZW50XCIsIFwibGF3eWVyXCJdLCByZXF1aXJlZDogdHJ1ZSB9LFxyXG4gIHNwZWNpYWxpemF0aW9uOiB7IHR5cGU6IFN0cmluZywgZGVmYXVsdDogXCJwcm9wZXJ0eVwiIH0sXHJcbiAgaW1hZ2U6ICAgICB7IHR5cGU6IFN0cmluZyB9LFxyXG4gIGxvY2F0aW9uOiAgeyB0eXBlOiBTdHJpbmcgfSxcclxuICBiaW86ICAgICAgIHsgdHlwZTogU3RyaW5nIH0sXHJcbiAgdmVyaWZpZWQ6ICB7IHR5cGU6IEJvb2xlYW4sIGRlZmF1bHQ6IGZhbHNlIH0sXHJcbiAgc2Vzc2lvblJhdGU6IHsgdHlwZTogTnVtYmVyLCBkZWZhdWx0OiA1MCB9LFxyXG4gIGF2YWlsYWJsZVNsb3RzOiB7XHJcbiAgICB0eXBlOiBNYXAsXHJcbiAgICBvZjogW1N0cmluZ10sXHJcbiAgICBkZWZhdWx0OiB7fSxcclxuICB9LFxyXG59LCB7IHRpbWVzdGFtcHM6IHRydWUgfSlcclxuXHJcbmV4cG9ydCBjb25zdCBVc2VyID0gbW9uZ29vc2UubW9kZWxzLlVzZXIgfHwgbW9uZ29vc2UubW9kZWwoXCJVc2VyXCIsIFVzZXJTY2hlbWEpXHJcbiJdLCJuYW1lcyI6WyJtb25nb29zZSIsIlVzZXJTY2hlbWEiLCJTY2hlbWEiLCJmaXJzdE5hbWUiLCJ0eXBlIiwiU3RyaW5nIiwicmVxdWlyZWQiLCJsYXN0TmFtZSIsImVtYWlsIiwidW5pcXVlIiwicGFzc3dvcmQiLCJ1c2VyVHlwZSIsImVudW0iLCJzcGVjaWFsaXphdGlvbiIsImRlZmF1bHQiLCJpbWFnZSIsImxvY2F0aW9uIiwiYmlvIiwidmVyaWZpZWQiLCJCb29sZWFuIiwic2Vzc2lvblJhdGUiLCJOdW1iZXIiLCJhdmFpbGFibGVTbG90cyIsIk1hcCIsIm9mIiwidGltZXN0YW1wcyIsIlVzZXIiLCJtb2RlbHMiLCJtb2RlbCJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./models/user.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fcases%2Froute&page=%2Fapi%2Fcases%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcases%2Froute.js&appDir=D%3A%5CAI-Powered-Legal-Property-Advisor%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5CAI-Powered-Legal-Property-Advisor&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fcases%2Froute&page=%2Fapi%2Fcases%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcases%2Froute.js&appDir=D%3A%5CAI-Powered-Legal-Property-Advisor%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5CAI-Powered-Legal-Property-Advisor&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var D_AI_Powered_Legal_Property_Advisor_app_api_cases_route_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/cases/route.js */ \"(rsc)/./app/api/cases/route.js\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/cases/route\",\n        pathname: \"/api/cases\",\n        filename: \"route\",\n        bundlePath: \"app/api/cases/route\"\n    },\n    resolvedPagePath: \"D:\\\\AI-Powered-Legal-Property-Advisor\\\\app\\\\api\\\\cases\\\\route.js\",\n    nextConfigOutput,\n    userland: D_AI_Powered_Legal_Property_Advisor_app_api_cases_route_js__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZjYXNlcyUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGY2FzZXMlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZjYXNlcyUyRnJvdXRlLmpzJmFwcERpcj1EJTNBJTVDQUktUG93ZXJlZC1MZWdhbC1Qcm9wZXJ0eS1BZHZpc29yJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1EJTNBJTVDQUktUG93ZXJlZC1MZWdhbC1Qcm9wZXJ0eS1BZHZpc29yJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUNnQjtBQUM3RjtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiRDpcXFxcQUktUG93ZXJlZC1MZWdhbC1Qcm9wZXJ0eS1BZHZpc29yXFxcXGFwcFxcXFxhcGlcXFxcY2FzZXNcXFxccm91dGUuanNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL2Nhc2VzL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvY2FzZXNcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2Nhc2VzL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiRDpcXFxcQUktUG93ZXJlZC1MZWdhbC1Qcm9wZXJ0eS1BZHZpc29yXFxcXGFwcFxcXFxhcGlcXFxcY2FzZXNcXFxccm91dGUuanNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICB3b3JrQXN5bmNTdG9yYWdlLFxuICAgICAgICB3b3JrVW5pdEFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fcases%2Froute&page=%2Fapi%2Fcases%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcases%2Froute.js&appDir=D%3A%5CAI-Powered-Legal-Property-Advisor%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5CAI-Powered-Legal-Property-Advisor&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@opentelemetry"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fcases%2Froute&page=%2Fapi%2Fcases%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcases%2Froute.js&appDir=D%3A%5CAI-Powered-Legal-Property-Advisor%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5CAI-Powered-Legal-Property-Advisor&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();