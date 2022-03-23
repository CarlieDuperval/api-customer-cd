import express from 'express'

import { createCustomer, getCustomerById, getCustomerByFilter } from './src/customers.js'
const app = express()
app.use(express.json())


app.post('/customers', async (req, res) => {
    const customer = req.body
    try {
        const result = await createCustomer(customer)
        res.status(200).send(result)
    } catch (error) {
        res.status(500).send(error)
        
    }


})


app.get('/customers/:id', async (req, res) => {
    try{
        const { id } = req.params
        const result = await getCustomerById(id)
        res.status(200).send(result)
    
    }catch (error){
        res.status(500).send(error)// console.error(error)
    }
})



app.get('/customers', async (req, res) => {
    const { name, telephone, address, classe, type} = req.query
  
    const filter = { name, telephone, address, classe, type}

    try {
      //  const result = await getAnimalById()
        const result = await getCustomerByFilter(filter)
        res.status(200).send(result)
     } catch (error) {
         console.error(error)
         res.status(500).send(error)
        }
    //res.send('cust')

})




const port = 5700
app.listen(port,() => {
    console.log(`We are listening at port ${port}`)
})