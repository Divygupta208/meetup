import MeetupDetails from "@/components/meetups/MeetupDetails";
import { MongoClient, ObjectId } from "mongodb";
import { useRouter } from "next/router";

const DUMMY_MEETUP = [
  {
    id: "m1",
    title: "First Meetup",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRry0ry_CmK1oRDQhvU1siSpeAXmE_gQ_qE6-H529oMiw&s",
    address: "Some Address 1",
    description: "a dummy meetup ",
  },
  {
    id: "m2",
    title: "Second Meetup",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ__gWPNIJI6if9d0bJUNpowkajy93ZMmD91osVjl6xd1zXOKb4j9aJpRW8lEHJcDqCUlA&usqp=CAU",
    address: "Some Address 2",
    description: "a dummy meetup ",
  },
  {
    id: "m3",
    title: "Third Meetup",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7Ciyh_YInleOdQPaGX_nU0xLazBplHl3h5GUwCBH--g&s",
    address: "Some Address 3",
    description: "a dummy meetup ",
  },
];

const page = (props) => {
  return (
    <div>
      <MeetupDetails
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </div>
  );
};

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://divygupta208:Od3ZfMtHifvrEy4g@cluster0.wq9srs7.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  console.log(meetupId);

  const client = await MongoClient.connect(
    "mongodb+srv://divygupta208:Od3ZfMtHifvrEy4g@cluster0.wq9srs7.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const selectedMeetup = await meetupsCollection.findOne({
    _id: new ObjectId(meetupId),
  });

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        image: selectedMeetup.image,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
      },
    },
  };
}

export default page;
