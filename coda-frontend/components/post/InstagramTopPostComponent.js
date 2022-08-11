import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { Form } from "react-bootstrap";
import CommonPostComponent from "./CommonPostComponent";
import { getRecommendPosts } from "../../services/api/ApiPostService";
import { loginUserState } from "../../atoms/LoginUser";
import { masterState } from "../../atoms/Master";

export default function InstagramTopPostComponent() {
  const [user, setUser] = useRecoilState(loginUserState);
  const [master, setMaster] = useRecoilState(masterState);
  const [selectGenre, setSelectGenre] = useState(undefined);

  const SelectGenreStyle = {
    background: "white",
    width: "50%",
    margin: "112px 0 0 auto",
  };

  function handleGenreChange(e) {
    setSelectGenre(e.target.value);
  }

  return (
    <>
      <nav className="fixed-top" style={SelectGenreStyle}>
        <Form.Control as="select" onChange={handleGenreChange}>
          <option value="">全てのジャンル</option>
          {master?.master?.genre.map((g) => {
            return <option value={g.value}>{g.label}</option>;
          })}
        </Form.Control>
      </nav>
      <div style={{ background: "white", height: "90px" }}></div>
      {(!user || !user.loginUser) && (
        <>
          CODAの詳細については<a href="/common/tutorial">チュートリアル</a>
          を参照ください。
        </>
      )}
      <CommonPostComponent
        getPosts={getRecommendPosts}
        selectGenre={selectGenre}
      />
    </>
  );
}
