import { json } from "@remix-run/node";
import db from "../db.server";

export async function loader() {
  return json({
    ok: true,
    message: "Hello from the API",
  });
}

// Expexted data comes from post request. If
// customerID, productID, shop
export async function action({ request }) {

  const method = request.method;
  let data = await request.formData();
  data = Object.fromEntries(data);
  const customerId = data.customerId;
  const productId = data.productId;
  const shop = data.shop;

  if(!customerId || !productId || !shop) {
    return json({ message: "Missing data. Required data: customerId, productId, shop", method: method });
  }

  switch (method) {
    case "POST":
      // Handle POST request logic here
      // For example, adding a new item to the wishlist
      const wishlist = await db.wishlist.create({
        data: {
          customerId,
          productId,
          shop,
        },
      });

      return json({ message: "Product added to wishlist", method: "POST", wishlist: wishlist });

    case "PATCH":
      // Handle PATCH request logic here
      // For example, updating an existing item in the wishlist
      return json({ message: "Success", method: "Patch" });

    case "DELETE":
      // Handle DELETE request logic here
      // For example, removing an item from the wishlist
      return json({ message: "Product removed from your wishlist", method: "Delete" });

    default:
      // Optional: handle other methods or return a method not allowed response
      return new Response("Method Not Allowed", { status: 405 });
  }

}
