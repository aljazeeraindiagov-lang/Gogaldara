import test from 'node:test';
import assert from 'node:assert/strict';
import {
  filterSearchItems,
  evaluatePasswordStrength,
  isValidEmail,
  getUnreadCount,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  AppNotification
} from './logic.ts';

test('filterSearchItems matches keyword, category and snippet', () => {
  const results = filterSearchItems('chill point');
  assert.ok(results.length >= 1);
  assert.equal(results[0].title, 'Chill Point Icicles');

  const foodResults = filterSearchItems('wazwan');
  assert.ok(foodResults.some(r => r.title.includes('Food')));

  const emptyResults = filterSearchItems('   ');
  assert.equal(emptyResults.length, 0);

  const nonExistent = filterSearchItems('xyznonexistentquery999');
  assert.equal(nonExistent.length, 0);
});

test('evaluatePasswordStrength evaluates weak, medium, and strong correctly', () => {
  const empty = evaluatePasswordStrength('');
  assert.equal(empty.score, 0);
  assert.equal(empty.hasLength, false);

  const weak = evaluatePasswordStrength('abc');
  assert.ok(weak.score <= 40);

  const medium = evaluatePasswordStrength('Abc12345');
  assert.ok(medium.hasLength && medium.hasLower && medium.hasUpper && medium.hasNumber);
  assert.ok(medium.score >= 60);

  const strong = evaluatePasswordStrength('KashmirPine#2026!');
  assert.ok(strong.hasLength && strong.hasSpecial && strong.hasNumber && strong.hasUpper);
  assert.ok(strong.score >= 80);
});

test('isValidEmail handles standard formats and invalid inputs', () => {
  assert.equal(isValidEmail('guest@kashmir.com'), true);
  assert.equal(isValidEmail('traveler.shahid+tour@gogaldara.org'), true);
  assert.equal(isValidEmail('invalid-email'), false);
  assert.equal(isValidEmail('missing@domain'), false);
  assert.equal(isValidEmail('   '), false);
});

test('Notification helpers manage read status and counts', () => {
  const sampleNotifications: AppNotification[] = [
    { id: '1', title: 'Winter Alert', message: 'Chill Point icicles', time: '1h ago', read: false, type: 'weather' },
    { id: '2', title: 'Road Update', message: 'Tangmarg clear', time: '2h ago', read: false, type: 'info' },
    { id: '3', title: 'Welcome', message: 'Welcome to Gogaldara', time: '1d ago', read: true, type: 'update' }
  ];

  assert.equal(getUnreadCount(sampleNotifications), 2);

  const updatedOne = markNotificationAsRead(sampleNotifications, '1');
  assert.equal(getUnreadCount(updatedOne), 1);
  assert.equal(updatedOne.find(n => n.id === '1')?.read, true);

  const updatedAll = markAllNotificationsAsRead(sampleNotifications);
  assert.equal(getUnreadCount(updatedAll), 0);
});
