import { makeApi, Zodios } from '@zodios/core';
import { z } from 'zod';
const attestConversion_Body = z
    .object({
    attributionToken: z.string(),
    actionType: z.enum([
        'registration',
        'form_completion',
        'callback_request',
        'purchase',
    ]),
    occurredAt: z.string().datetime({ offset: true }),
    externalReference: z.string().optional(),
})
    .passthrough();
const ConversionStatus = z.enum([
    'attested',
    'confirmed',
    'excluded',
    'disputed',
    'settled',
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
const ConversionId = z.string();
const ActionType = z.enum([
    'registration',
    'form_completion',
    'callback_request',
    'purchase',
]);
const Money = z
    .object({ amount: z.number(), currency: z.string().min(3).max(3) })
    .passthrough();
const ConversionRecord = z
    .object({
    id: z.string().regex(/^cvr_[0-9a-hjkmnp-tv-z]{26}$/),
    campaignId: z.string(),
    slotId: z.string(),
    actionType: z.enum([
        'registration',
        'form_completion',
        'callback_request',
        'purchase',
    ]),
    status: z.enum([
        'attested',
        'confirmed',
        'excluded',
        'disputed',
        'settled',
    ]),
    exclusionReason: z.string().optional(),
    payableAmount: z
        .object({ amount: z.number(), currency: z.string().min(3).max(3) })
        .passthrough()
        .optional(),
    ledgerSequence: z.number().int().gte(0).optional(),
})
    .passthrough();
const ConversionListData = z
    .object({
    items: z.array(z
        .object({
        id: z.string().regex(/^cvr_[0-9a-hjkmnp-tv-z]{26}$/),
        campaignId: z.string(),
        slotId: z.string(),
        actionType: z.enum([
            'registration',
            'form_completion',
            'callback_request',
            'purchase',
        ]),
        status: z.enum([
            'attested',
            'confirmed',
            'excluded',
            'disputed',
            'settled',
        ]),
        exclusionReason: z.string().optional(),
        payableAmount: z
            .object({ amount: z.number(), currency: z.string().min(3).max(3) })
            .passthrough()
            .optional(),
        ledgerSequence: z.number().int().gte(0).optional(),
    })
        .passthrough()),
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
const ConversionListResponse = z
    .object({
    data: z
        .object({
        items: z.array(z
            .object({
            id: z.string().regex(/^cvr_[0-9a-hjkmnp-tv-z]{26}$/),
            campaignId: z.string(),
            slotId: z.string(),
            actionType: z.enum([
                'registration',
                'form_completion',
                'callback_request',
                'purchase',
            ]),
            status: z.enum([
                'attested',
                'confirmed',
                'excluded',
                'disputed',
                'settled',
            ]),
            exclusionReason: z.string().optional(),
            payableAmount: z
                .object({
                amount: z.number(),
                currency: z.string().min(3).max(3),
            })
                .passthrough()
                .optional(),
            ledgerSequence: z.number().int().gte(0).optional(),
        })
            .passthrough()),
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
const ConversionAttestation = z
    .object({
    attributionToken: z.string(),
    actionType: z.enum([
        'registration',
        'form_completion',
        'callback_request',
        'purchase',
    ]),
    occurredAt: z.string().datetime({ offset: true }),
    externalReference: z.string().optional(),
})
    .passthrough();
const ConversionRecordResponse = z
    .object({
    data: z
        .object({
        id: z.string().regex(/^cvr_[0-9a-hjkmnp-tv-z]{26}$/),
        campaignId: z.string(),
        slotId: z.string(),
        actionType: z.enum([
            'registration',
            'form_completion',
            'callback_request',
            'purchase',
        ]),
        status: z.enum([
            'attested',
            'confirmed',
            'excluded',
            'disputed',
            'settled',
        ]),
        exclusionReason: z.string().optional(),
        payableAmount: z
            .object({ amount: z.number(), currency: z.string().min(3).max(3) })
            .passthrough()
            .optional(),
        ledgerSequence: z.number().int().gte(0).optional(),
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
const LedgerProof = z
    .object({
    conversionId: z.string().regex(/^cvr_[0-9a-hjkmnp-tv-z]{26}$/),
    ledgerSequence: z.number().int().gte(0),
    recordHash: z.string(),
    previousHash: z.string(),
    attestedBy: z.string().optional(),
    verifiableBy: z.array(z.string()).optional(),
    invalidTrafficExcluded: z.boolean().optional(),
})
    .passthrough();
const LedgerProofResponse = z
    .object({
    data: z
        .object({
        conversionId: z.string().regex(/^cvr_[0-9a-hjkmnp-tv-z]{26}$/),
        ledgerSequence: z.number().int().gte(0),
        recordHash: z.string(),
        previousHash: z.string(),
        attestedBy: z.string().optional(),
        verifiableBy: z.array(z.string()).optional(),
        invalidTrafficExcluded: z.boolean().optional(),
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
export const schemas = {
    attestConversion_Body,
    ConversionStatus,
    Problem,
    ConversionId,
    ActionType,
    Money,
    ConversionRecord,
    ConversionListData,
    ResponseMeta,
    ConversionListResponse,
    ConversionAttestation,
    ConversionRecordResponse,
    LedgerProof,
    LedgerProofResponse,
};
const endpoints = makeApi([
    {
        method: 'get',
        path: '/v1/conversions',
        alias: 'listConversions',
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
                    .enum(['attested', 'confirmed', 'excluded', 'disputed', 'settled'])
                    .optional(),
            },
            {
                name: 'campaignId',
                type: 'Query',
                schema: z.string().optional(),
            },
        ],
        response: z
            .object({
            data: z
                .object({
                items: z.array(z
                    .object({
                    id: z.string().regex(/^cvr_[0-9a-hjkmnp-tv-z]{26}$/),
                    campaignId: z.string(),
                    slotId: z.string(),
                    actionType: z.enum([
                        'registration',
                        'form_completion',
                        'callback_request',
                        'purchase',
                    ]),
                    status: z.enum([
                        'attested',
                        'confirmed',
                        'excluded',
                        'disputed',
                        'settled',
                    ]),
                    exclusionReason: z.string().optional(),
                    payableAmount: z
                        .object({
                        amount: z.number(),
                        currency: z.string().min(3).max(3),
                    })
                        .passthrough()
                        .optional(),
                    ledgerSequence: z.number().int().gte(0).optional(),
                })
                    .passthrough()),
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
        path: '/v1/conversions',
        alias: 'attestConversion',
        requestFormat: 'json',
        parameters: [
            {
                name: 'body',
                type: 'Body',
                schema: attestConversion_Body,
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
                id: z.string().regex(/^cvr_[0-9a-hjkmnp-tv-z]{26}$/),
                campaignId: z.string(),
                slotId: z.string(),
                actionType: z.enum([
                    'registration',
                    'form_completion',
                    'callback_request',
                    'purchase',
                ]),
                status: z.enum([
                    'attested',
                    'confirmed',
                    'excluded',
                    'disputed',
                    'settled',
                ]),
                exclusionReason: z.string().optional(),
                payableAmount: z
                    .object({
                    amount: z.number(),
                    currency: z.string().min(3).max(3),
                })
                    .passthrough()
                    .optional(),
                ledgerSequence: z.number().int().gte(0).optional(),
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
                status: 409,
                description: `Idempotency key reuse with different body, or state conflict`,
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
        path: '/v1/conversions/:conversionId/verification',
        alias: 'getConversionVerification',
        requestFormat: 'json',
        parameters: [
            {
                name: 'conversionId',
                type: 'Path',
                schema: z.string().regex(/^cvr_[0-9a-hjkmnp-tv-z]{26}$/),
            },
        ],
        response: z
            .object({
            data: z
                .object({
                conversionId: z.string().regex(/^cvr_[0-9a-hjkmnp-tv-z]{26}$/),
                ledgerSequence: z.number().int().gte(0),
                recordHash: z.string(),
                previousHash: z.string(),
                attestedBy: z.string().optional(),
                verifiableBy: z.array(z.string()).optional(),
                invalidTrafficExcluded: z.boolean().optional(),
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
export const api = new Zodios('https://api.ddd-codegen-starter.local/v1', endpoints);
export function createApiClient(baseUrl, options) {
    return new Zodios(baseUrl, endpoints, options);
}
