import React from "react";
import { useEffect, useState } from "react";
import axios, { all } from "axios";
import Starating from "./starrating";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./navbar";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/js/dist/modal.js";

function Topbar() {
  const [data, setData] = useState([]);
  const [response, setResponse] = useState({
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
  });

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

  const handleCommentChange = (e) => {
    setResponse((response) => ({
      ...response,
      6: e.target.value,
    }));
  };

  const handleSubmit = async () => {
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
            class="btn btn-primary"
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
            class="btn btn-primary"
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
            class="btn btn-primary"
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

      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog modal-lg">
          <div class="modal-content ">
            <div class="modal-header">
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body"></div>

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
                  placeholder="Enter comments"
                  onChange={handleCommentChange}
                />
              </div>

              <div className="feedbacksubmit">
                <button
                  onClick={handleSubmit}
                  id="feedsubmit"
                  data-bs-dismiss="modal"
                >
                  Submit
                </button>
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
