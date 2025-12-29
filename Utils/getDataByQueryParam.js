export const getDataByQueryParam = (data, queryObj) => {

    const {continent, country, is_open_to_public, limit} = queryObj

    let filteredData = data

    if (continent) {
        filteredData = filteredData.filter(destination => 
            destination.continent.toLowerCase() === continent.toLowerCase()
        )
    }

    if (country) {
        filteredData = filteredData.filter(destination => 
            destination.country.toLowerCase() === country.toLowerCase()
        )
    }

    if (is_open_to_public) {
        filteredData = filteredData.filter(destination => 
             destination.is_open_to_public === JSON.parse(is_open_to_public.toLowerCase())
            
        )
    } 

    if (limit && parseInt(limit) > 0) {
         filteredData = filteredData.slice(0, parseInt(limit));
  }
  return filteredData
}