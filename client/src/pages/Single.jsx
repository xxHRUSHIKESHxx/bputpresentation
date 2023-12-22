import React, { useEffect, useState } from "react";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import axios from "axios";
import moment from "moment";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import DOMPurify from "dompurify";

const Single = () => {
  const [post, setPost] = useState({});

  const location = useLocation();
  const navigate = useNavigate();

  const postId = location.pathname.split("/")[2];

  const { currentUser } = useContext(AuthContext);
  const { authToken } = useContext(AuthContext)

  // console.log(currentUser);
  // console.log(authToken);
  // console.log(currentUser.password)

  const is_user_exist = currentUser;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/posts/${postId}`
        );
        console.log("showing data from singles page" , res.data);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);

  const handleDelete = async () => {
    const requestBody = authToken;
    console.log(requestBody);
    try {
      await axios.delete(`http://localhost:8000/api/posts/${postId}`,{
        data:{token : `${requestBody}`}
      } );
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <div className="single">
      <div className="content">
        <img src={`../upload/${post?.img}`} alt="" />
        {/* ../upload/ */}
        <div className="user" style={{color:"whitesmoke"}}>
          {post.userImg && <img src={post.userImg} alt="" />}
          <div className="info">
            <span>{post.username}</span>
            <p style={{color:"whitesmoke"}}>Posted {moment(post.date).fromNow()}</p>
          </div>
          { is_user_exist ? (
          currentUser.username === post.username && (
          <div className="edit">
            <Link to={`/write?edit=2`} state={post}>
              <img src={Edit} alt="" />
            </Link>
            <img onClick={handleDelete} src={Delete} alt="" />
          </div>
           )
           ) : null  }  
          
        </div>
        <h1>{post.title}</h1>
        {/* <h3> phone number to contact : {post.phone}</h3> */}
        <h3 style={{color:"whitesmoke"}}> phone number to contact :  <a href={`tel:${post.phone}`}>{post.phone}</a> </h3>
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.desc),
          }} style={{color:"whitesmoke"}}
        ></p>{" "}
      </div>
      <Menu cat={post.cat}  />
    </div>
  );
};

export default Single;
