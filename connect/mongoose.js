import mongoose from 'mongoose';

export default (db_url)=>{
    mongoose.connect(db_url +'/job-portal')
    .then(()=>console.log("db connected " + db_url))
    .catch(()=>console.log("db not connected " + db_url))
}