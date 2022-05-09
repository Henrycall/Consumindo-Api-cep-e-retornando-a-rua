const express = require('express')
const app = express()
var axios = require('axios');

app.listen(80, ()=> console.log("servidor rodando na porta 80"))

app.get('/local/:numberLocal', async (req,res) => {

try {
        const request = {
            method: 'get',
            url: `http://viacep.com.br/ws/${req.params.numberLocal}/json/`,
            headers: {"Content-Type":"application/json"}
        };

   const response =  await axios(request)
    res.status(200).json(response.data)
    
} catch (error) {
    res.status(400).json(error)
}

})


