/**
 * Integration event type definitions for the generated registry.
 */

export type IntegrationEventDeliveryMode = 'sync' | 'async';

export interface IntegrationEventTypeDefinition {
  type: string;
  domain: string;
  aggregateType: string;
  description: string;
  defaultDeliveryMode: IntegrationEventDeliveryMode;
}
