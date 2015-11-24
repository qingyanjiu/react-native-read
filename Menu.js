'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');


var {
  Image,
  StyleSheet,
  TextInput,
  PixelRatio,
  View,
  TouchableOpacity,
  Text
} = React;


var Menu = React.createClass({

/*点击时入参为空，将当前菜单编号0传给父组件Main.js的回调方法onMenuClickCallBack*/
  render: function() {
   return (
      <View style={{flex:1}}>
        <View style={ styles.header }>
        </View>
        <View style={styles.container}>

          <TouchableOpacity onPress={() => this.props.callBack('0')}>
            <Image
              style={styles.button}
              source={require('./img/search.png')}
            />
          </TouchableOpacity>
        </View>  
      </View>    
      );
    }
  });


var styles = StyleSheet.create({
  container:{
    paddingTop:5,
    backgroundColor:'222222',
    flex:1,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'flex-start',
    alignSelf:'flex-start',
    opacity:0.6
  },
  button: {
    margin:Dimensions.get('window').width*1/20,
    height:Dimensions.get('window').width*1/10,
    width:Dimensions.get('window').width*1/10,
    backgroundColor: '#00FFFFFF',
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    height: 60,
    backgroundColor: '#00FFFFFF'
  }
});

module.exports = Menu;