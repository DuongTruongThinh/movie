import React, { useState } from "react";
import Modal from "react-modal";
import ReactPlayer from "react-player";

Modal.setAppElement("#root"); // Đặt phần tử gốc của ứng dụng

function VideoPopup(props) {
  const link = props.link;
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <button
        onClick={openModal}
        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
      >
        Xem trailer
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Xem Video"
        className="bg - blue - 700 "
      >
        <div className=" flex flex-col">
          <button onClick={closeModal}>
            <i class="fa-solid fa-xmark"></i>
          </button>
          <div className="flex justify-center">
            <ReactPlayer url={link} controls />
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default VideoPopup;
