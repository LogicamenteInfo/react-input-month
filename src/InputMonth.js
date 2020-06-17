import React from 'react';
import PropTypes from 'prop-types';
import Locales from './Locales';
import { v4 } from 'uuid';
import './Style/style.css';

export default class InputMonth extends React.Component {
  static propTypes = {
    lang: PropTypes.string,
    className: PropTypes.string,
  };

  static defaultProps = {
    lang: 'en',
    className: '',
  };

  constructor(props) {
    super(props);
    if (Locales[this.props.lang] === undefined) throw 'Language not implemented.';
    this.state = {
      id: v4(),
      lang: this.props.lang,
      locales: Locales[this.props.lang],
      month: '',
      year: '',
      startYear: new Date().getFullYear() - 4,
      value: '---------- ----',
      showMonthViewer: false,
      showYearViewer: false,
    }
  }

  componentDidMount() {
    this.loadValue(this.props.value)
  }

  componentDidUpdate(pPros) {
    if (this.props.value !== pPros.value) {
      this.loadValue(this.props.value);
    }
  }

  loadValue(val) {
    if (val === '' || val === undefined || val === null) {
      this.setState({ value: '---------- ----' });
    } else {
      const sentence = val.match(/(\d{4})\-(\d{2})/);
      const year = sentence[1];
      const monthNumber = parseInt(sentence[2]) - 1;
      const months = Object.keys(this.state.locales);
      this.setState({ value: `${this.state.locales[months[monthNumber]]} ${year}` });
    }
  }

  drawMonthButtons() {
    const mB = [];
    Object.keys(this.state.locales).filter(m => !m.includes('ABBR')).forEach((monthName, i) => {
      mB.push(
        <button
          className="imp--month--button imp--button"
          type="button"
          children={this.state.locales[`ABBR_${monthName.substr(0, 3)}`]}
          onClick={(e) => this.onMonthClick(e, this.state.locales[monthName], i + 1)}
        />
      );
    });
    return mB;
  }

  drawYearButtons() {
    const yB = [];
    for (let i = this.state.startYear; i < this.state.startYear + 9; i++) {
      yB.push(
        <button
          className="imp--year--button imp--button"
          type="button"
          data-year={i}
          children={i}
          onClick={(e) => this.onYearClick(e, i)}
        />
      );
    }
    return yB;
  }

  onMonthClick(e, monthName, monthNumber, callback) {
    this.isInContainer = true;
    const sentence = this.state.value.match(/(.+) (.+)/);
    this.setState({
      value: `${monthName} ${sentence[2]}`,
      month: monthNumber,
      showYearViewer: true,
      showMonthViewer: false
    }, () => {
      if (callback) {
        callback();
      } else {
        const input = document.getElementById(this.state.id);
        input.selectionStart = monthName.length + 1;
        input.selectionEnd = input.selectionStart + 4;
        input.focus();
        this.onInputChange();
      }
    });
  }

  onYearClick(e, year) {
    const sentence = this.state.value.match(/(.+) (.+)/);
    this.setState({
      value: `${sentence[1]} ${year}`,
      year,
      showMonthViewer: false,
      showYearViewer: false,
    }, this.onInputChange.bind(this));
  }

  onInputClick(e) {
    const sentence = e.target.value.match(/(.+) (.+)/);
    if (e.target.selectionStart <= sentence[1].length) {
      e.target.selectionStart = 0;
      e.target.selectionEnd = sentence[1].length;
      this.setState({ showMonthViewer: true, showYearViewer: false });
    }
    else {
      e.target.selectionStart = sentence[1].length + 1;
      e.target.selectionEnd = e.target.selectionStart + 4;
      this.setState({ showMonthViewer: false, showYearViewer: true });
    }
  }

  onInputBlur() {
    setTimeout(() => {
      if (!this.isInContainer) {
        this.setState({ showMonthViewer: false, showYearViewer: false });
      }
      this.isInContainer = false;
    }, 150);
  }

  async onInputChange() {
    if (this.state.month !== '' && this.state.year !== '') {
      console.log('changed')
      this.props.onChange(`${this.state.year}-${this.state.month.toString().padStart(2, '0')}`);
    }
  }

  onInputKeyDown(e) {
    e.preventDefault();
    const keyCode = e.keyCode;
    this.onInputBlur();
    if (document.getElementById(this.state.id).selectionStart === 0)
      this.keyboardMonthSelect(keyCode);
    else
      this.keyboardYearSelect(keyCode);
  }

  keyboardMonthSelect(code) {
    const cMonth = this.state.month;
    const monthNames = Object.keys(this.state.locales).filter(m => !m.includes('ABBR'));
    switch (code) {
      case 38: // up
        if (cMonth === '' || cMonth === 12)
          this.onMonthClick(null, this.state.locales[monthNames[0]], 1, this.selectInputMonth.bind(this));
        else
          this.onMonthClick(null, this.state.locales[monthNames[cMonth]], cMonth + 1, this.selectInputMonth.bind(this));
        break;
      case 39: // right
        this.selectInputYear();
        break;
      case 40: // down
        if (cMonth === '' || cMonth === 1)
          this.onMonthClick(null, this.state.locales[monthNames[11]], 12, this.selectInputMonth.bind(this));
        else
          this.onMonthClick(null, this.state.locales[monthNames[cMonth - 2]], cMonth - 1, this.selectInputMonth.bind(this));
        break;
    }
  }

  keyboardYearSelect(code) {
    const input = document.getElementById(this.state.id);
    const sentence = this.state.value.match(/(.+) (.+)/);
    const cYear = this.state.year;
    switch (code) {
      case 37: // left
        this.selectInputMonth();
        break;
      case 38: // up
        if (cYear === '') {
          this.setState({
            value: `${sentence[1]} ${new Date().getFullYear()}`,
            year: new Date().getFullYear(),
          }, this.selectInputYear.bind(this));
        } else {
          this.setState({
            value: `${sentence[1]} ${cYear + 1}`,
            year: cYear + 1
          }, this.selectInputYear.bind(this));
        }
        break;
      case 40: // down
        if (cYear === '') {
          this.setState({
            value: `${sentence[1]} ${new Date().getFullYear() - 1}`,
            year: new Date().getFullYear() - 1,
          }, this.selectInputYear.bind(this));
        }
        else {
          this.setState({
            value: `${sentence[1]} ${cYear - 1}`,
            year: cYear - 1,
          }, this.selectInputYear.bind(this));
        }
        break;
    }
  }

  selectInputMonth() {
    this.setState({
      showMonthViewer: false, showYearViewer: false
    }, () => {
      this.onInputChange().then(() => {
        const input = document.getElementById(this.state.id);
        const sentence = this.state.value.match(/(.+) (.+)/);
        input.selectionStart = 0;
        input.selectionEnd = sentence[1].length;
        input.focus();
      })
    });
  }

  selectInputYear() {
    this.setState({
      showMonthViewer: false, showYearViewer: false
    }, () => {
      this.onInputChange().then(() => {
        const input = document.getElementById(this.state.id);
        input.selectionStart = input.value.length - 4;
        input.selectionEnd = input.value.length;
        input.focus();
      });
    });
  }

  onPrevButtonClick() {
    this.isInContainer = true;
    this.setState({ startYear: this.state.startYear - 9 });
  }

  onNextButtonClick() {
    this.isInContainer = true;
    this.setState({ startYear: this.state.startYear + 9 });
  }

  render() {
    return (
      <div className="imp--container">
        <input
          {...this.props}
          id={this.state.id}
          className={`imp--input ${this.props.className}`}
          type="text"
          value={this.state.value}
          onClick={this.onInputClick.bind(this)}
          onBlur={this.onInputBlur.bind(this)}
          onKeyPress={(e) => e.preventDefault()}
          onKeyDown={this.onInputKeyDown.bind(this)}
          onChange={this.onInputChange.bind(this)}
        />
        <div className="imp--viewers">
          <div
            style={!this.state.showMonthViewer ? { display: 'none' } : {}}
            className="imp--month--viewer">
            {this.drawMonthButtons().map((b) => b)}
          </div>
          <div
            style={!this.state.showYearViewer ? { display: 'none' } : {}}
            className="imp--year--viewer">
            <div
              className="imp--viewer--controls">
              <button
                className="imp--year--button--prev imp--button"
                type="button"
                children={'<'}
                onClick={this.onPrevButtonClick.bind(this)}
              />
              <button
                className="imp--year--button--next imp--button"
                type="button"
                children={'>'}
                onClick={this.onNextButtonClick.bind(this)}
              />
            </div>
            {this.drawYearButtons().map((b) => b)}
          </div>
        </div>
      </div>
    );
  }






















}