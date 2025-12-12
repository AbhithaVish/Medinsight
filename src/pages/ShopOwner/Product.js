// frontend/src/models/Product.js
// Plain DTO and helper to map DB rows -> model
export default class Product {
  constructor({
    id = null,
    item_id = null,
    name = "",
    sku = "",
    price = 0.0,
    qty = 0,
    store_id = null,
    type = "",        // e.g., "book" or "stationery" or "pharmacy"
    image_url = null,
    description = ""
  } = {}) {
    this.id = id;
    this.item_id = item_id;
    this.name = name;
    this.sku = sku;
    this.price = parseFloat(price) || 0;
    this.qty = parseInt(qty, 10) || 0;
    this.store_id = store_id;
    this.type = type;
    this.image_url = image_url;
    this.description = description;
  }

  // create Product from DB row (items, store_items relation, etc.)
  static fromRow(row = {}) {
    return new Product({
      id: row.id ?? row.store_item_id ?? null,
      item_id: row.item_id ?? row.id ?? null,
      name: row.name ?? row.item_name ?? "",
      sku: row.sku ?? row.item_sku ?? "",
      price: row.price ?? row.item_price ?? 0,
      qty: row.qty ?? row.stock ?? 0,
      store_id: row.store_id ?? row.owner_store_id ?? null,
      type: row.type ?? row.item_type ?? "",
      image_url: row.image_url ?? row.picture ?? null,
      description: row.description ?? row.item_description ?? ""
    });
  }
}
