import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

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
const Money = z
  .object({ amount: z.number(), currency: z.string().min(3).max(3) })
  .passthrough();
const CostPerActionReport = z
  .object({
    campaignId: z.string().optional(),
    period: z.string(),
    verifiedCostPerAction: z
      .object({ amount: z.number(), currency: z.string().min(3).max(3) })
      .passthrough(),
    benchmarkCostPerAction: z
      .object({ amount: z.number(), currency: z.string().min(3).max(3) })
      .passthrough()
      .optional(),
    invalidTrafficExclusionRate: z.number().gte(0).lte(1).optional(),
    disclosedPlatformFeeRate: z.number().gte(0).lte(1).optional(),
    verifiedActions: z.number().int().gte(0).optional(),
    excludedActions: z.number().int().gte(0).optional(),
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
const CostPerActionReportResponse = z
  .object({
    data: z
      .object({
        campaignId: z.string().optional(),
        period: z.string(),
        verifiedCostPerAction: z
          .object({ amount: z.number(), currency: z.string().min(3).max(3) })
          .passthrough(),
        benchmarkCostPerAction: z
          .object({ amount: z.number(), currency: z.string().min(3).max(3) })
          .passthrough()
          .optional(),
        invalidTrafficExclusionRate: z.number().gte(0).lte(1).optional(),
        disclosedPlatformFeeRate: z.number().gte(0).lte(1).optional(),
        verifiedActions: z.number().int().gte(0).optional(),
        excludedActions: z.number().int().gte(0).optional(),
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
  Problem,
  Money,
  CostPerActionReport,
  ResponseMeta,
  CostPerActionReportResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/reports/cost-per-action',
    alias: 'getCostPerActionReport',
    requestFormat: 'json',
    parameters: [
      {
        name: 'campaignId',
        type: 'Query',
        schema: z.string().optional(),
      },
      {
        name: 'period',
        type: 'Query',
        schema: z.string().optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            campaignId: z.string().optional(),
            period: z.string(),
            verifiedCostPerAction: z
              .object({
                amount: z.number(),
                currency: z.string().min(3).max(3),
              })
              .passthrough(),
            benchmarkCostPerAction: z
              .object({
                amount: z.number(),
                currency: z.string().min(3).max(3),
              })
              .passthrough()
              .optional(),
            invalidTrafficExclusionRate: z.number().gte(0).lte(1).optional(),
            disclosedPlatformFeeRate: z.number().gte(0).lte(1).optional(),
            verifiedActions: z.number().int().gte(0).optional(),
            excludedActions: z.number().int().gte(0).optional(),
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
]);

export const api: any = new Zodios(
  'https://api.ddd-codegen-starter.local/v1',
  endpoints
);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
