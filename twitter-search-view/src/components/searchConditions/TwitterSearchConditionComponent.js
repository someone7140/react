import ja from "date-fns/locale/ja";
import React, { useContext, useEffect, useState, useRef } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker, { registerLocale } from "react-datepicker";
import Modal from "react-modal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { makeLink } from "../../service/TwitterMakeLinkService";
import { TwitterSearchStore } from "../../store/TwitterSearchStore";

registerLocale("ja", ja);

const modalStyle = {
  content: {
    top: "50%",
    left: "50%",
    height: "90%",
    width: "90%",
    right: "auto",
    transform: "translate(-50%, -50%)",
  },
};

const closeBoxStyle = {
  textAlign: "left",
};

const textStyle = {
  width: "250px",
  height: "18px",
};

const numberStyle = {
  width: "50px",
  height: "18px",
};

const setBoxStyle = {
  textAlign: "center",
};

export default function TwitterSearchConditionComponent(props) {
  const { state, dispatch } = useContext(TwitterSearchStore);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [input, setInput] = useState({});

  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      if (props.selectedCondition) {
        setInput(props.selectedCondition.linkInfo.input);
      } else {
        setInput({
          isIncludeReply: true,
          isIncludeReTweet: true,
          isQuestionary: false,
          isRecent: false,
          isStartDateSet: false,
          isEndDateSet: false,
        });
      }
    }
    mounted.current = true;
  }, [input, props]);

  function getStartDate() {
    if (input.isStartDateSet && input.startDate) {
      return input.startDate;
    } else {
      return new Date();
    }
  }

  function getEndDate() {
    if (input.isEndDateSet && input.endDate) {
      return input.endDate;
    } else {
      return new Date();
    }
  }

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  function handleChangeLinkName(e) {
    setInput({
      ...input,
      linkName: e.target.value,
    });
  }

  function handleChangeUserId(e) {
    setInput({
      ...input,
      userId: e.target.value,
    });
  }

  function handleChangeWord(e) {
    setInput({
      ...input,
      word: e.target.value,
    });
  }

  function setIsIncludeReply(flg) {
    setInput({
      ...input,
      isIncludeReply: flg,
    });
  }

  function setIsIncludeReTweet(flg) {
    setInput({
      ...input,
      isIncludeReTweet: flg,
    });
  }

  function setIsQuestionary(flg) {
    setInput({
      ...input,
      isQuestionary: flg,
    });
  }

  function handleChangeMinimumFavoriteCounts(e) {
    setInput({
      ...input,
      minimumFavoriteCounts:
        e.target.value === "" ? undefined : parseInt(e.target.value),
    });
  }

  function handleChangeMinimumRetweetCounts(e) {
    setInput({
      ...input,
      minimumRetweetCounts:
        e.target.value === "" ? undefined : parseInt(e.target.value),
    });
  }

  function handleChangeMinimumReplyCounts(e) {
    setInput({
      ...input,
      minimumReplyCounts:
        e.target.value === "" ? undefined : parseInt(e.target.value),
    });
  }

  function setIsRecent(flg) {
    setInput({
      ...input,
      isRecent: flg,
    });
  }

  function setIsStartDateSet(flg) {
    setInput({
      ...input,
      isStartDateSet: flg,
    });
  }

  function setIsEndDateSet(flg) {
    setInput({
      ...input,
      isEndDateSet: flg,
    });
  }

  function handleChangeStartDate(selectedDate) {
    setInput({
      ...input,
      startDate: selectedDate,
    });
  }

  function handleChangeEndDate(selectedDate) {
    setInput({
      ...input,
      endDate: selectedDate,
    });
  }

  function makeTwitterLink() {
    if (!input.linkName) {
      toast("生成するリンク名称を入力してください");
    } else if (!input.userId && !input.word) {
      toast("Twitterアカウントもしくは検索キーワードを入力してください");
    } else {
      if (props.selectedCondition) {
        makeLink(dispatch, input, props.selectedCondition.key, state);
      } else {
        makeLink(dispatch, input, undefined, state);
      }
      setModalIsOpen(false);
    }
  }

  return (
    <div>
      <button onClick={openModal}>
        {!props.selectedCondition && <span>新規リンク追加</span>}
        {props.selectedCondition && <span>リンク内容編集</span>}
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyle}
        contentLabel="検索条件設定"
        ariaHideApp={false}
      >
        <div style={closeBoxStyle}>
          <button onClick={closeModal}>閉じる</button>
        </div>
        <br />
        <div>
          <b>リンク名称</b>
          <br />
          <input
            type="text"
            name="word"
            value={input.linkName}
            onChange={handleChangeLinkName}
            placeholder="生成するリンクの名称を入力"
            style={textStyle}
          />
          <br />
          <br />
          <b>Twitterアカウント</b>
          <br />
          <input
            type="text"
            name="word"
            value={input.userId}
            onChange={handleChangeUserId}
            placeholder="「@xxxxxxx」の形式で入力"
            style={textStyle}
          />
          <br />
          <br />
          <b>検索キーワード</b>
          <br />
          <input
            type="text"
            name="word"
            value={input.word}
            onChange={handleChangeWord}
            placeholder="複数入力は半角スペース区切り"
            style={textStyle}
          />
          <br />
          <br />
          <b>リプライ</b>
          <br />
          リプライを含める
          <input
            type="radio"
            name="isIncludeReply"
            value="isIncludeReply"
            checked={input.isIncludeReply}
            onChange={() => setIsIncludeReply(true)}
          />
          <br />
          リプライを含めない
          <input
            type="radio"
            name="isIncludeReply"
            value="isIncludeReply"
            checked={!input.isIncludeReply}
            onChange={() => setIsIncludeReply(false)}
          />
          <br />
          <br />
          <b>リツイート</b>
          <br />
          リツイートを含める
          <input
            type="radio"
            name="isIncludeReTweet"
            value="isIncludeReTweet"
            checked={input.isIncludeReTweet}
            onChange={() => setIsIncludeReTweet(true)}
          />
          <br />
          リツイートを含めない
          <input
            type="radio"
            name="isIncludeReTweet"
            value="isIncludeReTweet"
            checked={!input.isIncludeReTweet}
            onChange={() => setIsIncludeReTweet(false)}
          />
          <br />
          <br />
          <b>アンケート</b>
          <br />
          アンケートに絞る
          <input
            type="radio"
            name="isQuestionary"
            value="isQuestionary"
            checked={input.isQuestionary}
            onChange={() => setIsQuestionary(true)}
          />
          <br />
          アンケートに絞らない
          <input
            type="radio"
            name="isQuestionary"
            value="isQuestionary"
            checked={!input.isQuestionary}
            onChange={() => setIsQuestionary(false)}
          />
          <br />
          <br />
          <b>いいねの最低数</b>
          <br />
          <input
            type="number"
            name="minimumFavoriteCounts"
            value={input.minimumFavoriteCounts}
            onChange={handleChangeMinimumFavoriteCounts}
            style={numberStyle}
          />
          <br />
          <br />
          <b>リツイートの最低数</b>
          <br />
          <input
            type="number"
            name="minimumRetweetCounts"
            value={input.minimumRetweetCounts}
            onChange={handleChangeMinimumRetweetCounts}
            style={numberStyle}
          />
          <br />
          <br />
          <b>リプライの最低数</b>
          <br />
          <input
            type="number"
            name="minimumReplyCounts"
            value={input.minimumReplyCounts}
            onChange={handleChangeMinimumReplyCounts}
            style={numberStyle}
          />
          <br />
          <br />
          <b>ソート（ブラウザで開いた時のみ適用）</b>
          <br />
          話題のツイート
          <input
            type="radio"
            name="isRecent"
            value="isRecent"
            checked={!input.isRecent}
            onChange={() => setIsRecent(false)}
          />
          &nbsp;&nbsp; 最新
          <input
            type="radio"
            name="isRecent"
            value="isRecent"
            checked={input.isRecent}
            onChange={() => setIsRecent(true)}
          />
          <br />
          <br />
          <b>検索開始日付</b>
          <br />
          開始日付を設定しない
          <input
            type="radio"
            name="isStartDateSet"
            value="isStartDateSet"
            checked={!input.isStartDateSet}
            onChange={() => setIsStartDateSet(false)}
          />
          <br />
          開始日付を設定する
          <input
            type="radio"
            name="isStartDateSet"
            value="isStartDateSet"
            checked={input.isStartDateSet}
            onChange={() => setIsStartDateSet(true)}
          />
          {input.isStartDateSet && (
            <div>
              <DatePicker
                locale="ja"
                selected={getStartDate()}
                onChange={handleChangeStartDate}
              />
            </div>
          )}
          <br />
          <br />
          <b>検索終了日付</b>
          <br />
          終了日付を設定しない
          <input
            type="radio"
            name="isEndDateSet"
            value="isEndDateSet"
            checked={!input.isEndDateSet}
            onChange={() => setIsEndDateSet(false)}
          />
          <br />
          終了日付を設定する
          <input
            type="radio"
            name="isEndDateSet"
            value="isEndDateSet"
            checked={input.isEndDateSet}
            onChange={() => setIsEndDateSet(true)}
          />
          {input.isEndDateSet && (
            <div>
              <DatePicker
                locale="ja"
                selected={getEndDate()}
                onChange={handleChangeEndDate}
              />
            </div>
          )}
          <br />
          <br />
          <div style={setBoxStyle}>
            <button onClick={makeTwitterLink}>リンクを生成する</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
