import http from "node:http";
import { getDataFromDB } from "./Database/db.js";
import { sendJsonResponse } from "./Utils/sendJsonResponse.js";
import { getDataByPathParam } from "./Utils/getDataByPathParam.js";
import { getDataByQueryParam } from "./Utils/getDataByQueryParam.js";

const server = http.createServer(async (req, res) => {
  const destinations = await getDataFromDB();

  const urlObj = new URL(req.url, `http://${req.headers.host}`);
  const queryObj = Object.fromEntries(urlObj.searchParams);
  console.log(queryObj);

  if (urlObj.pathname === "/api" && req.method === "GET") {

    let filterData = getDataByQueryParam(destinations, queryObj);
    sendJsonResponse(res, 200, filterData)

  } else if (req.url.startsWith("/api/continent") && req.method === "GET") {

    const continent = req.url.split("/").pop();
    const filterData = getDataByPathParam(destinations, "continent", continent);
    sendJsonResponse(res, 200, filterData)

  } else if (req.url.startsWith("/api/country") && req.method === "GET") {

    const country = req.url.split("/").pop()
    const filterData = getDataByPathParam(destinations, "country", country);
    sendJsonResponse(res, 200, filterData)

  } else {
    
    sendJsonResponse(res, 404, {
      error: "not found",
      message: "The path does not exist",

    })
  }
})

const PORT = 8000;

server.listen(
  PORT,
  console.log(`Open the server created by you: http://localhost:${PORT}`)
);
