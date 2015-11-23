'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');


var {
  Image,
  StyleSheet,
  TextInput,
  PixelRatio,
  View,
  TouchableHighlight,
  Text
} = React;


var Ma = React.createClass({

  onClickHandler:function(){   
      this.props.navigator.pop();
  },
  render: function() {
   return (
        <View style={styles.container}>
          <Text style={{flex:1}}> Ma!!!</Text>
          <TouchableHighlight underlayColor='#99d9f4' onPress={this.onClickHandler.bind(this)} style={styles.button}><Text style={{color:'white'}}>闪</Text></TouchableHighlight>
        </View>      
      );
    }
  });


var styles = StyleSheet.create({
  container:{
    padding:30,
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  button: {
    height:20*PixelRatio.get(),
    width:Dimensions.get('window').width*2/3,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    marginTop:10,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

module.exports = Ma;