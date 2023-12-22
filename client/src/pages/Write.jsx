import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

const Write = () => {
  const state = useLocation().state;
  const [value, setValue] = useState(state?.desc || "");
  const [title, setTitle] = useState(state?.value || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");
  const [phone, setPhone] = useState(null);

  const navigate = useNavigate();

  const { authToken } = useContext(AuthContext);

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post(
        "http://localhost:8000/api/upload",
        formData
      );
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const requestBody = authToken;
    const imgUrl = await upload();

    if (phone == null) {
      alert("Please provide your phone number.");
    } else {
      try {
        state
          ? await axios.put(`http://localhost:8000/api/posts/${state.id}`, {
              title,
              desc: value,
              cat,
              img: file ? imgUrl : "",
              phone: phone !== null ? phone : null,
              token: `${requestBody}`,
            })
          : await axios.post(`http://localhost:8000/api/posts/`, {
              title,
              desc: value,
              cat,
              img: file ? imgUrl : "",
              date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
              phone: phone,
              // data: { token: `${requestBody}` },
              token: `${requestBody}`,
            });

        navigate("/");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="add">
      <div className="content">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={value == null ? "" : value}
            // onChange={(e) => setValue(e.target.value)}
            onChange={setValue}
          />
        </div>
        <input
          type="phone"
          maxLength={15}
          placeholder="please enter your phone number for contact purposes"
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            name=""
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label className="file" htmlFor="file">
            Upload Image
          </label>
          <div className="buttons">
            <button>Save as a draft</button>
            {/* <button onClick={phone == null ? null : handleClick}>
              Publish
            </button> */}
            <button onClick={handleClick}>Publish</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "education"}
              name="cat"
              value="education"
              id="education"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="education">education</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "poverty"}
              name="cat"
              value="poverty"
              id="poverty"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="poverty">poverty</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "animal"}
              name="cat"
              value="animal"
              id="animal"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="animal">animal</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "disaster"}
              name="cat"
              value="disaster"
              id="disaster"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="disaster">disaster</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "empowerment"}
              name="cat"
              value="empowerment"
              id="empowerment"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="empowerment">empowerment</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "healthcare"}
              name="cat"
              value="healthcare"
              id="healthcare"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="healthcare">healthcare</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
