import React, { useEffect, useState } from 'react';
import './App.css';
import { sortData } from './apputil';
import numeral from "numeral";

function App() {
  let slNo = 1;
  let keyNo = 0;

  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const sortedData = sortData(data);
          setCountries(sortedData);
        })
    };

    getCountriesData();
  }, [])

  const total = (type) => {
    if (type == "cases") {
      const cases_list = countries.map(cnt => {
        return cnt.cases;
      });
      return cases_list && cases_list.length > 0 ? cases_list.reduce((result, number) => result + number) : 0;
    } else if (type == "active") {
      const cases_list = countries.map(cnt => {
        return cnt.active;
      });
      return cases_list && cases_list.length > 0 ? cases_list.reduce((result, number) => result + number) : 0;
    } else if (type == "todayCases") {
      const cases_list = countries.map(cnt => {
        return cnt.todayCases;
      });
      return cases_list && cases_list.length > 0 ? cases_list.reduce((result, number) => result + number) : 0;
    } else if (type == "deaths") {
      const cases_list = countries.map(cnt => {
        return cnt.deaths;
      });
      return cases_list && cases_list.length > 0 ? cases_list.reduce((result, number) => result + number) : 0;
    } else if (type == "todayDeaths") {
      const cases_list = countries.map(cnt => {
        return cnt.todayDeaths;
      });
      return cases_list && cases_list.length > 0 ? cases_list.reduce((result, number) => result + number) : 0;
    } else if (type == "critical") {
      const cases_list = countries.map(cnt => {
        return cnt.critical;
      });
      return cases_list && cases_list.length > 0 ? cases_list.reduce((result, number) => result + number) : 0;
    }
    else if (type == "recovered") {
      const cases_list = countries.map(cnt => {
        return cnt.recovered;
      });
      return cases_list && cases_list.length > 0 ? cases_list.reduce((result, number) => result + number) : 0;
    }
    else if (type == "todayRecovered") {
      const cases_list = countries.map(cnt => {
        return cnt.todayRecovered;
      });
      return cases_list && cases_list.length > 0 ? cases_list.reduce((result, number) => result + number) : 0;
    }
    else if (type == "tests") {
      const cases_list = countries.map(cnt => {
        return cnt.tests;
      });
      return cases_list && cases_list.length > 0 ? cases_list.reduce((result, number) => result + number) : 0;
    }
    else if (type == "population") {
      const cases_list = countries.map(cnt => {
        return cnt.population;
      });
      return cases_list && cases_list.length > 0 ? cases_list.reduce((result, number) => result + number) : 0;
    }
  }

  return (
    <div className="app">
      <table>
        <tr className="table__header" key={keyNo++}>
          <td className="th__SLNO">#</td>
          <td className="th__country">Country</td>
          <td>Total cases</td>
          <td>Active cases</td>
          <td>New cases</td>
          <td>Total deaths</td>
          <td>New deaths</td>
          <td>Critical</td>
          <td>Total recovered</td>
          <td>New recovered</td>
          <td>Tot cases/1M pop</td>
          <td>Deaths/1M pop</td>
          <td>Total tests</td>
          <td>Tests/1M pop</td>
          <td>Population</td>
        </tr>

        <tr className="table__worldwide" key={keyNo++}>
          <td className="td__SLNO"></td>
          <td className="td__country">Worldwide</td>
          <td><strong>{numeral(total("cases")).format('0,0')}</strong></td>
          <td>{numeral(total("active")).format('0,0')}</td>
          <td>{numeral(total("todayCases")).format('0,0')}</td>
          <td>{numeral(total("deaths")).format('0,0')}</td>
          <td>{numeral(total("todayDeaths")).format('0,0')}</td>
          <td>{numeral(total("critical")).format('0,0')}</td>
          <td>{numeral(total("recovered")).format('0,0')}</td>
          <td>{numeral(total("todayRecovered")).format('0,0')}</td>
          <td>---</td>
          <td>---</td>
          <td>{numeral(total("tests")).format('0,0')}</td>
          <td>---</td>
          <td>{numeral(total("population")).format('0,0')}</td>
        </tr>

        {
          countries.map(({ country, cases, active, todayCases, deaths, todayDeaths, critical, recovered, todayRecovered, casesPerOneMillion, deathsPerOneMillion, tests, testsPerOneMillion, population }) =>
            (
              <tr key={keyNo++}>
                <td className="td__SLNO">{slNo++}</td>
                <td className="td__country">{country}</td>
                <td className="td__numeric"><strong>{numeral(cases).format('0,0')}</strong></td>
                <td className="td__numeric">{numeral(active).format('0,0')}</td>
                <td className="td__numeric">{numeral(todayCases).format('0,0')}</td>
                <td className="td__numeric">{numeral(deaths).format('0,0')}</td>
                <td className="td__numeric">{numeral(critical).format('0,0')}</td>
                <td className="td__numeric">{numeral(todayDeaths).format('0,0')}</td>
                <td className="td__numeric">{numeral(recovered).format('0,0')}</td>
                <td className="td__numeric">{numeral(todayRecovered).format('0,0')}</td>
                <td className="td__numeric">{numeral(casesPerOneMillion).format('0,0')}</td>
                <td className="td__numeric">{numeral(deathsPerOneMillion).format('0,0')}</td>
                <td className="td__numeric">{numeral(tests).format('0,0')}</td>
                <td className="td__numeric">{numeral(testsPerOneMillion).format('0,0')}</td>
                <td className="td__numeric">{numeral(population).format('0,0')}</td>
              </tr>
            ))
        }
      </table>
    </div>
  );
}

export default App;
