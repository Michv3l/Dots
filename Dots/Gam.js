import React, { Component, useRef } from 'react';
//import { StyleSheet, View } from 'react-native';
import { Text, View, StyleSheet, TouchableHighlight, Alert } from 'react-native';
import { Hoverable } from 'react-native-hoverable';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialBoard(2)

}

selectColor = (int) => {
  //console.log(int)
    if (int===0) {
      return ("rgb(255,255,255)")
    } else if (int===1) {
      return ("rgb(255,0,0)")
    } else if (int===-1) {
      return ("rgb(0,0,255)")
    }
  }

  fillLine = (event) =>{
    var currentCoord=event._dispatchInstances.memoizedProps["data-coord"]
    console.log(currentCoord)
    console.log(this.state.turn)
    console.log(this.state.lineCoordinates[currentCoord])
    if (this.state.lineCoordinates[currentCoord] === 0) {
      let newState=this.state.lineCoordinates
      newState[currentCoord] = this.state.turn === "red"? 1 : -1
      this.setState(prevState => ({
        lineCoordinates: newState,
      }))
      var splitCoord=currentCoord.split(',')
      var i = splitCoord[0]
      var j = splitCoord[1]
      var k = splitCoord[2]

      let newBoxColors = this.state.boxColors
      console.log("checking 1",this.state.lineCoordinates[currentCoord])

      var madeSquare = 0

      if (i === "0") {
        console.log("checking 2",this.state.lineCoordinates[currentCoord])
        if (this.checkSquare(j,k) === 4) {
          madeSquare = 1
          newBoxColors[j+','+k] =  (this.state.turn ==="red") ? "rgba(255,0,0,0.5)" : "rgba(0,0,255,0.5)"
          this.setState((prevState)=>({
            numRed: (prevState.turn ==="red") ? prevState.numRed+1 : prevState.numRed,
            numBlue: (prevState.turn ==="blue") ? prevState.numBlue+1 : prevState.numBlue,
            boxColors: newBoxColors,
          }))
        }
        if (this.checkSquare(parseFloat(j)-1,k) === 4) {
          madeSquare = 1
          newBoxColors[(parseFloat(j)-1)+','+k] = (this.state.turn ==="red") ? "rgba(255,0,0,0.5)" : "rgba(0,0,255,0.5)"
          this.setState((prevState)=>({
            numRed: (prevState.turn ==="red") ? prevState.numRed+1 : prevState.numRed,
            numBlue: (prevState.turn ==="blue") ? prevState.numBlue+1 : prevState.numBlue,
            boxColors: newBoxColors,
          }))
        }
      } else {
        if (this.checkSquare(k,j) === 4) {
          madeSquare = 1
          newBoxColors[k+','+j] = (this.state.turn ==="red") ? "rgba(255,0,0,0.5)" : "rgba(0,0,255,0.5)"
          this.setState((prevState)=>({
            numRed: (prevState.turn ==="red") ? prevState.numRed+1 : prevState.numRed,
            numBlue: (prevState.turn ==="blue") ? prevState.numBlue+1 : prevState.numBlue,
            boxColors: newBoxColors,
          }))
        }
        if (this.checkSquare(k,parseFloat(j)-1) === 4) {
          madeSquare = 1
          newBoxColors[k+','+(parseFloat(j)-1)] = (this.state.turn ==="red") ? "rgba(255,0,0,0.5)" : "rgba(0,0,255,0.5)"
          this.setState((prevState)=>({
            numRed: (prevState.turn ==="red") ? prevState.numRed+1 : prevState.numRed,
            numBlue: (prevState.turn ==="blue") ? prevState.numBlue+1 : prevState.numBlue,
            boxColors: newBoxColors,
          }))
        }
      }
      if (madeSquare === 0) {
        this.setState((prevState)=> ({
          turn: prevState.turn === "red" ? "blue" : "red",
        }))
      } else {
        this.checkGameOver()
      }
    }
  }

  checkSquare = (j,k) => {

    var checker1 = Math.abs(this.state.lineCoordinates['0,'+j+','+k])
    console.log("checker 1 ",checker1)
    var checker2 = Math.abs(((parseFloat(j)+1))>this.state.boardSize ? 0 : this.state.lineCoordinates['0,'+(parseFloat(j)+1)+','+k])
    console.log("checker 2",checker2)
    var checker3 = Math.abs(this.state.lineCoordinates['1,'+k+','+j])
    console.log("checker 3", checker3)
    var checker4 = Math.abs(((parseFloat(k)+1))>this.state.boardSize ? 0 : this.state.lineCoordinates['1,'+(parseFloat(k)+1)+','+j])
    console.log("checker 4", checker4)
    return checker1+checker2+checker3+checker4
  }

  checkGameOver = () => {
    this.setState((prevState) =>   ({
      winMessage: (prevState.numRed+prevState.numBlue == prevState.boardSize**2)? this.makeWinMessage(prevState) : ""
    }))
  }

  makeWinMessage = (state) => {
    var winMessage
      if (state.numRed > state.numBlue) {
        winMessage = "Red wins! Select a board size to start a new game."
      } else if (state.numRed < state.numBlue) {
        winMessage = "Blue wins! Select a board size to start a new game."
      } else {
        winMessage = "Draw! Select a board size to start a new game."
      }
      console.log(winMessage)
      return (winMessage)
  }

 makeBoard = (boardSize) => {
  var cols=[]
    for (let i=0; i<=2*boardSize; i++){
      var row=[]
      for (let j=0; j<=2*boardSize; j++){
        if(i%2 === 0){
          if(j%2 === 0){
            row.push(React.createElement(View, {style: styles.dot, backgroundColor: "#000", "d-coord":"0,"}))
          } 
          else {
            row.push(React.createElement(View, {style: styles.horizContainer, value: "129", backgroundColor: this.selectColor( //1)
              this.state.lineCoordinates["0,"+Math.floor(i/2)+ "," +Math.floor(j/2)]), "data-coord": "0,"+Math.floor(i/2)+","+Math.floor(j/2), onStartShouldSetResponder: this.fillLine
          }))
           }
        }
      else{
          if(j%2 === 0){
            row.push(React.createElement(View, {style: styles.vertContainer, backgroundColor: this.selectColor(//1)
              this.state.lineCoordinates["1,"+Math.floor(j/2)+ "," +Math.floor(i/2)]), "data-coord": "1,"+Math.floor(j/2)+","+Math.floor(i/2)
              , onStartShouldSetResponder: this.fillLine}))
          } else{
            row.push(React.createElement(View, {style: styles.box, "boxId": Math.floor(i/2)+","+Math.floor(j/2), backgroundColor: this.state.boxColors[Math.floor(i/2)+','+Math.floor(j/2)]}))
          }
        }
      }
      cols.push(row)
    }
    return cols
  }

initialBoard = (size) => {

    var textElem = React.createElement("dot", []);
    var dot = React.createElement(View, {style: styles.dot});
    var hor = React.createElement(View, {style: styles.horizContainer});
    var ver = React.createElement(View, {style: styles.vertContainer});
    var boxes = React.createElement(View, {style: styles.box});  

    let state = {
    boardSize: size,
    numRed: 0,
    numBlue: 0,
    turn: "red",
    winMessage: "",
    lineCoordinates: {},
    boxColors: {},
    boardData: [],
    HeadTable: [dot, hor, dot, hor, dot, hor, dot],
      DataTable: [
        [ver, boxes, ver, boxes, ver, boxes, ver],
        [dot, hor, dot, hor, dot, hor, dot],
        [ver, boxes, ver, boxes, ver, boxes, ver],
        [dot, hor, dot, hor, dot, hor, dot],
        [ver, boxes, ver, boxes, ver, boxes, ver],
        [dot, hor, dot, hor, dot, hor, dot]
      ]
  }

  for (let i=0; i<2; i++){
    for (let j=0; j<state.boardSize+1; j++) {
      for (let k=0; k<state.boardSize; k++) {
        state.lineCoordinates[i+","+j+","+k]=0
        //console.log(state.lineCoordinates)
      }
    }
  }
  for (let i=0; i< state.boardSize; i++) {
    for (let j=0; j< state.boardSize; j++) {
      state.boxColors[i+","+j] = "rgb(255,255,255)"
    }
  }

  // var cols=[]
  //   for (let i=0; i<=2*state.boardSize; i++){
  //     var row=[]
  //     for (let j=0; j<=2*state.boardSize; j++){
  //       if(i%2 === 0){
  //         if(j%2 === 0){
  //           row.push(React.createElement(View, {style: styles.dot, backgroundColor: "#000", "d-coord":"0,"}))
  //         } 
  //         else {
  //           // row.push(React.createElement(View, {style: styles.horizContainer, backgroundColor: "rgb(255,0,0)", onStartShouldSetResponder: this.fillLine}))
  //         //   g = React.createElement(View, {style: styles.horizContainer, value: "129", backgroundColor: this.selectColor( //1)
  //         //     state.lineCoordinates["0,"+Math.floor(i/2)+ "," +Math.floor(j/2)]), "data-coord": "1789", onStartShouldSetResponder: this.fillLine
  //         // })
  //         //   g.setNativeProps("id", "Div1");
  //         //   row.push(g)

  //           row.push(React.createElement(View, {style: styles.horizContainer, value: "129", backgroundColor: this.selectColor( //1)
  //             state.lineCoordinates["0,"+Math.floor(i/2)+ "," +Math.floor(j/2)]), "data-coord": "0,"+Math.floor(i/2)+","+Math.floor(j/2), onStartShouldSetResponder: this.fillLine
  //         }))

  //         //   row.push(React.createElement(TouchableHighlight,{ onPress: showAlert},React.createElement(View, {style: styles.horizContainer, value: "129", backgroundColor: this.selectColor( //1)
  //         //     state.lineCoordinates["0,"+Math.floor(i/2)+ "," +Math.floor(j/2)]), "data-coord": "1789"
  //         // })))

  //           //console.log(state.lineCoordinates["0,"+Math.floor(i/2)+ "," +Math.floor(j/2)])
  //           // row.push(React.createElement(View, {style: styles.horizContainer, backgroundColor: "rgb(255,0,0)"}))
  //           // row.push(React.createElement(TouchableHighlight, {activeOpacity: 0.6, style: styles.horizContainer, backgroundColor: "rgb(255,0,0)", onClick: this.newChange(state)}))
  //         }
  //       }
  //     else{
  //         if(j%2 === 0){
  //           row.push(React.createElement(View, {style: styles.vertContainer, backgroundColor: this.selectColor(//1)
  //             state.lineCoordinates["1,"+Math.floor(i/2)+ "," +Math.floor(j/2)]), "data-coord": "1,"+Math.floor(j/2)+","+Math.floor(i/2)
  //             , onStartShouldSetResponder: this.fillLine}))
  //         } else{
  //           row.push(React.createElement(View, {style: styles.box, "boxId": Math.floor(i/2)+","+Math.floor(j/2), backgroundColor: state.boxColors[Math.floor(i/2)+','+Math.floor(j/2)]}))
  //         }
  //       }
  //     }
  //     cols.push(row)
  //   }
    //state.boardData = cols;

  
  return state
  
  }



  render() {
    const state = this.state;
    var size = state.boardSize;
    return (
      <View style={styles.container}>
      
        {/*<Table borderStyle={{borderWidth: 0, borderColor: '#ffa1d2'}}>
          <Rows data={state.boardData} style={styles.dotStyle}/>
        </Table>*/}

        <Table borderStyle={{borderWidth: 0, borderColor: '#ffa1d2'}}>
          <Rows data={this.makeBoard(size)} style={styles.dotStyle}/>
        </Table>

        <Text style={styles.text}>Red: {state.numRed} Blue: {state.numBlue}</Text>
        <Text>{state.winMessage}</Text>

      </View>
    )
  }
}

const showAlert = (int,lineCoordinates) => {
    Alert.alert('View Clicked ...');
    console.log(int, lineCoordinates)
  };


  


const styles = StyleSheet.create({
  container: { 
    flex: 1,
    padding: 18,
    paddingTop: 35,
    backgroundColor: '#ffffff' 
  },
  dotStyle: { 
    height: 50,
    alignContent: "stretch",
  },
  TableText: { 
    margin: 10
  },
  head: { height: 40, backgroundColor: '#808B97' },
  text: { margin: 6, color: '#141823' },
  row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
  btn: { width: 58, height: 18, backgroundColor: '#78B7BB',  borderRadius: 2 },
  btnText: { textAlign: 'center', color: '#fff' },
  dot: { height: 15, width: 15, backgroundColor: '#000', alignSelf: "center"},
  box: { height: 25, width: 25, alignSelf: "center", backgroundColor: '#000' },
  horizContainer: { height: 5, width: 55, alignSelf: "center", border: 2, backgroundColor: "rgba(255,0,0,0.5)"},
  vertContainer: { height: 55, width: 5, alignSelf: "center", border: 2, backgroundColor: "rgba(255,0,0,0.5)"}
});