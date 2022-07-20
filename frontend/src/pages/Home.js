import React from 'react';
import HomeMenu from '../components/home/HomeMenu';

console.log(process.env.REACT_APP_TEST)

const Popular = () => {
  const popularList = ['room1', 'room2', 'room3']

  return (
    <div>
      <h2>최근 핫한방</h2>
      <ul>
        {popularList.map((popularItem, index) => {
          return <li key={index}>{popularItem}</li>
        })}
      </ul>
    </div>
  )
};

const ArticleList = ({ title, articles }) => {

  return (
    <div>
      <h2>{title}</h2>
      <ul>
        {articles.map((article, index) => {
          return <li key={index} >{article}</li>
        })}
      </ul>
    </div>
  )
};

const Home = () => {
  const nvsnList = ['n1', 'n2', 'n3']
  const freeArticleList = ['a1', 'a2', 'a3']
  return (
    <div>
      <HomeMenu />
      <Popular />
      <ArticleList title='몇대몇' articles={nvsnList} />
      <ArticleList title='자유게시판' articles={freeArticleList} />
    </div>
  );
};

export default Home;
