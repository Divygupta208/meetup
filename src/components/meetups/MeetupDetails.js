import Card from "../ui/Card";
import classes from "./MeetupItem.module.css";
const MeetupDetails = ({ meetup }) => {
  return (
    <Card>
      <div className={classes.image}>
        <img src={meetup.image} alt={meetup.title} />
      </div>
      <div className={classes.content}>
        <h3>{meetup.title}</h3>
        <address>{meetup.address}</address>
      </div>
    </Card>
  );
};

export default MeetupDetails;
