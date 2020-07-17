import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

export const fetchData = async (country) => {
    let changeableUrl = url;
    if(country){
        changeableUrl = `${url}/countries/${country}`;
    }
    try {
        const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(changeableUrl);
        return { confirmed, recovered, deaths, lastUpdate }

    } catch (error) {
        console.log(error);
    }
}
export const fetchDailyData = async ()=>{
    try{
        const { data } = await axios.get(`${url}/daily`);
        const mofifiedData = data.map((dailyData) => ({
            confirmed:dailyData.confirmed.total,
            deaths:dailyData.deaths.total,
            date:dailyData.reportDate,

        }))
        return mofifiedData;

    }catch(error){
        console.log('error');
    }
}

export const fetchCountries = async () =>{
    try{
        const {data:{countries}} = await axios.get(`${url}/countries`);
        
        return countries.map((country) => country.name); 
        ///console.log(response);
        
    }catch(error){
        console.log(error)
    }
}