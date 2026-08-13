const SPREADSHEET_ID = "";
const ADMIN_PASSWORD = "5678";
const ADMIN_TOKEN = ADMIN_PASSWORD;
const MENU_CACHE_KEY = "morona_cafe_bar_menu_v1";
const MENU_CACHE_TTL_SECONDS = 15;
const CACHE_MAX_BYTES = 95000;
const SEED_VERSION = "morona-cafe-bar-catalog-v1";
const SEED_PROPERTY = "catalog_seed_version";

const CONFIG = {
  productos: {
    sheetName: "productos",
    idKey: "producto_id",
    headers: ["producto_id", "categoria_id", "nombre", "precio", "descripcion", "imagen", "opciones", "orden", "activo"]
  },
  extras: {
    sheetName: "extras",
    idKey: "extra_id",
    headers: ["extra_id", "nombre", "precio", "orden", "activo"]
  }
};

function seedProduct_(productoId, categoriaId, nombre, precio, imagen, orden, descripcion, activo) {
  return {
    producto_id: productoId,
    categoria_id: categoriaId,
    nombre: nombre,
    precio: precio,
    descripcion: descripcion,
    imagen: imagen,
    orden: orden,
    activo: activo !== false
  };
}

const SEED_PRODUCTS = [
  seedProduct_("prod-muelle-01", "del-muelle", "Capuchino", 10000, "coffee-hot.jpg", 1, "Cafe cremoso preparado al momento."),
  seedProduct_("prod-muelle-02", "del-muelle", "Capuchino con Amaretto", 14000, "coffee-hot.jpg", 2, "Capuchino con un toque aromatico de Amaretto."),
  seedProduct_("prod-muelle-03", "del-muelle", "Capuchino con Baileys", 14000, "coffee-hot.jpg", 3, "Capuchino con crema y Baileys."),
  seedProduct_("prod-muelle-04", "del-muelle", "Capuchino con Vainilla", 13000, "coffee-hot.jpg", 4, "Capuchino suave con notas de vainilla."),
  seedProduct_("prod-muelle-05", "del-muelle", "Latte", 10000, "coffee-hot.jpg", 5, "Espresso con leche cremosa."),
  seedProduct_("prod-muelle-06", "del-muelle", "Moca", 11500, "coffee-hot.jpg", 6, "Cafe con chocolate y leche vaporizada."),
  seedProduct_("prod-muelle-07", "del-muelle", "Espresso doble", 5500, "coffee-hot.jpg", 7, "Doble extraccion de cafe intenso."),
  seedProduct_("prod-muelle-08", "del-muelle", "Cafe americano", 7000, "coffee-hot.jpg", 8, "Cafe equilibrado y aromatico."),
  seedProduct_("prod-muelle-09", "del-muelle", "Cafe irlandes", 13000, "coffee-hot.jpg", 9, "Cafe especial con caracter irlandes."),
  seedProduct_("prod-muelle-10", "del-muelle", "Cafe tradicional", 4000, "coffee-hot.jpg", 10, "Cafe tradicional servido caliente."),
  seedProduct_("prod-muelle-11", "del-muelle", "Aromaticas frutales", 7000, "coffee-hot.jpg", 11, "Infusion caliente con notas frutales."),
  seedProduct_("prod-puerto-01", "del-puerto", "Heineken lata 330 ml", 6000, "beer-selection.jpg", 12, "Cerveza nacional e importada."),
  seedProduct_("prod-puerto-02", "del-puerto", "Heineken botella 330 ml", 7000, "beer-selection.jpg", 13, "Cerveza lager en botella."),
  seedProduct_("prod-puerto-03", "del-puerto", "3 Cordilleras", 8500, "beer-selection.jpg", 14, "Cerveza artesanal colombiana."),
  seedProduct_("prod-puerto-04", "del-puerto", "Sol botella 250 ml", 6000, "beer-selection.jpg", 15, "Cerveza ligera y refrescante."),
  seedProduct_("prod-puerto-05", "del-puerto", "Miller Lite botella 330 ml", 7000, "beer-selection.jpg", 16, "Lager ligera importada."),
  seedProduct_("prod-puerto-06", "del-puerto", "Corona 330 ml", 7000, "beer-selection.jpg", 17, "Cerveza lager mexicana."),
  seedProduct_("prod-puerto-07", "del-puerto", "Club Colombia lata", 7000, "beer-selection.jpg", 18, "Lager colombiana premium."),
  seedProduct_("prod-puerto-08", "del-puerto", "Stella Artois botella 300 ml", 9000, "beer-selection.jpg", 19, "Lager europea de perfil elegante."),
  seedProduct_("prod-puerto-09", "del-puerto", "Asahi 330 ml", 15000, "beer-selection.jpg", 20, "Lager japonesa importada."),
  seedProduct_("prod-puerto-10", "del-puerto", "Peroni botella 330 ml", 15000, "beer-selection.jpg", 21, "Lager italiana importada."),
  seedProduct_("prod-puerto-11", "del-puerto", "Flensburger Pilsener botella 330 ml", 26000, "beer-selection.jpg", 22, "Pilsener alemana importada."),
  seedProduct_("prod-puerto-12", "del-puerto", "Flensburger Keller botella 330 ml", 20000, "beer-selection.jpg", 23, "Cerveza alemana sin filtrar."),
  seedProduct_("prod-puerto-13", "del-puerto", "Bitburger botella 330 ml", 20000, "beer-selection.jpg", 24, "Pilsener alemana."),
  seedProduct_("prod-puerto-14", "del-puerto", "Bitburger botella 550 ml", 30000, "beer-selection.jpg", 25, "Presentacion grande importada."),
  seedProduct_("prod-puerto-15", "del-puerto", "Erdinger Weissbier lata 500 ml", 28000, "beer-selection.jpg", 26, "Cerveza de trigo alemana."),
  seedProduct_("prod-puerto-16", "del-puerto", "Steam Brew Wheat lata 500 ml", 23000, "beer-selection.jpg", 27, "Cerveza de trigo importada."),
  seedProduct_("prod-puerto-17", "del-puerto", "Hollandia botella 330 ml", 5000, "beer-selection.jpg", 28, "Lager refrescante."),
  seedProduct_("prod-puerto-18", "del-puerto", "Innis & Gunn botella 330 ml", 31000, "beer-selection.jpg", 29, "Cerveza escocesa de especialidad."),
  seedProduct_("prod-rio-01", "del-rio", "Frappuchino", 15000, "cold-coffee.jpg", 30, "Bebida fria de cafe, cremosa y refrescante."),
  seedProduct_("prod-rio-02", "del-rio", "Frappuchino con Amaretto", 17000, "cold-coffee.jpg", 31, "Frappuchino con un toque de Amaretto."),
  seedProduct_("prod-rio-03", "del-rio", "Frappuchino con Baileys", 17000, "cold-coffee.jpg", 32, "Frappuchino con crema y Baileys."),
  seedProduct_("prod-rio-04", "del-rio", "Ice Latte", 11000, "cold-coffee.jpg", 33, "Latte frio con hielo."),
  seedProduct_("prod-rio-05", "del-rio", "Mocaccino", 17000, "cold-coffee.jpg", 34, "Cafe frio con chocolate y leche."),
  seedProduct_("prod-rio-06", "del-rio", "Cafe irlandes con licor", 0, "cold-coffee.jpg", 35, "Precio por confirmar en la carta.", false),
  seedProduct_("prod-rio-07", "del-rio", "Granizados con licor", 0, "cold-coffee.jpg", 36, "Precio por confirmar en la carta.", false),
  seedProduct_("prod-rio-08", "del-rio", "Jugos naturales", 10000, "cold-coffee.jpg", 37, "Jugos naturales preparados al momento."),
  seedProduct_("prod-rio-09", "del-rio", "Sodas frutales con Ginger", 12000, "cold-coffee.jpg", 38, "Soda frutal con ginger y hielo."),
  seedProduct_("prod-rio-10", "del-rio", "Sodas frutales / Hatsu", 14000, "cold-coffee.jpg", 39, "Soda frutal con Hatsu."),
  seedProduct_("prod-sabana-01", "de-sabana", "Torta de queso", 6500, "savanna-bakery.jpg", 40, "Porcion de torta de queso."),
  seedProduct_("prod-sabana-02", "de-sabana", "Torta de pina y queso", 6500, "savanna-bakery.jpg", 41, "Torta suave con pina y queso."),
  seedProduct_("prod-sabana-03", "de-sabana", "Torta de zanahoria", 13000, "savanna-bakery.jpg", 42, "Torta de zanahoria especiada."),
  seedProduct_("prod-sabana-04", "de-sabana", "Torta de amapola", 13000, "savanna-bakery.jpg", 43, "Torta de amapola de la casa."),
  seedProduct_("prod-sabana-05", "de-sabana", "Torta de temporada", 13000, "savanna-bakery.jpg", 44, "Seleccion de temporada."),
  seedProduct_("prod-sabana-06", "de-sabana", "Galletas", 8000, "savanna-bakery.jpg", 45, "Galletas para acompanar tu bebida."),
  seedProduct_("prod-sabana-07", "de-sabana", "Cheesecake", 4000, "savanna-bakery.jpg", 46, "Porcion de cheesecake."),
  seedProduct_("prod-sabana-08", "de-sabana", "Cuchareable", 0, "savanna-bakery.jpg", 47, "Precio por confirmar en la carta.", false),
  seedProduct_("prod-sabana-09", "de-sabana", "Empanada de pollo y queso", 5000, "savanna-bakery.jpg", 48, "Empanada horneada con pollo y queso."),
  seedProduct_("prod-sabana-10", "de-sabana", "Empanada ranchera", 5000, "savanna-bakery.jpg", 49, "Empanada con sabor ranchero."),
  seedProduct_("prod-sabana-11", "de-sabana", "Empanada mexicana", 5000, "savanna-bakery.jpg", 50, "Empanada con sazon mexicana."),
  seedProduct_("prod-sabana-12", "de-sabana", "Empanada de carne", 6000, "savanna-bakery.jpg", 51, "Empanada rellena de carne."),
  seedProduct_("prod-sabana-13", "de-sabana", "Sandwich croissant", 5000, "savanna-bakery.jpg", 52, "Croissant relleno para una comida ligera."),
  seedProduct_("prod-sabana-14", "de-sabana", "Croissant", 4000, "savanna-bakery.jpg", 53, "Croissant horneado."),
  seedProduct_("prod-cienaga-01", "de-cienaga", "Te Hatsu", 9000, "cienaga-refreshments.jpg", 54, "Te Hatsu frio."),
  seedProduct_("prod-cienaga-02", "de-cienaga", "Agua Hatsu", 6000, "cienaga-refreshments.jpg", 55, "Agua Hatsu."),
  seedProduct_("prod-cienaga-03", "de-cienaga", "Soda Hatsu", 7000, "cienaga-refreshments.jpg", 56, "Soda Hatsu fria."),
  seedProduct_("prod-cienaga-04", "de-cienaga", "Soda Bretana 300 ml", 5000, "cienaga-refreshments.jpg", 57, "Soda Bretana bien fria."),
  seedProduct_("prod-cienaga-05", "de-cienaga", "Canada Dry", 5000, "cienaga-refreshments.jpg", 58, "Gaseosa ginger ale fria."),
  seedProduct_("prod-cienaga-06", "de-cienaga", "Gaseosa Postobon", 5000, "cienaga-refreshments.jpg", 59, "Gaseosa Postobon."),
  seedProduct_("prod-cienaga-07", "de-cienaga", "Agua Cristal 600 ml", 4000, "cienaga-refreshments.jpg", 60, "Agua Cristal."),
  seedProduct_("prod-cienaga-08", "de-cienaga", "Hit 400 ml", 5000, "cienaga-refreshments.jpg", 61, "Bebida Hit fria."),
  seedProduct_("prod-cienaga-09", "de-cienaga", "Gaseosa 400 ml", 5000, "cienaga-refreshments.jpg", 62, "Gaseosa personal fria.")
];

const SEED_EXTRAS = [];

function doGet(e) {
  try {
    var action = param_(e, "action", "menu");

    if (action === "menu" || action === "read") {
      initializeCatalog_();
      return json_({ ok: true, data: getMenuData_() });
    }

    if (action === "ping") {
      return json_({ ok: true, data: { status: "online", updatedAt: new Date().toISOString() } });
    }

    return json_({ ok: false, error: "Accion GET no soportada: " + action });
  } catch (error) {
    return json_({ ok: false, error: errorMessage_(error) });
  }
}

function doPost(e) {
  var lock = LockService.getScriptLock();

  try {
    lock.waitLock(15000);

    var body = parseBody_(e);
    validateAdminPassword_(body.password || body.token);

    if (body.action === "upsertProduct" || body.action === "addProduct" || body.action === "editProduct") {
      var product = normalizeProduct_(body.product || body.producto || body);
      upsert_(CONFIG.productos, product);
      invalidateMenuCache_();
      return json_({ ok: true, data: { product: product } });
    }

    if (body.action === "upsertExtra" || body.action === "addExtra" || body.action === "editExtra") {
      var extra = normalizeExtra_(body.extra || body);
      upsert_(CONFIG.extras, extra);
      invalidateMenuCache_();
      return json_({ ok: true, data: { extra: extra } });
    }

    if (body.action === "deleteProduct") {
      var productId = required_(body.producto_id || body.product_id, "producto_id");
      deleteOrDeactivate_(CONFIG.productos, productId, true);
      invalidateMenuCache_();
      return json_({ ok: true, data: { producto_id: productId } });
    }

    if (body.action === "deleteExtra") {
      var extraId = required_(body.extra_id, "extra_id");
      deleteOrDeactivate_(CONFIG.extras, extraId, body.hardDelete === true);
      invalidateMenuCache_();
      return json_({ ok: true, data: { extra_id: extraId } });
    }

    if (body.action === "setup") {
      initializeCatalog_(true);
      invalidateMenuCache_();
      return json_({ ok: true, data: { message: "Hojas y catálogo inicial listos", products: SEED_PRODUCTS.length, extras: SEED_EXTRAS.length } });
    }

    return json_({ ok: false, error: "Accion POST no soportada: " + body.action });
  } catch (error) {
    return json_({ ok: false, error: errorMessage_(error) });
  } finally {
    try {
      lock.releaseLock();
    } catch (ignored) {}
  }
}

// Ejecuta esta función desde el editor de Apps Script para preparar el Sheet
// antes de publicar el Web App. También se ejecuta automáticamente en el primer GET ?action=menu.
function setupCatalogo() {
  initializeCatalog_();
  invalidateMenuCache_();
  return "Catálogo listo: " + SEED_PRODUCTS.length + " productos.";
}

function initializeCatalog_(lockAlreadyHeld) {
  var lock = LockService.getScriptLock();
  var acquiredHere = !lockAlreadyHeld;
  if (acquiredHere) lock.waitLock(15000);
  try {
    var productSheet = ensureSheet_(CONFIG.productos);
    var extraSheet = ensureSheet_(CONFIG.extras);
    var properties = PropertiesService.getScriptProperties();
    var seededVersion = properties.getProperty(SEED_PROPERTY);

    if (seededVersion !== SEED_VERSION) {
      seedMissing_(CONFIG.productos, productSheet, SEED_PRODUCTS.map(normalizeProduct_));
      seedMissing_(CONFIG.extras, extraSheet, SEED_EXTRAS.map(normalizeExtra_));
      properties.setProperty(SEED_PROPERTY, SEED_VERSION);
    }
  } finally {
    if (acquiredHere) lock.releaseLock();
  }
}

function seedMissing_(tableConfig, sheet, items) {
  if (!items.length) return;

  var headers = getHeaders_(sheet, tableConfig.headers);
  var idColumn = headers.indexOf(tableConfig.idKey);
  var existing = {};
  var lastRow = sheet.getLastRow();

  if (lastRow >= 2 && idColumn >= 0) {
    sheet.getRange(2, idColumn + 1, lastRow - 1, 1).getValues().forEach(function(row) {
      var id = clean_(row[0]);
      if (id) existing[id] = true;
    });
  }

  var rowsToAdd = items.filter(function(item) {
    return item[tableConfig.idKey] && !existing[item[tableConfig.idKey]];
  }).map(function(item) {
    return headers.map(function(header) {
      return Object.prototype.hasOwnProperty.call(item, header) ? item[header] : "";
    });
  });

  if (rowsToAdd.length) {
    sheet.getRange(sheet.getLastRow() + 1, 1, rowsToAdd.length, headers.length).setValues(rowsToAdd);
  }
}

function getMenuData_() {
  var cache = CacheService.getScriptCache();
  var cached = cache.get(MENU_CACHE_KEY);

  if (cached) {
    try {
      return JSON.parse(cached);
    } catch (ignored) {
      cache.remove(MENU_CACHE_KEY);
    }
  }

  var data = {
    products: readTable_(CONFIG.productos).map(normalizeProduct_).sort(sortByOrder_),
    extras: readTable_(CONFIG.extras).map(normalizeExtra_).sort(sortByOrder_),
    updatedAt: new Date().toISOString()
  };

  try {
    var serialized = JSON.stringify(data);
    if (serialized.length <= CACHE_MAX_BYTES) {
      cache.put(MENU_CACHE_KEY, serialized, MENU_CACHE_TTL_SECONDS);
    }
  } catch (ignored) {}

  return data;
}

function invalidateMenuCache_() {
  try {
    CacheService.getScriptCache().remove(MENU_CACHE_KEY);
  } catch (ignored) {}
}

function readTable_(tableConfig) {
  // Una lectura publica no debe crear ni reconfigurar hojas vacias.
  // La accion POST setup conserva la preparacion explicita de las hojas.
  var sheet = spreadsheet_().getSheetByName(tableConfig.sheetName);
  if (!sheet) return [];

  var headers = getHeaders_(sheet, tableConfig.headers);
  var lastRow = sheet.getLastRow();

  if (lastRow < 2) return [];

  var rows = sheet.getRange(2, 1, lastRow - 1, headers.length).getValues();
  var output = [];

  rows.forEach(function(row) {
    var hasValue = row.some(function(cell) { return String(cell).trim() !== ""; });
    if (!hasValue) return;

    var item = {};
    headers.forEach(function(header, index) { item[header] = row[index]; });
    output.push(item);
  });

  return output;
}

function upsert_(tableConfig, item) {
  var sheet = ensureSheet_(tableConfig);
  var headers = getHeaders_(sheet, tableConfig.headers);
  var rowIndex = findRow_(sheet, headers, tableConfig.idKey, item[tableConfig.idKey]);
  var values = headers.map(function(header) {
    return Object.prototype.hasOwnProperty.call(item, header) ? item[header] : "";
  });

  if (rowIndex > 0) {
    sheet.getRange(rowIndex, 1, 1, headers.length).setValues([values]);
  } else {
    sheet.appendRow(values);
  }
}

function deleteOrDeactivate_(tableConfig, id, hardDelete) {
  var sheet = ensureSheet_(tableConfig);
  var headers = getHeaders_(sheet, tableConfig.headers);
  var rowIndex = findRow_(sheet, headers, tableConfig.idKey, id);

  if (rowIndex < 1) throw new Error("No existe el registro: " + id);

  if (hardDelete) {
    sheet.deleteRow(rowIndex);
    return;
  }

  var activeColumn = headers.indexOf("activo") + 1;
  if (activeColumn < 1) throw new Error("Falta la columna activo");
  sheet.getRange(rowIndex, activeColumn).setValue(false);
}

function ensureSheet_(tableConfig) {
  var spreadsheet = spreadsheet_();
  var sheet = spreadsheet.getSheetByName(tableConfig.sheetName);

  if (!sheet) sheet = spreadsheet.insertSheet(tableConfig.sheetName);

  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, tableConfig.headers.length).setValues([tableConfig.headers]);
    sheet.setFrozenRows(1);
    return sheet;
  }

  var headers = getHeaders_(sheet, tableConfig.headers);
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.setFrozenRows(1);
  return sheet;
}

function getHeaders_(sheet, requiredHeaders) {
  var width = Math.max(sheet.getLastColumn(), requiredHeaders.length);
  var currentHeaders = sheet.getRange(1, 1, 1, width).getValues()[0]
    .map(function(header) { return String(header).trim(); })
    .filter(function(header) { return header !== ""; });

  requiredHeaders.forEach(function(header) {
    if (currentHeaders.indexOf(header) === -1) currentHeaders.push(header);
  });

  return currentHeaders;
}

function findRow_(sheet, headers, idKey, idValue) {
  var idColumn = headers.indexOf(idKey) + 1;
  if (idColumn < 1) throw new Error("Falta la columna " + idKey);

  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return -1;

  var values = sheet.getRange(2, idColumn, lastRow - 1, 1).getValues();
  var needle = String(idValue).trim();
  for (var i = 0; i < values.length; i++) {
    if (String(values[i][0]).trim() === needle) return i + 2;
  }
  return -1;
}

function normalizeProduct_(product) {
  product = product || {};
  return {
    producto_id: clean_(product.producto_id || product.id || makeId_("prod")),
    categoria_id: slug_(product.categoria_id || product.category || "general"),
    nombre: required_(product.nombre || product.title, "nombre"),
    precio: number_(product.precio || product.price),
    descripcion: clean_(product.descripcion || product.desc),
    imagen: clean_(product.imagen || product.image),
    opciones: options_(product.opciones || product.options || product.sizes),
    orden: number_(product.orden),
    activo: bool_(product.activo)
  };
}

function options_(value) {
  if (!value) return "";
  if (Array.isArray(value)) {
    return JSON.stringify(value.map(function(option, index) {
      return {
        id: clean_(option.id || option.option_id || "opcion-" + (index + 1)),
        label: clean_(option.label || option.nombre || option.name || "Opcion " + (index + 1)),
        price: number_(option.price || option.precio),
        image: clean_(option.image || option.imagen)
      };
    }));
  }

  var text = clean_(value);
  if (!text) return "";
  try {
    var parsed = JSON.parse(text);
    return Array.isArray(parsed) ? options_(parsed) : "";
  } catch (ignored) {
    return text;
  }
}

function normalizeExtra_(extra) {
  extra = extra || {};
  return {
    extra_id: clean_(extra.extra_id || extra.id || makeId_("extra")),
    nombre: required_(extra.nombre || extra.name, "nombre"),
    precio: number_(extra.precio || extra.price),
    orden: number_(extra.orden),
    activo: bool_(extra.activo)
  };
}

function parseBody_(e) {
  if (!e || !e.postData || !e.postData.contents) return {};
  var raw = e.postData.contents;
  try {
    return JSON.parse(raw);
  } catch (ignored) {
    var data = {};
    raw.split("&").forEach(function(pair) {
      var parts = pair.split("=");
      var key = decodeURIComponent(parts[0] || "");
      var value = decodeURIComponent(parts.slice(1).join("=") || "");
      if (key) data[key] = value;
    });
    return data;
  }
}

function validateAdminPassword_(password) {
  if (!ADMIN_PASSWORD) throw new Error("Primero define ADMIN_PASSWORD en Apps Script.");
  if (String(password || "") !== String(ADMIN_PASSWORD)) throw new Error("Contrasena de administrador invalida.");
}

function spreadsheet_() {
  if (SPREADSHEET_ID) return SpreadsheetApp.openById(SPREADSHEET_ID);
  var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  if (!activeSpreadsheet) throw new Error("No hay hoja activa. Coloca el ID de tu Google Sheet en SPREADSHEET_ID.");
  return activeSpreadsheet;
}

function json_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(ContentService.MimeType.JSON);
}

function param_(e, key, fallback) {
  return e && e.parameter && e.parameter[key] ? String(e.parameter[key]) : fallback;
}

function sortByOrder_(a, b) {
  return number_(a.orden) - number_(b.orden) || clean_(a.nombre).localeCompare(clean_(b.nombre), "es");
}

function required_(value, label) {
  var output = clean_(value);
  if (!output) throw new Error("Falta el campo " + label);
  return output;
}

function clean_(value) { return String(value == null ? "" : value).trim(); }

function number_(value) {
  if (typeof value === "number" && isFinite(value)) return Math.max(0, Math.round(value));
  var parsed = Number(clean_(value).replace(/[^\d-]/g, ""));
  return isFinite(parsed) ? Math.max(0, Math.round(parsed)) : 0;
}

function bool_(value) {
  if (typeof value === "boolean") return value;
  var normalized = clean_(value || "true").toLowerCase();
  return ["false", "0", "no", "inactivo", "inactive"].indexOf(normalized) === -1;
}

function slug_(value) {
  return clean_(value || "general")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "general";
}

function makeId_(prefix) { return prefix + "-" + Utilities.getUuid().toLowerCase(); }

function errorMessage_(error) {
  console.error(error);
  return error && error.message ? error.message : String(error);
}
