import axios from "axios"

const BASE_URL = "https://pixabay.com/api/"
const key ="29687469-185e21ec909e9e554b48eb4d8"
export default async function getImg(query, page = 1){
try{
    const res = await axios(`${BASE_URL}?key=${key}&&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`)
    // return await axios(`${BASE_URL}?key=${key}&&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`)
 return res.data
}catch(err){
    console.log(err)

}
}

