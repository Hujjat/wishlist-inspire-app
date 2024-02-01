import { useEffect } from "react";
import { json } from "@remix-run/node";
import {
  Page,
  Layout,
  Text,
  Card,
  BlockStack,
  List,
  Link,
  InlineStack,
  EmptyState,
  DataTable,
} from "@shopify/polaris";
import { authenticate } from "../shopify.server";
import db from "../db.server";
import { useLoaderData } from "@remix-run/react";
import { formatDistanceToNow, parseISO } from 'date-fns';



export const loader = async ({ request }) => {
  const auth = await authenticate.admin(request);
  const shop = auth.session.shop;
  console.log('shop: -------> ', shop);
  // get data from database for that shop acending by id
  const wishlistData = await db.wishlist.findMany({
    where: {
      shop: shop,
    },
    orderBy: {
      id: "asc",
    },
  });

  console.log('wishlistData: -------> ', wishlistData);

  return json(wishlistData);
};

export const action = async ({ request }) => {

};

export default function Index() {
  const wishlistData = useLoaderData();
  const wishlistArray = wishlistData.map((item) => {
    const createdAt = formatDistanceToNow(parseISO(item.createdAt), { addSuffix: true });
    return [item.customerId, item.productId, createdAt];
  });


  return (
    <Page title="Wishlist overview dashboard">
      <ui-title-bar title="Overview">
      </ui-title-bar>
      <BlockStack gap="500">
        <Layout>
          <Layout.Section>
            <Card>
              {wishlistData.length > 0 ? (
                 <DataTable
                    columnContentTypes={[
                      'text',
                      'text',
                      'text',
                    ]}
                    headings={[
                      'Customer ID',
                      'Product ID',
                      'Created At',
                    ]}
                    rows={wishlistArray}/>
              ) : (
                <EmptyState
                  heading="Manage your wishlist products here"
                  action={{
                    content: 'Learn more',
                    url: 'https://youtube.com/codeinspire',
                    external: "true",
                  }}
                  secondaryAction={{
                    content: 'Watch videos',
                    url: 'https://youtube.com/codeinspire',
                    external: "true",
                  }}
                  image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
                >
                  <p>You don't have any products in your wishlist yet.</p>
                </EmptyState>
              )}

            </Card>
          </Layout.Section>
          <Layout.Section variant="oneThird">
            <BlockStack gap="500">
              <Card>
                <BlockStack gap="200">
                  <Text as="h2" variant="headingMd">
                    App template specs
                  </Text>
                  <BlockStack gap="200">

                    <InlineStack align="space-between">
                      <Text as="span" variant="bodyMd">
                        Course content
                      </Text>
                      <Link url="https://youtube.com/codeinspire" target="_blank" removeUnderline>
                        Codeinspire
                      </Link>
                    </InlineStack>
                    <InlineStack align="space-between">
                      <Text as="span" variant="bodyMd">
                        Source code
                      </Text>
                      <Link url="https://github.com/Hujjat" target="_blank" removeUnderline>
                        Github
                      </Link>
                    </InlineStack>

                    <InlineStack align="space-between">
                      <Text as="span" variant="bodyMd">
                        Framework
                      </Text>
                      <Link
                        url="https://remix.run"
                        target="_blank"
                        removeUnderline
                      >
                        Remix
                      </Link>
                    </InlineStack>
                    <InlineStack align="space-between">
                      <Text as="span" variant="bodyMd">
                        Database
                      </Text>
                      <Link
                        url="https://www.prisma.io/"
                        target="_blank"
                        removeUnderline
                      >
                        Prisma
                      </Link>
                    </InlineStack>
                    <InlineStack align="space-between">
                      <Text as="span" variant="bodyMd">
                        Interface
                      </Text>
                      <span>
                        <Link
                          url="https://polaris.shopify.com"
                          target="_blank"
                          removeUnderline
                        >
                          Polaris
                        </Link>
                        {", "}
                        <Link
                          url="https://shopify.dev/docs/apps/tools/app-bridge"
                          target="_blank"
                          removeUnderline
                        >
                          App Bridge
                        </Link>
                      </span>
                    </InlineStack>
                    <InlineStack align="space-between">
                      <Text as="span" variant="bodyMd">
                        API
                      </Text>
                      <Link
                        url="https://shopify.dev/docs/api/admin-graphql"
                        target="_blank"
                        removeUnderline
                      >
                        GraphQL API
                      </Link>
                    </InlineStack>

                  </BlockStack>
                </BlockStack>
              </Card>
              <Card>
                <BlockStack gap="200">
                  <Text as="h2" variant="headingMd">
                    Next steps
                  </Text>
                  <List>
                    <List.Item>
                      Build a
                      <Link url="https://youtube.com/codeinspire" target="_blank" removeUnderline >
                        {" "}
                        Wishlist app
                      </Link>{" "}
                      to get started
                    </List.Item>

                  </List>
                </BlockStack>
              </Card>
            </BlockStack>
          </Layout.Section>
        </Layout>
      </BlockStack>
    </Page>
  );
}
