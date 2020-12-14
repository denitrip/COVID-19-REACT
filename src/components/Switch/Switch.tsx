import React, { Component } from "react";
import './Switch.scss'
import {ISwitchProps} from '../../model/switch.model'
class Switch extends Component<ISwitchProps> {
  render() {
    return (
      <div className="toggle-switch">
        <input
          type="checkbox"
          className="toggle-switch-checkbox"
          name={this.props.Name}
          id={this.props.Name}
          checked={this.props.checked}
          onChange={e => this.props.onChange(e.target.checked)}
        />
        <label className="toggle-switch-label" htmlFor={this.props.Name}>
          <span className="toggle-switch-inner" data-yes={this.props.Yes} data-no={this.props.No}/>
          <span className="toggle-switch-switch" />
        </label>
      </div>
    );
  }
}

export default Switch;