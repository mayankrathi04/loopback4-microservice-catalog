﻿// Copyright (c) 2023 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import AppGeneratorLB4 from '@loopback/cli/generators/app';
import * as Generator from 'yeoman-generator';
export default class AppGenerator<
  T extends Generator.GeneratorOptions,
> extends AppGeneratorLB4<T> {}
