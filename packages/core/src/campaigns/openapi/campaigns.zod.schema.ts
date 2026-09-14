import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createCampaign_Body = z
  .object({
    name: z.string().min(1).max(200),
    pricingModel: z.enum([
      'cost_per_action',
      'cost_per_click',
      'cost_per_mille',
    ]),
    maxPricePerAction: z
      .object({ amount: z.number(), currency: z.string().min(3).max(3) })
      .passthrough()
      .optional(),
    budget: z
      .object({ amount: z.number(), currency: z.string().min(3).max(3) })
      .passthrough(),
    brandSafetyCategories: z.array(z.string()).optional(),
    consentBasis: z.enum(['consent', 'legitimate_interest']).optional(),
  })
  .passthrough();
const defineConversionAction_Body = z
  .object({
    id: z
      .string()
      .regex(/^cdf_[0-9a-hjkmnp-tv-z]{26}$/)
      .optional(),
    actionType: z.enum([
      'registration',
      'form_completion',
      'callback_request',
      'purchase',
    ]),
    attributionWindowHours: z.number().int().gte(1),
    valuePerAction: z
      .object({ amount: z.number(), currency: z.string().min(3).max(3) })
      .passthrough()
      .optional(),
    systemOfRecord: z.string().optional(),
  })
  .passthrough();
const CampaignStatus = z.enum([
  'draft',
  'learning',
  'active',
  'paused',
  'ended',
]);
const Problem = z
  .object({
    type: z.string().url(),
    title: z.string(),
    status: z.number().int(),
    detail: z.string(),
    instance: z.string().url(),
    code: z.string(),
  })
  .partial()
  .passthrough();
const CampaignId = z.string();
const PricingModel = z.enum([
  'cost_per_action',
  'cost_per_click',
  'cost_per_mille',
]);
const Money = z
  .object({ amount: z.number(), currency: z.string().min(3).max(3) })
  .passthrough();
const ConsentBasis = z.enum(['consent', 'legitimate_interest']);
const AdvertiserCreditRating = z.enum([
  'unrated',
  'watch',
  'standard',
  'preferred',
]);
const Campaign = z
  .object({
    id: z.string().regex(/^cmp_[0-9a-hjkmnp-tv-z]{26}$/),
    advertiserId: z.string(),
    name: z.string().min(1).max(200),
    status: z.enum(['draft', 'learning', 'active', 'paused', 'ended']),
    pricingModel: z.enum([
      'cost_per_action',
      'cost_per_click',
      'cost_per_mille',
    ]),
    maxPricePerAction: z
      .object({ amount: z.number(), currency: z.string().min(3).max(3) })
      .passthrough()
      .optional(),
    budget: z
      .object({ amount: z.number(), currency: z.string().min(3).max(3) })
      .passthrough()
      .optional(),
    brandSafetyCategories: z.array(z.string()).optional(),
    consentBasis: z.enum(['consent', 'legitimate_interest']).optional(),
    advertiserCreditRating: z.enum([
      'unrated',
      'watch',
      'standard',
      'preferred',
    ]),
    deferredPaymentEligible: z.boolean().optional(),
  })
  .passthrough();
const CampaignListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string().regex(/^cmp_[0-9a-hjkmnp-tv-z]{26}$/),
          advertiserId: z.string(),
          name: z.string().min(1).max(200),
          status: z.enum(['draft', 'learning', 'active', 'paused', 'ended']),
          pricingModel: z.enum([
            'cost_per_action',
            'cost_per_click',
            'cost_per_mille',
          ]),
          maxPricePerAction: z
            .object({ amount: z.number(), currency: z.string().min(3).max(3) })
            .passthrough()
            .optional(),
          budget: z
            .object({ amount: z.number(), currency: z.string().min(3).max(3) })
            .passthrough()
            .optional(),
          brandSafetyCategories: z.array(z.string()).optional(),
          consentBasis: z.enum(['consent', 'legitimate_interest']).optional(),
          advertiserCreditRating: z.enum([
            'unrated',
            'watch',
            'standard',
            'preferred',
          ]),
          deferredPaymentEligible: z.boolean().optional(),
        })
        .passthrough()
    ),
    nextCursor: z.string().optional(),
  })
  .passthrough();
const ResponseMeta = z
  .object({
    requestId: z.string().uuid(),
    correlationId: z.string(),
    generatedAt: z.string().datetime({ offset: true }),
  })
  .partial()
  .passthrough();
const CampaignListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().regex(/^cmp_[0-9a-hjkmnp-tv-z]{26}$/),
              advertiserId: z.string(),
              name: z.string().min(1).max(200),
              status: z.enum([
                'draft',
                'learning',
                'active',
                'paused',
                'ended',
              ]),
              pricingModel: z.enum([
                'cost_per_action',
                'cost_per_click',
                'cost_per_mille',
              ]),
              maxPricePerAction: z
                .object({
                  amount: z.number(),
                  currency: z.string().min(3).max(3),
                })
                .passthrough()
                .optional(),
              budget: z
                .object({
                  amount: z.number(),
                  currency: z.string().min(3).max(3),
                })
                .passthrough()
                .optional(),
              brandSafetyCategories: z.array(z.string()).optional(),
              consentBasis: z
                .enum(['consent', 'legitimate_interest'])
                .optional(),
              advertiserCreditRating: z.enum([
                'unrated',
                'watch',
                'standard',
                'preferred',
              ]),
              deferredPaymentEligible: z.boolean().optional(),
            })
            .passthrough()
        ),
        nextCursor: z.string().optional(),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();
const CampaignCreate = z
  .object({
    name: z.string().min(1).max(200),
    pricingModel: z.enum([
      'cost_per_action',
      'cost_per_click',
      'cost_per_mille',
    ]),
    maxPricePerAction: z
      .object({ amount: z.number(), currency: z.string().min(3).max(3) })
      .passthrough()
      .optional(),
    budget: z
      .object({ amount: z.number(), currency: z.string().min(3).max(3) })
      .passthrough(),
    brandSafetyCategories: z.array(z.string()).optional(),
    consentBasis: z.enum(['consent', 'legitimate_interest']).optional(),
  })
  .passthrough();
const CampaignResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^cmp_[0-9a-hjkmnp-tv-z]{26}$/),
        advertiserId: z.string(),
        name: z.string().min(1).max(200),
        status: z.enum(['draft', 'learning', 'active', 'paused', 'ended']),
        pricingModel: z.enum([
          'cost_per_action',
          'cost_per_click',
          'cost_per_mille',
        ]),
        maxPricePerAction: z
          .object({ amount: z.number(), currency: z.string().min(3).max(3) })
          .passthrough()
          .optional(),
        budget: z
          .object({ amount: z.number(), currency: z.string().min(3).max(3) })
          .passthrough()
          .optional(),
        brandSafetyCategories: z.array(z.string()).optional(),
        consentBasis: z.enum(['consent', 'legitimate_interest']).optional(),
        advertiserCreditRating: z.enum([
          'unrated',
          'watch',
          'standard',
          'preferred',
        ]),
        deferredPaymentEligible: z.boolean().optional(),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();
const ConversionDefinitionId = z.string();
const ActionType = z.enum([
  'registration',
  'form_completion',
  'callback_request',
  'purchase',
]);
const ConversionDefinition = z
  .object({
    id: z
      .string()
      .regex(/^cdf_[0-9a-hjkmnp-tv-z]{26}$/)
      .optional(),
    actionType: z.enum([
      'registration',
      'form_completion',
      'callback_request',
      'purchase',
    ]),
    attributionWindowHours: z.number().int().gte(1),
    valuePerAction: z
      .object({ amount: z.number(), currency: z.string().min(3).max(3) })
      .passthrough()
      .optional(),
    systemOfRecord: z.string().optional(),
  })
  .passthrough();
const ConversionDefinitionResponse = z
  .object({
    data: z
      .object({
        id: z
          .string()
          .regex(/^cdf_[0-9a-hjkmnp-tv-z]{26}$/)
          .optional(),
        actionType: z.enum([
          'registration',
          'form_completion',
          'callback_request',
          'purchase',
        ]),
        attributionWindowHours: z.number().int().gte(1),
        valuePerAction: z
          .object({ amount: z.number(), currency: z.string().min(3).max(3) })
          .passthrough()
          .optional(),
        systemOfRecord: z.string().optional(),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();

export const schemas: any = {
  createCampaign_Body,
  defineConversionAction_Body,
  CampaignStatus,
  Problem,
  CampaignId,
  PricingModel,
  Money,
  ConsentBasis,
  AdvertiserCreditRating,
  Campaign,
  CampaignListData,
  ResponseMeta,
  CampaignListResponse,
  CampaignCreate,
  CampaignResponse,
  ConversionDefinitionId,
  ActionType,
  ConversionDefinition,
  ConversionDefinitionResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/campaigns',
    alias: 'listCampaigns',
    requestFormat: 'json',
    parameters: [
      {
        name: 'cursor',
        type: 'Query',
        schema: z.string().optional(),
      },
      {
        name: 'limit',
        type: 'Query',
        schema: z.number().int().gte(1).lte(200).optional().default(50),
      },
      {
        name: 'status',
        type: 'Query',
        schema: z
          .enum(['draft', 'learning', 'active', 'paused', 'ended'])
          .optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  id: z.string().regex(/^cmp_[0-9a-hjkmnp-tv-z]{26}$/),
                  advertiserId: z.string(),
                  name: z.string().min(1).max(200),
                  status: z.enum([
                    'draft',
                    'learning',
                    'active',
                    'paused',
                    'ended',
                  ]),
                  pricingModel: z.enum([
                    'cost_per_action',
                    'cost_per_click',
                    'cost_per_mille',
                  ]),
                  maxPricePerAction: z
                    .object({
                      amount: z.number(),
                      currency: z.string().min(3).max(3),
                    })
                    .passthrough()
                    .optional(),
                  budget: z
                    .object({
                      amount: z.number(),
                      currency: z.string().min(3).max(3),
                    })
                    .passthrough()
                    .optional(),
                  brandSafetyCategories: z.array(z.string()).optional(),
                  consentBasis: z
                    .enum(['consent', 'legitimate_interest'])
                    .optional(),
                  advertiserCreditRating: z.enum([
                    'unrated',
                    'watch',
                    'standard',
                    'preferred',
                  ]),
                  deferredPaymentEligible: z.boolean().optional(),
                })
                .passthrough()
            ),
            nextCursor: z.string().optional(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'post',
    path: '/v1/campaigns',
    alias: 'createCampaign',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createCampaign_Body,
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^cmp_[0-9a-hjkmnp-tv-z]{26}$/),
            advertiserId: z.string(),
            name: z.string().min(1).max(200),
            status: z.enum(['draft', 'learning', 'active', 'paused', 'ended']),
            pricingModel: z.enum([
              'cost_per_action',
              'cost_per_click',
              'cost_per_mille',
            ]),
            maxPricePerAction: z
              .object({
                amount: z.number(),
                currency: z.string().min(3).max(3),
              })
              .passthrough()
              .optional(),
            budget: z
              .object({
                amount: z.number(),
                currency: z.string().min(3).max(3),
              })
              .passthrough()
              .optional(),
            brandSafetyCategories: z.array(z.string()).optional(),
            consentBasis: z.enum(['consent', 'legitimate_interest']).optional(),
            advertiserCreditRating: z.enum([
              'unrated',
              'watch',
              'standard',
              'preferred',
            ]),
            deferredPaymentEligible: z.boolean().optional(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 422,
        description: `Semantically invalid request (e.g. PACK_EMPTY)`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'get',
    path: '/v1/campaigns/:campaignId',
    alias: 'getCampaign',
    requestFormat: 'json',
    parameters: [
      {
        name: 'campaignId',
        type: 'Path',
        schema: z.string().regex(/^cmp_[0-9a-hjkmnp-tv-z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^cmp_[0-9a-hjkmnp-tv-z]{26}$/),
            advertiserId: z.string(),
            name: z.string().min(1).max(200),
            status: z.enum(['draft', 'learning', 'active', 'paused', 'ended']),
            pricingModel: z.enum([
              'cost_per_action',
              'cost_per_click',
              'cost_per_mille',
            ]),
            maxPricePerAction: z
              .object({
                amount: z.number(),
                currency: z.string().min(3).max(3),
              })
              .passthrough()
              .optional(),
            budget: z
              .object({
                amount: z.number(),
                currency: z.string().min(3).max(3),
              })
              .passthrough()
              .optional(),
            brandSafetyCategories: z.array(z.string()).optional(),
            consentBasis: z.enum(['consent', 'legitimate_interest']).optional(),
            advertiserCreditRating: z.enum([
              'unrated',
              'watch',
              'standard',
              'preferred',
            ]),
            deferredPaymentEligible: z.boolean().optional(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 404,
        description: `Resource not found`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'post',
    path: '/v1/campaigns/:campaignId/conversion-definitions',
    alias: 'defineConversionAction',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: defineConversionAction_Body,
      },
      {
        name: 'campaignId',
        type: 'Path',
        schema: z.string().regex(/^cmp_[0-9a-hjkmnp-tv-z]{26}$/),
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z
              .string()
              .regex(/^cdf_[0-9a-hjkmnp-tv-z]{26}$/)
              .optional(),
            actionType: z.enum([
              'registration',
              'form_completion',
              'callback_request',
              'purchase',
            ]),
            attributionWindowHours: z.number().int().gte(1),
            valuePerAction: z
              .object({
                amount: z.number(),
                currency: z.string().min(3).max(3),
              })
              .passthrough()
              .optional(),
            systemOfRecord: z.string().optional(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 404,
        description: `Resource not found`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 422,
        description: `Semantically invalid request (e.g. PACK_EMPTY)`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
]);

export const api: any = new Zodios(
  'https://api.ddd-codegen-starter.local/v1',
  endpoints
);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
