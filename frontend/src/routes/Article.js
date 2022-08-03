import ArticleList from '../pages/ArticleList';
import CreateArticle from '../pages/CreateArticle';
import EditArticle from '../pages/EditArticle';
import ScreenShare from '../pages/ScreenShare';
import ArticleDetail from '../pages/ArticleDetail';


const Article = () => {
  return (
    <Routes>
      <Route path='list' element={<ArticleList />} />
      <Route path='create' element={<CreateArticle />} />
      <Route path='edit/:articleId' element={<EditArticle />} />
      <Route path='popular' element={<Home />} />
      <Route path=":id" element={<ArticleDetail />} />
      <Route path=":id/share" element={<ScreenShare />} />
    </Routes>
  );
};

export default Article;
