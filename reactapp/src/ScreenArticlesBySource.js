import React, { useState, useEffect } from "react";
import "./App.css";
import { Card, Icon, Modal } from "antd";
import Nav from "./Nav";
import { connect } from "react-redux";

const { Meta } = Card;

function ScreenArticlesBySource(props) {
  const [articleList, setArticleList] = useState([]);

  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const findArticles = async () => {
      const data = await fetch(
        `https://newsapi.org/v2/top-headlines?sources=${props.match.params.id}&apiKey=66a1f76cc965462e9337b6a01968e4fd
        `
      );
      const body = await data.json();
      setArticleList(body.articles);
    };
    findArticles();
  }, []);

  var likeArticle = async (arg) => {
    props.addToWishList(arg);

    var rawResponse = await fetch("/wishList", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `titre=${arg.title}&image=${arg.urlToImage}&description=${arg.content}&token=${props.tokenFromStore}`,
    });
    var response = await rawResponse.json();
    console.log("reponse from RAW RESPONSE ----->", response);
  };

  var showModal = (title, content) => {
    setVisible(true);
    setTitle(title);
    setContent(content);
  };

  var handleOk = (e) => {
    console.log(e);
    setVisible(false);
  };

  var handleCancel = (e) => {
    console.log(e);
    setVisible(false);
  };

  return (
    <div>
      <Nav />

      <div className="Banner" />

      <div className="Card">
        {articleList.map((article, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "center" }}>
            <Card
              style={{
                width: 300,
                margin: "15px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
              cover={<img alt="example" src={article.urlToImage} />}
              actions={[
                <Icon
                  type="read"
                  key="ellipsis2"
                  onClick={() => showModal(article.title, article.content)}
                />,
                <Icon
                  type="like"
                  key="ellipsis"
                  onClick={() => {
                    likeArticle(article);
                  }}
                />,
              ]}
            >
              <Meta title={article.title} description={article.description} />
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

function mapStateToProps(state) {
  return { tokenFromStore: state.token };
}

function mapDispatchToProps(dispatch) {
  return {
    addToWishList: function (article) {
      dispatch({ type: "addArticle", articleLiked: article });
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScreenArticlesBySource);
