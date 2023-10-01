import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import HourWeather from "../HourWeather/HourWeather";
import DailyWeather from "../dailyWeather/DailyWeather";
import axios from "axios";
import "./Home.css";
import clear from "../Assets/clear.jpg";
import sunny from "../Assets/sunny.jpg";
import rainy from "../Assets/rainy.jpg";
import videoData from "../Assets/bgc.mp4";
import videoDataMorning from "../Assets/bgc2.mp4";
import { useEffect, useState } from "react";
export default function Home() {
  const date = new Date();
  let today = date.toUTCString().split(",")[0];
  const [bodybg, setbodybg] = useState(
    "https://www.pexels.com/photo/the-front-view-of-abu-al-abbas-mosque-in-alexandria-egypt-9824461/"
  );
  const [allDataForDay, setAllDay] = useState([]);
  const [weekData, setweekData] = useState([]);
  const [locationData, setLocationData] = useState({
    currentLocation: "",
    localtime: "",
    condition: "",
    maxtemp: "",
    mintemp: "",
    temp: "",
  });
  async function getDataApi(location = "Alexandria") {
    let found = true;
    let response = await axios
      .get(
        `https://api.weatherapi.com/v1/forecast.json?key=ac6361c16d014b41b20161157232709&q=${location}&days=7&aqi=no&alerts=yes`
      )
      .catch((error) => {
        found = false;
      });
    if (found) {
      let locationName = response.data.location.name;
      let currentTime = response.data.forecast.forecastday[0].date;
      let condition = response.data.current.condition.text;
      let temp = response.data.current.temp_c;
      let infos = response.data.forecast.forecastday[0].hour;
      let maxtemp = response.data.forecast.forecastday[0].day.maxtemp_c;
      let mintemp = response.data.forecast.forecastday[0].day.mintemp_c;
      let weekinfo = response.data.forecast.forecastday;
      setAllDay([...infos]);
      setLocationData({
        currentLocation: locationName,
        localtime: currentTime,
        condition,
        maxtemp,
        mintemp,
        temp,
      });
      backGroundImg(condition);
      setweekData([...weekinfo]);
    }
  }
  async function bgApi(location = "Alexandria") {
    let found = true;
    await axios
      .get(
        `https://api.pexels.com/v1/search/?page=1&per_page=2&query=${location}`,
        {
          headers: {
            Authorization:
              "dduIdgcxtb3X1K3WIllsexAvLU7spJTVWdd9ec9jbk2ii7qqWNQkCnBX",
          },
        }
      )
      .then((response) => {
        setbodybg(response.data.photos[1].src.original);
      })
      .catch((error) => {
       console.log(error)
      });
  }
  useEffect(() => {
    getDataApi();
    bgApi();
  }, []);

  function findYourSeach(e) {
    if (e.target.value.length >= 3) {
      getDataApi(e.target.value);
      bgApi(e.target.value);
    } else if (e.target.value.length == 0) {
      getDataApi("Alexandria");
    }
  }

  let [bgi, setbgi] = useState("");
  function backGroundImg(condition) {
    if (condition == "Sunny") {
      setbgi(sunny);
    } else if (condition == "Rainy" || condition == "Light rain shower") {
      setbgi(rainy);
    } else {
      setbgi(clear);
    }
  }

  return (
    <>
      <img src={bgi} className="bodybg" alt="background" />
      <Container fluid className="px-3 py-2 wrapperContainer ">
        <div
          className="weatherWrapper p-3  rounded-4 d-flex justify-content-center flex-column align-items-center"
          style={{ backgroundImage: `url(${bodybg})` }}
        >
          <Form.Control
            className="w-50"
            type="text"
            id="searchLocation"
            placeholder="WriteYourLocation"
            onChange={findYourSeach}
          />
          <Row className="align-items-center w-75  mt-2 gap-3">
            <Col>
              <h2 className="text-dark text-end">
                {locationData.currentLocation}
              </h2>
            </Col>
            <Col>
              <h6 className="text-dark text-center">
                {locationData.localtime}
              </h6>
            </Col>
          </Row>
          <Row className="align-items-center w-75 mt-2">
            <Col>
              <h4 className="text-dark text-end"> {locationData.condition}</h4>
            </Col>
            <Col>
              <h2 className="text-dark text-center">
                {locationData.temp}
                <sup>&#9900;</sup>
              </h2>
            </Col>
          </Row>
          <Row className="align-items-center w-75 mt-2">
            <Col>
              <h5 className="text-dark m-0 text-end">{today}</h5>
            </Col>
            <Col>
              <h4 className="text-dark text-center">
                {locationData.maxtemp}
                <sup>&#9900;</sup>/{locationData.mintemp}
                <sup>&#9900;</sup>
              </h4>
            </Col>
          </Row>
          <div className="dayDataParent">
            <div className="dayData   d-flex justify-content-start align-items-center gap-3 ">
              {allDataForDay.map((ele, ind) => (
                <HourWeather
                  key={ind}
                  temp={ele.temp_c}
                  icon={ele.condition.icon}
                  timing={ele.time.split(" ")[1]}
                />
              ))}
            </div>
          </div>
          <div className="dayDatatwo p-3  flex-column d-flex justify-content-center align-items-center gap-3 ">
            {weekData.map((ele, ind) => (
              <DailyWeather
                key={ind}
                icon={ele.day.condition.icon}
                date={ele.date.split("2023-")[1]}
                maxtemp={ele.day.maxtemp_c}
                mintemp={ele.day.mintemp_c}
              />
            ))}
          </div>
        </div>
      </Container>
    </>
  );
}
