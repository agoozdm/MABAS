import React, { Component } from 'react';
import moment from 'moment';
import './prayer-times-week-ahead.css';
import PrayerData from '../prayer-data/prayer-data';

class PrayerTimesWeekAhead extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prayerTimes: this.getPrayerTimes()
    };
  }

  getPrayerTimes(additional_days = 0) {
    var date = moment()
      .add(additional_days, 'days')
      .format('DD/MM/YYYY');
    var _data = new PrayerData();
    return _data.getPrayerTimes(date);
  }

  getNext7daysTableRows() {
    var rows = [];
    var numrows = 7;

    for (var i = 1; i <= numrows; i++) {
      // note: we add a key prop here to allow react to uniquely identify each
      // element in this array. see: https://reactjs.org/docs/lists-and-keys.html

      var times = this.getPrayerTimes(i);
      var date = moment(
        `${times['day']}/${times['month']}/${moment().format('YYYY')}`,
        'DD/MM/YYYY'
      ).format('ddd D MMM');
      rows.push(
        <tr key={i} className="PrayerTimesWeekAhead-row">
          <td>{date}</td>
          {/* FAJR */}
          <td>{times['fajr_begins']}</td>
          <td>{times['fajr_jamaah']}</td>
          <td>{times['sunrise']}</td>

          {/* ZUHR */}
          <td>{times['zuhr_begins']}</td>
          <td>{times['zuhr_jamaah']}</td>

          {/* ASR */}
          <td>{times['asr_1_begins']}</td>
          <td>{times['asr_jamaah']}</td>

          {/* MAGHRIB */}
          <td>{times['maghrib_begins']}</td>
          <td>{times['maghrib_jamaah']}</td>

          {/* ISHA */}
          <td>{times['isha_begins']}</td>
          <td>{times['isha_jamaah']}</td>
        </tr>
      );
    }

    return rows;
  }

  render() {
    var rows = this.getNext7daysTableRows();
    return (
      <div className="PrayerTimesWeekAheadWrapper">
        <table className="PrayerTimesWeekAhead">
          <thead>
            <tr>
              <th>Week ahead</th>
              <th colSpan="3">Subuh</th>
              <th colSpan="2">Dzuhur</th>
              <th colSpan="3">Asyar</th>
              <th colSpan="2">Maghrib</th>
              <th colSpan="2">Isya'</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td />
              {/* FAJR */}
              <td>Adzan</td>
              <td>Iqomah</td>
              <td>Terbit</td>

              {/* ZUHR */}
              <td>Adzan</td>
              <td>Iqomah</td>

              {/* ASR */}
              <td>Adzan</td>
              <td>Iqomah</td>

              {/* MAGHRIB */}
              <td>Adzan</td>
              <td>Iqomah</td>

              {/* ISHA */}
              <td>Adzan</td>
              <td>Iqomah</td>
            </tr>
            {rows}
          </tbody>
        </table>
      </div>
    );
  }
}

export default PrayerTimesWeekAhead;
