'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var Drawer = require('react-native-drawer')


var {
  Image,
  StyleSheet,
  TextInput,
  PixelRatio,
  View,
  TouchableHighlight,
  Text,
  StatusBarIOS
} = React;


var Sign = React.createClass({
  componentDidMount:function(){
    StatusBarIOS.setStyle(1);
  },

  getInitialState:function(){
    return({
      //TODO
      menuSelectedId:'1',
    });
  },

  onClickHandler:function(){   
      this.props.navigator.push({
        name: 'Ma',
        id: 2,});
  },


  render: function() {
   return (
      <View style={{flex:1}}>
        <View style={ styles.header }>
        </View>
        <View style={styles.container}>
          <Text style={{flex:1}}> hahaha</Text>
          <TouchableHighlight underlayColor='#99d9f4' onPress={this.onClickHandler.bind(this)} style={styles.button}><Text style={{color:'white'}}>跳111111</Text></TouchableHighlight>
        </View>
      </View>
      );
    }
  });


var styles = StyleSheet.create({
  container:{
    padding:30,
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#0085C4',
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
  },
  header: {
    height: 60,
    backgroundColor: '#005dd5',
    borderBottomWidth:1,
    borderBottomColor:'#00aaaaaa',
  }
});

module.exports = Sign;