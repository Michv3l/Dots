import React, { Component, useRef } from 'react';
//import { StyleSheet, View } from 'react-native';
import { Button, Text, View, StyleSheet, TouchableHighlight, Alert } from 'react-native';
import { Hoverable } from 'react-native-hoverable';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialBoard(3)

}


madeBoxes = (currentCoord,newState) => {
  var splitCoord=currentCoord.split(',')
      var i = splitCoord[0]
      var j = splitCoord[1]
      var k = splitCoord[2]

      let newBoxColors = this.state.boxColors

      let lineColor = newState[currentCoord]
      console.log("line color "+lineColor)

      var madeSquare = 0

      if (i === "0") {
        if (this.checkSquare(j,k) === 4) {
          madeSquare = 1
          newBoxColors[j+','+k] =  (lineColor === 1) ? "rgba(255,0,0,0.5)" : "rgba(0,0,255,0.5)"
          this.setState((prevState)=>({
            numRed: (lineColor === 1) ? prevState.numRed+1 : prevState.numRed,
            numBlue: (lineColor === -1) ? prevState.numBlue+1 : prevState.numBlue,
            movesLeft: prevState.movesLeft-1,
            boxColors: newBoxColors,
          }))
        }
        if (this.checkSquare(parseFloat(j)-1,k) === 4) {
          madeSquare = 1
          newBoxColors[(parseFloat(j)-1)+','+k] = (lineColor === 1) ? "rgba(255,0,0,0.5)" : "rgba(0,0,255,0.5)"
          this.setState((prevState)=>({
            numRed: (lineColor === 1) ? prevState.numRed+1 : prevState.numRed,
            numBlue: (lineColor === -1) ? prevState.numBlue+1 : prevState.numBlue,
            movesLeft: prevState.movesLeft-1,
            boxColors: newBoxColors,
          }))
        }
      } else {
        if (this.checkSquare(k,j) === 4) {
          madeSquare = 1
          newBoxColors[k+','+j] = (lineColor === 1) ? "rgba(255,0,0,0.5)" : "rgba(0,0,255,0.5)"
          this.setState((prevState)=>({
            numRed: (lineColor === 1) ? prevState.numRed+1 : prevState.numRed,
            numBlue: (lineColor === -1) ? prevState.numBlue+1 : prevState.numBlue,
            movesLeft: prevState.movesLeft-1,
            boxColors: newBoxColors,
          }))
        }
        if (this.checkSquare(k,parseFloat(j)-1) === 4) {
          madeSquare = 1
          newBoxColors[k+','+(parseFloat(j)-1)] = (lineColor === 1) ? "rgba(255,0,0,0.5)" : "rgba(0,0,255,0.5)"
          this.setState((prevState)=>({
            numRed: (lineColor === 1) ? prevState.numRed+1 : prevState.numRed,
            numBlue: (lineColor === -1) ? prevState.numBlue+1 : prevState.numBlue,
            movesLeft: prevState.movesLeft-1,
            boxColors: newBoxColors,
          }))
        }
        }
        return madeSquare
}

getAiMove = (lines) =>{

    // console.log(lines)

    playableLines = []
    priorityLines = []
    goodLines = []
    // startLines = []
    badLines = []
    for (var key in lines){
      if (lines[key]===0){
        // console.log(lines[key],key)
        var splitCoord=key.split(',')
        var i = splitCoord[0]
        var j = splitCoord[1]
        var k = splitCoord[2]

        let value = 0

        if(i === "0"){
          value1 = this.checkSquare(j,k)
          value2 = this.checkSquare(parseFloat(j)-1,k)
        }else{
          value1 = this.checkSquare(k,j)
          value2 = this.checkSquare(k,parseFloat(j)-1)
        }

        switch(value1){
          case 3:
            priorityLines.push(key)
            break
          case 1:
          case 0:
            goodLines.push(key)
            break
          default:
            badLines.push(key)
        }
        switch(value2){
          case 3:
            priorityLines.push(key)
          case 1:
          case 0:
            goodLines.push(key)
            break
          default:
            badLines.push(key)
        }
      }
    }
    console.log("The Priority Lines are "+priorityLines)
    console.log("The Good Lines are "+goodLines)
    // console.log("The Start Lines are "+startLines)
    console.log("The Bad Lines are "+badLines)

    if (priorityLines.length !== 0){
      playableLines = priorityLines
    } else if (goodLines.length !== 0){
      playableLines = goodLines
    } else{
      playableLines = badLines
    }

    console.log("The Playable Lines are "+playableLines)

    var aichoice = playableLines[Math.floor(Math.random()*playableLines.length)]
    console.log("this is the choice"+aichoice)
  return aichoice
}

aIPlay = (newState) =>{


          
          var aiCoord = this.getAiMove(newState)
          console.log("value of ai move"+aiCoord, typeof aiCoord)
          if (typeof aiCoord == "undefined"){
            console.log("it works")
            this.checkGameOver()
            return
          }
          newState[aiCoord] = -1
          this.setState(prevState => ({
            lineCoordinates: newState,
          }))

          madeSquare = this.madeBoxes(aiCoord, newState)

          if (madeSquare !== 0){
            console.log("numred "+this.state.numRed)
            console.log("numblue "+this.state.numBlue)
            if(this.state.numRed+this.state.numBlue == this.state.boardSize**2){
              this.checkGameOver()
            }else{
                this.aIPlay(newState)
            }
          }

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
    // console.log(this.state.turn)
    console.log(this.state.lineCoordinates[currentCoord])
    if (this.state.lineCoordinates[currentCoord] === 0) {
      let newState=this.state.lineCoordinates
      newState[currentCoord] = 1
      this.setState(prevState => ({
        lineCoordinates: newState,
      }))
      
     var madeSquare = this.madeBoxes(currentCoord,newState)

      if (madeSquare === 0) {

        // var movesLeft = this.state.movesLeft

        this.aIPlay(newState)

      } 
      else {
        this.checkGameOver()
      }
      // this.checkturn()
    }
  }

  checkSquare = (j,k) => {
    var checker1 = Math.abs(this.state.lineCoordinates['0,'+j+','+k])
    var checker2 = Math.abs(((parseFloat(j)+1))>this.state.boardSize ? 0 : this.state.lineCoordinates['0,'+(parseFloat(j)+1)+','+k])
    var checker3 = Math.abs(this.state.lineCoordinates['1,'+k+','+j])
    var checker4 = Math.abs(((parseFloat(k)+1))>this.state.boardSize ? 0 : this.state.lineCoordinates['1,'+(parseFloat(k)+1)+','+j])
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

    let state = {
    boardSize: size,
    numRed: 0,
    numBlue: 0,
    winMessage: "",
    movesLeft: size**2,
    lineCoordinates: {},
    boxColors: {},
  }

  for (let i=0; i<2; i++){
    for (let j=0; j<state.boardSize+1; j++) {
      for (let k=0; k<state.boardSize; k++) {
        state.lineCoordinates[i+","+j+","+k]=0
      }
    }
  }
  for (let i=0; i< state.boardSize; i++) {
    for (let j=0; j< state.boardSize; j++) {
      state.boxColors[i+","+j] = "rgb(255,255,255)"
    }
  }
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

        {/*<Button title="Start Again" onPress={() => this.state = this.initialBoard(3)}/>*/}

      </View>
    )
  }
}


  


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