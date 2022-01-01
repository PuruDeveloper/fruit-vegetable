import React, { useEffect } from "react";
import "./HeaderChart.css";
import { format, formatDistance, subDays } from "date-fns";

function HeaderChart({ startDate, endDate }) {
  // const today = new Date(Date.now()).getTime();
  // let firstChartDay = today - 365 * 24 * 60 * 60 * 1000;
  // let firstChartDay = startDate.setHours(0, 0, 0, 0);
  // let obj = "";
  // let level = 0;
  // let j = 0;

  useEffect(async () => {
    let firstChartDay = startDate.setHours(0, 0, 0, 0);
    let obj = "";
    let level = 0;
    let j = 0;
    // console.log("New: ", new Date(Date.now()).setHours(0, 0, 0, 0));
    let startDay = startDate.setHours(0, 0, 0, 0) / (24 * 60 * 60 * 1000);
    let endDay = endDate.setHours(0, 0, 0, 0) / (24 * 60 * 60 * 1000);
    const sd = format(startDate, "yyyy-MM-dd");
    const ed = format(endDate, "yyyy-MM-dd");

    let totalDays = endDay - startDay;
    // console.log(sd, ed);
    // console.log(
    //   formatDistance(subDays(new Date(), startDate), endDate, {
    //     addSuffix: true,
    //   })
    // );
    await fetch(`http://localhost:5000/api/all/${sd}/${ed}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => (obj = [...data.data.fvdata]))
      .catch((err) => {
        console.log(err);
      });
    const squares = document.querySelector(".squares");
    squares.innerHTML = "";
    // obj.forEach((el) => {
    //   console.log(new Date(el.day).getTime());
    // });
    let newDay;
    j = 0;
    for (var i = 0; i < totalDays; i++) {
      let totalCost = 0;
      if (i !== 0) {
        firstChartDay = firstChartDay + 24 * 60 * 60 * 1000;
        newDay = new Date(firstChartDay).setHours(0, 0, 0, 0);
        // newDay = new Date(new Date(firstChartDay).setHours(0, 0, 0, 0));
      } else {
        // newDay = new Date(new Date(firstChartDay).setHours(0, 0, 0, 0));
      }

      if (j < obj.length) {
        let mongoDay = new Date(obj[j].day).setHours(0, 0, 0, 0);

        // console.log(new Date(obj[2].day).setHours(0, 0, 0, 0));
        // console.log(newDay);
        // console.log(mongoDay);
        while (newDay > mongoDay) {
          j++;
          mongoDay = new Date(obj[j].day).setHours(0, 0, 0, 0);
        }

        if (mongoDay === newDay) {
          totalCost =
            obj[j].fruits.apple +
            obj[j].fruits.orange +
            obj[j].fruits.banana +
            obj[j].fruits.grapes +
            obj[j].vegetables.potatoes +
            obj[j].vegetables.tomatoes +
            obj[j].vegetables.onions +
            obj[j].vegetables.ladyfinger +
            obj[j].vegetables.cauliflower;
          j++;
        }
      }
      // console.log(totalCost, new Date(firstChartDay));

      if (totalCost === 0) {
        level = 0;
      } else if (totalCost > 0 && totalCost <= 200) {
        level = 1;
      } else if (totalCost > 200 && totalCost <= 400) {
        level = 2;
      } else if (totalCost > 400 && totalCost <= 600) {
        level = 3;
      } else if (totalCost > 600 && totalCost <= 800) {
        level = 4;
      } else {
        level = 5;
      }
      //level = Math.floor(Math.random() * 3);
      //console.log(level);
      squares.insertAdjacentHTML(
        "beforeend",
        `<li data-level="${level}" key={${newDay}}></li>`
      );
      level = 0;
    }
    // console.log(obj);
  }, [startDate, endDate]);
  return (
    <div className="header-chart">
      <div>
        <ul className="months">
          <li>Jan</li>
          <li>Feb</li>
          <li>Mar</li>
          <li>Apr</li>
          <li>May</li>
          <li>Jun</li>
          <li>Jul</li>
          <li>Aug</li>
          <li>Sep</li>
          <li>Oct</li>
          <li>Nov</li>
          <li>Dec</li>
        </ul>

        <div className="squares-container">
          <ul className="squares"></ul>
        </div>
      </div>
    </div>
  );
}

export default HeaderChart;
