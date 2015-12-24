'use strict';

var React = require('react-native');


var {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Modal
} = React;


var Modal = React.createClass({

  getInitialState:function(){   
      return({
        modalShow:false,
      });
  },


    //显示下拉菜单
  _openModalMenu:function(){
    this.setState({
      modalShow:true,
    });
  },
  //隐藏下拉菜单
  _closeModalMenu:function(){
    this.setState({
      modalShow:false,
    });
  },

  render: function() {
   return (
        
        <View style={styles.container}>
          
          <Modal
            animated={true}
            transparent={true}
            visible={this.state.modalShow}>
            <View style={styles.modalContainer}>
              <View style={styles.modalMenu}>
                <TouchableOpacity style={styles.modalMenuItem}>
                  <Text>关闭广告</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalMenuItem}>
                  <Text>    设置    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this._closeModalMenu} style={[styles.modalMenuItem,{borderBottomWidth:0}]}>
                  <Text>取消</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

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
  modalContainer:{
    flex:1,
    flexDirection:'row',
    justifyContent:'flex-end',
  },
  modalMenu:{
    alignItems:'center',
    justifyContent:'center',
    width:70,
    height:140,
    marginTop:60,
    backgroundColor:'#FFFFFF',
  },
  modalMenuItem:{
    flex:1,
    justifyContent:'center',
    borderBottomColor:'#dddddd',
    borderBottomWidth:1,
  },
});

module.exports = Modal;