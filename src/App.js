import React, { Component } from 'react';
import './App.scss';

const timeCount = 5 * 60;

function sec2timeObj (totalSecs) {
  const days =  Math.floor(totalSecs / (60 * 60 * 24));
  let modulo = totalSecs % (60 * 60 * 24);
  const hours = Math.floor(modulo / (60 * 60));
  modulo = modulo % (60 * 60);
  const minutes = Math.floor(modulo / 60);
  const seconds = modulo % 60;
  
  return {
    days,
    hours: hours < 10 ? `0${hours}`: hours,
    minutes:minutes < 10 ? `0${minutes}`: minutes,
    seconds:seconds < 10 ? `0${seconds}`: seconds,
  }
}

class App extends Component {

  state = {
    currentCount: timeCount,
    status: 'default', // running, stop
  }


  startCountDown = () => {
    const { status } = this.state;
    if( status !== 'running') {
      this.timeCounter = setInterval(() => {
        this.setState((prevState) => {
          const currentCount = prevState.currentCount;
          if(currentCount > 0) {
            return {
              currentCount: currentCount - 1,
              status: 'running',
            }
          } else {
            return {
              currentCount: 0,
              status: 'stop',
            }
          }
        })
      }, 1000);
    }
  }

  resetCountDown = () => {
    this.clearTimeCounter();
    this.setState({
      currentCount: timeCount,
      status: 'default',
    });
  }

  clearTimeCounter = () => {
    if(this.timeCounter) {
      console.log(this.timeCounter);
      clearInterval(this.timeCounter);
    }
  }
  componentWillUnmount() {
    this.clearTimeCounter();
  }

  formatTime(currentCount) {
    const timeMap = sec2timeObj(currentCount)
    const {
      days =0,
      hours =0,
      minutes=0,
      seconds=0,
    } = timeMap;

    return (
      <div className="timer">
        {days !== 0 &&  <span className="time day">{days}</span>}
        {hours !== '00' &&  <span className="time hours">{hours}</span>}
        <span className="time minutes">{minutes}</span>
        <span className="time seconds">{seconds}</span>
      </div>
    )
  }

  render() {
    const { currentCount, status } = this.state;
    return (
      <div className="App">
        <div className="title">泡面时间</div>
        <div className="sub-title">Kindle泡面，面更香！</div>
        <div className="info">by @mark</div>
        <div className="btn-pane">
          <button className="action-btn" disabled={status==='running'} onClick={this.startCountDown}>开始计时</button>
          <button className="action-btn" onClick={this.resetCountDown}>重置计时</button>
        </div>
        <div className="timer-cont">
        {status === 'stop' ? '真香':this.formatTime(currentCount)}
        </div>
      </div>
    );
  }
}

export default App;
