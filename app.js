const router = new VueRouter({
})

new Vue({
    el: '#app',
    router,
    data () {
      return {
        query: "",
        movies: [],
        totalResults: 0,
        currentPage: 1,
        pageSize: 4,
        visibleMovies: [],
        pageNumber: 0,
        movie: [],
        isDetail: false,
        isHome: true
      }
    },
    methods:{
        handleSearch(){
          this.isDetail = false;
          this.isHome = false;
          this.currentPage = 1;
          query = this.query
          fetch('https://www.omdbapi.com/?apikey=3994739e&s=' +query)
          .then((res) => {
            return res.json()})
          .then((res) => {
            this.movies = res.Search;
            this.totalResults = res.totalResults;
            this.updateMovies();
          })
          
        },
        nextPage(){
          if(this.currentPage < this.pageNumber){
            this.currentPage = this.currentPage + 1;
          this.updateMovies();
          }
          
        },
        prevPage(){
          if(1 < this.currentPage){
            this.currentPage = this.currentPage - 1;
          }
          this.updateMovies();
      },
      updateCurrentPage(n){
        this.currentPage = n;
        this.updateMovies();
      },
      updateMovies(){
        if(this.movies.length < this.pageSize){
          this.visibleMovies = this.movies;
        }
        else{
          this.visibleMovies = this.movies.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
        }

        // Pagination depends on TotalResults
        //if(this.movies.length / 4 > Math.trunc(this.movies.length / 4)){this.pageNumber = (Math.trunc(this.totalResults / this.pageSize)) + 1;}
        //else{this.pageNumber = (Math.trunc(this.totalResults / this.pageSize))}

        // Pagination depends on Search array
        if(this.movies.length / 4 > Math.trunc(this.movies.length / 4)){this.pageNumber = (Math.trunc(this.movies.length / this.pageSize)) + 1;}
        else{this.pageNumber = (Math.trunc(this.movies.length / this.pageSize))}
        //

      },
      goMovieDetail(id){
        this.isDetail = true;
          fetch('https://www.omdbapi.com/?apikey=3994739e&i=' +id)
          .then((res) => {
            return res.json()})
          .then((res) => {
            this.movie = res;
            console.log(this.movie)
          })
      },
      goHome(){
        this.isHome = true;
        this.isDetail = false;
      }
    }
  }).$mount('#app')