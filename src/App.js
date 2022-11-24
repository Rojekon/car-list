import React, { useEffect, useState } from "react";
import "./App.css";
import data from "./db.json";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function App() {
  const [cub, setCub] = useState(true);
  const [btn, setBtn] = useState("btn-hidden");
  const [selects, setSelects] = useState(false);
  const [chekedMark, setChekedMark] = useState("Марка");
  const [chekedModel, setChekedModel] = useState("Модель");
  const [chekedYear, setChekedYear] = useState("Год");
  const [showFin, setShowFin] = useState(false);
  const dataArr = data;

  function cubes() {
    setTimeout(() => {
      setCub(false);
    }, 4500);
  }

  function btnclass() {
    setTimeout(() => {
      setBtn("btn");
    }, 500);
  }

  function showselect() {
    setBtn("btn-hidden");
    setSelects(true);
  }

  const marks = dataArr.map((cars) => {
    return cars.mark;
  });

  const brand = [...new Set(marks)];

  const [models, setModels] = useState([]);

  useEffect(() => {
    setModels([]);
    dataArr.map((car) => {
      if (car.mark === chekedMark) {
        setModels((models) => [...models, car.model]);
      }
      return models;
    });
  }, [chekedMark]);

  const [years, setYears] = useState([]);

  useEffect(() => {
    setYears([]);
    dataArr.map((car) => {
      if (car.model === chekedModel) {
        setYears((years) => [...years, car.year]);
      }
      return years;
    });
  }, [chekedModel, chekedMark]);

  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    if (
      chekedMark !== "Модель" &&
      chekedModel !== "Марка" &&
      chekedYear !== "Год"
    ) {
      setShowBtn(true);
    } else {
      setShowBtn(false);
    }
  }, [chekedMark, chekedModel, chekedYear]);

  const [date, setDate] = useState(new Date());
  const [mindate, setMindate] = useState(new Date());
  const [maxdate, setMaxdate] = useState(new Date());

  const onChange = (date) => {
    setDate(date);
  };

  useEffect(() => {
    dataArr.map((car) => {
      if (
        chekedMark === car.mark &&
        chekedModel === car.model &&
        chekedYear === car.year
      ) {
        setMindate(car.delivery.substring([0], 10));
        setMaxdate(car.delivery.substring([11], 22));
      }
    });
  }, [chekedMark, chekedModel, chekedYear]);

  const [showClnd, setShowClnd] = useState(false);

  function showCalendar() {
    setShowBtn(false);
    setShowClnd(true);
  }

  function dataConv(date) {
    const [day, month, year] = date.split(".");
    return new Date(`${year}, ${month}, ${day}`);
  }

  function dataRConv(date) {
    const [month, day, year] = date.split("/");
    return `${day}.${month}.${year}`;
  }

  function showFinal() {
    setTimeout(() => {
      setShowClnd(false);
      setSelects(false);
      setShowFin(true);
    }, 1000);
  }

  function restart() {
    setBtn("btn-hidden");
    setShowFin(false);
    setCub(true);
    setChekedMark("Марка");
    setChekedModel("Модель");
    setChekedYear("Год");
  }

  return (
    <div>
      {cub ? (
        <>
          <div className="cubes" id="top1"></div>
          <div className="cubes" id="bottom1"></div>
          <div className="cubes" id="top2"></div>
          <div className="cubes" id="bottom2"></div>
          {cubes()}
        </>
      ) : (
        <>
          {selects === false && (
            <button
              className={btn}
              onClick={() => {
                setTimeout(() => {
                  showselect();
                }, 2500);
              }}
            >
              Нажать
            </button>
          )}
          {btnclass()}
          {selects === true && (
            <>
              <div class="selects">
                <select
                  id="smark"
                  value={chekedMark}
                  onChange={(event) => {
                    setChekedMark(event.target.value);
                  }}
                >
                  <option>Марка</option>
                  {brand.map((el) => (
                    <option>{el}</option>
                  ))}
                </select>
                <select
                  id="smodel"
                  value={chekedModel}
                  onChange={(event) => setChekedModel(event.target.value)}
                >
                  <option>Модель</option>
                  {models.map((el) => (
                    <option>{el}</option>
                  ))}
                </select>
                <select
                  id="syear"
                  value={chekedYear}
                  onChange={(event) => {
                    setChekedYear(event.target.value);
                  }}
                >
                  <option>Год</option>
                  {years.map((el) => (
                    <option>{el}</option>
                  ))}
                </select>
              </div>
              {showBtn === true && (
                <div className="delivery">
                  <button className="btn" onClick={showCalendar}>
                    Доставить
                  </button>
                </div>
              )}
              {showClnd === true && (
                <div className="delivery">
                  <Calendar
                    onChange={onChange}
                    value={date}
                    minDate={dataConv(mindate)}
                    maxDate={dataConv(maxdate)}
                    onClickDay={showFinal}
                  />
                  {console.log(date)}
                </div>
              )}
            </>
          )}
          {showFin === true && (
            <div className="fin-win">
              <h2 className="fin-dis">
                Вы выбрали {chekedMark} {chekedModel} {chekedYear}, доставка{" "}
                {dataRConv(date.toLocaleDateString())}
              </h2>
              <button className="restart" onClick={restart}>
                Начать сначала
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
