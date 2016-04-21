'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');

var GiftedListView = require('react-native-gifted-listview');

var Constants = require('./Constants');
var Utils = require('./Utils');
var ReadFoot = require('./ReadFoot');



var {
  Image,
  StyleSheet,
  TextInput,
  View,
  ListView,
  TouchableOpacity,
  TouchableHighlight,
  Text,
  StatusBar,
  Modal,
} = React;

var sessid;

var screenWidth = Dimensions.get('window').width;
var screenHeight = Dimensions.get('window').height;

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}) // assumes immutable objects

var ReadSearch = React.createClass({


  getInitialState:function(){
    return({
      text:'',
      searchText:'',
      page:1,
      menuSelectedId:this.props.menuSelectedId,
      modalVisible:false,
    });
  },

  componentWillMount:function(){
    //获取本地保存的sessionid
    Utils.getSessionId(
      function(data){
        sessid = data;
      }
    );
  },

  componentDidMount:function(){
    StatusBar.setBarStyle(1);
    
  },


  //后退按钮，暂时没用上
  onBackClickHandler:function(){   
      this.props.navigator.pop();
  },

  //点击菜单选择相应页面
  onMenuClickCallBack:function(menuId){

      this.props.navigator.replace({
        name: '',
        id: menuId,          
        //跳转到main页面（routeid为1） 然后传递最新点击的菜单id过去选中，同时菜单id也决定页面中显示内容的不同 render方法中做判断
        passProps:{
          menuSelectedId:menuId
        },
      });
  },

  /**
   * Will be called when refreshing
   * Should be replaced by your own logic
   * @param {number} page Requested page to fetch
   * @param {function} callback Should pass the rows
   * @param {object} options Inform if first load
   */
  _onFetch(page = this.state.page, callback, options) {
      //查询书籍列表信息
      fetch(Constants.URL+'/read/book/search',
            {
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'post',
            body: JSON.stringify({
                'sessionid':sessid,
                'type':'ios',
                'text':this.state.searchText,
                'page': page
            })
        })
        //这里不用转换，根据后台返回的值来定
        .then((response) => response.json())
        .then((json) => {
          var rows = json.books;
          if (page === Math.ceil(json.total/10)) {
            callback(rows, {
              allLoaded: true, // the end of the list is reached
            });        
          } else {
            callback(rows);
          }
          })
          .catch((error) => {
            alert("获取书籍失败，请重试");
          });  
    },


  /**
   * When a row is touched
   * @param {object} rowData Row data
   */
  _onPress(rowData) {
    alert(rowData.id+' pressed');
  },

  /**
   * Render a row
   * @param {object} rowData Row data
   */
  _renderRowView(rowData) {
    return (
      <TouchableHighlight
        underlayColor='#c8c7cc'
        onPress={() => this._onPress(rowData)}
        >  
        <View style={customStyles.row} key={rowData.id}>
          <Image style={{height:120,width:90,marginLeft:10}} source={{uri: rowData.images.large}}> 
          </Image>
          <View style={{flexDirection:'column',alignItems:'flex-start',justifyContent:'center',marginLeft:20}}>
            <Text style={{width:screenWidth-120,fontSize:20,paddingBottom:6,flexWrap:'wrap'}}>{rowData.title}</Text> 
            <Text style={{width:screenWidth-120,fontSize:12,paddingBottom:6,flexWrap:'wrap'}}>{rowData.author}</Text>
            <Text style={{fontSize:10,}}>豆瓣评分:{rowData.rating.average}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  },

  /**
   * Render a row
   * @param {object} rowData Row data
   */
  _renderSectionHeaderView(sectionData, sectionID) {
    return (
      <View style={customStyles.header}>
        <Text style={customStyles.headerTitle}>
          {sectionID}
        </Text>
      </View>
    );
  },
  
  /**
   * Render the refreshable view when waiting for refresh
   * On Android, the view should be touchable to trigger the refreshCallback
   * @param {function} refreshCallback The function to call to refresh the listview
   */
  _renderRefreshableWaitingView(refreshCallback) {
    if (Platform.OS !== 'android') {
      return (
        <View style={customStyles.refreshableView}>
          <Text style={customStyles.actionsLabel}>
            ↓
          </Text>
        </View>
      );
    } else {
      return (
        <TouchableHighlight 
          underlayColor='#c8c7cc'
          onPress={refreshCallback}
          style={customStyles.refreshableView}
        >
          <Text style={customStyles.actionsLabel}>
            ↻
          </Text>
        </TouchableHighlight>
      );
    }
  },

  /**
   * Render the refreshable view when the pull to refresh has been activated
   * @platform ios
   */
  _renderRefreshableWillRefreshView() {
    return (
      <View style={customStyles.refreshableView}>
        <Text style={customStyles.actionsLabel}>
          ↻
        </Text>
      </View>
    );
  },

  /**
   * Render the refreshable view when fetching
   */
  _renderRefreshableFetchingView() {
    return (
      <View style={customStyles.refreshableView}>
        <GiftedSpinner />
      </View>
    );
  },
  
  /**
   * Render the pagination view when waiting for touch
   * @param {function} paginateCallback The function to call to load more rows
   */
  _renderPaginationWaitingView(paginateCallback) {
    return (
      <TouchableHighlight 
        underlayColor='#c8c7cc'
        onPress={paginateCallback}
        style={customStyles.paginationView}
      >
        <Text style={[customStyles.actionsLabel, {fontSize: 13}]}>
          点我查看更多结果
        </Text>
      </TouchableHighlight>
    );
  },
  
  /**
   * Render the pagination view when fetching
   */
  _renderPaginationFetchigView() {
    return (
      <View style={customStyles.paginationView}>
        <GiftedSpinner />
      </View>
    );
  },
  
  /**
   * Render the pagination view when end of list is reached
   */
  _renderPaginationAllLoadedView() {
    return (
      <View style={customStyles.paginationView}>
        <Text style={customStyles.actionsLabel}>
          已经没有啦
        </Text>
      </View>
    );
  },
  
  /**
   * Render a view when there is no row to display at the first fetch
   * @param {function} refreshCallback The function to call to refresh the listview
   */
  _renderEmptyView(refreshCallback) {
    return (
      <View style={customStyles.defaultView}>
        <Text style={customStyles.defaultViewTitle}>
          没有找到结果~
        </Text>
        
        <TouchableHighlight 
          underlayColor='#c8c7cc'
          onPress={refreshCallback}
        >
          <Text>
            ↻
          </Text>
        </TouchableHighlight>
      </View>
    );
  },
  
  /**
   * Render a separator between rows
   */
  _renderSeparatorView() {
    return (
      <View style={customStyles.separator} />
    );
  },

  render: function() {

  //弹出框内容
    var modalView;
    if(this.state.modalVisible){
      modalView = 
        <View style={styles.modal}>
          <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
            <TextInput style={styles.inputs} placeholder={'请输入书名'} textAlign={'center'} onChangeText={(text) => this.setState({text:text})} value={this.state.text}> 
            </TextInput>
            <TouchableOpacity style={styles.button} onPress={()=>{this.setState({searchText:this.state.text,modalVisible:false});}}>
              <Image source={require('../img/search.png')} style={{width:26,height:30,tintColor:'rgba(255,255,255,0.6)'}} resizeMode={'contain'}/>
            </TouchableOpacity>
          </View>
            <TouchableOpacity style={{backgroundColor:'#FFFFFF',width:60,height:60,borderRadius:30,alignItems:'center',
              justifyContent:'center',bottom:10,left:screenWidth/2-30,position:'absolute'}} onPress={()=>{this.setState({modalVisible:false});}}>
              <Text>关闭</Text>
            </TouchableOpacity>
        </View>
      }
    //弹出框
    var modal;
    modal=
      <Modal
          animated={true}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {this._setModalVisible(false)}}
          > 
          {modalView}
      </Modal>;

  var content;
  if(this.state.searchText !== '')
    content = (
      <GiftedListView
          rowView={this._renderRowView}
          
          onFetch={this._onFetch}
          initialListSize={10} // the maximum number of rows displayable without scrolling (height of the listview / height of row)

          firstLoader={false} // display a loader for the first fetching
      
          pagination={true} // enable infinite scrolling using touch to load more
          paginationFetchigView={this._renderPaginationFetchigView}
          paginationAllLoadedView={this._renderPaginationAllLoadedView}
          paginationWaitingView={this._renderPaginationWaitingView}

          refreshable={false} // enable pull-to-refresh for iOS and touch-to-refresh for Android
          refreshableViewHeight={50} // correct height is mandatory
          refreshableDistance={200} // the distance to trigger the pull-to-refresh - better to have it lower than refreshableViewHeight
          refreshableFetchingView={this._renderRefreshableFetchingView}
          refreshableWillRefreshView={this._renderRefreshableWillRefreshView}
          refreshableWaitingView={this._renderRefreshableWaitingView}
          
          emptyView={this._renderEmptyView}
          
          renderSeparator={this._renderSeparatorView}
          
          withSections={false} // enable sections
          
          PullToRefreshViewAndroidProps={{
            colors: ['#fff'],
            progressBackgroundColor: '#003e82',
          }}
        ></GiftedListView>
    );
    else
      content = <View></View>

   return (
       <View style={{flex:1}}>

        <View style={ styles.header }>
          <View style={styles.headerLeftMenu}>
              <TouchableOpacity><Image style={styles.headerImg}
                source={require('../img/head_icon_scan.png')} resizeMode={'contain'}/>
              </TouchableOpacity>
            </View>

          <TouchableOpacity onPress={()=>{this.setState({modalVisible:true});}}>
            <Image style={{height:20,marginBottom:12}} source={require('../img/logo.png')} resizeMode={'contain'}/>
          </TouchableOpacity>

          <View style={styles.headerRightMenu}>
              <TouchableOpacity onPress={this.props.openModalCallBack}><Image style={styles.headerImg}
                source={require('../img/head_icon_share.png')} resizeMode={'contain'}/>
              </TouchableOpacity>
            </View>
        </View>


        <View style={styles.container}>
          {modal}
          {content}
        </View>

        <ReadFoot callback={(menuId)=>{this.onMenuClickCallBack(menuId)}} selectedId={this.state.menuSelectedId}>
        </ReadFoot>

      </View>  
      );
    }
  });


var styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#FFFFFF',
  },
  
  modalContainer:{
    flex:1,
    flexDirection:'row',
    justifyContent:'flex-end',
  },
  header: {
    height: 60,
    backgroundColor: 'rgba(219,188,86,0.8)',
    borderBottomWidth:0,
    flexDirection:'row',
    marginBottom:1,
    justifyContent:'center',
    alignItems:'flex-end'
  },
  headerLeftMenu:{
    flex:1,
    justifyContent:'flex-start',
  },
  headerRightMenu:{
    flex:1,
    flexDirection:'row',
    justifyContent:'flex-end',
  },
  headerImg:{
    height:34,
    marginBottom:4,
  },
  modal: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'rgba(153,204,255,1)',
  },
  inputs: {
    flex:4,
    height:32,
    width:250,
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderWidth: 0,
    borderColor: '#DDDDDD',
    borderRadius:16,
    marginTop:40,
  },
  button: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:40,
    marginLeft:6
  }
});

var customStyles = {
  separator: {
    height: 1,
    backgroundColor: '#CCC'
  },
  refreshableView: {
    height: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionsLabel: {
    fontSize: 20,
    color: '#007aff',
  },
  paginationView: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  defaultView: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  defaultViewTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  row: {
    height: 120,
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
  },
  header: {
    backgroundColor: '#50a4ff',
    padding: 10,
  },
  headerTitle: {
    color: '#fff',
  },
};

module.exports = ReadSearch;