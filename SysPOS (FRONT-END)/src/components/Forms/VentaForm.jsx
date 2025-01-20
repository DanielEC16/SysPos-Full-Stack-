import { useState } from "react";
import { Button, Col, Form, Modal, Row, Table } from "react-bootstrap";

export const VentaFormAdd = ({ show, intercalarView, listar }) => {
  const [dni, setDni] = useState("");
  const [fecha, setFecha] = useState("");
  const [nota, setNota] = useState("");
  const [detalles, setDetalles] = useState([]);

  const handleBuscarProducto = async (codigo) => {
    try {
      const response = await fetch(
        `http://localhost:8080/productos/buscarcodigo/${codigo}`
      );
      const producto = await response.json();

      const nuevoDetalle = {
        productoId: producto.id,
        codigo: producto.codigo,
        nombre: producto.nombre,
        cantidad: 1,
        precioUnitario: producto.precio,
        subtotal: producto.precio * 1,
      };

      setDetalles([...detalles, nuevoDetalle]);
    } catch (error) {
      alert("Producto no encontrado. Verifica el código.");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Previene que el formulario se envíe
      const codigo = e.target.value.trim();
      if (codigo) {
        handleBuscarProducto(codigo);
        e.target.value = ""; // Limpia el campo de entrada
      }
    }
  };

  const handleSubmit = async () => {
    try {
      const ventaData = {
        dni,
        operacion: {
          fecha,
          total: detalles.reduce((sum, d) => sum + d.subtotal, 0),
          tipo: "Venta",
          estado: "Completado",
          nota,
        },
        detalles: detalles.map((detalle) => ({
          producto: { id: detalle.productoId },
          cantidad: detalle.cantidad,
          precioUnitario: detalle.precioUnitario,
          subtotal: detalle.subtotal,
        })),
      };

      // Enviar la solicitud POST al backend utilizando Fetch
      const response = await fetch(
        "http://localhost:8080/operaciones/guardar",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(ventaData),
        }
      );

      // Verificar si la respuesta es exitosa
      if (response.ok) {
        const data = await response.json();
        alert(`Venta generada con éxito. ID: ${data.id}`);
        intercalarView(); // Cierra el modal
        listar(); // Actualiza la lista de ventas
      } else {
        alert(
          "Hubo un problema al generar la venta. Por favor, intenta nuevamente."
        );
      }
    } catch (error) {
      console.error("Error al generar la venta:", error);
      alert("No se pudo generar la venta. Por favor, revisa los datos.");
    }
  };

  return (
    <>
      <Modal
        size="lg"
        show={show}
        onHide={intercalarView}
        centered
        data-bs-theme="dark"
        className="text-white"
      >
        <Modal.Header closeButton>
          <Modal.Title>Generar Venta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md="4">
              <Form.Group>
                <Form.Label>DNI</Form.Label>
                <Form.Control
                  required
                  placeholder="Ej:12345678"
                  type="text"
                  maxLength={8}
                  value={dni}
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^0-9]/g, "");
                  }}
                  onChange={(e) =>
                    setDni(e.target.value.replace(/[^0-9]/g, ""))
                  }
                />
              </Form.Group>
            </Col>
            <Col md="4">
              <Form.Group>
                <Form.Label>Tipo</Form.Label>
                <Form.Select onChange={(e) => setTipo(e.target.value)}>
                  <option value="venta">Venta</option>
                  <option value="pedido">Pedido</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md="4">
              <Form.Group>
                <Form.Label>Estado</Form.Label>
                <Form.Select onChange={(e) => setEstado(e.target.value)}>
                  <option value="pagado">Cancelado</option>
                  <option value="pendiente">Pendiente</option>
                  <option value="finalizado">Finalizado</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <hr />
          <Row className="mb-3">
            <Col>
              <Form.Label>Codigo del Producto:</Form.Label>
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Escribe el código y presiona Enter"
                maxLength={5}
                onKeyDown={handleKeyPress}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Código</th>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio Unitario</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {detalles.map((detalle, index) => (
                    <tr key={index}>
                      <td>{detalle.codigo}</td>
                      <td>{detalle.nombre}</td>
                      <td>{detalle.cantidad}</td>
                      <td>{detalle.precioUnitario}</td>
                      <td>{detalle.subtotal}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Agregar Nota (opcional)</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={1}
                  onChange={(e) => setNota(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={intercalarView}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Generar Venta
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
