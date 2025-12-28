import http from 'node:http'
import { getDataFromDB } from './db.js'
import { dryer } from './dryer.js'
import { getDataByPathParam } from './getDataByPathParam.js'
import { getDataByQueryParam } from './getDataByQueryParam.js'

const server = http.createServer(async (req, res) => {
    const destinations = await getDataFromDB()


    const urlObj = new URL(req.url, `http://${req.headers.host}`)
    const queryObj = Object.fromEntries(urlObj.searchParams)
    console.log(queryObj)

    if(urlObj.pathname === '/api' && req.method === "GET") {    
        let filterData = getDataByQueryParam(destinations, queryObj)
        dryer(res, 200, filterData)

    } else if(req.url.startsWith("/api/continent") && req.method === "GET"){

        const continent = req.url.split('/').pop()
        const filterData = getDataByPathParam(destinations, 'continent', continent)
        dryer(res, 200, filterData)

    }else if(req.url.startsWith("/api/country") && req.method === "GET"){

        const country = req.url.split('/').pop()
        const filterData = getDataByPathParam(destinations, 'country', country)
        dryer(res, 200, filterData)

    } else {
        dryer(res, 404, ({
            error: "not found", 
            message: "The path does not exist"
        })
        )
    }
})

const PORT = 8000

server.listen(PORT, console.log(`Open the server created by you: http://localhost:${PORT}`))

