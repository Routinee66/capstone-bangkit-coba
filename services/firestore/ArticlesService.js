  // const { Firestore } = require('@google-cloud/firestore');
  const { admin, firestore } = require('../../config/firebaseConfig');
  const { nanoid } = require('nanoid');
  const NotFoundError = require('../../exceptions/NotFoundError');
  const ClientError = require('../../exceptions/ClientError');

  class ArticlesService {
    constructor() {
      this.collection = 'articles';
      this.firestore = firestore;
      this.collectionRef = this.firestore.collection(this.collection);
    }

    async getArticles() {
      try {
        var allData = [];
        const snapshots = await this.collectionRef.get();
  
        snapshots.forEach((doc) => {
          allData.push(doc.data());
        });
  
        return allData;
      } catch (error) {
        throw new Error('Gagal mendapatkan data:' + error.message);
      }
    }

    async getArticleById(document) {
      const querySnapshot = await this.collectionRef.doc(document).get();
      if (querySnapshot.empty) {
        throw new NotFoundError('Artikel Tidak Ditemukan');
      } else {
        return querySnapshot.data();
      }
    }
  
    async postArticles(title, author, content, imageUrl) {
      try {
        const time = admin.firestore.Timestamp.now();
        const articleId = `article-${nanoid(16)}`;
        const article = {
          id: articleId,
          title: title,
          author: author,
          publishedDate: time,
          content: content,
          imageUrl: imageUrl
        };
  
        if (!title || !author || !content || !imageUrl) {
          throw new Error('Data tidak lengkap. Pastikan semua field terisi.');
        }

        const documentRef = this.collectionRef.doc(articleId);
        
        await documentRef.set(article);
        return article.id;
      } catch (error) {
        throw new Error('Gagal menyimpan artikel:' + error.message);
      }
    }
  }
  
  module.exports = ArticlesService;