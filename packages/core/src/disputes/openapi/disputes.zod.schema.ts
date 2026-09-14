import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const openDispute_Body = z
  .object({
    conversionId: z.string(),
    claim: z.enum([
      'shaving',
      'invalid_traffic',
      'misattribution',
      'non_payment',
    ]),
    evidence: z.string().optional(),
  })
  .passthrough();
const resolveDispute_Body = z
  .object({
    outcome: z.enum(['upheld', 'rejected', 'partial']),
    rationale: z.string().optional(),
  })
  .passthrough();
const DisputeStatus = z.enum(['open', 'under_review', 'resolved', 'expired']);
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
const DisputeId = z.string();
const DisputeClaim = z.enum([
  'shaving',
  'invalid_traffic',
  'misattribution',
  'non_payment',
]);
const DisputeOutcome = z.enum(['upheld', 'rejected', 'partial']);
const Dispute = z
  .object({
    id: z.string().regex(/^dsp_[0-9a-hjkmnp-tv-z]{26}$/),
    conversionId: z.string(),
    claim: z.enum([
      'shaving',
      'invalid_traffic',
      'misattribution',
      'non_payment',
    ]),
    status: z.enum(['open', 'under_review', 'resolved', 'expired']),
    resolutionDeadline: z.string().datetime({ offset: true }),
    outcome: z.enum(['upheld', 'rejected', 'partial']).optional(),
    defaultToEvidence: z.boolean().optional(),
  })
  .passthrough();
const DisputeListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string().regex(/^dsp_[0-9a-hjkmnp-tv-z]{26}$/),
          conversionId: z.string(),
          claim: z.enum([
            'shaving',
            'invalid_traffic',
            'misattribution',
            'non_payment',
          ]),
          status: z.enum(['open', 'under_review', 'resolved', 'expired']),
          resolutionDeadline: z.string().datetime({ offset: true }),
          outcome: z.enum(['upheld', 'rejected', 'partial']).optional(),
          defaultToEvidence: z.boolean().optional(),
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
const DisputeListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().regex(/^dsp_[0-9a-hjkmnp-tv-z]{26}$/),
              conversionId: z.string(),
              claim: z.enum([
                'shaving',
                'invalid_traffic',
                'misattribution',
                'non_payment',
              ]),
              status: z.enum(['open', 'under_review', 'resolved', 'expired']),
              resolutionDeadline: z.string().datetime({ offset: true }),
              outcome: z.enum(['upheld', 'rejected', 'partial']).optional(),
              defaultToEvidence: z.boolean().optional(),
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
const DisputeCreate = z
  .object({
    conversionId: z.string(),
    claim: z.enum([
      'shaving',
      'invalid_traffic',
      'misattribution',
      'non_payment',
    ]),
    evidence: z.string().optional(),
  })
  .passthrough();
const DisputeResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^dsp_[0-9a-hjkmnp-tv-z]{26}$/),
        conversionId: z.string(),
        claim: z.enum([
          'shaving',
          'invalid_traffic',
          'misattribution',
          'non_payment',
        ]),
        status: z.enum(['open', 'under_review', 'resolved', 'expired']),
        resolutionDeadline: z.string().datetime({ offset: true }),
        outcome: z.enum(['upheld', 'rejected', 'partial']).optional(),
        defaultToEvidence: z.boolean().optional(),
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
const DisputeResolution = z
  .object({
    outcome: z.enum(['upheld', 'rejected', 'partial']),
    rationale: z.string().optional(),
  })
  .passthrough();

export const schemas: any = {
  openDispute_Body,
  resolveDispute_Body,
  DisputeStatus,
  Problem,
  DisputeId,
  DisputeClaim,
  DisputeOutcome,
  Dispute,
  DisputeListData,
  ResponseMeta,
  DisputeListResponse,
  DisputeCreate,
  DisputeResponse,
  DisputeResolution,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/disputes',
    alias: 'listDisputes',
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
          .enum(['open', 'under_review', 'resolved', 'expired'])
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
                  id: z.string().regex(/^dsp_[0-9a-hjkmnp-tv-z]{26}$/),
                  conversionId: z.string(),
                  claim: z.enum([
                    'shaving',
                    'invalid_traffic',
                    'misattribution',
                    'non_payment',
                  ]),
                  status: z.enum([
                    'open',
                    'under_review',
                    'resolved',
                    'expired',
                  ]),
                  resolutionDeadline: z.string().datetime({ offset: true }),
                  outcome: z.enum(['upheld', 'rejected', 'partial']).optional(),
                  defaultToEvidence: z.boolean().optional(),
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
    path: '/v1/disputes',
    alias: 'openDispute',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: openDispute_Body,
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
            id: z.string().regex(/^dsp_[0-9a-hjkmnp-tv-z]{26}$/),
            conversionId: z.string(),
            claim: z.enum([
              'shaving',
              'invalid_traffic',
              'misattribution',
              'non_payment',
            ]),
            status: z.enum(['open', 'under_review', 'resolved', 'expired']),
            resolutionDeadline: z.string().datetime({ offset: true }),
            outcome: z.enum(['upheld', 'rejected', 'partial']).optional(),
            defaultToEvidence: z.boolean().optional(),
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
    method: 'post',
    path: '/v1/disputes/:disputeId/resolution',
    alias: 'resolveDispute',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: resolveDispute_Body,
      },
      {
        name: 'disputeId',
        type: 'Path',
        schema: z.string().regex(/^dsp_[0-9a-hjkmnp-tv-z]{26}$/),
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
            id: z.string().regex(/^dsp_[0-9a-hjkmnp-tv-z]{26}$/),
            conversionId: z.string(),
            claim: z.enum([
              'shaving',
              'invalid_traffic',
              'misattribution',
              'non_payment',
            ]),
            status: z.enum(['open', 'under_review', 'resolved', 'expired']),
            resolutionDeadline: z.string().datetime({ offset: true }),
            outcome: z.enum(['upheld', 'rejected', 'partial']).optional(),
            defaultToEvidence: z.boolean().optional(),
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
