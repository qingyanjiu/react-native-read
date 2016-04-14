'use strict';

var React = require('react-native');
var TimerMixin = require('react-timer-mixin');
var tweenState = require('react-tween-state');
var Dimensions = require('Dimensions');


var {
  StyleSheet,
  View,
  Image,
  Text,
} = React;


var MainCirlceItem = React.createClass({
  getInitialState:function(){   
      return({
        //圆环颜色，忙闲程度
        borderColor:'#FFFFFF',
      });
  },

  // <View style={{backgroundColor:'white',height:120,width:120,borderRadius:60,position: 'absolute',top:Dimensions.get('window').height/2-60,left:Dimensions.get('window').width/2-60}}>
  //         </View>
  // <View style={{backgroundColor:'white',height:60,width:60,borderRadius:30,position: 'absolute',top:(Dimensions.get('window').height-Dimensions.get('window').width)/2+20,left:Dimensions.get('window').width/2-30}}>
          // </View>

  render: function() {
   return (
          <View style={[styles.circleItem,
            {height:this.props.raduis * 2,
            width:this.props.raduis * 2,
            borderRadius:this.props.raduis,
            top: this.props.top,
            left: this.props.left, 
            backgroundColor:this.state.borderColor,
          }]}>
            
            <Image style={{width:this.props.raduis*2 -2,height:this.props.raduis*2 -2,borderRadius:this.props.raduis -1,marginTop:1,marginLeft:1,}}
              source={{uri: this.props.image}}/>

            <Text style={styles.text}>
              张三
            </Text>

            <View style={[styles.badge,{
              marginTop:- 14- this.props.raduis*2 +4,
            }]}>
              <Text style={styles.badgeText}>2</Text>
            </View>

          </View>
      );
    }
  });


var styles = StyleSheet.create({
  //角标
  badge:{
    backgroundColor:'orange',
    width:14,
    height:14,
    borderRadius:7,
    alignSelf:'flex-end',
  },
  //圆item
  circleItem: {
    position: 'absolute',
  },
  //描述文字
  text:{
    fontSize:10,
    fontWeight:'bold',
    color:'#FFFFFF',
    backgroundColor:'#00FFFFFF',
    alignSelf:'center'
  },
  //角标文字
  badgeText:{
    fontSize:10,
    fontWeight:'bold',
    color:'#FFFFFF',
    backgroundColor:'#00FFFFFF',
    alignSelf:'center',
  },
});


module.exports = MainCirlceItem;