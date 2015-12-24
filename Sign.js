'use strict';

var React = require('react-native');
var TimerMixin = require('react-timer-mixin');
var tweenState = require('react-tween-state');
var Dimensions = require('Dimensions');


var {
  AppRegistry,
  StyleSheet,
  View,
  Image,
  TouchableOpacity
} = React;


var Sign = React.createClass({
  mixins: [tweenState.Mixin,TimerMixin],

  getInitialState:function(){   
      return({
        r:100,
        opacity:1,
      });
  },

  animationShow:function(){
    this.tweenState('opacity', {
        easing: tweenState.easingTypes.easeOutQuint,
        duration: 3000,
        endValue: 0.01,
        onEnd:this.setState({r:100,opacity:1})
      });
      this.tweenState('r', {
        easing: tweenState.easingTypes.easeOutQuint,
        duration: 3000,
        endValue: Dimensions.get('window').width,
        onEnd:this.animationShow,
      });
  },

  componentDidMount: function() {
    this.animationShow();
  },

  render: function() {
   return (

        <View style={{flex:1,justifyContent:'center',}}>
          <View style={ styles.header }>
            <View style={styles.headerLeftMenu}>
              <TouchableOpacity><Image style={styles.headerImg}
                source={require('./img/exit.png')}/>
              </TouchableOpacity>
            </View>
            <View style={styles.headerRightMenu}>
              <TouchableOpacity><Image style={[styles.headerImg,{marginRight:10}]}
                source={require('./img/chart.png')}/>
              </TouchableOpacity>

              <TouchableOpacity onPress={this.props.openModalCallBack}><Image style={styles.headerImg}
                source={require('./img/menu.png')}/>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.container}>
            <View style={[styles.circle,{width:this.getTweeningValue('r'),height:this.getTweeningValue('r'),borderRadius:this.getTweeningValue('r')/2,opacity: this.getTweeningValue('opacity'),alignItems:'center',justifyContent:'center'}]}>
             
            </View>

            <Image style={{backgroundColor:'white',height:100,width:100,borderRadius:50,position: 'absolute',top:Dimensions.get('window').height/2-50-30,left:Dimensions.get('window').width/2-50}} source={require('./img/sign.png')}/> 

          </View>    
        </View>  
      );
    }
  });


var styles = StyleSheet.create({
  container:{
    backgroundColor:'white',
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  circle: {
    backgroundColor:'blue',
  },
  header: {
    height: 60,
    backgroundColor: '#005dd5',
    borderBottomWidth:1,
    borderBottomColor:'#00aaaaaa',
    flexDirection:'row',
  },
  headerLeftMenu:{
    flex:1,
    justifyContent:'flex-start',
    paddingTop:16,
    paddingLeft:6,
  },
  headerRightMenu:{
    flex:1,
    flexDirection:'row',
    justifyContent:'flex-end',
    paddingTop:16,
    paddingRight:6,
  },
  headerImg:{
    width:40,
    height:40,
  },
});

module.exports = Sign;