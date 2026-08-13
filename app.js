// Cambia solo esta URL cuando el nuevo backend este listo. La app acepta
// respuestas { products }, { productos }, o categorias con productos anidados.
const API_URL = window.DRINKS_API_URL || "";

const BUSINESS_NAME = "Morona Café Bar";
const BUSINESS_PHONE = "57310826516";
const DELIVERY_FEE = 0;
const CART_KEY = "morona_cafe_bar_cart_v1";
const CHECKOUT_DRAFT_KEY = "morona_cafe_bar_checkout_v1";
const MENU_CACHE_PREFIX = "morona_cafe_bar_menu_v1:";
const MENU_CACHE_TTL_MS = 15000;
const MAX_QTY = 999999;
const PRODUCT_IMAGE_LIBRARY = {
  "del-muelle": ["coffee-hot.jpg"],
  "del-puerto": ["beer-selection.jpg"],
  "del-rio": ["cold-coffee.jpg"],
  "de-sabana": ["savanna-bakery.jpg"],
  "de-cienaga": ["cienaga-refreshments.jpg"],
  default: ["beer-selection.jpg"]
};
const LOCAL_PRODUCT_IMAGES = new Set([
  "coffee-hot.jpg",
  "beer-selection.jpg",
  "cold-coffee.jpg",
  "savanna-bakery.jpg",
  "cienaga-refreshments.jpg"
]);

const IMAGE_CATEGORY_GROUPS = {
  "del-muelle": { aliases: ["muelle", "cafe", "café", "espresso", "americano", "latte", "capuccino", "cappuccino", "moca", "mocaccino", "aromatica"] },
  "del-puerto": { aliases: ["puerto", "cerveza", "heineken", "cordilleras", "sol", "miller", "corona", "club colombia", "stella", "asahi", "peroni", "flensburger", "bitburger", "erdinger", "steam brew", "hollandia", "innis"] },
  "del-rio": { aliases: ["rio", "frappuchino", "frappuccino", "ice latte", "granizado", "jugo natural", "soda frutal"] },
  "de-sabana": { aliases: ["sabana", "torta", "galleta", "cheese cake", "cuchareable", "empanada", "sandwich", "croissant"] },
  "de-cienaga": { aliases: ["cienaga", "hatsu", "agua", "bretaña", "canada dry", "postobon", "cristal", "hit", "gaseosa"] }
};

const CATEGORY_DETECTION_ORDER = ["del-muelle", "del-puerto", "del-rio", "de-sabana", "de-cienaga"];

const CATEGORY_ORDER = [
  "del-muelle",
  "del-puerto",
  "del-rio",
  "de-sabana",
  "de-cienaga"
];

const CATEGORY_LABELS = {
  "del-muelle": "Del Muelle · Café caliente",
  "del-puerto": "Del Puerto · Cervezas",
  "del-rio": "Del Río · Bebidas frías",
  "de-sabana": "De Sabana · Para comer",
  "de-cienaga": "De Ciénaga · Refrescantes"
};

const CATEGORIES_WITHOUT_EXTRAS = new Set(CATEGORY_ORDER);

const demoProduct = (producto_id, categoria_id, nombre, precio, imagen, orden, descripcion, activo = true) => ({ producto_id, categoria_id, nombre, precio, imagen, orden, descripcion, activo });

const demoMenu = {
  products: [
    demoProduct("demo-muelle-01", "del-muelle", "Capuchino", 10000, "coffee-hot.jpg", 1, "Café cremoso preparado al momento."),
    demoProduct("demo-muelle-02", "del-muelle", "Capuchino con Amaretto", 14000, "coffee-hot.jpg", 2, "Capuchino con un toque aromático de Amaretto."),
    demoProduct("demo-muelle-03", "del-muelle", "Capuchino con Baileys", 14000, "coffee-hot.jpg", 3, "Capuchino con crema y Baileys."),
    demoProduct("demo-muelle-04", "del-muelle", "Capuchino con Vainilla", 13000, "coffee-hot.jpg", 4, "Capuchino suave con notas de vainilla."),
    demoProduct("demo-muelle-05", "del-muelle", "Latte", 10000, "coffee-hot.jpg", 5, "Espresso con leche cremosa."),
    demoProduct("demo-muelle-06", "del-muelle", "Moca", 11500, "coffee-hot.jpg", 6, "Café con chocolate y leche vaporizada."),
    demoProduct("demo-muelle-07", "del-muelle", "Espresso doble", 5500, "coffee-hot.jpg", 7, "Doble extracción de café intenso."),
    demoProduct("demo-muelle-08", "del-muelle", "Café americano", 7000, "coffee-hot.jpg", 8, "Café equilibrado y aromático."),
    demoProduct("demo-muelle-09", "del-muelle", "Café irlandés", 13000, "coffee-hot.jpg", 9, "Café especial con carácter irlandés."),
    demoProduct("demo-muelle-10", "del-muelle", "Café tradicional", 4000, "coffee-hot.jpg", 10, "Café tradicional servido caliente."),
    demoProduct("demo-muelle-11", "del-muelle", "Aromáticas frutales", 7000, "coffee-hot.jpg", 11, "Infusión caliente con notas frutales."),
    demoProduct("demo-puerto-01", "del-puerto", "Heineken lata 330 ml", 6000, "beer-selection.jpg", 12, "Cerveza nacional e importada."),
    demoProduct("demo-puerto-02", "del-puerto", "Heineken botella 330 ml", 7000, "beer-selection.jpg", 13, "Cerveza lager en botella."),
    demoProduct("demo-puerto-03", "del-puerto", "3 Cordilleras", 8500, "beer-selection.jpg", 14, "Cerveza artesanal colombiana."),
    demoProduct("demo-puerto-04", "del-puerto", "Sol botella 250 ml", 6000, "beer-selection.jpg", 15, "Cerveza ligera y refrescante."),
    demoProduct("demo-puerto-05", "del-puerto", "Miller Lite botella 330 ml", 7000, "beer-selection.jpg", 16, "Lager ligera importada."),
    demoProduct("demo-puerto-06", "del-puerto", "Corona 330 ml", 7000, "beer-selection.jpg", 17, "Cerveza lager mexicana."),
    demoProduct("demo-puerto-07", "del-puerto", "Club Colombia lata", 7000, "beer-selection.jpg", 18, "Lager colombiana premium."),
    demoProduct("demo-puerto-08", "del-puerto", "Stella Artois botella 300 ml", 9000, "beer-selection.jpg", 19, "Lager europea de perfil elegante."),
    demoProduct("demo-puerto-09", "del-puerto", "Asahi 330 ml", 15000, "beer-selection.jpg", 20, "Lager japonesa importada."),
    demoProduct("demo-puerto-10", "del-puerto", "Peroni botella 330 ml", 15000, "beer-selection.jpg", 21, "Lager italiana importada."),
    demoProduct("demo-puerto-11", "del-puerto", "Flensburger Pilsener botella 330 ml", 26000, "beer-selection.jpg", 22, "Pilsener alemana importada."),
    demoProduct("demo-puerto-12", "del-puerto", "Flensburger Keller botella 330 ml", 20000, "beer-selection.jpg", 23, "Cerveza alemana sin filtrar."),
    demoProduct("demo-puerto-13", "del-puerto", "Bitburger botella 330 ml", 20000, "beer-selection.jpg", 24, "Pilsener alemana."),
    demoProduct("demo-puerto-14", "del-puerto", "Bitburger botella 550 ml", 30000, "beer-selection.jpg", 25, "Presentación grande importada."),
    demoProduct("demo-puerto-15", "del-puerto", "Erdinger Weissbier lata 500 ml", 28000, "beer-selection.jpg", 26, "Cerveza de trigo alemana."),
    demoProduct("demo-puerto-16", "del-puerto", "Steam Brew Wheat lata 500 ml", 23000, "beer-selection.jpg", 27, "Cerveza de trigo importada."),
    demoProduct("demo-puerto-17", "del-puerto", "Hollandia botella 330 ml", 5000, "beer-selection.jpg", 28, "Lager refrescante."),
    demoProduct("demo-puerto-18", "del-puerto", "Innis & Gunn botella 330 ml", 31000, "beer-selection.jpg", 29, "Cerveza escocesa de especialidad."),
    demoProduct("demo-rio-01", "del-rio", "Frappuchino", 15000, "cold-coffee.jpg", 30, "Bebida fría de café, cremosa y refrescante."),
    demoProduct("demo-rio-02", "del-rio", "Frappuchino con Amaretto", 17000, "cold-coffee.jpg", 31, "Frappuchino con un toque de Amaretto."),
    demoProduct("demo-rio-03", "del-rio", "Frappuchino con Baileys", 17000, "cold-coffee.jpg", 32, "Frappuchino con crema y Baileys."),
    demoProduct("demo-rio-04", "del-rio", "Ice Latte", 11000, "cold-coffee.jpg", 33, "Latte frío con hielo."),
    demoProduct("demo-rio-05", "del-rio", "Mocaccino", 17000, "cold-coffee.jpg", 34, "Café frío con chocolate y leche."),
    demoProduct("demo-rio-06", "del-rio", "Café irlandés con licor", 0, "cold-coffee.jpg", 35, "Precio por confirmar en la carta.", false),
    demoProduct("demo-rio-07", "del-rio", "Granizados con licor", 0, "cold-coffee.jpg", 36, "Precio por confirmar en la carta.", false),
    demoProduct("demo-rio-08", "del-rio", "Jugos naturales", 10000, "cold-coffee.jpg", 37, "Jugos naturales preparados al momento."),
    demoProduct("demo-rio-09", "del-rio", "Sodas frutales con Ginger", 12000, "cold-coffee.jpg", 38, "Soda frutal con ginger y hielo."),
    demoProduct("demo-rio-10", "del-rio", "Sodas frutales / Hatsu", 14000, "cold-coffee.jpg", 39, "Soda frutal con Hatsu."),
    demoProduct("demo-sabana-01", "de-sabana", "Torta de queso", 6500, "savanna-bakery.jpg", 40, "Porción de torta de queso."),
    demoProduct("demo-sabana-02", "de-sabana", "Torta de piña y queso", 6500, "savanna-bakery.jpg", 41, "Torta suave con piña y queso."),
    demoProduct("demo-sabana-03", "de-sabana", "Torta de zanahoria", 13000, "savanna-bakery.jpg", 42, "Torta de zanahoria especiada."),
    demoProduct("demo-sabana-04", "de-sabana", "Torta de amapola", 13000, "savanna-bakery.jpg", 43, "Torta de amapola de la casa."),
    demoProduct("demo-sabana-05", "de-sabana", "Torta de temporada", 13000, "savanna-bakery.jpg", 44, "Selección de temporada."),
    demoProduct("demo-sabana-06", "de-sabana", "Galletas", 8000, "savanna-bakery.jpg", 45, "Galletas para acompañar tu bebida."),
    demoProduct("demo-sabana-07", "de-sabana", "Cheesecake", 4000, "savanna-bakery.jpg", 46, "Porción de cheesecake."),
    demoProduct("demo-sabana-08", "de-sabana", "Cuchareable", 0, "savanna-bakery.jpg", 47, "Precio por confirmar en la carta.", false),
    demoProduct("demo-sabana-09", "de-sabana", "Empanada de pollo y queso", 5000, "savanna-bakery.jpg", 48, "Empanada horneada con pollo y queso."),
    demoProduct("demo-sabana-10", "de-sabana", "Empanada ranchera", 5000, "savanna-bakery.jpg", 49, "Empanada con sabor ranchero."),
    demoProduct("demo-sabana-11", "de-sabana", "Empanada mexicana", 5000, "savanna-bakery.jpg", 50, "Empanada con sazón mexicana."),
    demoProduct("demo-sabana-12", "de-sabana", "Empanada de carne", 6000, "savanna-bakery.jpg", 51, "Empanada rellena de carne."),
    demoProduct("demo-sabana-13", "de-sabana", "Sandwich croissant", 5000, "savanna-bakery.jpg", 52, "Croissant relleno para una comida ligera."),
    demoProduct("demo-sabana-14", "de-sabana", "Croissant", 4000, "savanna-bakery.jpg", 53, "Croissant horneado."),
    demoProduct("demo-cienaga-01", "de-cienaga", "Té Hatsu", 9000, "cienaga-refreshments.jpg", 54, "Té Hatsu frío."),
    demoProduct("demo-cienaga-02", "de-cienaga", "Agua Hatsu", 6000, "cienaga-refreshments.jpg", 55, "Agua Hatsu."),
    demoProduct("demo-cienaga-03", "de-cienaga", "Soda Hatsu", 7000, "cienaga-refreshments.jpg", 56, "Soda Hatsu fría."),
    demoProduct("demo-cienaga-04", "de-cienaga", "Soda Bretaña 300 ml", 5000, "cienaga-refreshments.jpg", 57, "Soda Bretaña bien fría."),
    demoProduct("demo-cienaga-05", "de-cienaga", "Canada Dry", 5000, "cienaga-refreshments.jpg", 58, "Gaseosa ginger ale fría."),
    demoProduct("demo-cienaga-06", "de-cienaga", "Gaseosa Postobón", 5000, "cienaga-refreshments.jpg", 59, "Gaseosa Postobón."),
    demoProduct("demo-cienaga-07", "de-cienaga", "Agua Cristal 600 ml", 4000, "cienaga-refreshments.jpg", 60, "Agua Cristal."),
    demoProduct("demo-cienaga-08", "de-cienaga", "Hit 400 ml", 5000, "cienaga-refreshments.jpg", 61, "Bebida Hit fría."),
    demoProduct("demo-cienaga-09", "de-cienaga", "Gaseosa 400 ml", 5000, "cienaga-refreshments.jpg", 62, "Gaseosa personal fría.")
  ],
  extras: []
};

const state = {
  products: [],
  extras: [],
  categories: [],
  cart: readCart(),
  activeCategory: "",
  search: "",
  adminToken: "",
  adminProductCategory: "todas",
  adminProductSearch: "",
  editingProductId: "",
  editingExtraId: ""
};

let menuRequest = null;
let catalogRenderFrame = 0;
let initialLoaderTimer = 0;
let initialLoaderActive = false;

function menuCacheKey() {
  return `${MENU_CACHE_PREFIX}${API_URL.trim() || "demo"}`;
}

const el = {
  categories: document.getElementById("categories"),
  catalog: document.getElementById("catalog"),
  search: document.getElementById("search"),
  refreshMenu: document.getElementById("refresh-menu"),
  syncStatus: document.getElementById("sync-status"),
  cartCount: document.getElementById("cart-count"),
  floatingCart: document.getElementById("floating-cart"),
  floatingCount: document.getElementById("floating-count"),
  openCart: document.getElementById("open-cart"),
  closeCart: document.getElementById("close-cart"),
  cartDrawer: document.getElementById("cart-drawer"),
  cartItems: document.getElementById("cart-items"),
  cartSubtotal: document.getElementById("cart-subtotal"),
  cartTotal: document.getElementById("cart-total"),
  checkoutBtn: document.getElementById("checkout-btn"),
  clearCart: document.getElementById("clear-cart"),
  productModal: document.getElementById("product-modal"),
  modalContent: document.getElementById("modal-content"),
  modalClose: document.getElementById("modal-close"),
  checkoutModal: document.getElementById("checkout-modal"),
  checkoutClose: document.getElementById("checkout-close"),
  checkoutForm: document.getElementById("checkout-form"),
  step1: document.getElementById("step1"),
  step2: document.getElementById("step2"),
  nextStep1: document.getElementById("next-step1"),
  backStep2: document.getElementById("back-step2"),
  backToCart: document.getElementById("back-to-cart"),
  clientSummary: document.getElementById("client-summary"),
  addressLabel: document.getElementById("address-label"),
  paymentMethod: document.getElementById("payment-method"),
  transferInfo: document.getElementById("transfer-info"),
  cartDelivery: document.getElementById("cart-delivery"),
  cartTotalCheckout: document.getElementById("cart-total-checkout"),
  menuBtn: document.getElementById("menu-btn"),
  sideMenu: document.getElementById("side-menu"),
  closeMenu: document.getElementById("close-menu"),
  adminOpen: document.getElementById("admin-open"),
  adminOpenMenu: document.getElementById("admin-open-menu"),
  adminPanel: document.getElementById("admin-panel"),
  adminClose: document.getElementById("admin-close"),
  adminLogout: document.getElementById("admin-logout"),
  adminReload: document.getElementById("admin-reload"),
  adminLogin: document.getElementById("admin-login"),
  adminWorkspace: document.getElementById("admin-workspace"),
  adminToken: document.getElementById("admin-token"),
  adminUnlock: document.getElementById("admin-unlock"),
  productForm: document.getElementById("product-form"),
  productReset: document.getElementById("product-reset"),
  productCancel: document.getElementById("product-cancel"),
  productSubmitLabel: document.getElementById("product-submit-label"),
  productHasOptions: document.getElementById("product-has-options"),
  adminProductSearch: document.getElementById("admin-product-search"),
  productOptionsEditor: document.getElementById("product-options-editor"),
  adminProductCategories: document.getElementById("admin-product-categories"),
  productList: document.getElementById("admin-product-list"),
  extraForm: document.getElementById("extra-form"),
  extraReset: document.getElementById("extra-reset"),
  extraList: document.getElementById("admin-extra-list"),
  toast: document.getElementById("toast"),
  loader: document.getElementById("app-loader"),
  loaderTitle: document.getElementById("loader-title"),
  loaderText: document.getElementById("loader-text")
};

document.addEventListener("DOMContentLoaded", init);

async function init() {
  resetCatalogSearch(false);
  bindEvents();
  bindAdminMoneyInputs();
  disableSearchAutofill();
  const instantMenu = readMenuCache(true) || demoMenu;
  applyMenu(instantMenu);
  setSync(API_URL.trim() ? "Carta guardada · actualizando" : "Modo demo");
  loadMenu({ background: true });
  window.setTimeout(() => resetCatalogSearch(true), 0);
}

function bindEvents() {
  el.search.addEventListener("input", () => {
    state.search = el.search.value.trim().toLowerCase();
    scheduleCatalogRender();
  });

  el.refreshMenu.addEventListener("click", () => loadMenu({ force: true }));
  el.categories.addEventListener("click", event => {
    const button = event.target.closest("[data-category]");
    if (!button) return;
    state.activeCategory = button.dataset.category;
    renderCategories();
    renderProducts();
  });
  el.catalog.addEventListener("click", event => {
    const button = event.target.closest("[data-add-product]");
    if (button) openProductModal(button.dataset.addProduct);
  });
  el.cartItems.addEventListener("click", event => {
    const button = event.target.closest("[data-cart-plus], [data-cart-minus], [data-cart-remove], [data-cart-edit]");
    if (!button) return;
    if (button.dataset.cartPlus != null) return changeCartQty(Number(button.dataset.cartPlus), 1);
    if (button.dataset.cartMinus != null) return changeCartQty(Number(button.dataset.cartMinus), -1);
    if (button.dataset.cartRemove != null) return removeCartItem(Number(button.dataset.cartRemove));
    const index = Number(button.dataset.cartEdit);
    const item = state.cart[index];
    if (!item) return;
    closeCart();
    openProductModal(item.product_id, index);
  });
  el.openCart.addEventListener("click", openCart);
  el.floatingCart.addEventListener("click", openCart);
  el.closeCart.addEventListener("click", closeCart);
  el.checkoutBtn.addEventListener("click", openCheckout);
  el.clearCart.addEventListener("click", clearCart);
  el.modalClose.addEventListener("click", closeProductModal);
  el.productModal.addEventListener("click", event => {
    if (event.target === el.productModal) closeProductModal();
  });

  el.checkoutClose.addEventListener("click", closeCheckout);
  el.checkoutModal.addEventListener("click", event => {
    if (event.target === el.checkoutModal) closeCheckout();
  });
  el.backToCart.addEventListener("click", () => {
    closeCheckout();
    openCart();
  });
  el.nextStep1.addEventListener("click", goToCheckoutStep2);
  el.backStep2.addEventListener("click", () => setCheckoutStep(1));
  el.checkoutForm.addEventListener("input", event => {
    if (event.target.name === "method") updateCheckoutControls();
    persistCheckoutDraft();
  });
  el.checkoutForm.addEventListener("change", event => {
    if (event.target.name !== "method") updateCheckoutControls();
    persistCheckoutDraft();
  });
  el.checkoutForm.addEventListener("submit", submitCheckout);

  el.menuBtn.addEventListener("click", openSideMenu);
  el.closeMenu.addEventListener("click", closeSideMenu);
  el.sideMenu.addEventListener("click", event => {
    if (event.target === el.sideMenu) closeSideMenu();
  });

  el.adminOpen.addEventListener("click", openAdmin);
  el.adminOpenMenu.addEventListener("click", () => {
    closeSideMenu();
    openAdmin();
  });
  el.adminClose.addEventListener("click", closeAdmin);
  el.adminLogout.addEventListener("click", () => logoutAdmin(true));
  el.adminReload.addEventListener("click", () => loadMenu({ force: true }));
  el.adminUnlock.addEventListener("click", unlockAdmin);
  el.adminToken.addEventListener("keydown", event => {
    if (event.key === "Enter") unlockAdmin();
  });

  document.querySelectorAll("[data-admin-tab]").forEach(button => {
    button.addEventListener("click", () => setAdminTab(button.dataset.adminTab));
  });
  el.adminProductCategories.addEventListener("click", event => {
    const button = event.target.closest("[data-admin-product-category]");
    if (!button) return;
    state.adminProductCategory = button.dataset.adminProductCategory;
    state.adminProductSearch = "";
    el.adminProductSearch.value = "";
    renderAdminProductCategories();
    renderAdminProducts();
  });
  el.productList.addEventListener("click", event => {
    const editButton = event.target.closest("[data-edit-product]");
    if (editButton) return fillProductForm(editButton.dataset.editProduct);
    const deleteButton = event.target.closest("[data-delete-product]");
    if (deleteButton) deleteProduct(deleteButton.dataset.deleteProduct);
  });
  el.extraList.addEventListener("click", event => {
    const editButton = event.target.closest("[data-edit-extra]");
    if (editButton) return fillExtraForm(editButton.dataset.editExtra);
    const toggleButton = event.target.closest("[data-toggle-extra]");
    if (toggleButton) toggleExtra(toggleButton.dataset.toggleExtra);
  });

  el.productForm.addEventListener("submit", saveProduct);
  el.productReset.addEventListener("click", resetProductForm);
  el.productCancel.addEventListener("click", resetProductForm);
  el.productHasOptions.addEventListener("change", () => {
    renderProductOptionsEditor(normalizeProductOptions(el.productForm.elements.opciones.value), el.productHasOptions.checked);
    updateEditedFields(el.productForm);
  });
  el.adminProductSearch.addEventListener("input", () => {
    state.adminProductSearch = el.adminProductSearch.value.trim().toLowerCase();
    renderAdminProducts();
  });
  el.extraForm.addEventListener("submit", saveExtra);
  el.extraReset.addEventListener("click", resetExtraForm);
  el.productForm.addEventListener("input", () => updateEditedFields(el.productForm));
  el.extraForm.addEventListener("input", () => updateEditedFields(el.extraForm));
  el.productForm.elements.activo.addEventListener("change", () => updateSwitchLabels());
  el.extraForm.elements.activo.addEventListener("change", () => updateSwitchLabels());

  window.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeProductModal();
      closeCheckout();
      closeSideMenu();
    }
  });
}

async function loadMenu({ force = false, background = false } = {}) {
  if (!background) setSync("Sincronizando");
  const configuredUrl = API_URL.trim();

  if (!configuredUrl) {
    applyMenu(demoMenu);
    setSync("Modo demo");
    return;
  }

  if (!force) {
    const cachedMenu = readMenuCache();
    if (cachedMenu) {
      applyMenu(cachedMenu);
      setSync("Carta guardada · actualizando");
    }
  }

  if (menuRequest) return menuRequest;

  const hasVisibleMenu = state.products.length > 0 || state.extras.length > 0;
  if (!hasVisibleMenu) {
    if (!background) {
      showLoader("Actualizando carta", "Consultando la informacion mas reciente.");
      initialLoaderActive = true;
      initialLoaderTimer = window.setTimeout(finishInitialLoader, 120);
    }
  }

  menuRequest = (async () => {
    try {
      const url = new URL(configuredUrl);
      url.searchParams.set("action", "menu");

      const controller = new AbortController();
      const requestTimeout = window.setTimeout(() => controller.abort(), 8000);
      let response;
      try {
        response = await fetch(url.toString(), { method: "GET", cache: "no-store", signal: controller.signal });
      } finally {
        window.clearTimeout(requestTimeout);
      }
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const payload = await response.json();
      if (payload.ok === false) throw new Error(payload.error || "Respuesta invalida");

      const menu = payload.data || payload.menu || payload;
      writeMenuCache(menu);
      applyMenu(menu);
      setSync("Carta actualizada");
    } catch (error) {
      console.error(error);
      if (!hasVisibleMenu) {
        applyMenu(demoMenu);
        setSync("Modo respaldo");
        toast("No se pudo sincronizar la carta. Se cargo una version de respaldo.");
      } else {
        setSync("Carta guardada · sin cambios");
        toast("No se pudo actualizar la carta. Se conserva la informacion visible.");
      }
    } finally {
      if (!hasVisibleMenu && !background) finishInitialLoader();
      menuRequest = null;
    }
  })();

  return menuRequest;
}

function applyMenu(menu) {
  const normalizedMenu = normalizeMenuPayload(menu);
  state.products = normalizeProducts(normalizedMenu.products);
  state.extras = normalizeExtras(normalizedMenu.extras);
  state.categories = buildCategories(state.products);
  state.activeCategory = state.categories.some(category => category.id === state.activeCategory)
    ? state.activeCategory
    : state.categories[0]?.id || "";
  renderAll();
}

function normalizeMenuPayload(menu) {
  const source = Array.isArray(menu) ? { products: menu } : (menu || {});
  const products = [
    ...(Array.isArray(source.products) ? source.products : []),
    ...(Array.isArray(source.productos) ? source.productos : [])
  ];
  const categories = source.categories || source.categorias || source.category || [];

  if (Array.isArray(categories)) {
    categories.forEach(category => {
      const categoryId = category.id || category.categoria_id || category.category_id || category.slug || category.nombre || category.name;
      const nestedProducts = category.products || category.productos || category.items || [];
      if (!Array.isArray(nestedProducts)) return;
      nestedProducts.forEach(product => {
        products.push({
          ...product,
          categoria_id: product.categoria_id || product.category_id || product.category || categoryId
        });
      });
    });
  }

  return {
    products,
    extras: source.extras || source.addons || source.adiciones || []
  };
}

function readMenuCache(allowStale = false) {
  try {
    const cached = JSON.parse(localStorage.getItem(menuCacheKey()) || "null");
    if (!cached || !cached.data) return null;
    if (!allowStale && Date.now() - Number(cached.savedAt) > MENU_CACHE_TTL_MS) return null;
    return cached.data;
  } catch {
    return null;
  }
}

function writeMenuCache(menu) {
  try {
    localStorage.setItem(menuCacheKey(), JSON.stringify({ savedAt: Date.now(), data: menu }));
  } catch {
    // La carta sigue funcionando aunque el almacenamiento local no este disponible.
  }
}

function invalidateMenuCache() {
  try {
    localStorage.removeItem(menuCacheKey());
  } catch {
    // No bloquear una escritura confirmada por un problema de almacenamiento local.
  }
}

function scheduleCatalogRender() {
  if (catalogRenderFrame) return;
  catalogRenderFrame = window.requestAnimationFrame(() => {
    catalogRenderFrame = 0;
    renderProducts();
  });
}

function renderAll() {
  renderCategories();
  renderProducts();
  renderCart();
  if (state.adminToken) renderAdmin();
}

function renderCategories() {
  const available = getAvailableProducts();
  const counts = available.reduce((acc, product) => {
    acc[product.categoria_id] = (acc[product.categoria_id] || 0) + 1;
    return acc;
  }, {});

  el.categories.innerHTML = state.categories.map(category => {
    const count = counts[category.id] || 0;
    const active = category.id === state.activeCategory ? "active" : "";
    return `<button class="category-btn ${active}" type="button" data-category="${escapeAttr(category.id)}">${escapeHtml(category.label)} (${count})</button>`;
  }).join("");

}

function renderProducts() {
  const products = getAvailableProducts().filter(product => {
    const categoryMatch = product.categoria_id === state.activeCategory;
    const text = `${product.nombre} ${product.descripcion} ${product.categoria_id}`.toLowerCase();
    return categoryMatch && (!state.search || text.includes(state.search));
  });

  if (!products.length) {
    el.catalog.innerHTML = `<div class="empty-state">No hay productos disponibles con ese filtro.</div>`;
    return;
  }

  el.catalog.innerHTML = products.map(product => {
    const image = resolveProductImage(product);
    return `
      <article class="product-card">
        <div>
          ${image ? `<div class="product-visual"><img src="${escapeAttr(image)}" data-fallback-image="${escapeAttr(fallbackProductImage(product))}" alt="${escapeAttr(product.nombre)}" loading="lazy" onerror="handleProductImageError(event)"></div>` : ""}
          <div class="product-meta">
            <span>${escapeHtml(labelFromId(product.categoria_id))}</span>
            <span>${formatMoney(product.precio)}</span>
          </div>
          <h3>${escapeHtml(product.nombre)}</h3>
          <p>${escapeHtml(product.descripcion || "Producto disponible para ordenar.")}</p>
        </div>
        <div class="product-footer">
          <span class="price">${formatMoney(product.precio)}</span>
          <button class="add-btn" type="button" aria-label="Agregar ${escapeAttr(product.nombre)}" data-add-product="${escapeAttr(product.producto_id)}">+</button>
        </div>
      </article>
    `;
  }).join("");

}

function openProductModal(productId, cartIndex = null) {
  const product = state.products.find(item => item.producto_id === productId);
  if (!product) return;

  const cartItem = Number.isInteger(cartIndex) ? state.cart[cartIndex] : null;
  const productOptions = getProductOptions(product);
  const allowExtras = productAllowsExtras(product);
  let selectedOption = productOptions.find(option => option.id === cartItem?.option_id) || productOptions[0] || null;
  const selectedExtras = {};
  if (allowExtras) {
    (cartItem?.extras || []).forEach(extra => {
      selectedExtras[extra.extra_id] = { ...extra };
    });
  }

  const image = resolveProductImage({ ...product, imagen: selectedOption?.image || product.imagen });
  let productQty = clampQuantity(cartItem?.qty || 1);

  el.modalContent.innerHTML = `
    ${image ? `<div class="modal-product-visual"><img src="${escapeAttr(image)}" data-fallback-image="${escapeAttr(fallbackProductImage(product))}" alt="${escapeAttr(product.nombre)}" onerror="handleProductImageError(event)"></div>` : ""}
    <div class="modal-title">
      <span class="eyebrow">${escapeHtml(labelFromId(product.categoria_id))}</span>
      <h2>${escapeHtml(product.nombre)}</h2>
      <p>${escapeHtml(product.descripcion || "")}</p>
      <strong class="price" id="selected-option-price">${formatMoney(getSelectedProductPrice(product, selectedOption))}</strong>
    </div>

    ${productOptions.length > 1 ? `
      <div class="option-list" role="radiogroup" aria-label="Opciones de ${escapeAttr(product.nombre)}">
        ${productOptions.map(option => optionRowTemplate(option, selectedOption)).join("")}
      </div>
    ` : ""}

    ${allowExtras ? `
      <div class="extras-list">
        ${getAvailableExtras().length ? getAvailableExtras().map(extra => extraRowTemplate(extra, selectedExtras[extra.extra_id]?.qty || 0)).join("") : `<div class="empty-state">No hay extras configurados.</div>`}
      </div>
    ` : ""}

    <div class="product-config">
      <label class="quantity-field">Cantidad
        <div class="quantity-stepper">
          <button type="button" id="product-qty-minus" aria-label="Disminuir cantidad">-</button>
          <span id="product-qty">${productQty}</span>
          <button type="button" id="product-qty-plus" aria-label="Aumentar cantidad">+</button>
        </div>
      </label>
      <button class="primary-btn" id="add-configured-product" type="button">${cartItem ? "Actualizar producto" : "Agregar al carrito"} <span id="modal-total"></span></button>
    </div>
  `;

  const qtyLabel = document.getElementById("product-qty");
  const totalLabel = document.getElementById("modal-total");
  const optionPriceLabel = document.getElementById("selected-option-price");

  const updateTotal = () => {
    qtyLabel.textContent = productQty;
    if (optionPriceLabel) optionPriceLabel.textContent = formatMoney(getSelectedProductPrice(product, selectedOption));
    const extrasTotal = Object.values(selectedExtras).reduce((sum, extra) => sum + moneyToBigInt(extra.precio) * qtyToBigInt(extra.qty), 0n);
    totalLabel.textContent = formatMoney(moneyToBigInt(getSelectedProductPrice(product, selectedOption)) * qtyToBigInt(productQty) + extrasTotal);
  };

  el.modalContent.querySelectorAll("[data-product-option]").forEach(input => {
    input.addEventListener("change", () => {
      selectedOption = productOptions.find(option => option.id === input.value) || selectedOption;
      updateTotal();
    });
  });

  if (allowExtras) {
    el.modalContent.querySelectorAll("[data-extra-plus]").forEach(button => {
      button.addEventListener("click", () => {
        const extra = getAvailableExtras().find(item => item.extra_id === button.dataset.extraPlus);
        if (!extra) return;
        selectedExtras[extra.extra_id] = selectedExtras[extra.extra_id] || { ...extra, qty: 0 };
        selectedExtras[extra.extra_id].qty = clampQuantity(selectedExtras[extra.extra_id].qty + 1);
        button.parentElement.querySelector("[data-extra-qty]").textContent = selectedExtras[extra.extra_id].qty;
        updateTotal();
      });
    });

    el.modalContent.querySelectorAll("[data-extra-minus]").forEach(button => {
      button.addEventListener("click", () => {
        const extraId = button.dataset.extraMinus;
        if (!selectedExtras[extraId]) return;
        selectedExtras[extraId].qty = clampQuantity(selectedExtras[extraId].qty - 1, 0);
        if (selectedExtras[extraId].qty <= 0) delete selectedExtras[extraId];
        button.parentElement.querySelector("[data-extra-qty]").textContent = selectedExtras[extraId]?.qty || 0;
        updateTotal();
      });
    });
  }

  document.getElementById("product-qty-minus").addEventListener("click", () => {
    productQty = clampQuantity(productQty - 1);
    updateTotal();
  });
  document.getElementById("product-qty-plus").addEventListener("click", () => {
    productQty = clampQuantity(productQty + 1);
    updateTotal();
  });

  document.getElementById("add-configured-product").addEventListener("click", () => {
    const extras = allowExtras ? Object.values(selectedExtras)
      .filter(extra => extra.qty > 0)
      .map(extra => ({
        extra_id: extra.extra_id,
        nombre: extra.nombre,
        precio: moneyToNumber(extra.precio),
        qty: clampQuantity(extra.qty)
      })) : [];

    const item = {
      cart_id: cartItem?.cart_id || makeId("cart"),
      product_id: product.producto_id,
      title: product.nombre,
      category: product.categoria_id,
      option_id: selectedOption?.id || "",
      option_label: selectedOption?.label || "",
      price: getSelectedProductPrice(product, selectedOption),
      qty: productQty,
      extras
    };

    if (cartItem) {
      state.cart[cartIndex] = item;
    } else {
      addToCart(item);
    }

    persistCart();
    renderCart();
    closeProductModal();
    openCart();
  });

  updateTotal();
  openLayer(el.productModal);
}

function extraRowTemplate(extra, qty) {
  return `
    <div class="extra-row">
      <div>
        <strong>${escapeHtml(extra.nombre)}</strong>
        <small>${formatMoney(extra.precio)}</small>
      </div>
      <div class="extra-controls">
        <button type="button" data-extra-minus="${escapeAttr(extra.extra_id)}">-</button>
        <span data-extra-qty>${qty}</span>
        <button type="button" data-extra-plus="${escapeAttr(extra.extra_id)}">+</button>
      </div>
    </div>
  `;
}

function optionRowTemplate(option, selectedOption) {
  const checked = option.id === selectedOption?.id ? "checked" : "";
  return `
    <label class="option-row">
      <input type="radio" name="product-option" value="${escapeAttr(option.id)}" data-product-option ${checked}>
      <span>
        <strong>${escapeHtml(option.label)}</strong>
        <small>${formatMoney(option.price)}</small>
      </span>
    </label>
  `;
}

function addToCart(item) {
  const sameItem = state.cart.find(cartItem => (
    cartItem.product_id === item.product_id &&
    cartItem.option_id === item.option_id &&
    JSON.stringify(cartItem.extras) === JSON.stringify(item.extras)
  ));

  if (sameItem) {
    sameItem.qty = clampQuantity(sameItem.qty + item.qty);
  } else {
    item.qty = clampQuantity(item.qty);
    state.cart.push(item);
  }
}

function renderCart() {
  const totals = getCartTotals();
  const totalQty = state.cart.reduce((sum, item) => sum + clampQuantity(item.qty), 0);

  el.cartCount.textContent = totalQty;
  el.floatingCount.textContent = totalQty;
  el.floatingCart.classList.toggle("hidden", totalQty === 0);
  el.cartSubtotal.textContent = formatMoney(totals.subtotal);
  el.cartTotal.textContent = formatMoney(totals.subtotal);

  if (!state.cart.length) {
    el.cartItems.innerHTML = `<div class="empty-state">Tu carrito esta vacio.</div>`;
    return;
  }

  el.cartItems.innerHTML = state.cart.map((item, index) => {
    const extras = item.extras || [];
    const optionText = item.option_label ? `Opcion: ${item.option_label}` : "";
    const extrasText = extras.length
      ? extras.map(extra => `${clampQuantity(extra.qty)}x ${extra.nombre} ${formatMoney(extra.precio)}`).join(", ")
      : "Sin extras";
    return `
      <article class="cart-item">
        <div>
          <h3>${escapeHtml(item.title)}</h3>
          ${optionText ? `<small>${escapeHtml(optionText)}</small>` : ""}
          <small>${escapeHtml(extrasText)}</small>
          <small>Total: ${formatMoney(getItemTotal(item))}</small>
        </div>
        <div>
          <div class="qty-controls">
            <button type="button" data-cart-minus="${index}">-</button>
            <span>${clampQuantity(item.qty)}</span>
            <button type="button" data-cart-plus="${index}">+</button>
          </div>
          <div class="cart-line-actions">
            <button class="secondary-btn" type="button" data-cart-edit="${index}">Editar</button>
            <button class="danger-btn" type="button" data-cart-remove="${index}">Quitar</button>
          </div>
        </div>
      </article>
    `;
  }).join("");

}

function changeCartQty(index, delta) {
  const item = state.cart[index];
  if (!item) return;
  item.qty = clampQuantity(item.qty + delta, 0);
  if (item.qty <= 0) state.cart.splice(index, 1);
  persistCart();
  renderCart();
}

function removeCartItem(index) {
  state.cart.splice(index, 1);
  persistCart();
  renderCart();
}

function clearCart() {
  if (!state.cart.length) return;
  const ok = window.confirm("Quieres vaciar el carrito?");
  if (!ok) return;
  state.cart = [];
  persistCart();
  renderCart();
}

function openCheckout() {
  if (!state.cart.length) {
    toast("Agrega al menos un producto antes de confirmar.");
    return;
  }
  closeCart();
  restoreCheckoutDraft();
  setCheckoutStep(1);
  updateCheckoutControls();
  openLayer(el.checkoutModal);
}

function goToCheckoutStep2() {
  const name = el.checkoutForm.elements.name.value.trim();
  const phone = el.checkoutForm.elements.phone.value.trim();

  if (!name || !phone) {
    toast("Completa nombre y telefono para continuar.");
    return;
  }

  el.clientSummary.textContent = `${name} - ${phone}`;
  setCheckoutStep(2);
  updateCheckoutControls();
}

function setCheckoutStep(step) {
  el.step1.classList.toggle("active", step === 1);
  el.step2.classList.toggle("active", step === 2);
}

function updateCheckoutControls() {
  const method = el.checkoutForm.querySelector("input[name='method']:checked")?.value || "recoger";
  const payment = el.paymentMethod.value;
  const delivery = method === "domicilio" ? DELIVERY_FEE : 0;
  const total = getCartTotals().subtotal + moneyToBigInt(delivery);

  el.addressLabel.classList.toggle("hidden", method !== "domicilio");
  el.checkoutForm.elements.address.required = method === "domicilio";
  el.transferInfo.classList.toggle("hidden", payment !== "transferencia");
  el.cartDelivery.textContent = formatMoney(delivery);
  el.cartTotalCheckout.textContent = formatMoney(total);
}

function submitCheckout(event) {
  event.preventDefault();
  const form = el.checkoutForm;
  const name = form.elements.name.value.trim();
  const phone = form.elements.phone.value.trim();
  const method = form.querySelector("input[name='method']:checked")?.value || "recoger";
  const address = form.elements.address.value.trim();
  const payment = form.elements.payment.value;
  const notes = form.elements.notes.value.trim();

  if (!name || !phone || !payment) {
    toast("Revisa los datos obligatorios.");
    return;
  }

  if (method === "domicilio" && !address) {
    toast("Agrega la direccion para domicilio.");
    return;
  }

  const delivery = method === "domicilio" ? DELIVERY_FEE : 0;
  const subtotal = getCartTotals().subtotal;
  const total = subtotal + moneyToBigInt(delivery);
  const lines = [
    `🔥 *Nuevo pedido - ${BUSINESS_NAME}*`,
    `👤 Cliente: ${name}`,
    `📞 Telefono: ${phone}`,
    `🚚 Tipo: ${method}`,
    ...(method === "domicilio" ? [`📍 Direccion: ${address}`] : []),
    `💳 Pago: ${payment}`,
    "",
    "🍔 *Detalle del pedido:*"
  ];

  state.cart.forEach(item => {
    const qty = clampQuantity(item.qty);
    const optionText = item.option_label || "";
    lines.push(`🍽️ ${qty}x ${item.title} (${optionText}) - *${formatMoney(moneyToBigInt(item.price) * qtyToBigInt(qty))}*`);
    if ((item.extras || []).length) {
      item.extras.forEach(extra => {
        const extraQty = clampQuantity(extra.qty);
        lines.push(`   ➕ ${extraQty}x ${extra.nombre} (${formatMoney(moneyToBigInt(extra.precio) * qtyToBigInt(extraQty))})`);
      });
    }
  });

  const deliveryText = method === "recoger"
    ? "Sin costo (recoge en el local)"
    : formatMoney(delivery);

  lines.push("");
  lines.push(`🧮 Subtotal: ${formatMoney(subtotal)}`);
  lines.push(`🏪 Envio: ${deliveryText}`);
  lines.push(`💰 *Total: ${formatMoney(total)}*`);
  lines.push(`📝 Notas: ${notes || "Sin notas"}`);

  const whatsappUrl = `https://wa.me/${BUSINESS_PHONE}?text=${encodeURIComponent(lines.join("\n"))}`;
  window.open(whatsappUrl, "_blank", "noopener,noreferrer");

  state.cart = [];
  persistCart();
  clearCheckoutDraft();
  el.checkoutForm.reset();
  renderCart();
  closeCheckout();
}

function openAdmin() {
  updateAdminSessionUi();
  openLayer(el.adminPanel);
}

function closeAdmin() {
  logoutAdmin(false);
  closeLayer(el.adminPanel);
}

function unlockAdmin(showToast = true) {
  const token = el.adminToken.value.trim();
  if (!token) {
    toast("Ingresa la contrasena de administrador.");
    return;
  }
  state.adminToken = token;
  el.adminLogin.classList.add("hidden");
  el.adminWorkspace.classList.remove("hidden");
  el.adminLogout.classList.remove("hidden");
  renderAdmin();
  if (showToast) toast("Panel listo para editar.");
}

function logoutAdmin(showToast = true) {
  state.adminToken = "";
  el.adminToken.value = "";
  resetProductForm();
  resetExtraForm();
  updateAdminSessionUi();
  if (showToast) toast("Sesion administrativa cerrada.");
}

function updateAdminSessionUi() {
  const loggedIn = Boolean(state.adminToken);
  el.adminLogin.classList.toggle("hidden", loggedIn);
  el.adminWorkspace.classList.toggle("hidden", !loggedIn);
  el.adminLogout.classList.toggle("hidden", !loggedIn);
  if (!loggedIn) el.adminToken.value = "";
}

function setAdminTab(tab) {
  document.querySelectorAll("[data-admin-tab]").forEach(button => {
    button.classList.toggle("active", button.dataset.adminTab === tab);
  });
  document.getElementById("admin-products").classList.toggle("active", tab === "products");
  document.getElementById("admin-extras").classList.toggle("active", tab === "extras");
}

function renderAdmin() {
  renderAdminProductCategories();
  renderAdminProducts();
  renderAdminExtras();
}

function renderAdminProductCategories() {
  if (!el.adminProductCategories) return;
  const categories = buildCategories(state.products);
  const selectedExists = state.adminProductCategory === "todas" || categories.some(category => category.id === state.adminProductCategory);
  if (!selectedExists) state.adminProductCategory = "todas";

  const buttons = [
    { id: "todas", label: "Todas", count: state.products.length },
    ...categories.map(category => ({
      ...category,
      count: state.products.filter(product => product.categoria_id === category.id).length
    }))
  ];

  el.adminProductCategories.innerHTML = buttons.map(category => {
    const active = category.id === state.adminProductCategory ? "active" : "";
    return `<button class="admin-filter-btn ${active}" type="button" data-admin-product-category="${escapeAttr(category.id)}">${escapeHtml(category.label)} <span>${category.count}</span></button>`;
  }).join("");

}

function renderAdminProducts() {
  if (!el.productList) return;
  const products = [...state.products]
    .filter(product => state.adminProductCategory === "todas" || product.categoria_id === state.adminProductCategory)
    .filter(product => {
      const text = `${product.nombre} ${product.descripcion} ${product.categoria_id}`.toLowerCase();
      return !state.adminProductSearch || text.includes(state.adminProductSearch);
    })
    .sort(sortAdminProducts);
  el.productList.innerHTML = products.map(product => `
    <article class="admin-row ${product.activo ? "" : "inactive"}">
      <div>
        <h3>${escapeHtml(product.nombre)} - ${formatMoney(product.precio)}</h3>
        <p>${escapeHtml(labelFromId(product.categoria_id))} | ${product.activo ? "activo" : "producto agotado"}${product.opciones.length ? ` | opciones: ${escapeHtml(product.opciones.map(option => `${option.label} ${formatMoney(option.price)}`).join(", "))}` : ""}</p>
      </div>
      <div class="admin-row-actions">
        <button class="secondary-btn" type="button" data-edit-product="${escapeAttr(product.producto_id)}">Editar</button>
        <button class="danger-btn" type="button" data-delete-product="${escapeAttr(product.producto_id)}">Eliminar</button>
      </div>
    </article>
  `).join("") || `<div class="empty-state">No hay productos cargados en esta categoria.</div>`;

}

function renderAdminExtras() {
  if (!el.extraList) return;
  const extras = [...state.extras].sort(sortByOrderThenName);
  el.extraList.innerHTML = extras.map(extra => `
    <article class="admin-row ${extra.activo ? "" : "inactive"}">
      <div>
        <h3>${escapeHtml(extra.nombre)} - ${formatMoney(extra.precio)}</h3>
        <p>orden ${extra.orden || 0} | ${extra.activo ? "activo" : "inactivo"}</p>
      </div>
      <div class="admin-row-actions">
        <button class="secondary-btn" type="button" data-edit-extra="${escapeAttr(extra.extra_id)}">Editar</button>
        <button class="danger-btn" type="button" data-toggle-extra="${escapeAttr(extra.extra_id)}">${extra.activo ? "Eliminar" : "Restaurar"}</button>
      </div>
    </article>
  `).join("") || `<div class="empty-state">No hay extras cargados.</div>`;

}

function fillProductForm(productId) {
  const product = state.products.find(item => item.producto_id === productId);
  if (!product) return;
  state.editingProductId = product.producto_id;
  setFormValues(el.productForm, product);
  renderProductOptionsEditor(product.opciones, product.opciones.length > 0);
  el.productForm.elements.activo.checked = product.activo;
  updateSwitchLabels();
  updateProductFormMode();
  markFormEditing(el.productForm, true);
  el.productForm.scrollIntoView({ behavior: "smooth", block: "center" });
}

function fillExtraForm(extraId) {
  const extra = state.extras.find(item => item.extra_id === extraId);
  if (!extra) return;
  state.editingExtraId = extra.extra_id;
  setFormValues(el.extraForm, extra);
  el.extraForm.elements.activo.checked = extra.activo;
  updateSwitchLabels();
  markFormEditing(el.extraForm, true);
  el.extraForm.scrollIntoView({ behavior: "smooth", block: "center" });
}

function resetProductForm() {
  state.editingProductId = "";
  el.productForm.reset();
  el.productForm.elements.activo.checked = true;
  el.productForm.elements.producto_id.value = "";
  el.productForm.elements.orden.value = "0";
  renderProductOptionsEditor([], false);
  updateSwitchLabels();
  updateProductFormMode();
  markFormEditing(el.productForm, false);
}

function updateProductFormMode() {
  const editing = Boolean(state.editingProductId);
  el.productSubmitLabel.textContent = editing ? "Actualizar producto" : "Guardar producto";
  el.productCancel.classList.toggle("hidden", !editing);
}

function resetExtraForm() {
  state.editingExtraId = "";
  el.extraForm.reset();
  el.extraForm.elements.activo.checked = true;
  el.extraForm.elements.extra_id.value = "";
  el.extraForm.elements.orden.value = "0";
  updateSwitchLabels();
  markFormEditing(el.extraForm, false);
}

function updateSwitchLabels() {
  const productSwitchLabel = el.productForm.elements.activo?.nextElementSibling;
  if (productSwitchLabel) {
    productSwitchLabel.textContent = el.productForm.elements.activo.checked ? "Activo" : "Producto Agotado";
  }

  const extraSwitchLabel = el.extraForm.elements.activo?.nextElementSibling;
  if (extraSwitchLabel) {
    extraSwitchLabel.textContent = el.extraForm.elements.activo.checked ? "Activo" : "Agotado";
  }
}

function renderProductOptionsEditor(options = [], forceVisible = false) {
  const normalizedOptions = normalizeProductOptions(options);
  const priceLabel = el.productForm.elements.precio?.closest("label");
  const editorOptions = normalizedOptions.length ? normalizedOptions : getDefaultProductOptions();
  const isVisible = Boolean(forceVisible);
  el.productHasOptions.checked = isVisible;

  if (!isVisible) {
    el.productForm.elements.opciones.value = "";
    el.productForm.elements.precio.required = true;
    priceLabel?.classList.remove("hidden");
    el.productOptionsEditor.classList.add("hidden");
    el.productOptionsEditor.innerHTML = "";
    return;
  }

  el.productForm.elements.precio.required = false;
  priceLabel?.classList.add("hidden");
  el.productOptionsEditor.classList.remove("hidden");
  el.productOptionsEditor.innerHTML = `
    <div class="admin-options-title">Opciones del producto</div>
    ${editorOptions.map((option, index) => `
      <div class="admin-option-row" data-option-row data-option-id="${escapeAttr(option.id)}">
        <label>Opcion
          <input type="text" autocomplete="off" value="${escapeAttr(option.label)}" data-option-label>
        </label>
        <label>Precio
          <input type="text" inputmode="numeric" autocomplete="off" value="${option.price > 0 ? escapeAttr(formatMoney(option.price)) : ""}" placeholder="$0" data-option-price>
        </label>
        <button class="danger-btn option-remove-btn ${index < 2 ? "hidden" : ""}" type="button" data-remove-option>Quitar</button>
      </div>
    `).join("")}
    <button class="secondary-btn option-add-btn" type="button" data-add-option>Agregar opcion</button>
  `;

  el.productOptionsEditor.querySelectorAll("[data-option-price]").forEach(input => {
    input.addEventListener("input", () => {
      formatAdminMoneyInput(input);
      syncProductOptionsFromEditor();
      updateEditedFields(el.productForm);
    });
    input.addEventListener("blur", () => {
      formatAdminMoneyInput(input);
      syncProductOptionsFromEditor();
    });
  });

  el.productOptionsEditor.querySelectorAll("[data-option-label]").forEach(input => {
    input.addEventListener("input", () => {
      syncProductOptionsFromEditor();
      updateEditedFields(el.productForm);
    });
  });

  el.productOptionsEditor.querySelectorAll("[data-remove-option]").forEach(button => {
    button.addEventListener("click", () => {
      button.closest("[data-option-row]")?.remove();
      syncProductOptionsFromEditor();
      updateEditedFields(el.productForm);
    });
  });

  el.productOptionsEditor.querySelector("[data-add-option]")?.addEventListener("click", () => {
    addProductOptionRow();
    syncProductOptionsFromEditor();
    updateEditedFields(el.productForm);
  });

  syncProductOptionsFromEditor();
}

function syncProductOptionsFromEditor() {
  if (!el.productOptionsEditor || el.productOptionsEditor.classList.contains("hidden") || !el.productHasOptions.checked) {
    el.productForm.elements.opciones.value = "";
    return;
  }

  const updatedOptions = [...el.productOptionsEditor.querySelectorAll("[data-option-row]")].map((row, index) => {
    const label = row.querySelector("[data-option-label]")?.value.trim() || "";
    const price = moneyToNumber(row.querySelector("[data-option-price]")?.value || "");
    return {
      id: row.dataset.optionId || makeOptionId(label, index),
      label,
      price
    };
  }).filter(option => option.label && option.price > 0);

  el.productForm.elements.opciones.value = updatedOptions.length ? JSON.stringify(updatedOptions) : "";
  if (updatedOptions[0]) {
    el.productForm.elements.precio.value = formatMoney(updatedOptions[0].price);
  }
}

function getDefaultProductOptions() {
  const basePrice = moneyToNumber(el.productForm.elements.precio?.value || "");
  return [
    { id: "opt-personal", label: "Personal", price: basePrice },
    { id: "opt-familiar", label: "Familiar", price: 0 }
  ];
}

function addProductOptionRow() {
  const button = el.productOptionsEditor.querySelector("[data-add-option]");
  if (!button) return;

  const index = el.productOptionsEditor.querySelectorAll("[data-option-row]").length;
  const wrapper = document.createElement("div");
  wrapper.className = "admin-option-row";
  wrapper.dataset.optionRow = "";
  wrapper.dataset.optionId = `opt-${Date.now()}-${index}`;
  wrapper.innerHTML = `
    <label>Opcion
      <input type="text" autocomplete="off" value="Opcion ${index + 1}" data-option-label>
    </label>
    <label>Precio
      <input type="text" inputmode="numeric" autocomplete="off" placeholder="$0" data-option-price>
    </label>
    <button class="danger-btn option-remove-btn" type="button" data-remove-option>Quitar</button>
  `;

  button.before(wrapper);
  wrapper.querySelector("[data-option-label]")?.addEventListener("input", () => {
    syncProductOptionsFromEditor();
    updateEditedFields(el.productForm);
  });
  wrapper.querySelector("[data-option-price]")?.addEventListener("input", event => {
    formatAdminMoneyInput(event.currentTarget);
    syncProductOptionsFromEditor();
    updateEditedFields(el.productForm);
  });
  wrapper.querySelector("[data-option-price]")?.addEventListener("blur", event => {
    formatAdminMoneyInput(event.currentTarget);
    syncProductOptionsFromEditor();
  });
  wrapper.querySelector("[data-remove-option]")?.addEventListener("click", () => {
    wrapper.remove();
    syncProductOptionsFromEditor();
    updateEditedFields(el.productForm);
  });
}

function makeOptionId(label, index) {
  return `opt-${slugify(label || `opcion-${index + 1}`)}`;
}

async function saveProduct(event) {
  event.preventDefault();
  syncProductOptionsFromEditor();
  const data = getFormObject(el.productForm);
  const productOptions = normalizeProductOptions(data.opciones);
  if (el.productHasOptions.checked && productOptions.length < 2) {
    toast("Completa al menos dos opciones con nombre y precio.");
    return;
  }
  const product = normalizeProduct({
    ...data,
    producto_id: data.producto_id || state.editingProductId || makeId("prod"),
    activo: el.productForm.elements.activo.checked
  });

  const saved = await postAdmin("upsertProduct", { product }, "Guardando producto", "Sincronizando los cambios con tu carta.");
  if (!saved) return;
  resetProductForm();
  resetCatalogSearch(false);
  await loadMenu();
}

async function saveExtra(event) {
  event.preventDefault();
  const data = getFormObject(el.extraForm);
  const extra = normalizeExtra({
    ...data,
    extra_id: data.extra_id || state.editingExtraId || makeId("extra"),
    activo: el.extraForm.elements.activo.checked
  });

  const saved = await postAdmin("upsertExtra", { extra }, "Guardando extra", "Actualizando las opciones disponibles.");
  if (!saved) return;
  resetExtraForm();
  resetCatalogSearch(false);
  await loadMenu();
}

async function deleteProduct(productId) {
  const product = state.products.find(item => item.producto_id === productId);
  if (!product) return;
  const confirmed = window.confirm(`Eliminar definitivamente "${product.nombre}"?`);
  if (!confirmed) return;

  const saved = await postAdmin("deleteProduct", { producto_id: productId, hardDelete: true }, "Eliminando producto", "Quitando el producto de la hoja y de la carta.");
  if (!saved) return;
  if (state.editingProductId === productId) resetProductForm();
  resetCatalogSearch(false);
  await loadMenu();
}

async function toggleExtra(extraId) {
  const extra = state.extras.find(item => item.extra_id === extraId);
  if (!extra) return;
  const saved = await postAdmin("upsertExtra", { extra: { ...extra, activo: !extra.activo } }, "Actualizando extra", "Aplicando el nuevo estado en la carta.");
  if (!saved) return;
  await loadMenu();
}

async function postAdmin(action, data, loaderTitle = "Sincronizando cambios", loaderText = "Estamos actualizando la informacion.") {
  if (!API_URL.trim()) {
    toast("Configura API_URL antes de guardar cambios reales.");
    return false;
  }
  if (!state.adminToken) {
    updateAdminSessionUi();
    toast("Inicia sesion en el panel administrativo.");
    return false;
  }

  showLoader(loaderTitle, loaderText);
  try {
    const response = await fetch(API_URL.trim(), {
      method: "POST",
      body: JSON.stringify({
        action,
        token: state.adminToken,
        password: state.adminToken,
        ...data
      })
    });

    const payload = await response.json();
    if (!response.ok || !payload.ok) throw new Error(payload.error || `HTTP ${response.status}`);
    invalidateMenuCache();
    toast("La carta quedo actualizada correctamente.");
    return true;
  } catch (error) {
    console.error(error);
    toast(`No se pudo guardar: ${error.message}`);
    return false;
  } finally {
    hideLoader();
  }
}

function normalizeProducts(products) {
  const seen = new Set();
  return products
    .map(normalizeProduct)
    .filter(product => product.producto_id && product.nombre)
    .filter(product => {
      if (seen.has(product.producto_id)) return false;
      seen.add(product.producto_id);
      return true;
    })
    .sort(sortByOrderThenName);
}

function normalizeProduct(product) {
  return {
    producto_id: String(product.producto_id || product.product_id || product.id || makeId("prod")).trim(),
    categoria_id: normalizeCategoryId(product.categoria_id || product.category_id || product.category || "general"),
    nombre: String(product.nombre || product.name || product.title || "").trim(),
    precio: moneyToNumber(product.precio ?? product.price ?? product.valor),
    descripcion: String(product.descripcion || product.description || product.desc || "").trim(),
    imagen: String(product.imagen || product.image || "").trim(),
    opciones: normalizeProductOptions(product.opciones ?? product.options ?? product.sizes),
    orden: moneyToNumber(product.orden ?? product.order ?? product.position),
    activo: product.activo === undefined && product.active === undefined && product.available === undefined
      ? true
      : toBool(product.activo ?? product.active ?? product.available)
  };
}

function normalizeProductOptions(value) {
  let raw = value;
  if (typeof raw === "string") {
    const text = raw.trim();
    if (!text) return [];
    try {
      raw = JSON.parse(text);
    } catch {
      return [];
    }
  }

  if (!Array.isArray(raw)) return [];

  return raw
    .map((option, index) => ({
      id: String(option.id || option.option_id || makeId("opcion")).trim(),
      label: String(option.label || option.nombre || option.name || `Opcion ${index + 1}`).trim(),
      price: moneyToNumber(option.price ?? option.precio),
      image: String(option.image || option.imagen || "").trim()
    }))
    .filter(option => option.id && option.label && option.price > 0);
}

function getProductOptions(product) {
  return Array.isArray(product.opciones) ? product.opciones : [];
}

function getSelectedProductPrice(product, selectedOption) {
  return selectedOption?.price || product.precio;
}

function normalizeExtras(extras) {
  return extras
    .map(normalizeExtra)
    .filter(extra => extra.extra_id && extra.nombre)
    .sort(sortByOrderThenName);
}

function normalizeExtra(extra) {
  return {
    extra_id: String(extra.extra_id || extra.id || makeId("extra")).trim(),
    nombre: String(extra.nombre || extra.name || "").trim(),
    precio: moneyToNumber(extra.precio ?? extra.price),
    orden: moneyToNumber(extra.orden),
    activo: toBool(extra.activo)
  };
}

function buildCategories(products) {
  const ids = [...new Set(products.filter(product => product.activo).map(product => product.categoria_id).filter(Boolean))];
  return ids
    .sort((a, b) => categoryOrderIndex(a) - categoryOrderIndex(b) || labelFromId(a).localeCompare(labelFromId(b), "es"))
    .map(id => ({ id, label: labelFromId(id) }));
}

function getAvailableProducts() {
  return state.products.filter(product => product.activo);
}

function getAvailableExtras() {
  return state.extras.filter(extra => extra.activo);
}

function productAllowsExtras(product) {
  return !CATEGORIES_WITHOUT_EXTRAS.has(normalizeCategoryId(product.categoria_id));
}

function resolveProductImage(product) {
  const explicit = String(product.imagen || "").trim();
  if (/^https?:\/\//i.test(explicit)) return explicit;
  if (explicit) {
    const filename = explicit.split(/[?#]/)[0].split("/").pop();
    if (LOCAL_PRODUCT_IMAGES.has(filename)) {
      if (explicit.startsWith("./") || explicit.startsWith("images/")) return explicit.startsWith("images/") ? `./${explicit}` : explicit;
      return `./images/${filename}`;
    }
  }

  return fallbackProductImage(product);
}

function fallbackProductImage(product) {
  const family = detectProductImageFamily(product);
  const images = PRODUCT_IMAGE_LIBRARY[family] || PRODUCT_IMAGE_LIBRARY.default;
  const source = `${product.producto_id || ""}:${product.nombre || ""}`;
  const index = [...source].reduce((total, character) => total + character.charCodeAt(0), 0) % images.length;
  return `./images/${images[index]}`;
}

function handleProductImageError(event) {
  const image = event.currentTarget;
  const fallback = image?.dataset?.fallbackImage;
  if (!image || !fallback || image.dataset.imageFallbackApplied === "true") return;
  image.dataset.imageFallbackApplied = "true";
  image.onerror = null;
  image.src = fallback;
}

function detectProductImageFamily(product) {
  const category = normalizeCategoryId(product.categoria_id);
  return category || detectCategoryFamily(category, product.nombre);
}

function normalizeImageKey(value) {
  return String(value || "")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function compactImageKey(value) {
  return normalizeImageKey(value).replace(/\s+/g, "");
}

function getImageTokens(value) {
  return normalizeImageKey(value)
    .split(" ")
    .filter(token => token.length > 2 && !["con", "del", "las", "los", "para"].includes(token));
}

function detectCategoryFamily(categoryId, productName = "") {
  const normalizedCategoryId = normalizeCategoryId(categoryId);
  if (PRODUCT_IMAGE_LIBRARY[normalizedCategoryId]) return normalizedCategoryId;

  const categoryKey = normalizeImageKey(categoryId);
  const categoryCompact = compactImageKey(categoryId);
  const nameKey = normalizeImageKey(productName);
  const nameCompact = compactImageKey(productName);

  const categoryFamily = CATEGORY_DETECTION_ORDER.find(family => {
    const group = IMAGE_CATEGORY_GROUPS[family];
    return group.aliases.some(alias => {
      const aliasKey = normalizeImageKey(alias);
      const aliasCompact = compactImageKey(alias);
      return categoryKey.split(" ").includes(aliasKey) ||
        categoryCompact.includes(aliasCompact);
    });
  });

  if (categoryFamily) return categoryFamily;

  return CATEGORY_DETECTION_ORDER.find(family => {
    const group = IMAGE_CATEGORY_GROUPS[family];
    return group.aliases.some(alias => {
      const aliasKey = normalizeImageKey(alias);
      const aliasCompact = compactImageKey(alias);
      return nameKey.split(" ").includes(aliasKey) ||
        nameCompact.includes(aliasCompact);
    });
  }) || "";
}

function detectImageFamilies(imageKey, imageCompact) {
  return new Set(CATEGORY_DETECTION_ORDER.filter(family => {
    const group = IMAGE_CATEGORY_GROUPS[family];
    return group.aliases.some(alias => imageMatchesTerm(imageKey, imageCompact, alias));
  }));
}

function imageMatchesTerm(imageKey, imageCompact, term) {
  const termKey = normalizeImageKey(term);
  const termCompact = compactImageKey(term);
  return imageKey.split(" ").includes(termKey) || imageCompact.includes(termCompact);
}

function hasCategoryConflict(productFamily, imageFamilies) {
  if (!imageFamilies.size || imageFamilies.has(productFamily)) return false;
  return [...imageFamilies].some(family => family !== productFamily);
}

function readCart() {
  try {
    const value = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function persistCart() {
  localStorage.setItem(CART_KEY, JSON.stringify(state.cart));
}

function getCartTotals() {
  return {
    subtotal: state.cart.reduce((sum, item) => sum + getItemTotal(item), 0n)
  };
}

function getItemTotal(item) {
  const extrasTotal = (item.extras || []).reduce((sum, extra) => {
    return sum + moneyToBigInt(extra.precio) * qtyToBigInt(extra.qty);
  }, 0n);
  return moneyToBigInt(item.price) * qtyToBigInt(item.qty) + extrasTotal;
}

function openCart() {
  openLayer(el.cartDrawer);
}

function closeCart() {
  closeLayer(el.cartDrawer);
}

function closeProductModal() {
  closeLayer(el.productModal);
}

function closeCheckout() {
  closeLayer(el.checkoutModal);
}

function persistCheckoutDraft() {
  if (!el.checkoutForm) return;
  const form = el.checkoutForm;
  const draft = {
    name: form.elements.name.value,
    phone: form.elements.phone.value,
    method: form.querySelector("input[name='method']:checked")?.value || "recoger",
    address: form.elements.address.value,
    payment: form.elements.payment.value,
    notes: form.elements.notes.value
  };

  try {
    localStorage.setItem(CHECKOUT_DRAFT_KEY, JSON.stringify(draft));
  } catch {
    // El checkout sigue funcionando aunque el almacenamiento local no este disponible.
  }
}

function restoreCheckoutDraft() {
  let draft = null;
  try {
    draft = JSON.parse(localStorage.getItem(CHECKOUT_DRAFT_KEY) || "null");
  } catch {
    draft = null;
  }

  if (!draft) return;

  const form = el.checkoutForm;
  form.elements.name.value = draft.name || "";
  form.elements.phone.value = draft.phone || "";
  form.elements.address.value = draft.address || "";
  form.elements.payment.value = draft.payment || "";
  form.elements.notes.value = draft.notes || "";
  form.querySelectorAll("input[name='method']").forEach(input => {
    input.checked = input.value === (draft.method || "recoger");
  });
}

function clearCheckoutDraft() {
  try {
    localStorage.removeItem(CHECKOUT_DRAFT_KEY);
  } catch {
    // No bloquear el cierre del pedido por un problema de almacenamiento local.
  }
}

function openSideMenu() {
  el.sideMenu.classList.remove("hidden");
  el.sideMenu.setAttribute("aria-hidden", "false");
  window.requestAnimationFrame(() => el.sideMenu.classList.add("is-open"));
}

function closeSideMenu() {
  el.sideMenu.classList.remove("is-open");
  el.sideMenu.setAttribute("aria-hidden", "true");
  window.setTimeout(() => {
    if (!el.sideMenu.classList.contains("is-open")) {
      el.sideMenu.classList.add("hidden");
    }
  }, 260);
}

function openLayer(node) {
  node.classList.remove("hidden");
  node.setAttribute("aria-hidden", "false");
}

function closeLayer(node) {
  node.classList.add("hidden");
  node.setAttribute("aria-hidden", "true");
}

function setSync(text) {
  el.syncStatus.textContent = text;
}

function showLoader(title = "Sincronizando carta", text = "Estamos preparando la informacion.") {
  showLoader.count = (showLoader.count || 0) + 1;
  el.loaderTitle.textContent = title;
  el.loaderText.textContent = text;
  el.loader.classList.remove("hidden");
  el.loader.setAttribute("aria-hidden", "false");
}

function hideLoader() {
  showLoader.count = Math.max(0, (showLoader.count || 0) - 1);
  if (showLoader.count > 0) return;
  el.loader.classList.add("hidden");
  el.loader.setAttribute("aria-hidden", "true");
}

function finishInitialLoader() {
  if (initialLoaderTimer) {
    window.clearTimeout(initialLoaderTimer);
    initialLoaderTimer = 0;
  }
  if (!initialLoaderActive) return;
  initialLoaderActive = false;
  hideLoader();
}

function toast(message) {
  el.toast.textContent = message;
  el.toast.classList.add("show");
  window.clearTimeout(toast.timer);
  toast.timer = window.setTimeout(() => el.toast.classList.remove("show"), 3600);
}

function setFormValues(form, values) {
  Object.entries(values).forEach(([key, value]) => {
    if (form.elements[key] && form.elements[key].type !== "checkbox") {
      form.elements[key].value = key === "opciones" && Array.isArray(value)
        ? JSON.stringify(value)
        : key === "precio" && value != null && String(value).trim() !== ""
        ? formatMoney(value)
        : value ?? "";
    }
  });
  updateEditedFields(form);
}

function getFormObject(form) {
  return Object.fromEntries(new FormData(form).entries());
}

function resetCatalogSearch(shouldRender = true) {
  state.search = "";
  if (el.search) el.search.value = "";
  if (shouldRender) renderProducts();
}

function disableSearchAutofill() {
  if (!el.search) return;
  el.search.setAttribute("autocomplete", "new-password");
  el.search.setAttribute("name", `adb_filter_${Date.now()}`);
  window.setTimeout(() => {
    el.search.removeAttribute("readonly");
    resetCatalogSearch(false);
  }, 250);
  el.search.addEventListener("focus", () => {
    el.search.removeAttribute("readonly");
    if (/@/.test(el.search.value)) resetCatalogSearch(true);
  });
}

function bindAdminMoneyInputs() {
  [el.productForm, el.extraForm].forEach(form => {
    const input = form?.elements?.precio;
    if (!input) return;
    input.addEventListener("input", () => formatAdminMoneyInput(input));
    input.addEventListener("blur", () => formatAdminMoneyInput(input));
  });
}

function formatAdminMoneyInput(input) {
  const amount = moneyToNumber(input.value);
  input.value = amount > 0 ? formatMoney(amount) : "";
}

function markFormEditing(form, isEditing) {
  form.classList.toggle("editing", isEditing);
  if (!isEditing) {
    form.querySelectorAll(".field-editing").forEach(label => label.classList.remove("field-editing"));
    return;
  }
  updateEditedFields(form);
}

function updateEditedFields(form) {
  const isEditing = form.classList.contains("editing");
  form.querySelectorAll("label").forEach(label => {
    const field = label.querySelector("input:not([type='hidden']):not([type='checkbox']), textarea, select");
    label.classList.toggle("field-editing", Boolean(isEditing && field && String(field.value || "").trim()));
  });
}

function sortByOrderThenName(a, b) {
  return moneyToNumber(a.orden) - moneyToNumber(b.orden) || String(a.nombre).localeCompare(String(b.nombre), "es");
}

function sortAdminProducts(a, b) {
  return categoryOrderIndex(a.categoria_id) - categoryOrderIndex(b.categoria_id) || sortByOrderThenName(a, b);
}

function formatMoney(value) {
  const amount = typeof value === "bigint" ? value : moneyToBigInt(value);
  return `$${amount.toLocaleString("es-CO")}`;
}

function moneyToNumber(value) {
  if (typeof value === "number" && Number.isFinite(value)) return Math.max(0, Math.round(value));
  const cleaned = String(value ?? "0").replace(/[^\d-]/g, "");
  const parsed = Number(cleaned);
  return Number.isFinite(parsed) ? Math.max(0, Math.round(parsed)) : 0;
}

function moneyToBigInt(value) {
  if (typeof value === "bigint") return value < 0n ? 0n : value;
  const cleaned = String(value ?? "0").replace(/[^\d-]/g, "");
  if (!cleaned || cleaned === "-") return 0n;
  try {
    const parsed = BigInt(cleaned);
    return parsed < 0n ? 0n : parsed;
  } catch {
    return BigInt(moneyToNumber(value));
  }
}

function qtyToBigInt(value) {
  return BigInt(clampQuantity(value));
}

function clampQuantity(value, min = 1, max = MAX_QTY) {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed)) return min;
  return Math.min(max, Math.max(min, parsed));
}

function toBool(value) {
  if (typeof value === "boolean") return value;
  const normalized = String(value ?? "true").trim().toLowerCase();
  return !["false", "0", "no", "inactivo", "inactive"].includes(normalized);
}

function makeId(prefix) {
  const random = globalThis.crypto?.randomUUID ? globalThis.crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  return `${prefix}-${random}`.toLowerCase();
}

function slugify(value) {
  return String(value || "general")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "general";
}

function normalizeCategoryId(value) {
  const id = slugify(value);
  if (["muelle", "del-muelle", "cafe", "cafes", "cafe-caliente"].includes(id)) return "del-muelle";
  if (["puerto", "del-puerto", "cerveza", "cervezas"].includes(id)) return "del-puerto";
  if (["rio", "del-rio", "bebidas-frias", "cafe-frio"].includes(id)) return "del-rio";
  if (["sabana", "de-sabana", "comidas", "para-comer"].includes(id)) return "de-sabana";
  if (["cienaga", "de-cienaga", "refrescantes", "bebidas"].includes(id)) return "de-cienaga";
  return id;
}

function categoryOrderIndex(id) {
  const index = CATEGORY_ORDER.indexOf(id);
  return index === -1 ? CATEGORY_ORDER.length : index;
}

function labelFromId(value) {
  const id = normalizeCategoryId(value);
  if (CATEGORY_LABELS[id]) return CATEGORY_LABELS[id];
  return String(id || "general")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, char => char.toUpperCase());
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[char]));
}

function escapeAttr(value) {
  return escapeHtml(value).replace(/`/g, "&#96;");
}

function cssEscape(value) {
  if (globalThis.CSS?.escape) return CSS.escape(String(value));
  return String(value).replace(/["\\]/g, "\\$&");
}
