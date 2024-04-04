import Card from "../ui/Card";
import classes from "./MeetupItem.module.css";
const MeetupDetails = ({ title, image, description, address }) => {
  return (
    <Card>
      <div className={classes.image}>
        <img src={image} alt={title} />
      </div>
      <div className={classes.content}>
        <h3>{title}</h3>
        <address>{address}</address>
      </div>
    </Card>
  );
};

export default MeetupDetails;
