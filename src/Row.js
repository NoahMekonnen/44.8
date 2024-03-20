import Cell from './Cell';

const Row = ({arr, flipCellsAround, y}) =>{
    return (<tr>
        {arr.map((e,x) => <Cell key={`${y}-${x}`}flipCellsAroundMe={()=>flipCellsAround(`${y}-${x}`)} isLit={e}/>)}
    </tr>)
}


export default Row;