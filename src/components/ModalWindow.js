import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useTranslation, Trans } from 'react-i18next';

export default function ModalWindow(props) {
  const { t, i18n } = useTranslation();
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{props.message}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onConfirm}>{t('Yes')}</Button>
        <Button onClick={props.onHide}>{t('No')}</Button>
      </Modal.Footer>
    </Modal>
  );
}
