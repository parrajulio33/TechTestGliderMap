import React, { useState, useEffect, useRef } from "react";

export default function Question1(props) {
  // Situation: The TestForm component was written by a junior developer who needs some help getting it to function.
  // Please modify the TestForm component such that it will correctly use hooks to validate and post to the endpoint.
  // Feel free to use any (or no) external libraries you feel appropriate.
  // Endpoint docs: https://jsonplaceholder.typicode.com/guide/

  // using useState hook
  const [data, setData] = useState([]);
  const [userIdList, setUserIdList] = useState([]); // I used this state to handle and remove duplicate userId
  const [errorMessageTitle, setErrorMessageTitle] = useState("");
  const [errorMessageBody, setErrorMessageBody] = useState("");
  const [inputValues, setInputValues] = useState({
    title: "",
    body: "",
    userId: 0,
  });

  // Reference for Input
  const titleInputRef = useRef(null);
  const bodyInputRef = useRef(null);
  const selectedOptionValueRef = useRef(1);
  //

  const handleSubmit = async () => {
    if (titleInputRef.current.value === "") {
      titleInputRef.current.focus();
      setErrorMessageTitle("You need to enter a title!");
    } else if (bodyInputRef.current.value === "") {
      bodyInputRef.current.focus();
      setErrorMessageBody("You need to enter a body!");
    } else {
      const dataFetch = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          body: JSON.stringify({
            title: titleInputRef.current.value,
            body: bodyInputRef.current.value,
            userId: selectedOptionValueRef.current.value,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      const data = await dataFetch.json();
      setData(data);
      // console.log("DATA ADDED: ", data); this console log is easy way what I posted.
    }
  };
  const handleOnChangeInputValue = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
    if (name === "title" && value !== "") {
      setErrorMessageTitle("");
    }
  };

  const fetchPost = async () => {
    const getPost = await fetch("https://jsonplaceholder.typicode.com/posts");
    const getData = await getPost.json();
    const uniqueUserId = getUniqueUserID(getData);
    setData(getData);
    setUserIdList(uniqueUserId);
  };
  // first and unique render
  useEffect(() => {
    fetchPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data.length < 0) {
      setErrorMessageTitle("You need to enter a title!");
      setErrorMessageBody("You need to enter a body!");
    }
    handleSubmit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userIdList]);

  const getUniqueUserID = (array) => {
    let uniqueUserIdArray = [];
    // eslint-disable-next-line array-callback-return
    array.map((item) => {
      if (!uniqueUserIdArray.includes(item.userId)) {
        uniqueUserIdArray.push(item.userId);
      }
    });
    return uniqueUserIdArray;
  };

  return (
    <div>
      <div>
        <div>Title:</div>
        <input
          ref={titleInputRef}
          name="title"
          onChange={handleOnChangeInputValue}
          value={inputValues.title}
        />
        <p
          style={{
            color: "red",
            fontWeight: "bold",
            fontSize: 10,
            paddingTop: 0,
          }}
        >
          {errorMessageTitle}
        </p>
      </div>

      <div>
        <div>Body:</div>
        <input
          name="body"
          ref={bodyInputRef}
          onChange={handleOnChangeInputValue}
          value={inputValues.body}
        />
        <p
          style={{
            color: "red",
            fontWeight: "bold",
            fontSize: 10,
            paddingTop: 0,
          }}
        >
          {errorMessageBody}
        </p>
      </div>

      <div>
        <div>UserId:</div>
        <select
          name="userId"
          value={inputValues.userId}
          onChange={handleOnChangeInputValue}
          ref={selectedOptionValueRef}
        >
          {userIdList.map((item) => {
            return (
              <option key={item} value={item}>
                {item}
              </option>
            );
          })}
        </select>
      </div>
      <button onClick={handleSubmit} style={{ margin: 10 }}>
        Submit
      </button>
    </div>
  );
}
