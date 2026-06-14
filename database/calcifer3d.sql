CREATE DATABASE IF NOT EXISTS calcifer3d
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE calcifer3d;

SET NAMES utf8mb4;

CREATE TABLE roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL
) ENGINE=InnoDB;

CREATE TABLE categorias (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(120) NOT NULL,
  descripcion TEXT
) ENGINE=InnoDB;

CREATE TABLE proveedores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(150) NOT NULL,
  telefono VARCHAR(30),
  correo VARCHAR(150),
  direccion VARCHAR(255)
) ENGINE=InnoDB;

CREATE TABLE clientes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(150) NOT NULL,
  correo VARCHAR(150),
  telefono VARCHAR(30),
  direccion VARCHAR(255),
  fecha_registro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(150) NOT NULL,
  correo VARCHAR(150) NOT NULL,
  password VARCHAR(255) NOT NULL,
  rol_id INT NOT NULL,
  CONSTRAINT fk_usuarios_roles
    FOREIGN KEY (rol_id) REFERENCES roles(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,
  UNIQUE KEY uq_usuarios_correo (correo)
) ENGINE=InnoDB;

CREATE TABLE productos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(150) NOT NULL,
  descripcion TEXT,
  marca VARCHAR(120),
  color VARCHAR(80),
  cantidad INT NOT NULL DEFAULT 0,
  precio_compra DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  precio_redes DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  precio_mercadolibre DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  precio_fisico DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  ubicacion VARCHAR(120),
  foto VARCHAR(255),
  categoria_id INT,
  proveedor_id INT,
  CONSTRAINT fk_productos_categorias
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
    ON UPDATE CASCADE
    ON DELETE SET NULL,
  CONSTRAINT fk_productos_proveedores
    FOREIGN KEY (proveedor_id) REFERENCES proveedores(id)
    ON UPDATE CASCADE
    ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE ventas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  cliente_id INT NOT NULL,
  fecha DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  total DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  CONSTRAINT fk_ventas_usuarios
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,
  CONSTRAINT fk_ventas_clientes
    FOREIGN KEY (cliente_id) REFERENCES clientes(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
) ENGINE=InnoDB;

CREATE TABLE detalle_ventas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  venta_id INT NOT NULL,
  producto_id INT NOT NULL,
  cantidad INT NOT NULL,
  precio_unitario DECIMAL(12,2) NOT NULL,
  CONSTRAINT fk_detalle_ventas_ventas
    FOREIGN KEY (venta_id) REFERENCES ventas(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  CONSTRAINT fk_detalle_ventas_productos
    FOREIGN KEY (producto_id) REFERENCES productos(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
) ENGINE=InnoDB;

CREATE TABLE inventario_movimientos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  producto_id INT NOT NULL,
  tipo VARCHAR(30) NOT NULL,
  cantidad INT NOT NULL,
  fecha DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  usuario_id INT NOT NULL,
  descripcion TEXT,
  CONSTRAINT fk_movimientos_productos
    FOREIGN KEY (producto_id) REFERENCES productos(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,
  CONSTRAINT fk_movimientos_usuarios
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
) ENGINE=InnoDB;

CREATE TABLE pedidos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cliente_id INT NOT NULL,
  fecha DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  estado VARCHAR(30) NOT NULL,
  total DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  CONSTRAINT fk_pedidos_clientes
    FOREIGN KEY (cliente_id) REFERENCES clientes(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
) ENGINE=InnoDB;

CREATE TABLE detalle_pedidos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pedido_id INT NOT NULL,
  producto_id INT NOT NULL,
  cantidad INT NOT NULL,
  precio_unitario DECIMAL(12,2) NOT NULL,
  CONSTRAINT fk_detalle_pedidos_pedidos
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  CONSTRAINT fk_detalle_pedidos_productos
    FOREIGN KEY (producto_id) REFERENCES productos(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
) ENGINE=InnoDB;

CREATE TABLE servicios_impresion (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cliente_id INT NOT NULL,
  usuario_id INT NOT NULL,
  fecha DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  descripcion TEXT,
  estado VARCHAR(30) NOT NULL,
  costo DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  CONSTRAINT fk_servicios_clientes
    FOREIGN KEY (cliente_id) REFERENCES clientes(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,
  CONSTRAINT fk_servicios_usuarios
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
) ENGINE=InnoDB;

CREATE TABLE taller_reparaciones (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cliente_id INT NOT NULL,
  usuario_id INT NOT NULL,
  producto_equipo VARCHAR(150) NOT NULL,
  descripcion_falla TEXT,
  fecha_ingreso DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  fecha_salida DATETIME NULL,
  costo DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  estado VARCHAR(30) NOT NULL,
  CONSTRAINT fk_taller_clientes
    FOREIGN KEY (cliente_id) REFERENCES clientes(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,
  CONSTRAINT fk_taller_usuarios
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
) ENGINE=InnoDB;

CREATE TABLE carrito (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cliente_id INT NOT NULL,
  fecha DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_carrito_clientes
    FOREIGN KEY (cliente_id) REFERENCES clientes(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE carrito_detalle (
  id INT AUTO_INCREMENT PRIMARY KEY,
  carrito_id INT NOT NULL,
  producto_id INT NOT NULL,
  cantidad INT NOT NULL,
  CONSTRAINT fk_carrito_detalle_carrito
    FOREIGN KEY (carrito_id) REFERENCES carrito(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  CONSTRAINT fk_carrito_detalle_productos
    FOREIGN KEY (producto_id) REFERENCES productos(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
) ENGINE=InnoDB;

CREATE TABLE direcciones_envio (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cliente_id INT NOT NULL,
  direccion VARCHAR(255) NOT NULL,
  ciudad VARCHAR(120),
  departamento VARCHAR(120),
  codigo_postal VARCHAR(20),
  CONSTRAINT fk_direcciones_clientes
    FOREIGN KEY (cliente_id) REFERENCES clientes(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE facturas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  venta_id INT NOT NULL,
  numero VARCHAR(50) NOT NULL,
  fecha DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  metodo_pago VARCHAR(60),
  CONSTRAINT fk_facturas_ventas
    FOREIGN KEY (venta_id) REFERENCES ventas(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,
  UNIQUE KEY uq_facturas_numero (numero)
) ENGINE=InnoDB;

CREATE TABLE log_bodega (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  producto_id INT NOT NULL,
  accion VARCHAR(50) NOT NULL,
  fecha DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  descripcion TEXT,
  CONSTRAINT fk_log_bodega_usuarios
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,
  CONSTRAINT fk_log_bodega_productos
    FOREIGN KEY (producto_id) REFERENCES productos(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
) ENGINE=InnoDB;

INSERT INTO roles (nombre) VALUES
  ('Admin'),
  ('Vendedor'),
  ('Comprador');
