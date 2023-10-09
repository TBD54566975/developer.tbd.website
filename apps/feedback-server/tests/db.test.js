import { afterEach, beforeEach, describe, expect, vi, it } from 'vitest';
import { Pool } from 'pg';

import { PostgresDb, FakeDb } from '../db';

vi.mock('pg', () => {
  const Pool = vi.fn();
  Pool.prototype.query = vi.fn();
  return { default: { Pool }, Pool };
});

describe('PostgresDb', () => {
  let dbPool;

  beforeEach(() => {
    dbPool = new Pool();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('initializes the db', () => {
    const db = new PostgresDb({});

    db.initDb();

    expect(dbPool.query).toBeCalledWith(db.INIT_QUERY);
  });

  it('store votes', () => {
    const db = new PostgresDb({});
    const url = 'http://example.com';
    const vote = 'Y';

    db.storeVote(url, vote);

    expect(dbPool.query).toBeCalledWith(db.VOTE_QUERY, [url, vote]);
  });
});

describe('FakeDb', () => {
  it('initializes the db', () => {
    const db = new FakeDb();
    db.initDb();
    expect(db.votes).toStrictEqual([]);
  });

  it('store votes', () => {
    const db = new FakeDb();

    const url = 'http://example.com';
    db.storeVote(url, 'Y');
    db.storeVote(url, 'N');

    expect(db.votes).toStrictEqual([
      { url, vote: 'Y' },
      { url, vote: 'N' },
    ]);
  });
});
