import React, {Component} from 'react';


class Output extends Component
{

  render()
  {
    return (
      <div className={(this.props.className || "") + " Output"}>
        <div className="Output__param">
          Единица времени моделирования: секунда
        </div>
        <div className="Output__param">
          Время моделирования: 14400 секунд
        </div>
        <div className="Output__param">
          Загрузка ЭВМ заданиями: {this.props.queueTasks} заданий
        </div>
        <div className="Output__param">
          Вероятность простоя первого терминала: {this.props.firstTerminal}
        </div>
        <div className="Output__param">
          Вероятность простоя второго терминала: {this.props.secondTerminal}
        </div>
        <div className="Output__param">
          Вероятность простоя третьего терминала: {this.props.thirdTerminal}
        </div>
        <div className="Output__param">
          Вероятность простоя четвертого терминала: {this.props.fourthTerminal}
        </div>
        <div className="Output__param">
          Частота одновременного выполнения трансляции с 3 терминалов: {this.props.frequency} заданий за 1 час
        </div>
        <div className="Output__param">
          {this.props.translationsAll} выполнено задач трансляции всеми терминалами за 14400 секунд ({this.props.quarterTranslationsAll} среднее арифметическое)
        </div>
      </div>
    )
  }
}

export default Output;
