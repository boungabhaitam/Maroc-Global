import moment from "moment";

let lastdate = moment(new Date()).subtract(3, 'days').format("YYYY-MM-DD")



export const getTopicNews = (topic) => {
    const url = 'https://newsapi.org/v2/top-headlines?country=ma&category=' + topic + '&pageSize=100'
    return fetch(
        url, {
        headers: {
            'X-Api-Key': 'af80e8ba112846d5a6e0c08355ed3e2f'
        }
    })
        .then((response) => response.json())
        .catch((error) => console.error(error))
}

export const getSearched = (searched, date = lastdate) => {
    const url = 'https://newsapi.org/v2/everything?sortBy=publishedAt&from=' + date + '&language=fr&qInTitle=' + searched + '&pageSize=100'
    return fetch(
        url, {
        headers: {
            'X-Api-Key': 'af80e8ba112846d5a6e0c08355ed3e2f'
        }
    })
        .then((response) => response.json())
        .catch((error) => console.error(error))
}
