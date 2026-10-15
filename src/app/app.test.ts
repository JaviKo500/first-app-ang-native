import { render, screen, userEvent } from '@ng-native/testing';
import { ColorScheme, type Scheme } from '@ng-native/device';
import { describe, expect, test } from 'vitest';
import { App } from './app.ts';

function fakeSchema(initial: Scheme = 'light') {
  let current = initial;
  const listeners = new Set<(s: Scheme) => void>();
  return {
    current: () => current,
    subscribe: (fn: (s: Scheme) => void) => (listeners.add(fn), () => listeners.delete(fn)),
    set: (s: Scheme | null) => { current = s ?? initial; listeners.forEach((fn) => fn(current)); },
  };
}

const renderApp = () => render(
  App,
  {
    providers: [{
      provide: ColorScheme.SOURCE,
      useValue: fakeSchema()
    }]
  }
);
describe('Habit flow', () => {
  test('Empty state', async () => {
    await renderApp();
    expect(screen.getByText('0 left to do')).toBeTruthy();
    expect(screen.getByText('No habits!')).toBeTruthy();
  });

  test('add with button', async () => {
    await renderApp();
    const user = userEvent.setup();
    await user.type(screen.getByPlaceholderText('New habit'), 'Run');
    await user.press(screen.getByRole('button', { name: 'Add' }));
    expect(screen.getByText('Run')).toBeTruthy();
    expect(screen.getByText('1 left to do')).toBeTruthy();
    expect(screen.queryByText('No habits!')).toBeNull();
    expect(screen.getByPlaceholderText('New habit').props.text).toBe('');
  });

  test('add with keyboard return', async () => {
    await renderApp();
    await userEvent.setup().type(
      screen.getByPlaceholderText('New habit'),
      'Read',
      { submitEditing: true }
    );
    expect(screen.getByText('Read')).toBeTruthy();
  });

  test('toggle', async () => {
    await renderApp();
    const user = await userEvent.setup();
    await user.type( screen.getByPlaceholderText('New habit'), 'Run' );
    await user.press( screen.getByRole('button', {name:'Add'}) );
    await user.press( screen.getByText('To do') );
    expect( screen.getByText('Done') ).toBeTruthy();
    expect( screen.getByText('0 left to do') ).toBeTruthy();

    await user.press( screen.getByText('Done') );

    expect( screen.getByText('To do') ).toBeTruthy();
    expect( screen.getByText('1 left to do') ).toBeTruthy();
  });

  test( 'required error on empty submit', async () => {
    await renderApp();
    await userEvent.setup().press( screen.getByRole( 'button', { name: 'Add' } ) );
    expect( screen.getByRole('alert') ).toBeTruthy();
    expect( screen.getByText('Give the habit a name') ).toBeTruthy();
    expect(screen.getByText('No habits!')).toBeTruthy();
  });

  test( 'input is capped at 30 chatter', async () => {
    await renderApp();
    const user = userEvent.setup();
    await user.type( screen.getByPlaceholderText('New habit'), 'x'.repeat(31) );
    await user.press( screen.getByRole('button', { name: 'Add' }) );
    expect( screen.getByText( 'x'.repeat(30) ) ).toBeTruthy();
    expect( screen.queryByText( 'Max 30 characters' ) ).toBeNull();
  });

  test('no error after adding then blurring', async () => {
    await renderApp();
    const user = userEvent.setup();
    const input = screen.getByPlaceholderText('New habit');
    await user.type(input, 'Run', { skipBlur: true });
    await user.press(screen.getByRole('button', { name: 'Add' }));
    await user.type(input, '');
    expect(screen.queryByText('Give the habit a name')).toBeNull();
  });

  test( 'theme toggle', async () => {
    await renderApp();
    const user = userEvent.setup();
    expect( screen.getByText('Theme: light') ).toBeTruthy();
    await user.press( screen.getByText('Theme: light') );
    expect(screen.getByText('Theme: dark')).toBeTruthy();
  });
});
