class Model{
  constructor(){
    this.players = [
      {
        name: "Jim Hoskins",
        score: 31,
        id: 1,
      },
       {
        name: "Andree Hoskins",
        score: 35,
        id: 2,
      },
       {
        name: "Alena Hoskins",
        score: 42,
        id: 3,
      }
    ];
    this.input=null;
    this.callback=null;
  }
  subscribe(render){
    this.callback=render;
  }
  notify(){
    this.callback();
  }
  addPoints(){
    let sum=0;
    for(let player of this.players)
      sum+=player.score;
    return sum;
  }
  miniuScore(index){
    if(this.players[index].score>0){
      this.players[index].score--;
      this.notify();
    }
  }
  pluScore(index){
    this.players[index].score++;
    this.notify();
  }
  addPlayer(index){
    if(this.input!= null && this.input.value !=''){
      this.players.push(
        {
          name:this.input.value,
          score:0,
          id:index
        }
      );
      this.input.value='';
      this.notify();
    }
  }
}
const Header = ({model})=>{
  return (  
    <header>
      <div className="header">
        <div className="col-md-10">
          <table className="stats"><tbody>
            <tr>
              <td className="td">PLAYERS:</td>
              <td>{model.players.length}</td>
            </tr>
            <tr>
              <td className="td">TOTAL POINTS:</td>
              <td>{model.addPoints()}</td>
            </tr>
          </tbody></table>
        </div>
        <div className="stopwatch">
          <h2>STOPWATCH</h2>
          <div className="stopwatch-time">0</div>
          <button>START</button>
          <button>RESET</button>
        </div>
      </div>
    </header>
  );
}
const PlayerList = ({model})=>{
  return (
    <div>
    {
      model.players.map((item,index)=>{
            return (
                    <div key={index} className="player">
                      <div className="player-name">{item.name}</div>
                      <div className="player-score counter">
                        <button onClick={()=>model.miniuScore(index)} className="counter-action decrement">-</button>
                        <div className="counter-score">{item.score}</div>
                        <button onClick={()=>model.pluScore(index)} className="counter-action increment">+</button>
                      </div>
                    </div>
                  );
        })
    }
    </div>);
}
const PlayerForm = ({model})=>{
  return (<div className="add-player-form">
            <form action=""
              onSubmit={e => {
                  e.preventDefault();
                  model.addPlayer();
              }}>
              <input type="text" placeholder="ENTER NAME" onChange={e => (model.input = e.target)}/>
              <input type="submit" value="Add Player" />
            </form>
          </div>);
}
const View=({title,model})=>{
  return (
    <div className="scoreboard">
     <Header model={model}/>
     <PlayerList model={model}/>
     <PlayerForm model={model}/>
     </div>
  );
}

let model = new Model();
let render = () => {
   ReactDOM.render(
      <View title="View" model={model} />,
      document.getElementById('container')
   );
};
model.subscribe(render);
render(); 