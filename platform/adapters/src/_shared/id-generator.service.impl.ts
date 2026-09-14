/**
 * ID Generator Service Implementation — starter prefixes.
 */

import type { DomainCode } from '@clearbid/core/_shared/helpers';
import { DOMAIN_PREFIX_MAP, isValidDomainId } from '@clearbid/core';
import { ulid } from 'ulid';
import type { IdGeneratorService } from '@clearbid/services/_shared';

export function generateIdWithPrefix(prefix: string): string {
  if (!prefix || prefix.length !== 3 || !/^[a-z]{3}$/.test(prefix)) {
    throw new Error(
      `Invalid domain prefix: "${prefix}". Must be exactly 3 lowercase letters.`
    );
  }
  const id = `${prefix}_${ulid().toLowerCase()}`;
  if (!isValidDomainId(id)) {
    throw new Error(`Generated ID "${id}" failed validation.`);
  }
  return id;
}

export class DefaultIdGeneratorService implements IdGeneratorService {
  tntId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.tenant);
  }
  keyId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.apiKey);
  }
  idnId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.identity);
  }
  autId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.auth);
  }
  cmpId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.campaigns);
  }
  invId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.inventory);
  }
  bidId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.bidding);
  }
  cnvId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.conversions);
  }
  stlId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.settlement);
  }
  dspId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.disputes);
  }
  rptId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.reporting);
  }
  generateIdForDomain(domainCode: DomainCode): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP[domainCode]);
  }
}

let idGeneratorService: DefaultIdGeneratorService | null = null;

export function getIdGeneratorService(): DefaultIdGeneratorService {
  if (!idGeneratorService) {
    idGeneratorService = new DefaultIdGeneratorService();
  }
  return idGeneratorService;
}
