import { makeApi, Zodios } from '@zodios/core';
import { z } from 'zod';
const submitBidRequest_Body = z
    .object({
    requestId: z.string(),
    slotId: z.string(),
    consentRecordId: z.string().optional(),
    consentPurpose: z.string().optional(),
    audienceSignals: z.record(z.string()).optional(),
    deviceType: z.string().optional(),
    geo: z.string().optional(),
})
    .passthrough();
const BidRequest = z
    .object({
    requestId: z.string(),
    slotId: z.string(),
    consentRecordId: z.string().optional(),
    consentPurpose: z.string().optional(),
    audienceSignals: z.record(z.string()).optional(),
    deviceType: z.string().optional(),
    geo: z.string().optional(),
})
    .passthrough();
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
const BidResponse = z
    .object({
    campaignId: z.string(),
    clearingPrice: z
        .object({ amount: z.number(), currency: z.string().min(3).max(3) })
        .passthrough(),
    predictedActionProbability: z.number().gte(0).lte(1).optional(),
    expectedActionValue: z
        .object({ amount: z.number(), currency: z.string().min(3).max(3) })
        .passthrough()
        .optional(),
    attributionToken: z.string(),
    creativeUrl: z.string().url().optional(),
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
const BidResponseEnvelope = z
    .object({
    data: z
        .object({
        campaignId: z.string(),
        clearingPrice: z
            .object({ amount: z.number(), currency: z.string().min(3).max(3) })
            .passthrough(),
        predictedActionProbability: z.number().gte(0).lte(1).optional(),
        expectedActionValue: z
            .object({ amount: z.number(), currency: z.string().min(3).max(3) })
            .passthrough()
            .optional(),
        attributionToken: z.string(),
        creativeUrl: z.string().url().optional(),
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
const ActionForecastSegment = z
    .object({ segment: z.string(), predictedActionProbability: z.number() })
    .partial()
    .passthrough();
const ActionForecast = z
    .object({
    campaignId: z.string(),
    forecastActions: z.number().int(),
    forecastCostPerAction: z
        .object({ amount: z.number(), currency: z.string().min(3).max(3) })
        .passthrough(),
    confidence: z.number(),
    topSegments: z.array(z
        .object({ segment: z.string(), predictedActionProbability: z.number() })
        .partial()
        .passthrough()),
})
    .partial()
    .passthrough();
const ActionForecastResponse = z
    .object({
    data: z
        .object({
        campaignId: z.string(),
        forecastActions: z.number().int(),
        forecastCostPerAction: z
            .object({ amount: z.number(), currency: z.string().min(3).max(3) })
            .passthrough(),
        confidence: z.number(),
        topSegments: z.array(z
            .object({
            segment: z.string(),
            predictedActionProbability: z.number(),
        })
            .partial()
            .passthrough()),
    })
        .partial()
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
    submitBidRequest_Body,
    BidRequest,
    Problem,
    Money,
    BidResponse,
    ResponseMeta,
    BidResponseEnvelope,
    ActionForecastSegment,
    ActionForecast,
    ActionForecastResponse,
};
const endpoints = makeApi([
    {
        method: 'post',
        path: '/v1/bid-requests',
        alias: 'submitBidRequest',
        requestFormat: 'json',
        parameters: [
            {
                name: 'body',
                type: 'Body',
                schema: submitBidRequest_Body,
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
                campaignId: z.string(),
                clearingPrice: z
                    .object({
                    amount: z.number(),
                    currency: z.string().min(3).max(3),
                })
                    .passthrough(),
                predictedActionProbability: z.number().gte(0).lte(1).optional(),
                expectedActionValue: z
                    .object({
                    amount: z.number(),
                    currency: z.string().min(3).max(3),
                })
                    .passthrough()
                    .optional(),
                attributionToken: z.string(),
                creativeUrl: z.string().url().optional(),
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
        path: '/v1/campaigns/:campaignId/action-forecast',
        alias: 'getActionForecast',
        requestFormat: 'json',
        parameters: [
            {
                name: 'campaignId',
                type: 'Path',
                schema: z.string(),
            },
        ],
        response: z
            .object({
            data: z
                .object({
                campaignId: z.string(),
                forecastActions: z.number().int(),
                forecastCostPerAction: z
                    .object({
                    amount: z.number(),
                    currency: z.string().min(3).max(3),
                })
                    .passthrough(),
                confidence: z.number(),
                topSegments: z.array(z
                    .object({
                    segment: z.string(),
                    predictedActionProbability: z.number(),
                })
                    .partial()
                    .passthrough()),
            })
                .partial()
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
