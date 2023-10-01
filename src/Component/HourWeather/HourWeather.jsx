import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import './hourWeather.css'
export default function HourWeather(props) {
    return (
      <Container className="d-flex justify-content-center align-items-center  ">
       <Row className='hourInfo p-2 flex-column align-items-center justify-content-center'>
        <Col className='text-center'>{props.timing}</Col>
        <Col className='text-center rounded-circle'><img  src={props.icon} style={{width:'45px',height:'45px'}}/></Col>
        <Col className='text-center'><span className="celcsius ">{props.temp}<sup>&#9900;</sup></span></Col>
       </Row>
      </Container>
    );
  }