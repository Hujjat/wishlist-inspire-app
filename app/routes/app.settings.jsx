import {
  Box,
  Card,
  Page,
  Text,
  BlockStack,
  InlineGrid,
  TextField,
Button,
} from "@shopify/polaris";
import { useState } from "react";
import { json } from "@remix-run/node";
import { useLoaderData, Form } from "@remix-run/react";
import { authenticate } from "../shopify.server";

// Import primsa db
import db from "../db.server";

export async function loader({ request}) {
  const { session } = await authenticate.admin(request);
  // get data from database if it exists. If not return empty object
  let settings = await db.settings.findFirst({
    where: {
      shop: session.shop,
    },
  });

  if (!settings) {
    settings = {};
  }
  return json(settings);
}


export async function action({ request }) {
  // updates persistent data
  let settings = await request.formData();
  settings = Object.fromEntries(settings);
  const { session } = await authenticate.admin(request);

  // update database
  await db.settings.upsert({
    where: { shop: session.shop },
    update: {
      name: settings.name,
      description: settings.description,
      shop: session.shop
    },
    create: {
      name: settings.name,
      description: settings.description,
      shop: session.shop
    }
  });

  return json(settings);
}

export default function SettingsPage() {
  const settings = useLoaderData();

  const [formState, setFormState] = useState(settings);

  return (
    <Page>
      <ui-title-bar title="Settings" />
      <BlockStack gap={{ xs: "800", sm: "400" }}>
        <InlineGrid columns={{ xs: "1fr", md: "2fr 5fr" }} gap="400">
          <Box
            as="section"
            paddingInlineStart={{ xs: 400, sm: 0 }}
            paddingInlineEnd={{ xs: 400, sm: 0 }}
          >
            <BlockStack gap="400">
              <Text as="h3" variant="headingMd">
                Settings
              </Text>
              <Text as="p" variant="bodyMd">
                Update app settings and preferences.
              </Text>
            </BlockStack>
          </Box>
          <Card roundedAbove="sm">
            <Form method="POST">
              <BlockStack gap="400">
                <TextField label="App name" name="name" value={formState?.name} onChange={(value) => setFormState({ ...formState, name: value })} />
                <TextField label="Description" name="description" value={formState?.description} onChange={(value) => setFormState({ ...formState, description: value })} />

                <Button submit={true}>Save </Button>
              </BlockStack>
            </Form>
          </Card>
        </InlineGrid>


      </BlockStack>
    </Page>
  );
}
