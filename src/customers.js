import connect from './connect.js'
const customerCollection = connect().collection("customers");

export const createCustomer = async (customer) => {
    try {
        const result = await customerCollection.add(customer)
        customer.id = result.id
        return customer
    } catch (error) {
        console.error(error)
        
    }
}


export const getCustomerById = async id => {
    try {
      const result = await customerCollection.doc(id).get()
      return {
        id: result.id, 
        ...result.data()
      }
    }catch (error){
      console.error(error)
    }
  }


  export const getCustomerByFilter = async customerFilter => {

    if(!customerFilter){
      customerFilter = {}
  }
    const { name, telephone, address, classe, type} = customerFilter


    let query = customerCollection // this is a copy of the animalCollection in the top of animal.js (line 2)

   
    if (name){
        query = query.where("name", "==", name)
    
    }
    if (telephone){
        query = query.where("telephone", "==", telephone)
    }
    if ( address){
        query = query.where("address", "==", address)
    }
    if (classe){
        query = query.where("classe", "==", classe)
    }
    if(type){
        query = query.where("type","==", type)
    }
    try {
        const snapshot = await query.get()
        const result = snapshot.docs.map((doc) => {
            const customer = doc.data();
            customer.id = doc.id;
            return customer;
          });
      
          return result;


    } catch (error) {
        console.error(error)
    }
}