import MeetupList from "@/components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";

export default function Home(props) {
  const fetchMeetups = async () => {
    const response = await fetch("/api/new-meetup");

    const data = await response.json();

    console.log(data);
  };

  return (
    <>
      <Head>
        <title>Meetup App</title>
      </Head>
      <MeetupList meetups={props.meetups} />
      <button onClick={fetchMeetups}>Fetch</button>
    </>
  );
}

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://divygupta208:Od3ZfMtHifvrEy4g@cluster0.wq9srs7.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  // const res = await fetch("/api/new-meetup");

  // const meetups = await res.json();

  console.log(meetups);
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

// export async function getServerSideProps() {
//   const res = await fetch("/api/new-meetup");

//   const meetups = await res.json();

//   console.log(meetups);
// }
