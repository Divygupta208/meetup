import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      "mongodb+srv://divygupta208:Od3ZfMtHifvrEy4g@cluster0.wq9srs7.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0"
    );

    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({ message: "Inserted" });
  }

  if (req.method === "GET") {
    const client = await MongoClient.connect(
      "mongodb+srv://divygupta208:Od3ZfMtHifvrEy4g@cluster0.wq9srs7.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0"
    );

    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    const meetups = await meetupsCollection.find().toArray();

    client.close();

    res.status(200).json({ meetups: meetups });
  }
}
