import React, { Component } from "react";
import "./Switch.scss";
import { ISwitchProps } from "../../model/switch.model";
class Switch extends Component<ISwitchProps> {
  render() {
    return (
      <div className="toggle-switch">
        <input
          type="checkbox"
          className="toggle-switch-checkbox"
          name={this.props.name}
          id={this.props.name}
          checked={this.props.checked}
          onChange={(e) => this.props.onChange(e.target.checked)}
        />
        <label className="toggle-switch-label" htmlFor={this.props.name}>
          <span
            className="toggle-switch-inner"
            data-yes={this.props.Yes}
            data-no={this.props.No}
          />
          <span className="toggle-switch-switch" />
        </label>
      </div>
    );
  }
}

export default Switch;
