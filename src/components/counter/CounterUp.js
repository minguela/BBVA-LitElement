import { LitElement, html, css } from 'lit-element';

export class CounterUp extends LitElement {
  static get properties() {
    return {
      date: { type: String },
      dateFormat: { type: Date },
      days: { type: String },
      hours: { type: String },
      minutes: { type: String },
      seconds: { type: String },
    };
  }
  static get styles() {
    return css`
      :host {
        display: flex;
        justify-content: center;
        margin-bottom: 20px;
      }
      .container-days,
      .container-hours,
      .container-minutes,
      .container-seconds {
        margin: 0 10px;
      }
      .container-days span,
      .container-hours span,
      .container-minutes span,
      .container-seconds span {
        display: block;
        text-align: center;
        color: gray;
      }

      .container-days .number,
      .container-hours .number,
      .container-minutes .number,
      .container-seconds .number {
        font-size: 30px;
        font-weight: bold;
      }
    `;
  }

  constructor() {
    super();
    this.date = new Date();
    this.days = '';
    this.hours = '';
    this.minutes = '';
    this.seconds = '';
  }

  updated(changedProperties) {
    if (changedProperties.has('date')) {
      this.dateFormat = new Date(this.date);
      setInterval(this.calculateTime.bind(this), 1000);
    }
  }

  render() {
    return html`<div class="container-days">
        <span class="number"></span><span class="text">days</span>
      </div>
      <div class="container-hours">
        <span class="number"></span><span class="text">hours</span>
      </div>
      <div class="container-minutes">
        <span class="number"></span><span class="text">minutes</span>
      </div>
      <div class="container-seconds">
        <span class="number"></span><span class="text">seconds</span>
      </div>`;
  }

  calculateTime() {
    const now = new Date();
    const timeDifference = now - this.dateFormat;

    const secondsInADay = 60 * 60 * 1000 * 24;
    const secondsInAHour = 60 * 60 * 1000;

    this.days = Math.floor((timeDifference / secondsInADay) * 1).toString();
    this.hours = Math.floor(
      ((timeDifference % secondsInADay) / secondsInAHour) * 1
    ).toString();
    this.minutes = Math.floor(
      (((timeDifference % secondsInADay) % secondsInAHour) / (60 * 1000)) * 1
    ).toString();
    this.seconds = Math.floor(
      ((((timeDifference % secondsInADay) % secondsInAHour) % (60 * 1000)) /
        1000) *
        1
    ).toString();
    this.shadowRoot.querySelector('.container-days .number').textContent =
      this.days.length < 2 ? `0${this.days}` : this.days;
    this.shadowRoot.querySelector('.container-hours .number').textContent =
      this.hours.length < 2 ? `0${this.hours}` : this.hours;
    this.shadowRoot.querySelector('.container-minutes .number').textContent =
      this.minutes.length < 2 ? `0${this.minutes}` : this.minutes;
    this.shadowRoot.querySelector('.container-seconds .number').textContent =
      this.seconds.length < 2 ? `0${this.seconds}` : this.seconds;
  }
}
