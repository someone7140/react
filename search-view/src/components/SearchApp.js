import React from 'react';

const SearchApp = (props) => (
    <div>
      <a href="#" onClick={() => props.setWord("test")} >test</a>
      <iframe class="search" title="search" src={props.search_url}></iframe>
      <iframe class="wiki" title="wiki" src={props.wiki_url}></iframe>
    </div>
)

export default SearchApp
