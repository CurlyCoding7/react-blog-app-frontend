import React, { useState, useRef } from "react";
import defaultImg from "../assets/6.jpg";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_API_KEY,
  dangerouslyAllowBrowser: true
});

const ImageGenerator = () => {
  const [imgUrl, setImgUrl] = useState("/");
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(false);

  const generateImage = async () => {
    if (inputRef.current.value === "") {
      return 0;
    }
    setLoading(true);
    const prompt = inputRef.current.value;
    const response = await openai.images.generate({
      prompt,
      n: 1,
      size: "512x512",
      response_format: "b64_json"
    });

    setImgUrl(response.data[0].b64_json);
    setLoading(false);
  };

  const downloadImage = () => {
    var a = document.createElement("a"); //Create <a>
    a.href = "data:image/png;base64," + imgUrl;
    a.download = Date.now() + "_Blog_Image.png";
    a.click();
    a.remove();
  };

  return (
    <div className="image-container">
      <div className="imgae-generator">
        <div className="header">Generate Photo</div>

        <div className="img-loading">
          <div className="image">
            <img
              src={
                imgUrl === "/" ? defaultImg : `data:image/jpeg;base64,${imgUrl}`
              }
              alt=""
            />
          </div>
          <div className="loading">
            <div className={loading ? "loading-bar-full" : "loading-bar"}>
              <div className={loading ? "loading-text" : "hide"}>
                Loading...
              </div>
            </div>
          </div>
        </div>
        <div className="search-box">
          <input
            type="text"
            ref={inputRef}
            className="search-input"
            placeholder="What do you want to see? "
          />
        </div>
        <div className="btn-generate">
          <button onClick={generateImage}>Generate</button>
          <button disabled={fetching} onClick={downloadImage}>
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator;
