'use strict';

var React = require('react-native');
var TimerMixin = require('react-timer-mixin');
var tweenState = require('react-tween-state');
var Dimensions = require('Dimensions');

var MainCircleItem = require('./MainCircleItem');


var {
  StyleSheet,
  View,
} = React;


var MainCirlce = React.createClass({
  mixins: [tweenState.Mixin],

  getInitialState:function(){   
      return({
        //整个圆环圆心相对于左上角x坐标
        circlePointX:Dimensions.get('window').width/2,
        //整个圆环圆心相对于左上角Y坐标
        circlePointY:Dimensions.get('window').height/2 -30,
        //整个圆环半径
        circleRadius:Dimensions.get('window').width/2,
        //中心圆环半径
        centerRadius:50,
        //小圆圈数量
        suroundCircleNumber:8,
        //小圆圈离最外延的距离
        suroundCirclePaddingOut:26,
        //小圆圈半径
        suroundCircleRaduis:30,
      });
  },

  // <View style={{backgroundColor:'white',height:120,width:120,borderRadius:60,position: 'absolute',top:Dimensions.get('window').height/2-60,left:Dimensions.get('window').width/2-60}}>
  //         </View>
  // <View style={{backgroundColor:'white',height:60,width:60,borderRadius:30,position: 'absolute',top:(Dimensions.get('window').height-Dimensions.get('window').width)/2+20,left:Dimensions.get('window').width/2-30}}>
          // </View>

  render: function() {
    var images = ["http://i1.tietuku.com/c5ac715bbaca4c87.png",
            "http://i1.tietuku.com/9f7069f1f1dcb4e0.png",
            "http://i2.tietuku.com/f2797d9c742c8a9a.png",
            "http://i2.tietuku.com/7c9668c12da43638.png",
            "http://i1.tietuku.com/e0aff458ab448a63.png",
            "http://i1.tietuku.com/a42209775fdf1a1b.png",
            "http://i1.tietuku.com/4ed54b20418e0752.png",
            "http://i1.tietuku.com/9a775127243030cd.png"];

    //
    //要生成多个组件的时候，不能用加号来加，要定义一个数组，将多个组件push进去
    //
    var items = [];
    for(var i=0;i<this.state.suroundCircleNumber;i++){
      items.push(
        <MainCircleItem 
          top={this.state.circlePointY - Math.cos((2*Math.PI /360) * 360/this.state.suroundCircleNumber *i) * (this.state.circleRadius - this.state.suroundCircleRaduis - this.state.suroundCirclePaddingOut) - this.state.suroundCircleRaduis}
          left={Math.sin((2*Math.PI / 360) * 360/this.state.suroundCircleNumber*i) * (this.state.circleRadius - this.state.suroundCircleRaduis - this.state.suroundCirclePaddingOut) + this.state.circlePointX - this.state.suroundCircleRaduis} 
          raduis={this.state.suroundCircleRaduis} 
          paddingOut={this.state.suroundCirclePaddingOut} 
          image={images[i]}
        >
        </MainCircleItem>
        );
    }

   return (
        <View style={styles.container}>
          <View style={styles.circle}>
          </View>

          <View style={{backgroundColor:'white',
            height:this.state.centerRadius*2,
            width:this.state.centerRadius*2,
            borderRadius:this.state.centerRadius,
            position: 'absolute',
            top:this.state.circlePointY - this.state.centerRadius,
            left:this.state.circlePointX - this.state.centerRadius,
          }}>
          </View>

          {items}

        </View>      
      );
    }
  });


var styles = StyleSheet.create({
  container:{
    backgroundColor:'0085C4',
    padding:30,
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  circle: {
    backgroundColor:'#1B96C8',
    width:Dimensions.get('window').width -10,
    height:Dimensions.get('window').width -10,
    borderRadius:(Dimensions.get('window').width -10)/2,
    opacity:0.6,
    borderWidth:10,
    borderColor:'#2EA5D4',
  },
});


module.exports = MainCirlce;