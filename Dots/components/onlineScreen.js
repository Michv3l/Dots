import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { collection, doc, addDoc, getDocs, setDoc, getDocFromCache, query, where, onSnapshot } from "firebase/firestore"; 
import firebaseApp from '../database/firebase';

import React, { Component } from 'react';
import { SafeAreaView, FlatList, StyleSheet, ScrollView, Text, View, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import { loadOptions } from "@babel/core";


class Scores {

	_daily = 0;
	_weekly = 0;
	_total = 0;
	_uname = "";
	get daily() {
		return this._daily;
	}
	set daily(value) {
		this._daily = value;
	}
	
	get total() {
		return this._total;
	}
	set total(value) {
		this._total = value;
	}
	
	get weekly() {
		return this._weekly;
	}
	set weekly(value) {
		this._weekly = value;
	}
	
	get uname() {
		return this._uname;
	}
	set uname(value) {
		this._uname = value;
	}
	
    constructor (daily, total, weekly, uname ) {
        this.daily = daily;
        this.total = total;
        this.weekly = weekly;
		this.uname = uname;
    }


    toString() {
        return this.daily + ', ' + this.weekly+ ', ' + this.total+ ', '+this.uname;
    }
}

// Firestore data converter
const scoresConverter = {
    toFirestore: (scores) => {
        return {
            total: scores.total,
			daily: scores.daily,
			weekly: scores.weekly,
			uname: scores.uname,
            };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Scores(data.Daily, data.Weekly, data.Total, data.Username);
    }
};

async function addData(){
		// const db = getFirestore(firebaseApp);
		// console.log("restart")
		// const daily = []
		// const weekly = []
		// const total = []
		// const querySnapshot = await getDocs(collection(db, "Scores").withConverter(scoresConverter));
		// querySnapshot.forEach((doc) => {
		// 	const scores = doc.data();
		// 	console.log(scores.toString())
		// 	dsc = {name: scores._uname, score: scores._daily}
		// 	daily.push(dsc)
		// 	wsc = {name: scores._uname, score: scores._weekly}
		// 	weekly.push(wsc)
		// 	tsc = {name: scores._uname, score: scores._total}
		// 	total.push(tsc)
		// });
		// console.log(daily)
		// console.log(weekly)
		// console.log(total)
		// this.setState(prevState => ({
		// 	daily_Scores: daily,
		// 	weekly_Scores: weekly,
		// 	total_Scores: total,
		//   }))

		const db = getFirestore(firebaseApp);
		const query = await getDocs(collection(db,"Scores").withConverter(scoresConverter))
		const unsub = onSnapshot(query,(querySnapshot) =>{
			const scores = [];
			querySnapshot.forEach((doc) => {
				scores.push(doc.data().Daily);
			});
			console.log("Current cities in CA: ", scores.join(", "))
		})


	}

export default class OnlineScreen extends Component {

	constructor(){

		super();
		this.state = {
			daily_Scores: [],
			weekly_Scores: [],
			total_Scores: []
		}

	}

	componentDidMount(){

		
		// const querySnapshot = getDocs(collection(db, "Scores").withConverter(scoresConverter).onSnapshot)
		// var daily = []
		// var weekly = []
		// var total = []
		// querySnapshot.forEach((doc) => {
		// 	dsc = {name: scores._uname, score: scores._daily}
		// 	daily.push(dsc)
		// 	wsc = {name: scores._uname, score: scores._weekly}
		// 	weekly.push(wsc)
		// 	tsc = {name: scores._uname, score: scores._total}
		// 	total.push(tsc)
		// })
		// this.setState(prevState => ({
		// 	daily_Scores: daily,
		// 	weekly_Scores: weekly,
		// 	total_Scores: total,
		//   }))
	 }

	render(){

		addData();
		

		return(

		    <SafeAreaView style={styles.container}>
		      <FlatList 
		        data={persons}
		        renderItem={({ item }) => <Text style={styles.item}>{'\t'}{item.name}{'\t'}{'\t'}{'\t'}{item.score}</Text>}
		        keyExtractor={(item) => item.score}
		        ItemSeparatorComponent={myItemSeparator}
		        ListEmptyComponent={myListEmpty}
		        ListHeaderComponent={() => (
				      <Text style={{ fontSize: 18, textAlign: "center",marginTop:20,fontWeight:'bold',textDecorationLine: 'underline' }}>
				      Daily High Scores
				      </Text>
				  )}
				  ListFooterComponent={() => (
				      <Text style={{ fontSize: 20, textAlign: "center",marginBottom:20,fontWeight:'bold' }}>Go back to top</Text>
				  )}
		      />

		      <FlatList 
		        data={persons}
		        renderItem={({ item }) => <Text style={styles.item}>{'\t'}{item.name}{'\t'}{'\t'}{'\t'}{item.id}</Text>}
		        keyExtractor={(item) => item.id}
		        ItemSeparatorComponent={myItemSeparator}
		        ListEmptyComponent={myListEmpty}
		        ListHeaderComponent={() => (
				      <Text style={{ fontSize: 18, textAlign: "center",marginTop:20,fontWeight:'bold',textDecorationLine: 'underline' }}>
				      Weekly High Scores
				      </Text>
				  )}
				  ListFooterComponent={() => (
				      <Text style={{ fontSize: 20, textAlign: "center",marginBottom:20,fontWeight:'bold' }}>Go back to top</Text>
				  )}
		      />

		      <FlatList 
		        data={persons}
		        renderItem={({ item }) => <Text style={styles.item}>{'\t'}{item.name}{'\t'}{'\t'}{'\t'}{item.id}</Text>}
		        keyExtractor={(item) => item.id}
		        ItemSeparatorComponent={myItemSeparator}
		        ListEmptyComponent={myListEmpty}
		        ListHeaderComponent={() => (
				      <Text style={{ fontSize: 18, textAlign: "center",marginTop:20,fontWeight:'bold',textDecorationLine: 'underline' }}>
				      Overall High Scores
				      </Text>
				  )}
				  ListFooterComponent={() => (
				      <Text style={{ fontSize: 20, textAlign: "center",marginBottom:20,fontWeight:'bold' }}>Go back to top</Text>
				  )}
		      />
		    </SafeAreaView>


			)
	}

}

const myItemSeparator = () => {
	  return (
	    <View
	     style={{ height: 1, backgroundColor: "gray", marginHorizontal:10 }}
	    />
	  );
	};


const myListEmpty = () => {
	  return (
	    <View style={{ alignItems:"center" }}>
	    <Text style={styles.item}>No data found</Text>
	    </View>
	  );
	};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
  },
  item: {
    padding: 15,
    fontSize: 15,
    marginTop: 5,
  }
});

const persons = [
  {
	id: "1",
	name: "Earnest Green",
  },
  {
	id: "2",
	name: "Winston Orn",
  },
  {
	id: "3",
	name: "Carlton Collins",
  },
  {
	id: "4",
	name: "Malcolm Labadie",
  },
  {
	id: "5",
	name: "Michelle Dare",
  },
  {
	id: "6",
	name: "Carlton Zieme",
  },
  {
	id: "7",
	name: "Jessie Dickinson",
  },
  {
	id: "8",
	name: "Julian Gulgowski",
  },
  {
	id: "9",
	name: "Ellen Veum",
  },
  {
	id: "10",
	name: "Lorena Rice",
  },

  {
	id: "11",
	name: "Carlton Zieme",
  },
  {
	id: "12",
	name: "Jessie Dickinson",
  },
  {
	id: "13",
	name: "Julian Gulgowski",
  },
  {
	id: "14",
	name: "Ellen Veum",
  },
  {
	id: "15",
	name: "Lorena Rice",
  },
];

