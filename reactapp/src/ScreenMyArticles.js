import React, {useState, useEffect} from 'react';
import './App.css';
import { Card, Icon, Modal} from 'antd';
import Nav from './Nav'

import {connect} from 'react-redux'

const { Meta } = Card;

function ScreenMyArticles(props) {
  const [visible, setVisible] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')


  const [myArticles, setMyArticles] = useState([])

  useEffect(() => {
    const articleFromBDD = async () => {
      const rawData = await fetch('/watchWishList', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: `token=${props.tokenFromStore}`
      })
      const data = await rawData.json()
      console.log(data)
      if(data.userArticle){
        setMyArticles(data.userArticle)
      }
      // var dataArticles = data.userArticle.article
      // console.log("data.userArticle.article ---->" , dataArticles)
      // setMyArticles(dataArticles)
    }
    articleFromBDD()
  },[])

    // pour le delete
    var deleteArticle = async (arg) => {
      props.deleteToWishList(arg)
      console.log("arg ---->", arg)

      var rawResponse= await fetch('https://jsonplaceholder.typicode.com/users/5', {
        method: 'DELETE'
      });
      deleteArticle()
      var response = await rawResponse.json();
      console.log("response from RAW RESPONSE DELETE ----->",response)
    }

  var showModal = (title, content) => {
    setVisible(true)
    setTitle(title)
    setContent(content)

  }

  var handleOk = e => {
    console.log(e)
    setVisible(false)
  }

  var handleCancel = e => {
    console.log(e)
    setVisible(false)
  }

  var noArticles
  if(myArticles.length == 0){
    noArticles = <div style={{marginTop:"30px"}}>No Articles</div>
  }

  return (
    <div>
         
            <Nav/>

            <div className="Banner"/>

            {noArticles}

            <div className="Card">
    

            {myArticles.map((article,i) => (
                <div key={i} style={{display:'flex',justifyContent:'center'}}>

                  <Card
                    
                    style={{ 
                    width: 300, 
                    margin:'15px', 
                    display:'flex',
                    flexDirection: 'column',
                    justifyContent:'space-between' }}
                    cover={
                    <img
                        alt="img"
                        src={article.urlToImage}
                    />
                    }
                    actions={[
                        <Icon type="read" key="ellipsis2" onClick={() => showModal(article.title,article.content)} />,
                        <Icon type="delete" key="ellipsis" onClick={() => props.deleteToWishList(article.title)} />
                    ]}
                    >

                    <Meta
                      title={article.title}
                      description={article.description}
                    />

                  </Card>
                  <Modal
                    title={title}
                    visible={visible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                  >
                    <p>{title}</p>
                  </Modal>

                </div>

              ))}



       

                

             </div>
      
 

      </div>
  );
}

function mapStateToProps(state){
  return {myArticles: state.wishList, tokenFromStore: state.token}
}

function mapDispatchToProps(dispatch){

  return {
    deleteToWishList: function(articleTitle){
      dispatch({type: 'deleteArticle',
        title: articleTitle
      },)
    },
    addToWishList: function(article){
      dispatch({type: 'addArticle',
        articleLiked: article
      },)
    }
  }
  
}




export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScreenMyArticles);
