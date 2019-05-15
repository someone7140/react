import React from 'react';
import reactStringReplace from "react-string-replace";

const ArticleApp = (props) =>
　(
    <div>
      <b>【{props.article.title}】</b><br/>
      更新日：{props.article.date}<br/>
      ニュースソース：{props.article.source}<br/>
      {(() => {
        if (props.article.noun.length > 0) {
          var desc = props.article.description;
          var nounReg = props.article.noun.map(n =>
            n.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')
          ).join("|")
          var regexp = new RegExp('(' + nounReg + ')')
          return reactStringReplace(desc, regexp, (match, i) => (
            <a key={i} href='#top' onClick={() => props.setWord(match)} >{match}</a>
          ))
        } else {
          return <div>{props.article.description}</div>;
        }
      })()}<br/>
      <a href={props.article.url} target="_blank" rel="noopener noreferrer"><img src={props.article.image} alt={props.article.title}  width="150" height="100"/></a>
    </div>
　)

export default ArticleApp
