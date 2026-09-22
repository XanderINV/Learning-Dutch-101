import type { Module } from '../types';
import { modulePreA101, modulePreA101Exercises } from './preA1-01';
import { modulePreA102, modulePreA102Exercises } from './preA1-02';
import { modulePreA103, modulePreA103Exercises } from './preA1-03';
import { modulePreA104, modulePreA104Exercises } from './preA1-04';
import { moduleA101, moduleA101Exercises } from './a1-01';
import { moduleA102, moduleA102Exercises } from './a1-02';
import { moduleA103, moduleA103Exercises } from './a1-03';
import { moduleA104, moduleA104Exercises } from './a1-04';
import { moduleA105, moduleA105Exercises } from './a1-05';
import { moduleA106, moduleA106Exercises } from './a1-06';
import { moduleA107, moduleA107Exercises } from './a1-07';
import { moduleA108, moduleA108Exercises } from './a1-08';
import { moduleA201, moduleA201Exercises } from './a2-01';
import { moduleA202, moduleA202Exercises } from './a2-02';
import { moduleA203, moduleA203Exercises } from './a2-03';
import { moduleA204, moduleA204Exercises } from './a2-04';
import { moduleA205, moduleA205Exercises } from './a2-05';
import { moduleA206, moduleA206Exercises } from './a2-06';
import { moduleB101, moduleB101Exercises } from './b1-01';
import { moduleB102, moduleB102Exercises } from './b1-02';
import { moduleB103, moduleB103Exercises } from './b1-03';
import { moduleB104, moduleB104Exercises } from './b1-04';
import { moduleB105, moduleB105Exercises } from './b1-05';
import { moduleB106, moduleB106Exercises } from './b1-06';
import { moduleB201, moduleB201Exercises } from './b2-01';
import { moduleB202, moduleB202Exercises } from './b2-02';
import { moduleB203, moduleB203Exercises } from './b2-03';
import { moduleB204, moduleB204Exercises } from './b2-04';
import { moduleB205, moduleB205Exercises } from './b2-05';
import { moduleB206, moduleB206Exercises } from './b2-06';

export const modules: Module[] = [
  modulePreA101,
  modulePreA102,
  modulePreA103,
  modulePreA104,
  moduleA101,
  moduleA102,
  moduleA103,
  moduleA104,
  moduleA105,
  moduleA106,
  moduleA107,
  moduleA108,
  moduleA201,
  moduleA202,
  moduleA203,
  moduleA204,
  moduleA205,
  moduleA206,
  moduleB101,
  moduleB102,
  moduleB103,
  moduleB104,
  moduleB105,
  moduleB106,
  moduleB201,
  moduleB202,
  moduleB203,
  moduleB204,
  moduleB205,
  moduleB206,
].sort((a, b) => a.order - b.order);

export const allLessonExercises = [
  ...modulePreA101Exercises,
  ...modulePreA102Exercises,
  ...modulePreA103Exercises,
  ...modulePreA104Exercises,
  ...moduleA101Exercises,
  ...moduleA102Exercises,
  ...moduleA103Exercises,
  ...moduleA104Exercises,
  ...moduleA105Exercises,
  ...moduleA106Exercises,
  ...moduleA107Exercises,
  ...moduleA108Exercises,
  ...moduleA201Exercises,
  ...moduleA202Exercises,
  ...moduleA203Exercises,
  ...moduleA204Exercises,
  ...moduleA205Exercises,
  ...moduleA206Exercises,
  ...moduleB101Exercises,
  ...moduleB102Exercises,
  ...moduleB103Exercises,
  ...moduleB104Exercises,
  ...moduleB105Exercises,
  ...moduleB106Exercises,
  ...moduleB201Exercises,
  ...moduleB202Exercises,
  ...moduleB203Exercises,
  ...moduleB204Exercises,
  ...moduleB205Exercises,
  ...moduleB206Exercises,
];
