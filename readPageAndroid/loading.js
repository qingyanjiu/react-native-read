'use strict';

var React = require('react-native');

import Spinner from 'react-native-loading-spinner-overlay';

var {
  StyleSheet,
  Text,
  PixelRatio,
  View,
  ActivityIndicatorIOS
} = React;


var loading = React.createClass({

  render: function() {
    return (
      <Spinner visible={true} size="large" color="rgba(255,255,255,1)"/>
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

module.exports = loading;