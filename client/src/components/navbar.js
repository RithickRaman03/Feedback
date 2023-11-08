import React from "react";
export default function Navbar() {
  return (
    <>
      {/* <button id="close-btn">
            <span className="material-symbols-sharp">close</span>
          </button> */}
      <main>
        <aside>
          <div className="sidebar">
            <a className={"icon"}>
              <span class="material-symbols-outlined">task_alt</span>
              <h4 className="text">VALIDATE</h4>
            </a>

            <a className={"icon"}>
              <span className="material-symbols-outlined google-icon">
                draft
              </span>
              <h4 className="text">Save DRAFT</h4>
            </a>
          </div>
          <div className=" down-content">
            <button id="submitreview">SUBMIT REVIEW</button>
            <br></br>
            <button id="generatepdf">GENERATE PDF </button>
          </div>
        </aside>
      </main>
    </>
  );
}
