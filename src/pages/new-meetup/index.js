import NewMeetupForm from "@/components/meetups/NewMeetupForm";

const page = () => {
  const addMeetUpHandler = () => {};

  return (
    <div>
      <NewMeetupForm onAddMeetup={addMeetUpHandler} />
    </div>
  );
};

export default page;
