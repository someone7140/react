import React from 'react';
import ReactPaginate from 'react-paginate';
import ArticleApp from '../containers/ArticleApp';

const SearchApp = (props) =>
　(
    <div>
      <div id ="top"><br/>
        <table>
          <tbody><tr>
            <td>
              <input type="text" onChange={(e) => props.setInputWord(e.target.value)} />
            </td>
            <td>
              <select value={props.select_value} onChange={(e) => props.setSelectValue(e.target.value)}>
                <option value="news">ニュース検索のみ</option>
                <option value="all">全検索</option>
              </select>
            </td>
            <td>
              <input type="button" disabled={!props.send_enable} value="検索"
                onClick={() =>
                  props.getNewsFromApi(props.input_word, 1, props.select_value)
                }
              />
            </td>
            </tr></tbody>
        </table>
      </div>
      {(() => {
        if (props.message !== '') {
          return <div>{props.message}</div>;
        }
      })()}
      {(() => {
        if (Object.keys(props.news_object).length) {
          return <div>
              検索ワード：{props.searched_word}、検索結果：{props.news_object.total_results}件<br/>
              {(() => {
                if (props.news_object.total_results > 20) {
                  return <div><br/>
                    <ReactPaginate
                      pageCount={props.news_object.total_results / 20 | 0 + 1}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={5}
                      onPageChange={props.handlePageClick}
                      containerClassName='pagination'
                      pageClassName='page-item'
                      pageLinkClassName='page-link'
                      activeClassName='active'
                      previousLabel='previous'
                      nextLabel='next'
                      previousClassName='page-item'
                      nextClassName='page-item'
                      previousLinkClassName='page-link'
                      nextLinkClassName='page-link'
                      disabledClassName='disabled'
                      breakLabel='...'
                      breakClassName='page-item'
                      breakLinkClassName='page-link'
                      initialPage={props.input_page - 1}
                    />
                  </div>;
                }
              })()}
              <div className="article_list">
                <table>
                  {props.news_object.articles.map((data, index) => {
                    return <tbody key={index}><tr><td><hr/><ArticleApp article={data} /></td></tr></tbody>
                  })}
                </table>
              </div>
            </div>;
        }
      })()}
      <iframe className="search" title="search" src={props.search_url}></iframe>
      <iframe className="wiki" title="wiki" src={props.wiki_url}></iframe>
    </div>
　)

export default SearchApp
