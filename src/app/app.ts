import { Component, signal } from '@angular/core';
import { Text, View } from '@ng-native/components';

/**
 * Element names are lowercase, and that is load-bearing rather than style: an uppercase name is
 * read as an unknown Angular component and commits as a plain view with nothing in it.
 */
interface Habit {
  readonly id: string;
  readonly name: string;
  readonly done: boolean;
}

@Component({
  imports: [Text, View],
  selector: 'app-root',
  template: `
    <view class="screen">
      <text class="title">Today</text>
      <text class="summary">3 left to do</text>
      @for (habit of habits(); track habit.id) {
        <view class="habit">
          <text>{{ habit.name }}</text>
          <text class="status">{{ habit.done ? 'Done' : 'To do' }}</text>
        </view>
      }
    </view>
  `,
  styles: `
  .screen {
    flex: 1;
    gap: 8px;
    padding: 64px 20px;
    padding-top: calc(var(--safe-area-inset-top, 0px) + 64px);
    background-color: #f4f4f5;
  }
  .title {
    font-size: 30px;
    font-weight: 700;
  }
  .summary {
    color: #71717a;
  }
  .habit {
    flex-direction: row;
    justify-content: space-between;
    margin-top: 8px;
    padding: 12px;
    border-radius: 12px;
    background-color: #fff;
  }
  .status {
    color: #71717a;
  }
  `,
})


export class App {
  protected readonly habits = signal<Habit[]>([
    { id: 'water', name: 'Drink water', done: false },
    { id: 'read', name: 'Read ten pages', done: false },
    { id: 'walk', name: 'Walk', done: true },
  ]);
}
