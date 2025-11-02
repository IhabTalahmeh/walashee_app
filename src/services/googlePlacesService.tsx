import axios from "axios"

const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;

export const searchPlaces = async (keyword: string) => {
    return await axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${GOOGLE_PLACES_API_KEY}&input=${keyword}`);
}