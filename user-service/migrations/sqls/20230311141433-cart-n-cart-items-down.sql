ALTER TABLE IF EXISTS "cart_items" DROP CONSTRAINT IF EXISTS "cart_items_cart_id_fkey";
DROP TABLE cart_items;

ALTER TABLE IF EXISTS "shopping_carts" DROP CONSTRAINT IF EXISTS "shopping_carts_user_id_fkey";
DROP TABLE shopping_carts;