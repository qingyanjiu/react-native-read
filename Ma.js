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
  NavigatorIOS,
  Text
} = React;


var Ma = React.createClass({

  render: function() {
   return (
        <View style={styles.container}>
          <Text style={{flex:1}}> 1ghghghggh</Text>
        </View>      
      );
    }
  });


var styles = StyleSheet.create({
  container:{
    paddingTop:100,
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