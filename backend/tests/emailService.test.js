const test = require('node:test');
const assert = require('node:assert/strict');
const { buildTransporterConfigs } = require('../utils/emailService');

test('buildTransporterConfigs includes a Gmail fallback for Gmail SMTP settings', () => {
  process.env.SMTP_HOST = 'smtp.gmail.com';
  process.env.SMTP_PORT = '587';
  process.env.SMTP_USER = 'user@example.com';
  process.env.SMTP_PASS = 'password';

  const configs = buildTransporterConfigs();

  assert.ok(configs.length >= 2, 'expected at least one fallback transport config');
  assert.equal(configs[0].host, 'smtp.gmail.com');
  assert.equal(configs[1].service, 'gmail');
  assert.equal(configs[1].auth.user, 'user@example.com');
});
