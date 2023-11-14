import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Starating from "./starrating";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./navbar";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/js/dist/modal.js";

function Topbar() {
  const [data, setData] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [comment, setComment] = useState("");
  const [submit, setSubmit] = useState(false);
  const [response, setResponse] = useState({
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
  });

  // let isSubmitted;
  useEffect(() => {
    const getData = async () => {
      await axios
        .get("http://localhost:3001/translatorfeedback")
        .then((response) => {
          // console.log(response.data);
          setData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getData();
  }, []);

  const allDataNotNull = () => {
    const allValueNotNull = Object.values(response).every(
      (value) => value != null
    );
    setIsSubmitted(allValueNotNull);
  };

  const handleCommentChange = (e) => {
    if (e.target.value === "") {
      setComment("");
      setResponse((response) => ({
        ...response,
        6: null,
      }));
      setIsSubmitted(false);
    } else {
      setComment(e.target.value);
      setResponse((response) => ({
        ...response,
        6: e.target.value,
      }));
    }

    allDataNotNull();
  };

  const formReset = () => {
    setResponse({
      1: null,
      2: null,
      3: null,
      4: null,
      5: null,
      6: null,
    });
    setComment("");
    setSubmit(!submit);
  };
  // console.log(response);
  // console.log(isSubmitted);

  const handleSubmit = async (e) => {
    const feedback = {
      feedback: [
        {
          file_id: 1,
          answer: response[1], // Use the relevant answer from your state
        },
        {
          file_id: 1,
          answer: response[2],
        },
        {
          file_id: 1,
          answer: response[3],
        },
        {
          file_id: 1,
          answer: response[4],
        },
        {
          file_id: 1,
          answer: response[5],
        },
        {
          file_id: 1,
          answer: response[6],
        },
      ],
    };

    const allValuesNotNull = feedback.feedback.every(
      (item) => item.answer !== null
    );

    if (allValuesNotNull) {
      await axios
        .post("http://localhost:3001/store-feedback", feedback)
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            toast.success(`${response.data.message}`, {
              position: "top-center",
              autoClose: false,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
      formReset();
    } else {
      toast.error("Please fill all fields!", {
        position: "top-center",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  console.log(response);

  return (
    <div>
      <div className="topbar">
        <div className="logo">
          <img className="logophoto" src="./logopic.png" alt="img"></img>
        </div>
        <div className="search">
          {/* <input className="inputbox" type="text"></input> */}
        </div>

        <div className="dictionary">
          <button
            type="button"
            id="topbutton"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            DICTIONARY
          </button>
        </div>
        <div className="gap"></div>
        <div className="feedbackbutton">
          <button
            type="button"
            id="topbutton"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            FEEDBACK
          </button>
        </div>
        <div className="gap"></div>
        <div className="ongoingproject">
          <button
            type="button"
            id="topbutton"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            ONGOING PROJECT
          </button>
        </div>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="colored"
      />

      {/* MODAL CONTENT */}

      {/* <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      > */}

      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
      >
        <div className="modal-dialog modal-dialog modal-lg">
          <div className="modal-content ">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={formReset}
              ></button>
            </div>
            <div className="modal-body"></div>

            <div className="questionarea">
              {data.slice(0, 5).map((item) => (
                <div
                  className="question"
                  id={`q${item.question_id}`}
                  key={item.question_id}
                >
                  <p>
                    <i>{item.question}</i>
                  </p>
                  <Starating
                    response={response}
                    submit={submit}
                    allDataNotNull={allDataNotNull}
                    setResponse={setResponse}
                    name={item.question_id}
                  />
                </div>
              ))}
              <br></br>
              <div className="comments-sec">
                <input
                  id="comsec"
                  type="text"
                  value={comment}
                  placeholder="Enter comments"
                  onChange={handleCommentChange}
                />
              </div>

              {/* <div className="feedbacksubmit">
                <button onClick={handleSubmit} id="feedsubmit">
                  Submit
                </button>
              </div> */}

              <div className="feedbacksubmit">
                {isSubmitted ? (
                  <button
                    onClick={handleSubmit}
                    id="feedsubmit"
                    data-bs-dismiss="modal"
                  >
                    Submit
                  </button>
                ) : (
                  <button onClick={handleSubmit} id="feedsubmit">
                    Submit
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Navbar />
    </div>
  );
}
export default Topbar;
