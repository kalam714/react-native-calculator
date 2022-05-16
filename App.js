import React from "react";

import {  StyleSheet,  View,Text,TouchableOpacity } from "react-native";
import { Component } from "react/cjs/react.production.min";

export default class App extends Component{

  constructor(props){
  super(props)
  this.state={
    resultText:'',
    result:'',
    history:''
  }
  this.operations=['AC','DEL','+','-','*','/']
}
   validation(){
     const text=this.state.resultText
     switch(text.slice(-1)){
       case '+':
       case '-':
       case '*':
       case '/':
          return false

     }
     return true
   }

   equalButton(){
     const text=this.state.resultText
     this.setState({
       result:eval(text),
   
       
     })
    
   }
  buttonPressed(text){
    if(text=='='){
      return this.validation() && this.equalButton()
    }
    this.setState({
      resultText: this.state.resultText+text
      
    })

  }
  performTask(op){
    switch(op){
      case 'AC':
        
        this.setState({
          resultText:'',
          result:''
        })
        break
     
        case 'DEL':
        let text=this.state.resultText.split('')
        text.pop()
        this.setState({
          resultText:text.join('')
        })
        break
        case '+':
        case '-':
        case '*':
        case '/':
          const lastChar=this.state.resultText.split('').pop()
          if(this.operations.indexOf(lastChar)>0) return
          if(this.state.text=='') return
          this.setState({
            resultText:this.state.resultText+op
          })

    }
  }

render(){
  let rows=[];
  let nums=[[1,2,3],[4,5,6],[7,8,9],['.',0,'=']]
  for(let i=0;i<4;i++){
    let row=[]
    for(let j=0;j<3;j++){
      row.push(<TouchableOpacity key={nums[i][j]}onPress={()=>this.buttonPressed(nums[i][j])} style={styles.btn}>
        <Text style={styles.btnText}>{nums[i][j]}</Text>
      </TouchableOpacity>)
    }
    rows.push(<View style={styles.row}>{row}</View>)
  }
   
  let ops=[]
  for(let i=0;i<6;i++){
    ops.push(<TouchableOpacity key={this.operations[i]}style={styles.btn} onPress={()=>this.performTask(this.operations[i])}>
      <Text style={styles.white} key={this.operations[i]}>{this.operations[i]}</Text>
    </TouchableOpacity>)
  }


  
    return(
    <View style={styles.container}>
    <View style={styles.result}>
      <Text style={styles.resultText}>{this.state.resultText}</Text>
    </View>
    <View style={styles.calcultion}>
    {/* <Text style={styles.calcultionText}>{this.state.resultText}</Text> */}
    <Text style={styles.calcultionText}>{this.state.result}</Text>
    </View>
      <View style={styles.buttons}>
      <View style={styles.numbers}>
        {rows}
      </View>
      <View style={styles.operations}>
      
       {ops}
      </View>
        </View>

   </View>
    )
  }

}
const styles = StyleSheet.create({
  container:{
    flex:1
  },
  btnText:{
    fontSize:35
  },
  resultText:{
    fontSize:30,
    color:'black'
  },
  calcultionText:{
    fontSize:16,
    color:'black'
  },
  row:{
    flexDirection:'row',
    flex:1,
    justifyContent:'space-around',
    
    
  },
 
  result:{
    flex:1,
    backgroundColor:'#808080',
    justifyContent:'center',
    alignItems:'flex-end'

  },
  calcultion:{
    flex:1,
    backgroundColor:'white',
    justifyContent:'center',
    alignItems:'flex-end'
  },
  buttons:{
    flex:7,
    flexDirection:'row'
  },
  numbers:{
    flex:3,
    backgroundColor:'gray'
  },
  
  operations:{

    justifyContent:'space-around',
    alignItems:'stretch',
    backgroundColor:'black'
  },
  white:{
    flex:1,
    color:'white',
    paddingLeft:5.0,
    marginLeft:10.0,
    fontSize:30
  }

  
});

