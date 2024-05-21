import { MongoClient } from "mongodb";

const connectionUrl="mongodb+srv://admin-mani:0ai8Qvny939dH9zv@cluster0.jt7hdhv.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(connectionUrl);
async function connectDatabase(){
    try{
        await client.connect();
        console.log("MongoDb Connected Successfully!");
    }
    catch(error){
        console.log("Error while COnnecting...", error);
    }
}

export {connectDatabase, client};
