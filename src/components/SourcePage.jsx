import { Button, Modal } from "bootstrap";
import React, { useState } from "react";

function SourcePage() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className="source-btn" variant="primary" onClick={handleShow}>
        Source
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
      </Modal>
    </>
  );
}

export default SourcePage;
