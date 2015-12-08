'use strict';

var React = require('react-native');
var TimerMixin = require('react-timer-mixin');
var tweenState = require('react-tween-state');
var Dimensions = require('Dimensions');


var {
  AppRegistry,
  StyleSheet,
  View,
} = React;


var Anim = React.createClass({
  mixins: [tweenState.Mixin],

  getInitialState:function(){   
      return({
        r:60,
        opacity:1,
      });
  },

  animationShow:function(){
    this.tweenState('opacity', {
        easing: tweenState.easingTypes.easeOutQuint,
        duration: 3000,
        endValue: 0,
        onEnd:this.setState({r:60,opacity:1})
      });
      this.tweenState('r', {
        easing: tweenState.easingTypes.easeOutQuint,
        duration: 2000,
        endValue: Dimensions.get('window').width,
        onEnd:this.animationShow,
      });
  },

  componentDidMount: function() {
    this.animationShow();
  },

  render: function() {
   return (
        <View style={styles.container}>
          <View style={[styles.circle,{width:this.getTweeningValue('r'),height:this.getTweeningValue('r'),borderRadius:this.getTweeningValue('r')/2,opacity: this.getTweeningValue('opacity'),}]}>
          </View>
          <View style={{backgroundColor:'white',height:100,width:100,borderRadius:50,position: 'absolute',top:Dimensions.get('window').height/2-50,left:Dimensions.get('window').width/2-50}}>
          </View>
        </View>      
      );
    }
  });


var styles = StyleSheet.create({
  container:{
    backgroundColor:'48BBEC',
    padding:30,
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  circle: {
    backgroundColor:'red',
  }
});


module.exports = Anim;