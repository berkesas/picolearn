import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import BookTile from "../components/BookTile.js";
import ModalWindow from "../components/ModalWindow.js";
import parse from "html-react-parser";
import Form from "react-bootstrap/Form";
import { useTranslation, Trans } from 'react-i18next';

function Main() {
  const [booksData, setBooksData] = useState([]);
  const [modalData, setModalData] = useState({ title: "", message: "" });
  const [modalShow, setModalShow] = useState(false);
  const [selectedBook, setSelectedBook] = useState();
  const [query, setQuery] = useState();
  const [filteredData, setFilteredData] = useState([]);
  const { t, i18n } = useTranslation();

  async function getList() {
    // console.log("getting path");
    //const result =
    try {
      window.api.send("toMain", { command: "get-list" }).then((result) => {
        // console.log("app: " + result);
        const obj = JSON.parse(result);
        // console.log("type: " + typeof obj);
        setBooksData(obj);
        setFilteredData(obj);
      });
    }
    catch (e) {
      console.log(e);
    }
  }

  const loadBook = (book_path) => {
    console.log(book_path);
    window.api.loadBook("toMain", { command: "load-book", path: book_path });
  };

  const deleteBook = (book) => {
    setSelectedBook(book);
    const newModalData = { ...modalData };
    newModalData.title = t('Confirm delete');
    newModalData.message = parse(t('confirm delete question', { title: book.data.title }));
    setModalData(newModalData);
    setModalShow(true);
  };

  const confirmModal = () => {
    window.api.addBook("toMain", {
      command: "remove-book",
      path: selectedBook.path,
    });
    setModalShow(false);
    getList();
  };

  const handleAdd = () => {
    window.api.addBook("toMain", { command: "add-book" });
    getList();
  };

  useEffect(() => {
    getList();
  }, []);

  function handleSearch(e) {
    e.stopPropagation();
    const newFilteredData = booksData.filter((v) => {
      if (query)
        return (
          v.data.title.indexOf(query) > -1 ||
          v.data.title.toLowerCase().indexOf(query) > -1
        );
      else return true;
    });
    // console.log("clicked", query);
    setFilteredData(newFilteredData);
  }

  function handleChange(e) {
    setQuery(e.target.value);
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch(e);
    }
  };

  return (
    <Container fluid>
      <Row className="mb-2 mt-2">
        <Col>
          <Trans><h4>Installed packages</h4></Trans>
        </Col>
      </Row>
      <Row className="mb-2 mt-2">
        <Col>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <Row>
              <Col xs="auto">
                <Form.Label visuallyHidden>{t('Search')}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={t('search here')}
                  value={query}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                />
              </Col>
              <Col xs="auto">
                <Button variant="primary" type="button" onClick={handleSearch}>
                  <i class="bi bi-search"></i> {t('Search')}
                </Button>
              </Col>
              <Col xs="auto">
                <Button variant="success" onClick={handleAdd}>
                  <i class="bi bi-plus"></i> {t('Add')}
                </Button>{" "}
                <Button variant="success" onClick={getList}>
                  <i class="bi bi-arrow-clockwise"></i> {t('Refresh')}
                </Button>{" "}
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col className="tiles">
          {filteredData.map((v, i) => {
            return (
              <BookTile
                key={i}
                data={v}
                onViewClick={() => {
                  loadBook(v.path);
                }}
                onDeleteClick={() => {
                  deleteBook(v);
                }}
              />
            );
          })}
          {!booksData.length && t("No resources installed yet")}
        </Col>
      </Row>
      <ModalWindow
        title={modalData.title}
        message={modalData.message}
        show={modalShow}
        onHide={() => setModalShow(false)}
        onConfirm={() => confirmModal()}
        item={selectedBook}
      />
    </Container>
  );
}

export default Main;
