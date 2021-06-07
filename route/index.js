import client from '../database/index.js';

const getUsers = async(req, res)=> {
try{
  const response =  await client.query('SELECT * FROM student_table ORDER BY id ASC')
  if (response){
      res.status(200).json(response.rows)
  }
}
catch(error){
    console.log(`An error occured`)
}
};

const getUsersId = async(req, res)=> {
    
    try{
        const id = parseInt(req.params.id)
      const response =  await client.query('SELECT * FROM student_table WHERE id=$1', [id])
    //   const match = response.rows.find( ({id}) => id == id)
      if (response.rows == ""){
        res.status(404).send('No data for selected User')   
        }
      else{
        res.status(200).json(response.rows)   
        }
      
    }
    
    catch(error){
        console.log(`An error occured`)
    }
    };


const postUsers = async (req, res) =>{
    
    try{
      const {id, name, email} = req.body
      const response =  await client.query('INSERT INTO student_table (id, name, email )VALUES ($1, $2, $3) RETURNING *', [id, name, email])
       if(response){
           res.status(200).json({users: response.rows})
          //  const save = response.rows
          //  console.log(save)
       }
    }
    catch(error){
        console.log(`Error`)
    }

};



const putUsers = async(req, res)=> {
    const id = parseInt(req.params.id)
    const {name, email} = req.body
    try{
      const response=  await client.query('UPDATE student_table SET name=$1, email=$2  WHERE id=$3  RETURNING *', [name, email, id])
      if (response.rows ==""){
        res.status(404).send('User does not exist') 
  
      }
      else{
        res.status(200).json(response.rows) 
      }

    }
    
    catch(error){
        console.log(error)
    }
    };


const deleteUsers = async(req, res)=> {
    const id = parseInt(req.params.id)

        try{
          const response=  await client.query('DELETE FROM student_table where id=$1 RETURNING *', [id])
          if (response.rows == ""){
            res.status(404).send(`User with id No:${id} does not exist`)
          }
          else{
            res.status(200).json({"Message" : `User with id:${id} has been deleted`,
             "Record": response.rows})
          }
        }
        
        catch(error){
            console.log(error)
        }
 };

export {getUsers, getUsersId, postUsers, putUsers, deleteUsers}