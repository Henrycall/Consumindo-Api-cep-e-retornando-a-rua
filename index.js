const express = require('express')
const app = express()
var axios = require('axios');
require('dotenv').config()

app.listen(80, ()=> console.log("servidor rodando na porta 80"))



async function getcep(LatitudeAndAltitude){
    try {
        const request = {

                method: 'get',
                url: `https://maps.googleapis.com/maps/api/geocode/json?address=${LatitudeAndAltitude}&key=${process.env.SEU_TOKEN_SAFADO}`,
                headers: {"Content-Type":"application/json"}
    
        }
        const response =  await axios(request)
        return response

    } catch (error) {
        console.log(error)
    }

}

app.get('/local/:numberLocal', async (req,res) => {
 
try {
    const data = await getcep(req.params.numberLocal)
        const request = {
            method: 'get',
            url: `http://viacep.com.br/ws/${data.data.results[0].address_components[6].long_name}/json/`,
            headers: {"Content-Type":"application/json"}
        };

   const response =  await axios(request)
    res.status(200).json(response.data.logradouro)
    
} catch (error) {
    res.status(400).json(error)
}

})



    

