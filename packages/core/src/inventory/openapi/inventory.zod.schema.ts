import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const registerInventorySlot_Body = z
  .object({
    property: z.string(),
    format: z.enum(['display', 'video', 'in_app']),
    blockedAdvertiserCategories: z.array(z.string()).optional(),
  })
  .passthrough();
const quarantineInventorySlot_Body = z
  .object({ reason: z.string(), invalidTrafficRate: z.number().gte(0).lte(1) })
  .partial()
  .passthrough();
const InventorySlotStatus = z.enum(['active', 'quarantined', 'disabled']);
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
const SlotId = z.string();
const InventoryFormat = z.enum(['display', 'video', 'in_app']);
const InventorySlot = z
  .object({
    id: z.string().regex(/^slt_[0-9a-hjkmnp-tv-z]{26}$/),
    publisherId: z.string(),
    property: z.string(),
    format: z.enum(['display', 'video', 'in_app']),
    status: z.enum(['active', 'quarantined', 'disabled']),
    blockedAdvertiserCategories: z.array(z.string()).optional(),
    quarantineReason: z.string().optional(),
    invalidTrafficRate: z.number().gte(0).lte(1).optional(),
  })
  .passthrough();
const InventorySlotListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string().regex(/^slt_[0-9a-hjkmnp-tv-z]{26}$/),
          publisherId: z.string(),
          property: z.string(),
          format: z.enum(['display', 'video', 'in_app']),
          status: z.enum(['active', 'quarantined', 'disabled']),
          blockedAdvertiserCategories: z.array(z.string()).optional(),
          quarantineReason: z.string().optional(),
          invalidTrafficRate: z.number().gte(0).lte(1).optional(),
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
const InventorySlotListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().regex(/^slt_[0-9a-hjkmnp-tv-z]{26}$/),
              publisherId: z.string(),
              property: z.string(),
              format: z.enum(['display', 'video', 'in_app']),
              status: z.enum(['active', 'quarantined', 'disabled']),
              blockedAdvertiserCategories: z.array(z.string()).optional(),
              quarantineReason: z.string().optional(),
              invalidTrafficRate: z.number().gte(0).lte(1).optional(),
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
const InventorySlotCreate = z
  .object({
    property: z.string(),
    format: z.enum(['display', 'video', 'in_app']),
    blockedAdvertiserCategories: z.array(z.string()).optional(),
  })
  .passthrough();
const InventorySlotResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^slt_[0-9a-hjkmnp-tv-z]{26}$/),
        publisherId: z.string(),
        property: z.string(),
        format: z.enum(['display', 'video', 'in_app']),
        status: z.enum(['active', 'quarantined', 'disabled']),
        blockedAdvertiserCategories: z.array(z.string()).optional(),
        quarantineReason: z.string().optional(),
        invalidTrafficRate: z.number().gte(0).lte(1).optional(),
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
const QuarantineRequest = z
  .object({ reason: z.string(), invalidTrafficRate: z.number().gte(0).lte(1) })
  .partial()
  .passthrough();

export const schemas: any = {
  registerInventorySlot_Body,
  quarantineInventorySlot_Body,
  InventorySlotStatus,
  Problem,
  SlotId,
  InventoryFormat,
  InventorySlot,
  InventorySlotListData,
  ResponseMeta,
  InventorySlotListResponse,
  InventorySlotCreate,
  InventorySlotResponse,
  QuarantineRequest,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/inventory/slots',
    alias: 'listInventorySlots',
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
        schema: z.enum(['active', 'quarantined', 'disabled']).optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  id: z.string().regex(/^slt_[0-9a-hjkmnp-tv-z]{26}$/),
                  publisherId: z.string(),
                  property: z.string(),
                  format: z.enum(['display', 'video', 'in_app']),
                  status: z.enum(['active', 'quarantined', 'disabled']),
                  blockedAdvertiserCategories: z.array(z.string()).optional(),
                  quarantineReason: z.string().optional(),
                  invalidTrafficRate: z.number().gte(0).lte(1).optional(),
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
    path: '/v1/inventory/slots',
    alias: 'registerInventorySlot',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: registerInventorySlot_Body,
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
            id: z.string().regex(/^slt_[0-9a-hjkmnp-tv-z]{26}$/),
            publisherId: z.string(),
            property: z.string(),
            format: z.enum(['display', 'video', 'in_app']),
            status: z.enum(['active', 'quarantined', 'disabled']),
            blockedAdvertiserCategories: z.array(z.string()).optional(),
            quarantineReason: z.string().optional(),
            invalidTrafficRate: z.number().gte(0).lte(1).optional(),
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
    path: '/v1/inventory/slots/:slotId/quarantine',
    alias: 'quarantineInventorySlot',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: quarantineInventorySlot_Body.optional(),
      },
      {
        name: 'slotId',
        type: 'Path',
        schema: z.string().regex(/^slt_[0-9a-hjkmnp-tv-z]{26}$/),
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
            id: z.string().regex(/^slt_[0-9a-hjkmnp-tv-z]{26}$/),
            publisherId: z.string(),
            property: z.string(),
            format: z.enum(['display', 'video', 'in_app']),
            status: z.enum(['active', 'quarantined', 'disabled']),
            blockedAdvertiserCategories: z.array(z.string()).optional(),
            quarantineReason: z.string().optional(),
            invalidTrafficRate: z.number().gte(0).lte(1).optional(),
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
