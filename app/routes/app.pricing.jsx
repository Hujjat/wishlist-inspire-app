import {
  Page,
  Box,
  Button,
  Card,
  CalloutCard,
  Text,
  Grid,
  Divider,
  BlockStack,
  Icon,
  ExceptionList
} from "@shopify/polaris";

import {
  MobileAcceptMajor
} from '@shopify/polaris-icons'

let planData = [
  {
    title: "Free",
    description: "Free plan with basic features",
    price: "0",
    action: "Upgrade to pro",
    url: "#",
    features: [
      "100 wishlist per day",
      "500 Products",
      "Basic customization",
      "Basic support",
    ]
  },
  {
    title: "Pro",
    description: "Pro plan with advanced features",
    price: "10",
    action: "Upgrade to pro",
    url: "#",
    features: [
      "Unlimted wishlist per day",
      "10000 Products",
      "Advanced customization",
      "Priority support",
    ]
  },
]

export default function PricingPage() {
  return (
    <Page>
      <ui-title-bar title="Pricing" />
      <CalloutCard
          title="Upgrade to pro"
          illustration="https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg"
          primaryAction={{
            content: 'Upgrade to pro',
            url: '#',
          }}
        >
        <p>
          You're currently on free plan. Upgrade to pro to unlock more features.
        </p>
      </CalloutCard>

      <div style={{ margin: "0.5rem 0"}}>
        <Divider />
      </div>

      <Grid>

        {planData.map((plan, index) => (
          <Grid.Cell key={index} columnSpan={{xs: 6, sm: 3, md: 3, lg: 6, xl: 6}}>
            <Card>
              <Box padding="400">
                <Text as="h3" variant="headingMd">
                  {plan.title}
                </Text>
                <Box as="p" variant="bodyMd">
                  {plan.description}
                  {/* If plan is 0, display nothing */}
                  <Text as="p" fontWeight="bold">
                    {plan.price === "0" ? "" : "$" + plan.price}
                  </Text>
                </Box>

                <div style={{ margin: "0.5rem 0"}}>
                  <Divider />
                </div>

                <BlockStack gap={100}>
                  {plan.features.map((feature, index) => (
                    <ExceptionList
                      key={index}
                      items={[
                        {
                          icon: MobileAcceptMajor,
                          description: feature,
                        },
                      ]}
                    />
                  ))}
                </BlockStack>
                <div style={{ margin: "0.5rem 0"}}>
                  <Divider />
                </div>
                <Button>{plan.action}</Button>
              </Box>
            </Card>
          </Grid.Cell>
        ))}

      </Grid>

    </Page>
  );
}

function Code({ children }) {
  return (
    <Box
      as="span"
      padding="025"
      paddingInlineStart="100"
      paddingInlineEnd="100"
      background="bg-surface-active"
      borderWidth="025"
      borderColor="border"
      borderRadius="100"
    >
      <code>{children}</code>
    </Box>
  );
}
