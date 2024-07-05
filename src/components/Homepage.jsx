import { Card, CardBody, CardText } from "react-bootstrap";
import Search from "./Search";

const Homepage = () => {
  return (
    <>
      <Search />
      <div id="homepage">
        <h3>Monday, 5th june</h3>
        <div>30°</div>
        <h2>Rome, Italy</h2>
      </div>
      <div id="homeCard">
        <Card>
          <CardBody>
            <CardText>
              <h1>01:00</h1>
              <div>PM</div>
            </CardText>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <CardText>
              <h1>01:00</h1>
              <div>PM</div>
            </CardText>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <CardText>
              <h1>01:00</h1>
              <div>PM</div>
            </CardText>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <CardText>
              <h1>01:00</h1>
              <div>PM</div>
            </CardText>
          </CardBody>
        </Card>
      </div>
    </>
  );
};
export default Homepage;
