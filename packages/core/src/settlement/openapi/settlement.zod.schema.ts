import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const executePublisherPayout_Body = z
  .object({
    statementId: z.string().regex(/^stm_[0-9a-hjkmnp-tv-z]{26}$/),
    paymentReference: z.string().optional(),
  })
  .passthrough();
const CounterpartyType = z.enum(['advertiser', 'publisher']);
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
const StatementId = z.string();
const Money = z
  .object({ amount: z.number(), currency: z.string().min(3).max(3) })
  .passthrough();
const SettlementStatement = z
  .object({
    id: z.string().regex(/^stm_[0-9a-hjkmnp-tv-z]{26}$/),
    period: z.string(),
    counterpartyId: z.string(),
    counterpartyType: z.enum(['advertiser', 'publisher']),
    confirmedActions: z.number().int().gte(0).optional(),
    excludedActions: z.number().int().gte(0).optional(),
    disputedActions: z.number().int().gte(0).optional(),
    grossAmount: z
      .object({ amount: z.number(), currency: z.string().min(3).max(3) })
      .passthrough()
      .optional(),
    platformFee: z
      .object({ amount: z.number(), currency: z.string().min(3).max(3) })
      .passthrough()
      .optional(),
    netAmount: z
      .object({ amount: z.number(), currency: z.string().min(3).max(3) })
      .passthrough()
      .optional(),
    expectedPayoutAt: z.string().datetime({ offset: true }).optional(),
    minimumPayoutThreshold: z
      .object({ amount: z.number(), currency: z.string().min(3).max(3) })
      .passthrough()
      .optional(),
    deferredPayment: z.boolean().optional(),
  })
  .passthrough();
const StatementListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string().regex(/^stm_[0-9a-hjkmnp-tv-z]{26}$/),
          period: z.string(),
          counterpartyId: z.string(),
          counterpartyType: z.enum(['advertiser', 'publisher']),
          confirmedActions: z.number().int().gte(0).optional(),
          excludedActions: z.number().int().gte(0).optional(),
          disputedActions: z.number().int().gte(0).optional(),
          grossAmount: z
            .object({ amount: z.number(), currency: z.string().min(3).max(3) })
            .passthrough()
            .optional(),
          platformFee: z
            .object({ amount: z.number(), currency: z.string().min(3).max(3) })
            .passthrough()
            .optional(),
          netAmount: z
            .object({ amount: z.number(), currency: z.string().min(3).max(3) })
            .passthrough()
            .optional(),
          expectedPayoutAt: z.string().datetime({ offset: true }).optional(),
          minimumPayoutThreshold: z
            .object({ amount: z.number(), currency: z.string().min(3).max(3) })
            .passthrough()
            .optional(),
          deferredPayment: z.boolean().optional(),
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
const StatementListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().regex(/^stm_[0-9a-hjkmnp-tv-z]{26}$/),
              period: z.string(),
              counterpartyId: z.string(),
              counterpartyType: z.enum(['advertiser', 'publisher']),
              confirmedActions: z.number().int().gte(0).optional(),
              excludedActions: z.number().int().gte(0).optional(),
              disputedActions: z.number().int().gte(0).optional(),
              grossAmount: z
                .object({
                  amount: z.number(),
                  currency: z.string().min(3).max(3),
                })
                .passthrough()
                .optional(),
              platformFee: z
                .object({
                  amount: z.number(),
                  currency: z.string().min(3).max(3),
                })
                .passthrough()
                .optional(),
              netAmount: z
                .object({
                  amount: z.number(),
                  currency: z.string().min(3).max(3),
                })
                .passthrough()
                .optional(),
              expectedPayoutAt: z
                .string()
                .datetime({ offset: true })
                .optional(),
              minimumPayoutThreshold: z
                .object({
                  amount: z.number(),
                  currency: z.string().min(3).max(3),
                })
                .passthrough()
                .optional(),
              deferredPayment: z.boolean().optional(),
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
const SettlementStatementResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^stm_[0-9a-hjkmnp-tv-z]{26}$/),
        period: z.string(),
        counterpartyId: z.string(),
        counterpartyType: z.enum(['advertiser', 'publisher']),
        confirmedActions: z.number().int().gte(0).optional(),
        excludedActions: z.number().int().gte(0).optional(),
        disputedActions: z.number().int().gte(0).optional(),
        grossAmount: z
          .object({ amount: z.number(), currency: z.string().min(3).max(3) })
          .passthrough()
          .optional(),
        platformFee: z
          .object({ amount: z.number(), currency: z.string().min(3).max(3) })
          .passthrough()
          .optional(),
        netAmount: z
          .object({ amount: z.number(), currency: z.string().min(3).max(3) })
          .passthrough()
          .optional(),
        expectedPayoutAt: z.string().datetime({ offset: true }).optional(),
        minimumPayoutThreshold: z
          .object({ amount: z.number(), currency: z.string().min(3).max(3) })
          .passthrough()
          .optional(),
        deferredPayment: z.boolean().optional(),
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
const PayoutRequest = z
  .object({
    statementId: z.string().regex(/^stm_[0-9a-hjkmnp-tv-z]{26}$/),
    paymentReference: z.string().optional(),
  })
  .passthrough();
const PayoutId = z.string();
const PayoutStatus = z.enum(['pending', 'executing', 'paid', 'failed']);
const Payout = z
  .object({
    id: z.string().regex(/^pay_[0-9a-hjkmnp-tv-z]{26}$/),
    statementId: z.string().regex(/^stm_[0-9a-hjkmnp-tv-z]{26}$/),
    status: z.enum(['pending', 'executing', 'paid', 'failed']),
    amount: z
      .object({ amount: z.number(), currency: z.string().min(3).max(3) })
      .passthrough()
      .optional(),
  })
  .passthrough();
const PayoutResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^pay_[0-9a-hjkmnp-tv-z]{26}$/),
        statementId: z.string().regex(/^stm_[0-9a-hjkmnp-tv-z]{26}$/),
        status: z.enum(['pending', 'executing', 'paid', 'failed']),
        amount: z
          .object({ amount: z.number(), currency: z.string().min(3).max(3) })
          .passthrough()
          .optional(),
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
  executePublisherPayout_Body,
  CounterpartyType,
  Problem,
  StatementId,
  Money,
  SettlementStatement,
  StatementListData,
  ResponseMeta,
  StatementListResponse,
  SettlementStatementResponse,
  PayoutRequest,
  PayoutId,
  PayoutStatus,
  Payout,
  PayoutResponse,
};

const endpoints = makeApi([
  {
    method: 'post',
    path: '/v1/settlement/payouts',
    alias: 'executePublisherPayout',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: executePublisherPayout_Body,
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
            id: z.string().regex(/^pay_[0-9a-hjkmnp-tv-z]{26}$/),
            statementId: z.string().regex(/^stm_[0-9a-hjkmnp-tv-z]{26}$/),
            status: z.enum(['pending', 'executing', 'paid', 'failed']),
            amount: z
              .object({
                amount: z.number(),
                currency: z.string().min(3).max(3),
              })
              .passthrough()
              .optional(),
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
    path: '/v1/settlement/statements',
    alias: 'listSettlementStatements',
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
        name: 'counterpartyType',
        type: 'Query',
        schema: z.enum(['advertiser', 'publisher']).optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  id: z.string().regex(/^stm_[0-9a-hjkmnp-tv-z]{26}$/),
                  period: z.string(),
                  counterpartyId: z.string(),
                  counterpartyType: z.enum(['advertiser', 'publisher']),
                  confirmedActions: z.number().int().gte(0).optional(),
                  excludedActions: z.number().int().gte(0).optional(),
                  disputedActions: z.number().int().gte(0).optional(),
                  grossAmount: z
                    .object({
                      amount: z.number(),
                      currency: z.string().min(3).max(3),
                    })
                    .passthrough()
                    .optional(),
                  platformFee: z
                    .object({
                      amount: z.number(),
                      currency: z.string().min(3).max(3),
                    })
                    .passthrough()
                    .optional(),
                  netAmount: z
                    .object({
                      amount: z.number(),
                      currency: z.string().min(3).max(3),
                    })
                    .passthrough()
                    .optional(),
                  expectedPayoutAt: z
                    .string()
                    .datetime({ offset: true })
                    .optional(),
                  minimumPayoutThreshold: z
                    .object({
                      amount: z.number(),
                      currency: z.string().min(3).max(3),
                    })
                    .passthrough()
                    .optional(),
                  deferredPayment: z.boolean().optional(),
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
    method: 'get',
    path: '/v1/settlement/statements/:statementId',
    alias: 'getSettlementStatement',
    requestFormat: 'json',
    parameters: [
      {
        name: 'statementId',
        type: 'Path',
        schema: z.string().regex(/^stm_[0-9a-hjkmnp-tv-z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^stm_[0-9a-hjkmnp-tv-z]{26}$/),
            period: z.string(),
            counterpartyId: z.string(),
            counterpartyType: z.enum(['advertiser', 'publisher']),
            confirmedActions: z.number().int().gte(0).optional(),
            excludedActions: z.number().int().gte(0).optional(),
            disputedActions: z.number().int().gte(0).optional(),
            grossAmount: z
              .object({
                amount: z.number(),
                currency: z.string().min(3).max(3),
              })
              .passthrough()
              .optional(),
            platformFee: z
              .object({
                amount: z.number(),
                currency: z.string().min(3).max(3),
              })
              .passthrough()
              .optional(),
            netAmount: z
              .object({
                amount: z.number(),
                currency: z.string().min(3).max(3),
              })
              .passthrough()
              .optional(),
            expectedPayoutAt: z.string().datetime({ offset: true }).optional(),
            minimumPayoutThreshold: z
              .object({
                amount: z.number(),
                currency: z.string().min(3).max(3),
              })
              .passthrough()
              .optional(),
            deferredPayment: z.boolean().optional(),
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
]);

export const api: any = new Zodios(
  'https://api.ddd-codegen-starter.local/v1',
  endpoints
);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
