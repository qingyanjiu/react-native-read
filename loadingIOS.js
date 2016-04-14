'use strict';

var React = require('react-native');


var {
  StyleSheet,
  Text,
  PixelRatio,
  View,
  ActivityIndicatorIOS
} = React;


var loadingIOS = React.createClass({

  getDefaultProps: function() {
    return {
      txt:'123'
    };
  },

  render: function() {
    return (
      <View style={styles.container} >      
        <ActivityIndicatorIOS size='large' color='#555555'/>
        <Text style={{color:'#555555',fontSize:12,fontWeight:'bold'}}>{this.props.txt}</Text>
      </View>
    );
  }

});

var styles = StyleSheet.create({
  container:{
    backgroundColor:'#00000000',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

module.exports = loadingIOS;