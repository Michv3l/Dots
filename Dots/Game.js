import * as React from 'react';
import { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';

// export defualt StyleSheet.create({
//   container: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 20
//   },
//   board: {
//     width: 312,
//     height: 312,
//     borderWidth: 3,
//     borderColor: '#000'
//   },
//   line: {
//     position: 'absolute',
//     width: 3,
//     height: 306,
//     backgroundColor: '#000',
//     transform: [
//       {translateX: 100}
//     ]
//   }
// })

selectColor = (int) => {
    if (int===0) {
      return ("rgb(255,255,255)")
    } else if (int===1) {
      return ("rgb(255,0,0)")
    } else if (int===-1) {
      return ("rgb(0,0,255)")
    }
  }

  tint = (event) => {
    var currentCoord=event.target.dataset.coord
    if (this.state.lineCoordinates[currentCoord] === 0) {
        if (this.state.turn === "red") {
          event.target.style.backgroundColor = "rgba(255,0,0,0.5)"
        } else {
          event.target.style.backgroundColor = "rgba(0,0,255,0.5)"
        }
    }
  }

  untint = (event) => {
    var currentCoord=event.target.dataset.coord
    if (this.state.lineCoordinates[currentCoord] === 0) {
      event.target.style.backgroundColor = "rgb(255,255,255)"
    }
  }

const CONTENT = {
  tableHead: ['X', 'X', 'X', 'X'],
  tableTitle: ['X', 'X', 'X', 'X'],
  tableData: [
    ['X', 'X', 'X'],
    ['X', 'X', 'X'],
    ['X', 'X', 'X'],
    ['X', 'X', 'X'],
  ],
};

function Square(){
  return(

    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>.-.</Text>
    </View>

      

    );
}


function Title(){
  return(
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Multiplayer</Text>
    </View>
    );
}


function Board(){


 // render() {
 //    const state = this.state;
 //    const data = [];
 //    for (let i = 0; i < 30; i += 1) {
 //      const dataRow = [];
 //      for (let j = 0; j < 9; j += 1) {
 //        dataRow.push(`${i}${j}`);
 //      }
 //      data.push(dataRow);
 //    }


  return(

    <View style={styles.container}>
      {/*<Square/><Square/>
      <Square/>
      <Square/>*/}
      {/*<Table borderStyle={{ borderWidth: 1 }}>
        <Row
          data={CONTENT.tableHead}
          flexArr={[1, 2, 1, 1]}
          style={styles.head}
          textStyle={styles.text}
        />
        <TableWrapper style={styles.wrapper}>
          <Col
            data={CONTENT.tableTitle}
            style={styles.title}
            heightArr={[28, 28]}
            textStyle={styles.text}
          />
          <Rows
            data={CONTENT.tableData}
            flexArr={[2, 1, 1]}
            style={styles.row}
            textStyle={styles.text}
          />
          
        </TableWrapper>
      </Table>*/}
      <Table borderStyle={{ borderWidth: 1 }}>
      {/*  var textElem = React.createElement(Text, style: fontSize: 20, 'hello world');*/}
        <Rows
            // data={CONTENT.tableData}
            // flexArr={[2, 1, 1]}
            style={styles.dot}
            // textStyle={styles.text}
          />
          <Rows
            // data={CONTENT.tableData}
            // flexArr={[2, 1, 1]}
            style={styles.horizContainer}
            // textStyle={styles.text}
          />
          <Rows
            // data={CONTENT.tableData}
            // flexArr={[2, 1, 1]}
            style={styles.dot}
            // textStyle={styles.text}
          />

      </Table>


    </View>

    // var cols=[];
    // for (let i=0; i<=2*boardSize; i++) {
    //   var row=[]
    //   for (let j=0; j<=2*boardSize; j++) {
    //     if (i%2 === 0) {
    //       if (j%2 ===0) {
    //         row.push(React.createElement("div",
    //         {className: "dot", id: "dot"+Math.floor(i/2)+","+Math.floor(j/2)}
    //         ,""))
    //       } else {
    //         row.push(React.createElement("div"
    //           , {className: "horizContainer", "data-coord":"0,"+Math.floor(i/2)+ "," +Math.floor(j/2)
    //           , onClick:this.fillLine, style:{backgroundColor: this.selectColor(this.state.lineCoordinates["0,"+Math.floor(i/2)+ "," +Math.floor(j/2)])}
    //           , onMouseEnter:this.tint, onMouseLeave:this.untint}
    //           , ""))
    //       }
    //     } else {
    //       if (j%2 === 0) {
    //         row.push(React.createElement("div"
    //           ,{className: "vertContainer","data-coord":"1,"+Math.floor(j/2)+ "," +Math.floor(i/2)
    //           , onClick:this.fillLine, style:{backgroundColor: this.selectColor(this.state.lineCoordinates["1,"+Math.floor(j/2)+ "," +Math.floor(i/2)])}
    //           , onMouseEnter:this.tint, onMouseLeave:this.untint}
    //           ,""))
    //       } else {
    //         row.push(React.createElement("div"
    //           ,{className: "box", id: "box"+Math.floor(i/2)+','+Math.floor(j/2), style: {backgroundColor: this.state.boxColors[Math.floor(i/2)+','+Math.floor(j/2)]}}
    //           ,""))

    //       }
    //     }
    //   }
    //   cols.push(React.createElement("div",{className:"row"},row))
    // }

    
    
    );
}


function Game(){

    return(
        <Board/>
    );
  
}

export default Game;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 100, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: 'orange' },
  wrapper: { flexDirection: 'row' },
  title: { flex: 1, backgroundColor: '#2ecc71' },
  row: { height: 28 },
  text: { textAlign: 'center' },
  dot: { height: 4, width: 4, backgroundColor: '#000'},
  box: { height: 25, width: 25},
  horizContainer: { height: 4, width: 25,border: 2},
  vertContainer: { height: 25, width: 4, border: 2}

});




