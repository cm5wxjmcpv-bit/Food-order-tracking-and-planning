import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

test('admin request cards break down four recipients and their 19 meals using safe text rendering', () => {
  class Element {
    constructor(tag) { this.tag = tag; this.children = []; this.dataset = {}; this.textContent = ''; }
    append(...nodes) { this.children.push(...nodes); }
    replaceChildren() { this.children = []; }
    addEventListener() {}
  }
  const cards = new Element('div');
  const refs = [{ ReferralID: 'synthetic-ref', Version: 1, OrganizationName: 'Synthetic Organization',
    Status: 'Pending', SubmittedAt: '2026-10-01T12:00:00Z', meals: 19,
    recipients: [3, 4, 5, 7].map((meals, i) => ({ RecipientName: i ? 'Synthetic Recipient ' + (i + 1) : '<script>Synthetic</script>',
      Address: 'Synthetic Address ' + (i + 1), MealCount: meals, AddressStatus: i === 0 ? 'Needs Review' : 'Confirmed', DuplicateFlag: i === 1 })) }];
  const source = fs.readFileSync('apps-script/AdminClient.html', 'utf8');
  const helpers = source.slice(source.indexOf('  const el ='), source.indexOf('  const addressCall ='));
  const renderer = source.slice(source.indexOf('  function renderRequests()'), source.indexOf('  function field('));
  vm.runInNewContext(helpers + '\n' + renderer + '\nrenderRequests();', {
    document: { createElement: tag => new Element(tag) }, $: () => cards,
    dashboard: { referrals: refs }, readonly: () => false,
    addressReviewed: status => status === 'Confirmed',
  });
  const walk = node => [node, ...node.children.flatMap(walk)];
  const all = walk(cards), list = all.find(node => node.className === 'request-recipient-list');
  assert.equal(list.children.length, 4);
  assert.deepEqual(list.children.map(node => node.children.find(x => x.tag === 'strong').textContent), refs[0].recipients.map(x => x.RecipientName));
  assert.deepEqual(list.children.map(node => node.children.filter(x => x.tag === 'p').map(x => x.textContent)), refs[0].recipients.map(x => [x.Address, x.MealCount + ' meals']));
  assert.ok(all.some(node => node.textContent === 'Synthetic Organization — 4 Recipients — 19 Meals'));
  assert.equal(all.filter(node => node.tag === 'script').length, 0);
  assert.ok(walk(list.children[0]).some(node => node.textContent === 'Address Needs Review'));
  assert.ok(walk(list.children[1]).some(node => node.textContent === 'Possible Duplicate'));
});
