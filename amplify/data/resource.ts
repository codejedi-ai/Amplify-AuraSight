import { type ClientSchema, a, defineData } from "@aws-amplify/backend"

const schema = a.schema({
  Brand: a
    .model({
      name: a.string().required(),
      industry: a.string(),
      brandAura: a.string(),
      owner: a.string(), // To associate with a user
    })
    .authorization((allow) => [allow.owner()]),
  Influencer: a
    .model({
      name: a.string().required(),
      niche: a.string(),
      auraVibe: a.string(),
      owner: a.string(), // To associate with a user
    })
    .authorization((allow) => [allow.owner()]),
})

export type Schema = ClientSchema<typeof schema>

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
  },
})
