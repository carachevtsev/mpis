import React, {Component} from 'react';


class Input extends Component {


  render()
  {
    return (
      <form className={(this.props.className || "") + "Input"} {...this.props}>
        <div className="Input__group">
          <label className="Input__label">Среднее время интервала поступления задач</label>
          <input name="timeGeneration" onChange={(e) => this.props.onChangeTimeGeneration(e)}
                                       value={this.props.valueTimeGeneration}
          />
        </div>
        <div className="Input__group">
          <label className="Input__label">Время выполнения любой задачи ЭВМ</label>
          <input name="timeExecution" onChange={(e) => this.props.onChangeTimeExecution(e)}
                                      value={this.props.valueTimeExecution}
          />
        </div>
        <button className="Input__send">Начать моделирование</button>
      </form>
    )
  }
}

export default Input;
