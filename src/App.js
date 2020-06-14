import React, {Component} from 'react';
import './App.css';
import Input from './components/Input/Input';
import Output from './components/Output/Output';

class App extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      input: {
        timeGeneration: 0,
        timeExecution: 0
      },
      output: {
        freeMemory: 12,
        nextSourceGenerate: [0, 0, 0, 0],
        curQueue: [0, 0, 0, 0],
        timingFreezes: [0, 0, 0, 0],
        countRequests: 0,
        countTranslationsRequests: 0,
        nextTimeCompleted: [],
        queueTasks: 0,
        queueCPU: [],
        cRequiredMemory: [3, 4, 6, 12]
      },
      isShowReport: false,
    }
  }

  handleChangeTimeGeneration(e)
  {
    const newValue = e.target.value;
    this.setState({
      input: {
        timeGeneration: newValue,
        timeExecution: this.state.input.timeExecution,
      }
    });
  }
  handleChangeTimeExecution(e)
  {
    const newValue = e.target.value;
    this.setState({
      input: {
        timeGeneration: this.state.input.timeGeneration,
        timeExecution: newValue,
      }
    });
  }

  async handleSubmit(e)
  {
    e.preventDefault();
    await this.modelling();
  }

  async modelling()
  {
    // Вспомогательная функция, генерирующая экспоненциальное распределение относительно текущего времени
    function expGenerate(time)
    {
      const expTime = -time * Math.log(Math.random());
      return expTime;
    }

  const state = {
  freeMemory: 12,
  nextSourceGenerate: [expGenerate(this.state.input.timeGeneration), expGenerate(this.state.input.timeGeneration), expGenerate(this.state.input.timeGeneration), expGenerate(this.state.input.timeGeneration)],
  curQueue: [0, 0, 0, 0],
  timingFreezes: [0, 0, 0, 0],
  countRequests: 0,
  countTranslationsRequests: 0,
  nextTimeCompleted: [],
  queueTasks: 0,
  queueCPU: [],
  cRequiredMemory: [3, 4, 6, 12]
};
const dt = 0.5;
let t = 0; // с
console.log(state);
while (t <= 14400)
  {
    // Начало генерации заявок с 4 терминалов
    for (let i = 0; i < 4; i++)
      {
         if (t >= state.nextSourceGenerate[i])
        {
          state.nextSourceGenerate[i] = t + expGenerate(this.state.input.timeGeneration);
          state.curQueue[i] += 1;
          state.countRequests += 1;
          if (state.curQueue[i] > 0)
            {
              if (i === 2) state.countTranslationsRequests += 1;
              if (state.cRequiredMemory[i] <= state.freeMemory)
               {
                  state.queueTasks += 1;
                  state.queueCPU.push(state.cRequiredMemory[i]);
                  state.freeMemory -= state.cRequiredMemory[i];
                  state.curQueue[i] -= 1;
                  // Если задач до этого не было
                  if (state.nextTimeCompleted.length === 0)
                    {
                      state.nextTimeCompleted.push(t + parseInt(this.state.input.timeExecution));
                    }
                  // Иначе к итоговому результату добавить предыдущий
                  else
                    {
                      state.nextTimeCompleted.push(state.nextTimeCompleted[state.nextTimeCompleted.length - 1] + parseInt(this.state.input.timeExecution));
                    }
                }
                else
                {
                  state.queueTasks += state.curQueue[i];
                }
            }
        }


      }
    // Конец генерации заявок
    // Проверить, достигло ли время освобождения ПК
    if (t >= state.nextTimeCompleted[0])
      {
        state.nextTimeCompleted.shift();
        state.freeMemory += state.queueCPU.shift();
      }
    // Конец проверки
    // Добавить тайминг к простою, если ПК занят
    for (let i = 0; i < 4; i++)
      {
        if (state.curQueue[i] > 0)
          {
            state.timingFreezes[i] += dt;
          }
      }
    t += dt;
  }

  this.setState({
    output: state,
    isShowReport: true,
  })

  }

  render() {
    return (
      <div className="App">
        <Input onChangeTimeGeneration={(e) => this.handleChangeTimeGeneration(e)}
               onChangeTimeExecution={(e) => this.handleChangeTimeExecution(e)}
               valueTimeGeneration={this.state.input.timeGeneration}
               valueTimeExecution={this.state.input.timeExecution}
               onSubmit={(e) => this.handleSubmit(e)}
        />
        {this.state.isShowReport && <Output
            queueTasks={this.state.output.queueTasks}
            firstTerminal={this.state.output.timingFreezes[0]/(4*14400)}
            secondTerminal={this.state.output.timingFreezes[1]/(4*14400)}
            thirdTerminal={this.state.output.timingFreezes[2]/(4*14400)}
            fourthTerminal={this.state.output.timingFreezes[3]/(4*14400)}
            frequency={this.state.output.countTranslationsRequests/16}
            translationsAll={this.state.output.countTranslationsRequests}
            quarterTranslationsAll={this.state.output.countTranslationsRequests/4}
          />}
      </div>
    );
  }
}

export default App;
