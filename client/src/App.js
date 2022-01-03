import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import "./App.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Select from "react-select";
import HeaderChart from "./components/HeaderChart";
import "./components/HeaderChart.css";

function App() {
  const [obj, setObj] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const todayDate = format(new Date(), "dd-MM-yyyy");

  const options = [
    { value: "fruits", label: "Fruits" },
    { value: "vegetables", label: "Vegetables" },
  ];
  const [inputName, setInputName] = useState("");
  let fruitObj = [];
  let vegetableObj = [];
  let apple = 0,
    banana = 0,
    orange = 0,
    grapes = 0,
    cauliflower = 0,
    ladyfinger = 0,
    onions = 0,
    potatoes = 0,
    tomatoes = 0;

  let [fruits, setFruits] = useState([]);
  const [updated, setUpdated] = useState(1);
  let [vegetables, setVegetables] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [dateVisible, setDateVisible] = useState(false);
  const [startDate, setStartDate] = useState(new Date("2021-01-21"));
  const [endDate, setEndDate] = useState(new Date());

  const onInputChange = (e) => {
    const newInput = e.target.value;
    setInputName(newInput);
  };

  const onVisibleChange = (e) => {
    setDateVisible(!dateVisible);
  };

  const onStartDateChange = (d) => {
    setStartDate(new Date(d));
  };

  const onEndDateChange = (d) => {
    setEndDate(d);
  };

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const makeFruitsTable = () => {
    setTotalCost(0);
    let ts = 0;
    const table = document.getElementById("table-body");
    table.innerHTML = "";
    fruitObj.forEach((fruit) => {
      const name = fruit.name;

      if (name.indexOf(inputName.toLowerCase()) !== -1 || inputName === "") {
        ts = ts + fruit.price;
        let row = "<tr>";
        for (let key in fruit) {
          row = row + `<td>${fruit[key]}</td>`;
        }
        row = row + "</tr>";
        table.innerHTML += row;
      }
    });
    setTotalCost(ts);
  };
  const makeVegetablesTable = () => {
    setTotalCost(0);
    let ts = 0;
    const table = document.getElementById("table-body");
    table.innerHTML = "";
    vegetableObj.forEach((vegetable) => {
      const name = vegetable.name;
      if (name.indexOf(inputName.toLowerCase()) !== -1 || inputName === "") {
        ts = ts + vegetable.price;
        let row = "<tr>";
        for (let key in vegetable) {
          row = row + `<td>${vegetable[key]}</td>`;
        }
        row = row + "</tr>";
        table.innerHTML += row;
      }
    });
    setTotalCost(ts);
  };

  const findSelectedData = async (e) => {
    e.preventDefault();

    let startDay = startDate.setHours(0, 0, 0, 0);
    let endDay = endDate.setHours(0, 0, 0, 0);

    function getFruits() {
      obj.forEach((el) => {
        let mongoDay = new Date(el.day).setHours(0, 0, 0, 0);
        if (mongoDay >= startDay && mongoDay <= endDay) {
          apple = apple + el.fruits.apple;
          banana = banana + el.fruits.banana;
          orange = orange + el.fruits.orange;
          grapes = grapes + el.fruits.grapes;
        }
      });
      if (apple !== 0) {
        fruitObj.push({
          name: "apple",
          cost: 100,
          quantity: Math.ceil(apple / 100),
          price: apple,
        });
      }
      if (orange !== 0) {
        fruitObj.push({
          name: "orange",
          cost: 50,
          quantity: Math.ceil(orange / 50),
          price: orange,
        });
      }
      if (banana !== 0) {
        fruitObj.push({
          name: "banana",
          cost: 20,
          quantity: Math.ceil(banana / 20),
          price: banana,
        });
      }
      if (grapes !== 0) {
        fruitObj.push({
          name: "grapes",
          cost: 40,
          quantity: Math.ceil(grapes / 40),
          price: grapes,
        });
      }
    }

    function getVegetable() {
      obj.forEach((el) => {
        let mongoDay = new Date(el.day).setHours(0, 0, 0, 0);
        if (mongoDay >= startDay && mongoDay <= endDay) {
          cauliflower = cauliflower + el.vegetables.cauliflower;
          ladyfinger = ladyfinger + el.vegetables.ladyfinger;
          onions = onions + el.vegetables.onions;
          potatoes = potatoes + el.vegetables.potatoes;
          tomatoes = tomatoes + el.vegetables.tomatoes;
        }
      });
      if (cauliflower !== 0) {
        vegetableObj.push({
          name: "cauliflower",
          cost: 40,
          quantity: Math.ceil(cauliflower / 40),
          price: cauliflower,
        });
      }
      if (ladyfinger !== 0) {
        vegetableObj.push({
          name: "ladyfinger",
          cost: 50,
          quantity: Math.ceil(ladyfinger / 50),
          price: ladyfinger,
        });
      }
      if (onions !== 0) {
        vegetableObj.push({
          name: "onions",
          cost: 50,
          quantity: Math.ceil(onions / 50),
          price: onions,
        });
      }
      if (potatoes !== 0) {
        vegetableObj.push({
          name: "potatoes",
          cost: 100,
          quantity: Math.ceil(potatoes / 100),
          price: potatoes,
        });
      }
      if (tomatoes !== 0) {
        vegetableObj.push({
          name: "tomatoes",
          cost: 30,
          quantity: Math.ceil(tomatoes / 30),
          price: tomatoes,
        });
      }
    }

    if (selectedOption.value === "fruits") {
      getFruits();
      makeFruitsTable();
    } else if (selectedOption.value === "vegetables") {
      getVegetable();
      makeVegetablesTable();
    } else {
      alert("No choice selected. You must select a choice");
    }
  };

  useEffect(() => {
    async function fetchData() {
      await fetch(`http://localhost:5000/api`)
        .then((res) => {
          return res.json();
        })
        .then((data) => setObj([...data.data.fvdata]))
        .catch((err) => {
          console.log(err);
        });
    }
    fetchData();
  }, []);

  return (
    <div className="App">
      <div>
        <div className="header">
          <Select
            className="header-select"
            value={selectedOption}
            onChange={handleChange}
            options={options}
          />
          <form className="submit-form">
            <input
              id="input-name"
              type="text"
              placeholder="Enter indivudal name"
              onChange={(e) => onInputChange(e)}
              value={inputName}
            />
            <button
              type="submit"
              className={dateVisible ? "date-visible" : "date-hidden"}
              onClick={(e) => findSelectedData(e)}
            >
              Search
            </button>
          </form>
          <button className="date-button" onClick={(e) => onVisibleChange(e)}>
            {todayDate} <i className="far fa-calendar-alt fa-2x"></i>
          </button>
        </div>
        <div className={dateVisible ? "date-visible" : "date-hidden"}>
          <div className="calendar">
            <div>
              <Calendar
                onChange={(date) => onStartDateChange(date)}
                value={startDate}
              >
                Start Date
              </Calendar>
            </div>
            <div>
              <Calendar
                onChange={(date) => onEndDateChange(date)}
                value={endDate}
              >
                End Date
              </Calendar>
            </div>
          </div>
        </div>
      </div>
      <HeaderChart graphObject={obj} startDate={startDate} endDate={endDate} />
      <div className="table-cost">Total Price {totalCost}</div>
      <div className="table-visible">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Cost</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody id="table-body"></tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
