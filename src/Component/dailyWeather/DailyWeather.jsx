import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./DailyWeather.css";
export default function DailyWeather(props) {
//   console.log(props);
  return (
    <Container
      className="d-flex justify-content-center align-items-center   "
      fluid
    >
      <Row className=" dailyData p-2 w-100 align-items-center justify-content-between">
        <Col className='text-center'>{props.date}</Col>
        <Col className="text-center">
          {" "}
          <span>
            <img src={props.icon} style={{width:'45px',height:'45px'}} />
          </span>{" "}
         
        </Col>
        <Col className="text-center">
          <span>
            {props.maxtemp}<sup>&#9900;</sup>/{props.mintemp}<sup>&#9900;</sup>
          </span>{" "}
        </Col>
      </Row>
    </Container>
  );
}
