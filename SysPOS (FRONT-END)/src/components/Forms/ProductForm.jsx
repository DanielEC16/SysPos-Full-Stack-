import { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";

export const ProductFormAdd = ({ show, intercalarView, listar }) => {
  const [validated, setValidated] = useState(false);
  const [newProduct, setNewProduct] = useState({
    nombre: "",
    codigo: "",
    precio: 0,
    categoria: {
      id: "",
    },
    foto: null,
  });
  const [categorias, setCategorias] = useState([]);

  const agregarProducto = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      try {
        const response = await fetch(
          "http://localhost:8080/productos/guardar",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newProduct),
          }
        );
        listar();
        intercalarView();
        setNewProduct({
          nombre: "",
          codigo: "",
          precio: 0,
          categoria: {
            id: "",
          },
          foto: null,
        });
      } catch (error) {
        console.error("error al agregar producto", error);
      } finally {
        setValidated(false);
      }
    }
    setValidated(true);
  };

  useEffect(() => {
    const listCategory = async () => {
      try {
        const response = await fetch("http://localhost:8080/categorias/listar");
        const data = await response.json();
        setCategorias(data);
      } catch (error) {
        console.error("error al obtener categorias", error);
      }
    };
    listCategory();
  }, []);

  return (
    <>
      <Modal
        show={show}
        onHide={intercalarView}
        centered
        data-bs-theme="dark"
        className="text-white"
      >
        <Form noValidate validated={validated} onSubmit={agregarProducto}>
          <Modal.Header closeButton>
            <Modal.Title>Datos del Producto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Nombre del Producto</Form.Label>
                  <Form.Control
                    required
                    placeholder="Nombre"
                    type="text"
                    name="nombre"
                    onChange={(e) => {
                      setNewProduct({ ...newProduct, nombre: e.target.value });
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <Form.Group>
                  <Form.Label>Codigo</Form.Label>
                  <Form.Control
                    required
                    placeholder="Codigo"
                    type="text"
                    maxLength={5}
                    onChange={(e) => {
                      setNewProduct({ ...newProduct, codigo: e.target.value });
                    }}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col md="6">
                <Form.Group>
                  <Form.Label>Precio</Form.Label>
                  <Form.Control
                    required
                    placeholder="Precio"
                    type="number"
                    min="0"
                    max="100"
                    step="0.01"
                    value={newProduct.precio}
                    onChange={(e) => {
                      setNewProduct({ ...newProduct, precio: e.target.value });
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label>Categoria</Form.Label>
                <br />
                {categorias.map((category, index) => (
                  <Form.Check
                    required
                    key={index}
                    inline
                    type="radio"
                    label={category.nombre}
                    name="formRadios"
                    value={category.id}
                    id={`category-${category.nombre}`}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        categoria: { id: e.target.value },
                      })
                    }
                    checked={newProduct.categoria.id === category.id.toString()}
                  />
                ))}
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit">
              Guardar Cambios
            </Button>
            <Button variant="secondary" onClick={intercalarView}>
              Cancelar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};
