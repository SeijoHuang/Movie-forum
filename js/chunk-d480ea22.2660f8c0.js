(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-d480ea22"],{"08c8":function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"page-layout"},[a("div",{staticClass:"container"},[a("div",{staticClass:"row row-cols-3 row-cols-sm-4 row-cols-lg-6 gx-4 gy-4 gy-md-5 gy-xl-6 "},[t._t("movie-card")],2)]),a("div",{staticClass:"pagination-container"},[a("Pagination")],1)])},n=[],o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"page-container"},[a("ul",{staticClass:"page-list"},[t.page.totalPages>1?a("li",{staticClass:"page prev",on:{click:function(e){return e.stopPropagation(),t.changePage(t.page.currentPage-1)}}},[a("span",{staticClass:"icon-arrow_lift",attrs:{"aria-hidden":"true"}})]):t._e(),t.page.totalPages>1?a("li",{staticClass:"page start-page",class:{active:1===t.page.currentPage},on:{click:function(e){return e.stopPropagation(),t.changePage(1)}}},[t._v(" 1 ")]):t._e(),a("li",{directives:[{name:"show",rawName:"v-show",value:t.page.showPrevMore,expression:"page.showPrevMore"}],staticClass:"collapsePrev page"},[t._v("...")]),t._l(t.page.pageArr,(function(e){return a("li",{key:e,staticClass:"page",class:{active:t.page.currentPage===e},on:{click:function(a){return a.stopPropagation(),t.changePage(e)}}},[t._v(" "+t._s(e)+" ")])})),a("li",{directives:[{name:"show",rawName:"v-show",value:t.page.showNextMore,expression:"page.showNextMore"}],staticClass:"collapseNext page"},[t._v("...")]),t.page.totalPages>1?a("li",{staticClass:"page total-page",class:{active:t.page.currentPage===t.page.totalPages},on:{click:function(e){return e.stopPropagation(),t.changePage(t.page.totalPages)}}},[t._v(" "+t._s(t.page.totalPages)+" ")]):t._e(),t.page.totalPages>1?a("li",{staticClass:"page next",on:{click:function(e){return e.stopPropagation(),t.changePage(t.page.currentPage+1)}}},[a("span",{staticClass:"icon-arrow_lift",attrs:{"aria-hidden":"true"}})]):t._e()],2)])},r=[],i=a("2f62"),c={name:"Pagination",data(){return{isActive:!1}},methods:{changePage(t){const{currentPage:e,totalPages:a}=this.page;if(t>a||t<1||t===e)return;const{name:s}=this.$route,{query:n,id:o,name:r}=this.$route.query;switch(s){case"SearchResult":this.$router.push({name:"SearchResult",query:{page:t,query:n}});break;case"Genre":this.$router.push({name:"Genre",query:{page:t,id:o,name:r}});break}},toggleActive(t){t===this.page.currentPage?this.isActive=!0:this.isActive=!1}},computed:{...Object(i["b"])(["page","isLoading","genreOnShow"])},mounted(){const{page:t}=this.$route.query;this.toggleActive(t)}},l=c,u=(a("dd7c"),a("2877")),g=Object(u["a"])(l,o,r,!1,null,"26a3b906",null),p=g.exports,d={name:"PageLayout",components:{Pagination:p}},h=d,f=(a("091f"),Object(u["a"])(h,s,n,!1,null,"3ac9ec2e",null));e["a"]=f.exports},"091f":function(t,e,a){"use strict";a("9149")},1419:function(t,e,a){"use strict";a("f93a")},9149:function(t,e,a){},"923b":function(t,e,a){},9820:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"page-container"},[t.isLoading?[a("Spinner")]:[t.searchResult.results.length?[a("h2",{staticClass:"page-title total-box"},[t._v("About "+t._s(t.searchResult.total_results)+" results ")]),a("PageLayout",{scopedSlots:t._u([{key:"movie-card",fn:function(){return t._l(t.searchResult.results,(function(e){return a("div",{key:e.id,staticClass:"col"},[a("MovieCard",{scopedSlots:t._u([{key:"poster",fn:function(){return[a("img",{staticClass:"movie-card__show modal-active",attrs:{src:e.poster_path,alt:"movie-poster"},on:{click:function(a){return a.stopPropagation(),t.toggleModal(e.id)}}}),a("div",{staticClass:"movie-card__show-title ellipsis"},[t._v(" "+t._s(e.title)+" ")])]},proxy:!0},{key:"backdrop",fn:function(){return[a("img",{staticClass:"movie-card__item",attrs:{src:e.backdrop_path,alt:""}})]},proxy:!0},{key:"title",fn:function(){return[a("p",{staticClass:"title ellipsis"},[t._v(" "+t._s(e.title)+" ")])]},proxy:!0},{key:"release",fn:function(){return[a("p",{staticClass:"release"},[t._v(" "+t._s(e.release_date)+" ")])]},proxy:!0},{key:"modalBtn",fn:function(){return[a("button",{staticClass:"modal-btn modal-active",on:{click:function(a){return a.stopPropagation(),t.toggleModal(e.id)}}},[a("span",{staticClass:"icon-arrow_lift"})])]},proxy:!0},{key:"score",fn:function(){return[a("Rating",{scopedSlots:t._u([{key:"rating",fn:function(){return[t._v(" "+t._s(e.vote_average)+" ")]},proxy:!0},{key:"voteCount",fn:function(){return[t._v(" "+t._s(e.vote_count)+" ")]},proxy:!0}],null,!0)})]},proxy:!0}],null,!0)})],1)}))},proxy:!0}])})]:[a("h2",{staticClass:"not-found"},[t._v('Your search "'+t._s(t.keyWord)+'" is not found')])]]],2)},n=[],o=a("08c8"),r=a("50ab"),i=a("10f0"),c=a("2375"),l=a("2f62"),u=a("4360"),g=a("2708"),p={name:"SearchResult",components:{PageLayout:o["a"],MovieCard:r["a"],Rating:i["a"],Spinner:c["a"]},mixins:[g["a"]],data(){return{keyWord:""}},computed:{...Object(l["b"])(["searchResult","isModalOpen","isLoading"])},created(){const t=this.$route.query;this.keyWord=t.query,u["a"].dispatch("getSearchResult",t)},beforeRouteUpdate(t,e,a){const s=t.query;this.keyWord=s.query,u["a"].dispatch("getSearchResult",s),a()}},d=p,h=(a("1419"),a("2877")),f=Object(h["a"])(d,s,n,!1,null,"65aa0fcc",null);e["default"]=f.exports},dd7c:function(t,e,a){"use strict";a("923b")},f93a:function(t,e,a){}}]);
//# sourceMappingURL=chunk-d480ea22.2660f8c0.js.map