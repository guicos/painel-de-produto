"use client";

import * as React from "react";
import Modal from "react-modal";

export default function ModalTemplate(props: { openModal: boolean, children: any }) {
    const [showModal, setShowModal] = React.useState(false);
    return (
        <div >
          <Modal isOpen={props.openModal}>
            <div className="flex flex-col items-center justify-center h-[80vh]">
                {props.children}
            </div>
          </Modal>
        </div>
      );
}