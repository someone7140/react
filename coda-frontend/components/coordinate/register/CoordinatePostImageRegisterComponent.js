import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { Button, Form } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CoordinatePostImageRegisterComponent = forwardRef((prop, ref) => {
  const coordinatePostImages = prop.coordinatePost?.images
    ? prop.coordinatePost.images
    : [];

  const [displayImagesSrc, setDisplayImagesSrc] = useState([]);
  const [imageSlider, setImageSlider] = useState(undefined);

  const [nextKey, setNextKey] = useState(
    coordinatePostImages.length > 0
      ? Math.max.apply(
          null,
          coordinatePostImages.map((i) => i.key)
        )
      : 0
  );
  const [selectSlideIndex, setSelectSlideIndex] = useState(0);

  useImperativeHandle(ref, () => ({
    setSelectLastImage() {
      imageSlider.slickGoTo(coordinatePostImages.length - 1);
    },
  }));

  const slideSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (current) => setSelectSlideIndex(current),
  };

  const nowDate = new Date();

  useEffect(() => {
    if (!prop.showOnly) {
      prop.register({ name: "coordinateImages" });
      prop.register({ name: "deleteImageKeys" });
      prop.setValue("coordinateImages", []);
    }
    if (coordinatePostImages.length > 0) {
      setDisplayImagesSrc(coordinatePostImages);
    }
  }, []);

  function onChangeImage(e) {
    if (e.target.files.length > 0) {
      const imageFile = e.target.files[0];
      const setKey = nextKey + 1;

      prop.setValue("coordinateImages", [
        ...prop.getValues("coordinateImages"),
        { key: setKey, file: imageFile },
      ]);
      // FileReaderオブジェクトを使ってファイル読み込み
      var reader = new FileReader();
      // ファイル読み込みに成功したときの処理
      reader.onload = function () {
        setDisplayImagesSrc([
          ...displayImagesSrc,
          { key: setKey, url: reader.result },
        ]);
      };
      // ファイル読み込みを実行
      reader.readAsDataURL(imageFile);
      setNextKey(setKey);
    }
  }

  function onClickDelete() {
    const afterDeleteImages = displayImagesSrc.filter(
      (d, i) => selectSlideIndex !== i
    );
    setDisplayImagesSrc(afterDeleteImages);
    prop.setValue(
      "coordinateImages",
      prop
        .getValues("coordinateImages")
        .filter((v) => afterDeleteImages.some((a) => v.key === a.key))
    );

    if (coordinatePostImages.length > 0) {
      const deleteImage = displayImagesSrc.find(
        (d, i) => selectSlideIndex === i
      );
      const deleteCoordinatePostImage = coordinatePostImages.find(
        (c) => c.key === deleteImage?.key
      );
      if (deleteCoordinatePostImage?.key) {
        prop.setValue("deleteImageKeys", [
          ...prop.getValues("deleteImageKeys"),
          deleteCoordinatePostImage.key,
        ]);
      }
    }
    let fileElement = document.getElementById("coordinateImage");
    fileElement.value = "";
    setSelectSlideIndex(0);
  }

  function renderDeleteButton() {
    if (prop.showOnly) {
      return <></>;
    }
    return (
      <div className="mt-2">
        <Button variant={"secondary"} onClick={onClickDelete}>
          表示画像を削除
        </Button>
      </div>
    );
  }

  return (
    <div>
      {!prop.showOnly && (
        <Form.File id="coordinateImage" name="coordinateImage">
          <Form.File.Label>
            画像ファイルを登録する場合はこちらから
          </Form.File.Label>
          <div className="mx-auto" style={{ width: "280px" }}>
            <Form.File.Input onChange={onChangeImage} />
          </div>
        </Form.File>
      )}
      {displayImagesSrc?.length == 1 && (
        <>
          <img
            src={
              prop.imageCacheNoUse
                ? displayImagesSrc[0].url + "?var=" + nowDate.getTime()
                : displayImagesSrc[0].url
            }
            style={{
              width: "320px",
              height: "320px",
              marginTop: "20px",
              marginBottom: "10px",
            }}
          />
          {renderDeleteButton()}
        </>
      )}
      {displayImagesSrc?.length > 1 && (
        <>
          <div className="mx-auto" style={{ maxWidth: "320px" }}>
            <Slider ref={(slider) => setImageSlider(slider)} {...slideSettings}>
              {displayImagesSrc.map((i) => (
                <div>
                  <img
                    id={i.key}
                    src={
                      prop.imageCacheNoUse
                        ? i.url + "?var=" + nowDate.getTime()
                        : i.url
                    }
                    style={{
                      width: "320px",
                      height: "320px",
                      marginTop: "20px",
                    }}
                  />
                </div>
              ))}
            </Slider>
          </div>
          <div style={{ paddingTop: "40px" }}>{renderDeleteButton()}</div>
        </>
      )}
    </div>
  );
});

export default CoordinatePostImageRegisterComponent;
